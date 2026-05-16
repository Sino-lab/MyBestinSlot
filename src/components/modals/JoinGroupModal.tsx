import { useState, useEffect } from 'react'
import Modal from '../shared/Modal'
import { useGuild } from '../../context/GuildContext'
import { useApp } from '../../context/AppContext'
import { loginWithBlizzard } from '../../hooks/useBlizzardAuth'
import styles from './Modal.module.css'
import roleStyles from './JoinGroupModal.module.css'

type Role = 'tank' | 'healer' | 'dps'

const ROLES: { id: Role; label: string; icon: string; color: string }[] = [
  { id: 'tank',   label: 'Tank',   icon: '🛡️', color: '#4a9eff' },
  { id: 'healer', label: 'Healer', icon: '💚', color: '#50d080' },
  { id: 'dps',    label: 'DPS',    icon: '⚔️', color: '#ff8040' },
]

interface Props {
  open: boolean
  initialCode?: string
  onClose: () => void
}

export default function JoinGroupModal({ open, initialCode = '', onClose }: Props) {
  const [step, setStep] = useState<1 | 2>(1)
  const [code, setCode] = useState(initialCode)
  const [role, setRole] = useState<Role>('dps')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const { joinGroup } = useGuild()
  const { showToast, authUser } = useApp()

  useEffect(() => {
    if (initialCode) setCode(initialCode)
  }, [initialCode])

  function handleClose() {
    localStorage.removeItem('pendingJoinCode')
    setStep(1)
    setCode(initialCode)
    setRole('dps')
    setError('')
    onClose()
  }

  function handleNext() {
    if (!code.trim()) { setError('Enter a group code.'); return }
    setStep(2)
    setError('')
  }

  async function handleJoin() {
    setBusy(true)
    try {
      const result = await joinGroup(code, role)
      if (result === 'not_found') {
        setError('No group found with this code.')
        setStep(1)
      } else if (result === 'already_member') {
        setError('You are already in this group.')
        setStep(1)
      } else {
        showToast('Joined the group!', 'success')
        handleClose()
      }
    } catch {
      setError('Something went wrong. Try again.')
      setStep(1)
    } finally {
      setBusy(false)
    }
  }

  // Not logged in — prompt login (code is preserved in localStorage)
  if (!authUser) return (
    <Modal open={open} onClose={handleClose}>
      <h3 className={styles.title}>Join a group</h3>
      <p style={{ fontSize: 13, color: 'var(--text2)', margin: '0 0 1.2rem' }}>
        You need to be logged in to join a group.
      </p>
      {code && (
        <div className={styles.codeBox} style={{ marginBottom: '1.2rem' }}>
          <strong style={{ color: 'var(--text2)' }}>Code:</strong>{' '}
          <span className={styles.codeVal}>{code}</span>
        </div>
      )}
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={handleClose}>Cancel</button>
        <button className={styles.submit} onClick={loginWithBlizzard}>
          Sign in with Battle.net
        </button>
      </div>
    </Modal>
  )

  return (
    <Modal open={open} onClose={handleClose}>
      {step === 1 ? (
        <>
          <h3 className={styles.title}>Join a group</h3>
          <div className={styles.field}>
            <label>Group code</label>
            <input
              value={code}
              onChange={e => { setCode(e.target.value); setError('') }}
              placeholder="e.g. ABCD-EFGH-IJKL"
              onKeyDown={e => e.key === 'Enter' && !busy && handleNext()}
              autoFocus
            />
            {error && <div style={{ fontSize: 12, color: '#ff7070', marginTop: 5 }}>{error}</div>}
            <div className={styles.hint} style={{ marginTop: 6 }}>
              Ask your group admin for the invite code.
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.cancel} onClick={handleClose}>Cancel</button>
            <button className={styles.submit} onClick={handleNext}>Next →</button>
          </div>
        </>
      ) : (
        <>
          <h3 className={styles.title}>Choose your role</h3>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: '1rem' }}>
            What role will you play in this group?
          </p>
          <div className={roleStyles.roleGrid}>
            {ROLES.map(r => (
              <button
                key={r.id}
                className={`${roleStyles.roleBtn} ${role === r.id ? roleStyles.selected : ''}`}
                style={{ '--rc': r.color } as React.CSSProperties}
                onClick={() => setRole(r.id)}
              >
                <span className={roleStyles.roleIcon}>{r.icon}</span>
                <span className={roleStyles.roleLabel} style={{ color: role === r.id ? r.color : undefined }}>{r.label}</span>
              </button>
            ))}
          </div>
          {error && <div style={{ fontSize: 12, color: '#ff7070', marginTop: 5 }}>{error}</div>}
          <div className={styles.actions}>
            <button className={styles.cancel} onClick={() => { setStep(1); setError('') }}>← Back</button>
            <button className={styles.submit} onClick={handleJoin} disabled={busy}>
              {busy ? 'Joining…' : 'Join'}
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
