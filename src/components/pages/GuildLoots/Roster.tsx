import { useGuild } from '../../../context/GuildContext'
import { useApp } from '../../../context/AppContext'
import styles from './Roster.module.css'

const ROLES = [
  { key: 'tank'   as const, label: 'Tanks',   color: '#4a9eff', icon: '🛡' },
  { key: 'healer' as const, label: 'Healers',  color: '#50d080', icon: '💚' },
  { key: 'dps'    as const, label: 'DPS',      color: '#ff8040', icon: '⚔️' },
]

interface Props {
  onAssign: (role: 'tank' | 'healer' | 'dps', idx: number) => void
}

export default function Roster({ onAssign }: Props) {
  const { currentGroupId, currentGroup, updateRosterSlot } = useGuild()
  const { showToast } = useApp()
  const grp = currentGroup()

  async function removeFromRoster(role: 'tank' | 'healer' | 'dps', idx: number) {
    if (!grp) return
    const name = grp.roster[role][idx]
    await updateRosterSlot(currentGroupId, role, idx, null)
    if (name) showToast(`${name} removed from roster`, 'remove')
  }

  if (!grp) return null
  const comp = grp.comp
  const assigned = {
    tank:   grp.roster.tank.filter(Boolean).length,
    healer: grp.roster.healer.filter(Boolean).length,
    dps:    grp.roster.dps.filter(Boolean).length,
  }

  return (
    <div>
      <div className={styles.topRow}>
        <div>
          <h3 className={styles.title}>Raid Roster</h3>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>Assign members to slots by role.</p>
        </div>
        <div className={styles.counter}>
          {ROLES.map(r => (
            <div key={r.key} className={styles.pill} style={{ color: r.color, borderColor: r.color + '44', background: r.color + '11' }}>
              {r.icon} {assigned[r.key]}/{comp[r.key]}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.layout}>
        {ROLES.map(role => (
          <div key={role.key} className={styles.col}>
            <div className={styles.colHeader} style={{ color: role.color }}>
              {role.icon} {role.label} <span style={{ color: 'var(--text3)', fontSize: 11 }}>{comp[role.key]} slots</span>
            </div>
            {Array.from({ length: comp[role.key] }).map((_, i) => {
              const assignedName = grp.roster[role.key][i]
              const m = grp.members.find(m => m.name === assignedName)
              const displayName = m?.characterName ?? assignedName ?? ''
              const clsLabel = m?.cls
                ? m.cls.charAt(0).toUpperCase() + m.cls.slice(1)
                : ''
              return (
                <div key={i} className={`${styles.slot} ${assignedName ? styles.filled : ''}`} style={{ '--rc': role.color } as React.CSSProperties}>
                  {assignedName ? (
                    <>
                      <div className={styles.rsAvatar} style={{ background: (m?.color ?? role.color) + '22', color: m?.color ?? role.color, borderColor: (m?.color ?? role.color) + '44', position: 'relative', overflow: 'hidden' }}>
                        {displayName[0]}
                        {m?.avatarUrl && (
                          <img
                            src={m.avatarUrl}
                            alt=""
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: m?.color ?? role.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</span>
                          {m?.isOwner && <span className={styles.rankBadge} style={{ background: 'rgba(255,128,0,.15)', border: '1px solid rgba(255,128,0,.3)', color: '#ff9a3c' }}>👑</span>}
                          {!m?.isOwner && m?.isAdmin && <span className={styles.rankBadge} style={{ background: 'rgba(100,160,255,.15)', border: '1px solid rgba(100,160,255,.3)', color: '#7ab4ff' }}>⚡</span>}
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text3)' }}>
                          {clsLabel && <span style={{ color: m?.color, opacity: .85 }}>{clsLabel}</span>}
                          {clsLabel && m?.role && <span> · </span>}
                          {m?.role && <span>{m.role}</span>}
                        </div>
                      </div>
                      <button className={styles.rsRemove} onClick={() => removeFromRoster(role.key, i)}>×</button>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>Slot {i + 1} — Empty</div>
                      <button className={styles.rsAdd} onClick={() => onAssign(role.key, i)}>+ Assign</button>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
