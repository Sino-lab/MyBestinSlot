import { AppProvider, useApp } from './context/AppContext'
import { GuildProvider } from './context/GuildContext'
import Header from './components/Header/Header'
import Toast from './components/Toast/Toast'
import AllBis from './components/pages/AllBis/AllBis'
import Recommendations from './components/pages/Recommendations/Recommendations'
import MyList from './components/pages/MyList/MyList'
import GuildLoots from './components/pages/GuildLoots/GuildLoots'
import ItemTooltip from './components/shared/ItemTooltip'
import { useBlizzardOAuthCallback } from './hooks/useBlizzardAuth'
import styles from './App.module.css'

function Pages() {
  const { page, tooltip } = useApp()
  useBlizzardOAuthCallback()
  return (
    <main className={styles.main}>
      <div className={styles.pageCard}>
        {page === 'allbis' && <AllBis />}
        {page === 'reco' && <Recommendations />}
        {page === 'mylist' && <MyList />}
        {page === 'guild' && <GuildLoots />}
      </div>
      {tooltip && <ItemTooltip item={tooltip.item} x={tooltip.x} y={tooltip.y} />}
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
