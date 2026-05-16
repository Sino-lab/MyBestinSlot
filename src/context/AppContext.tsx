import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from 'react'
import type { Lang, MyListItem, Item, WowCharacter } from '../types'
import type { TooltipItem } from '../components/shared/ItemTooltip'
import { supabase, supabaseReady } from '../lib/supabase'

export interface AuthProfile {
  battletag: string
  id: number
  accessToken: string
}

type Page = 'allbis' | 'reco' | 'mylist' | 'guild'
type ToastType = 'success' | 'remove'

interface ToastState {
  message: string
  type: ToastType
  visible: boolean
}

interface AppContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  page: Page
  setPage: (p: Page) => void
  myList: MyListItem[]
  listLoading: boolean
  addToList: (item: Item) => void
  removeFromList: (id: number) => void
  toggleObtained: (id: number) => void
  isInList: (id: number) => boolean
  isInListByName: (name: string, slot: string) => boolean
  toast: ToastState
  showToast: (message: string, type?: ToastType) => void
  authUser: string | null
  authProfile: AuthProfile | null
  setAuthProfile: (p: AuthProfile | null) => void
  setAuthUser: (u: string | null) => void
  characters: WowCharacter[]
  setCharacters: (chars: WowCharacter[]) => void
  selectedCharacter: WowCharacter | null
  setSelectedCharacter: (c: WowCharacter | null) => void
  charSelectOpen: boolean
  setCharSelectOpen: (open: boolean) => void
  pendingJoinCode: string | null
  setPendingJoinCode: (code: string | null) => void
  tooltip: { item: TooltipItem; x: number; y: number } | null
  showTooltip: (item: TooltipItem, x: number, y: number) => void
  hideTooltip: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [page, setPage] = useState<Page>('allbis')
  const [myList, setMyList] = useState<MyListItem[]>([])
  const [listLoading, setListLoading] = useState(false)
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', visible: false })
  const [authProfile, setAuthProfile] = useState<AuthProfile | null>(null)
  const [characters, setCharacters] = useState<WowCharacter[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<WowCharacter | null>(null)
  const [charSelectOpen, setCharSelectOpen] = useState(false)
  const [pendingJoinCode, setPendingJoinCode] = useState<string | null>(null)
  const authUser = authProfile?.battletag ?? null
  const setAuthUser = useCallback((u: string | null) => {
    if (!u) setAuthProfile(null)
  }, [])
  const [tooltip, setTooltip] = useState<{ item: TooltipItem; x: number; y: number } | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const myListRef = useRef<MyListItem[]>([])

  // Keep ref in sync for stable callbacks
  useEffect(() => { myListRef.current = myList }, [myList])

  // Load BiS list from Supabase when character changes
  useEffect(() => {
    if (!selectedCharacter || !supabaseReady) {
      setMyList([])
      return
    }
    setListLoading(true)
    supabase
      .from('bis_items')
      .select('*')
      .eq('character_id', selectedCharacter.id)
      .then(({ data }) => {
        setMyList((data ?? []).map((row: Record<string, unknown>) => ({
          id: row.id as number,
          slot: row.slot as MyListItem['slot'],
          name: row.name as string,
          q: row.q as MyListItem['q'],
          ilvl: row.ilvl as number,
          source: row.source as string,
          mode: row.mode as MyListItem['mode'],
          obtained: row.obtained as boolean,
        })))
        setListLoading(false)
      })
  }, [selectedCharacter])

  const showTooltip = useCallback((item: TooltipItem, x: number, y: number) => setTooltip({ item, x, y }), [])
  const hideTooltip = useCallback(() => setTooltip(null), [])

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ message, type, visible: true })
    toastTimerRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }))
    }, 2200)
  }, [])

  const setLang = useCallback((l: Lang) => setLangState(l), [])

  const addToList = useCallback((item: Item) => {
    if (!selectedCharacter || !authUser || !supabaseReady) return
    // Optimistic
    const tempId = -Date.now()
    setMyList(prev =>
      prev.some(i => i.name === item.name && i.slot === item.slot)
        ? prev
        : [...prev, { ...item, id: tempId, obtained: false }]
    )
    supabase.from('bis_items').upsert({
      battletag: authUser,
      character_id: selectedCharacter.id,
      slot: item.slot,
      name: item.name,
      q: item.q,
      ilvl: item.ilvl,
      source: item.source ?? '',
      mode: item.mode ?? 'mythicplus',
      obtained: false,
    }, { onConflict: 'character_id,slot,name' }).select().single()
      .then(({ data, error }) => {
        if (error) {
          console.error('[addToList] Supabase error:', error.message, error.details, error.hint)
        }
        if (data) {
          setMyList(prev => prev.map(i => i.id === tempId ? { ...i, id: (data as Record<string, unknown>).id as number } : i))
        }
        // Keep item in list even if Supabase fails — don't silently remove
      })
  }, [selectedCharacter, authUser])

  const removeFromList = useCallback((id: number) => {
    setMyList(prev => prev.filter(i => i.id !== id))
    if (supabaseReady) supabase.from('bis_items').delete().eq('id', id)
  }, [])

  const toggleObtained = useCallback((id: number) => {
    const item = myListRef.current.find(i => i.id === id)
    if (!item) return
    const obtained = !item.obtained
    setMyList(prev => prev.map(i => i.id === id ? { ...i, obtained } : i))
    if (supabaseReady) supabase.from('bis_items').update({ obtained }).eq('id', id)
  }, [])

  const isInList = useCallback((id: number) => myList.some(i => i.id === id), [myList])

  const isInListByName = useCallback(
    (name: string, slot: string) => myList.some(i => i.name === name && i.slot === slot),
    [myList]
  )

  return (
    <AppContext.Provider value={{
      lang, setLang, page, setPage,
      myList, listLoading, addToList, removeFromList, toggleObtained, isInList, isInListByName,
      toast, showToast, authUser, authProfile, setAuthProfile, setAuthUser,
      characters, setCharacters,
      selectedCharacter, setSelectedCharacter,
      charSelectOpen, setCharSelectOpen,
      pendingJoinCode, setPendingJoinCode,
      tooltip, showTooltip, hideTooltip,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
