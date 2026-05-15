import { useState, useEffect } from 'react'

const BASE = import.meta.env.DEV
  ? 'http://localhost:8888/.netlify/functions/blizzard'
  : '/api/blizzard'

async function blizzardApi<T>(type: string, params: Record<string, string> = {}): Promise<T> {
  const qs = new URLSearchParams({ type, ...params })
  const res = await fetch(`${BASE}?${qs}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json() as Promise<T>
}

export function useBlizzard<T>(type: string, params: Record<string, string> = {}) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    blizzardApi<T>(type, params)
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, JSON.stringify(params)])

  return { data, loading, error }
}

export { blizzardApi }
