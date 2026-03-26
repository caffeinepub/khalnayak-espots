import { af as useUnifiedAuth, ag as useIIProfile, ah as useNavigate, am as useGetCallerStats, an as useGetCallerTeamRegistrations, x as useGetTournaments, I as useGetTeams, a4 as useTokens, j as jsxRuntimeExports, L as Card, T as CardContent, U as Button, ai as Link, ao as LogOut, H as formatCurrency, a5 as Trophy, M as CardHeader, O as CardTitle, ap as SiWhatsapp, aq as SiGmail, ar as SiInstagram, as as SiFacebook, a6 as Coins, W as getTournamentStatusLabel, a9 as ue } from "./index-ClVgYzE0.js";
import { B as Badge } from "./badge-6C6fq8F_.js";
import { P as Progress } from "./progress-x6LLIs58.js";
import { S as Skeleton } from "./skeleton-BkO_UgTX.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-3BxQk0f4.js";
import { b as getUserReferralStats, a as getReferralSettings } from "./useReferralSettings-DLrrXdXa.js";
import { b as getMyVouchers, C as Copy } from "./WalletPage-BxWj0aoq.js";
import { C as CircleCheck } from "./circle-check-D-szAEAU.js";
import { D as DollarSign } from "./dollar-sign-D5PLysiN.js";
import "./dialog-ALhz8Oja.js";
import "./label-CRko3C0C.js";
import "./index-C5UXs_Tl.js";
import "./table-BK3Bnisy.js";
function ProfilePage() {
  const { logoutAll } = useUnifiedAuth();
  const { profile } = useIIProfile();
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useGetCallerStats();
  const { data: registrations } = useGetCallerTeamRegistrations();
  const { data: tournaments } = useGetTournaments();
  const { data: teams } = useGetTeams();
  const tokens = useTokens();
  const myTournaments = (registrations == null ? void 0 : registrations.map((reg) => {
    const tournament = tournaments == null ? void 0 : tournaments.find((t) => t.id === reg.tournamentId);
    const team = teams == null ? void 0 : teams.find((t) => t.id === reg.teamId);
    return { registration: reg, tournament, team };
  })) || [];
  const handleLogout = () => {
    logoutAll();
    void navigate({ to: "/login" });
    ue.success("Logged out successfully");
  };
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "max-w-md mx-auto gaming-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "text-center py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Setting up your profile..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "neon-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/setup-profile", children: "Complete Setup" }) })
    ] }) }) });
  }
  const principalStr = profile.principal;
  const shortPrincipal = principalStr.length > 14 ? `${principalStr.slice(0, 8)}...${principalStr.slice(-4)}` : principalStr;
  const referralStats = getUserReferralStats(
    profile.referral_code
  );
  const myVouchers = getMyVouchers();
  const copyToClipboard = (text, label = "Copied!") => {
    navigator.clipboard.writeText(text).then(() => ue.success(label)).catch(() => ue.error("Copy failed"));
  };
  const referralLink = `https://khalnayak-espots-8pl.caffeine.xyz/ref/${profile.referral_code}`;
  const referralSettings = getReferralSettings();
  const referralEnabled = referralSettings.enabled;
  const shareMessage = `Join me on Khalnayak Espots! Use my referral code ${profile.referral_code} and get ₹0.50 welcome bonus! Download here: ${referralLink}`;
  const shareMessageEncoded = encodeURIComponent(shareMessage);
  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${shareMessageEncoded}`, "_blank");
  };
  const handleGmailShare = () => {
    const subject = encodeURIComponent("Join Khalnayak Espots & Get ₹2 Bonus!");
    const body = shareMessageEncoded;
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
      "_blank"
    );
  };
  const handleInstagramShare = () => {
    navigator.clipboard.writeText(shareMessage).then(() => ue.success("📷 Message copied! Paste it on Instagram.")).catch(() => ue.error("Copy failed"));
  };
  const handleFacebookShare = () => {
    const url = encodeURIComponent(referralLink);
    const quote = encodeURIComponent(
      `Join Khalnayak Espots! Use code ${profile.referral_code} and get ₹0.50 welcome bonus!`
    );
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
      "_blank"
    );
  };
  const handleCopyLink = () => {
    copyToClipboard(referralLink, "✅ Referral link copied!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto py-6 px-4 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "gaming-card mb-6",
        style: {
          background: "linear-gradient(135deg, rgba(22,33,62,0.95), rgba(10,10,10,0.95))",
          border: "1.5px solid rgba(0,255,136,0.2)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0",
                style: {
                  background: "linear-gradient(135deg, #00FF88, #9d4edd)",
                  color: "#0a0a0a",
                  fontFamily: "'Orbitron', sans-serif",
                  boxShadow: "0 0 20px rgba(0,255,136,0.4)"
                },
                children: profile.display_name.charAt(0).toUpperCase()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-xl font-bold truncate",
                  style: {
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#00FF88"
                  },
                  children: profile.display_name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs mt-0.5",
                  style: {
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "monospace"
                  },
                  children: shortPrincipal
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    style: {
                      background: "rgba(0,255,136,0.15)",
                      color: "#00FF88",
                      border: "1px solid rgba(0,255,136,0.3)",
                      fontSize: 10
                    },
                    children: "🎮 Free Fire"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    style: {
                      background: "rgba(157,78,221,0.15)",
                      color: "#9d4edd",
                      border: "1px solid rgba(157,78,221,0.3)",
                      fontSize: 10
                    },
                    children: "🔐 II Verified"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: handleLogout,
                "data-ocid": "profile.delete_button",
                style: { color: "rgba(255,100,100,0.7)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-4 p-3 rounded-xl",
              style: {
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,140,0,0.2)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-bold mb-2 uppercase tracking-widest",
                    style: {
                      color: "rgba(255,140,0,0.8)",
                      fontFamily: "'Orbitron', sans-serif"
                    },
                    children: "🔥 Free Fire Profile"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs",
                        style: { color: "rgba(255,255,255,0.4)" },
                        children: "Nickname"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", style: { color: "#FFD700" }, children: profile.freefire_nickname || "—" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs",
                        style: { color: "rgba(255,255,255,0.4)" },
                        children: "Level"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", style: { color: "#FFD700" }, children: profile.freefire_level || "—" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs",
                        style: { color: "rgba(255,255,255,0.4)" },
                        children: "UID"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm font-mono",
                        style: { color: "rgba(255,255,255,0.8)" },
                        children: profile.freefire_uid
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs",
                        style: { color: "rgba(255,255,255,0.4)" },
                        children: "Wallet"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", style: { color: "#00FF88" }, children: formatCurrency(BigInt(Math.floor(profile.wallet_balance))) })
                  ] })
                ] })
              ]
            }
          ),
          statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mt-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mt-4", children: [
            {
              label: "Matches",
              value: Number((stats == null ? void 0 : stats.tournamentsParticipated) ?? 0n),
              icon: Trophy
            },
            {
              label: "Wins",
              value: Number((stats == null ? void 0 : stats.tournamentsParticipated) ?? 0n),
              icon: CircleCheck
            },
            {
              label: "Earnings",
              value: formatCurrency((stats == null ? void 0 : stats.totalWinnings) ?? 0n),
              icon: DollarSign
            }
          ].map(({ label, value, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center p-3 rounded-xl",
              style: {
                background: "rgba(0,255,136,0.05)",
                border: "1px solid rgba(0,255,136,0.15)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 mb-1", style: { color: "#00FF88" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", style: { color: "white" }, children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs",
                    style: { color: "rgba(255,255,255,0.4)" },
                    children: label
                  }
                )
              ]
            },
            label
          )) })
        ] })
      }
    ),
    referralEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "gaming-card mb-6",
        style: {
          background: "rgba(10,10,10,0.95)",
          border: "1.5px solid rgba(157,78,221,0.35)",
          boxShadow: "0 0 24px rgba(157,78,221,0.12)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardTitle,
            {
              className: "text-sm tracking-widest uppercase",
              style: {
                fontFamily: "'Orbitron', sans-serif",
                color: "#9d4edd"
              },
              children: "🔗 Your Referral Code"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-4 rounded-xl mb-3",
                style: {
                  background: "linear-gradient(135deg, rgba(157,78,221,0.12), rgba(10,10,10,0.8))",
                  border: "1.5px solid rgba(157,78,221,0.4)",
                  boxShadow: "0 0 16px rgba(157,78,221,0.1)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "code",
                    {
                      className: "text-2xl font-bold tracking-[0.3em]",
                      style: { color: "#9d4edd", fontFamily: "monospace" },
                      children: profile.referral_code
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      "data-ocid": "profile.button",
                      onClick: handleCopyLink,
                      style: {
                        background: "linear-gradient(135deg, #9d4edd, #7c3aed)",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: 11,
                        letterSpacing: 1
                      },
                      children: "📋 COPY LINK"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 px-3 py-2 rounded-lg mb-4",
                style: {
                  background: "rgba(157,78,221,0.06)",
                  border: "1px solid rgba(157,78,221,0.15)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.35)", fontSize: 11 }, children: "🔗" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "code",
                    {
                      className: "text-xs flex-1 truncate",
                      style: {
                        color: "rgba(157,78,221,0.8)",
                        fontFamily: "monospace"
                      },
                      children: referralLink
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs font-bold uppercase tracking-widest mb-3",
                style: {
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'Orbitron', sans-serif"
                },
                children: "Share with Friends:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-5 gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.button",
                  onClick: handleWhatsAppShare,
                  className: "flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:scale-105",
                  style: {
                    background: "rgba(37,211,102,0.12)",
                    border: "1px solid rgba(37,211,102,0.3)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SiWhatsapp,
                      {
                        className: "h-6 w-6",
                        style: { color: "#25D366" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 9,
                          color: "#25D366",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 600
                        },
                        children: "WhatsApp"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.button",
                  onClick: handleGmailShare,
                  className: "flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:scale-105",
                  style: {
                    background: "rgba(234,67,53,0.12)",
                    border: "1px solid rgba(234,67,53,0.3)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SiGmail, { className: "h-6 w-6", style: { color: "#EA4335" } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 9,
                          color: "#EA4335",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 600
                        },
                        children: "Gmail"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.button",
                  onClick: handleInstagramShare,
                  className: "flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:scale-105",
                  style: {
                    background: "rgba(225,48,108,0.12)",
                    border: "1px solid rgba(225,48,108,0.3)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SiInstagram,
                      {
                        className: "h-6 w-6",
                        style: { color: "#E1306C" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 9,
                          color: "#E1306C",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 600
                        },
                        children: "Insta"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.button",
                  onClick: handleFacebookShare,
                  className: "flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:scale-105",
                  style: {
                    background: "rgba(24,119,242,0.12)",
                    border: "1px solid rgba(24,119,242,0.3)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SiFacebook,
                      {
                        className: "h-6 w-6",
                        style: { color: "#1877F2" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 9,
                          color: "#1877F2",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 600
                        },
                        children: "Facebook"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.button",
                  onClick: handleCopyLink,
                  className: "flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:scale-105",
                  style: {
                    background: "rgba(0,255,136,0.1)",
                    border: "1px solid rgba(0,255,136,0.3)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-6 w-6", style: { color: "#00FF88" } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 9,
                          color: "#00FF88",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 600
                        },
                        children: "Copy Link"
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-4",
                style: {
                  background: "linear-gradient(135deg, rgba(0,255,136,0.05), rgba(157,78,221,0.05))",
                  border: "1px solid rgba(0,255,136,0.15)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-bold uppercase tracking-widest mb-3",
                      style: {
                        fontFamily: "'Orbitron', sans-serif",
                        color: "#00FF88"
                      },
                      children: "📢 How to Refer & Earn"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: [
                    {
                      step: "1",
                      icon: "🔑",
                      text: "Get your unique referral code above"
                    },
                    {
                      step: "2",
                      icon: "📲",
                      text: "Share with friends on WhatsApp, Instagram, etc."
                    },
                    {
                      step: "3",
                      icon: "✅",
                      text: "Friend registers using your code"
                    },
                    {
                      step: "4",
                      icon: "💰",
                      text: "You get ₹2 in wallet instantly!"
                    }
                  ].map(({ step, icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                        style: {
                          background: "linear-gradient(135deg, #00FF88, #9d4edd)",
                          color: "#0a0a0a",
                          fontFamily: "'Orbitron', sans-serif"
                        },
                        children: step
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs",
                        style: { color: "rgba(255,255,255,0.75)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: icon }),
                          text
                        ]
                      }
                    )
                  ] }, step)) })
                ]
              }
            ),
            referralStats.totalReferrals > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-xs mt-3 text-center",
                style: { color: "rgba(255,255,255,0.4)" },
                children: [
                  "Total referrals: ",
                  referralStats.totalReferrals,
                  " • Earned:",
                  " ",
                  formatCurrency(
                    BigInt(Math.floor(referralStats.totalEarnings))
                  )
                ]
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "gaming-card mb-6",
        style: {
          background: "rgba(10,10,10,0.9)",
          border: "1.5px solid rgba(255,215,0,0.25)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-5 w-5 text-yellow-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-sm font-bold",
                  style: {
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#FFD700"
                  },
                  children: "Tokens"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xl font-bold",
                style: { color: "#FFD700", fontFamily: "'Orbitron', sans-serif" },
                children: tokens.balance
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: tokens.balance % 25 * 4, className: "mt-2 h-1.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-xs mt-1",
              style: { color: "rgba(255,255,255,0.35)" },
              children: [
                tokens.balance % 25,
                "/",
                25,
                " to next ₹1.25 redeem"
              ]
            }
          )
        ] })
      }
    ),
    myVouchers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "gaming-card mb-6",
        style: {
          background: "rgba(10,10,10,0.9)",
          border: "1.5px solid rgba(0,255,136,0.15)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardTitle,
            {
              className: "text-sm tracking-widest uppercase",
              style: { fontFamily: "'Orbitron', sans-serif", color: "#00FF88" },
              children: "🎟️ My Play Vouchers"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: myVouchers.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `profile.item.${i + 1}`,
              className: "flex items-center justify-between p-2 rounded-lg",
              style: {
                background: "rgba(0,255,136,0.06)",
                border: "1px solid rgba(0,255,136,0.15)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "code",
                    {
                      className: "text-sm font-mono",
                      style: { color: "#00FF88" },
                      children: v.code
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs",
                      style: { color: "rgba(255,255,255,0.4)" },
                      children: [
                        formatCurrency(BigInt(Math.floor(v.amount))),
                        " •",
                        " ",
                        new Date(v.createdAt).toLocaleDateString()
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    "data-ocid": `profile.button.${i + 1}`,
                    onClick: () => copyToClipboard(v.code, "✅ Voucher code copied!"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" })
                  }
                )
              ]
            },
            v.code
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "gaming-card",
        style: {
          background: "rgba(10,10,10,0.9)",
          border: "1.5px solid rgba(0,255,136,0.15)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardTitle,
            {
              className: "text-sm tracking-widest uppercase",
              style: { fontFamily: "'Orbitron', sans-serif", color: "#00FF88" },
              children: "⚔️ My Tournaments"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "upcoming", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsList,
              {
                className: "w-full mb-4",
                style: { background: "rgba(255,255,255,0.05)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "upcoming", "data-ocid": "profile.tab", children: "Upcoming" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "live", "data-ocid": "profile.tab", children: "Live" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "completed", "data-ocid": "profile.tab", children: "Completed" })
                ]
              }
            ),
            ["upcoming", "live", "completed"].map((status) => {
              const filtered = myTournaments.filter(
                ({ tournament }) => tournament && getTournamentStatusLabel(tournament.status).toLowerCase() === status
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: status, children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "profile.empty_state",
                  className: "text-center py-8",
                  style: { color: "rgba(255,255,255,0.35)" },
                  children: [
                    "No ",
                    status,
                    " tournaments"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: filtered.map(
                ({ registration, tournament, team }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "data-ocid": `profile.item.${idx + 1}`,
                    className: "p-3 rounded-xl",
                    style: {
                      background: "rgba(0,255,136,0.05)",
                      border: "1px solid rgba(0,255,136,0.15)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm font-bold",
                            style: {
                              fontFamily: "'Orbitron', sans-serif",
                              color: "white",
                              fontSize: 11
                            },
                            children: tournament == null ? void 0 : tournament.name
                          }
                        ),
                        team && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: "text-xs mt-0.5",
                            style: { color: "rgba(255,255,255,0.5)" },
                            children: [
                              "Team: ",
                              team.name
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          style: {
                            background: status === "live" ? "rgba(255,68,68,0.2)" : status === "completed" ? "rgba(0,255,136,0.1)" : "rgba(255,215,0,0.1)",
                            color: status === "live" ? "#FF4444" : status === "completed" ? "#00FF88" : "#FFD700",
                            border: `1px solid ${status === "live" ? "rgba(255,68,68,0.3)" : status === "completed" ? "rgba(0,255,136,0.2)" : "rgba(255,215,0,0.2)"}`,
                            fontSize: 9,
                            textTransform: "uppercase"
                          },
                          children: status
                        }
                      )
                    ] })
                  },
                  registration.id
                )
              ) }) }, status);
            })
          ] }) })
        ]
      }
    )
  ] });
}
export {
  ProfilePage
};
