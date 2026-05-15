import type { VercelRequest, VercelResponse } from '@vercel/node'

const REGION = 'eu'
const TOKEN_URL = `https://oauth.battle.net/token`
const API_BASE = `https://${REGION}.api.blizzard.com`

let cachedToken: { value: string; expiresAt: number } | null = null

async function getAppToken(): Promise<string> {
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
  const token = await getAppToken()
  const qs = new URLSearchParams({ namespace: `static-${REGION}`, locale: 'fr_FR', ...params })
  const url = `${API_BASE}${path}?${qs}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`)
  return res.json()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (!process.env.BLIZZARD_CLIENT_ID || !process.env.BLIZZARD_CLIENT_SECRET) {
    return res.status(500).json({ error: 'Missing Blizzard credentials' })
  }

  const type = (req.query.type as string) ?? ''

  try {
    let data

    if (type === 'raids') {
      data = await blizzardFetch('/data/wow/journal-instance/index')
    }
    else if (type === 'raid') {
      const id = req.query.id as string ?? ''
      data = await blizzardFetch(`/data/wow/journal-instance/${id}`)
    }
    else if (type === 'encounter') {
      const id = req.query.id as string ?? ''
      data = await blizzardFetch(`/data/wow/journal-encounter/${id}`)
    }
    else if (type === 'item') {
      const id = req.query.id as string ?? ''
      data = await blizzardFetch(`/data/wow/item/${id}`)
    }
    else if (type === 'item-media') {
      const id = req.query.id as string ?? ''
      data = await blizzardFetch(`/data/wow/media/item/${id}`, { namespace: `static-${REGION}` })
    }
    else if (type === 'search-items') {
      const q = req.query.q as string ?? ''
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
    else if (type === 'oauth-callback') {
      const code = req.query.code as string ?? ''
      const redirectUri = req.query.redirect_uri as string ?? ''
      if (!code || !redirectUri) throw new Error('Missing code or redirect_uri')

      const clientId = process.env.BLIZZARD_CLIENT_ID!
      const clientSecret = process.env.BLIZZARD_CLIENT_SECRET!
      const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

      const tokenRes = await fetch('https://oauth.battle.net/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        }).toString(),
      })
      if (!tokenRes.ok) {
        const errText = await tokenRes.text()
        throw new Error(`Token exchange failed (${tokenRes.status}): ${errText}`)
      }
      const tokenData = await tokenRes.json() as { access_token: string }

      const userRes = await fetch('https://oauth.battle.net/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      })
      if (!userRes.ok) throw new Error(`Userinfo failed: ${userRes.status}`)
      const userInfo = await userRes.json() as { battle_tag?: string; sub?: string; id?: number }

      data = { ...userInfo, access_token: tokenData.access_token }
    }
    else if (type === 'wow-characters') {
      const token = req.query.token as string ?? ''
      if (!token) throw new Error('Missing token')

      const profileRes = await fetch(`${API_BASE}/profile/user/wow?namespace=profile-${REGION}&locale=fr_FR`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!profileRes.ok) throw new Error(`WoW profile failed: ${profileRes.status}`)
      data = await profileRes.json()
    }
    else {
      return res.status(400).json({ error: 'Unknown type' })
    }

    return res.status(200).json(data)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return res.status(500).json({ error: msg })
  }
}
