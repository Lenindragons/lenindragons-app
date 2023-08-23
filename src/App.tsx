import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from './styles/global'
import { useDefaultTheme } from './context/DefaultThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import PrivateRoutes from './routes/PrivateRoute'
import ErrorProvider from './context/ErrorContext'

const Home = () => {
  const { logout } = useAuth()

  return (
    <>
      Home{' '}
      <button type="button" onClick={logout}>
        sair
      </button>
    </>
  )
}

const Login = () => {
  const { signInGoogle, user, logout } = useAuth()
  return (
    <>
      <h1>Login</h1>
      {user && (
        <>
          <p>{user.name}</p>
          <img src={user.image} alt={user.name} />
          <p>{user.email}</p>
        </>
      )}
      <button type="button" onClick={signInGoogle}>
        Logar com google
      </button>

      <button type="button" onClick={logout}>
        Sair
      </button>
    </>
  )
}

export const App = () => {
  const { theme } = useDefaultTheme()

  return (
    <ErrorProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Home />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorProvider>
  )
}
