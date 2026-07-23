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

export interface BuiltTransfer {
  transaction: Transaction;
  blockhash: string;
  lastValidBlockHeight: number;
}

/**
 * Build an unsigned transfer from `sender` to the fixed RECIPIENT.
 * `mint === null` => native SOL; otherwise SPL transfer (creates the
 * recipient's associated token account if it does not yet exist).
 *
 * The recent blockhash is fetched LAST — after the mint/ATA lookups — so the
 * transaction carries the freshest possible blockhash into the (potentially
 * slow) in-wallet approval, and the blockhash + lastValidBlockHeight are
 * returned so the caller can confirm with the reliable, non-deprecated form.
 */
export async function buildTransfer(
  connection: Connection,
  sender: PublicKey,
  mint: string | null,
  amount: number,
): Promise<BuiltTransfer> {
  const tx = new Transaction();

  if (mint === null) {
    const lamports = Math.round(amount * 1e9);
    tx.add(
      SystemProgram.transfer({ fromPubkey: sender, toPubkey: RECIPIENT, lamports }),
    );
  } else {
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
  }

  tx.feePayer = sender;
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;

  return { transaction: tx, blockhash, lastValidBlockHeight };
}
