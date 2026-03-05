/**
 * useReferral — localStorage-based referral system for Khalnayak Espots.
 *
 * Referral Rules:
 * - Referrer earns ₹2 per successful referral
 * - New user must register with a valid referral code
 * - Same device fingerprint cannot be used multiple times by same referrer
 * - A user can only be referred once
 */

import { useEffect, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface ReferralRecord {
  id: string;
  referrerId: string;
  referrerCode: string;
  newUserId: string;
  newUserName: string;
  deviceFingerprint: string;
  timestamp: number;
  status: "success" | "fraud";
  rewardAmount: number;
}

export interface ReferralStats {
  totalReferrals: number;
  totalEarnings: number;
  fraudAttempts: number;
  referrals: ReferralRecord[];
}

export interface LocalTransaction {
  id: string;
  type: "referral_bonus";
  amount: number;
  description: string;
  timestamp: number;
}

// ─── Storage Keys ──────────────────────────────────────────────────────────────

export const REFERRAL_STORAGE_KEY = "kle_referrals";
const REFERRAL_EARNINGS_PREFIX = "kle_referral_earnings_";
const LOCAL_TRANSACTIONS_PREFIX = "kle_local_transactions_";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function loadReferrals(): ReferralRecord[] {
  try {
    const raw = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ReferralRecord[];
  } catch {
    return [];
  }
}

function saveReferrals(records: ReferralRecord[]): void {
  localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(records));
}

/**
 * Generates a deterministic referral code from userId.
 * Same user always gets the same code.
 */
export function generateReferralCode(userId: string): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // Create a deterministic seed from userId
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const ch = userId.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash |= 0; // Convert to 32-bit integer
  }
  // Build 6-char code from hash
  let code = "REF";
  let seed = Math.abs(hash);
  for (let i = 0; i < 6; i++) {
    code += chars[seed % chars.length];
    seed = Math.floor(seed / chars.length) + (seed % 7) * 31 + i * 17;
    seed = Math.abs(seed);
  }
  return code;
}

/**
 * Gets device fingerprint for fraud detection.
 * Returns a simple hash of browser characteristics.
 */
export function getDeviceFingerprint(): string {
  const raw = [
    navigator.userAgent,
    screen.width.toString(),
    screen.height.toString(),
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join("|");

  // Simple string hash
  let hash = 5381;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash * 33) ^ raw.charCodeAt(i);
  }
  return `fp_${Math.abs(hash).toString(36)}`;
}

/**
 * Finds referrerId by referral code. Searches kle_users.
 */
export function getReferralByCode(code: string): string | null {
  try {
    const raw = localStorage.getItem("kle_users");
    if (!raw) return null;
    const users = JSON.parse(raw) as Array<{
      id: string;
      referralCode?: string;
    }>;
    const user = users.find(
      (u) =>
        u.referralCode && u.referralCode.toUpperCase() === code.toUpperCase(),
    );
    return user?.id ?? null;
  } catch {
    return null;
  }
}

/**
 * Gets all referrals made by a specific referrer.
 */
export function getReferralsByReferrer(referrerId: string): ReferralRecord[] {
  return loadReferrals().filter((r) => r.referrerId === referrerId);
}

/**
 * Credits ₹2 referral earning to referrer's local earnings store.
 */
function creditReferralEarning(referrerId: string, amount: number): void {
  // Update earnings tracker
  const earningsKey = `${REFERRAL_EARNINGS_PREFIX}${referrerId}`;
  const current =
    Number.parseFloat(localStorage.getItem(earningsKey) ?? "0") || 0;
  localStorage.setItem(earningsKey, (current + amount).toFixed(2));

  // Add transaction entry
  const txKey = `${LOCAL_TRANSACTIONS_PREFIX}${referrerId}`;
  let transactions: LocalTransaction[] = [];
  try {
    const raw = localStorage.getItem(txKey);
    if (raw) transactions = JSON.parse(raw) as LocalTransaction[];
  } catch {
    // ignore
  }
  const tx: LocalTransaction = {
    id: `ref_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    type: "referral_bonus",
    amount,
    description: "Referral bonus - friend joined",
    timestamp: Date.now(),
  };
  transactions.unshift(tx);
  localStorage.setItem(txKey, JSON.stringify(transactions));
}

/**
 * Main referral processing function.
 * Call after a new user successfully registers with a referral code.
 */
export function processReferral(
  newUserId: string,
  newUserName: string,
  referralCode: string,
): { success: boolean; error?: string } {
  const code = referralCode.toUpperCase().trim();

  // Find referrer
  const referrerId = getReferralByCode(code);
  if (!referrerId) {
    return { success: false, error: "Invalid referral code." };
  }

  // Can't refer yourself
  if (referrerId === newUserId) {
    return { success: false, error: "You cannot refer yourself." };
  }

  const existingReferrals = loadReferrals();

  // Check: this new user hasn't already been referred
  const alreadyReferred = existingReferrals.some(
    (r) => r.newUserId === newUserId && r.status === "success",
  );
  if (alreadyReferred) {
    return {
      success: false,
      error: "This user has already been referred previously.",
    };
  }

  // Check device fingerprint fraud
  const fingerprint = getDeviceFingerprint();
  const sameDeviceReferral = existingReferrals.find(
    (r) =>
      r.referrerId === referrerId &&
      r.deviceFingerprint === fingerprint &&
      r.status === "success",
  );

  if (sameDeviceReferral) {
    // Log fraud attempt
    const fraudRecord: ReferralRecord = {
      id: `ref_fraud_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      referrerId,
      referrerCode: code,
      newUserId,
      newUserName,
      deviceFingerprint: fingerprint,
      timestamp: Date.now(),
      status: "fraud",
      rewardAmount: 0,
    };
    existingReferrals.push(fraudRecord);
    saveReferrals(existingReferrals);
    return {
      success: false,
      error:
        "Registration blocked: Same device detected. Multiple accounts from same device are not allowed.",
    };
  }

  // All checks passed — create success record
  const record: ReferralRecord = {
    id: `ref_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    referrerId,
    referrerCode: code,
    newUserId,
    newUserName,
    deviceFingerprint: fingerprint,
    timestamp: Date.now(),
    status: "success",
    rewardAmount: 2,
  };

  existingReferrals.push(record);
  saveReferrals(existingReferrals);

  // Credit ₹2 to referrer
  creditReferralEarning(referrerId, 2);

  return { success: true };
}

/**
 * Returns admin-level stats across all referrals.
 */
export function getReferralStats(): {
  totalReferrals: number;
  totalEarnings: number;
  fraudAttempts: number;
  allReferrals: ReferralRecord[];
} {
  const all = loadReferrals();
  const successful = all.filter((r) => r.status === "success");
  const fraud = all.filter((r) => r.status === "fraud");
  return {
    totalReferrals: successful.length,
    totalEarnings: successful.reduce((sum, r) => sum + r.rewardAmount, 0),
    fraudAttempts: fraud.length,
    allReferrals: [...all].sort((a, b) => b.timestamp - a.timestamp),
  };
}

/**
 * Returns stats for a specific referrer (for profile page).
 */
export function getUserReferralStats(referrerId: string): ReferralStats {
  const all = loadReferrals().filter((r) => r.referrerId === referrerId);
  const successful = all.filter((r) => r.status === "success");
  const fraud = all.filter((r) => r.status === "fraud");
  return {
    totalReferrals: successful.length,
    totalEarnings: successful.reduce((sum, r) => sum + r.rewardAmount, 0),
    fraudAttempts: fraud.length,
    referrals: [...all].sort((a, b) => b.timestamp - a.timestamp),
  };
}

/**
 * Gets total referral earnings for a user from localStorage.
 */
export function getReferralWalletBalance(userId: string): number {
  const key = `${REFERRAL_EARNINGS_PREFIX}${userId}`;
  return Number.parseFloat(localStorage.getItem(key) ?? "0") || 0;
}

/**
 * Returns referral transactions for a user.
 */
export function getReferralTransactions(userId: string): LocalTransaction[] {
  const key = `${LOCAL_TRANSACTIONS_PREFIX}${userId}`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw) as LocalTransaction[];
  } catch {
    return [];
  }
}

// ─── React Hook ────────────────────────────────────────────────────────────────

/**
 * Reactive hook that returns current referral balance for a user.
 * Updates whenever localStorage changes.
 */
export function useReferralBalance(userId: string): number {
  const [balance, setBalance] = useState<number>(() =>
    userId ? getReferralWalletBalance(userId) : 0,
  );

  useEffect(() => {
    if (!userId) {
      setBalance(0);
      return;
    }
    // Update on mount and when userId changes
    setBalance(getReferralWalletBalance(userId));

    // Listen for storage events (cross-tab)
    const handler = (e: StorageEvent) => {
      if (e.key === `${REFERRAL_EARNINGS_PREFIX}${userId}`) {
        setBalance(getReferralWalletBalance(userId));
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [userId]);

  return balance;
}
