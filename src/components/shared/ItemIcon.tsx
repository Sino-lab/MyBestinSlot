import { useState } from 'react'
import type { SlotId, Quality } from '../../types'
import { SLOT_ICONS } from '../../data/items'
import styles from './ItemIcon.module.css'

const QUALITY_BORDER: Record<Quality, string> = {
  legendary: '#ff800044',
  epic: '#a335ee44',
  rare: '#0070dd44',
  uncommon: '#1eff0044',
}

interface Props {
  slot: SlotId
  quality: Quality
  size?: number
}

export default function ItemIcon({ slot, quality, size = 36 }: Props) {
  const [imgFailed, setImgFailed] = useState(false)
  const src = SLOT_ICONS[slot]

  return (
    <div
      className={styles.icon}
      style={{ width: size, height: size, fontSize: size * 0.47 }}
    >
      {!imgFailed ? (
        <img src={src} alt="" onError={() => setImgFailed(true)} />
      ) : (
        <span>📦</span>
      )}
      <div
        className={styles.border}
        style={{ borderColor: QUALITY_BORDER[quality] }}
      />
    </div>
  )
}
