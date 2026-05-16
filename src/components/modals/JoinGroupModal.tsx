import { useState, useEffect } from 'react'
import Modal from '../shared/Modal'
import { useGuild } from '../../context/GuildContext'
import { useApp } from '../../context/AppContext'
import { CLASS_COLORS } from '../../data/classes'
import { loginWithBlizzard } from '../../hooks/useBlizzardAuth'
import type { WowCharacter } from '../../types'
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
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [code, setCode] = useState(initialCode)
  const [role, setRole] = useState<Role>('dps')
  const [character, setCharacter] = useState<WowCharacter | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const { joinGroup } = useGuild()
  const { showToast, authUser, characters, selectedCharacter } = useApp()

  useEffect(() => {
    if (initialCode) setCode(initialCode)
  }, [initialCode])

  // Pre-select current character
  useEffect(() => {
    if (open && selectedCharacter) setCharacter(selectedCharacter)
  }, [open, selectedCharacter])

  function handleClose() {
    localStorage.removeItem('pendingJoinCode')
    setStep(1)
    setCode(initialCode)
    setRole('dps')
    setCharacter(selectedCharacter)
    setError('')
    onClose()
  }

  function handleNext() {
    if (!code.trim()) { setError('Enter a group code.'); return }
    setStep(2)
    setError('')
  }

  function handleNextRole() {
    setStep(3)
    setError('')
  }

  async function handleJoin() {
    setBusy(true)
    try {
      const result = await joinGroup(code, role, character)
      if (result === 'not_found') {
        setError('No group found with this code.')
        setStep(1)
      } else if (result === 'already_member') {
        setError(`${character?.name ?? 'This character'} is already in this group.`)
        setStep(3)
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

  // Not logged in
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
        <button className={styles.submit} onClick={loginWithBlizzard}>Sign in with Battle.net</button>
      </div>
    </Modal>
  )

  return (
    <Modal open={open} onClose={handleClose}>
      {step === 1 && (
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
            <div className={styles.hint} style={{ marginTop: 6 }}>Ask your group admin for the invite code.</div>
          </div>
          <div className={styles.actions}>
            <button className={styles.cancel} onClick={handleClose}>Cancel</button>
            <button className={styles.submit} onClick={handleNext}>Next →</button>
          </div>
        </>
      )}

      {step === 2 && (
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
          <div className={styles.actions}>
            <button className={styles.cancel} onClick={() => { setStep(1); setError('') }}>← Back</button>
            <button className={styles.submit} onClick={handleNextRole}>Next →</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h3 className={styles.title}>Choose a character</h3>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: '1rem' }}>
            Which character will join this group?
          </p>
          <div className={roleStyles.charList}>
            {characters.map(c => {
              const color = CLASS_COLORS[c.class?.toLowerCase()] ?? '#aaaaaa'
              const selected = character?.id === c.id
              return (
                <button
                  key={c.id}
                  className={`${roleStyles.charBtn} ${selected ? roleStyles.charSelected : ''}`}
                  style={{ '--cc': color } as React.CSSProperties}
                  onClick={() => { setCharacter(c); setError('') }}
                >
                  <div className={roleStyles.charAvatar} style={{ background: color + '22', color, borderColor: color + '55' }}>
                    {c.name[0]}
                  </div>
                  <div className={roleStyles.charInfo}>
                    <div className={roleStyles.charName} style={{ color }}>{c.name}</div>
                    <div className={roleStyles.charSub}>{c.class} · {c.realm}</div>
                  </div>
                  {selected && <span className={roleStyles.charCheck}>✓</span>}
                </button>
              )
            })}
          </div>
          {error && <div style={{ fontSize: 12, color: '#ff7070', marginTop: 5, marginBottom: 5 }}>{error}</div>}
          <div className={styles.actions}>
            <button className={styles.cancel} onClick={() => { setStep(2); setError('') }}>← Back</button>
            <button className={styles.submit} onClick={handleJoin} disabled={busy || !character}>
              {busy ? 'Joining…' : 'Join'}
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
