import type { WowClass } from '../types'

const WH = 'https://wow.zamimg.com/images/wow/icons/large/'

export const CLASS_COLORS: Record<string, string> = {
  warrior: '#C69B3A', paladin: '#F48CBA', hunter: '#AAD372',
  rogue: '#FFF468', priest: '#dddddd', shaman: '#0070DD',
  mage: '#3FC7EB', warlock: '#8788EE', monk: '#00FF98',
  druid: '#FF7C0A', demonhunter: '#A330C9', evoker: '#33937F',
  deathknight: '#C41E3A',
}

export const CLASSES: WowClass[] = [
  { id: 'warrior', name: 'Warrior', e: '⚔️', icon: WH + 'classicon_warrior.jpg', specs: [
    { id: 'arms', name: 'Arms', role: 'DPS', e: '🗡️', icon: WH + 'ability_warrior_savageblow.jpg' },
    { id: 'fury', name: 'Fury', role: 'DPS', e: '🔥', icon: WH + 'ability_warrior_innerrage.jpg' },
    { id: 'protection', name: 'Protection', role: 'Tank', e: '🛡️', icon: WH + 'inv_shield_06.jpg' },
  ]},
  { id: 'paladin', name: 'Paladin', e: '🛡️', icon: WH + 'classicon_paladin.jpg', specs: [
    { id: 'holy', name: 'Holy', role: 'Healer', e: '✨', icon: WH + 'spell_holy_holy.jpg' },
    { id: 'protection', name: 'Protection', role: 'Tank', e: '🛡️', icon: WH + 'spell_holy_devotionaura.jpg' },
    { id: 'retribution', name: 'Retribution', role: 'DPS', e: '⚔️', icon: WH + 'spell_holy_auraoflight.jpg' },
  ]},
  { id: 'hunter', name: 'Hunter', e: '🏹', icon: WH + 'classicon_hunter.jpg', specs: [
    { id: 'beastmastery', name: 'Beast Mastery', role: 'DPS', e: '🐺', icon: WH + 'ability_hunter_bestialdiscipline.jpg' },
    { id: 'marksmanship', name: 'Marksmanship', role: 'DPS', e: '🎯', icon: WH + 'ability_hunter_focusedaim.jpg' },
    { id: 'survival', name: 'Survival', role: 'DPS', e: '🏕️', icon: WH + 'ability_hunter_camouflage.jpg' },
  ]},
  { id: 'rogue', name: 'Rogue', e: '🗡️', icon: WH + 'classicon_rogue.jpg', specs: [
    { id: 'assassination', name: 'Assassination', role: 'DPS', e: '☠️', icon: WH + 'ability_rogue_deadlybrew.jpg' },
    { id: 'outlaw', name: 'Outlaw', role: 'DPS', e: '🔫', icon: WH + 'ability_rogue_waylay.jpg' },
    { id: 'subtlety', name: 'Subtlety', role: 'DPS', e: '🌑', icon: WH + 'ability_stealth.jpg' },
  ]},
  { id: 'mage', name: 'Mage', e: '🔮', icon: WH + 'classicon_mage.jpg', specs: [
    { id: 'arcane', name: 'Arcane', role: 'DPS', e: '💜', icon: WH + 'spell_holy_magicalsentry.jpg' },
    { id: 'fire', name: 'Fire', role: 'DPS', e: '🔥', icon: WH + 'spell_fire_firebolt02.jpg' },
    { id: 'frost', name: 'Frost', role: 'DPS', e: '❄️', icon: WH + 'spell_frost_frostbolt02.jpg' },
  ]},
  { id: 'warlock', name: 'Warlock', e: '👁️', icon: WH + 'classicon_warlock.jpg', specs: [
    { id: 'affliction', name: 'Affliction', role: 'DPS', e: '🟣', icon: WH + 'spell_shadow_deathcoil.jpg' },
    { id: 'demonology', name: 'Demonology', role: 'DPS', e: '👿', icon: WH + 'spell_shadow_metamorphosis.jpg' },
    { id: 'destruction', name: 'Destruction', role: 'DPS', e: '🔥', icon: WH + 'spell_shadow_rainoffire.jpg' },
  ]},
  { id: 'druid', name: 'Druid', e: '🌿', icon: WH + 'classicon_druid.jpg', specs: [
    { id: 'balance', name: 'Balance', role: 'DPS', e: '🌙', icon: WH + 'spell_nature_starfall.jpg' },
    { id: 'feral', name: 'Feral', role: 'DPS', e: '🐱', icon: WH + 'ability_druid_catform.jpg' },
    { id: 'guardian', name: 'Guardian', role: 'Tank', e: '🐻', icon: WH + 'ability_racial_bearform.jpg' },
    { id: 'restoration', name: 'Restoration', role: 'Healer', e: '🌱', icon: WH + 'spell_nature_healingtouch.jpg' },
  ]},
  { id: 'deathknight', name: 'Death Knight', e: '💀', icon: WH + 'classicon_deathknight.jpg', specs: [
    { id: 'blood', name: 'Blood', role: 'Tank', e: '🩸', icon: WH + 'spell_deathknight_bloodpresence.jpg' },
    { id: 'frost', name: 'Frost', role: 'DPS', e: '❄️', icon: WH + 'spell_deathknight_frostpresence.jpg' },
    { id: 'unholy', name: 'Unholy', role: 'DPS', e: '☠️', icon: WH + 'spell_deathknight_unholypresence.jpg' },
  ]},
  { id: 'monk', name: 'Monk', e: '🥋', icon: WH + 'classicon_monk.jpg', specs: [
    { id: 'brewmaster', name: 'Brewmaster', role: 'Tank', e: '🍺', icon: WH + 'monk_stance_drunkenox.jpg' },
    { id: 'mistweaver', name: 'Mistweaver', role: 'Healer', e: '🌫️', icon: WH + 'monk_stance_wiseserpent.jpg' },
    { id: 'windwalker', name: 'Windwalker', role: 'DPS', e: '💨', icon: WH + 'monk_stance_whitetiger.jpg' },
  ]},
  { id: 'demonhunter', name: 'Demon Hunter', e: '⚡', icon: WH + 'classicon_demonhunter.jpg', specs: [
    { id: 'havoc', name: 'Havoc', role: 'DPS', e: '🔥', icon: WH + 'ability_demonhunter_specdps.jpg' },
    { id: 'vengeance', name: 'Vengeance', role: 'Tank', e: '🛡️', icon: WH + 'ability_demonhunter_spectank.jpg' },
  ]},
  { id: 'shaman', name: 'Shaman', e: '⚡', icon: WH + 'classicon_shaman.jpg', specs: [
    { id: 'elemental', name: 'Elemental', role: 'DPS', e: '⚡', icon: WH + 'spell_nature_lightning.jpg' },
    { id: 'enhancement', name: 'Enhancement', role: 'DPS', e: '🔨', icon: WH + 'spell_shaman_improvedstormstrike.jpg' },
    { id: 'restoration', name: 'Restoration', role: 'Healer', e: '💧', icon: WH + 'spell_nature_magicimmunity.jpg' },
  ]},
  { id: 'priest', name: 'Priest', e: '✨', icon: WH + 'classicon_priest.jpg', specs: [
    { id: 'discipline', name: 'Discipline', role: 'Healer', e: '🌟', icon: WH + 'spell_holy_powerwordshield.jpg' },
    { id: 'holy', name: 'Holy', role: 'Healer', e: '✨', icon: WH + 'spell_holy_guardianspirit.jpg' },
    { id: 'shadow', name: 'Shadow', role: 'DPS', e: '🌑', icon: WH + 'spell_shadow_shadowwordpain.jpg' },
  ]},
  { id: 'evoker', name: 'Evoker', e: '🐉', icon: WH + 'classicon_evoker.jpg', specs: [
    { id: 'augmentation', name: 'Augmentation', role: 'DPS', e: '🌿', icon: WH + 'classicon_evoker_augmentation.jpg' },
    { id: 'devastation', name: 'Devastation', role: 'DPS', e: '🔥', icon: WH + 'classicon_evoker_devastation.jpg' },
    { id: 'preservation', name: 'Preservation', role: 'Healer', e: '💚', icon: WH + 'classicon_evoker_preservation.jpg' },
  ]},
]
