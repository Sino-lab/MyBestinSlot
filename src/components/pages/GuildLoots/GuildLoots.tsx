import { useState, useEffect } from 'react'
import { useGuild, type GuildTab } from '../../../context/GuildContext'
import { useApp } from '../../../context/AppContext'
import { RAIDS } from '../../../data/guild'
import CreateGroupModal from '../../modals/CreateGroupModal'
import JoinGroupModal from '../../modals/JoinGroupModal'
import InviteModal from '../../modals/InviteModal'
import AssignSlotModal from '../../modals/AssignSlotModal'
import BossView from './BossView'
import PlayerView from './PlayerView'
import Roster from './Roster'
import Members from './Members'
import Settings from './Settings'
import styles from './GuildLoots.module.css'

type InviteMode = 'name' | 'link'

const TABS: { id: GuildTab; label: string }[] = [
  { id: 'loots', label: '🏰 Loots' },
  { id: 'roster', label: '⚔️ Roster' },
  { id: 'members', label: '👥 Members' },
  { id: 'settings', label: '⚙️ Settings' },
]

export default function GuildLoots() {
  const { groups, currentGroupId, setCurrentGroupId, currentGroup, guildView, setGuildView, currentGuildTab, setCurrentGuildTab, pendingInvites, acceptInvite, declineInvite, joinGroup } = useGuild()
  const { showToast, pendingJoinCode, setPendingJoinCode, selectedCharacter } = useApp()
  const [createOpen, setCreateOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)

  useEffect(() => {
    if (pendingJoinCode) setJoinOpen(true)
  }, [pendingJoinCode])
  const [inviteMode, setInviteMode] = useState<InviteMode | null>(null)
  const [assignRole, setAssignRole] = useState<'tank' | 'healer' | 'dps' | null>(null)
  const [assignIdx, setAssignIdx] = useState<number | null>(null)
  const [selectedRaidIdx, setSelectedRaidIdx] = useState(0)

  const selectedRaid = RAIDS[selectedRaidIdx]
  const killedCount = selectedRaid.bosses.filter(b => b.st === 'k').length
  const totalLoots = selectedRaid.bosses.reduce((sum, b) => sum + b.loots.length, 0)
  const legendaryCount = selectedRaid.bosses.flatMap(b => b.loots).filter(l => l.q === 'legendary').length

  const grp = currentGroup()

  async function handleAcceptInvite(inv: import('../../../types').GroupInvite) {
    await acceptInvite(inv)
    const result = await joinGroup(inv.code, 'dps', selectedCharacter)
    if (result === 'ok') showToast(`Joined ${inv.groupName}!`, 'success')
    else if (result === 'already_member') showToast('Already in this group', 'remove')
  }

  async function handleDeclineInvite(inviteId: string) {
    await declineInvite(inviteId)
    showToast('Invitation declined', 'remove')
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.selector}>
            {groups.map(g => (
              <button
                key={g.id}
                className={`${styles.gselBtn} ${g.id === currentGroupId ? styles.gselActive : ''}`}
                onClick={() => setCurrentGroupId(g.id)}
              >
                <span>{g.type === 'guild' ? '🏰' : g.type === 'raid' ? '⚔️' : '🌾'}</span>
                <span className={styles.gselName}>{g.name}</span>
              </button>
            ))}
            {pendingInvites.map(inv => (
              <div key={inv.id} className={styles.invCard}>
                <span className={styles.invCardName}>📩 {inv.groupName}</span>
                <span className={styles.invCardFrom}>de {inv.from}</span>
                <div className={styles.invCardActions}>
                  <button className={styles.invYes} onClick={() => handleAcceptInvite(inv)}>✓</button>
                  <button className={styles.invNo} onClick={() => handleDeclineInvite(inv.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button className={styles.newBtn} onClick={() => setJoinOpen(true)}>🔑 Join</button>
            <button className={styles.newBtn} onClick={() => setCreateOpen(true)}>+ Create</button>
          </div>
        </div>

        {!groups.length ? (
          <div className={styles.welcome}>
            <div className={styles.wgem} />
            <h2>No group yet</h2>
            <p>Create a group to manage your roster, invite players and track guild loots.</p>
            <button className={styles.createBtn} onClick={() => setCreateOpen(true)}>Create my first group</button>
            <button className={styles.joinBtn} onClick={() => setJoinOpen(true)}>🔑 Join an existing group</button>
          </div>
        ) : grp ? (
          <div>

            <div className={styles.tabs}>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  className={`${styles.gtab} ${currentGuildTab === tab.id ? styles.gtabActive : ''}`}
                  onClick={() => setCurrentGuildTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {currentGuildTab === 'loots' && (
              <div>
                <div className={styles.stats4}>
                  <div className={styles.scard}><div className={styles.sv}>{killedCount}/{selectedRaid.bosses.length}</div><div className={styles.sl}>Boss</div></div>
                  <div className={styles.scard}><div className={styles.sv} style={{ color: '#70d070' }}>{totalLoots}</div><div className={styles.sl}>Loots</div></div>
                  <div className={styles.scard}><div className={styles.sv} style={{ color: 'var(--epic)' }}>{selectedRaid.bosses.length}</div><div className={styles.sl}>Encounters</div></div>
                  <div className={styles.scard}><div className={styles.sv} style={{ color: 'var(--legendary)' }}>{legendaryCount || '—'}</div><div className={styles.sl}>Légendaires</div></div>
                </div>
                <div className={styles.viewRow}>
                  <select
                    className={styles.gsel}
                    value={selectedRaidIdx}
                    onChange={e => setSelectedRaidIdx(Number(e.target.value))}
                  >
                    {RAIDS.map((r, i) => (
                      <option key={r.id} value={i}>{r.name} ({r.bosses.length} boss)</option>
                    ))}
                  </select>
                  <div className={styles.viewSwitch}>
                    <button className={`${styles.vsw} ${guildView === 'boss' ? styles.vswActive : ''}`} onClick={() => setGuildView('boss')}>Par Boss</button>
                    <button className={`${styles.vsw} ${guildView === 'player' ? styles.vswActive : ''}`} onClick={() => setGuildView('player')}>Par Joueur</button>
                  </div>
                </div>
                {guildView === 'boss' ? <BossView bosses={selectedRaid.bosses} /> : <PlayerView />}
              </div>
            )}
            {currentGuildTab === 'roster' && (
              <Roster onAssign={(role, idx) => { setAssignRole(role); setAssignIdx(idx) }} />
            )}
            {currentGuildTab === 'members' && (
              <Members onInviteName={() => setInviteMode('name')} onInviteLink={() => setInviteMode('link')} />
            )}
            {currentGuildTab === 'settings' && <Settings onInviteName={() => setInviteMode('name')} onInviteLink={() => setInviteMode('link')} />}
          </div>
        ) : null}
      </div>

      <CreateGroupModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <JoinGroupModal
        open={joinOpen}
        initialCode={pendingJoinCode ?? ''}
        onClose={() => { setJoinOpen(false); setPendingJoinCode(null) }}
      />
      <InviteModal open={inviteMode !== null} mode={inviteMode ?? 'name'} onClose={() => setInviteMode(null)} />
      <AssignSlotModal open={assignRole !== null} role={assignRole} slotIdx={assignIdx} onClose={() => { setAssignRole(null); setAssignIdx(null) }} />
    </div>
  )
}
