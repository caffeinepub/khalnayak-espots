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
  allTime: {
    totalAdsWatched: number;
    totalTokensDistributed: number;
    totalWithdrawals: number;
    totalRupeesPaid: number;
  };
}

export interface AdDayStats {
  date: string; // YYYY-MM-DD
  manualAdsWatched: number;
  tournamentAdsWatched: number;
  withdrawalAdsWatched: number;
}

const TOKENS_PER_AD = 1;
const TOKENS_FOR_WITHDRAWAL = 25;
const RUPEES_PER_WITHDRAWAL = 1.25;

function getStorageKey(principalStr: string) {
  return `kl_tokens_${principalStr}`;
}

function getAdStatsKey(principalStr: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `kl_adstats_${principalStr}_${today}`;
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

function loadStore(key: string): TokenStore {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as TokenStore;
      // Migrate: ensure allTime exists
      if (!parsed.allTime) {
        parsed.allTime = {
          totalAdsWatched: parsed.totalEarned ?? 0,
          totalTokensDistributed: parsed.totalEarned ?? 0,
          totalWithdrawals: Math.floor(
            (parsed.totalWithdrawn ?? 0) / TOKENS_FOR_WITHDRAWAL,
          ),
          totalRupeesPaid:
            Math.floor((parsed.totalWithdrawn ?? 0) / TOKENS_FOR_WITHDRAWAL) *
            RUPEES_PER_WITHDRAWAL,
        };
      }
      return parsed;
    }
  } catch {
    // ignore
  }
  return {
    balance: 0,
    totalEarned: 0,
    totalWithdrawn: 0,
    transactions: [],
    allTime: {
      totalAdsWatched: 0,
      totalTokensDistributed: 0,
      totalWithdrawals: 0,
      totalRupeesPaid: 0,
    },
  };
}

function saveStore(key: string, store: TokenStore) {
  try {
    localStorage.setItem(key, JSON.stringify(store));
  } catch {
    // ignore
  }
}

function loadAdStats(key: string): AdDayStats {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as AdDayStats;
  } catch {
    // ignore
  }
  return {
    date: getTodayStr(),
    manualAdsWatched: 0,
    tournamentAdsWatched: 0,
    withdrawalAdsWatched: 0,
  };
}

function saveAdStats(key: string, stats: AdDayStats) {
  try {
    localStorage.setItem(key, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

export function useTokens() {
  const { identity } = useInternetIdentity();
  const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
  const storageKey = getStorageKey(principalStr);

  const [store, setStore] = useState<TokenStore>(() => loadStore(storageKey));
  const [adStats, setAdStatsState] = useState<AdDayStats>(() =>
    loadAdStats(getAdStatsKey(principalStr)),
  );

  // Reload if identity changes
  useEffect(() => {
    setStore(loadStore(storageKey));
    setAdStatsState(loadAdStats(getAdStatsKey(principalStr)));
  }, [storageKey, principalStr]);

  const persist = useCallback(
    (updated: TokenStore) => {
      saveStore(storageKey, updated);
      setStore(updated);
    },
    [storageKey],
  );

  const persistAdStats = useCallback(
    (updated: AdDayStats) => {
      saveAdStats(getAdStatsKey(principalStr), updated);
      setAdStatsState(updated);
    },
    [principalStr],
  );

  /** Call when user successfully watches a manual ad */
  const earnToken = useCallback(() => {
    const tx: TokenTransaction = {
      id: `earn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type: "earned",
      amount: TOKENS_PER_AD,
      timestamp: Date.now(),
      description: "Ad watched",
    };
    const newAllTime = {
      ...store.allTime,
      totalAdsWatched: store.allTime.totalAdsWatched + 1,
      totalTokensDistributed:
        store.allTime.totalTokensDistributed + TOKENS_PER_AD,
    };
    persist({
      ...store,
      balance: store.balance + TOKENS_PER_AD,
      totalEarned: store.totalEarned + TOKENS_PER_AD,
      transactions: [tx, ...store.transactions],
      allTime: newAllTime,
    });
    // Update daily stats
    const current = loadAdStats(getAdStatsKey(principalStr));
    persistAdStats({
      ...current,
      date: getTodayStr(),
      manualAdsWatched: current.manualAdsWatched + 1,
    });
  }, [store, persist, persistAdStats, principalStr]);

  /**
   * Call when user watches a tournament join ad.
   * Awards +1 token with description "Tournament Join: {name}"
   */
  const earnTokenFromTournament = useCallback(
    (tournamentName: string) => {
      const tx: TokenTransaction = {
        id: `earn_tourney_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        type: "earned",
        amount: TOKENS_PER_AD,
        timestamp: Date.now(),
        description: `Tournament Join: ${tournamentName}`,
      };
      const newAllTime = {
        ...store.allTime,
        totalAdsWatched: store.allTime.totalAdsWatched + 1,
        totalTokensDistributed:
          store.allTime.totalTokensDistributed + TOKENS_PER_AD,
      };
      persist({
        ...store,
        balance: store.balance + TOKENS_PER_AD,
        totalEarned: store.totalEarned + TOKENS_PER_AD,
        transactions: [tx, ...store.transactions],
        allTime: newAllTime,
      });
      // Update daily stats
      const current = loadAdStats(getAdStatsKey(principalStr));
      persistAdStats({
        ...current,
        date: getTodayStr(),
        tournamentAdsWatched: current.tournamentAdsWatched + 1,
      });
    },
    [store, persist, persistAdStats, principalStr],
  );

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
    const newAllTime = {
      ...store.allTime,
      totalAdsWatched: store.allTime.totalAdsWatched + 1,
      totalWithdrawals: store.allTime.totalWithdrawals + 1,
      totalRupeesPaid: store.allTime.totalRupeesPaid + RUPEES_PER_WITHDRAWAL,
    };
    persist({
      ...store,
      balance: newBalance,
      totalWithdrawn: store.totalWithdrawn + TOKENS_FOR_WITHDRAWAL,
      transactions: [tx, ...store.transactions],
      allTime: newAllTime,
    });
    // Update daily stats
    const current = loadAdStats(getAdStatsKey(principalStr));
    persistAdStats({
      ...current,
      date: getTodayStr(),
      withdrawalAdsWatched: current.withdrawalAdsWatched + 1,
    });
    return true;
  }, [store, persist, persistAdStats, principalStr]);

  const canWithdraw = store.balance >= TOKENS_FOR_WITHDRAWAL;
  const progressPct = Math.min(
    100,
    Math.round((store.balance / TOKENS_FOR_WITHDRAWAL) * 100),
  );
  const tokensForNextWithdrawal = Math.min(
    store.balance,
    TOKENS_FOR_WITHDRAWAL,
  );

  // Compute derived ad stats for UI
  const derivedAdStats = {
    manualAdsToday: adStats.manualAdsWatched,
    tournamentAdsToday: adStats.tournamentAdsWatched,
    withdrawalAdsToday: adStats.withdrawalAdsWatched,
    totalAdsToday:
      adStats.manualAdsWatched +
      adStats.tournamentAdsWatched +
      adStats.withdrawalAdsWatched,
    totalTokensEarnedToday:
      adStats.manualAdsWatched + adStats.tournamentAdsWatched,
  };

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
    earnTokenFromTournament,
    withdrawTokens,
    adStats: derivedAdStats,
    allTime: store.allTime,
  };
}
