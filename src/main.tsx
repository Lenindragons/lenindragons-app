import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { DefaultThemeProvider } from './context/DefaultThemeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DefaultThemeProvider>
    <App />
  </DefaultThemeProvider>
)
