import { useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { GuildProvider } from './context/GuildContext'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Toast from './components/Toast/Toast'
import AllBis from './components/pages/AllBis/AllBis'
import Recommendations from './components/pages/Recommendations/Recommendations'
import MyList from './components/pages/MyList/MyList'
import GuildLoots from './components/pages/GuildLoots/GuildLoots'
import ItemTooltip from './components/shared/ItemTooltip'
import CharacterSelectModal from './components/modals/CharacterSelectModal'
import { useBlizzardOAuthCallback } from './hooks/useBlizzardAuth'
import styles from './App.module.css'

function Pages() {
  const { page, setPage, tooltip, setPendingJoinCode } = useApp()
  useBlizzardOAuthCallback()

  useEffect(() => {
    // Read ?join= param from URL (invite link)
    const params = new URLSearchParams(window.location.search)
    const joinCode = params.get('join')
    if (joinCode) {
      localStorage.setItem('pendingJoinCode', joinCode)
      setPendingJoinCode(joinCode)
      setPage('guild')
      const url = new URL(window.location.href)
      url.searchParams.delete('join')
      window.history.replaceState({}, '', url.toString())
      return
    }
    // Restore code saved before OAuth redirect
    const pending = localStorage.getItem('pendingJoinCode')
    if (pending) {
      setPendingJoinCode(pending)
      setPage('guild')
    }
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.pageCard}>
        {page === 'allbis' && <AllBis />}
        {page === 'reco' && <Recommendations />}
        {page === 'mylist' && <MyList />}
        {page === 'guild' && <GuildLoots />}
      </div>
      {tooltip && <ItemTooltip item={tooltip.item} x={tooltip.x} y={tooltip.y} />}
      <CharacterSelectModal />
    </main>
  )
}

export default function App() {
  return (
    <AppProvider>
      <GuildProvider>
        <Header />
        <Pages />
        <Nav />
        <Toast />
      </GuildProvider>
    </AppProvider>
  )
}
