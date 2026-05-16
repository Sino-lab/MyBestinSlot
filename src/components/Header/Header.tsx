import { useApp } from '../../context/AppContext'
import { useGuild } from '../../context/GuildContext'
import { t } from '../../data/i18n'
import { loginWithBlizzard } from '../../hooks/useBlizzardAuth'
import { getClassColor } from '../modals/CharacterSelectModal'
import styles from './Header.module.css'

const TABS = [
  { id: 'allbis' as const, icon: '🗡️', key: 'nav_all' },
  { id: 'reco' as const, icon: '💡', key: 'nav_reco' },
  { id: 'mylist' as const, icon: '📋', key: 'nav_mylist' },
  { id: 'guild' as const, icon: '🏰', key: 'nav_guild' },
]

export default function Header() {
  const {
    lang, myList, authUser, authProfile, setAuthProfile, setCharacters,
    page, setPage, selectedCharacter, setSelectedCharacter, setCharSelectOpen,
  } = useApp()
  const { pendingInvites } = useGuild()

  function logout() {
    setAuthProfile(null)
    setCharacters([])
    setSelectedCharacter(null)
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoText}>My Best in Slot</span>
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
            {tab.id === 'guild' && pendingInvites.length > 0 && (
              <span className={styles.count}>{pendingInvites.length}</span>
            )}
          </button>
        ))}
      </nav>

      <div className={styles.right}>
        {authUser ? (
          <div className={styles.userInfo}>
            {selectedCharacter ? (
              <button
                className={styles.charButton}
                onClick={() => setCharSelectOpen(true)}
                title="Click to change character"
              >
                <div className={styles.charAvatar} style={{ borderColor: getClassColor(selectedCharacter.class) }}>
                  <span style={{ color: getClassColor(selectedCharacter.class) }}>{selectedCharacter.name[0]}</span>
                  {selectedCharacter.avatarUrl && (
                    <img
                      src={selectedCharacter.avatarUrl}
                      alt=""
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    />
                  )}
                </div>
                <span className={styles.charDetails}>
                  <span className={styles.charNameHeader}>{selectedCharacter.name}</span>
                  <span className={styles.charRealmHeader}>{selectedCharacter.realm}</span>
                </span>
                <span className={styles.btSubtext}>{authProfile?.battletag}</span>
              </button>
            ) : (
              <>
                <div className={styles.avatar} title={authProfile?.battletag}>
                  {authUser[0].toUpperCase()}
                </div>
                <span className={styles.battletag}>{authProfile?.battletag}</span>
                <button
                  className={`${styles.hbtn}`}
                  onClick={() => setCharSelectOpen(true)}
                >
                  Select character
                </button>
              </>
            )}
            <button className={styles.logoutBtn} onClick={logout} title="Log out">
              ✕
            </button>
          </div>
        ) : (
          <button className={`${styles.hbtn} ${styles.primary} ${styles.bnetBtn}`} onClick={loginWithBlizzard}>
            Sign in with Battle.net
          </button>
        )}
      </div>
    </header>
  )
}
