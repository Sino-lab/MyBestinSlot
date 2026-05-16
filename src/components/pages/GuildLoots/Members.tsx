import { useState } from 'react'
import { useGuild } from '../../../context/GuildContext'
import { useApp } from '../../../context/AppContext'
import { getClassColor } from '../../modals/CharacterSelectModal'
import type { WowCharacter } from '../../../types'
import styles from './Members.module.css'

interface Props {
  onInviteName: () => void
  onInviteLink: () => void
}

export default function Members({ onInviteName, onInviteLink }: Props) {
  const { currentGroupId, currentGroup, currentUserRank, kickMember, promoteMember, demoteMember, leaveGroup, transferOwnership, removeCharacter, joinGroup } = useGuild()
  const { showToast, authUser, characters } = useApp()
  const grp = currentGroup()
  const myRank = currentUserRank(authUser)
  const perms = grp?.coAdminPerms
  const [addCharOpen, setAddCharOpen] = useState(false)
  const [addCharLoading, setAddCharLoading] = useState(false)

  // Characters already in this group (by character name+realm)
  const memberCharKeys = new Set(grp?.members.map(m => `${m.characterName}|${m.realmSlug}`) ?? [])
  const availableChars = characters.filter(c => !memberCharKeys.has(`${c.name}|${c.realmSlug}`))

  async function addCharacter(char: WowCharacter) {
    if (!grp) return
    setAddCharLoading(true)
    try {
      const result = await joinGroup(grp.code, 'dps', char)
      if (result === 'ok') {
        showToast(`${char.name} added to the group`, 'success')
        setAddCharOpen(false)
      } else if (result === 'already_member') {
        showToast(`${char.name} is already in this group`, 'remove')
      }
    } catch {
      showToast('Failed to add character', 'remove')
    } finally {
      setAddCharLoading(false)
    }
  }

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
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {availableChars.length > 0 && (
            <button className={styles.hbtn} onClick={() => setAddCharOpen(v => !v)}>
              + Add my character
            </button>
          )}
          {(myRank === 'owner' || (myRank === 'coadmin' && perms?.canInvite)) && (
            <>
              <button className={styles.hbtn} onClick={onInviteName}>👤 Invite by name</button>
              <button className={styles.hbtn} onClick={onInviteLink}>🔗 Share link</button>
            </>
          )}
        </div>
      </div>

      {addCharOpen && (
        <div className={styles.addCharPanel}>
          <div className={styles.addCharTitle}>Choose a character to add</div>
          {availableChars.map(char => {
            const color = getClassColor(char.class)
            return (
              <button
                key={char.id}
                className={styles.addCharRow}
                disabled={addCharLoading}
                onClick={() => addCharacter(char)}
              >
                <div className={styles.addCharAvatar} style={{ background: color + '22', color, borderColor: color + '44', position: 'relative', overflow: 'hidden' }}>
                  {char.name[0]}
                  {char.avatarUrl && (
                    <img src={char.avatarUrl} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color }}>{char.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{char.realm} · {char.class}</div>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {grp.members.map(m => {
        const isSelf     = m.name === authUser
        const targetRank = m.isOwner ? 'owner' : m.isAdmin ? 'coadmin' : 'member'
        const rc         = m.role === 'Tank' ? '#4a9eff' : m.role === 'Healer' ? '#50d080' : '#ff8040'
        const myCharsInGroup = grp.members.filter(x => x.name === authUser)
        const canRemoveChar  = isSelf && !m.isOwner && myCharsInGroup.length > 1
        const canKick        = !isSelf && (myRank === 'owner' || (myRank === 'coadmin' && targetRank === 'member' && !!perms?.canKick))
        const canPromote     = myRank === 'owner' && targetRank === 'member'
        const canDemote      = myRank === 'owner' && targetRank === 'coadmin'
        const canTransfer    = myRank === 'owner' && !isSelf
        const canLeave       = isSelf && myRank !== 'owner'

        const avatarUrl = m.avatarUrl ?? null

        return (
          <div key={m.name} className={styles.row}>
            <div
              className={styles.avatar}
              style={{ background: m.color + '22', color: m.color, border: `1px solid ${m.color}44`, position: 'relative', overflow: 'hidden' }}
            >
              {(m.characterName ?? m.name)[0]}
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt=""
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              )}
            </div>

            <div className={styles.info}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span className={styles.name} style={{ color: m.color }}>{m.characterName ?? m.name}</span>
                {m.isOwner && <span className={`${styles.badge} ${styles.ownerBadge}`}>👑 Owner</span>}
                {!m.isOwner && m.isAdmin && <span className={`${styles.badge} ${styles.adminBadge}`}>⚡ Co-Admin</span>}
                {isSelf && <span className={styles.youBadge}>You</span>}
              </div>
              <div className={styles.meta}>
                {m.cls && m.cls !== '—' && (
                  <span style={{ color: m.color, opacity: .8 }}>
                    {m.cls.charAt(0).toUpperCase() + m.cls.slice(1)}
                  </span>
                )}
                {m.cls && m.cls !== '—' && ' · '}
                <span style={{ color: rc }}>{m.role}</span>
                {m.characterName && <span style={{ color: 'var(--text3)', marginLeft: 6 }}>· {m.name}</span>}
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
              {canTransfer && (
                <button
                  className={`${styles.action} ${styles.warn}`}
                  onClick={async () => {
                    if (!confirm(`Transfer ownership to ${m.name}? You will become a regular member.`)) return
                    await transferOwnership(currentGroupId, m.name)
                    showToast(`${m.name} is now the owner`, 'success')
                  }}
                >
                  Make owner
                </button>
              )}
              {canRemoveChar && m.dbId && (
                <button className={`${styles.action} ${styles.danger}`} onClick={async () => {
                  await removeCharacter(currentGroupId, m.dbId!)
                  showToast(`${m.characterName ?? m.name} removed from group`, 'remove')
                }}>
                  Remove
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
