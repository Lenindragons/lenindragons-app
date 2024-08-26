import { ThemeProvider } from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import GlobalStyle from './styles/global'
import { useDefaultTheme } from './context/DefaultThemeContext'
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './routes/PrivateRoute'
import ErrorProvider from './context/ErrorContext'
import { RankingPage } from './pages/ranking'
import { MainPage } from './pages/main'
import { ProfilePage } from './pages/dashboard/profile'
import { EventProvider } from './context/EventContext'
import { SeasonsPage, SeasonDetailPage } from './pages/dashboard/seasons'
import { PlayersPage } from './pages/dashboard/players/PlayersPage'
import ChallengeDetailPage from './pages/challenge/ChallengeDetailPage'
import { PageProvider } from './context/PageContext'
import { ChallengeProvider } from './context/ChallengeContext'
import { RulesPage } from './pages/rules/Rules'
import { ChallengeListPage } from './pages/challenge/ChallengeListPage'
import { ChallengeListDetailPage } from './pages/challenge/ChallengeListDetailPage'
import { DeckPage } from './pages/dashboard/decks/DeckPage'
import { LeagueChallengePage } from './pages/league-challenge'

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
                  <Route path="/ranking" element={<RankingPage />} />
                  <Route
                    path="/league-challenge"
                    element={<LeagueChallengePage />}
                  />
                  <Route path="/rules" element={<RulesPage />} />
                  <Route path="/challenges" element={<ChallengeListPage />} />
                  <Route
                    path="/challenge/:id"
                    element={<ChallengeListDetailPage />}
                  />
                  <Route
                    element={
                      <PrivateRoutes allowedTypes={['player', 'admin']} />
                    }
                  >
                    <Route path="/profile" element={<ProfilePage />} />
                  </Route>
                  <Route element={<PrivateRoutes allowedTypes={['admin']} />}>
                    <Route path="/seasons" element={<SeasonsPage />} />
                    <Route path="/players" element={<PlayersPage />} />
                    <Route path="/decks" element={<DeckPage />} />
                    <Route path="/seasons/:id" element={<SeasonDetailPage />} />
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
