import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { usePayModal } from '../solana/PayModalProvider';
import './WalletButton.css';

const truncate = (addr: string) => `${addr.slice(0, 4)}…${addr.slice(-4)}`;

const WalletButton = () => {
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { openPay } = usePayModal();

  if (connected && publicKey) {
    return (
      <button className="connect-pill wallet-connected" onClick={openPay}>
        <span className="wallet-dot" />
        {truncate(publicKey.toBase58())}
      </button>
    );
  }

  return (
    <button className="connect-pill" onClick={() => setVisible(true)}>
      Connect Wallet
    </button>
  );
};

export default WalletButton;
