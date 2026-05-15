import type { Boss, GuildMember, Group } from '../types'

export const GUILD_MEMBERS: GuildMember[] = [
  { name: 'Thordak', cls: 'warrior', spec: 'Fury', color: '#C69B3A', list: [
    { slot: 'trinket1', name: "Fyrakk's Tainted Rageheart", q: 'legendary', obtained: false },
    { slot: 'mainhand', name: "Fyr'alath the Dream Render", q: 'legendary', obtained: false },
    { slot: 'head', name: 'Helm of Blazing Transcendence', q: 'epic', obtained: true },
    { slot: 'chest', name: 'Plate of Blazing Resolve', q: 'epic', obtained: false },
    { slot: 'legs', name: 'Legplates of the Firelord', q: 'epic', obtained: true },
  ]},
  { name: 'Kira', cls: 'mage', spec: 'Fire', color: '#3FC7EB', list: [
    { slot: 'trinket1', name: "Fyrakk's Tainted Rageheart", q: 'legendary', obtained: true },
    { slot: 'head', name: 'Crown of the Dreamfire', q: 'epic', obtained: false },
    { slot: 'mainhand', name: "Dreamer's Crook", q: 'epic', obtained: false },
    { slot: 'ring1', name: 'Loop of Burning Resolve', q: 'epic', obtained: false },
  ]},
  { name: 'Valeria', cls: 'paladin', spec: 'Holy', color: '#F48CBA', list: [
    { slot: 'neck', name: 'Dreamthread Pendant', q: 'epic', obtained: false },
    { slot: 'chest', name: 'Vestments of Scorched Dreams', q: 'epic', obtained: true },
    { slot: 'trinket2', name: 'Ashes of the Embersoul', q: 'epic', obtained: false },
  ]},
  { name: 'Draxx', cls: 'deathknight', spec: 'Unholy', color: '#C41E3A', list: [
    { slot: 'mainhand', name: "Fyr'alath the Dream Render", q: 'legendary', obtained: false },
    { slot: 'head', name: 'Helm of Blazing Transcendence', q: 'epic', obtained: false },
    { slot: 'trinket1', name: "Fyrakk's Tainted Rageheart", q: 'legendary', obtained: true },
    { slot: 'legs', name: 'Legplates of the Firelord', q: 'epic', obtained: false },
  ]},
]

export const BOSSES: Boss[] = [
  { n: 1, name: 'Gnarloot', st: 'k', loots: [
    { name: 'Gauntlets of the Raging Tempest', slot: 'hands', ilvl: 502, q: 'epic', mine: true, who: 'Thordak' },
    { name: 'Pauldrons of Smoldering Dragon', slot: 'shoulder', ilvl: 502, q: 'epic', mine: false, who: 'Valeria' },
    { name: 'Staff of the Dreaming Grove', slot: 'mainhand', ilvl: 502, q: 'epic', mine: false, who: 'Kira' },
  ]},
  { n: 2, name: 'Igira the Cruel', st: 'k', loots: [
    { name: 'Belt of Shattered Fate', slot: 'waist', ilvl: 496, q: 'epic', mine: true, who: 'Thordak' },
    { name: "Igira's Brutal Shoulderguard", slot: 'shoulder', ilvl: 496, q: 'epic', mine: false, who: 'Draxx' },
  ]},
  { n: 3, name: 'Volcoross', st: 'k', loots: [
    { name: "Seal of Diurna's Chosen", slot: 'ring1', ilvl: 496, q: 'epic', mine: false, who: 'Kira' },
    { name: 'Igneous Edge', slot: 'offhand', ilvl: 496, q: 'epic', mine: false, who: 'Valeria' },
  ]},
  { n: 4, name: 'Council of Dreams', st: 'k', loots: [
    { name: 'Treads of the Living Roots', slot: 'feet', ilvl: 496, q: 'epic', mine: true, who: 'Thordak' },
    { name: 'Dreamthread Pendant', slot: 'neck', ilvl: 496, q: 'epic', mine: false, who: 'Kira' },
  ]},
  { n: 5, name: 'Larodar', st: 'k', loots: [
    { name: 'Drape of the Dreaming Vale', slot: 'back', ilvl: 496, q: 'epic', mine: false, who: 'Valeria' },
  ]},
  { n: 6, name: 'Nymue', st: 'k', loots: [
    { name: "Nymue's Unraveling Spindle", slot: 'trinket1', ilvl: 496, q: 'epic', mine: true, who: 'Thordak' },
    { name: 'Loop of Emerald Stars', slot: 'ring2', ilvl: 502, q: 'epic', mine: false, who: 'Kira' },
  ]},
  { n: 7, name: 'Smolderon', st: 'k', loots: [
    { name: 'Ashes of the Embersoul', slot: 'trinket1', ilvl: 502, q: 'epic', mine: true, who: 'Thordak' },
    { name: 'Circle of Eternal Torment', slot: 'ring1', ilvl: 502, q: 'epic', mine: false, who: 'Draxx' },
    { name: 'Mantle of the Ember Court', slot: 'shoulder', ilvl: 502, q: 'epic', mine: false, who: 'Draxx' },
  ]},
  { n: 8, name: 'Tindral Sageswift', st: 'w', loots: [] },
  { n: 9, name: 'Fyrakk the Blazing', st: 's', loots: [
    { name: "Fyr'alath the Dream Render", slot: 'mainhand', ilvl: 502, q: 'legendary', mine: false, who: '—' },
  ]},
]

export const INITIAL_GROUPS: Group[] = [
  {
    id: 'g1', name: 'Mythic Nexus', type: 'guild', code: 'MN-X4K9P2',
    comp: { tank: 2, healer: 4, dps: 14 },
    members: [
      { name: 'Thordak', role: 'DPS', cls: 'Warrior', spec: 'Fury', color: '#C69B3A', status: 'active', isAdmin: true },
      { name: 'Kira', role: 'DPS', cls: 'Mage', spec: 'Fire', color: '#3FC7EB', status: 'active', isAdmin: false },
      { name: 'Valeria', role: 'Healer', cls: 'Paladin', spec: 'Holy', color: '#F48CBA', status: 'active', isAdmin: false },
      { name: 'Draxx', role: 'DPS', cls: 'Death Knight', spec: 'Unholy', color: '#C41E3A', status: 'active', isAdmin: false },
      { name: 'Lirien', role: 'Healer', cls: 'Druid', spec: 'Restoration', color: '#FF7C0A', status: 'active', isAdmin: false },
      { name: 'Ramos', role: 'Tank', cls: 'Demon Hunter', spec: 'Vengeance', color: '#A330C9', status: 'active', isAdmin: false },
    ],
    roster: { tank: [], healer: [], dps: [] },
    invites: [],
  },
  {
    id: 'g2', name: 'Farm Squad', type: 'farm', code: 'FS-T2R8W1',
    comp: { tank: 1, healer: 2, dps: 7 },
    members: [
      { name: 'Thordak', role: 'DPS', cls: 'Warrior', spec: 'Fury', color: '#C69B3A', status: 'active', isAdmin: true },
      { name: 'Kira', role: 'DPS', cls: 'Mage', spec: 'Fire', color: '#3FC7EB', status: 'active', isAdmin: false },
    ],
    roster: { tank: [], healer: [], dps: [] },
    invites: [{ from: 'Zephyr', groupName: 'Farm Squad', id: 'inv1' }],
  },
]
