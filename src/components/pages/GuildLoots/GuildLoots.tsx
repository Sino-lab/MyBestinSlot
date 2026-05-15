import { useState } from 'react'
import { useGuild, type GuildTab } from '../../../context/GuildContext'
import { useApp } from '../../../context/AppContext'
import CreateGroupModal from '../../modals/CreateGroupModal'
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
  const { groups, currentGroupId, setCurrentGroupId, currentGroup, guildView, setGuildView, currentGuildTab, setCurrentGuildTab } = useGuild()
  const { showToast } = useApp()
  const [createOpen, setCreateOpen] = useState(false)
  const [inviteMode, setInviteMode] = useState<InviteMode | null>(null)
  const [assignRole, setAssignRole] = useState<'tank' | 'healer' | 'dps' | null>(null)
  const [assignIdx, setAssignIdx] = useState<number | null>(null)

  const grp = currentGroup()

  function answerInvite(_invId: string, accept: boolean) {
    // handled inside GuildContext via group mutation would be cleaner,
    // but for simplicity we use showToast here
    showToast(accept ? 'Joined the group!' : 'Invitation declined', accept ? 'success' : 'remove')
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
                {g.invites?.length > 0 && <span className={styles.gselBadge}>{g.invites.length}</span>}
              </button>
            ))}
          </div>
          <button className={styles.newBtn} onClick={() => setCreateOpen(true)}>+ New group</button>
        </div>

        {!groups.length ? (
          <div className={styles.welcome}>
            <div className={styles.wgem} />
            <h2>No group yet</h2>
            <p>Create a group to manage your roster, invite players and track guild loots.</p>
            <button className={styles.createBtn} onClick={() => setCreateOpen(true)}>Create my first group</button>
          </div>
        ) : grp ? (
          <div>
            {grp.invites?.map(inv => (
              <div key={inv.id} className={styles.invBanner}>
                <span className={styles.invIcon}>📩</span>
                <span className={styles.invText}><strong>{inv.from}</strong> invited you to join <strong>{inv.groupName}</strong></span>
                <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
                  <button className={styles.invYes} onClick={() => answerInvite(inv.id, true)}>✓ Join</button>
                  <button className={styles.invNo} onClick={() => answerInvite(inv.id, false)}>✕ Decline</button>
                </div>
              </div>
            ))}

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
                  <div className={styles.scard}><div className={styles.sv}>7/9</div><div className={styles.sl}>Bosses</div></div>
                  <div className={styles.scard}><div className={styles.sv} style={{ color: '#70d070' }}>24</div><div className={styles.sl}>Loots</div></div>
                  <div className={styles.scard}><div className={styles.sv} style={{ color: 'var(--epic)' }}>8</div><div className={styles.sl}>BiS drops</div></div>
                  <div className={styles.scard}><div className={styles.sv} style={{ color: 'var(--legendary)' }}>1</div><div className={styles.sl}>Legendary</div></div>
                </div>
                <div className={styles.viewRow}>
                  <select className={styles.gsel}><option>Amirdrassil</option><option>Nerubar Palace</option></select>
                  <div className={styles.viewSwitch}>
                    <button className={`${styles.vsw} ${guildView === 'boss' ? styles.vswActive : ''}`} onClick={() => setGuildView('boss')}>By Boss</button>
                    <button className={`${styles.vsw} ${guildView === 'player' ? styles.vswActive : ''}`} onClick={() => setGuildView('player')}>By Player</button>
                  </div>
                </div>
                {guildView === 'boss' ? <BossView /> : <PlayerView />}
              </div>
            )}
            {currentGuildTab === 'roster' && (
              <Roster onAssign={(role, idx) => { setAssignRole(role); setAssignIdx(idx) }} />
            )}
            {currentGuildTab === 'members' && (
              <Members onInviteName={() => setInviteMode('name')} onInviteLink={() => setInviteMode('link')} />
            )}
            {currentGuildTab === 'settings' && <Settings />}
          </div>
        ) : null}
      </div>

      <CreateGroupModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <InviteModal open={inviteMode !== null} mode={inviteMode ?? 'name'} onClose={() => setInviteMode(null)} />
      <AssignSlotModal open={assignRole !== null} role={assignRole} slotIdx={assignIdx} onClose={() => { setAssignRole(null); setAssignIdx(null) }} />
    </div>
  )
}
