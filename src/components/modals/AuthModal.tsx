import { useState } from 'react'
import Modal from '../shared/Modal'
import { useApp } from '../../context/AppContext'
import styles from './Modal.module.css'

interface Props {
  open: boolean
  tab: 'login' | 'signup'
  onClose: () => void
}

export default function AuthModal({ open, tab, onClose }: Props) {
  const [activeTab, setActiveTab] = useState(tab)
  const { setAuthUser } = useApp()
  const isLogin = activeTab === 'login'

  function handleSubmit() {
    setAuthUser('Thordak')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.tabsw}>
        <button className={activeTab === 'login' ? styles.active : ''} onClick={() => setActiveTab('login')}>Sign in</button>
        <button className={activeTab === 'signup' ? styles.active : ''} onClick={() => setActiveTab('signup')}>Sign up</button>
      </div>
      <h3 className={styles.title}>{isLogin ? 'Welcome back' : 'Create account'}</h3>
      <div className={styles.field}>
        <label>Email</label>
        <input type="email" placeholder="adventurer@wow.com" />
      </div>
      <div className={styles.field}>
        <label>Password</label>
        <input type="password" placeholder="••••••••" />
      </div>
      {!isLogin && (
        <div className={styles.field}>
          <label>Confirm</label>
          <input type="password" placeholder="••••••••" />
        </div>
      )}
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onClose}>Cancel</button>
        <button className={styles.submit} onClick={handleSubmit}>
          {isLogin ? 'Sign in' : 'Sign up'}
        </button>
      </div>
    </Modal>
  )
}
