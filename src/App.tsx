import { useEffect, useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { GuildProvider } from './context/GuildContext'
import Header from './components/Header/Header'
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
  const { page, setPage, tooltip } = useApp()
  const [autoJoinCode, setAutoJoinCode] = useState<string | undefined>()
  useBlizzardOAuthCallback()

  useEffect(() => {
    // Check URL path for invite link
    const match = window.location.pathname.match(/^\/join\/(.+)$/)
    if (match) {
      const code = match[1]
      localStorage.setItem('pendingJoinCode', code)
      setAutoJoinCode(code)
      setPage('guild')
      window.history.replaceState(null, '', '/')
      return
    }
    // Check localStorage for code saved before OAuth redirect
    const pending = localStorage.getItem('pendingJoinCode')
    if (pending) {
      setAutoJoinCode(pending)
      setPage('guild')
    }
  }, [setPage])

  return (
    <main className={styles.main}>
      <div className={styles.pageCard}>
        {page === 'allbis' && <AllBis />}
        {page === 'reco' && <Recommendations />}
        {page === 'mylist' && <MyList />}
        {page === 'guild' && <GuildLoots autoJoinCode={autoJoinCode} />}
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
        <Toast />
      </GuildProvider>
    </AppProvider>
  )
}
