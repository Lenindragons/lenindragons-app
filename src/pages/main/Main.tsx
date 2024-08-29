import React from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { Login } from './components/login'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const MainPage: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Login />
    </ThemeProvider>
  )
}
