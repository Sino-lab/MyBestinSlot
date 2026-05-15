import type { Handler } from '@netlify/functions'

const REGION = 'eu'
const TOKEN_URL = `https://oauth.battle.net/token`
const API_BASE = `https://${REGION}.api.blizzard.com`

let cachedToken: { value: string; expiresAt: number } | null = null

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value
  }

  const clientId = process.env.BLIZZARD_CLIENT_ID!
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET!
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) throw new Error(`Token error: ${res.status}`)

  const data = await res.json() as { access_token: string; expires_in: number }
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 }
  return cachedToken.value
}

async function blizzardFetch(path: string, params: Record<string, string> = {}) {
  const token = await getToken()
  const qs = new URLSearchParams({ namespace: `static-${REGION}`, locale: 'fr_FR', ...params })
  const url = `${API_BASE}${path}?${qs}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`)
  return res.json()
}

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }

  if (!process.env.BLIZZARD_CLIENT_ID || !process.env.BLIZZARD_CLIENT_SECRET) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing Blizzard credentials' }) }
  }

  const type = event.queryStringParameters?.type ?? ''

  try {
    let data

    if (type === 'raids') {
      // Toutes les instances de raid
      data = await blizzardFetch('/data/wow/journal-instance/index')
    }
    else if (type === 'raid') {
      const id = event.queryStringParameters?.id ?? ''
      data = await blizzardFetch(`/data/wow/journal-instance/${id}`)
    }
    else if (type === 'encounter') {
      const id = event.queryStringParameters?.id ?? ''
      data = await blizzardFetch(`/data/wow/journal-encounter/${id}`)
    }
    else if (type === 'item') {
      const id = event.queryStringParameters?.id ?? ''
      data = await blizzardFetch(`/data/wow/item/${id}`)
    }
    else if (type === 'item-media') {
      const id = event.queryStringParameters?.id ?? ''
      data = await blizzardFetch(`/data/wow/media/item/${id}`, { namespace: `static-${REGION}` })
    }
    else if (type === 'search-items') {
      const q = event.queryStringParameters?.q ?? ''
      data = await blizzardFetch('/data/wow/search/item', {
        name: q,
        orderby: 'id:desc',
        _pageSize: '20',
      })
    }
    else if (type === 'classes') {
      data = await blizzardFetch('/data/wow/playable-class/index')
    }
    else if (type === 'current-season') {
      data = await blizzardFetch('/data/wow/mythic-keystone/season/index', { namespace: `dynamic-${REGION}` })
    }
    else {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Unknown type' }) }
    }

    return { statusCode: 200, headers, body: JSON.stringify(data) }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return { statusCode: 500, headers, body: JSON.stringify({ error: msg }) }
  }
}
