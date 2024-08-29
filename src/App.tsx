import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from './styles/global'
import { useDefaultTheme } from './context/DefaultThemeContext'
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './routes/PrivateRoute'
import ErrorProvider from './context/ErrorContext'
import { MainPage } from './pages/main/Main'
import { ProfilePage } from './pages/dashboard/profile'
import NotFoundPage from './pages/404/not-found'

export const App = () => {
  const { theme } = useDefaultTheme()

  return (
    <ErrorProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard/profile" element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorProvider>
  )
}
