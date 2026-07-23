import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { WalletContext } from './solana/WalletContext.tsx'
import { PayModalProvider } from './solana/PayModalProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletContext>
      <PayModalProvider>
        <App />
      </PayModalProvider>
    </WalletContext>
  </StrictMode>,
)
