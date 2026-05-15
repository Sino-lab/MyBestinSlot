import type { Item, SlotId, SlotType } from '../types'

const WH = 'https://wow.zamimg.com/images/wow/icons/large/'

export const SLOT_ICONS: Record<SlotId, string> = {
  head: WH + 'inv_helmet_334v4.jpg',
  neck: WH + 'inv_jewelry_necklace_35.jpg',
  shoulder: WH + 'inv_shoulder_333v4.jpg',
  back: WH + 'inv_cape_335v2.jpg',
  chest: WH + 'inv_chest_plate_legionendgame_d_01.jpg',
  wrist: WH + 'inv_bracer_plate_legionendgame_d_01.jpg',
  hands: WH + 'inv_glove_plate_legionendgame_d_01.jpg',
  waist: WH + 'inv_belt_plate_legionendgame_d_01.jpg',
  legs: WH + 'inv_pant_plate_legionendgame_d_01.jpg',
  feet: WH + 'inv_boot_plate_legionendgame_d_01.jpg',
  ring1: WH + 'inv_jewelry_ring_149.jpg',
  ring2: WH + 'inv_jewelry_ring_149.jpg',
  trinket1: WH + 'inv_jewelry_trinketpvp_90_alliance.jpg',
  trinket2: WH + 'inv_inscription_talenttome01.jpg',
  mainhand: WH + 'inv_sword_2h_artifactashbringertier2_d_02.jpg',
  offhand: WH + 'inv_shield_legionendgame_d_02.jpg',
}

export const SLOT_TYPE: Record<SlotId, SlotType> = {
  head: 'Armor', neck: 'Jewelry', shoulder: 'Armor', back: 'Armor',
  chest: 'Armor', wrist: 'Armor', hands: 'Armor', waist: 'Armor',
  legs: 'Armor', feet: 'Armor', ring1: 'Jewelry', ring2: 'Jewelry',
  trinket1: 'Trinket', trinket2: 'Trinket', mainhand: 'Weapon', offhand: 'Weapon',
}

export const SLOT_LABELS: Record<'en' | 'fr', Record<SlotId, string>> = {
  en: {
    head: 'Head', neck: 'Neck', shoulder: 'Shoulders', back: 'Back',
    chest: 'Chest', wrist: 'Wrists', hands: 'Hands', waist: 'Waist',
    legs: 'Legs', feet: 'Feet', ring1: 'Ring', ring2: 'Ring',
    trinket1: 'Trinket', trinket2: 'Trinket', mainhand: 'Main Hand', offhand: 'Off Hand',
  },
  fr: {
    head: 'Tête', neck: 'Cou', shoulder: 'Épaules', back: 'Dos',
    chest: 'Torse', wrist: 'Poignets', hands: 'Mains', waist: 'Ceinture',
    legs: 'Jambes', feet: 'Pieds', ring1: 'Anneau', ring2: 'Anneau',
    trinket1: 'Bibelot', trinket2: 'Bibelot', mainhand: 'Main principale', offhand: 'Main secondaire',
  },
}

function genAllBIS(): Item[] {
  const pool: { slot: SlotId; items: [string, string, Item['q'], number, Item['mode']][] }[] = [
    { slot: 'head', items: [
      ['Warlord\'s Siege Helm', 'Galakrond\'s Fall', 'epic', 493, 'mythicplus'],
      ['Helm of Blazing Transcendence', 'Fyrakk the Blazing', 'legendary', 502, 'raid'],
      ['Underkeep Warlord Coif', 'Delve Tier 8', 'epic', 480, 'delves'],
      ['Dreadful Gladiator\'s Plate Helm', 'PvP Vendor', 'epic', 489, 'mythicplus'],
      ['Crown of the Dreaming Forest', 'Fyrakk the Blazing', 'epic', 502, 'raid'],
      ['Hood of the Grove Seeker', 'Delve Tier 8', 'epic', 480, 'delves'],
    ]},
    { slot: 'neck', items: [
      ['Emberseal Amulet', 'Crafted', 'rare', 489, 'mythicplus'],
      ['Pendant of Blazing Revelation', 'Nymue', 'epic', 496, 'raid'],
      ['Crystal Focus Pendant', 'Delve Vault', 'epic', 476, 'delves'],
      ['Amulet of Starlight', 'Crafted', 'rare', 486, 'mythicplus'],
      ['Dreamthread Pendant', 'Nymue', 'epic', 496, 'raid'],
    ]},
    { slot: 'shoulder', items: [
      ['Pauldrons of the Inevitable', 'Amirdrassil', 'epic', 493, 'mythicplus'],
      ['Pauldrons of Smoldering Dragon', 'Gnarloot', 'epic', 502, 'raid'],
      ['Vaultbreaker\'s Pauldrons', 'Delve Tier 8', 'epic', 480, 'delves'],
      ['Mantle of Celestial Storms', 'Amirdrassil', 'epic', 493, 'mythicplus'],
      ['Conquest Spaulders', 'Volcoross', 'epic', 502, 'raid'],
    ]},
    { slot: 'back', items: [
      ['Cape of the Thundering Skies', 'Mythic+ Vault', 'epic', 489, 'mythicplus'],
      ['Drape of the Dreaming Vale', 'Larodar', 'epic', 496, 'raid'],
      ['Shadow-Stitched Cloak', 'Delve Chest', 'epic', 476, 'delves'],
      ['Cloak of Moonlit Leaves', 'Mythic+ Vault', 'epic', 489, 'mythicplus'],
      ['Mantle of the Dreamgrove', 'Larodar', 'epic', 496, 'raid'],
    ]},
    { slot: 'chest', items: [
      ['Breastplate of Blazing Wrath', 'Amirdrassil', 'epic', 493, 'mythicplus'],
      ['Plate of Blazing Resolve', 'Fyrakk the Blazing', 'legendary', 502, 'raid'],
      ['Runebound Hauberk', 'Delve Tier 8', 'epic', 480, 'delves'],
      ['Vestments of Scorched Dreams', 'Fyrakk the Blazing', 'epic', 502, 'raid'],
      ['Robes of the Cinderstorm', 'Amirdrassil', 'epic', 493, 'mythicplus'],
    ]},
    { slot: 'wrist', items: [
      ['Iceshard Bracers', 'Crafted', 'rare', 486, 'mythicplus'],
      ['Blazecaster Bracers', 'Crafted', 'rare', 486, 'mythicplus'],
      ['Nature\'s Embrace Bracers', 'Crafted', 'rare', 486, 'mythicplus'],
      ['Icewalker Bracers', 'Crafted', 'rare', 486, 'mythicplus'],
    ]},
    { slot: 'hands', items: [
      ['Gauntlets of the Raging Tempest', 'Ruby Life Pools', 'epic', 489, 'mythicplus'],
      ['Gauntlets of Blazing Wrath', 'Gnarloot', 'epic', 502, 'raid'],
      ['Excavator\'s Iron Grip', 'Delve Chest', 'epic', 476, 'delves'],
      ['Gloves of Perpetual Combustion', 'Mythic+', 'epic', 489, 'mythicplus'],
      ['Gloves of the Blazeweaver', 'Gnarloot', 'epic', 502, 'raid'],
    ]},
    { slot: 'waist', items: [
      ['Belt of the Thunderlord', 'Algeth\'ar Academy', 'epic', 489, 'mythicplus'],
      ['Cinch of the Scorned', 'Volcoross', 'epic', 496, 'raid'],
      ['Girdle of the Undermined', 'Delve Vault', 'epic', 476, 'delves'],
      ['Cord of the Eternal Flame', 'Mythic+', 'epic', 489, 'mythicplus'],
      ['Sash of Smoldering Conviction', 'Volcoross', 'epic', 496, 'raid'],
    ]},
    { slot: 'legs', items: [
      ['Legplates of Crushing Force', 'Amirdrassil', 'epic', 493, 'mythicplus'],
      ['Legplates of the Firelord', 'Fyrakk the Blazing', 'legendary', 502, 'raid'],
      ['Stonewalker Greaves', 'Delve Tier 8', 'epic', 480, 'delves'],
      ['Leggings of the Molten Core', 'Amirdrassil', 'epic', 493, 'mythicplus'],
      ['Trousers of Temporal Combustion', 'Fyrakk the Blazing', 'epic', 502, 'raid'],
    ]},
    { slot: 'feet', items: [
      ['Stompers of the Colossus', 'Ruby Life Pools', 'epic', 489, 'mythicplus'],
      ['Boots of Amirdrassil', 'Nymue', 'epic', 496, 'raid'],
      ['Boots of the Deep Traverse', 'Delve Chest', 'epic', 476, 'delves'],
      ['Sandals of Smoldering Ashes', 'Mythic+', 'epic', 489, 'mythicplus'],
      ['Treads of the Living Roots', 'Council of Dreams', 'epic', 496, 'raid'],
    ]},
    { slot: 'ring1', items: [
      ['Seal of Diurna\'s Chosen', 'Broodkeeper Diurna', 'epic', 489, 'mythicplus'],
      ['Mark of Blazing Fury', 'Fyrakk the Blazing', 'legendary', 502, 'raid'],
      ['Band of the Excavator', 'Delve Vault', 'epic', 476, 'delves'],
      ['Band of Astral Light', 'Mythic+', 'epic', 489, 'mythicplus'],
      ['Loop of Burning Resolve', 'Fyrakk the Blazing', 'epic', 502, 'raid'],
    ]},
    { slot: 'ring2', items: [
      ['Vòring\'s Ethereal Seal', 'Crafted', 'rare', 486, 'mythicplus'],
      ['Seal of Filial Duty', 'Broodkeeper', 'epic', 489, 'mythicplus'],
      ['Crystal Loop of the Deep', 'Delve Chest', 'epic', 476, 'delves'],
      ['Horizon Strider\'s Band', 'Mythic+', 'epic', 489, 'mythicplus'],
      ['Circle of Eternal Torment', 'Smolderon', 'epic', 502, 'raid'],
    ]},
    { slot: 'trinket1', items: [
      ['Fyrakk\'s Tainted Rageheart', 'Fyrakk the Blazing', 'legendary', 502, 'raid'],
      ['Augury of the Primal Flame', 'Mythic+ Vault', 'epic', 489, 'mythicplus'],
      ['Nymue\'s Unraveling Spindle', 'Nymue', 'epic', 502, 'raid'],
      ['Mirror of Fractured Tomorrows', 'Dawn of the Infinite', 'epic', 489, 'mythicplus'],
      ['Igneous Flowstone', 'Smolderon', 'epic', 502, 'raid'],
      ['Treacherous Transmitter', 'Delve Vault', 'epic', 480, 'delves'],
    ]},
    { slot: 'trinket2', items: [
      ['Ashes of the Embersoul', 'Smolderon', 'epic', 502, 'raid'],
      ['Wick of the Torch', 'Mythic+', 'epic', 489, 'mythicplus'],
      ['Nymue\'s Unraveling Spindle', 'Delve Tier 8', 'epic', 480, 'delves'],
      ['Mirror of Fractured Tomorrows', 'Dawn of the Infinite', 'epic', 489, 'mythicplus'],
    ]},
    { slot: 'mainhand', items: [
      ['Fyr\'alath the Dream Render', 'Fyrakk the Blazing', 'legendary', 502, 'raid'],
      ['Balefire Branch', 'Amirdrassil', 'epic', 493, 'mythicplus'],
      ['Greatblade of the Ruined Kingdom', 'Amirdrassil', 'epic', 493, 'mythicplus'],
      ['Glacierbane Staff', 'Amirdrassil', 'epic', 493, 'mythicplus'],
      ['Warblade of the Depths', 'Delve Tier 8', 'epic', 480, 'delves'],
      ['Emberstar Staff', 'Amirdrassil', 'epic', 493, 'mythicplus'],
      ['Dreamer\'s Crook', 'Fyrakk the Blazing', 'epic', 502, 'raid'],
    ]},
    { slot: 'offhand', items: [
      ['Igneous Edge', 'Volcoross', 'epic', 496, 'raid'],
      ['Stormstrike\'s Edge', 'Gnarloot', 'epic', 489, 'mythicplus'],
      ['Underseal Fragment', 'Delve Vault', 'epic', 476, 'delves'],
      ['Stormstrike\'s Edge', 'Mythic+', 'epic', 489, 'mythicplus'],
    ]},
  ]

  let id = 1
  const items: Item[] = []
  pool.forEach(group => {
    group.items.forEach(([name, source, q, ilvl, mode]) => {
      items.push({ id: id++, slot: group.slot, name, source, q, ilvl, mode })
    })
  })
  return items
}

export const ALL_ITEMS = genAllBIS()

export const SLOT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Armor', label: '🛡 Armor' },
  { id: 'Jewelry', label: '💍 Jewelry' },
  { id: 'Trinket', label: '🔮 Trinket' },
  { id: 'Weapon', label: '⚔️ Weapon' },
  { id: 'head', label: 'Head' }, { id: 'neck', label: 'Neck' },
  { id: 'shoulder', label: 'Shoulders' }, { id: 'chest', label: 'Chest' },
  { id: 'legs', label: 'Legs' }, { id: 'feet', label: 'Feet' },
  { id: 'back', label: 'Back' }, { id: 'wrist', label: 'Wrists' },
  { id: 'hands', label: 'Hands' }, { id: 'waist', label: 'Waist' },
  { id: 'ring1', label: 'Ring' }, { id: 'trinket1', label: 'Trinket' },
  { id: 'mainhand', label: 'Main Hand' }, { id: 'offhand', label: 'Off Hand' },
]
