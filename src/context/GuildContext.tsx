import {
  createContext, useContext, useState, useCallback, useEffect,
  type ReactNode,
} from 'react'
import type { Group, GroupRoster, CoAdminPermissions, GroupType, LootAttributions } from '../types'
import { supabase } from '../lib/supabase'
import { CLASS_COLORS } from '../data/classes'
import { useApp } from './AppContext'

export type MemberRank = 'owner' | 'coadmin' | 'member' | 'none'
export type GuildTab = 'loots' | 'roster' | 'members' | 'settings'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeClass(raw: string): string {
  return raw.toLowerCase().replace(/\s+/g, '')
}

// Build a Group object from Supabase rows
function buildGroup(
  grpRow: Record<string, unknown>,
  memberRows: Record<string, unknown>[],
  rosterRows: Record<string, unknown>[],
): Group {
  const members = memberRows.map(m => {
    const cls = normalizeClass((m.character_class as string) ?? '')
    return {
      name: (m.battletag as string) ?? '',
      role: ((m.member_role as string) ?? 'dps').charAt(0).toUpperCase() + ((m.member_role as string) ?? 'dps').slice(1),
      cls,
      spec: '—',
      color: CLASS_COLORS[cls] ?? '#aaaaaa',
      status: 'active',
      isOwner: (m.is_owner as boolean) ?? false,
      isAdmin: (m.is_admin as boolean) ?? false,
    }
  })

  // Build roster arrays indexed by position
  const rosterByRole: GroupRoster = { tank: [], healer: [], dps: [] }
  for (const row of rosterRows) {
    const role = (row.role as 'tank' | 'healer' | 'dps')
    const pos  = (row.position as number)
    const bt   = (row.battletag as string | null) ?? null
    if (!rosterByRole[role]) rosterByRole[role] = []
    rosterByRole[role][pos] = bt
  }
  // Fill gaps with null
  for (const role of ['tank', 'healer', 'dps'] as const) {
    const arr = rosterByRole[role]
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) arr[i] = null
    }
  }

  const rawPerms = (grpRow.co_admin_perms as CoAdminPermissions | null)
  const coAdminPerms: CoAdminPermissions = rawPerms ?? {
    canKick: true,
    canInvite: true,
    canManageRoster: false,
    canManageComp: false,
    canAttributeLoots: false,
    canManageBossStatus: false,
  }

  return {
    id: (grpRow.id as string),
    name: (grpRow.name as string),
    type: (grpRow.type as GroupType),
    code: (grpRow.code as string),
    comp: { tank: 2, healer: 4, dps: 14 },
    members,
    roster: rosterByRole,
    invites: [],
    coAdminPerms,
  }
}

// ---------------------------------------------------------------------------
// Context types
// ---------------------------------------------------------------------------

interface GuildContextValue {
  groups: Group[]
  setGroups: (g: Group[]) => void
  loading: boolean
  currentGroupId: string
  setCurrentGroupId: (id: string) => void
  currentGroup: () => Group | undefined
  lootAttributions: LootAttributions
  setLootAttributions: React.Dispatch<React.SetStateAction<LootAttributions>>
  saveLootAttribution: (groupId: string, gk: string, attribution: import('../types').LootAttribution) => Promise<void>
  clearLootAttribution: (groupId: string, gk: string) => Promise<void>
  bossStatuses: Record<string, 'k' | 'w'>
  toggleBossKill: (groupId: string, bossN: number) => Promise<void>
  guildView: 'boss' | 'player'
  setGuildView: (v: 'boss' | 'player') => void
  currentGuildTab: GuildTab
  setCurrentGuildTab: (t: GuildTab) => void
  currentUserRank: (authUser: string | null) => MemberRank
  // Supabase actions
  createGroup: (name: string, type: GroupType) => Promise<void>
  validateGroupCode: (code: string) => Promise<boolean>
  joinGroup: (code: string, role?: string, character?: import('../types').WowCharacter | null) => Promise<'ok' | 'not_found' | 'already_member'>
  kickMember: (groupId: string, battletag: string) => Promise<void>
  promoteMember: (groupId: string, battletag: string) => Promise<void>
  demoteMember: (groupId: string, battletag: string) => Promise<void>
  updateGroupName: (groupId: string, name: string) => Promise<void>
  updateCoAdminPerms: (groupId: string, perms: CoAdminPermissions) => Promise<void>
  updateRosterSlot: (
    groupId: string,
    role: 'tank' | 'healer' | 'dps',
    position: number,
    battletag: string | null,
  ) => Promise<void>
  leaveGroup: (groupId: string) => Promise<void>
  refreshGroups: () => Promise<void>
}

const GuildContext = createContext<GuildContextValue | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function GuildProvider({ children }: { children: ReactNode }) {
  const { authUser, selectedCharacter } = useApp()

  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(false)
  const [currentGroupId, setCurrentGroupId] = useState('')
  const [lootAttributions, setLootAttributions] = useState<LootAttributions>({})
  const [bossStatuses, setBossStatuses] = useState<Record<string, 'k' | 'w'>>({})
  const [guildView, setGuildView] = useState<'boss' | 'player'>('boss')
  const [currentGuildTab, setCurrentGuildTab] = useState<GuildTab>('loots')

  // -------------------------------------------------------------------------
  // Load groups from Supabase
  // -------------------------------------------------------------------------

  const refreshGroups = useCallback(async () => {
    if (!authUser || !selectedCharacter) {
      setGroups([])
      setCurrentGroupId('')
      return
    }
    setLoading(true)
    try {
      // Find all group_ids for this specific character
      const { data: memberships, error: memErr } = await supabase
        .from('group_members')
        .select('group_id')
        .eq('battletag', authUser)
        .eq('character_name', selectedCharacter.name)
        .eq('character_realm', selectedCharacter.realm)

      if (memErr) throw memErr
      if (!memberships || memberships.length === 0) {
        setGroups([])
        setCurrentGroupId('')
        return
      }

      const groupIds = memberships.map(r => r.group_id as string)

      // Load groups, all members, all roster rows in parallel
      const [grpRes, allMembersRes, allRosterRes] = await Promise.all([
        supabase.from('groups').select('*').in('id', groupIds),
        supabase.from('group_members').select('*').in('group_id', groupIds),
        supabase.from('group_roster').select('*').in('group_id', groupIds),
      ])

      if (grpRes.error) throw grpRes.error
      if (allMembersRes.error) throw allMembersRes.error
      if (allRosterRes.error) throw allRosterRes.error

      const grpRows    = (grpRes.data    ?? []) as Record<string, unknown>[]
      const memberRows = (allMembersRes.data ?? []) as Record<string, unknown>[]
      const rosterRows = (allRosterRes.data  ?? []) as Record<string, unknown>[]

      const loaded: Group[] = grpRows.map(grp => {
        const id = grp.id as string
        return buildGroup(
          grp,
          memberRows.filter(m => m.group_id === id),
          rosterRows.filter(r => r.group_id === id),
        )
      })

      setGroups(loaded)

      // Load boss statuses independently — a failure here must not block group display
      supabase.from('boss_statuses').select('group_id,boss_n,is_killed').in('group_id', groupIds)
        .then(({ data, error }) => {
          if (!error && data) {
            const statusMap: Record<string, 'k' | 'w'> = {}
            for (const row of data as Record<string, unknown>[]) {
              statusMap[`${row.group_id}_${row.boss_n}`] = row.is_killed ? 'k' : 'w'
            }
            setBossStatuses(statusMap)
          }
        })
      setCurrentGroupId(prev => {
        if (loaded.find(g => g.id === prev)) return prev
        return loaded[0]?.id ?? ''
      })
    } finally {
      setLoading(false)
    }
  }, [authUser, selectedCharacter])

  useEffect(() => { refreshGroups() }, [refreshGroups])

  // -------------------------------------------------------------------------
  // Derived helpers
  // -------------------------------------------------------------------------

  const currentGroup = useCallback(
    () => groups.find(g => g.id === currentGroupId) ?? groups[0],
    [groups, currentGroupId],
  )

  const currentUserRank = useCallback((au: string | null): MemberRank => {
    const grp = groups.find(g => g.id === currentGroupId) ?? groups[0]
    if (!grp) return 'none'
    if (!au) {
      const owner = grp.members.find(m => m.isOwner)
      return owner ? 'owner' : 'none'
    }
    const member = grp.members.find(m => m.name === au)
    if (!member) return 'none'
    if (member.isOwner) return 'owner'
    if (member.isAdmin) return 'coadmin'
    return 'member'
  }, [groups, currentGroupId])

  // -------------------------------------------------------------------------
  // createGroup
  // -------------------------------------------------------------------------

  const createGroup = useCallback(async (name: string, type: GroupType) => {
    if (!authUser) return
    const raw  = crypto.randomUUID().replace(/-/g, '').toUpperCase()
    const code = `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`

    // Optimistic update
    const optimisticId = 'opt-' + Date.now()
    const cls = normalizeClass(selectedCharacter?.class ?? '')
    const optimisticGroup: Group = {
      id: optimisticId,
      name,
      type,
      code,
      comp: { tank: 2, healer: 4, dps: 14 },
      members: [{
        name: authUser,
        role: 'DPS',
        cls,
        spec: '—',
        color: CLASS_COLORS[cls] ?? '#aaaaaa',
        status: 'active',
        isOwner: true,
        isAdmin: false,
      }],
      roster: { tank: [], healer: [], dps: [] },
      invites: [],
      coAdminPerms: { canKick: true, canInvite: true, canManageRoster: false, canManageComp: false, canAttributeLoots: false, canManageBossStatus: false },
    }
    setGroups(prev => [...prev, optimisticGroup])
    setCurrentGroupId(optimisticId)

    // Persist to Supabase
    const { data: grpData, error: grpErr } = await supabase
      .from('groups')
      .insert({
        name,
        type,
        code,
        owner_btag: authUser,
        co_admin_perms: { canKick: true, canInvite: true, canManageRoster: false, canManageComp: false, canAttributeLoots: false, canManageBossStatus: false },
      })
      .select()
      .single()

    if (grpErr) {
      // Rollback optimistic update
      setGroups(prev => prev.filter(g => g.id !== optimisticId))
      throw grpErr
    }

    const realId = (grpData as Record<string, unknown>).id as string

    await supabase.from('group_members').insert({
      group_id: realId,
      battletag: authUser,
      character_name: selectedCharacter?.name ?? null,
      character_realm: selectedCharacter?.realm ?? null,
      character_class: selectedCharacter?.class ?? null,
      is_owner: true,
      is_admin: false,
    })

    // Replace optimistic entry with real one
    setGroups(prev => prev.map(g =>
      g.id === optimisticId ? { ...g, id: realId } : g
    ))
    setCurrentGroupId(realId)
  }, [authUser, selectedCharacter])

  // -------------------------------------------------------------------------
  // joinGroup
  // -------------------------------------------------------------------------

  const validateGroupCode = useCallback(async (code: string): Promise<boolean> => {
    const normalized = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
    const formatted  = normalized.length === 12
      ? `${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8, 12)}`
      : code.trim().toUpperCase()
    const { data, error } = await supabase.from('groups').select('id').eq('code', formatted).single()
    return !error && !!data
  }, [])

  const joinGroup = useCallback(async (
    code: string,
    role: string = 'dps',
    character?: import('../types').WowCharacter | null,
  ): Promise<'ok' | 'not_found' | 'already_member'> => {
    if (!authUser) return 'not_found'

    const char = character ?? selectedCharacter

    const normalized = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
    const formatted  = normalized.length === 12
      ? `${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8, 12)}`
      : code.trim().toUpperCase()

    // Find group by code
    const { data: grpData, error: grpErr } = await supabase
      .from('groups')
      .select('*')
      .eq('code', formatted)
      .single()

    if (grpErr || !grpData) return 'not_found'

    const grp = grpData as Record<string, unknown>
    const groupId = grp.id as string

    // Check already member for this specific character
    const { data: existing } = await supabase
      .from('group_members')
      .select('id')
      .eq('group_id', groupId)
      .eq('battletag', authUser)
      .eq('character_name', char?.name ?? '')
      .eq('character_realm', char?.realm ?? '')
      .single()

    if (existing) return 'already_member'

    // Insert member
    const { error: insErr } = await supabase.from('group_members').insert({
      group_id: groupId,
      battletag: authUser,
      character_name: char?.name ?? null,
      character_realm: char?.realm ?? null,
      character_class: char?.class ?? null,
      is_owner: false,
      is_admin: false,
      member_role: role,
    })

    if (insErr) throw new Error(insErr.message)

    // Refresh groups to get the new one
    await refreshGroups()
    setCurrentGroupId(groupId)
    return 'ok'
  }, [authUser, selectedCharacter, refreshGroups])

  // -------------------------------------------------------------------------
  // kickMember
  // -------------------------------------------------------------------------

  const kickMember = useCallback(async (groupId: string, battletag: string) => {
    // Optimistic
    setGroups(prev => prev.map(g =>
      g.id === groupId
        ? { ...g, members: g.members.filter(m => m.name !== battletag) }
        : g
    ))
    await supabase
      .from('group_members')
      .delete()
      .eq('group_id', groupId)
      .eq('battletag', battletag)
  }, [])

  // -------------------------------------------------------------------------
  // promoteMember / demoteMember
  // -------------------------------------------------------------------------

  const promoteMember = useCallback(async (groupId: string, battletag: string) => {
    setGroups(prev => prev.map(g =>
      g.id === groupId
        ? { ...g, members: g.members.map(m => m.name === battletag ? { ...m, isAdmin: true } : m) }
        : g
    ))
    await supabase
      .from('group_members')
      .update({ is_admin: true })
      .eq('group_id', groupId)
      .eq('battletag', battletag)
  }, [])

  const demoteMember = useCallback(async (groupId: string, battletag: string) => {
    setGroups(prev => prev.map(g =>
      g.id === groupId
        ? { ...g, members: g.members.map(m => m.name === battletag ? { ...m, isAdmin: false } : m) }
        : g
    ))
    await supabase
      .from('group_members')
      .update({ is_admin: false })
      .eq('group_id', groupId)
      .eq('battletag', battletag)
  }, [])

  // -------------------------------------------------------------------------
  // updateGroupName
  // -------------------------------------------------------------------------

  const updateGroupName = useCallback(async (groupId: string, name: string) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, name } : g))
    await supabase.from('groups').update({ name }).eq('id', groupId)
  }, [])

  // -------------------------------------------------------------------------
  // updateCoAdminPerms
  // -------------------------------------------------------------------------

  const updateCoAdminPerms = useCallback(async (
    groupId: string,
    perms: CoAdminPermissions,
  ) => {
    setGroups(prev => prev.map(g =>
      g.id === groupId ? { ...g, coAdminPerms: perms } : g
    ))
    await supabase
      .from('groups')
      .update({ co_admin_perms: perms })
      .eq('id', groupId)
  }, [])

  // -------------------------------------------------------------------------
  // updateRosterSlot
  // -------------------------------------------------------------------------

  const updateRosterSlot = useCallback(async (
    groupId: string,
    role: 'tank' | 'healer' | 'dps',
    position: number,
    battletag: string | null,
  ) => {
    // Optimistic
    setGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g
      const roster = { ...g.roster, [role]: [...g.roster[role]] }
      roster[role][position] = battletag
      return { ...g, roster }
    }))

    if (battletag === null) {
      // Delete the slot row
      await supabase
        .from('group_roster')
        .delete()
        .eq('group_id', groupId)
        .eq('role', role)
        .eq('position', position)
    } else {
      // Upsert
      await supabase
        .from('group_roster')
        .upsert(
          { group_id: groupId, role, position, battletag },
          { onConflict: 'group_id,role,position' },
        )
    }
  }, [])

  // -------------------------------------------------------------------------
  // Load loot attributions when group changes
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!currentGroupId) { setLootAttributions({}); return }
    supabase
      .from('loot_attributions')
      .select('*')
      .eq('group_id', currentGroupId)
      .then(({ data }) => {
        const map: LootAttributions = {}
        for (const row of (data ?? []) as Record<string, unknown>[]) {
          map[row.loot_key as string] = {
            name: row.member_name as string,
            color: row.member_color as string,
            cls: row.member_cls as string,
          }
        }
        setLootAttributions(map)
      })
  }, [currentGroupId])

  const saveLootAttribution = useCallback(async (
    groupId: string,
    gk: string,
    attribution: import('../types').LootAttribution,
  ) => {
    setLootAttributions(prev => ({ ...prev, [gk]: attribution }))
    await supabase.from('loot_attributions').upsert(
      { group_id: groupId, loot_key: gk, member_name: attribution.name, member_color: attribution.color, member_cls: attribution.cls },
      { onConflict: 'group_id,loot_key' },
    )
  }, [])

  const clearLootAttribution = useCallback(async (groupId: string, gk: string) => {
    setLootAttributions(prev => { const n = { ...prev }; delete n[gk]; return n })
    await supabase.from('loot_attributions').delete().eq('group_id', groupId).eq('loot_key', gk)
  }, [])

  // -------------------------------------------------------------------------
  // toggleBossKill
  // -------------------------------------------------------------------------

  const toggleBossKill = useCallback(async (groupId: string, bossN: number) => {
    const key = `${groupId}_${bossN}`
    const next: 'k' | 'w' = (bossStatuses[key] ?? 'w') === 'k' ? 'w' : 'k'
    setBossStatuses(prev => ({ ...prev, [key]: next }))
    await supabase
      .from('boss_statuses')
      .upsert(
        { group_id: groupId, boss_n: bossN, is_killed: next === 'k' },
        { onConflict: 'group_id,boss_n' },
      )
  }, [bossStatuses])

  // -------------------------------------------------------------------------
  // leaveGroup
  // -------------------------------------------------------------------------

  const leaveGroup = useCallback(async (groupId: string) => {
    if (!authUser) return
    const grp = groups.find(g => g.id === groupId)
    if (!grp) return

    const isOwner = grp.members.find(m => m.name === authUser)?.isOwner ?? false

    if (isOwner) {
      // Transfer ownership to first admin, or kick everyone and delete the group
      const nextOwner = grp.members.find(m => !m.isOwner && m.isAdmin)
        ?? grp.members.find(m => !m.isOwner)

      if (nextOwner) {
        // Transfer ownership
        await supabase
          .from('group_members')
          .update({ is_owner: true, is_admin: false })
          .eq('group_id', groupId)
          .eq('battletag', nextOwner.name)
        await supabase
          .from('group_members')
          .update({ is_owner: false })
          .eq('group_id', groupId)
          .eq('battletag', authUser)
        await supabase
          .from('groups')
          .update({ owner_btag: nextOwner.name })
          .eq('id', groupId)
        // Remove self from members
        await supabase
          .from('group_members')
          .delete()
          .eq('group_id', groupId)
          .eq('battletag', authUser)
      } else {
        // No other members — delete everything
        await supabase.from('group_roster').delete().eq('group_id', groupId)
        await supabase.from('group_members').delete().eq('group_id', groupId)
        await supabase.from('groups').delete().eq('id', groupId)
      }
    } else {
      // Regular member — just remove self
      await supabase
        .from('group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('battletag', authUser)
    }

    // Update local state
    setGroups(prev => {
      const next = prev.filter(g => g.id !== groupId)
      setCurrentGroupId(next[0]?.id ?? '')
      return next
    })
  }, [authUser, groups])

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <GuildContext.Provider value={{
      groups, setGroups,
      loading,
      currentGroupId, setCurrentGroupId,
      currentGroup,
      lootAttributions, setLootAttributions, saveLootAttribution, clearLootAttribution,
      bossStatuses, toggleBossKill,
      guildView, setGuildView,
      currentGuildTab, setCurrentGuildTab,
      currentUserRank,
      createGroup,
      validateGroupCode,
      joinGroup,
      kickMember,
      promoteMember,
      demoteMember,
      updateGroupName,
      updateCoAdminPerms,
      updateRosterSlot,
      leaveGroup,
      refreshGroups,
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
