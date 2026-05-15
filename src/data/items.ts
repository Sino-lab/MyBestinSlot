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
      ["Capuche à plumes de traque-ronces", "Lu'ashal", 'epic', 197, 'raid'],
      ["Cabasset de commandement de l'ost", "Lu'ashal", 'epic', 197, 'raid'],
      ['Heaume du champion éclairé', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Coiffe de l\'excavatrice', 'Délves Rang 8', 'epic', 177, 'delves'],
    ]},
    { slot: 'neck', items: [
      ["Chaîne d'observation ancienne", 'Pincombe', 'epic', 197, 'raid'],
      ['Amulette de cristal du néant', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Pendentif du gardien des délves', 'Délves Rang 8', 'epic', 177, 'delves'],
    ]},
    { slot: 'shoulder', items: [
      ['Épaulières de l\'éclaireur du néant', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Spallières du gardien des ruines', 'Délves Rang 8', 'epic', 177, 'delves'],
      ['Épaulettes de l\'avant-garde', 'Mythic+', 'epic', 184, 'mythicplus'],
    ]},
    { slot: 'back', items: [
      ['Cape de l\'ombre filante', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Manteau du récupérateur', 'Délves Rang 8', 'epic', 177, 'delves'],
      ['Cape du voyageur du Vide', 'Mythic+', 'epic', 184, 'mythicplus'],
    ]},
    { slot: 'chest', items: [
      ["Robe dorée d'étude abjecte", "Lu'ashal", 'epic', 197, 'raid'],
      ['Plastron du défenseur des brisants', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Armure du pilleur de délves', 'Délves Rang 8', 'epic', 177, 'delves'],
    ]},
    { slot: 'wrist', items: [
      ['Brassards forgés à la rune', 'Artisanat', 'rare', 183, 'mythicplus'],
      ['Bracelets de l\'ombre liée', 'Artisanat', 'rare', 183, 'mythicplus'],
      ['Brassards du néant tissé', 'Artisanat', 'rare', 183, 'mythicplus'],
    ]},
    { slot: 'hands', items: [
      ['Gantelets du champion de l\'éveil', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Gants du fouilleur de ruines', 'Délves Rang 8', 'epic', 177, 'delves'],
      ['Gants de l\'éclaireur d\'ombre', 'Mythic+', 'epic', 184, 'mythicplus'],
    ]},
    { slot: 'waist', items: [
      ['Ceinture du tirailleur des brisants', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Ceinturon du récupérateur', 'Délves Rang 8', 'epic', 177, 'delves'],
      ['Ceinture de l\'éclaireur du néant', 'Mythic+', 'epic', 184, 'mythicplus'],
    ]},
    { slot: 'legs', items: [
      ['Hauts-de-chausses de voltige dévorants', "Lu'ashal", 'epic', 197, 'raid'],
      ['Jambières du champion de l\'éveil', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Jambières du pilleur de délves', 'Délves Rang 8', 'epic', 177, 'delves'],
    ]},
    { slot: 'feet', items: [
      ['Bottes de l\'éclaireur des ruines', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Bottes du récupérateur de délves', 'Délves Rang 8', 'epic', 177, 'delves'],
      ['Sandales du marcheur du néant', 'Mythic+', 'epic', 184, 'mythicplus'],
    ]},
    { slot: 'ring1', items: [
      ["Chevalière d'ombre envahissante", 'Prédaxas', 'epic', 197, 'raid'],
      ['Anneau du champion de l\'éveil', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Bague du pilleur de délves', 'Délves Rang 8', 'epic', 177, 'delves'],
    ]},
    { slot: 'ring2', items: [
      ['Anneau de cristal du néant', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Sceau du gardien des ruines', 'Délves Rang 8', 'epic', 177, 'delves'],
      ['Bague de l\'ombre tissée', 'Mythic+', 'epic', 184, 'mythicplus'],
    ]},
    { slot: 'trinket1', items: [
      ["Insigne pérégrin perdu", "Lu'ashal", 'epic', 197, 'raid'],
      ['Transmetteur perfide', 'Délves Rang 8', 'epic', 177, 'delves'],
      ['Cristal de focalisation du néant', 'Mythic+', 'epic', 184, 'mythicplus'],
    ]},
    { slot: 'trinket2', items: [
      ['Pierre de résonance de l\'ombre', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Talisman du gardien des délves', 'Délves Rang 8', 'epic', 177, 'delves'],
      ['Amulette du récupérateur', 'Mythic+', 'epic', 184, 'mythicplus'],
    ]},
    { slot: 'mainhand', items: [
      ["Fendoir de bête d'aube agitée", "Lu'ashal", 'epic', 197, 'raid'],
      ["Sceptre de la Lumière déliée", "Lu'ashal", 'epic', 197, 'raid'],
      ["Daguortie boudeuse", "Thorm'belan", 'epic', 197, 'raid'],
      ["Lame-épine florissante", "Thorm'belan", 'epic', 197, 'raid'],
      ["Florapointe bestiale", "Thorm'belan", 'epic', 197, 'raid'],
      ["Tranche-âmes de l'avant-garde dévorante", 'Prédaxas', 'epic', 197, 'raid'],
      ["Flèche d'arque-Vide", 'Prédaxas', 'epic', 197, 'raid'],
      ["Arc long brutal de sentinelle forestière", 'Pincombe', 'epic', 197, 'raid'],
      ['Grande lame du champion de l\'éveil', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Bâton du fouilleur de ruines', 'Délves Rang 8', 'epic', 177, 'delves'],
    ]},
    { slot: 'offhand', items: [
      ["Sceptre des Chants éternels rayonnant", "Lu'ashal", 'epic', 197, 'raid'],
      ["Rempart garde-combe", 'Pincombe', 'epic', 197, 'raid'],
      ['Fragment du sceau de l\'éveil', 'Mythic+', 'epic', 184, 'mythicplus'],
      ['Bouclier du gardien des délves', 'Délves Rang 8', 'epic', 177, 'delves'],
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
