import { useState, useEffect } from 'react'
import Modal from '../shared/Modal'
import { useGuild } from '../../context/GuildContext'
import { useApp } from '../../context/AppContext'
import styles from './Modal.module.css'

interface Props { open: boolean; onClose: () => void; initialCode?: string }

export default function JoinGroupModal({ open, initialCode, onClose }: Props) {
  const [code, setCode] = useState(initialCode ?? '')
  const [error, setError] = useState('')

  useEffect(() => { if (initialCode) setCode(initialCode) }, [initialCode])
  const [busy, setBusy] = useState(false)
  const { joinGroup } = useGuild()
  const { showToast } = useApp()

  async function handleJoin() {
    if (!code.trim()) { setError('Enter a group code.'); return }
    setBusy(true)
    try {
      const result = await joinGroup(code)
      if (result === 'not_found') {
        setError('No group found with this code.')
      } else if (result === 'already_member') {
        setError('You are already in this group.')
      } else {
        showToast('Joined the group!', 'success')
        setCode('')
        setError('')
        onClose()
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }

  function handleClose() {
    setCode('')
    setError('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <h3 className={styles.title}>Join a group</h3>
      <div className={styles.field}>
        <label>Group code</label>
        <input
          value={code}
          onChange={e => { setCode(e.target.value); setError('') }}
          placeholder="e.g. MN-X4K9P2"
          onKeyDown={e => e.key === 'Enter' && !busy && handleJoin()}
          autoFocus
        />
        {error && <div style={{ fontSize: 12, color: '#ff7070', marginTop: 5 }}>{error}</div>}
        <div className={styles.hint} style={{ marginTop: 6 }}>
          Ask your group admin for the invite code.
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={handleClose} disabled={busy}>Cancel</button>
        <button className={styles.submit} onClick={handleJoin} disabled={busy}>
          {busy ? 'Joining…' : 'Join'}
        </button>
      </div>
    </Modal>
  )
}
