import { useEffect, useMemo, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { SUPPORTED_TOKENS, explorerTxUrl, type TokenConfig } from '../solana/config';
import { buildTransfer } from '../solana/pay';
import './PayModal.css';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'confirming'; signature: string }
  | { kind: 'success'; signature: string }
  | { kind: 'error'; message: string };

interface Props {
  open: boolean;
  onClose: () => void;
}

const PayModal = ({ open, onClose }: Props) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const tokens = useMemo(() => SUPPORTED_TOKENS, []);
  const [symbol, setSymbol] = useState(tokens.find((t) => t.enabled)?.symbol ?? 'SOL');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const token = tokens.find((t) => t.symbol === symbol) as TokenConfig;

  useEffect(() => {
    if (!open) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setStatus({ kind: 'idle' });
      setAmount('');
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [open]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const send = async () => {
    const value = parseFloat(amount);
    if (!publicKey || !token || !token.enabled) return;
    if (!Number.isFinite(value) || value <= 0) {
      setStatus({ kind: 'error', message: 'Enter an amount greater than 0.' });
      return;
    }
    try {
      setStatus({ kind: 'sending' });
      const { transaction, blockhash, lastValidBlockHeight } = await buildTransfer(
        connection,
        publicKey,
        token.mint,
        value,
      );
      const signature = await sendTransaction(transaction, connection);
      setStatus({ kind: 'confirming', signature });
      await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        'confirmed',
      );
      setStatus({ kind: 'success', signature });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Transaction failed.';
      setStatus({ kind: 'error', message });
    }
  };

  return (
    <div className="pay-backdrop" onClick={onClose}>
      <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pay-close" aria-label="Close" onClick={onClose}>×</button>
        <h3 className="pay-title">
          Tip or pay <span className="gradient-text">0xmattyic333.skr</span>
        </h3>
        <p className="pay-sub">Send SOL, USDC, or SKR straight to my wallet.</p>

        {!connected ? (
          <button className="btn btn-primary pay-connect" onClick={() => setVisible(true)}>
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="pay-tokens">
              {tokens.map((t) => (
                <button
                  key={t.symbol}
                  className={`pay-token ${symbol === t.symbol ? 'active' : ''}`}
                  disabled={!t.enabled}
                  title={t.note}
                  onClick={() => setSymbol(t.symbol)}
                >
                  {t.symbol}
                  {!t.enabled && t.note ? ` · ${t.note}` : ''}
                </button>
              ))}
            </div>
            <div className="pay-presets">
              {token?.presets.map((p) => (
                <button key={p} className="pay-preset" onClick={() => setAmount(String(p))}>
                  {p} {symbol}
                </button>
              ))}
            </div>
            <input
              className="pay-amount"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              placeholder={`Custom amount (${symbol})`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="btn btn-primary pay-send"
              disabled={status.kind === 'sending' || status.kind === 'confirming' || !token?.enabled}
              onClick={send}
            >
              {status.kind === 'sending'
                ? 'Confirm in wallet…'
                : status.kind === 'confirming'
                  ? 'Confirming…'
                  : `Send ${amount || ''} ${symbol}`.replace(/\s+/g, ' ').trim()}
            </button>
            {status.kind === 'success' && (
              <p className="pay-status pay-success">
                Sent!{' '}
                <a href={explorerTxUrl(status.signature)} target="_blank" rel="noopener noreferrer">
                  View on Explorer ↗
                </a>
              </p>
            )}
            {status.kind === 'error' && (
              <p className="pay-status pay-error">{status.message}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PayModal;
