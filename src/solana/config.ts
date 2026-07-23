import { clusterApiUrl, PublicKey } from '@solana/web3.js';

export type NetworkName = 'devnet' | 'mainnet-beta';

/** Flip to 'mainnet-beta' to go live. Only change needed. */
export const ACTIVE_NETWORK: NetworkName = 'devnet';

/** Public receiving address for tips / payments. */
export const RECIPIENT = new PublicKey('FHeetC3DwgnaPiePqWaGSC1PLneL4dYGtMfRiiVnmTkp');

export const RPC_ENDPOINT = clusterApiUrl(ACTIVE_NETWORK);

/** Wallet Standard chain id (mainnet-beta maps to 'solana:mainnet'). */
export const WALLET_STANDARD_CHAIN =
  (ACTIVE_NETWORK as NetworkName) === 'mainnet-beta' ? 'solana:mainnet' : 'solana:devnet';

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

const EXPLORER_SUFFIX = (ACTIVE_NETWORK as NetworkName) === 'mainnet-beta' ? '' : `?cluster=${ACTIVE_NETWORK}`;

export function explorerTxUrl(signature: string): string {
  return `https://explorer.solana.com/tx/${signature}${EXPLORER_SUFFIX}`;
}
