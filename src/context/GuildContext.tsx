import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Group, LootAttributions } from '../types'
import { INITIAL_GROUPS } from '../data/guild'

interface GuildContextValue {
  groups: Group[]
  setGroups: (g: Group[]) => void
  currentGroupId: string
  setCurrentGroupId: (id: string) => void
  currentGroup: () => Group | undefined
  lootAttributions: LootAttributions
  setLootAttributions: React.Dispatch<React.SetStateAction<LootAttributions>>
  guildView: 'boss' | 'player'
  setGuildView: (v: 'boss' | 'player') => void
  currentGuildTab: GuildTab
  setCurrentGuildTab: (t: GuildTab) => void
}

export type GuildTab = 'loots' | 'roster' | 'members' | 'settings'

const GuildContext = createContext<GuildContextValue | null>(null)

export function GuildProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS)
  const [currentGroupId, setCurrentGroupId] = useState('g1')
  const [lootAttributions, setLootAttributions] = useState<LootAttributions>({})
  const [guildView, setGuildView] = useState<'boss' | 'player'>('boss')
  const [currentGuildTab, setCurrentGuildTab] = useState<GuildTab>('loots')

  const currentGroup = useCallback(
    () => groups.find(g => g.id === currentGroupId) ?? groups[0],
    [groups, currentGroupId]
  )

  return (
    <GuildContext.Provider value={{
      groups, setGroups,
      currentGroupId, setCurrentGroupId,
      currentGroup,
      lootAttributions, setLootAttributions,
      guildView, setGuildView,
      currentGuildTab, setCurrentGuildTab,
    }}>
      {children}
    </GuildContext.Provider>
  )
}

export function useGuild() {
  const ctx = useContext(GuildContext)
  if (!ctx) throw new Error('useGuild must be used within GuildProvider')
  return ctx
}
