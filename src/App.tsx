import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from './styles/global'
import { useDefaultTheme } from './context/DefaultThemeContext'
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './routes/PrivateRoute'
import ErrorProvider from './context/ErrorContext'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Home } from './pages/home/Home'
import { EventProvider } from './context/EventContext'

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
                <Route path="/" element={<Home />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/home" element={<Dashboard />} />
                </Route>
              </Routes>
            </EventProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorProvider>
  )
}
