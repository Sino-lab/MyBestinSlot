import { useGuild } from '../../../context/GuildContext'
import { useApp } from '../../../context/AppContext'
import styles from './Settings.module.css'

export default function Settings() {
  const { groups, setGroups, currentGroupId, currentGroup, setCurrentGroupId } = useGuild()
  const { showToast } = useApp()
  const grp = currentGroup()

  function updateName(name: string) {
    setGroups(groups.map(g => g.id === currentGroupId ? { ...g, name } : g))
  }

  function adjComp(role: 'tank' | 'healer' | 'dps', delta: number) {
    setGroups(groups.map(g => g.id === currentGroupId
      ? { ...g, comp: { ...g.comp, [role]: Math.max(0, g.comp[role] + delta) } }
      : g
    ))
  }

  function leaveGroup() {
    if (!confirm('Leave this group?')) return
    const updated = groups.filter(g => g.id !== currentGroupId)
    setGroups(updated)
    setCurrentGroupId(updated[0]?.id ?? '')
    showToast('You left the group', 'remove')
  }

  if (!grp) return null
  const total = grp.comp.tank + grp.comp.healer + grp.comp.dps

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.label}>Group name</div>
        <input className={styles.input} value={grp.name} onChange={e => updateName(e.target.value)} style={{ width: '100%', marginTop: 6 }} />
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Roster composition</div>
        {([
          ['tank', '🛡 Tanks', '#4a9eff'],
          ['healer', '💚 Healers', '#50d080'],
          ['dps', '⚔️ DPS', '#ff8040'],
        ] as const).map(([role, lbl, color]) => (
          <div key={role} className={styles.compRow}>
            <span className={styles.compLabel} style={{ color }}>{lbl}</span>
            <div className={styles.stepper}>
              <button onClick={() => adjComp(role, -1)}>−</button>
              <span>{grp.comp[role]}</span>
              <button onClick={() => adjComp(role, 1)}>+</button>
            </div>
          </div>
        ))}
        <div className={styles.compTotal}>Total: {total} players</div>
      </div>
      <div className={`${styles.card} ${styles.danger}`}>
        <div className={styles.label} style={{ color: '#ff8080' }}>Danger zone</div>
        <button className={styles.leaveBtn} onClick={leaveGroup}>Leave group</button>
      </div>
    </div>
  )
}
