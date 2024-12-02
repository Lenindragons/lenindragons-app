import { createContext, useContext } from 'react'
import { DefaultTheme } from 'styled-components'
import { createTheme, ThemeProvider } from '@mui/material'
import usePersistedState from '../utils/usePersistedState'
import light from '../styles/themes/light'
import dark from '../styles/themes/dark'
import { ContextProps } from './ContextProps'

const DefaultThemeContext = createContext({})

const DefaultThemeProvider = ({ children }: ContextProps) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  const createdTheme = createTheme({
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true,
        },
      },
    },
  })

  return (
    <DefaultThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={createdTheme}>{children}</ThemeProvider>
    </DefaultThemeContext.Provider>
  )
}

const useDefaultTheme = (): any => {
  return useContext(DefaultThemeContext)
}

export { DefaultThemeProvider, useDefaultTheme }
