import type { Boss, GuildMember, Group } from '../types'

export const GUILD_MEMBERS: GuildMember[] = [
  { name: 'Thordak', cls: 'warrior', spec: 'Fury', color: '#C69B3A', list: [
    { slot: 'trinket1', name: "Insigne pérégrin perdu", q: 'epic', obtained: false },
    { slot: 'mainhand', name: "Fendoir de bête d'aube agitée", q: 'epic', obtained: false },
    { slot: 'head', name: "Cabasset de commandement de l'ost", q: 'epic', obtained: true },
    { slot: 'chest', name: "Robe dorée d'étude abjecte", q: 'epic', obtained: false },
    { slot: 'legs', name: 'Hauts-de-chausses de voltige dévorants', q: 'epic', obtained: true },
  ]},
  { name: 'Kira', cls: 'mage', spec: 'Fire', color: '#3FC7EB', list: [
    { slot: 'trinket1', name: "Insigne pérégrin perdu", q: 'epic', obtained: true },
    { slot: 'head', name: "Capuche à plumes de traque-ronces", q: 'epic', obtained: false },
    { slot: 'mainhand', name: "Sceptre de la Lumière déliée", q: 'epic', obtained: false },
    { slot: 'ring1', name: "Chevalière d'ombre envahissante", q: 'epic', obtained: false },
  ]},
  { name: 'Valeria', cls: 'paladin', spec: 'Holy', color: '#F48CBA', list: [
    { slot: 'neck', name: "Chaîne d'observation ancienne", q: 'epic', obtained: false },
    { slot: 'chest', name: "Robe dorée d'étude abjecte", q: 'epic', obtained: true },
    { slot: 'offhand', name: "Rempart garde-combe", q: 'epic', obtained: false },
  ]},
  { name: 'Draxx', cls: 'deathknight', spec: 'Unholy', color: '#C41E3A', list: [
    { slot: 'mainhand', name: "Tranche-âmes de l'avant-garde dévorante", q: 'epic', obtained: false },
    { slot: 'head', name: "Cabasset de commandement de l'ost", q: 'epic', obtained: false },
    { slot: 'trinket1', name: "Insigne pérégrin perdu", q: 'epic', obtained: true },
    { slot: 'legs', name: 'Hauts-de-chausses de voltige dévorants', q: 'epic', obtained: false },
  ]},
]

export const BOSSES: Boss[] = [
  { n: 1, name: "Lu'ashal", st: 'k', loots: [
    { name: "Insigne pérégrin perdu", slot: 'trinket1', ilvl: 197, q: 'epic', mine: true, who: 'Kira' },
    { name: "Robe dorée d'étude abjecte", slot: 'chest', ilvl: 197, q: 'epic', mine: false, who: 'Valeria' },
    { name: 'Hauts-de-chausses de voltige dévorants', slot: 'legs', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Capuche à plumes de traque-ronces", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Cabasset de commandement de l'ost", slot: 'head', ilvl: 197, q: 'epic', mine: true, who: 'Thordak' },
    { name: "Fendoir de bête d'aube agitée", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Sceptre de la Lumière déliée", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: 'Kira' },
    { name: "Sceptre des Chants éternels rayonnant", slot: 'offhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
  ]},
  { n: 2, name: "Thorm'belan", st: 'k', loots: [
    { name: "Daguortie boudeuse", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: 'Draxx' },
    { name: "Lame-épine florissante", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Florapointe bestiale", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Insigne pérégrin perdu", slot: 'trinket1', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Robe dorée d'étude abjecte", slot: 'chest', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: 'Hauts-de-chausses de voltige dévorants', slot: 'legs', ilvl: 197, q: 'epic', mine: true, who: 'Thordak' },
    { name: "Capuche à plumes de traque-ronces", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Cabasset de commandement de l'ost", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
  ]},
  { n: 3, name: 'Prédaxas', st: 'k', loots: [
    { name: "Insigne pérégrin perdu", slot: 'trinket1', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Robe dorée d'étude abjecte", slot: 'chest', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: 'Hauts-de-chausses de voltige dévorants', slot: 'legs', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Capuche à plumes de traque-ronces", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Cabasset de commandement de l'ost", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Chevalière d'ombre envahissante", slot: 'ring1', ilvl: 197, q: 'epic', mine: true, who: 'Kira' },
    { name: "Tranche-âmes de l'avant-garde dévorante", slot: 'mainhand', ilvl: 197, q: 'epic', mine: true, who: 'Draxx' },
    { name: "Flèche d'arque-Vide", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
  ]},
  { n: 4, name: 'Pincombe', st: 'k', loots: [
    { name: "Insigne pérégrin perdu", slot: 'trinket1', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Robe dorée d'étude abjecte", slot: 'chest', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: 'Hauts-de-chausses de voltige dévorants', slot: 'legs', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Capuche à plumes de traque-ronces", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Cabasset de commandement de l'ost", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Chaîne d'observation ancienne", slot: 'neck', ilvl: 197, q: 'epic', mine: false, who: 'Valeria' },
    { name: "Arc long brutal de sentinelle forestière", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Rempart garde-combe", slot: 'offhand', ilvl: 197, q: 'epic', mine: true, who: 'Valeria' },
  ]},
]

export const MIDNIGHT_BOSSES_FULL: Boss[] = [
  { n: 1, name: "Lu'ashal", st: 'k', loots: [
    { name: "Insigne pérégrin perdu", slot: 'trinket1', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Robe dorée d'étude abjecte", slot: 'chest', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: 'Hauts-de-chausses de voltige dévorants', slot: 'legs', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Capuche à plumes de traque-ronces", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Cabasset de commandement de l'ost", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Fendoir de bête d'aube agitée", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Sceptre de la Lumière déliée", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Sceptre des Chants éternels rayonnant", slot: 'offhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
  ]},
  { n: 2, name: "Thorm'belan", st: 'k', loots: [
    { name: "Daguortie boudeuse", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Lame-épine florissante", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Florapointe bestiale", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Insigne pérégrin perdu", slot: 'trinket1', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Robe dorée d'étude abjecte", slot: 'chest', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: 'Hauts-de-chausses de voltige dévorants', slot: 'legs', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Capuche à plumes de traque-ronces", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Cabasset de commandement de l'ost", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
  ]},
  { n: 3, name: 'Prédaxas', st: 'k', loots: [
    { name: "Insigne pérégrin perdu", slot: 'trinket1', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Robe dorée d'étude abjecte", slot: 'chest', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: 'Hauts-de-chausses de voltige dévorants', slot: 'legs', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Capuche à plumes de traque-ronces", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Cabasset de commandement de l'ost", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Chevalière d'ombre envahissante", slot: 'ring1', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Tranche-âmes de l'avant-garde dévorante", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Flèche d'arque-Vide", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
  ]},
  { n: 4, name: 'Pincombe', st: 'k', loots: [
    { name: "Insigne pérégrin perdu", slot: 'trinket1', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Robe dorée d'étude abjecte", slot: 'chest', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: 'Hauts-de-chausses de voltige dévorants', slot: 'legs', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Capuche à plumes de traque-ronces", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Cabasset de commandement de l'ost", slot: 'head', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Chaîne d'observation ancienne", slot: 'neck', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Arc long brutal de sentinelle forestière", slot: 'mainhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
    { name: "Rempart garde-combe", slot: 'offhand', ilvl: 197, q: 'epic', mine: false, who: '—' },
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
