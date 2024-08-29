import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme } from '@mui/material'
import GlobalStyle from './styles/global'
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './routes/PrivateRoute'
import ErrorProvider from './context/ErrorContext'
import { MainPage } from './pages/main/Main'
import { OpenPage, StorePage, TransitPage, DonePage } from './pages/dashboard'
import { NotFoundPage } from './pages/404/not-found'

export const App = () => {
  const darkTheme: any = createTheme({
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
                <Route path="/dashboard/open" element={<OpenPage />} />
                <Route path="/dashboard/transit" element={<TransitPage />} />
                <Route path="/dashboard/store" element={<StorePage />} />
                <Route path="/dashboard/done" element={<DonePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorProvider>
  )
}
