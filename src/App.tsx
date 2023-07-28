import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/global'
import { useDefaultTheme } from './context/DefaultThemeContext'

export const App = () => {
  const { theme } = useDefaultTheme()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <p>Hello World</p>
    </ThemeProvider>
  )
}
