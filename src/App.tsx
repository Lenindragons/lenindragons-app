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

export const App = () => {
  const { theme } = useDefaultTheme()

  return (
    <ErrorProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <EventProvider>
              <GlobalStyle />
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/event" element={<EventPage />} />
                </Route>
              </Routes>
            </EventProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorProvider>
  )
}
