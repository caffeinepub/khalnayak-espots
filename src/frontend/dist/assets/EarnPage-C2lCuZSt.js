import { r as reactExports, O as useInternetIdentity, E as useTokens, j as jsxRuntimeExports, B as Button, I as ue, L as LoaderCircle } from "./index-DXLNnwaf.js";
import { g as getAdUnitId, A as ADMOB_CONFIG, a as AdModal } from "./AdModal-RJ42nA-D.js";
import { L as LogIn } from "./log-in-DA1U--Lo.js";
import { P as Play } from "./play-CPyrF83a.js";
import "./progress-DRsgvwvj.js";
import "./circle-check-ClB7M1Jx.js";
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
const darkCard = "#16213E";
const darkBg = "#0A0A0A";
const orbitron = {
  fontFamily: "'Orbitron', sans-serif"
};
const rajdhani = {
  fontFamily: "'Rajdhani', sans-serif"
};
const TOP_EARNERS = [
  { rank: 1, name: "FireMaster99", tokens: 142, medal: "🥇" },
  { rank: 2, name: "SnipeKing_07", tokens: 118, medal: "🥈" },
  { rank: 3, name: "BladeRunner_X", tokens: 97, medal: "🥉" }
];
function EarnPage() {
  const { identity, login } = useInternetIdentity();
  const tokens = useTokens();
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4",
        style: { background: darkBg },
        "data-ocid": "earn.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-full p-6",
              style: {
                border: `2px solid ${neonGreen}`,
                boxShadow: `0 0 24px ${neonGreen}55`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "💰" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "text-3xl font-bold mb-2",
                style: {
                  ...orbitron,
                  color: neonGreen,
                  textShadow: `0 0 16px ${neonGreen}`
                },
                children: "EARN REAL MONEY"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...rajdhani, color: "#aaa", fontSize: 16 }, children: "Watch Ads → Tokens → Cashout" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: login,
              size: "lg",
              className: "font-bold px-8 text-base",
              style: {
                ...orbitron,
                background: `linear-gradient(90deg, ${neonGreen}, #00cc6a)`,
                color: "#000",
                boxShadow: `0 0 20px ${neonGreen}88`,
                border: "none"
              },
              "data-ocid": "earn.primary_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "mr-2 h-5 w-5" }),
                "LOGIN TO EARN"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen pb-28",
      style: { background: darkBg },
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...rajdhani, color: "#aaa", fontSize: 15, marginTop: 4 }, children: "Watch Ads → Tokens → Cashout" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5 text-center",
              style: {
                background: darkCard,
                border: `1.5px solid ${neonGreen}66`,
                boxShadow: `0 0 32px ${neonGreen}22`
              },
              "data-ocid": "earn.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      ...rajdhani,
                      color: "#aaa",
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
                background: darkCard,
                border: `1.5px solid ${neonPurple}55`
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
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { ...rajdhani, color: "#ccc", fontSize: 14 }, children: [
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
                    style: { background: "#1a1a2e" },
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
                      color: tokens.canWithdraw ? neonGreen : "#aaa",
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
          background: darkCard,
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...rajdhani, color: "#aaa", fontSize: 13 }, children: adOpen && timer > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: neonGreen }, children: [
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
  const [method, setMethod] = reactExports.useState(null);
  const handleComplete = reactExports.useCallback(() => {
    setAdOpen(false);
    const success = tokens.withdrawTokens();
    if (success) {
      ue.success(
        `💰 ₹${tokens.RUPEES_PER_WITHDRAWAL} Wallet mein add ho gaye!`,
        {
          description: `${tokens.TOKENS_FOR_WITHDRAWAL} tokens deduct ho gaye via ${method == null ? void 0 : method.toUpperCase()}.`,
          duration: 5e3
        }
      );
    }
    setMethod(null);
  }, [tokens, method]);
  const handleCancel = reactExports.useCallback(() => {
    setAdOpen(false);
    setMethod(null);
  }, []);
  const handleWithdraw = (m) => {
    if (!tokens.canWithdraw) {
      ue.error(`${tokens.tokensNeeded} more tokens needed to withdraw`);
      return;
    }
    setMethod(m);
    setAdOpen(true);
  };
  const btnBase = {
    ...orbitron,
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 10,
    padding: "12px 0",
    cursor: tokens.canWithdraw ? "pointer" : "not-allowed",
    opacity: tokens.canWithdraw ? 1 : 0.5,
    transition: "all 0.2s",
    flex: 1,
    border: `1.5px solid ${neonGreen}66`,
    background: tokens.canWithdraw ? `${neonGreen}18` : "#1a1a2e",
    color: tokens.canWithdraw ? neonGreen : "#666"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdModal,
      {
        isOpen: adOpen,
        onComplete: handleComplete,
        onCancel: handleCancel,
        duration: WITHDRAWAL_AD_SECONDS,
        title: `Withdraw via ${method == null ? void 0 : method.toUpperCase()}`,
        rewardLabel: `₹${tokens.RUPEES_PER_WITHDRAWAL}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-5 space-y-3",
        style: { background: darkCard, border: `1.5px solid ${neonGreen}44` },
        "data-ocid": "earn.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...orbitron, color: neonGreen, fontSize: 13 }, children: "WITHDRAWAL METHODS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...rajdhani, color: "#aaa", fontSize: 13 }, children: tokens.canWithdraw ? "✅ Ready! Choose withdrawal method below." : `Need ${tokens.tokensNeeded} more tokens to unlock withdrawal.` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                style: btnBase,
                onClick: () => handleWithdraw("upi"),
                "data-ocid": "earn.toggle",
                children: "💳 UPI"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                style: btnBase,
                onClick: () => handleWithdraw("voucher"),
                "data-ocid": "earn.toggle",
                children: "🎟️ VOUCHER"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                style: btnBase,
                onClick: () => handleWithdraw("bank"),
                "data-ocid": "earn.toggle",
                children: "🏦 BANK"
              }
            )
          ] }),
          !tokens.canWithdraw && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-3 text-center",
              style: {
                background: "#1a1a2e",
                border: `1px solid ${neonPurple}44`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between text-xs mb-1",
                    style: { ...rajdhani, color: "#888" },
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
                    style: { background: "#111" },
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
        background: darkCard,
        border: `1.5px solid ${neonPurple}66`,
        boxShadow: `0 0 24px ${neonPurple}22`
      },
      "data-ocid": "earn.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...orbitron, color: neonPurple, fontSize: 13 }, children: "🏆 TOP EARNERS TODAY" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: TOP_EARNERS.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between rounded-xl px-4 py-3",
            style: {
              background: i === 0 ? `${neonGreen}18` : `${neonPurple}11`,
              border: `1px solid ${i === 0 ? neonGreen : neonPurple}44`
            },
            "data-ocid": `earn.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 22 }, children: e.medal }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      ...rajdhani,
                      color: i === 0 ? neonGreen : "#ccc",
                      fontSize: 16,
                      fontWeight: 600
                    },
                    children: e.name
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  style: {
                    ...orbitron,
                    color: i === 0 ? neonGreen : neonPurple,
                    fontSize: 14
                  },
                  children: [
                    e.tokens,
                    " 🪙"
                  ]
                }
              )
            ]
          },
          e.rank
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              ...rajdhani,
              color: "#666",
              fontSize: 12,
              textAlign: "center"
            },
            children: "Resets daily at midnight • Top earner wins bonus tokens!"
          }
        )
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
