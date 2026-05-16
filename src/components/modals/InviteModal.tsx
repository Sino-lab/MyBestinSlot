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
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const { currentGroup, currentGroupId, sendInvite } = useGuild()
  const { showToast } = useApp()
  const grp = currentGroup()

  const inviteLink = `${window.location.origin}?join=${grp?.code}`

  async function handleSendInvite() {
    if (!name.trim() || !grp) return
    setSending(true)
    setError('')
    try {
      await sendInvite(currentGroupId, grp.name, grp.code, name.trim())
      showToast(`Invite sent to ${name.trim()}!`, 'success')
      setName('')
      onClose()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send invite')
    } finally {
      setSending(false)
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  if (mode === 'name') return (
    <Modal open={open} onClose={onClose}>
      <h3 className={styles.title}>Invite a player</h3>
      <div className={styles.field}>
        <label>Battle.net tag</label>
        <input
          value={name}
          onChange={e => { setName(e.target.value); setError('') }}
          placeholder="PlayerName#1234"
          onKeyDown={e => e.key === 'Enter' && handleSendInvite()}
          disabled={sending}
        />
      </div>
      {error && <p style={{ fontSize: 12, color: '#ff6060', marginTop: 4 }}>{error}</p>}
      <p className={styles.hint}>They'll receive an invitation in their Guild Loots tab.</p>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onClose} disabled={sending}>Cancel</button>
        <button className={styles.submit} onClick={handleSendInvite} disabled={sending || !name.trim()}>
          {sending ? 'Sending…' : 'Send invite'}
        </button>
      </div>
    </Modal>
  )

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className={styles.title}>Share invite link</h3>
      <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: '1rem' }}>
        Share this link with your group members.
      </p>
      <div className={styles.linkRow}>
        <input className={styles.linkInput} readOnly value={inviteLink} />
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
