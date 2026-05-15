import { useGuild } from '../../../context/GuildContext'
import { useApp } from '../../../context/AppContext'
import styles from './Members.module.css'

interface Props {
  onInviteName: () => void
  onInviteLink: () => void
}

export default function Members({ onInviteName, onInviteLink }: Props) {
  const { groups, setGroups, currentGroupId, currentGroup } = useGuild()
  const { showToast } = useApp()
  const grp = currentGroup()

  function kick(name: string) {
    setGroups(groups.map(g => g.id === currentGroupId ? { ...g, members: g.members.filter(m => m.name !== name) } : g))
    showToast(`${name} removed from group`, 'remove')
  }

  function promote(name: string) {
    setGroups(groups.map(g => g.id === currentGroupId
      ? { ...g, members: g.members.map(m => m.name === name ? { ...m, isAdmin: true } : m) }
      : g
    ))
    showToast(`${name} is now admin`, 'success')
  }

  if (!grp) return null

  return (
    <div>
      <div className={styles.topRow}>
        <h3 className={styles.title}>Members <span className={styles.count}>({grp.members.length})</span></h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={styles.hbtn} onClick={onInviteName}>👤 Invite by name</button>
          <button className={styles.hbtn} onClick={onInviteLink}>🔗 Share link</button>
        </div>
      </div>
      {grp.members.map(m => {
        const rc = m.role === 'Tank' ? '#4a9eff' : m.role === 'Healer' ? '#50d080' : '#ff8040'
        return (
          <div key={m.name} className={styles.row}>
            <div className={styles.avatar} style={{ background: m.color + '22', color: m.color, border: `1px solid ${m.color}44` }}>{m.name[0]}</div>
            <div className={styles.info}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span className={styles.name} style={{ color: m.color }}>{m.name}</span>
                {m.isAdmin && <span className={styles.adminBadge}>Admin</span>}
              </div>
              <div className={styles.meta}>{m.cls} {m.spec} · <span style={{ color: rc }}>{m.role}</span></div>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {!m.isAdmin && <button className={styles.action} onClick={() => promote(m.name)}>Make admin</button>}
              <button className={`${styles.action} ${styles.danger}`} onClick={() => kick(m.name)}>Kick</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
