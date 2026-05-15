import { useState } from 'react'
import type { SlotId, Quality } from '../../types'
import { getItemIcon, SLOT_ICONS } from '../../data/items'
import styles from './ItemIcon.module.css'

const QUALITY_BORDER: Record<Quality, string> = {
  legendary: '#ff800066',
  epic:      '#a335ee55',
  rare:      '#0070dd55',
  uncommon:  '#1eff0055',
}

interface Props {
  slot: SlotId
  quality: Quality
  name?: string
  size?: number
  icon?: string
}

export default function ItemIcon({ slot, quality, name = '', size = 36, icon }: Props) {
  const [fallback, setFallback] = useState(false)
  const src = fallback ? SLOT_ICONS[slot] : getItemIcon(name, slot, icon)

  return (
    <div className={styles.icon} style={{ width: size, height: size, fontSize: size * 0.47 }}>
      <img
        src={src}
        alt=""
        onError={() => { if (!fallback) setFallback(true) }}
      />
      <div className={styles.border} style={{ borderColor: QUALITY_BORDER[quality] }} />
    </div>
  )
}
