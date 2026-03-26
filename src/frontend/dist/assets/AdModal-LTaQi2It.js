import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-ClVgYzE0.js";
import { P as Progress } from "./progress-x6LLIs58.js";
import { P as Play } from "./play-cCw-mM-A.js";
import { C as CircleCheck } from "./circle-check-D-szAEAU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m17 2-5 5-5-5", key: "16satq" }],
  ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", key: "1e6viu" }]
];
const Tv = createLucideIcon("tv", __iconNode);
const ADMOB_CONFIG = {
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
  /**
   * Google's official test ad unit IDs for web (adsbygoogle).
   * These always return a test ad without affecting billing/policy.
   * Source: https://developers.google.com/admob/android/test-ads
   */
  testAdUnits: {
    banner: "ca-pub-3940256099942544/6300978111",
    interstitial: "ca-pub-3940256099942544/1033173712",
    rewarded: "ca-pub-3940256099942544/5354046379"
  }
};
function getAdUnitId(format) {
  return ADMOB_CONFIG.testAdUnits[format];
}
function AdModal({
  isOpen,
  onComplete,
  onCancel,
  duration = 30,
  title = "Watch Ad to Earn",
  rewardLabel = "+1 Token"
}) {
  const [phase, setPhase] = reactExports.useState("playing");
  const [countdown, setCountdown] = reactExports.useState(duration);
  const timerRef = reactExports.useRef(null);
  const startedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!isOpen) {
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
          clearInterval(timerRef.current);
          timerRef.current = null;
          setPhase("claiming");
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen, duration]);
  const handleClaim = reactExports.useCallback(() => {
    onComplete();
  }, [onComplete]);
  const handleDismiss = reactExports.useCallback(() => {
    onCancel();
  }, [onCancel]);
  if (!isOpen) return null;
  const progressPct = Math.round((duration - countdown) / duration * 100);
  const rewardedAdId = getAdUnitId("rewarded");
  const gradientAngle = progressPct * 3.6 % 360;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: { backgroundColor: "rgba(0,0,0,0.92)" },
      "data-ocid": "ad.modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg mx-4 space-y-0 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 rounded-t-2xl bg-zinc-900 border border-zinc-700/50 border-b-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-4 w-4 text-yellow-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-yellow-400 uppercase tracking-wider", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 px-1.5 py-0.5 rounded font-mono uppercase tracking-wide", children: "Test Ad" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            phase === "playing" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full", children: "Cannot skip" }),
            phase === "claiming" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleDismiss,
                className: "text-zinc-500 hover:text-zinc-300 text-sm px-2 py-0.5 rounded transition-colors",
                "data-ocid": "ad.close_button",
                "aria-label": "Dismiss",
                children: "✕"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative overflow-hidden border border-zinc-700/50 border-t-0",
            style: { minHeight: "280px" },
            children: [
              phase === "playing" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 transition-all duration-1000",
                    style: {
                      background: `conic-gradient(from ${gradientAngle}deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #1a1a2e 100%)`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center h-full py-12 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-white/10 p-4 border border-white/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-8 w-8 text-white fill-white" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm font-medium tracking-wide uppercase", children: "Advertisement" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-7xl font-bold tabular-nums",
                      style: {
                        color: "#fff",
                        textShadow: "0 0 30px rgba(253,224,71,0.8)",
                        fontVariantNumeric: "tabular-nums"
                      },
                      "data-ocid": "ad.loading_state",
                      children: countdown
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-400 text-sm font-semibold", children: "seconds remaining" })
                ] })
              ] }),
              phase === "claiming" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-green-950 via-zinc-900 to-green-950 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center space-y-5 px-6 py-12",
                  "data-ocid": "ad.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "rounded-full p-5 border-2 border-green-400",
                        style: { boxShadow: "0 0 32px rgba(74,222,128,0.6)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-green-400" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-green-400", children: "Ad Complete!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 text-sm", children: "Claim your reward below" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-yellow-400 bg-yellow-950/40",
                        style: { boxShadow: "0 0 16px rgba(253,224,71,0.3)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🪙" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-yellow-300", children: rewardLabel })
                        ]
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 rounded-b-2xl bg-zinc-900 border border-zinc-700/50 border-t-0 space-y-3", children: [
          phase === "playing" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Progress,
              {
                value: progressPct,
                className: "h-2",
                style: {
                  "--progress-color": "rgb(234,179,8)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-zinc-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ad playing — please watch the full ad" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-yellow-500 font-mono font-bold", children: [
                countdown,
                "s"
              ] })
            ] })
          ] }),
          phase === "claiming" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleClaim,
              className: "w-full py-3 rounded-xl font-bold text-lg transition-all active:scale-95",
              style: {
                background: "linear-gradient(135deg, #eab308, #f59e0b)",
                color: "#000",
                boxShadow: "0 0 24px rgba(234,179,8,0.6)"
              },
              "data-ocid": "ad.confirm_button",
              children: [
                "🪙 Claim ",
                rewardLabel
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-zinc-600 text-center font-mono truncate", children: [
            "Unit: ",
            rewardedAdId
          ] })
        ] })
      ] })
    }
  );
}
export {
  ADMOB_CONFIG as A,
  AdModal as a,
  getAdUnitId as g
};
