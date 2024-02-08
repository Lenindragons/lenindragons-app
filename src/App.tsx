import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from './styles/global'
import { useDefaultTheme } from './context/DefaultThemeContext'
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './routes/PrivateRoute'
import ErrorProvider from './context/ErrorContext'
import { MainPage } from './pages/main/Main'
import { HomePage } from './pages/home/Home'
import { EventProvider } from './context/EventContext'
import { EventPage } from './pages/events/Events'
import EventDetailPage from './pages/events/EventDetailPage'
import { PageProvider } from './context/PageContext'

export const App = () => {
  const { theme } = useDefaultTheme()

  return (
    <ErrorProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <PageProvider>
              <EventProvider>
                <GlobalStyle />
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route element={<PrivateRoutes />}>
                    <Route path="/profile" element={<HomePage />} />
                    <Route path="/event" element={<EventPage />} />
                    <Route path="/event/:id" element={<EventDetailPage />} />
                  </Route>
                </Routes>
              </EventProvider>
            </PageProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorProvider>
  )
}
