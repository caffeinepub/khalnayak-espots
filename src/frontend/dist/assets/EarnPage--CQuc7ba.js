import { r as reactExports, a4 as useTokens, j as jsxRuntimeExports, a9 as ue, U as Button, aa as LoaderCircle } from "./index-ClVgYzE0.js";
import { g as getAdUnitId, A as ADMOB_CONFIG, a as AdModal } from "./AdModal-LTaQi2It.js";
import { P as Play } from "./play-cCw-mM-A.js";
import "./progress-x6LLIs58.js";
import "./circle-check-D-szAEAU.js";
function useAdMob() {
  const [rewardedAdStatus, setRewardedAdStatus] = reactExports.useState("idle");
  const [isBannerLoaded, setIsBannerLoaded] = reactExports.useState(false);
  const loadTimeoutRef = reactExports.useRef(null);
  const isTestMode = ADMOB_CONFIG.TEST_MODE;
  reactExports.useEffect(() => {
    try {
      if (window.adsbygoogle !== void 0) {
        setIsBannerLoaded(true);
      }
    } catch {
    }
    const interval = setInterval(() => {
      if (window.adsbygoogle !== void 0) {
        setIsBannerLoaded(true);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);
  const loadRewardedAd = reactExports.useCallback(() => {
    setRewardedAdStatus("loading");
    loadTimeoutRef.current = setTimeout(() => {
      setRewardedAdStatus((prev) => prev === "loading" ? "failed" : prev);
    }, 5e3);
    try {
      if (window.adsbygoogle !== void 0) {
        window.adsbygoogle.push({
          params: { google_ad_slot: getAdUnitId("rewarded") }
        });
        setRewardedAdStatus("ready");
        if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      } else {
        if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
        setRewardedAdStatus("failed");
      }
    } catch {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      setRewardedAdStatus("failed");
    }
  }, []);
  const showRewardedAd = reactExports.useCallback(
    (onRewarded, onFailed) => {
      {
        onFailed();
        return;
      }
    },
    [isTestMode]
  );
  const showInterstitial = reactExports.useCallback((_onDismiss) => {
  }, []);
  reactExports.useEffect(() => {
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
    isTestMode
  };
}
const AD_DURATION_SECONDS = 30;
const WITHDRAWAL_AD_SECONDS = 60;
const neonGreen = "#00FF88";
const neonPurple = "#9d4edd";
const lightCard = "#F5F5F5";
const lightBg = "#FFFFFF";
const orbitron = {
  fontFamily: "'Orbitron', sans-serif"
};
const rajdhani = {
  fontFamily: "'Rajdhani', sans-serif"
};
function EarnPage() {
  const tokens = useTokens();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen pb-28",
      style: { background: lightBg },
      "data-ocid": "earn.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;600;700&display=swap');` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 pt-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "text-3xl font-black",
                style: {
                  ...orbitron,
                  color: neonGreen,
                  textShadow: `0 0 24px ${neonGreen}`
                },
                children: "💰 EARN REAL MONEY"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  ...rajdhani,
                  color: "#666666",
                  fontSize: 15,
                  marginTop: 4
                },
                children: "Watch Ads → Tokens → Cashout"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5 text-center",
              style: {
                background: lightCard,
                border: "1.5px solid rgba(0,255,136,0.3)",
                boxShadow: `0 0 32px ${neonGreen}22`
              },
              "data-ocid": "earn.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      ...rajdhani,
                      color: "#666666",
                      fontSize: 13,
                      letterSpacing: 2,
                      textTransform: "uppercase"
                    },
                    children: "Token Balance"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-black",
                    style: {
                      ...orbitron,
                      fontSize: 64,
                      color: neonGreen,
                      textShadow: `0 0 32px ${neonGreen}`,
                      lineHeight: 1.1
                    },
                    children: tokens.balance
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    style: {
                      ...rajdhani,
                      color: neonGreen,
                      fontSize: 18,
                      fontWeight: 600
                    },
                    children: [
                      "₹",
                      (tokens.balance / tokens.TOKENS_FOR_WITHDRAWAL * tokens.RUPEES_PER_WITHDRAWAL).toFixed(2),
                      " ",
                      "INR"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5 space-y-3",
              style: {
                background: lightCard,
                border: "1.5px solid rgba(157,78,221,0.3)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        ...orbitron,
                        color: neonPurple,
                        fontSize: 12,
                        letterSpacing: 1
                      },
                      children: "WITHDRAWAL PROGRESS"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { ...rajdhani, color: "#666666", fontSize: 14 }, children: [
                    tokens.tokensForNextWithdrawal,
                    "/",
                    tokens.TOKENS_FOR_WITHDRAWAL,
                    " ",
                    "tokens"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "relative h-4 rounded-full overflow-hidden",
                    style: { background: "#E0E0E0" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-y-0 left-0 rounded-full transition-all duration-700",
                        style: {
                          width: `${tokens.progressPct}%`,
                          background: `linear-gradient(90deg, ${neonPurple}, ${neonGreen})`,
                          boxShadow: `0 0 12px ${neonGreen}99`
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      ...rajdhani,
                      color: tokens.canWithdraw ? neonGreen : "#666666",
                      fontSize: 14,
                      textAlign: "center"
                    },
                    children: tokens.canWithdraw ? `✅ Ready to withdraw ₹${tokens.RUPEES_PER_WITHDRAWAL}!` : `${tokens.tokensNeeded} more tokens to withdraw ₹${tokens.RUPEES_PER_WITHDRAWAL}`
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WatchAdSection, { onAdComplete: tokens.earnToken }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WithdrawalSection, { tokens }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TopEarnersSection, {})
        ] })
      ]
    }
  );
}
function WatchAdSection({ onAdComplete }) {
  const [adOpen, setAdOpen] = reactExports.useState(false);
  const [timer, setTimer] = reactExports.useState(0);
  const { showRewardedAd, rewardedAdStatus } = useAdMob();
  const handleComplete = reactExports.useCallback(() => {
    setAdOpen(false);
    setTimer(0);
    onAdComplete();
    ue.success("✅ +1 Token credited!", {
      description: "Keep watching ads to earn more!"
    });
  }, [onAdComplete]);
  const handleCancel = reactExports.useCallback(() => {
    setAdOpen(false);
    setTimer(0);
  }, []);
  const handleWatchAd = reactExports.useCallback(() => {
    showRewardedAd(handleComplete, () => {
      setAdOpen(true);
      let t = AD_DURATION_SECONDS;
      setTimer(t);
      const iv = setInterval(() => {
        t -= 1;
        setTimer(t);
        if (t <= 0) clearInterval(iv);
      }, 1e3);
    });
  }, [showRewardedAd, handleComplete]);
  const isLoading = rewardedAdStatus === "loading";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdModal,
      {
        isOpen: adOpen,
        onComplete: handleComplete,
        onCancel: handleCancel,
        duration: AD_DURATION_SECONDS,
        title: "Watch Ad & Earn Token",
        rewardLabel: "+1 Token"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-5 text-center space-y-3",
        style: {
          background: lightCard,
          border: `1.5px solid ${neonGreen}66`,
          boxShadow: `0 0 24px ${neonGreen}22`
        },
        "data-ocid": "earn.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...orbitron, color: neonGreen, fontSize: 13 }, children: "WATCH AD & EARN" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleWatchAd,
              size: "lg",
              className: "w-full font-black text-lg",
              style: {
                ...orbitron,
                background: `linear-gradient(90deg, ${neonGreen}, #00cc6a)`,
                color: "#000",
                borderRadius: 12,
                boxShadow: `0 0 28px ${neonGreen}88`,
                border: "none",
                height: 56
              },
              disabled: isLoading,
              "data-ocid": "earn.primary_button",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }),
                "Loading Ad..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "mr-2 h-5 w-5" }),
                "▶️ WATCH AD  ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: 0.8 }, children: "+1 Token" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...rajdhani, color: "#666666", fontSize: 13 }, children: adOpen && timer > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: neonGreen }, children: [
            "⏱ ",
            timer,
            " sec remaining..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "30 sec ad • Unlimited • No daily limit",
            " • Test Mode"
          ] }) })
        ]
      }
    )
  ] });
}
function WithdrawalSection({
  tokens
}) {
  const [adOpen, setAdOpen] = reactExports.useState(false);
  const handleComplete = reactExports.useCallback(() => {
    setAdOpen(false);
    const success = tokens.withdrawTokens();
    if (success) {
      ue.success("✅ ₹1.25 added to your wallet!", {
        duration: 5e3
      });
    }
  }, [tokens]);
  const handleCancel = reactExports.useCallback(() => {
    setAdOpen(false);
  }, []);
  const handleWithdraw = () => {
    if (!tokens.canWithdraw) {
      ue.error(`${tokens.tokensNeeded} more tokens needed to withdraw`);
      return;
    }
    setAdOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdModal,
      {
        isOpen: adOpen,
        onComplete: handleComplete,
        onCancel: handleCancel,
        duration: WITHDRAWAL_AD_SECONDS,
        title: "Watch Ad to Redeem ₹1.25",
        rewardLabel: `₹${tokens.RUPEES_PER_WITHDRAWAL}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-5 space-y-3",
        style: { background: lightCard, border: `1.5px solid ${neonGreen}44` },
        "data-ocid": "earn.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...orbitron, color: neonGreen, fontSize: 13 }, children: "REDEEM TOKENS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...rajdhani, color: "#666666", fontSize: 13 }, children: tokens.canWithdraw ? "✅ Ready! Watch a short ad to redeem ₹1.25 directly to your wallet." : `Need ${tokens.tokensNeeded} more tokens to unlock redemption.` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              style: {
                ...orbitron,
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 12,
                padding: "14px 0",
                width: "100%",
                cursor: tokens.canWithdraw ? "pointer" : "not-allowed",
                opacity: tokens.canWithdraw ? 1 : 0.5,
                transition: "all 0.2s",
                border: `2px solid ${neonGreen}`,
                background: tokens.canWithdraw ? `${neonGreen}22` : "#E0E0E0",
                color: tokens.canWithdraw ? neonGreen : "#999999",
                boxShadow: tokens.canWithdraw ? `0 0 20px ${neonGreen}44` : "none"
              },
              onClick: handleWithdraw,
              disabled: !tokens.canWithdraw,
              "data-ocid": "earn.redeem.primary_button",
              children: tokens.canWithdraw ? "🎬 WATCH AD TO REDEEM ₹1.25" : "Collect 25 tokens to redeem"
            }
          ),
          !tokens.canWithdraw && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-3 text-center",
              style: {
                background: "#F0F0F0",
                border: `1px solid ${neonPurple}44`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between text-xs mb-1",
                    style: { ...rajdhani, color: "#666666" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        tokens.tokensForNextWithdrawal,
                        " tokens"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        tokens.TOKENS_FOR_WITHDRAWAL,
                        " needed"
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "relative h-2 rounded-full overflow-hidden",
                    style: { background: "#E0E0E0" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-y-0 left-0 rounded-full",
                        style: {
                          width: `${tokens.progressPct}%`,
                          background: `linear-gradient(90deg, ${neonPurple}, ${neonGreen})`
                        }
                      }
                    )
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
function TopEarnersSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-5 space-y-3",
      style: {
        background: lightCard,
        border: "1.5px solid #E0E0E0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
      },
      "data-ocid": "earn.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              fontFamily: "'Orbitron', sans-serif",
              color: "#9d4edd",
              fontSize: 13
            },
            children: "🏆 TOP EARNERS TODAY"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", padding: "24px 0", color: "#999999" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 32, marginBottom: 8 }, children: "📊" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontFamily: "'Rajdhani', sans-serif", fontSize: 15 }, children: "No earnings yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 12,
                color: "#BBBBBB",
                marginTop: 4
              },
              children: "Be the first to earn tokens!"
            }
          )
        ] })
      ]
    }
  );
}
function TodayAdStatsBar() {
  return null;
}
export {
  EarnPage,
  TodayAdStatsBar
};
