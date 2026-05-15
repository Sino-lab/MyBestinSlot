import type { ReactNode } from 'react'
import styles from './Modal.module.css'

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
  wide?: boolean
}

export default function Modal({ open, onClose, children, wide }: Props) {
  if (!open) return null

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`${styles.dialog} ${wide ? styles.wide : ''}`}>
        {children}
      </div>
    </div>
  )
}
