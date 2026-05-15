import Modal from '../shared/Modal'
import { useApp } from '../../context/AppContext'
import { SLOT_LABELS } from '../../data/items'
import { t } from '../../data/i18n'
import styles from './Modal.module.css'

interface Props { open: boolean; onClose: () => void }

export default function ExportModal({ open, onClose }: Props) {
  const { myList, lang, showToast } = useApp()
  const SL = SLOT_LABELS[lang]

  function copyText() {
    const text = `=== My Best In Slot List ===\n\n` +
      myList.map(i => `[${i.obtained ? 'x' : ' '}] ${SLOT_LABELS.en[i.slot]}: ${i.name} (ilvl ${i.ilvl}) — ${i.source}`).join('\n')
    navigator.clipboard.writeText(text).then(() => {
      onClose()
      showToast('Copied to clipboard!', 'success')
    })
  }

  return (
    <Modal open={open} onClose={onClose} wide>
      <h3 className={styles.title}>{t('export_title', lang)}</h3>
      <div className={styles.exprev}>
        <div className={styles.epTitle}>My BiS List ({myList.length} items)</div>
        {myList.length === 0 ? (
          <p style={{ color: 'var(--text3)' }}>Your list is empty.</p>
        ) : myList.map(item => (
          <div key={item.id} className={styles.epRow}>
            <span>{SL[item.slot]}: <span className={styles.epItem}>{item.name}</span> <span style={{ color: 'var(--text3)' }}>ilvl {item.ilvl}</span></span>
            <span className={item.obtained ? styles.epGot : ''}>{item.obtained ? '✓ Got it' : '—'}</span>
          </div>
        ))}
      </div>
      <div className={styles.exopts}>
        <button className={styles.exopt} onClick={copyText}>📋 {t('copy_text', lang)}</button>
        <button className={styles.exopt}>🖼️ {t('save_img', lang)}</button>
        <button className={styles.exopt} onClick={onClose}>✕ {t('cancel', lang)}</button>
      </div>
    </Modal>
  )
}
