import { useCallback, useEffect, useState } from "react";
import { useInternetIdentity } from "./useInternetIdentity";

export interface IIUserProfile {
  principal: string;
  display_name: string;
  freefire_uid: string;
  freefire_nickname: string;
  freefire_level: number;
  wallet_balance: number;
  referral_code: string;
  created_at: number;
}

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const PROFILE_KEY_PREFIX = "kle_ii_profile_";

export function useIIProfile() {
  const { identity, isInitializing } = useInternetIdentity();
  const [profile, setProfile] = useState<IIUserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const principal = identity?.getPrincipal().toText();

  useEffect(() => {
    if (isInitializing) return;
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
  }, [principal, isInitializing]);

  const saveProfile = useCallback(
    (
      data: Omit<
        IIUserProfile,
        "principal" | "wallet_balance" | "referral_code" | "created_at"
      >,
    ) => {
      if (!principal) return;
      const newProfile: IIUserProfile = {
        principal,
        ...data,
        wallet_balance: 0,
        referral_code: generateReferralCode(),
        created_at: Date.now(),
      };
      localStorage.setItem(
        PROFILE_KEY_PREFIX + principal,
        JSON.stringify(newProfile),
      );
      setProfile(newProfile);
    },
    [principal],
  );

  return { profile, profileLoading, saveProfile, principal };
}
