export type Quality = 'epic' | 'legendary' | 'rare' | 'uncommon'
export type Mode = 'mythicplus' | 'raid'
export type SlotId =
  | 'head' | 'neck' | 'shoulder' | 'back' | 'chest' | 'wrist'
  | 'hands' | 'waist' | 'legs' | 'feet'
  | 'ring1' | 'ring2' | 'trinket1' | 'trinket2'
  | 'mainhand' | 'offhand'
export type SlotType = 'Armor' | 'Jewelry' | 'Trinket' | 'Weapon'
export type Role = 'Tank' | 'DPS' | 'Healer'
export type Lang = 'en' | 'fr'
export type GroupType = 'guild' | 'raid' | 'farm'

export interface Spec {
  id: string
  name: string
  role: Role
  e: string
  icon: string
}

export interface WowClass {
  id: string
  name: string
  e: string
  icon: string
  specs: Spec[]
}

export interface Item {
  id: number
  slot: SlotId
  name: string
  source: string
  q: Quality
  ilvl: number
  mode: Mode
  icon?: string
}

export interface MyListItem extends Item {
  obtained: boolean
}

export interface RecoItem {
  slot: SlotId
  name: string
  ilvl: number
  source: string
  prio: 'high' | 'mid' | 'low'
  score: number
  reason: string
  q: Quality
}

export interface BossLoot {
  name: string
  slot: SlotId
  ilvl: number
  q: Quality
  mine: boolean
  who: string
}

export interface Boss {
  n: number
  name: string
  st: 'k' | 'w' | 's'
  loots: BossLoot[]
}

export interface Raid {
  id: number
  name: string
  bosses: Boss[]
}

export interface GuildMemberListItem {
  slot: SlotId
  name: string
  q: Quality
  obtained: boolean
}

export interface GuildMember {
  name: string
  cls: string
  spec: string
  color: string
  list: GuildMemberListItem[]
}

export interface GroupMember {
  name: string
  role: string
  cls: string
  spec: string
  color: string
  status: string
  isOwner: boolean
  isAdmin: boolean   // co-admin
}

export interface GroupRoster {
  tank: (string | null)[]
  healer: (string | null)[]
  dps: (string | null)[]
}

export interface GroupInvite {
  from: string
  groupName: string
  id: string
}

export interface CoAdminPermissions {
  canKick: boolean
  canInvite: boolean
  canManageRoster: boolean
  canAttributeLoots: boolean
  canManageBossStatus: boolean
}

export interface Group {
  id: string
  name: string
  type: GroupType
  code: string
  comp: { tank: number; healer: number; dps: number }
  members: GroupMember[]
  roster: GroupRoster
  invites: GroupInvite[]
  coAdminPerms: CoAdminPermissions
}

export interface LootAttribution {
  name: string
  color: string
  cls: string
}

export type LootAttributions = Record<string, LootAttribution>

export interface WowCharacter {
  id: number
  name: string
  realm: string
  realmSlug: string
  class: string
  level: number
  faction: 'Alliance' | 'Horde'
}
