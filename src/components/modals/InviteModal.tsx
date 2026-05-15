import { useState } from 'react'
import Modal from '../shared/Modal'
import { useGuild } from '../../context/GuildContext'
import { useApp } from '../../context/AppContext'
import styles from './Modal.module.css'

interface Props {
  open: boolean
  mode: 'name' | 'link'
  onClose: () => void
}

export default function InviteModal({ open, mode, onClose }: Props) {
  const [name, setName] = useState('')
  const [copied, setCopied] = useState(false)
  const { currentGroup } = useGuild()
  const { showToast } = useApp()
  const grp = currentGroup()

  function sendInvite() {
    if (!name.trim()) return
    showToast(`Invite sent to ${name}!`, 'success')
    setName('')
    onClose()
  }

  function copyLink() {
    navigator.clipboard.writeText(`https://mybestinslot.app/join/${grp?.code}`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  if (mode === 'name') return (
    <Modal open={open} onClose={onClose}>
      <h3 className={styles.title}>Invite a player</h3>
      <div className={styles.field}>
        <label>In-app username</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="PlayerName#1234" />
      </div>
      <p className={styles.hint}>They'll receive an invitation in their Guild Loots tab.</p>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onClose}>Cancel</button>
        <button className={styles.submit} onClick={sendInvite}>Send invite</button>
      </div>
    </Modal>
  )

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className={styles.title}>Share invite link</h3>
      <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: '1rem' }}>
        Share this link with your group members. It expires in 24h.
      </p>
      <div className={styles.linkRow}>
        <input className={styles.linkInput} readOnly value={`https://mybestinslot.app/join/${grp?.code}`} />
        <button className={styles.copyBtn} onClick={copyLink}>{copied ? 'Copied!' : 'Copy'}</button>
      </div>
      <div className={styles.codeBox}>
        <strong style={{ color: 'var(--text2)' }}>Code:</strong>{' '}
        <span className={styles.codeVal}>{grp?.code}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.submit} onClick={onClose}>Done</button>
      </div>
    </Modal>
  )
}
