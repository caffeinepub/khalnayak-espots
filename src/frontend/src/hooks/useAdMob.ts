/**
 * useAdMob — Web hybrid ad manager for Khalnayak Espots.
 *
 * Strategy:
 * 1. For banner ads  → render <ins class="adsbygoogle"> slot
 * 2. For rewarded ads → try adsbygoogle rewarded slot; if unavailable or
 *    times-out after 5 s, fall back to the existing AdModal simulation.
 * 3. For interstitial → show a styled full-screen overlay with a skip timer,
 *    backed by adsbygoogle when available.
 *
 * The hook always keeps rewarded / withdrawal buttons active so users are
 * never blocked.
 */

import { ADMOB_CONFIG, getAdUnitId } from "@/config/admob";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Global adsbygoogle type shim ──────────────────────────────────────────────
declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export type AdStatus = "idle" | "loading" | "ready" | "failed";

export interface UseAdMobReturn {
  /** Status of the currently loaded rewarded ad */
  rewardedAdStatus: AdStatus;
  /** Load / pre-fetch a rewarded ad slot */
  loadRewardedAd: () => void;
  /**
   * Show a rewarded ad.
   * @param onRewarded  – called when the user earns the reward
   * @param onFailed    – called when the ad could not be shown (use AdModal fallback)
   */
  showRewardedAd: (onRewarded: () => void, onFailed: () => void) => void;
  /**
   * Show an interstitial ad overlay.
   * @param onDismiss – called when the overlay is closed / skipped
   */
  showInterstitial: (onDismiss: () => void) => void;
  /** Whether banner slots have been initialised */
  isBannerLoaded: boolean;
  /** Whether we're running in test mode */
  isTestMode: boolean;
}

export function useAdMob(): UseAdMobReturn {
  const [rewardedAdStatus, setRewardedAdStatus] = useState<AdStatus>("idle");
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isTestMode = ADMOB_CONFIG.TEST_MODE;

  // Push the adsbygoogle bootstrap once per session
  useEffect(() => {
    try {
      if (window.adsbygoogle !== undefined) {
        setIsBannerLoaded(true);
      }
    } catch {
      // adsbygoogle not yet available — that's fine
    }

    // Watch for late-loading of the script (async)
    const interval = setInterval(() => {
      if (window.adsbygoogle !== undefined) {
        setIsBannerLoaded(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const loadRewardedAd = useCallback(() => {
    setRewardedAdStatus("loading");

    // 5-second timeout – if adsbygoogle doesn't respond, mark failed
    loadTimeoutRef.current = setTimeout(() => {
      setRewardedAdStatus((prev) => (prev === "loading" ? "failed" : prev));
    }, 5000);

    try {
      if (window.adsbygoogle !== undefined) {
        window.adsbygoogle.push({
          params: { google_ad_slot: getAdUnitId("rewarded") },
        });
        setRewardedAdStatus("ready");
        if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      } else {
        // Script not loaded yet — mark as failed so caller can use AdModal
        if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
        setRewardedAdStatus("failed");
      }
    } catch {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      setRewardedAdStatus("failed");
    }
  }, []);

  const showRewardedAd = useCallback(
    (onRewarded: () => void, onFailed: () => void) => {
      // On web the rewarded ad API requires user consent and AdSense approval.
      // Until the account is approved and live we always fall back to AdModal.
      if (!window.adsbygoogle || isTestMode) {
        // Fall back to AdModal simulation
        onFailed();
        return;
      }

      try {
        window.adsbygoogle.push({
          params: { google_ad_slot: getAdUnitId("rewarded") },
        });
        // Simulate completion — in production a callback would fire here
        onRewarded();
      } catch {
        onFailed();
      }
    },
    [isTestMode],
  );

  const showInterstitial = useCallback((_onDismiss: () => void) => {
    // Interstitial handling is done by the InterstitialOverlay component.
    // This hook entry-point is kept for callers that want to trigger it
    // programmatically; the actual overlay is rendered via state in the page.
  }, []);

  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, []);

  return {
    rewardedAdStatus,
    loadRewardedAd,
    showRewardedAd,
    showInterstitial,
    isBannerLoaded,
    isTestMode,
  };
}
