import { useState } from 'react'
import Modal from '../shared/Modal'
import { useGuild } from '../../context/GuildContext'
import { useApp } from '../../context/AppContext'
import styles from './Modal.module.css'

interface Props { open: boolean; onClose: () => void }

export default function JoinGroupModal({ open, onClose }: Props) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const { groups, setGroups, setCurrentGroupId } = useGuild()
  const { showToast, authUser } = useApp()

  function handleJoin() {
    const normalized = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
    const formatted = normalized.length === 12
      ? `${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8, 12)}`
      : code.trim().toUpperCase()
    if (!formatted) { setError('Enter a group code.'); return }

    const target = groups.find(g => g.code === formatted)
    if (!target) { setError('No group found with this code.'); return }

    const alreadyIn = target.members.some(m => m.name === authUser)
    if (alreadyIn) { setError('You are already in this group.'); return }

    const newMember = {
      name: authUser ?? 'Unknown',
      role: 'DPS',
      cls: '—',
      spec: '—',
      color: '#aaaaaa',
      status: 'active',
      isOwner: false,
      isAdmin: false,
    }


    setGroups(groups.map(g => g.id === target.id
      ? { ...g, members: [...g.members, newMember] }
      : g
    ))
    setCurrentGroupId(target.id)
    showToast(`Joined "${target.name}"!`, 'success')
    setCode('')
    setError('')
    onClose()
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
          onKeyDown={e => e.key === 'Enter' && handleJoin()}
          autoFocus
        />
        {error && <div style={{ fontSize: 12, color: '#ff7070', marginTop: 5 }}>{error}</div>}
        <div className={styles.hint} style={{ marginTop: 6 }}>
          Ask your group admin for the invite code.
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={handleClose}>Cancel</button>
        <button className={styles.submit} onClick={handleJoin}>Join</button>
      </div>
    </Modal>
  )
}
