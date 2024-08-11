import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { DefaultThemeProvider } from './context/DefaultThemeContext'
import { PlayerItemsProvider } from './pages/challenge/hooks/player-list/usePlayersList'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DefaultThemeProvider>
      <BrowserRouter>
        <PlayerItemsProvider>
          <App />
        </PlayerItemsProvider>
      </BrowserRouter>
    </DefaultThemeProvider>
  </React.StrictMode>
)
