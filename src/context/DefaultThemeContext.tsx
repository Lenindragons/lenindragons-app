import { createContext, useContext } from 'react'
import { DefaultTheme } from 'styled-components'
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
