import { c as createLucideIcon } from "./index-VIWjWtVa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const REFERRAL_STORAGE_KEY = "kle_referrals";
const REFERRAL_EARNINGS_PREFIX = "kle_referral_earnings_";
const LOCAL_TRANSACTIONS_PREFIX = "kle_local_transactions_";
function loadReferrals() {
  try {
    const raw = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveReferrals(records) {
  localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(records));
}
function generateReferralCode(userId) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const ch = userId.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash |= 0;
  }
  let code = "REF";
  let seed = Math.abs(hash);
  for (let i = 0; i < 6; i++) {
    code += chars[seed % chars.length];
    seed = Math.floor(seed / chars.length) + seed % 7 * 31 + i * 17;
    seed = Math.abs(seed);
  }
  return code;
}
function getDeviceFingerprint() {
  const raw = [
    navigator.userAgent,
    screen.width.toString(),
    screen.height.toString(),
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ].join("|");
  let hash = 5381;
  for (let i = 0; i < raw.length; i++) {
    hash = hash * 33 ^ raw.charCodeAt(i);
  }
  return `fp_${Math.abs(hash).toString(36)}`;
}
function getReferralByCode(code) {
  try {
    const raw = localStorage.getItem("kle_users");
    if (!raw) return null;
    const users = JSON.parse(raw);
    const user = users.find(
      (u) => u.referralCode && u.referralCode.toUpperCase() === code.toUpperCase()
    );
    return (user == null ? void 0 : user.id) ?? null;
  } catch {
    return null;
  }
}
function creditReferralEarning(referrerId, amount) {
  const earningsKey = `${REFERRAL_EARNINGS_PREFIX}${referrerId}`;
  const current = Number.parseFloat(localStorage.getItem(earningsKey) ?? "0") || 0;
  localStorage.setItem(earningsKey, (current + amount).toFixed(2));
  const txKey = `${LOCAL_TRANSACTIONS_PREFIX}${referrerId}`;
  let transactions = [];
  try {
    const raw = localStorage.getItem(txKey);
    if (raw) transactions = JSON.parse(raw);
  } catch {
  }
  const tx = {
    id: `ref_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    type: "referral_bonus",
    amount,
    description: "Referral bonus - friend joined",
    timestamp: Date.now()
  };
  transactions.unshift(tx);
  localStorage.setItem(txKey, JSON.stringify(transactions));
}
function processReferral(newUserId, newUserName, referralCode) {
  const code = referralCode.toUpperCase().trim();
  const referrerId = getReferralByCode(code);
  if (!referrerId) {
    return { success: false, error: "Invalid referral code." };
  }
  if (referrerId === newUserId) {
    return { success: false, error: "You cannot refer yourself." };
  }
  const existingReferrals = loadReferrals();
  const alreadyReferred = existingReferrals.some(
    (r) => r.newUserId === newUserId && r.status === "success"
  );
  if (alreadyReferred) {
    return {
      success: false,
      error: "This user has already been referred previously."
    };
  }
  const fingerprint = getDeviceFingerprint();
  const sameDeviceReferral = existingReferrals.find(
    (r) => r.referrerId === referrerId && r.deviceFingerprint === fingerprint && r.status === "success"
  );
  if (sameDeviceReferral) {
    const fraudRecord = {
      id: `ref_fraud_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      referrerId,
      referrerCode: code,
      newUserId,
      newUserName,
      deviceFingerprint: fingerprint,
      timestamp: Date.now(),
      status: "fraud",
      rewardAmount: 0
    };
    existingReferrals.push(fraudRecord);
    saveReferrals(existingReferrals);
    return {
      success: false,
      error: "Registration blocked: Same device detected. Multiple accounts from same device are not allowed."
    };
  }
  const record = {
    id: `ref_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    referrerId,
    referrerCode: code,
    newUserId,
    newUserName,
    deviceFingerprint: fingerprint,
    timestamp: Date.now(),
    status: "success",
    rewardAmount: 2
  };
  existingReferrals.push(record);
  saveReferrals(existingReferrals);
  creditReferralEarning(referrerId, 2);
  return { success: true };
}
function getReferralStats() {
  const all = loadReferrals();
  const successful = all.filter((r) => r.status === "success");
  const fraud = all.filter((r) => r.status === "fraud");
  return {
    totalReferrals: successful.length,
    totalEarnings: successful.reduce((sum, r) => sum + r.rewardAmount, 0),
    fraudAttempts: fraud.length,
    allReferrals: [...all].sort((a, b) => b.timestamp - a.timestamp)
  };
}
function getUserReferralStats(referrerId) {
  const all = loadReferrals().filter((r) => r.referrerId === referrerId);
  const successful = all.filter((r) => r.status === "success");
  const fraud = all.filter((r) => r.status === "fraud");
  return {
    totalReferrals: successful.length,
    totalEarnings: successful.reduce((sum, r) => sum + r.rewardAmount, 0),
    fraudAttempts: fraud.length,
    referrals: [...all].sort((a, b) => b.timestamp - a.timestamp)
  };
}
export {
  CircleX as C,
  generateReferralCode as a,
  getUserReferralStats as b,
  getReferralStats as g,
  processReferral as p
};
