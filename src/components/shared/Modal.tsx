import { useEffect, type ReactNode } from 'react'
import { useApp } from '../../context/AppContext'
import styles from './Modal.module.css'

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
  wide?: boolean
}

export default function Modal({ open, onClose, children, wide }: Props) {
  const { hideTooltip } = useApp()

  useEffect(() => {
    if (open) hideTooltip()
  }, [open])

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`${styles.dialog} ${wide ? styles.wide : ''}`}>
        {children}
      </div>
    </div>
  )
}
