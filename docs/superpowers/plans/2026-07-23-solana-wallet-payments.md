# Solana Wallet Payments + Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add polish fixes plus a devnet-wired Solana wallet payment flow (connect Seeker vault / browser wallets; tip or pay in SOL / USDC / SKR) to the portfolio.

**Architecture:** A `src/solana/` module holds config (network + token registry + recipient), a wallet-adapter provider (`WalletContext`) that registers Mobile Wallet Adapter + auto-detected browser wallets, a pure transfer-builder (`pay.ts`), and a `PayModalProvider` context so both the navbar `WalletButton` and the Contact "Support" button open one shared pay modal. Vite gets node polyfills for web3.js's Buffer.

**Tech Stack:** React 19, TypeScript, Vite 7, `@solana/web3.js`, `@solana/wallet-adapter-*`, `@solana-mobile/wallet-standard-mobile`, `@solana/spl-token`, `vite-plugin-node-polyfills`.

## Global Constraints

- **Network is devnet.** `ACTIVE_NETWORK = 'devnet'`. Going live later is a one-line change to that constant only.
- **Recipient address (exact):** `FHeetC3DwgnaPiePqWaGSC1PLneL4dYGtMfRiiVnmTkp`.
- **Token mints (exact):** devnet USDC `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`; mainnet USDC `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`; mainnet SKR `SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3`. SOL is native (no mint). SKR has no devnet token → disabled on devnet.
- **Install with `--legacy-peer-deps`** (wallet-adapter declares React ≤18 peers; React 19 is runtime-compatible).
- **No fabricated content.** Languages honest: JavaScript + C# are real (C# via Unity); Clarity/Cadence/Move/Go/C++ are learning.
- **Safety:** the app never moves funds itself; transfers execute only when a visitor signs in their own wallet. No secrets/keys in code.
- **No test runner.** Verification per task = `npm run lint` + `npm run build` passing. Final task adds a manual devnet checklist. Do not add a test framework.
- **SPL decimals fetched on-chain** via `getMint` — never hardcoded.

---

### Task 1: Polish fixes (favicon, logo, nav, email, languages, Unity nod)

**Files:**
- Create: `public/solana.svg`
- Modify: `index.html` (favicon href)
- Modify: `src/components/Navbar.tsx` (logo text + Contact link)
- Modify: `src/components/Contact.tsx` (email)
- Modify: `src/components/Stack.tsx` (language arrays)
- Modify: `src/components/Mission.tsx` (Unity nod)

**Interfaces:**
- Consumes: nothing new.
- Produces: no exported symbols; visual/content changes only.

- [ ] **Step 1: Create `public/solana.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="skr" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#9945FF"/>
      <stop offset="1" stop-color="#14F195"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="24" fill="#0b0b0f"/>
  <g fill="url(#skr)">
    <path d="M30 32 h42 l-12 11 H18 z"/>
    <path d="M18 45 h42 l12 11 H30 z" opacity="0.85"/>
    <path d="M30 58 h42 l-12 11 H18 z" opacity="0.72"/>
  </g>
</svg>
```

- [ ] **Step 2: Update `index.html` favicon**

Replace:

```html
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
```

with:

```html
    <link rel="icon" type="image/svg+xml" href="/solana.svg" />
```

- [ ] **Step 3: Update `src/components/Navbar.tsx` — logo text + Contact link**

Replace the logo anchor:

```tsx
        <a href="#hero" className="logo">
          mattyice<span className="logo-skr">.skr</span>
        </a>
```

with:

```tsx
        <a href="#hero" className="logo">
          0xmattyic333<span className="logo-skr">.skr</span>
        </a>
```

And replace the `<ul className={...nav-links...}>` block:

```tsx
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#mission" onClick={() => setMenuOpen(false)}>Mission</a></li>
          <li><a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Work</a></li>
        </ul>
```

with (adds Contact):

```tsx
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#mission" onClick={() => setMenuOpen(false)}>Mission</a></li>
          <li><a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Work</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
```

(Leave the existing `.connect-pill` Connect link as-is; Task 7 replaces it.)

- [ ] **Step 4: Update `src/components/Contact.tsx` — email**

Replace:

```tsx
          <a href="mailto:abc0xmattyic333@gmail.com" className="btn btn-primary">Say gm</a>
```

with:

```tsx
          <a href="mailto:0xmattyiceee@gmail.com" className="btn btn-primary">Say gm</a>
```

- [ ] **Step 5: Update `src/components/Stack.tsx` — expand language buckets**

Replace the two array declarations:

```tsx
const shipping = ['React', 'TypeScript', 'Solidity', 'Python', 'HTML/CSS', 'Git', 'Vite'];
const leveling = ['Rust', 'Anchor', 'Solana Mobile Stack', 'Solana Kit / web3.js', 'Mobile Wallet Adapter'];
```

with:

```tsx
const shipping = ['React', 'TypeScript', 'JavaScript', 'C#', 'Python', 'Solidity', 'HTML/CSS', 'Git', 'Vite'];
const leveling = ['Rust', 'Anchor', 'Solana Mobile Stack', 'Solana Kit / web3.js', 'Mobile Wallet Adapter', 'Clarity', 'Cadence', 'Move', 'Go', 'C++'];
```

- [ ] **Step 6: Update `src/components/Mission.tsx` — Unity nod**

Replace the second `<p>` in `.mission-body`:

```tsx
        <p>
          I'm building in public — leveling up on Rust, Anchor, and the Solana
          Mobile Stack while shipping projects that prove I can take an idea from
          zero to deployed. If it runs on-chain and lives on a phone, that's where
          I want to be.
        </p>
```

with:

```tsx
        <p>
          I'm building in public — leveling up on Rust, Anchor, and the Solana
          Mobile Stack while shipping projects that prove I can take an idea from
          zero to deployed. I'm also exploring <strong>Unity</strong> to build games
          for the dApp Store. If it runs on-chain and lives on a phone, that's where
          I want to be.
        </p>
```

- [ ] **Step 7: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add public/solana.svg index.html src/components/Navbar.tsx src/components/Contact.tsx src/components/Stack.tsx src/components/Mission.tsx
git commit -m "feat: polish — .skr logo, Seeker favicon, Contact nav, email, honest language buckets"
```

---

### Task 2: Install Solana dependencies + Vite polyfills

**Files:**
- Modify: `package.json` / `package-lock.json` (via npm)
- Modify: `vite.config.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: installed packages; `Buffer`/`process`/`global` available in browser build.

- [ ] **Step 1: Install runtime + dev dependencies**

Run:
```bash
npm install @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana-mobile/wallet-standard-mobile @solana/spl-token --legacy-peer-deps
npm install -D vite-plugin-node-polyfills --legacy-peer-deps
```
Expected: installs succeed (peer warnings OK with `--legacy-peer-deps`).

- [ ] **Step 2: Update `vite.config.ts` (full replace)**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  base: '/dev-portfolio/',
  plugins: [
    react(),
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true },
    }),
  ],
})
```

- [ ] **Step 3: Verify build (polyfills load, no usage yet)**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json vite.config.ts
git commit -m "chore: add Solana wallet-adapter deps and Vite node polyfills"
```

---

### Task 3: Solana config (network, recipient, token registry)

**Files:**
- Create: `src/solana/config.ts`

**Interfaces:**
- Consumes: `@solana/web3.js`.
- Produces: `ACTIVE_NETWORK`, `RECIPIENT: PublicKey`, `RPC_ENDPOINT: string`, `WALLET_STANDARD_CHAIN: string`, `TokenConfig` type, `SUPPORTED_TOKENS: TokenConfig[]`, `explorerTxUrl(signature: string): string`.

- [ ] **Step 1: Create `src/solana/config.ts`**

```ts
import { clusterApiUrl, PublicKey } from '@solana/web3.js';

export type NetworkName = 'devnet' | 'mainnet-beta';

/** Flip to 'mainnet-beta' to go live. Only change needed. */
export const ACTIVE_NETWORK: NetworkName = 'devnet';

/** Public receiving address for tips / payments. */
export const RECIPIENT = new PublicKey('FHeetC3DwgnaPiePqWaGSC1PLneL4dYGtMfRiiVnmTkp');

export const RPC_ENDPOINT = clusterApiUrl(ACTIVE_NETWORK);

/** Wallet Standard chain id (mainnet-beta maps to 'solana:mainnet'). */
export const WALLET_STANDARD_CHAIN =
  ACTIVE_NETWORK === 'mainnet-beta' ? 'solana:mainnet' : 'solana:devnet';

export interface TokenConfig {
  symbol: string;
  /** null = native SOL; otherwise SPL mint address. */
  mint: string | null;
  enabled: boolean;
  note?: string;
  /** Preset tip amounts in whole tokens. */
  presets: number[];
}

const TOKENS: Record<NetworkName, TokenConfig[]> = {
  devnet: [
    { symbol: 'SOL', mint: null, enabled: true, presets: [0.1, 0.5, 1] },
    { symbol: 'USDC', mint: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU', enabled: true, presets: [5, 20, 50] },
    { symbol: 'SKR', mint: null, enabled: false, note: 'Mainnet only', presets: [100, 500, 1000] },
  ],
  'mainnet-beta': [
    { symbol: 'SOL', mint: null, enabled: true, presets: [0.1, 0.5, 1] },
    { symbol: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', enabled: true, presets: [5, 20, 50] },
    { symbol: 'SKR', mint: 'SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3', enabled: true, presets: [100, 500, 1000] },
  ],
};

export const SUPPORTED_TOKENS = TOKENS[ACTIVE_NETWORK];

const EXPLORER_SUFFIX = ACTIVE_NETWORK === 'mainnet-beta' ? '' : `?cluster=${ACTIVE_NETWORK}`;

export function explorerTxUrl(signature: string): string {
  return `https://explorer.solana.com/tx/${signature}${EXPLORER_SUFFIX}`;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/solana/config.ts
git commit -m "feat: Solana network + token registry config (devnet)"
```

---

### Task 4: Transfer builder (`pay.ts`)

**Files:**
- Create: `src/solana/pay.ts`

**Interfaces:**
- Consumes: `@solana/web3.js`, `@solana/spl-token`, `RECIPIENT` from config.
- Produces: `buildTransfer(connection: Connection, sender: PublicKey, mint: string | null, amount: number): Promise<Transaction>`.

- [ ] **Step 1: Create `src/solana/pay.ts`**

```ts
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  getAccount,
  getMint,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from '@solana/spl-token';
import { RECIPIENT } from './config';

/**
 * Build an unsigned transfer from `sender` to the fixed RECIPIENT.
 * `mint === null` => native SOL; otherwise SPL transfer (creates the
 * recipient's associated token account if it does not yet exist).
 */
export async function buildTransfer(
  connection: Connection,
  sender: PublicKey,
  mint: string | null,
  amount: number,
): Promise<Transaction> {
  const { blockhash } = await connection.getLatestBlockhash();
  const tx = new Transaction({ recentBlockhash: blockhash, feePayer: sender });

  if (mint === null) {
    const lamports = Math.round(amount * 1e9);
    tx.add(
      SystemProgram.transfer({ fromPubkey: sender, toPubkey: RECIPIENT, lamports }),
    );
    return tx;
  }

  const mintPk = new PublicKey(mint);
  const mintInfo = await getMint(connection, mintPk);
  const rawAmount = BigInt(Math.round(amount * 10 ** mintInfo.decimals));

  const senderAta = await getAssociatedTokenAddress(mintPk, sender);
  const recipientAta = await getAssociatedTokenAddress(mintPk, RECIPIENT);

  let recipientAtaExists = true;
  try {
    await getAccount(connection, recipientAta);
  } catch (err) {
    if (
      err instanceof TokenAccountNotFoundError ||
      err instanceof TokenInvalidAccountOwnerError
    ) {
      recipientAtaExists = false;
    } else {
      throw err;
    }
  }

  if (!recipientAtaExists) {
    tx.add(
      createAssociatedTokenAccountInstruction(sender, recipientAta, RECIPIENT, mintPk),
    );
  }

  tx.add(createTransferInstruction(senderAta, recipientAta, sender, rawAmount));
  return tx;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/solana/pay.ts
git commit -m "feat: SOL + SPL transfer builder with ATA handling"
```

---

### Task 5: Wallet provider + wire into main.tsx

**Files:**
- Create: `src/solana/WalletContext.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: `@solana/wallet-adapter-react`, `@solana/wallet-adapter-react-ui`, `@solana-mobile/wallet-standard-mobile`, config (`RPC_ENDPOINT`, `WALLET_STANDARD_CHAIN`).
- Produces: `WalletContext` provider component wrapping the app.

- [ ] **Step 1: Create `src/solana/WalletContext.tsx`**

```tsx
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
```

- [ ] **Step 2: Update `src/main.tsx` (wrap App)**

```tsx
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
```

- [ ] **Step 3: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS. (If the wallet-adapter packages error on React 19 types at build, report BLOCKED with the exact `tsc` output — do not silently `// @ts-ignore` broad regions.)

- [ ] **Step 4: Commit**

```bash
git add src/solana/WalletContext.tsx src/main.tsx
git commit -m "feat: wallet-adapter provider with Mobile Wallet Adapter registration"
```

---

### Task 6: PayModal + PayModalProvider

**Files:**
- Create: `src/components/PayModal.tsx`
- Create: `src/components/PayModal.css`
- Create: `src/solana/PayModalProvider.tsx`
- Modify: `src/main.tsx` (nest provider)

**Interfaces:**
- Consumes: `useConnection`, `useWallet` (`@solana/wallet-adapter-react`), `useWalletModal` (`@solana/wallet-adapter-react-ui`), `SUPPORTED_TOKENS`, `explorerTxUrl`, `TokenConfig` (config), `buildTransfer` (pay).
- Produces: `PayModalProvider` component; `usePayModal(): { openPay: () => void; closePay: () => void }`.

- [ ] **Step 1: Create `src/components/PayModal.tsx`**

```tsx
import { useEffect, useMemo, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { SUPPORTED_TOKENS, explorerTxUrl, type TokenConfig } from '../solana/config';
import { buildTransfer } from '../solana/pay';
import './PayModal.css';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
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
      setStatus({ kind: 'idle' });
      setAmount('');
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
      const tx = await buildTransfer(connection, publicKey, token.mint, value);
      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, 'confirmed');
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
              disabled={status.kind === 'sending' || !token?.enabled}
              onClick={send}
            >
              {status.kind === 'sending' ? 'Confirm in wallet…' : `Send ${amount || ''} ${symbol}`.replace(/\s+/g, ' ').trim()}
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
```

- [ ] **Step 2: Create `src/components/PayModal.css`**

```css
.pay-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(5, 5, 8, 0.7);
  backdrop-filter: blur(6px);
}

.pay-modal {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: #14141c;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  padding: 32px 28px;
  box-shadow: var(--glow);
}

.pay-close {
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--text-muted);
}

.pay-close:hover {
  color: var(--text-color);
}

.pay-title {
  font-size: 1.35rem;
  margin-bottom: 6px;
}

.pay-sub {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 22px;
}

.pay-connect {
  width: 100%;
}

.pay-tokens {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.pay-token {
  flex: 1;
  padding: 10px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-color);
  font-size: 0.85rem;
  font-weight: 600;
  transition: var(--transition);
}

.pay-token.active {
  border-color: var(--sol-purple);
  box-shadow: var(--glow);
}

.pay-token:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  font-size: 0.72rem;
}

.pay-presets {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.pay-preset {
  flex: 1;
  padding: 9px 6px;
  border-radius: 999px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  transition: var(--transition);
}

.pay-preset:hover {
  color: var(--text-color);
  border-color: var(--sol-purple);
}

.pay-amount {
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-color);
  font-family: var(--font-mono);
  font-size: 0.95rem;
}

.pay-amount:focus {
  outline: none;
  border-color: var(--sol-purple);
}

.pay-send {
  width: 100%;
}

.pay-status {
  margin-top: 16px;
  font-size: 0.88rem;
  text-align: center;
  word-break: break-word;
}

.pay-success {
  color: var(--sol-green);
}

.pay-success a {
  text-decoration: underline;
}

.pay-error {
  color: #ff6b6b;
}
```

- [ ] **Step 3: Create `src/solana/PayModalProvider.tsx`**

```tsx
import { createContext, useCallback, useContext, useState, type FC, type ReactNode } from 'react';
import PayModal from '../components/PayModal';

interface PayModalCtx {
  openPay: () => void;
  closePay: () => void;
}

const Ctx = createContext<PayModalCtx>({ openPay: () => {}, closePay: () => {} });

export const usePayModal = () => useContext(Ctx);

export const PayModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openPay = useCallback(() => setOpen(true), []);
  const closePay = useCallback(() => setOpen(false), []);
  return (
    <Ctx.Provider value={{ openPay, closePay }}>
      {children}
      <PayModal open={open} onClose={closePay} />
    </Ctx.Provider>
  );
};
```

- [ ] **Step 4: Update `src/main.tsx` — nest PayModalProvider inside WalletContext**

```tsx
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
```

- [ ] **Step 5: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/PayModal.tsx src/components/PayModal.css src/solana/PayModalProvider.tsx src/main.tsx
git commit -m "feat: pay modal (token select, presets, custom amount, tx status) + provider"
```

---

### Task 7: WalletButton + navbar integration

**Files:**
- Create: `src/components/WalletButton.tsx`
- Create: `src/components/WalletButton.css`
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `useWallet` (`@solana/wallet-adapter-react`), `useWalletModal` (`@solana/wallet-adapter-react-ui`), `usePayModal` (PayModalProvider). Reuses global `.connect-pill`.
- Produces: `WalletButton` component.

- [ ] **Step 1: Create `src/components/WalletButton.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `src/components/WalletButton.css`**

```css
.wallet-connected {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
}

.wallet-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sol-green);
  box-shadow: 0 0 10px var(--sol-green);
}
```

- [ ] **Step 3: Update `src/components/Navbar.tsx` — use WalletButton**

Add the import at the top (after the existing `import './Navbar.css';`):

```tsx
import WalletButton from './WalletButton';
```

Replace the Connect link:

```tsx
        <a href="#contact" className="connect-pill" onClick={() => setMenuOpen(false)}>Connect</a>
```

with:

```tsx
        <WalletButton />
```

- [ ] **Step 4: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/WalletButton.tsx src/components/WalletButton.css src/components/Navbar.tsx
git commit -m "feat: WalletButton — connect / connected state opens pay modal"
```

---

### Task 8: Contact "Support / Hire me" button + manual devnet verification

**Files:**
- Modify: `src/components/Contact.tsx`

**Interfaces:**
- Consumes: `usePayModal` (PayModalProvider).
- Produces: no new exports.

- [ ] **Step 1: Update `src/components/Contact.tsx` — add Support button**

Add the import after `import './Contact.css';`:

```tsx
import { usePayModal } from '../solana/PayModalProvider';
```

Change the component signature to use the hook — replace:

```tsx
const Contact = () => {
  return (
```

with:

```tsx
const Contact = () => {
  const { openPay } = usePayModal();
  return (
```

Then replace the `.contact-actions` block:

```tsx
        <div className="contact-actions">
          <a href="mailto:0xmattyiceee@gmail.com" className="btn btn-primary">Say gm</a>
          <a
            href="https://github.com/0xmattyiceee"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            GitHub
          </a>
        </div>
```

with (adds Support / Hire me):

```tsx
        <div className="contact-actions">
          <button type="button" className="btn btn-primary" onClick={openPay}>
            Support / Hire me
          </button>
          <a href="mailto:0xmattyiceee@gmail.com" className="btn btn-secondary">Say gm</a>
          <a
            href="https://github.com/0xmattyiceee"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            GitHub
          </a>
        </div>
```

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 3: Manual devnet verification (report results in the task report)**

Run `npm run dev` and, using a browser wallet set to **devnet** (e.g. Phantom → Settings → Developer → Testnet mode → Devnet) with some devnet SOL (airdrop via `solana airdrop 1 <addr> --url devnet` or a faucet):
1. Click **Connect Wallet** in the navbar → wallet-select modal appears → connect. Button shows the truncated address.
2. Click the connected button → PayModal opens. Confirm **SKR shows disabled** with "Mainnet only".
3. Select **SOL**, click a preset (or type a custom amount), click **Send** → approve in wallet → status goes sending → success with a working **Explorer (devnet)** link.
4. Select **USDC**, send a small amount → success (first send may also create the recipient ATA).
5. Open the same modal from the Contact **Support / Hire me** button → confirm it's the same flow.

Record what was actually tested and the outcomes. If a wallet isn't available in the environment, note that these steps are left for the user to run and confirm the build/lint pass plus that the UI renders (modal opens, tokens/presets show, SKR disabled).

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: Contact 'Support / Hire me' button opens pay modal"
```

---

## Go-live (after devnet verification, on user approval)

To switch to mainnet: in `src/solana/config.ts` set `ACTIVE_NETWORK = 'mainnet-beta'` (enables real SKR + mainnet USDC, real funds). Rebuild and redeploy. Consider a dedicated RPC (Helius/QuickNode/Alchemy) instead of the public endpoint for reliability. Do **not** flip to mainnet without explicit user confirmation.

## Self-Review

- **Spec coverage:** polish (T1), deps+polyfills (T2), config/recipient/tokens (T3), transfer builder incl. ATA + on-chain decimals (T4), provider + MWA registration (T5), pay modal with token/presets/custom/status/Explorer + SKR-disabled-on-devnet (T6), WalletButton connect/connected (T7), Contact Support button + devnet test (T8), go-live note. All spec sections mapped.
- **Placeholders:** none — every step has full code.
- **Type consistency:** `buildTransfer(connection, sender, mint, amount)` signature identical in T4 and its T6 call site; `usePayModal()` returns `{ openPay, closePay }` used in T7/T8; `TokenConfig`/`SUPPORTED_TOKENS`/`explorerTxUrl` from T3 used in T6; `WalletContext`/`PayModalProvider` nesting consistent across T5/T6.
