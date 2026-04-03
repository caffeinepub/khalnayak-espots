/**
 * AdModal — Full-screen rewarded video ad simulation overlay.
 *
 * Behavior:
 * - Shows animated ad area with countdown
 * - NO close/skip during countdown (enforced)
 * - After countdown: shows "Claim" screen with reward info
 * - onComplete called when user clicks Claim
 * - onCancel called if user dismisses after completion (no reward)
 */

import { Progress } from "@/components/ui/progress";
import { ADMOB_CONFIG, getAdUnitId } from "@/config/admob";
import { CheckCircle2, Play, Tv } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface AdModalProps {
  isOpen: boolean;
  onComplete: () => void;
  onCancel: () => void;
  duration?: number;
  title?: string;
  rewardLabel?: string;
  /** If true: hide token reward, show "Registration Successful!" instead */
  hideClaimReward?: boolean;
}

type AdPhase = "playing" | "claiming";

export function AdModal({
  isOpen,
  onComplete,
  onCancel,
  duration = 30,
  title = "Watch Ad to Earn",
  rewardLabel = "+1 Token",
  hideClaimReward = false,
}: AdModalProps) {
  const [phase, setPhase] = useState<AdPhase>("playing");
  const [countdown, setCountdown] = useState(duration);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  // Start/reset when modal opens
  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed
      setPhase("playing");
      setCountdown(duration);
      startedRef.current = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (startedRef.current) return;
    startedRef.current = true;

    setPhase("playing");
    setCountdown(duration);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setPhase("claiming");
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
  }, [isOpen, duration]);

  const handleClaim = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const handleDismiss = useCallback(() => {
    onCancel();
  }, [onCancel]);

  if (!isOpen) return null;

  const progressPct = Math.round(((duration - countdown) / duration) * 100);
  const isTestMode = ADMOB_CONFIG.TEST_MODE;
  const rewardedAdId = getAdUnitId("rewarded");

  // Gradient colors that shift while ad plays
  const gradientAngle = (progressPct * 3.6) % 360;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      data-ocid="ad.modal"
    >
      <div className="w-full max-w-lg mx-4 space-y-0 flex flex-col">
        {/* Ad title bar */}
        <div className="flex items-center justify-between px-5 py-3 rounded-t-2xl bg-zinc-900 border border-zinc-700/50 border-b-0">
          <div className="flex items-center gap-2">
            <Tv className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              {title}
            </span>
            {isTestMode && (
              <span className="text-[10px] bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 px-1.5 py-0.5 rounded font-mono uppercase tracking-wide">
                Test Ad
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {phase === "playing" && (
              <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                Cannot skip
              </span>
            )}
            {phase === "claiming" && (
              <button
                type="button"
                onClick={handleDismiss}
                className="text-zinc-500 hover:text-zinc-300 text-sm px-2 py-0.5 rounded transition-colors"
                data-ocid="ad.close_button"
                aria-label="Dismiss"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Ad area */}
        <div
          className="relative overflow-hidden border border-zinc-700/50 border-t-0"
          style={{ minHeight: "280px" }}
        >
          {phase === "playing" && (
            <>
              {/* Animated gradient background simulating video ad */}
              <div
                className="absolute inset-0 transition-all duration-1000"
                style={{
                  background: `conic-gradient(from ${gradientAngle}deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #1a1a2e 100%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

              {/* Fake ad content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full py-12 space-y-4">
                <div className="rounded-full bg-white/10 p-4 border border-white/20 backdrop-blur-sm">
                  <Play className="h-8 w-8 text-white fill-white" />
                </div>
                <p className="text-white/60 text-sm font-medium tracking-wide uppercase">
                  Advertisement
                </p>
                <div
                  className="text-7xl font-bold tabular-nums"
                  style={{
                    color: "#fff",
                    textShadow: "0 0 30px rgba(253,224,71,0.8)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                  data-ocid="ad.loading_state"
                >
                  {countdown}
                </div>
                <p className="text-yellow-400 text-sm font-semibold">
                  seconds remaining
                </p>
              </div>
            </>
          )}

          {phase === "claiming" && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-zinc-900 to-green-950 flex items-center justify-center">
              <div
                className="text-center space-y-5 px-6 py-12"
                data-ocid="ad.success_state"
              >
                <div className="flex justify-center">
                  <div
                    className="rounded-full p-5 border-2 border-green-400"
                    style={{ boxShadow: "0 0 32px rgba(74,222,128,0.6)" }}
                  >
                    <CheckCircle2 className="h-12 w-12 text-green-400" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold text-green-400">
                    {hideClaimReward
                      ? "Registration Successful! 🎉"
                      : "Ad Complete!"}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    {hideClaimReward
                      ? "You have joined the tournament"
                      : "Claim your reward below"}
                  </p>
                </div>
                {!hideClaimReward && (
                  <div
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-yellow-400 bg-yellow-950/40"
                    style={{ boxShadow: "0 0 16px rgba(253,224,71,0.3)" }}
                  >
                    <span className="text-2xl">🪙</span>
                    <span className="text-xl font-bold text-yellow-300">
                      {rewardLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar: progress + action */}
        <div className="px-5 py-4 rounded-b-2xl bg-zinc-900 border border-zinc-700/50 border-t-0 space-y-3">
          {phase === "playing" && (
            <>
              <Progress
                value={progressPct}
                className="h-2"
                style={
                  {
                    "--progress-color": "rgb(234,179,8)",
                  } as React.CSSProperties
                }
              />
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Ad playing — please watch the full ad</span>
                <span className="text-yellow-500 font-mono font-bold">
                  {countdown}s
                </span>
              </div>
            </>
          )}

          {phase === "claiming" && (
            <button
              type="button"
              onClick={handleClaim}
              className="w-full py-3 rounded-xl font-bold text-lg transition-all active:scale-95"
              style={{
                background: hideClaimReward
                  ? "linear-gradient(135deg, #00FF88, #00cc6a)"
                  : "linear-gradient(135deg, #eab308, #f59e0b)",
                color: "#000",
                boxShadow: hideClaimReward
                  ? "0 0 24px rgba(0,255,136,0.6)"
                  : "0 0 24px rgba(234,179,8,0.6)",
              }}
              data-ocid="ad.confirm_button"
            >
              {hideClaimReward ? "✅ Continue" : `🪙 Claim ${rewardLabel}`}
            </button>
          )}

          {/* AdMob ID info (test mode only) */}
          {isTestMode && (
            <p className="text-[9px] text-zinc-600 text-center font-mono truncate">
              Unit: {rewardedAdId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
