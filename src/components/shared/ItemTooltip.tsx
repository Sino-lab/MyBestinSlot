import { useState } from 'react'
import { createPortal } from 'react-dom'
import { getItemStats } from '../../utils/itemStats'
import { getItemIcon, SLOT_ICONS } from '../../data/items'
import type { SlotId, Quality, Mode } from '../../types'
import styles from './ItemTooltip.module.css'

export interface TooltipItem {
  name: string
  slot: SlotId
  ilvl: number
  q: Quality
  source: string
  mode?: Mode
  icon?: string
}

interface Props {
  item: TooltipItem
  x: number
  y: number
}

const Q_COLORS: Record<Quality, string> = {
  legendary: '#ff8000',
  epic:      '#a335ee',
  rare:      '#0070dd',
  uncommon:  '#1eff00',
}

const MODE_LABEL: Record<string, string> = {
  mythicplus: '⚡ M+',
  raid:       '🏰 Raid',
}

const SLOT_LABEL: Record<SlotId, string> = {
  head: 'Head', neck: 'Neck', shoulder: 'Shoulder', back: 'Back',
  chest: 'Chest', wrist: 'Wrist', hands: 'Hands', waist: 'Waist',
  legs: 'Legs', feet: 'Feet', ring1: 'Ring', ring2: 'Ring',
  trinket1: 'Trinket', trinket2: 'Trinket', mainhand: 'Main Hand', offhand: 'Off Hand',
}

function ItemImage({ name, slot, icon, q }: { name: string; slot: SlotId; icon?: string; q: Quality }) {
  const [fallback, setFallback] = useState(false)
  const src = fallback ? SLOT_ICONS[slot] : getItemIcon(name, slot, icon)
  return (
    <div className={styles.imgWrap} style={{ borderColor: Q_COLORS[q] + '99', boxShadow: `0 0 12px ${Q_COLORS[q]}44` }}>
      <img src={src} alt="" onError={() => { if (!fallback) setFallback(true) }} />
    </div>
  )
}

export default function ItemTooltip({ item, x, y }: Props) {
  const stats = getItemStats(item.slot, item.ilvl, item.name)

  const vw = window.innerWidth
  const vh = window.innerHeight
  const W = 300
  const H = 280
  const OFFSET = 16
  const left = x + OFFSET + W > vw ? x - W - OFFSET : x + OFFSET
  const top  = y + OFFSET + H > vh ? y - H - OFFSET : y + OFFSET

  return createPortal(
    <div className={styles.wrap} style={{ left, top }}>
      <div className={styles.box} style={{ borderColor: Q_COLORS[item.q] + '55' }}>

        <div className={styles.header}>
          <ItemImage name={item.name} slot={item.slot} icon={item.icon} q={item.q} />
          <div className={styles.headerText}>
            <div className={styles.name} style={{ color: Q_COLORS[item.q] }}>{item.name}</div>
            <div className={styles.ilvl}>Item Level {item.ilvl}</div>
            <div className={styles.slotLine}>{SLOT_LABEL[item.slot]}</div>
          </div>
        </div>

        <div className={styles.divider} />

        {stats.dps && <div className={styles.dps}>{stats.dps}</div>}

        <div className={`${styles.statRow} ${styles.stamRow}`}>
          <span className={styles.statName}>Stamina</span>
          <span className={styles.statVal}>+{stats.stamina}</span>
        </div>

        {stats.primary !== null && (
          <div className={`${styles.statRow} ${styles.priRow}`}>
            <span className={styles.statName}>Primary Stat</span>
            <span className={styles.statVal}>+{stats.primary}</span>
          </div>
        )}

        <div className={styles.divider} />

        <div className={`${styles.statRow} ${styles.secRow}`}>
          <span className={styles.statName}>{stats.sec1.name}</span>
          <span className={styles.statVal}>+{stats.sec1.value}</span>
        </div>
        <div className={`${styles.statRow} ${styles.secRow}`}>
          <span className={styles.statName}>{stats.sec2.name}</span>
          <span className={styles.statVal}>+{stats.sec2.value}</span>
        </div>

        {stats.special && (
          <>
            <div className={styles.divider} />
            <div className={styles.special}>{stats.special}</div>
          </>
        )}

        <div className={styles.divider} />

        <div className={styles.footer}>
          <span className={styles.source}>📍 {item.source}</span>
          {item.mode && <span className={styles.modeBadge}>{MODE_LABEL[item.mode] ?? item.mode}</span>}
        </div>
      </div>
    </div>,
    document.body
  )
}
