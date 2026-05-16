import { useGuild } from '../../../context/GuildContext'
import { useApp } from '../../../context/AppContext'
import styles from './Members.module.css'

interface Props {
  onInviteName: () => void
  onInviteLink: () => void
}

export default function Members({ onInviteName, onInviteLink }: Props) {
  const { currentGroupId, currentGroup, currentUserRank, kickMember, promoteMember, demoteMember, leaveGroup } = useGuild()
  const { showToast, authUser } = useApp()
  const grp = currentGroup()
  const myRank = currentUserRank(authUser)
  const perms = grp?.coAdminPerms

  async function kick(name: string) {
    await kickMember(currentGroupId, name)
    showToast(`${name} removed`, 'remove')
  }

  async function promote(name: string) {
    await promoteMember(currentGroupId, name)
    showToast(`${name} is now co-admin`, 'success')
  }

  async function demote(name: string) {
    await demoteMember(currentGroupId, name)
    showToast(`${name} is now a regular member`, 'remove')
  }

  async function handleLeave() {
    await leaveGroup(currentGroupId)
    showToast('You left the group', 'remove')
  }

  if (!grp) return null

  return (
    <div>
      <div className={styles.topRow}>
        <h3 className={styles.title}>
          Members <span className={styles.count}>({grp.members.length})</span>
        </h3>
        {(myRank === 'owner' || (myRank === 'coadmin' && perms?.canInvite)) && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button className={styles.hbtn} onClick={onInviteName}>👤 Invite by name</button>
            <button className={styles.hbtn} onClick={onInviteLink}>🔗 Share link</button>
          </div>
        )}
      </div>

      {grp.members.map(m => {
        const isSelf     = m.name === authUser
        const targetRank = m.isOwner ? 'owner' : m.isAdmin ? 'coadmin' : 'member'
        const rc         = m.role === 'Tank' ? '#4a9eff' : m.role === 'Healer' ? '#50d080' : '#ff8040'
        const canKick    = !isSelf && (myRank === 'owner' || (myRank === 'coadmin' && targetRank === 'member' && !!perms?.canKick))
        const canPromote = myRank === 'owner' && targetRank === 'member'
        const canDemote  = myRank === 'owner' && targetRank === 'coadmin'
        const canLeave   = isSelf && myRank !== 'owner'

        return (
          <div key={m.name} className={styles.row}>
            <div
              className={styles.avatar}
              style={{ background: m.color + '22', color: m.color, border: `1px solid ${m.color}44` }}
            >
              {m.name[0]}
            </div>

            <div className={styles.info}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span className={styles.name} style={{ color: m.color }}>{m.name}</span>
                {m.isOwner && <span className={`${styles.badge} ${styles.ownerBadge}`}>👑 Owner</span>}
                {!m.isOwner && m.isAdmin && <span className={`${styles.badge} ${styles.adminBadge}`}>⚡ Co-Admin</span>}
                {isSelf && <span className={styles.youBadge}>You</span>}
              </div>
              <div className={styles.meta}>
                {m.cls !== '—' ? `${m.cls} ${m.spec} · ` : ''}
                <span style={{ color: rc }}>{m.role}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {canPromote && (
                <button className={styles.action} onClick={() => promote(m.name)}>
                  Make co-admin
                </button>
              )}
              {canDemote && (
                <button className={`${styles.action} ${styles.warn}`} onClick={() => demote(m.name)}>
                  Remove co-admin
                </button>
              )}
              {canKick && (
                <button className={`${styles.action} ${styles.danger}`} onClick={() => kick(m.name)}>
                  Kick
                </button>
              )}
              {canLeave && (
                <button className={`${styles.action} ${styles.danger}`} onClick={handleLeave}>
                  Leave group
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
