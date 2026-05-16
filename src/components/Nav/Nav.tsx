import { useApp } from '../../context/AppContext'
import { useGuild } from '../../context/GuildContext'
import { t } from '../../data/i18n'
import styles from './Nav.module.css'

const TABS = [
  { id: 'allbis' as const, icon: '🗡️', key: 'nav_all' },
  { id: 'reco' as const, icon: '💡', key: 'nav_reco' },
  { id: 'mylist' as const, icon: '📋', key: 'nav_mylist' },
  { id: 'guild' as const, icon: '🏰', key: 'nav_guild' },
]

export default function Nav() {
  const { page, setPage, lang, myList } = useApp()
  const { pendingInvites } = useGuild()

  return (
    <nav className={styles.nav}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.ntab} ${page === tab.id ? styles.active : ''}`}
          onClick={() => setPage(tab.id)}
        >
          {tab.icon} {t(tab.key, lang)}
          {tab.id === 'mylist' && myList.length > 0 && (
            <span className={styles.count}>{myList.length}</span>
          )}
          {tab.id === 'guild' && pendingInvites.length > 0 && (
            <span className={styles.count}>{pendingInvites.length}</span>
          )}
        </button>
      ))}
    </nav>
  )
}
