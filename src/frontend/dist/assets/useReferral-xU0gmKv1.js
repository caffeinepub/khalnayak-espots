import "./index-Cj-vXlhi.js";
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
export {
  getUserReferralStats as a,
  getReferralStats as g
};
