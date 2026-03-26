import { useCallback, useEffect, useState } from "react";
import { useUnifiedAuth } from "../context/UnifiedAuthContext";
import {
  type FirestoreUserProfile,
  addTransaction,
  findUserByReferralCode,
  getUserProfile,
  saveUserProfile,
  updateWalletBalance,
} from "../lib/firestore";

export type IIUserProfile = FirestoreUserProfile;

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const PROFILE_KEY_PREFIX = "kle_ii_profile_";

function cacheProfile(principal: string, profile: IIUserProfile) {
  try {
    localStorage.setItem(
      PROFILE_KEY_PREFIX + principal,
      JSON.stringify(profile),
    );
  } catch {}
}

function getCachedProfile(principal: string): IIUserProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY_PREFIX + principal);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getProfileByPrincipal(principal: string): IIUserProfile | null {
  return getCachedProfile(principal);
}

export async function updateProfileBalance(
  principal: string,
  delta: number,
  description?: string,
) {
  await updateWalletBalance(principal, delta);
  if (description) {
    await addTransaction(principal, {
      type: delta > 0 ? "credit" : "debit",
      amount: Math.abs(delta),
      description,
    });
  }
  // Update localStorage cache
  const cached = getCachedProfile(principal);
  if (cached) {
    cached.wallet_balance = (cached.wallet_balance ?? 0) + delta;
    cacheProfile(principal, cached);
  }
}

export function getLocalTransactions(principal: string) {
  try {
    const raw = localStorage.getItem(`kle_tx_${principal}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function findPrincipalByReferralCode(
  code: string,
): Promise<string | null> {
  const user = await findUserByReferralCode(code);
  return user?.principal ?? null;
}

export function useIIProfile() {
  const { userId: principal, isInitializing } = useUnifiedAuth();
  const [profile, setProfile] = useState<IIUserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    if (!principal) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    // Show cached immediately
    const cached = getCachedProfile(principal);
    if (cached) {
      setProfile(cached);
      setProfileLoading(false);
    }
    // Then fetch from Firestore
    try {
      const fsProfile = await getUserProfile(principal);
      if (fsProfile) {
        setProfile(fsProfile);
        cacheProfile(principal, fsProfile);
      } else if (!cached) {
        setProfile(null);
      }
    } catch {
      // Use cached
    }
    setProfileLoading(false);
  }, [principal]);

  useEffect(() => {
    if (isInitializing) return;
    void loadProfile();
  }, [isInitializing, loadProfile]);

  const saveProfile = useCallback(
    async (
      data: Omit<
        IIUserProfile,
        | "principal"
        | "wallet_balance"
        | "referral_code"
        | "created_at"
        | "referral_earnings"
        | "welcome_bonus"
      > & { referred_by?: string },
    ): Promise<{ isNewUser: boolean; referralProcessed: boolean }> => {
      if (!principal) return { isNewUser: false, referralProcessed: false };

      // Check if already exists in Firestore
      const existing = await getUserProfile(principal);
      if (existing) {
        setProfile(existing);
        cacheProfile(principal, existing);
        return { isNewUser: false, referralProcessed: false };
      }

      const referralCode = generateReferralCode();
      let welcomeBonus = 0;
      let referralProcessed = false;
      let referredByPrincipal: string | undefined;

      // Handle referral
      if (data.referred_by) {
        try {
          const referrer = await findUserByReferralCode(data.referred_by);
          if (referrer && referrer.principal !== principal) {
            referredByPrincipal = referrer.principal;
            await updateWalletBalance(referrer.principal, 1.5);
            await addTransaction(referrer.principal, {
              type: "credit",
              amount: 1.5,
              description: `🎉 Referral bonus — invited ${data.display_name}`,
            });
            const referrerCached = getCachedProfile(referrer.principal);
            if (referrerCached) {
              referrerCached.wallet_balance += 1.5;
              referrerCached.referral_earnings =
                (referrerCached.referral_earnings ?? 0) + 1.5;
              cacheProfile(referrer.principal, referrerCached);
            }
            welcomeBonus = 0.5;
            referralProcessed = true;
          }
        } catch {}
      }

      const newProfile: IIUserProfile = {
        principal,
        display_name: data.display_name,
        freefire_uid: data.freefire_uid,
        freefire_nickname: data.freefire_nickname,
        freefire_level: data.freefire_level,
        wallet_balance: welcomeBonus,
        referral_code: referralCode,
        created_at: Date.now(),
        ...(referredByPrincipal
          ? { referred_by: referredByPrincipal, welcome_bonus: welcomeBonus }
          : {}),
      };

      await saveUserProfile(principal, newProfile);

      if (referredByPrincipal && welcomeBonus > 0) {
        await addTransaction(principal, {
          type: "credit",
          amount: welcomeBonus,
          description: "🎁 Welcome bonus — referral reward",
        });
      }

      cacheProfile(principal, newProfile);
      setProfile(newProfile);
      return { isNewUser: true, referralProcessed };
    },
    [principal],
  );

  const refreshProfile = useCallback(() => {
    void loadProfile();
  }, [loadProfile]);

  return { profile, profileLoading, saveProfile, principal, refreshProfile };
}
