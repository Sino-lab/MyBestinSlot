import { useState } from 'react'
import Modal from '../shared/Modal'
import { useGuild } from '../../context/GuildContext'
import { useApp } from '../../context/AppContext'
import type { GroupType } from '../../types'
import styles from './Modal.module.css'

interface Props { open: boolean; onClose: () => void }

const TYPES: { id: GroupType; label: string }[] = [
  { id: 'guild', label: '🏰 Guild' },
  { id: 'raid', label: '⚔️ Raid team' },
  { id: 'farm', label: '🌾 Farm group' },
]

export default function CreateGroupModal({ open, onClose }: Props) {
  const [name, setName] = useState('')
  const [type, setType] = useState<GroupType>('guild')
  const { groups, setGroups, setCurrentGroupId } = useGuild()
  const { showToast } = useApp()

  function handleCreate() {
    const groupName = name.trim() || 'New Group'
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    const newG = {
      id: 'g' + Date.now(), name: groupName, type, code,
      comp: { tank: 2, healer: 4, dps: 14 },
      members: [{ name: 'Thordak', role: 'DPS', cls: 'Warrior', spec: 'Fury', color: '#C69B3A', status: 'active', isAdmin: true }],
      roster: { tank: [], healer: [], dps: [] },
      invites: [],
    }
    setGroups([...groups, newG])
    setCurrentGroupId(newG.id)
    showToast(`Group "${groupName}" created!`, 'success')
    setName('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className={styles.title}>Create a group</h3>
      <div className={styles.field}>
        <label>Group name</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Mythic Nexus" />
      </div>
      <div className={styles.field}>
        <label>Type</label>
        <div className={styles.typeBtns}>
          {TYPES.map(tp => (
            <button key={tp.id} className={`${styles.typeBtn} ${type === tp.id ? styles.active : ''}`} onClick={() => setType(tp.id)}>
              {tp.label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onClose}>Cancel</button>
        <button className={styles.submit} onClick={handleCreate}>Create</button>
      </div>
    </Modal>
  )
}
