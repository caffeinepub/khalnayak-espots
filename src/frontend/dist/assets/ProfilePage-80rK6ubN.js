import { c as createLucideIcon, aj as useInternetIdentity, ak as useIIProfile, al as useNavigate, am as useGetCallerStats, an as useGetCallerTeamRegistrations, w as useGetTournaments, H as useGetTeams, a3 as useTokens, j as jsxRuntimeExports, K as Card, L as CardHeader, ah as User, M as CardTitle, Q as CardContent, T as Button, af as Link, ao as LogOut, G as formatCurrency, a4 as Trophy, ap as SiWhatsapp, aq as SiFacebook, a5 as Coins, V as getTournamentStatusLabel, a8 as ue } from "./index-Cj-vXlhi.js";
import { B as Badge } from "./badge-BzY5GBQ7.js";
import { P as Progress } from "./progress-0Iq4AhMd.js";
import { S as Skeleton } from "./skeleton-D78wXFGT.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DzFWbLC3.js";
import { a as getUserReferralStats } from "./useReferral-xU0gmKv1.js";
import { b as getMyVouchers, C as Copy } from "./WalletPage-eNGNz4eq.js";
import { C as CircleCheck } from "./circle-check-BDhueuku.js";
import { D as DollarSign } from "./dollar-sign-UP8DY0Mb.js";
import "./dialog-CI-cXdLV.js";
import "./label-x4-k03G8.js";
import "./index--XCWbFMX.js";
import "./table-CA5XqtJO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function ProfilePage() {
  const { identity, clear } = useInternetIdentity();
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
    clear();
    void navigate({ to: "/login" });
    ue.success("Logged out successfully");
  };
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "max-w-md mx-auto gaming-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          User,
          {
            className: "h-16 w-16 mx-auto mb-4",
            style: { color: "rgba(255,255,255,0.2)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { style: { fontFamily: "'Orbitron', sans-serif" }, children: "Login Required" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Please login to view your profile." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "neon-btn w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Login with Internet Identity" }) })
      ] })
    ] }) });
  }
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "gaming-card mb-6",
        style: {
          background: "rgba(10,10,10,0.9)",
          border: "1.5px solid rgba(157,78,221,0.25)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardTitle,
            {
              className: "text-sm tracking-widest uppercase",
              style: { fontFamily: "'Orbitron', sans-serif", color: "#9d4edd" },
              children: "🔗 Referral Code"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 p-3 rounded-xl mb-3",
                style: {
                  background: "rgba(157,78,221,0.1)",
                  border: "1px solid rgba(157,78,221,0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "code",
                    {
                      className: "flex-1 text-lg font-bold tracking-widest text-center",
                      style: { color: "#9d4edd", fontFamily: "monospace" },
                      children: profile.referral_code
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      "data-ocid": "profile.button",
                      onClick: () => copyToClipboard(
                        profile.referral_code,
                        "✅ Referral code copied!"
                      ),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4", style: { color: "#9d4edd" } })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs",
                  style: { color: "rgba(255,255,255,0.4)" },
                  children: "Share:"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.button",
                  onClick: () => window.open(
                    `https://wa.me/?text=Join%20KL%20Esports%20Life%20with%20my%20code%20${profile.referral_code}`,
                    "_blank"
                  ),
                  style: { color: "#25D366" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiWhatsapp, { className: "h-5 w-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.button",
                  onClick: () => window.open(
                    `https://t.me/share/url?url=Join%20KL%20Esports%20with%20code%20${profile.referral_code}`,
                    "_blank"
                  ),
                  style: { color: "#2AABEE" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-5 w-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.button",
                  onClick: () => window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=klespots&quote=Join+with+code+${profile.referral_code}`,
                    "_blank"
                  ),
                  style: { color: "#1877F2" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiFacebook, { className: "h-5 w-5" })
                }
              )
            ] }),
            referralStats.totalReferrals > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-xs mt-3",
                style: { color: "rgba(255,255,255,0.4)" },
                children: [
                  "Total referrals: ",
                  referralStats.totalReferrals,
                  " • Earned:",
                  " ",
                  formatCurrency(BigInt(Math.floor(referralStats.totalEarnings)))
                ]
              }
            )
          ] })
        ]
      }
    ),
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
