import { useState, useMemo } from 'react'
import { useApp } from '../../../context/AppContext'
import { getItemIcon, SLOT_ICONS, SLOT_LABELS } from '../../../data/items'
import { CLASS_COLORS, CLASSES } from '../../../data/classes'
import { getItemStats } from '../../../utils/itemStats'
import type { RecoItem, SlotId, Mode } from '../../../types'
import styles from './CharacterPanel.module.css'

// ── Slot layout ──────────────────────────────────────────────────────────────
const LEFT_SLOTS:  SlotId[] = ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist']
const RIGHT_SLOTS: SlotId[] = ['hands', 'waist', 'legs', 'feet', 'ring1', 'ring2', 'trinket1', 'trinket2']
const BOTTOM_SLOTS: SlotId[] = ['mainhand', 'offhand']

const SL = SLOT_LABELS['fr']

const QUALITY_CLASS: Record<string, string> = {
  epic: styles.epic,
  legendary: styles.legendary,
  rare: styles.rare,
  uncommon: styles.uncommon,
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function itemBySlot(items: RecoItem[], slot: SlotId): RecoItem | undefined {
  return items.find(i => i.slot === slot)
}

function primaryStatLabel(className: string): string {
  const cls = className?.toLowerCase() ?? ''
  if (['warrior', 'paladin', 'deathknight', 'demonhunter'].includes(cls)) return 'Force'
  if (['hunter', 'rogue', 'monk', 'druid', 'shaman'].includes(cls)) return 'Agilité'
  return 'Intelligence'
}

function classEmoji(className: string): string {
  const cls = CLASSES.find(c => c.name.toLowerCase() === className?.toLowerCase())
  return cls?.e ?? '⚔️'
}

// ── Single slot button ────────────────────────────────────────────────────────
interface SlotButtonProps {
  slot: SlotId
  item?: RecoItem
  inList: boolean
  mode: Mode
  onToggle: (item: RecoItem) => void
  align: 'left' | 'right'
}

function SlotButton({ slot, item, inList, mode, onToggle, align }: SlotButtonProps) {
  const { showTooltip, hideTooltip } = useApp()

  const iconSrc = item
    ? getItemIcon(item.name, item.slot)
    : SLOT_ICONS[slot]

  const qualityCls = item ? QUALITY_CLASS[item.q] ?? '' : ''

  function handleClick() {
    if (item) onToggle(item)
  }

  function handleMouseEnter(e: React.MouseEvent) {
    if (item) {
      showTooltip(
        { name: item.name, slot: item.slot, ilvl: item.ilvl, q: item.q, source: item.source, mode },
        e.clientX,
        e.clientY,
      )
    }
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (item) {
      showTooltip(
        { name: item.name, slot: item.slot, ilvl: item.ilvl, q: item.q, source: item.source, mode },
        e.clientX,
        e.clientY,
      )
    }
  }

  return (
    <div className={styles.slotRow}>
      {align === 'left' && (
        <span className={styles.slotLabelLeft}>{SL[slot]}</span>
      )}
      <div
        className={`${styles.slotIcon} ${qualityCls} ${!item ? styles.empty : ''}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={hideTooltip}
        title={item ? item.name : SL[slot]}
      >
        <img
          className={styles.slotImg}
          src={iconSrc}
          alt={item ? item.name : SL[slot]}
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.src = SLOT_ICONS[slot]
          }}
        />
        {item && inList && (
          <span className={styles.slotCheck}>✓</span>
        )}
      </div>
      {align === 'right' && (
        <span className={styles.slotLabelRight}>{SL[slot]}</span>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
interface CharacterPanelProps {
  items: RecoItem[]
  mode: Mode
  onToggle: (item: RecoItem) => void
}

export default function CharacterPanel({ items, mode, onToggle }: CharacterPanelProps) {
  const { selectedCharacter, isInListByName } = useApp()
  const [modelError, setModelError] = useState(false)

  // Character model URL
  const modelUrl = selectedCharacter
    ? `https://render-eu.worldofwarcraft.com/character/${selectedCharacter.realmSlug}/${selectedCharacter.id}/main-raw.png`
    : null

  // Class data
  const className = selectedCharacter?.class ?? ''
  const clsColor = CLASS_COLORS[className?.toLowerCase()] ?? '#c8972a'
  const clsEmoji = classEmoji(className)

  // Aggregate stats
  const stats = useMemo(() => {
    let totalStamina = 0
    let totalPrimary = 0
    let totalSec: Record<string, number> = {}

    for (const item of items) {
      const s = getItemStats(item.slot, item.ilvl, item.name)
      totalStamina += s.stamina
      if (s.primary != null) totalPrimary += s.primary
      const add = (name: string, val: number) => { totalSec[name] = (totalSec[name] ?? 0) + val }
      add(s.sec1.name, s.sec1.value)
      add(s.sec2.name, s.sec2.value)
    }

    const budget = totalStamina * 30
    const pct = (val: number) => Math.min(30, (val / (budget || 1)) * 100)

    return {
      stamina: totalStamina,
      primary: totalPrimary,
      armor: Math.round(totalPrimary * 1.8),
      crit:        pct(totalSec['Critical Strike'] ?? 0),
      haste:       pct(totalSec['Haste'] ?? 0),
      mastery:     pct(totalSec['Mastery'] ?? 0),
      versatility: pct(totalSec['Versatility'] ?? 0),
    }
  }, [items])

  const fmt = (n: number) => n.toLocaleString('fr-FR')
  const fmtPct = (n: number) => `${n.toFixed(1)}%`

  return (
    <div className={styles.panel}>
      {/* ── Left slots ── */}
      <div className={`${styles.slotsCol} ${styles.slotsLeft}`}>
        {LEFT_SLOTS.map(slot => {
          const item = itemBySlot(items, slot)
          return (
            <SlotButton
              key={slot}
              slot={slot}
              item={item}
              inList={item ? isInListByName(item.name, item.slot) : false}
              mode={mode}
              onToggle={onToggle}
              align="left"
            />
          )
        })}
      </div>

      {/* ── Center: character model + weapons ── */}
      <div className={styles.modelCol}>
        <div
          className={styles.modelWrap}
          style={{ boxShadow: `0 0 32px 0 ${clsColor}22, inset 0 0 24px 0 rgba(0,0,0,0.6)` }}
        >
          {modelUrl && !modelError ? (
            <img
              className={styles.modelImg}
              src={modelUrl}
              alt={selectedCharacter?.name ?? 'Character'}
              onError={() => setModelError(true)}
            />
          ) : (
            <div className={styles.modelPlaceholder}>
              <span className={styles.modelPlaceholderIcon}>{clsEmoji}</span>
              <span className={styles.modelPlaceholderText}>
                {selectedCharacter ? selectedCharacter.name : 'Sélectionnez un personnage'}
              </span>
            </div>
          )}
        </div>

        {/* Weapons below model */}
        <div className={styles.bottomSlots}>
          {BOTTOM_SLOTS.map(slot => {
            const item = itemBySlot(items, slot)
            return (
              <SlotButton
                key={slot}
                slot={slot}
                item={item}
                inList={item ? isInListByName(item.name, item.slot) : false}
                mode={mode}
                onToggle={onToggle}
                align="right"
              />
            )
          })}
        </div>
      </div>

      {/* ── Right slots ── */}
      <div className={`${styles.slotsCol} ${styles.slotsRight}`}>
        {RIGHT_SLOTS.map(slot => {
          const item = itemBySlot(items, slot)
          return (
            <SlotButton
              key={slot}
              slot={slot}
              item={item}
              inList={item ? isInListByName(item.name, item.slot) : false}
              mode={mode}
              onToggle={onToggle}
              align="right"
            />
          )
        })}
      </div>

      {/* ── Stats panel ── */}
      <div className={styles.statsCol}>
        <div className={styles.statsTitle}>Équipement</div>

        <div className={styles.statSection}>Caractéristiques</div>
        <div className={styles.statRow}>
          <span className={styles.statName}>Endurance</span>
          <span className={styles.statVal}>{fmt(stats.stamina)}</span>
        </div>
        <div className={styles.statRow}>
          <span className={styles.statName}>{primaryStatLabel(className)}</span>
          <span className={styles.statVal}>{fmt(stats.primary)}</span>
        </div>
        <div className={styles.statRow}>
          <span className={styles.statName}>Armure</span>
          <span className={styles.statVal}>{fmt(stats.armor)}</span>
        </div>

        <div className={styles.statSection}>Améliorations</div>
        <div className={styles.statRow}>
          <span className={styles.statName}>Coup critique</span>
          <span className={styles.statValPct}>{fmtPct(stats.crit)}</span>
        </div>
        <div className={styles.statRow}>
          <span className={styles.statName}>Hâte</span>
          <span className={styles.statValPct}>{fmtPct(stats.haste)}</span>
        </div>
        <div className={styles.statRow}>
          <span className={styles.statName}>Maîtrise</span>
          <span className={styles.statValPct}>{fmtPct(stats.mastery)}</span>
        </div>
        <div className={styles.statRow}>
          <span className={styles.statName}>Polyvalence</span>
          <span className={styles.statValPct}>{fmtPct(stats.versatility)}</span>
        </div>
      </div>
    </div>
  )
}
