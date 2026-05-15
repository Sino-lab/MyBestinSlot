import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import type { Lang } from '../../types'
import { t } from '../../data/i18n'
import AuthModal from '../modals/AuthModal'
import styles from './Header.module.css'

const TABS = [
  { id: 'allbis' as const, icon: '🗡️', key: 'nav_all' },
  { id: 'reco' as const, icon: '💡', key: 'nav_reco' },
  { id: 'mylist' as const, icon: '📋', key: 'nav_mylist' },
  { id: 'guild' as const, icon: '🏰', key: 'nav_guild' },
]

export default function Header() {
  const { lang, setLang, myList, authUser, setAuthUser, page, setPage } = useApp()
  const [authOpen, setAuthOpen] = useState(false)
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login')

  function openAuth(tab: 'login' | 'signup') {
    setAuthTab(tab)
    setAuthOpen(true)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src="/logov2_mbis.png" alt="My Best In Slot" className={styles.logoImg} />
          </div>
          <nav className={styles.nav}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`${styles.ntab} ${page === tab.id ? styles.ntabActive : ''}`}
                onClick={() => setPage(tab.id)}
              >
                {tab.icon} {t(tab.key, lang)}
                {tab.id === 'mylist' && myList.length > 0 && (
                  <span className={styles.count}>{myList.length}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.right}>
          {(['en', 'fr'] as Lang[]).map(l => (
            <button
              key={l}
              className={`${styles.langBtn} ${lang === l ? styles.active : ''}`}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
          {authUser ? (
            <div className={styles.avatar} onClick={() => setAuthUser(null)} title="Log out">
              {authUser[0].toUpperCase()}
            </div>
          ) : (
            <>
              <button className={styles.hbtn} onClick={() => openAuth('login')}>Sign in</button>
              <button className={`${styles.hbtn} ${styles.primary}`} onClick={() => openAuth('signup')}>Sign up</button>
            </>
          )}
        </div>
      </header>
      <AuthModal open={authOpen} tab={authTab} onClose={() => setAuthOpen(false)} />
    </>
  )
}
