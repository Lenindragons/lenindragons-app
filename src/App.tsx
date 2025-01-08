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
import { ReportPage } from './pages/dashboard/report/ReportPage'
import ChallengeDetailPage from './pages/challenge/ChallengeDetailPage'
import { PageProvider } from './context/PageContext'
import { ChallengeProvider } from './context/ChallengeContext'
import { RulesPage } from './pages/rules/Rules'
import { ChallengeListPage } from './pages/challenge/ChallengeListPage'
import { ChallengeListDetailPage } from './pages/challenge/ChallengeListDetailPage'
import { DeckPage } from './pages/dashboard/decks/DeckPage'
import { LeagueChallengePage } from './pages/league-challenge'
import { ReportDetailPage } from './pages/dashboard/report/ReportDetailPage'
import { SeasonCreatePage } from './pages/dashboard/seasons/SeasonCreatePage'
import { PlayerPage } from './pages/player/PlayerPage'
import { AchievementsPage } from './pages/dashboard/achievements/AchievementsPage'

const allowedAll = ['admin', 'organizer', 'judge', 'player']
const allowedAdmin = ['admin', 'organizer', 'judge']
const allowedAdminOrganizer = ['admin', 'organizer']
const allowedAdminJudge = ['admin', 'judge']

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
                  <Route path="/profile/player/:id" element={<PlayerPage />} />
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

                  <Route element={<PrivateRoutes allowedTypes={allowedAll} />}>
                    <Route path="/profile" element={<ProfilePage />} />
                  </Route>
                  <Route
                    element={
                      <PrivateRoutes allowedTypes={allowedAdminOrganizer} />
                    }
                  >
                    <Route path="/analytics-report" element={<ReportPage />} />
                    <Route path="/achievements" element={<AchievementsPage />} />
                    <Route
                      path="/analytics-report/:id"
                      element={<ReportDetailPage />}
                    />
                  </Route>

                  <Route
                    element={<PrivateRoutes allowedTypes={allowedAdmin} />}
                  >
                    <Route path="/seasons" element={<SeasonsPage />} />
                    <Route
                      path="/seasons/create"
                      element={<SeasonCreatePage />}
                    />
                    <Route path="/seasons/:id" element={<SeasonDetailPage />} />
                    <Route
                      path="/challenges/:id"
                      element={<ChallengeDetailPage />}
                    />
                  </Route>

                  <Route
                    element={<PrivateRoutes allowedTypes={allowedAdminJudge} />}
                  >
                    <Route path="/players" element={<PlayersPage />} />
                    <Route path="/decks" element={<DeckPage />} />
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
