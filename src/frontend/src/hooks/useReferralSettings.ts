import React from "react";

const STORAGE_KEY = "kl_referral_settings";

export interface ReferralSettings {
  enabled: boolean;
  referrerReward: number;
  newUserBonus: number;
  minUsersRequired: number;
}

const DEFAULT_SETTINGS: ReferralSettings = {
  enabled: true,
  referrerReward: 1.5,
  newUserBonus: 0.5,
  minUsersRequired: 0,
};

export function getReferralSettings(): ReferralSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export function saveReferralSettings(settings: ReferralSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function useReferralSettings() {
  const [settings, setSettings] =
    React.useState<ReferralSettings>(getReferralSettings);
  const save = (s: ReferralSettings) => {
    saveReferralSettings(s);
    setSettings(s);
  };
  return { settings, save };
}
