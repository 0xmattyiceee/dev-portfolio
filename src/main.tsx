import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { WalletContext } from './solana/WalletContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletContext>
      <App />
    </WalletContext>
  </StrictMode>,
)
