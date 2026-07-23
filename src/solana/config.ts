import { clusterApiUrl, PublicKey } from '@solana/web3.js';

export type NetworkName = 'devnet' | 'mainnet-beta';

/** Flip between 'devnet' and 'mainnet-beta' to switch networks. */
export const ACTIVE_NETWORK: NetworkName = 'mainnet-beta';

/** Public receiving address for tips / payments. */
export const RECIPIENT = new PublicKey('FHeetC3DwgnaPiePqWaGSC1PLneL4dYGtMfRiiVnmTkp');

/**
 * Optional Helius RPC key (set VITE_HELIUS_API_KEY in .env.local). When present,
 * we use the Helius endpoint for the active network; otherwise we fall back to
 * the rate-limited public cluster RPC.
 *
 * SECURITY: this is a client-side app, so the resolved RPC URL — including the
 * key — is visible in the deployed bundle and network requests. Restrict the
 * key to this site's origin in the Helius dashboard so it can't be reused
 * elsewhere. The key itself lives only in .env.local (gitignored), never in
 * committed source.
 */
const HELIUS_API_KEY = import.meta.env.VITE_HELIUS_API_KEY;

function resolveRpcEndpoint(network: NetworkName): string {
  if (HELIUS_API_KEY) {
    const subdomain = (network as NetworkName) === 'mainnet-beta' ? 'mainnet' : 'devnet';
    return `https://${subdomain}.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
  }
  return clusterApiUrl(network);
}

export const RPC_ENDPOINT = resolveRpcEndpoint(ACTIVE_NETWORK);

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
