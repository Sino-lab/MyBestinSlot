import Modal from '../shared/Modal'
import { useGuild } from '../../context/GuildContext'
import { useApp } from '../../context/AppContext'
import styles from './Modal.module.css'
import shared from './AssignSlot.module.css'

interface Props {
  open: boolean
  role: 'tank' | 'healer' | 'dps' | null
  slotIdx: number | null
  onClose: () => void
}

export default function AssignSlotModal({ open, role, slotIdx, onClose }: Props) {
  const { groups, setGroups, currentGroupId, currentGroup } = useGuild()
  const { showToast } = useApp()
  const grp = currentGroup()

  if (!grp || role === null || slotIdx === null) return null

  function assign(memberName: string) {
    if (!grp || role === null || slotIdx === null) return
    const updated = groups.map(g => {
      if (g.id !== currentGroupId) return g
      const roster = { ...g.roster, [role]: [...g.roster[role]] }
      roster[role][slotIdx] = memberName
      return { ...g, roster }
    })
    setGroups(updated)
    showToast(`${memberName} → ${role} slot ${slotIdx + 1}`, 'success')
    onClose()
  }

  const alreadySlotted = (name: string) =>
    Object.values(grp.roster).some(arr => arr.includes(name))

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className={styles.title}>Assign {role} slot {(slotIdx ?? 0) + 1}</h3>
      <div className={shared.list}>
        {grp.members.length === 0 ? (
          <p style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: '1rem' }}>
            No members yet. Invite players first.
          </p>
        ) : grp.members.map(m => {
          const placed = alreadySlotted(m.name)
          return (
            <div
              key={m.name}
              className={`${shared.btn} ${placed ? shared.placed : ''}`}
              onClick={() => !placed && assign(m.name)}
            >
              <div className={shared.avatar} style={{ background: m.color + '22', color: m.color, borderColor: m.color + '44' }}>
                {m.name[0]}
              </div>
              <div className={shared.info}>
                <div style={{ color: m.color, fontSize: 13, fontWeight: 500 }}>{m.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>{m.cls} {m.spec} · {m.role}</div>
              </div>
              {placed && <span className={shared.placedBadge}>Already placed</span>}
            </div>
          )
        })}
      </div>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  )
}
