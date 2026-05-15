import type { RecoItem, Mode } from '../types'

export function makeReco(mode: Mode): RecoItem[] {
  const b = mode === 'mythicplus' ? 210 : 197
  return [
    { slot: 'trinket1', name: "Fyrakk's Tainted Rageheart", ilvl: b + 4, source: mode === 'raid' ? 'Fyrakk the Blazing' : 'Mythic+ Vault', prio: 'high', score: 98, reason: 'Best-in-slot trinket. The proc scales extremely well with Mastery and Haste.', q: 'legendary' },
    { slot: 'mainhand', name: mode === 'raid' ? "Fyr'alath the Dream Render" : 'Balefire Branch', ilvl: b + 4, source: mode === 'raid' ? 'Fyrakk the Blazing' : 'Amirdrassil', prio: 'high', score: 95, reason: 'Highest DPS weapon available. Massive upgrade over any alternative.', q: 'legendary' },
    { slot: 'head', name: 'Helm of Blazing Transcendence', ilvl: b + 4, source: 'Fyrakk the Blazing', prio: 'high', score: 88, reason: "Tier set piece — enables the 2pc bonus. Priority if you're missing it.", q: 'epic' },
    { slot: 'chest', name: 'Breastplate of Blazing Wrath', ilvl: b + 4, source: 'Amirdrassil', prio: 'high', score: 86, reason: '2nd tier piece. Completes the 2pc set bonus — enormous value.', q: 'epic' },
    { slot: 'ring1', name: "Seal of Diurna's Chosen", ilvl: b, source: 'Broodkeeper Diurna', prio: 'mid', score: 74, reason: 'Best stat ring. High Haste + Crit with no wasted budget.', q: 'epic' },
    { slot: 'legs', name: 'Legplates of Crushing Force', ilvl: b + 4, source: 'Amirdrassil', prio: 'mid', score: 71, reason: 'Strong secondaries. Good pick while waiting for tier legs.', q: 'epic' },
    { slot: 'trinket2', name: 'Mirror of Fractured Tomorrows', ilvl: b, source: 'Dawn of the Infinite', prio: 'mid', score: 68, reason: 'Excellent 2nd trinket. Pairs perfectly with Rageheart.', q: 'epic' },
    { slot: 'neck', name: 'Emberseal Amulet', ilvl: b, source: 'Crafted', prio: 'low', score: 52, reason: 'Easy to craft. Add an Embellishment for extra value.', q: 'rare' },
  ]
}
