import "./index-CGRNRf69.js";
const REFERRAL_STORAGE_KEY = "kle_referrals";
function loadReferrals() {
  try {
    const raw = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
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
const STORAGE_KEY = "kl_referral_settings";
const DEFAULT_SETTINGS = {
  enabled: true,
  referrerReward: 1.5,
  newUserBonus: 0.5,
  minUsersRequired: 0
};
function getReferralSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
  }
  return DEFAULT_SETTINGS;
}
function saveReferralSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
export {
  getReferralSettings as a,
  getReferralStats as b,
  getUserReferralStats as g,
  saveReferralSettings as s
};
