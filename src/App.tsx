import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme, useTheme } from '@mui/material'
import GlobalStyle from './styles/global'
import { useDefaultTheme } from './context/DefaultThemeContext'
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './routes/PrivateRoute'
import ErrorProvider from './context/ErrorContext'
import { MainPage } from './pages/main/Main'
import { ProfilePage } from './pages/dashboard/profile'
import { NotFoundPage } from './pages/404/not-found'

export const App = () => {
  // const { theme } = useDefaultTheme()
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <ErrorProvider>
      <ThemeProvider theme={darkTheme}>
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
