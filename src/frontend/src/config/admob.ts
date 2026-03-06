/**
 * AdMob / Google AdSense configuration for Khalnayak Espots.
 *
 * NOTE: Google AdMob is a mobile SDK (Android/iOS). For the web PWA we use
 * Google's adsbygoogle API (AdSense / Publisher Tag).
 * The ad unit IDs below are your actual AdMob IDs — they are stored here for
 * future native-app use. On web we fall back to Google's official test unit IDs
 * when TEST_MODE is true.
 */

export const ADMOB_CONFIG = {
  /** Your AdMob App ID */
  APP_ID: "ca-app-pub-9216368060577966~2011812286",

  /**
   * Publisher client ID derived from the App ID.
   * Used in the <script> tag for adsbygoogle.
   */
  PUBLISHER_ID: "ca-pub-9216368060577966",

  /**
   * Toggle between test mode and live mode.
   * Set to false only when the AdSense account is approved and live.
   */
  TEST_MODE: true,

  /** Your real AdMob / AdSense ad unit IDs */
  adUnits: {
    rewarded: "ca-app-pub-9216368060577966/2950149540",
    banner: "ca-app-pub-9216368060577966/4123630411",
    interstitial: "ca-app-pub-9216368060577966/1808604055",
  },

  /**
   * Google's official test ad unit IDs for web (adsbygoogle).
   * These always return a test ad without affecting billing/policy.
   * Source: https://developers.google.com/admob/android/test-ads
   */
  testAdUnits: {
    banner: "ca-pub-3940256099942544/6300978111",
    interstitial: "ca-pub-3940256099942544/1033173712",
    rewarded: "ca-pub-3940256099942544/5354046379",
  },
} as const;

/** Returns the active ad unit ID for a given format */
export function getAdUnitId(
  format: "rewarded" | "banner" | "interstitial",
): string {
  return ADMOB_CONFIG.TEST_MODE
    ? ADMOB_CONFIG.testAdUnits[format]
    : ADMOB_CONFIG.adUnits[format];
}
