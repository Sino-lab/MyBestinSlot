import type { Quality } from '../../types'
import styles from './QualityBadge.module.css'

interface Props {
  quality: Quality
  label: string
}

export default function QualityBadge({ quality, label }: Props) {
  return (
    <span className={`${styles.badge} ${styles[quality]}`}>{label}</span>
  )
}
