import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
import type { Lang, MyListItem, Item, WowCharacter } from '../types'
import type { TooltipItem } from '../components/shared/ItemTooltip'

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
  tooltip: { item: TooltipItem; x: number; y: number } | null
  showTooltip: (item: TooltipItem, x: number, y: number) => void
  hideTooltip: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [page, setPage] = useState<Page>('allbis')
  const [myList, setMyList] = useState<MyListItem[]>([])
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', visible: false })
  const [authProfile, setAuthProfile] = useState<AuthProfile | null>(null)
  const [characters, setCharacters] = useState<WowCharacter[]>([])
  const authUser = authProfile?.battletag ?? null
  const setAuthUser = useCallback((u: string | null) => {
    if (!u) setAuthProfile(null)
  }, [])
  const [tooltip, setTooltip] = useState<{ item: TooltipItem; x: number; y: number } | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    setMyList(prev => {
      if (prev.some(i => i.id === item.id)) return prev
      return [...prev, { ...item, obtained: false }]
    })
  }, [])

  const removeFromList = useCallback((id: number) => {
    setMyList(prev => prev.filter(i => i.id !== id))
  }, [])

  const toggleObtained = useCallback((id: number) => {
    setMyList(prev => prev.map(i => i.id === id ? { ...i, obtained: !i.obtained } : i))
  }, [])

  const isInList = useCallback((id: number) => myList.some(i => i.id === id), [myList])

  const isInListByName = useCallback(
    (name: string, slot: string) => myList.some(i => i.name === name && i.slot === slot),
    [myList]
  )

  return (
    <AppContext.Provider value={{
      lang, setLang, page, setPage,
      myList, addToList, removeFromList, toggleObtained, isInList, isInListByName,
      toast, showToast, authUser, authProfile, setAuthProfile, setAuthUser,
      characters, setCharacters,
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
