/**
 * useTokens — localStorage-based token system for "Earn Tokens → Real Money"
 *
 * Token rules:
 * - Each ad watched gives 1 token
 * - 25 tokens required to withdraw
 * - Each withdrawal gives ₹1.25 and deducts 25 tokens
 * - No daily limit on ads
 * - Balance never goes negative
 */

import { useCallback, useEffect, useState } from "react";
import { useInternetIdentity } from "./useInternetIdentity";

export interface TokenTransaction {
  id: string;
  type: "earned" | "withdrawn";
  amount: number; // tokens
  rupeesAmount?: number; // only for withdrawals
  timestamp: number;
  description: string;
}

export interface TokenStore {
  balance: number;
  totalEarned: number;
  totalWithdrawn: number;
  transactions: TokenTransaction[];
}

const TOKENS_PER_AD = 1;
const TOKENS_FOR_WITHDRAWAL = 25;
const RUPEES_PER_WITHDRAWAL = 1.25;

function getStorageKey(principalStr: string) {
  return `kl_tokens_${principalStr}`;
}

function loadStore(key: string): TokenStore {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as TokenStore;
  } catch {
    // ignore
  }
  return { balance: 0, totalEarned: 0, totalWithdrawn: 0, transactions: [] };
}

function saveStore(key: string, store: TokenStore) {
  try {
    localStorage.setItem(key, JSON.stringify(store));
  } catch {
    // ignore
  }
}

export function useTokens() {
  const { identity } = useInternetIdentity();
  const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
  const storageKey = getStorageKey(principalStr);

  const [store, setStore] = useState<TokenStore>(() => loadStore(storageKey));

  // Reload if identity changes
  useEffect(() => {
    setStore(loadStore(storageKey));
  }, [storageKey]);

  const persist = useCallback(
    (updated: TokenStore) => {
      saveStore(storageKey, updated);
      setStore(updated);
    },
    [storageKey],
  );

  /** Call when user successfully watches an ad */
  const earnToken = useCallback(() => {
    const tx: TokenTransaction = {
      id: `earn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type: "earned",
      amount: TOKENS_PER_AD,
      timestamp: Date.now(),
      description: "Ad watched",
    };
    persist({
      ...store,
      balance: store.balance + TOKENS_PER_AD,
      totalEarned: store.totalEarned + TOKENS_PER_AD,
      transactions: [tx, ...store.transactions],
    });
  }, [store, persist]);

  /**
   * Call when user watches the rewarded withdrawal ad.
   * Returns true on success, false if insufficient balance.
   */
  const withdrawTokens = useCallback((): boolean => {
    if (store.balance < TOKENS_FOR_WITHDRAWAL) return false;

    const tx: TokenTransaction = {
      id: `withdraw_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type: "withdrawn",
      amount: TOKENS_FOR_WITHDRAWAL,
      rupeesAmount: RUPEES_PER_WITHDRAWAL,
      timestamp: Date.now(),
      description: `Withdrawn ${TOKENS_FOR_WITHDRAWAL} tokens → ₹${RUPEES_PER_WITHDRAWAL}`,
    };
    const newBalance = Math.max(0, store.balance - TOKENS_FOR_WITHDRAWAL);
    persist({
      ...store,
      balance: newBalance,
      totalWithdrawn: store.totalWithdrawn + TOKENS_FOR_WITHDRAWAL,
      transactions: [tx, ...store.transactions],
    });
    return true;
  }, [store, persist]);

  const canWithdraw = store.balance >= TOKENS_FOR_WITHDRAWAL;
  const progressPct = Math.min(
    100,
    Math.round((store.balance / TOKENS_FOR_WITHDRAWAL) * 100),
  );
  const tokensForNextWithdrawal = Math.min(
    store.balance,
    TOKENS_FOR_WITHDRAWAL,
  );

  return {
    balance: store.balance,
    totalEarned: store.totalEarned,
    totalWithdrawn: store.totalWithdrawn,
    transactions: store.transactions,
    canWithdraw,
    progressPct,
    tokensForNextWithdrawal,
    tokensNeeded: TOKENS_FOR_WITHDRAWAL - tokensForNextWithdrawal,
    TOKENS_FOR_WITHDRAWAL,
    RUPEES_PER_WITHDRAWAL,
    earnToken,
    withdrawTokens,
  };
}
