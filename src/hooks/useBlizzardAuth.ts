import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import type { WowCharacter } from '../types'

const CLIENT_ID = '6c8f3c33a9e347759056401b7ecdad4d'
const NETLIFY_FN = '/api/blizzard'

export function getRedirectUri() {
  return `${window.location.origin}${window.location.pathname}`
}

export function loginWithBlizzard() {
  const state = crypto.randomUUID()
  sessionStorage.setItem('bnet_oauth_state', state)

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: getRedirectUri(),
    response_type: 'code',
    scope: 'openid wow.profile',
    state,
  })
  window.location.href = `https://oauth.battle.net/oauth/authorize?${params}`
}

interface BnetUserInfo {
  battle_tag?: string
  sub?: string
  id?: number
  access_token?: string
}

interface BnetWowProfile {
  wow_accounts?: Array<{
    id: number
    characters: Array<{
      id: number
      name: string
      realm: { name: string; slug: string }
      playable_class: { name: string }
      level: number
      faction: { type: string }
    }>
  }>
}

async function fetchAvatarUrl(token: string, realmSlug: string, charName: string): Promise<string | undefined> {
  try {
    const res = await fetch(`${NETLIFY_FN}?type=character-media&token=${encodeURIComponent(token)}&realm=${realmSlug}&name=${encodeURIComponent(charName.toLowerCase())}`)
    if (!res.ok) return undefined
    const data = await res.json() as { assets?: Array<{ key: string; value: string }> }
    return data.assets?.find(a => a.key === 'avatar')?.value
  } catch {
    return undefined
  }
}

async function fetchWowCharacters(token: string): Promise<WowCharacter[]> {
  const res = await fetch(`${NETLIFY_FN}?type=wow-characters&token=${encodeURIComponent(token)}`)
  if (!res.ok) return []
  const data: BnetWowProfile = await res.json()
  const chars: WowCharacter[] = []
  for (const account of data.wow_accounts ?? []) {
    for (const c of account.characters) {
      if (c.level >= 10) {
        chars.push({
          id: c.id,
          name: c.name,
          realm: c.realm.name,
          realmSlug: c.realm.slug,
          class: c.playable_class.name,
          level: c.level,
          faction: c.faction.type === 'ALLIANCE' ? 'Alliance' : 'Horde',
        })
      }
    }
  }
  chars.sort((a, b) => b.level - a.level)

  // Fetch avatar URLs in parallel (limit to first 20 to avoid too many requests)
  const top = chars.slice(0, 20)
  const avatarUrls = await Promise.all(
    top.map(c => fetchAvatarUrl(token, c.realmSlug, c.name))
  )
  top.forEach((c, i) => { c.avatarUrl = avatarUrls[i] })

  return chars
}

export function useBlizzardOAuthCallback() {
  const { setAuthProfile, setCharacters, setCharSelectOpen, showToast } = useApp()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code  = params.get('code')
    const state = params.get('state')
    const savedState = sessionStorage.getItem('bnet_oauth_state')

    if (!code) return

    window.history.replaceState({}, '', window.location.pathname)
    sessionStorage.removeItem('bnet_oauth_state')

    if (state !== savedState) {
      showToast('Authentication error (state mismatch)', 'remove')
      return
    }

    const redirectUri = getRedirectUri()
    fetch(`${NETLIFY_FN}?type=oauth-callback&code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(redirectUri)}`)
      .then(r => {
        if (!r.ok) return r.text().then(t => { throw new Error(`HTTP ${r.status}: ${t}`) })
        return r.json()
      })
      .then(async (data: BnetUserInfo) => {
        if (!data.battle_tag) throw new Error('No battletag returned')
        if (!data.access_token) throw new Error('No access token returned')
        setAuthProfile({ battletag: data.battle_tag, id: data.id ?? 0, accessToken: data.access_token })
        showToast(`Connected as ${data.battle_tag}`, 'success')

        // Fetch WoW characters in background
        const chars = await fetchWowCharacters(data.access_token)
        setCharacters(chars)
        if (chars.length > 0) setCharSelectOpen(true)
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        console.error('Blizzard login error:', msg)
        showToast(`Blizzard login failed: ${msg}`, 'remove')
      })
  }, [])
}
