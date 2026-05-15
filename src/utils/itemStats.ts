import type { SlotId } from '../types'

const SECONDARIES = ['Haste', 'Critical Strike', 'Mastery', 'Versatility'] as const
type Secondary = typeof SECONDARIES[number]

const SECONDARY_PAIRS: Record<string, [Secondary, Secondary]> = {
  head:     ['Haste',      'Critical Strike'],
  neck:     ['Haste',      'Versatility'],
  shoulder: ['Mastery',    'Critical Strike'],
  back:     ['Haste',      'Versatility'],
  chest:    ['Haste',      'Mastery'],
  wrist:    ['Critical Strike', 'Versatility'],
  hands:    ['Haste',      'Critical Strike'],
  waist:    ['Mastery',    'Versatility'],
  legs:     ['Haste',      'Mastery'],
  feet:     ['Critical Strike', 'Haste'],
  ring1:    ['Haste',      'Critical Strike'],
  ring2:    ['Mastery',    'Versatility'],
  trinket1: ['Haste',      'Critical Strike'],
  trinket2: ['Mastery',    'Versatility'],
  mainhand: ['Haste',      'Critical Strike'],
  offhand:  ['Mastery',    'Versatility'],
}

function seed(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (Math.imul(31, h) + name.charCodeAt(i)) | 0
  return Math.abs(h)
}

function jitter(base: number, s: number, range: number): number {
  return Math.round(base + ((s % (range * 2)) - range))
}

export interface ItemStats {
  stamina: number
  primary: number | null
  sec1: { name: Secondary; value: number }
  sec2: { name: Secondary; value: number }
  dps: string | null
  special: string | null
}

export function getItemStats(slot: SlotId, ilvl: number, name: string): ItemStats {
  const s = seed(name)
  const isTrinket = slot === 'trinket1' || slot === 'trinket2'
  const isJewelry = slot === 'ring1' || slot === 'ring2' || slot === 'neck'
  const isWeapon  = slot === 'mainhand' || slot === 'offhand'

  const stamina = isJewelry ? Math.round(ilvl * 8.2 + jitter(0, s, 40))
    : isTrinket ? Math.round(ilvl * 6.5 + jitter(0, s, 30))
    : Math.round(ilvl * 11.8 + jitter(0, s, 80))

  const primary = (isJewelry || isTrinket) ? null
    : Math.round(ilvl * 5.6 + jitter(0, s >> 4, 60))

  const budget = isJewelry ? ilvl * 6.2 : isTrinket ? ilvl * 4.8 : ilvl * 5.4
  const split = 0.52 + ((s % 12) / 100)
  const [s1name, s2name] = SECONDARY_PAIRS[slot] ?? ['Haste', 'Critical Strike']
  const sec1 = { name: s1name, value: Math.round(budget * split + jitter(0, s >> 2, 30)) }
  const sec2 = { name: s2name, value: Math.round(budget * (1 - split) + jitter(0, s >> 6, 30)) }

  let dps: string | null = null
  let special: string | null = null

  if (isWeapon) {
    const minDps = Math.round(ilvl * 3.1)
    const maxDps = Math.round(ilvl * 4.7)
    dps = `${minDps} – ${maxDps} Damage`
  }

  if (isTrinket) {
    const specials = [
      'Equip: Your spells and abilities have a chance to increase your primary stat.',
      'Use: Unleash a burst of energy, increasing Haste for 20 sec.',
      'Equip: Dealing damage has a chance to trigger a resonance burst.',
      'Use: Call upon the power within, granting a shield for 15 sec.',
      'Equip: Healing or damaging enemies has a chance to spawn an orb.',
    ]
    special = specials[s % specials.length]
  }

  return { stamina, primary, sec1, sec2, dps, special }
}
