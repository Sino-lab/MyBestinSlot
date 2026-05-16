import { useGuild } from '../../../context/GuildContext'
import { useApp } from '../../../context/AppContext'
import type { CoAdminPermissions } from '../../../types'
import styles from './Settings.module.css'

const PERM_LABELS: { key: keyof CoAdminPermissions; label: string; desc: string }[] = [
  { key: 'canKick',             label: 'Kick members',        desc: 'Co-admins can remove regular members from the group.' },
  { key: 'canInvite',           label: 'Invite members',      desc: 'Co-admins can send invitations and share the invite link.' },
  { key: 'canManageRoster',     label: 'Manage roster',       desc: 'Co-admins can move players between roles in the roster.' },
  { key: 'canManageComp',       label: 'Edit group size',     desc: 'Co-admins can change the number of tanks, healers and DPS.' },
  { key: 'canAttributeLoots',   label: 'Attribute loots',     desc: 'Co-admins can assign loot drops to players.' },
  { key: 'canManageBossStatus', label: 'Mark boss kills',     desc: 'Co-admins can mark bosses as killed or alive.' },
]

interface Props {
  onInviteName: () => void
  onInviteLink: () => void
}

export default function Settings({ onInviteName, onInviteLink }: Props) {
  const {
    currentGroupId, currentGroup, currentUserRank,
    updateGroupName, updateCoAdminPerms, leaveGroup, setGroups, groups,
  } = useGuild()
  const { showToast, authUser } = useApp()
  const grp = currentGroup()
  const myRank = currentUserRank(authUser)

  function handleUpdateName(name: string) {
    // Optimistic via setGroups, then async persist
    updateGroupName(currentGroupId, name)
  }

  function adjComp(role: 'tank' | 'healer' | 'dps', delta: number) {
    // Comp is local-only for now (not persisted in DB schema)
    setGroups(groups.map(g => g.id === currentGroupId
      ? { ...g, comp: { ...g.comp, [role]: Math.max(0, g.comp[role] + delta) } }
      : g
    ))
  }

  async function togglePerm(key: keyof CoAdminPermissions) {
    if (!grp) return
    const perms = { ...grp.coAdminPerms, [key]: !grp.coAdminPerms[key] }
    await updateCoAdminPerms(currentGroupId, perms)
  }

  async function handleLeave() {
    if (!confirm('Leave this group?')) return
    await leaveGroup(currentGroupId)
    showToast(myRank === 'owner' ? 'Group deleted' : 'You left the group', 'remove')
  }

  if (!grp) return null
  const total = grp.comp.tank + grp.comp.healer + grp.comp.dps
  const canInvite = myRank === 'owner' || (myRank === 'coadmin' && !!grp.coAdminPerms.canInvite)
  const canManageComp = myRank === 'owner' || (myRank === 'coadmin' && !!grp.coAdminPerms.canManageComp)

  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <div className={styles.card}>
          <div className={styles.label}>Group name</div>
          <input
            className={styles.input}
            value={grp.name}
            onChange={e => handleUpdateName(e.target.value)}
            style={{ width: '100%', marginTop: 6 }}
          />
        </div>
        {canInvite && (
          <div className={styles.card}>
            <div className={styles.label} style={{ marginBottom: 10 }}>Invite members</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={styles.invBtn} onClick={onInviteName}>👤 Invite by name</button>
              <button className={styles.invBtn} onClick={onInviteLink}>🔗 Share link</button>
            </div>
          </div>
        )}
        {canManageComp && (
          <div className={styles.card}>
            <div className={styles.label}>Roster composition</div>
            {([
              ['tank',   '🛡 Tanks',   '#4a9eff'],
              ['healer', '💚 Healers', '#50d080'],
              ['dps',    '⚔️ DPS',     '#ff8040'],
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
        )}
        <div className={`${styles.card} ${styles.danger}`}>
          <div className={styles.label} style={{ color: '#ff8080' }}>Danger zone</div>
          <button className={styles.leaveBtn} onClick={handleLeave}>
            {myRank === 'owner' ? 'Delete group' : 'Leave group'}
          </button>
        </div>
      </div>

      {myRank === 'owner' && (
        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.label} style={{ marginBottom: 12 }}>Co-admin permissions</div>
            {PERM_LABELS.map(({ key, label, desc }) => {
              const enabled = grp.coAdminPerms[key]
              return (
                <div key={key} className={styles.permRow} onClick={() => togglePerm(key)}>
                  <div>
                    <div className={styles.permLabel}>{label}</div>
                    <div className={styles.permDesc}>{desc}</div>
                  </div>
                  <div className={`${styles.toggle} ${enabled ? styles.toggleOn : ''}`}>
                    <div className={styles.toggleThumb} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
