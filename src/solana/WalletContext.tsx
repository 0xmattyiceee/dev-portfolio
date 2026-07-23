import { useMemo, type FC, type ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  registerMwa,
  createDefaultAuthorizationCache,
  createDefaultChainSelector,
  createDefaultWalletNotFoundHandler,
} from '@solana-mobile/wallet-standard-mobile';
import '@solana/wallet-adapter-react-ui/styles.css';
import { RPC_ENDPOINT, WALLET_STANDARD_CHAIN } from './config';

// Register Mobile Wallet Adapter once (adds the Seeker vault to the wallet list
// on Android; browser wallets auto-register via Wallet Standard).
let mwaRegistered = false;
if (typeof window !== 'undefined' && !mwaRegistered) {
  mwaRegistered = true;
  registerMwa({
    appIdentity: {
      uri: `${window.location.protocol}//${window.location.host}`,
      name: '0xmattyic333.skr',
      icon: '/solana.svg',
    },
    authorizationCache: createDefaultAuthorizationCache(),
    chains: [WALLET_STANDARD_CHAIN],
    chainSelector: createDefaultChainSelector(),
    onWalletNotFound: createDefaultWalletNotFoundHandler(),
  });
}

export const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = useMemo(() => RPC_ENDPOINT, []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
