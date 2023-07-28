import { ReactNode, createContext, useContext } from 'react'
import { DefaultTheme } from 'styled-components'
import usePersistedState from '../utils/usePersistedState'
import light from '../styles/themes/light'
import dark from '../styles/themes/dark'

const DefaultThemeContext = createContext({})

interface Props {
  children: ReactNode
}

const DefaultThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <DefaultThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DefaultThemeContext.Provider>
  )
}

const useDefaultTheme = (): any => {
  return useContext(DefaultThemeContext)
}

export { DefaultThemeProvider, useDefaultTheme }
