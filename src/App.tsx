import { ThemeProvider } from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import GlobalStyle from './styles/global'
import { useDefaultTheme } from './context/DefaultThemeContext'
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './routes/PrivateRoute'
import ErrorProvider from './context/ErrorContext'
import { MainPage } from './pages/main/Main'
import { HomePage } from './pages/home/Home'
import { EventProvider } from './context/EventContext'
import { EventPage } from './pages/events/Events'
import { PlayersPage } from './pages/players/PlayersPage'
import EventDetailPage from './pages/events/EventDetailPage'
import ChallengeDetailPage from './pages/challenge/ChallengeDetailPage'
import { PageProvider } from './context/PageContext'
import { ChallengeProvider } from './context/ChallengeContext'
import { RulesPage } from './pages/rules/Rules'
import { ChallengeListPage } from './pages/challenge/ChallengeListPage'

export const App = () => {
  const { theme } = useDefaultTheme()

  return (
    <ErrorProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <PageProvider>
            <ChallengeProvider>
              <EventProvider>
                <GlobalStyle />
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/rules" element={<RulesPage />} />
                  <Route path="/challenges" element={<ChallengeListPage />} />
                  <Route
                    element={
                      <PrivateRoutes allowedTypes={['player', 'admin']} />
                    }
                  >
                    <Route path="/profile" element={<HomePage />} />
                  </Route>
                  <Route element={<PrivateRoutes allowedTypes={['admin']} />}>
                    <Route path="/seasons" element={<EventPage />} />
                    <Route path="/players" element={<PlayersPage />} />
                    <Route path="/seasons/:id" element={<EventDetailPage />} />
                    <Route
                      path="/challenges/:id"
                      element={<ChallengeDetailPage />}
                    />
                  </Route>
                </Routes>
              </EventProvider>
            </ChallengeProvider>
          </PageProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorProvider>
  )
}
