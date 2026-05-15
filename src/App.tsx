import { AppProvider, useApp } from './context/AppContext'
import { GuildProvider } from './context/GuildContext'
import Header from './components/Header/Header'
import Toast from './components/Toast/Toast'
import AllBis from './components/pages/AllBis/AllBis'
import Recommendations from './components/pages/Recommendations/Recommendations'
import MyList from './components/pages/MyList/MyList'
import GuildLoots from './components/pages/GuildLoots/GuildLoots'

function Pages() {
  const { page } = useApp()
  return (
    <>
      {page === 'allbis' && <AllBis />}
      {page === 'reco' && <Recommendations />}
      {page === 'mylist' && <MyList />}
      {page === 'guild' && <GuildLoots />}
    </>
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
