import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from './styles/global'
import { useDefaultTheme } from './context/DefaultThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'

const Home = () => {
  return <>Home</>
}

const Login = () => {
  const { signInGoogle } = useAuth()
  return (
    <>
      <h1>Login</h1>
      <button type="button" onClick={signInGoogle}>
        Logar com google
      </button>
    </>
  )
}

export const App = () => {
  const { theme } = useDefaultTheme()

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
