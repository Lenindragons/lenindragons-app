import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { DefaultThemeProvider } from './context/DefaultThemeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DefaultThemeProvider>
      <App />
    </DefaultThemeProvider>
  </React.StrictMode>
)
