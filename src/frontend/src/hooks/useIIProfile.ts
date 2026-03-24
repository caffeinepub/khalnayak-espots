import { useCallback, useEffect, useState } from "react";
import { useFirebaseAuth } from "./useFirebaseAuth";

export interface IIUserProfile {
  principal: string;
  display_name: string;
  freefire_uid: string;
  freefire_nickname: string;
  freefire_level: number;
  wallet_balance: number;
  referral_code: string;
  created_at: number;
  referred_by?: string;
  referral_earnings?: number;
  welcome_bonus?: number;
}

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const PROFILE_KEY_PREFIX = "kle_ii_profile_";
const REFERRAL_CODE_INDEX = "kle_referral_code_index";

function getReferralCodeIndex(): Record<string, string> {
  try {
    const raw = localStorage.getItem(REFERRAL_CODE_INDEX);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setReferralCodeIndex(code: string, principal: string) {
  const index = getReferralCodeIndex();
  index[code] = principal;
  localStorage.setItem(REFERRAL_CODE_INDEX, JSON.stringify(index));
}

export function findPrincipalByReferralCode(code: string): string | null {
  const index = getReferralCodeIndex();
  return index[code.toUpperCase()] ?? null;
}

export function getProfileByPrincipal(principal: string): IIUserProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY_PREFIX + principal);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function updateProfileBalance(
  principal: string,
  delta: number,
  description?: string,
) {
  const key = PROFILE_KEY_PREFIX + principal;
  const raw = localStorage.getItem(key);
  if (!raw) return;
  try {
    const p: IIUserProfile = JSON.parse(raw);
    p.wallet_balance = (p.wallet_balance ?? 0) + delta;
    if (description) {
      const txKey = `kle_tx_${principal}`;
      const txRaw = localStorage.getItem(txKey);
      const txList = txRaw ? JSON.parse(txRaw) : [];
      txList.push({
        id: Date.now(),
        type: delta > 0 ? "credit" : "debit",
        amount: Math.abs(delta),
        description,
        date: new Date().toISOString(),
      });
      localStorage.setItem(txKey, JSON.stringify(txList));
    }
    localStorage.setItem(key, JSON.stringify(p));
  } catch {
    // ignore
  }
}

export function useIIProfile() {
  const { user, isInitializing } = useFirebaseAuth();
  const [profile, setProfile] = useState<IIUserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const principal = user?.uid;

  const loadProfile = useCallback(() => {
    if (!principal) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    const key = PROFILE_KEY_PREFIX + principal;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch {
        setProfile(null);
      }
    } else {
      setProfile(null);
    }
    setProfileLoading(false);
  }, [principal]);

  useEffect(() => {
    if (isInitializing) return;
    loadProfile();
  }, [isInitializing, loadProfile]);

  const saveProfile = useCallback(
    (
      data: Omit<
        IIUserProfile,
        | "principal"
        | "wallet_balance"
        | "referral_code"
        | "created_at"
        | "referral_earnings"
        | "welcome_bonus"
      > & { referred_by?: string },
    ): { isNewUser: boolean; referralProcessed: boolean } => {
      if (!principal) return { isNewUser: false, referralProcessed: false };

      const existingKey = PROFILE_KEY_PREFIX + principal;
      const existingRaw = localStorage.getItem(existingKey);
      if (existingRaw) {
        return { isNewUser: false, referralProcessed: false };
      }

      const referralCode = generateReferralCode();
      let welcomeBonus = 0;
      let referralProcessed = false;

      const newProfile: IIUserProfile = {
        principal,
        ...data,
        wallet_balance: 0,
        referral_code: referralCode,
        created_at: Date.now(),
      };

      setReferralCodeIndex(referralCode, principal);

      if (data.referred_by && data.referred_by !== principal) {
        const referrerProfile = getProfileByPrincipal(data.referred_by);
        if (referrerProfile) {
          updateProfileBalance(
            data.referred_by,
            1.5,
            `🎉 Referral bonus — invited ${data.display_name}`,
          );
          const referrerKey = PROFILE_KEY_PREFIX + data.referred_by;
          const referrerRaw = localStorage.getItem(referrerKey);
          if (referrerRaw) {
            try {
              const rp: IIUserProfile = JSON.parse(referrerRaw);
              rp.referral_earnings = (rp.referral_earnings ?? 0) + 1.5;
              localStorage.setItem(referrerKey, JSON.stringify(rp));
            } catch {
              // ignore
            }
          }
          welcomeBonus = 0.5;
          newProfile.wallet_balance = 0.5;
          newProfile.referred_by = data.referred_by;
          newProfile.welcome_bonus = 0.5;
          referralProcessed = true;
        }
      }

      localStorage.setItem(existingKey, JSON.stringify(newProfile));

      if (welcomeBonus > 0) {
        const txKey = `kle_tx_${principal}`;
        const txList: Array<{
          id: number;
          type: string;
          amount: number;
          description: string;
          date: string;
        }> = [];
        txList.push({
          id: Date.now(),
          type: "credit",
          amount: welcomeBonus,
          description: "🎁 Welcome bonus — referral reward",
          date: new Date().toISOString(),
        });
        localStorage.setItem(txKey, JSON.stringify(txList));
      }

      setProfile(newProfile);
      return { isNewUser: true, referralProcessed };
    },
    [principal],
  );

  const refreshProfile = useCallback(() => {
    loadProfile();
  }, [loadProfile]);

  return { profile, profileLoading, saveProfile, principal, refreshProfile };
}
