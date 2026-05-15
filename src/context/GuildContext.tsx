import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Group, LootAttributions } from '../types'
import { INITIAL_GROUPS } from '../data/guild'

export type MemberRank = 'owner' | 'coadmin' | 'member' | 'none'

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
  currentUserRank: (authUser: string | null) => MemberRank
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

  const currentUserRank = useCallback((authUser: string | null): MemberRank => {
    const grp = groups.find(g => g.id === currentGroupId) ?? groups[0]
    if (!grp) return 'none'
    // No auth → act as the group owner (demo mode)
    if (!authUser) {
      const owner = grp.members.find(m => m.isOwner)
      return owner ? 'owner' : 'none'
    }
    const member = grp.members.find(m => m.name === authUser)
    if (!member) return 'none'
    if (member.isOwner) return 'owner'
    if (member.isAdmin) return 'coadmin'
    return 'member'
  }, [groups, currentGroupId])

  return (
    <GuildContext.Provider value={{
      groups, setGroups,
      currentGroupId, setCurrentGroupId,
      currentGroup,
      lootAttributions, setLootAttributions,
      guildView, setGuildView,
      currentGuildTab, setCurrentGuildTab,
      currentUserRank,
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
