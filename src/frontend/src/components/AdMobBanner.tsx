/**
 * AdMobBanner — Soft, non-intrusive banner ad component.
 *
 * On web the adsbygoogle API is used. If the script hasn't loaded (or the
 * publisher account hasn't been approved yet), a subtle placeholder is shown
 * that doesn't disturb the UI.
 *
 * Placement: Home page bottom, above the footer.
 * Z-index: 40 — below modals (50+) but above regular content.
 */

import { ADMOB_CONFIG, getAdUnitId } from "@/config/admob";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

interface AdMobBannerProps {
  /** Extra CSS classes for the wrapper */
  className?: string;
  /** Whether the banner should be fixed to the bottom of the viewport */
  fixed?: boolean;
}

export function AdMobBanner({
  className = "",
  fixed = false,
}: AdMobBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  // Check if adsbygoogle script has loaded
  useEffect(() => {
    const check = () => {
      if (window.adsbygoogle !== undefined) {
        setScriptReady(true);
        return true;
      }
      return false;
    };

    if (!check()) {
      const interval = setInterval(() => {
        if (check()) clearInterval(interval);
      }, 300);
      return () => clearInterval(interval);
    }
  }, []);

  // Push the ad slot once the script is ready
  useEffect(() => {
    if (!scriptReady || adLoaded) return;
    try {
      window.adsbygoogle!.push({});
      setAdLoaded(true);
    } catch {
      // Ignore duplicate push errors
    }
  }, [scriptReady, adLoaded]);

  if (dismissed) return null;

  const wrapperBase =
    "w-full flex flex-col items-center gap-1 bg-zinc-950/80 backdrop-blur-sm border-t border-zinc-800/60 py-2 px-4";
  const wrapperFixed = fixed
    ? "fixed bottom-0 left-0 right-0 z-40"
    : "relative";

  const adUnitId = getAdUnitId("banner");
  const isTest = ADMOB_CONFIG.TEST_MODE;

  return (
    <div
      className={`${wrapperBase} ${wrapperFixed} ${className}`}
      data-ocid="admob.banner.card"
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Label row */}
      <div className="flex items-center justify-between w-full max-w-screen-lg">
        <span className="text-[10px] tracking-widest text-zinc-500 uppercase select-none">
          Advertisement
        </span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-zinc-600 hover:text-zinc-400 transition-colors p-0.5 rounded"
          aria-label="Close advertisement"
          data-ocid="admob.banner.close_button"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* Ad slot */}
      <div
        ref={adRef}
        className="w-full max-w-screen-lg flex items-center justify-center min-h-[50px]"
      >
        {scriptReady ? (
          /* Real adsbygoogle slot */
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "50px" }}
            data-ad-client={ADMOB_CONFIG.PUBLISHER_ID}
            data-ad-slot={adUnitId}
            data-ad-format="auto"
            data-full-width-responsive="true"
            {...(isTest ? { "data-adtest": "on" } : {})}
          />
        ) : (
          /* Soft placeholder while script loads */
          <BannerPlaceholder />
        )}
      </div>
    </div>
  );
}

/** Subtle placeholder — shown when adsbygoogle hasn't loaded */
function BannerPlaceholder() {
  return (
    <div
      className="w-full max-w-screen-lg h-[50px] flex items-center justify-center rounded border border-dashed border-zinc-800/60 bg-zinc-900/30"
      aria-hidden="true"
    >
      <span className="text-[11px] text-zinc-600 tracking-wide select-none">
        Ad Loading…
      </span>
    </div>
  );
}

/**
 * InterstitialOverlay — Full-screen post-registration ad overlay.
 *
 * Rules:
 * - "X" close button always visible (user can dismiss instantly)
 * - "Skip Ad" countdown shown for 5 seconds
 * - After countdown completes (or user closes), onDismiss() is called
 */
interface InterstitialOverlayProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export function InterstitialOverlay({
  isOpen,
  onDismiss,
}: InterstitialOverlayProps) {
  const [skipCountdown, setSkipCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed
      setSkipCountdown(5);
      setCanSkip(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    setSkipCountdown(5);
    setCanSkip(false);

    timerRef.current = setInterval(() => {
      setSkipCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const adUnitId = getAdUnitId("interstitial");
  const isTest = ADMOB_CONFIG.TEST_MODE;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
      data-ocid="admob.interstitial.modal"
    >
      {/* Outer wrapper */}
      <div className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden border border-zinc-700/50 bg-zinc-950">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-zinc-900 border-b border-zinc-800/50">
          <span className="text-xs text-zinc-500 uppercase tracking-widest">
            Advertisement
          </span>
          <div className="flex items-center gap-3">
            {canSkip ? (
              <button
                type="button"
                onClick={onDismiss}
                className="text-sm font-semibold text-primary hover:text-primary/80 px-3 py-1 rounded-lg border border-primary/40 transition-colors"
                data-ocid="admob.interstitial.close_button"
              >
                Skip Ad →
              </button>
            ) : (
              <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full font-mono">
                Skip in {skipCountdown}s
              </span>
            )}
            {/* Always-visible X */}
            <button
              type="button"
              onClick={onDismiss}
              className="text-zinc-600 hover:text-zinc-300 transition-colors p-1 rounded"
              aria-label="Close ad"
              data-ocid="admob.interstitial.cancel_button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Ad body */}
        <div className="relative min-h-[300px] flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
          {window.adsbygoogle ? (
            /* Real ad slot */
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "100%", minHeight: "300px" }}
              data-ad-client={ADMOB_CONFIG.PUBLISHER_ID}
              data-ad-slot={adUnitId}
              data-ad-format="auto"
              data-full-width-responsive="true"
              {...(isTest ? { "data-adtest": "on" } : {})}
            />
          ) : (
            /* Styled mock ad for test/fallback */
            <MockInterstitialContent />
          )}
        </div>

        {/* Bottom bar */}
        <div className="px-5 py-3 bg-zinc-900 border-t border-zinc-800/50 flex items-center justify-between">
          <p className="text-xs text-zinc-600">
            Sponsored content — close any time
          </p>
          {canSkip && (
            <button
              type="button"
              onClick={onDismiss}
              className="text-xs text-zinc-400 hover:text-zinc-200 underline transition-colors"
              data-ocid="admob.interstitial.confirm_button"
            >
              Continue to App →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Mock interstitial ad body used in test mode / when adsbygoogle is unavailable */
function MockInterstitialContent() {
  return (
    <div className="text-center space-y-4 px-8 py-10">
      {/* Fake gaming ad creative */}
      <div
        className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-4xl"
        style={{
          background:
            "linear-gradient(135deg, #0ff2 0%, #0ff4 50%, #f0f2 100%)",
          border: "1px solid rgba(0,245,255,0.3)",
          boxShadow: "0 0 32px rgba(0,245,255,0.15)",
        }}
      >
        🎮
      </div>
      <div className="space-y-1">
        <p
          className="text-xl font-bold font-display text-white"
          style={{ textShadow: "0 0 12px rgba(0,245,255,0.5)" }}
        >
          Level Up Your Game!
        </p>
        <p className="text-sm text-zinc-400">
          Discover more gaming apps and tournaments
        </p>
      </div>
      <div
        className="inline-block px-6 py-2 rounded-full text-sm font-semibold text-black"
        style={{
          background: "linear-gradient(90deg, #00f5ff, #a855f7)",
          boxShadow: "0 0 16px rgba(0,245,255,0.3)",
        }}
      >
        Play Now
      </div>
      <p
        className="text-[10px] text-zinc-600 tracking-widest uppercase"
        aria-hidden="true"
      >
        Test Ad — Google AdMob (Test Mode)
      </p>
    </div>
  );
}
