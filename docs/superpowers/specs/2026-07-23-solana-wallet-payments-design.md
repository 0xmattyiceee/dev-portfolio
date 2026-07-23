# Solana Wallet Payments + Polish — Design

**Date:** 2026-07-23
**Owner:** `0xmattyic333.skr`
**Status:** Approved design → ready for implementation plan
**Branch:** feat/solana-payments

## Goal

Add two things to the Solana-mobile portfolio:

1. **Polish fixes** — correct handle, Seeker favicon, Contact nav link, email, and an
   expanded (honest) language list.
2. **Solana wallet payments** — visitors connect their Seeker vault or a browser
   wallet and send tips or pay for freelance/contract work in SOL, USDC, or SKR.

The portfolio is **devnet-wired first** so the full flow can be tested with real
transactions safely, then flipped to mainnet by changing one config value.

## Part A — Polish fixes

- **Navbar logo:** `mattyice.skr` → **`0xmattyic333.skr`** (the `.skr` keeps the gradient).
- **Favicon:** replace the Vite SVG with a self-made **Solana gradient mark**
  (`public/solana.svg`), referenced from `index.html`. No dependency.
- **Navbar links:** add **Contact** → `#contact` (Mission · Stack · Work · Contact).
- **Contact email:** `abc0xmattyic333@gmail.com` → **`0xmattyiceee@gmail.com`**.
- **Stack languages (honest split):**
  - *Shipping with:* React, TypeScript, **JavaScript**, **C#**, Python, Solidity, HTML/CSS, Git, Vite.
    (JavaScript and C# are real — C# via hands-on Unity work.)
  - *Leveling up:* Rust, Anchor, Solana Mobile Stack, Solana Kit / web3.js, Mobile
    Wallet Adapter, **Clarity, Cadence, Move, Go, C++**.
  - **Mission copy** gains a brief nod to building **Unity games for the dApp Store**.

## Part B — Wallet payments

### Dependencies (new)

- `@solana/web3.js` — connection, transactions.
- `@solana/wallet-adapter-base`, `@solana/wallet-adapter-react`,
  `@solana/wallet-adapter-react-ui` — provider + wallet-select modal.
- `@solana-mobile/wallet-standard-mobile` — `registerMwa()` for the Seeker vault.
- `@solana/spl-token` — USDC/SKR transfers + ATA handling.
- `vite-plugin-node-polyfills` (dev) — provides `Buffer`/`process`/`global` that
  web3.js and spl-token need in the browser.
- **Install note:** wallet-adapter packages declare React ≤18 peers; install with
  `npm install <pkgs> --legacy-peer-deps` (React 19 is runtime-compatible).

### Configuration — `src/solana/config.ts`

Single source of truth. Flipping devnet→mainnet is a one-line `ACTIVE_NETWORK` change.

- `ACTIVE_NETWORK: 'devnet' | 'mainnet-beta'` (start: `'devnet'`).
- `RECIPIENT = 'FHeetC3DwgnaPiePqWaGSC1PLneL4dYGtMfRiiVnmTkp'` (public receiving address).
- Per-network **token registry** (array of `{ symbol, mint | null, enabled, note? }`):
  - **SOL** — native (no mint), enabled on both networks.
  - **USDC** — devnet mint `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`;
    mainnet mint `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`; enabled on both.
  - **SKR** — mainnet mint `SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3`, enabled;
    on devnet `mint: null, enabled: false, note: 'Mainnet only'` (SKR has no devnet
    token). The UI shows SKR disabled with the note on devnet, active on mainnet.
- RPC endpoint: `clusterApiUrl(ACTIVE_NETWORK)` (public). Production mainnet should
  later use a dedicated RPC (Helius/QuickNode) — documented as a follow-up, not built.
- SPL token **decimals are fetched on-chain** via `getMint` at send time (never hardcoded).

### Provider — `src/solana/WalletContext.tsx`

- Calls `registerMwa({...})` once at module load (appIdentity from `window.location`,
  `chains: ['solana:<network>']`) so the Seeker vault appears in the wallet list.
- Wraps children in `ConnectionProvider(endpoint)` → `WalletProvider(wallets=[], autoConnect)`
  → `WalletModalProvider`. Empty `wallets` array is correct: Wallet Standard
  auto-registers Phantom/Solflare/Backpack, and `registerMwa` adds MWA.
- Imports `@solana/wallet-adapter-react-ui/styles.css`.

### UI components

- **`src/components/WalletButton.tsx`** — replaces the static Connect link in the
  navbar. Not connected → "Connect Wallet" (opens the wallet-select modal via
  `useWalletModal().setVisible(true)`). Connected → shows a truncated address and
  opens the **PayModal**. On-brand styling (reuses `.connect-pill`).
- **`src/components/PayModal.tsx` + `.css`** — the tip/pay dialog:
  - Token selector (SOL / USDC / SKR; disabled tokens greyed with their note).
  - Preset tip buttons (e.g. `0.1 / 0.5 / 1 SOL`, adapting label to selected token)
    **plus** a custom-amount input.
  - "Send" builds the transfer:
    - **SOL:** `SystemProgram.transfer` (amount × 1e9 lamports).
    - **SPL (USDC/SKR):** resolve sender + recipient ATAs
      (`getAssociatedTokenAddress`); if the recipient ATA is missing, prepend
      `createAssociatedTokenAccountInstruction` (payer = sender); then
      `createTransferInstruction` with `amount × 10^decimals` (decimals from `getMint`).
  - Sends via `sendTransaction(tx, connection)`, then confirms; shows pending →
    success (with a **Solana Explorer** link including `?cluster=` for devnet) → or a
    readable error. Rejections and insufficient funds are handled gracefully.
  - Modal closes on backdrop click / Esc; no auto-dismiss on success (user reads the link).
- **Contact section** gains a **"Support / Hire me"** button that opens the same PayModal.

### Wiring

- `src/main.tsx` (or `App.tsx`) wraps the tree in `WalletContext`.
- `vite.config.ts` adds `nodePolyfills()`.
- Navbar swaps the static Connect `<a>` for `<WalletButton />`.

## Safety & honesty

- **No funds are moved by the app itself.** A transfer executes only when a visitor
  approves it in their own wallet. The recipient address is a fixed, public destination.
- SKR is honestly disabled on devnet (no devnet token exists); enabled on mainnet flip.
- No private keys, seed phrases, or secrets anywhere in code or config.

## Non-goals (YAGNI)

- No backend, invoices database, or payment receipts/emails.
- No swap/on-ramp; visitors pay with tokens they already hold.
- No dedicated RPC provider integration yet (public RPC; documented follow-up).
- No auto-resolution of `.skr` → address (recipient is a hardcoded pubkey).

## Success criteria

- App builds (`npm run build`) and lints (`npm run lint`) with the new deps + polyfills.
- On devnet: connecting a browser wallet and sending **SOL** and **devnet-USDC** to
  the recipient produces confirmed transactions with working Explorer links.
- SKR appears disabled ("Mainnet only") on devnet.
- Polish items all present: `0xmattyic333.skr` logo, Seeker favicon, Contact nav link,
  updated email, expanded honest language buckets.
- Flipping `ACTIVE_NETWORK` to `'mainnet-beta'` is the only change needed to go live.
