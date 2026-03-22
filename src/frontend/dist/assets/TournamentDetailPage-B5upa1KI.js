import { c as createLucideIcon, j as jsxRuntimeExports, a2 as TriangleAlert, U as Button, ai as Link, ax as useParams, ay as useGetTournamentById, az as useGetCallerWallet, af as useOtpAuth, I as useGetTeams, B as useGetTeamRegistrations, aA as useGetLeaderboard, am as useNavigate, aB as useVpnStatus, r as reactExports, a9 as ue, L as Card, W as getTournamentStatusLabel, V as getTournamentTypeLabel, aC as getTournamentPlayerInfo, M as CardHeader, O as CardTitle, T as CardContent, H as formatCurrency, a5 as Trophy, aD as getTournamentPrizeInfo, Q as CardDescription, a4 as useTokens, aE as useRegisterTeam, aa as LoaderCircle } from "./index-Dpv3UsAm.js";
import { C as CountdownTimer, I as InterstitialOverlay } from "./CountdownTimer-BjZGI2Ma.js";
import { a as AdModal } from "./AdModal-BZX5vAQp.js";
import { B as Badge } from "./badge-DvQPMbiJ.js";
import { u as useGetCheaterFlags, S as ShieldAlert } from "./useCheaterDetection-BDfkvGxI.js";
import { C as Checkbox } from "./checkbox-C2wwWStz.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-Bd0h5Bg_.js";
import { L as Label, I as Input } from "./label-Za_s4FV5.js";
import { S as Skeleton } from "./skeleton-eDjSXqfc.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Jdq1DAxu.js";
import { f as fetchFFPlayerByUID } from "./freefirePlayerLookup-Pc_1aR9y.js";
import { C as Calendar } from "./calendar-BHDZgy8y.js";
import { D as DollarSign } from "./dollar-sign-rmXODuMa.js";
import { U as Users } from "./users-mhVBMj3v.js";
import "./progress-dG-8mr28.js";
import "./play-DyyWCoZN.js";
import "./circle-check-iZhDw_zL.js";
import "./index-CTOiQXiI.js";
import "./check-Cb50Y2ay.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function CheaterAutoFlagBanner({
  tournamentId
}) {
  const { flags } = useGetCheaterFlags();
  const activeFlagsInTournament = flags.filter(
    (f) => f.tournamentId === tournamentId && f.status === "flagged"
  );
  if (activeFlagsInTournament.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-4 space-y-3",
      style: {
        background: "rgba(220,0,0,0.08)",
        border: "1px solid rgba(220,0,0,0.35)",
        boxShadow: "0 0 20px rgba(220,0,0,0.1)"
      },
      "data-ocid": "security.banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0",
              style: { background: "rgba(220,0,0,0.15)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 text-destructive" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-destructive text-sm", children: "⚠️ Auto-flagged player detected in this tournament" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Suspicious activity detected. Admin review in progress." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "flex-shrink-0", children: [
            activeFlagsInTournament.length,
            " Alert",
            activeFlagsInTournament.length > 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: activeFlagsInTournament.map((flag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 px-3 py-2 rounded-lg",
            style: {
              background: "rgba(220,0,0,0.06)",
              border: "1px solid rgba(220,0,0,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-destructive mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground truncate", children: [
                  flag.playerName,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                    "(",
                    flag.ffId,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: flag.reason })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "flex-shrink-0 text-xs border-destructive/40 text-destructive",
                  children: [
                    flag.kills,
                    " kills"
                  ]
                }
              )
            ]
          },
          flag.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            size: "sm",
            className: "border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive",
            "data-ocid": "security.secondary_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: "View in Admin Panel →" })
          }
        ) })
      ]
    }
  );
}
function TournamentDetailPage() {
  const { id } = useParams({ from: "/tournament/$id" });
  const tournamentId = BigInt(id);
  const { data: tournament, isLoading } = useGetTournamentById(tournamentId);
  const { data: wallet } = useGetCallerWallet();
  const { identity, login } = useOtpAuth();
  const { data: teams } = useGetTeams();
  const { data: registrations } = useGetTeamRegistrations();
  const { data: leaderboard } = useGetLeaderboard(
    tournamentId,
    (tournament == null ? void 0 : tournament.status) === "ongoing"
  );
  const navigate = useNavigate();
  const { isVpnDetected } = useVpnStatus();
  reactExports.useEffect(() => {
    if ((tournament == null ? void 0 : tournament.status) === "ongoing" && isVpnDetected) {
      ue.error("VPN detected! You have been disconnected from the match.", {
        duration: 5e3
      });
      navigate({ to: "/tournaments" });
    }
  }, [isVpnDetected, tournament == null ? void 0 : tournament.status, navigate]);
  const tournamentRegistrations = (registrations == null ? void 0 : registrations.filter((r) => r.tournamentId === tournamentId)) || [];
  const registeredTeamIds = new Set(
    tournamentRegistrations.map((r) => r.teamId)
  );
  const registeredTeams = (teams == null ? void 0 : teams.filter((t) => registeredTeamIds.has(t.id))) || [];
  const isUserRegistered = tournamentRegistrations.some(
    (r) => identity && r.captainId.toString() === identity.getPrincipal().toString()
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96" }) });
  }
  if (!tournament) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Tournament not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tournaments", children: "Back to Tournaments" }) })
    ] }) });
  }
  const hasWallet = wallet !== null && wallet !== void 0;
  const canRegister = tournament.status === "upcoming" && !isUserRegistered;
  const isFree = tournament.entryFee === 0n;
  const showRoomCredentials = tournament.status === "ongoing" && isUserRegistered && tournament.roomId && tournament.roomPassword;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-12 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: tournament.status === "ongoing" ? "bg-destructive" : "bg-secondary",
            children: getTournamentStatusLabel(tournament.status)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: getTournamentTypeLabel(tournament.tournamentType) }),
        isFree && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            style: {
              background: "linear-gradient(135deg, #00FF88, #00cc6a)",
              color: "#000",
              fontWeight: 700
            },
            children: "🎟️ FREE ENTRY"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold font-display mb-2", children: tournament.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        getTournamentTypeLabel(tournament.tournamentType),
        " —",
        " ",
        getTournamentPlayerInfo(tournament.tournamentType).description
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          "Start Time"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: tournament.status === "upcoming" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownTimer, { targetTime: tournament.startTime, compact: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: tournament.status === "ongoing" ? "Live Now" : "Completed" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4" }),
          "Entry Fee"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display", children: isFree ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#00FF88" }, children: "FREE" }) : formatCurrency(tournament.entryFee) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }),
          "Prize Pool"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isFree ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", style: { color: "#ffd700" }, children: "🥇🥈🥉 Badges" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-primary", children: formatCurrency(tournament.prizePool) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
          "Teams Registered"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold font-display", children: [
          registeredTeams.length,
          " / ",
          tournament.maxTeams.toString()
        ] }) })
      ] })
    ] }),
    showRoomCredentials && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-5 space-y-4",
        style: { background: "#0d1117", border: "1.5px solid #00FF8844" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "flex items-center gap-2 font-bold text-base",
              style: { fontFamily: "Orbitron, sans-serif", color: "#00FF88" },
              children: "🔑 MATCH DETAILS"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs",
                style: { color: "#888", fontFamily: "Rajdhani, sans-serif" },
                children: "Room ID"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xl font-mono font-bold",
                  style: { color: "#fff", letterSpacing: "0.08em" },
                  children: tournament.roomId
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "room.copy_button",
                  onClick: () => {
                    navigator.clipboard.writeText(tournament.roomId ?? "");
                    ue.success("✅ Copied!");
                  },
                  style: {
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: 8,
                    border: "1.5px solid #00FF88",
                    background: "#00FF8822",
                    color: "#00FF88",
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  },
                  children: "📋 COPY ROOM ID"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs",
                style: { color: "#888", fontFamily: "Rajdhani, sans-serif" },
                children: "Password"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xl font-mono font-bold",
                  style: { color: "#fff", letterSpacing: "0.08em" },
                  children: tournament.roomPassword
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "password.copy_button",
                  onClick: () => {
                    navigator.clipboard.writeText(tournament.roomPassword ?? "");
                    ue.success("✅ Copied!");
                  },
                  style: {
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: 8,
                    border: "1.5px solid #00FF88",
                    background: "#00FF8822",
                    color: "#00FF88",
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  },
                  children: "📋 COPY PASSWORD"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "details", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "details", children: "Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "teams", children: "Registered Teams" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "leaderboard", children: "Leaderboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "details", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Tournament Rules" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Game Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: getTournamentTypeLabel(tournament.tournamentType) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4" }),
              " General Rules"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-disc list-inside", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All players must have valid Free Fire IDs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Room ID and password will be shared 15 minutes before the match" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Screenshot proof required for kills" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Anti-cheat policy: Hackers will be banned permanently" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Fair play is mandatory" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3", children: "Prize Distribution" }),
            isFree ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg p-4 text-center space-y-2",
                style: {
                  background: "rgba(255,215,0,0.08)",
                  border: "1px solid rgba(255,215,0,0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-yellow-400 text-lg", children: "🏆 Free Tournament — Winners Get Badges!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-6 text-2xl mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "🥇" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "1st Place" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "🥈" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "2nd Place" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "🥉" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "3rd Place" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "₹0 prize pool — Play for glory and exclusive badges!" })
                ]
              }
            ) : (() => {
              const prizeInfo = getTournamentPrizeInfo(
                tournament.tournamentType
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-destructive font-medium", children: [
                    "Platform Commission: ",
                    prizeInfo.commissionPct,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
                    "Prize Pool: ",
                    prizeInfo.prizePct,
                    "%"
                  ] })
                ] }),
                prizeInfo.prizeBreakdown.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/30 overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wide", children: "Prize Breakdown" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: prizeInfo.prizeBreakdown.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center justify-between px-3 py-2 text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: item.label }),
                          item.note && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs font-bold text-primary", children: item.note })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                          item.pct,
                          "%"
                        ] })
                      ]
                    },
                    item.label
                  )) })
                ] })
              ] });
            })()
          ] }),
          (tournament.tournamentType === "battleground" || tournament.tournamentType === "custom4v4") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Scoring System" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-disc list-inside", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "1 point per kill" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Placement points: 1st:12, 2nd:9, 3rd:8, 4th:7, 5th:6, 6th:5, 7th:4, 8th:3, 9th:2, 10th:1, 11th–48th:0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Total score = Kill points + Placement points" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Most Kills prize: minimum 6 kills zaroori — tie-breaker: pehle kill wala jeets" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Entry Fee: ₹10 per player | Total Collection: ₹480 (48 players)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Platform Commission: 35% (₹168) | Prize Pool: 65% (₹312)" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "teams", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
          "Registered Teams (",
          registeredTeams.length,
          ")"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: registeredTeams.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: registeredTeams.map((team) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-border rounded-lg p-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: team.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm", children: team.members.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: member.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: member.freeFireId })
                  ]
                },
                member.freeFireId
              )) })
            ]
          },
          team.id.toString()
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-center text-muted-foreground py-8",
            "data-ocid": "teams.empty_state",
            children: "No teams registered yet"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "leaderboard", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheaterAutoFlagBanner, { tournamentId: id }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Live Leaderboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Rankings update in real-time during the tournament" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: leaderboard && leaderboard.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: leaderboard.map((entry, idx) => {
            const team = teams == null ? void 0 : teams.find((t) => t.id === entry.teamId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center justify-between p-3 rounded-lg border ${idx === 0 ? "border-primary bg-primary/5" : "border-border"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `font-bold font-display text-xl ${idx === 0 ? "text-primary" : ""}`,
                        children: [
                          "#",
                          idx + 1
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: (team == null ? void 0 : team.name) || "Unknown Team" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        "Kills:",
                        " "
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: entry.kills.toString() })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        "Points:",
                        " "
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: entry.totalPoints.toString() })
                    ] })
                  ] })
                ]
              },
              entry.teamId.toString()
            );
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: tournament.status === "upcoming" ? "Leaderboard will be available once the tournament starts" : "No scores yet" }) })
        ] })
      ] })
    ] }),
    canRegister && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        style: {
          border: "1px solid rgba(0,255,136,0.3)",
          background: "rgba(0,255,136,0.04)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-1", children: "Ready to compete?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isFree ? "Free entry! Watch a short ad and join instantly." : hasWallet ? `Your wallet balance: ${formatCurrency(wallet.balance)}` : identity ? "Set up your profile to create a wallet" : "Login to register" })
          ] }),
          identity ? hasWallet ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            RegistrationDialog,
            {
              tournament,
              walletBalance: wallet.balance
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Please complete your profile setup first to create a wallet, then you can register for tournaments." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "lg",
                variant: "outline",
                className: "border-primary text-primary hover:bg-primary/10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/profile",
                    "data-ocid": "tournament.secondary_button",
                    children: "Complete Profile Setup"
                  }
                )
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: login,
              size: "lg",
              className: "font-bold uppercase tracking-wider",
              style: {
                background: "linear-gradient(135deg, #00FF88, #00cc6a)",
                color: "#000",
                boxShadow: "0 0 20px rgba(0,255,136,0.5)",
                fontFamily: "'Orbitron', sans-serif"
              },
              "data-ocid": "tournament.primary_button",
              children: "🔐 Login to Register"
            }
          )
        ] }) })
      }
    )
  ] });
}
const FF_REGIONS = [
  { value: "ind", label: "🇮🇳 IND (India)" },
  { value: "pk", label: "🇵🇰 PK (Pakistan)" },
  { value: "id", label: "🇮🇩 ID (Indonesia)" },
  { value: "sg", label: "🇸🇬 SG (Singapore)" }
];
function RegistrationDialog({
  tournament,
  walletBalance
}) {
  const isFree = tournament.entryFee === 0n;
  const [flowState, setFlowState] = reactExports.useState("idle");
  const [showInterstitial, setShowInterstitial] = reactExports.useState(false);
  const [nickname, setNickname] = reactExports.useState("");
  const [uid, setUid] = reactExports.useState("");
  const [confirmed, setConfirmed] = reactExports.useState(false);
  const [formTouched, setFormTouched] = reactExports.useState(false);
  const [uidError, setUidError] = reactExports.useState("");
  const [region, setRegion] = reactExports.useState("ind");
  const [uidFetchStatus, setUidFetchStatus] = reactExports.useState("idle");
  const [fetchedNickname, setFetchedNickname] = reactExports.useState("");
  const [fetchedLevel, setFetchedLevel] = reactExports.useState(
    void 0
  );
  const [fetchedRegionName, setFetchedRegionName] = reactExports.useState("");
  const [isNicknameAutoFilled, setIsNicknameAutoFilled] = reactExports.useState(false);
  const [manualEntryMode, setManualEntryMode] = reactExports.useState(false);
  const debounceTimerRef = reactExports.useRef(null);
  const navigate = useNavigate();
  const tokens = useTokens();
  const registerMutation = useRegisterTeam();
  const validateUid = (value) => {
    if (!value.trim()) return "Free Fire UID required hai.";
    if (!/^\d+$/.test(value)) return "⚠️ UID sirf numbers mein hona chahiye.";
    if (value.length < 8 || value.length > 12)
      return "⚠️ UID 8-12 digits ka hona chahiye.";
    return "";
  };
  reactExports.useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (uid.length < 8 || uid.length > 12 || !/^\d+$/.test(uid)) {
      if (uid.length > 0 && uid.length < 8) {
        setUidFetchStatus("idle");
        setManualEntryMode(false);
      } else if (uid.length === 0) {
        setUidFetchStatus("idle");
        setFetchedNickname("");
        setManualEntryMode(false);
      }
      return;
    }
    setManualEntryMode(false);
    setUidFetchStatus("loading");
    debounceTimerRef.current = setTimeout(async () => {
      var _a;
      const result = await fetchFFPlayerByUID(
        uid,
        region
      );
      if (result.success && ((_a = result.player) == null ? void 0 : _a.nickname)) {
        setFetchedNickname(result.player.nickname);
        setFetchedLevel(result.player.level);
        setFetchedRegionName(result.player.region || "");
        setUidFetchStatus("success");
        setNickname(result.player.nickname);
        setIsNicknameAutoFilled(true);
      } else if (result.error === "network_error") {
        setUidFetchStatus("network_error");
        setFetchedNickname("");
        setFetchedLevel(void 0);
        setFetchedRegionName("");
      } else {
        setUidFetchStatus("error");
        setFetchedNickname("");
        setFetchedLevel(void 0);
        setFetchedRegionName("");
      }
    }, 500);
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [uid, region]);
  const isUidAlreadyRegistered = (uidValue) => {
    try {
      const key = `ke_registered_uids_${tournament.id.toString()}`;
      const stored = localStorage.getItem(key);
      const list = stored ? JSON.parse(stored) : [];
      return list.includes(uidValue);
    } catch {
      return false;
    }
  };
  const saveRegisteredUid = (uidValue) => {
    try {
      const key = `ke_registered_uids_${tournament.id.toString()}`;
      const stored = localStorage.getItem(key);
      const list = stored ? JSON.parse(stored) : [];
      if (!list.includes(uidValue)) {
        list.push(uidValue);
        localStorage.setItem(key, JSON.stringify(list));
      }
    } catch {
    }
  };
  const handleWatchAdClick = () => {
    setFlowState("adPlaying");
  };
  const handleAdComplete = () => {
    tokens.earnToken();
    ue.success("🪙 +1 Token earned!", {
      description: "Token credited! Ab registration complete karo."
    });
    setFlowState("formOpen");
  };
  const handleAdCancel = () => {
    setFlowState("idle");
    ue.error("Ad pura nahi dekha.", {
      description: "Registration ke liye poora ad dekhna zaroori hai."
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true);
    if (!nickname.trim()) {
      ue.error("Nickname required hai.");
      return;
    }
    const uidValidationError = validateUid(uid);
    if (uidValidationError) {
      setUidError(uidValidationError);
      return;
    }
    if (isUidAlreadyRegistered(uid)) {
      setUidError("⚠️ This UID is already registered for this tournament.");
      return;
    }
    if (!confirmed) {
      ue.error("Please confirm to continue.");
      return;
    }
    if (!isFree && walletBalance < tournament.entryFee) {
      ue.error("Insufficient wallet balance.", {
        description: "Wallet mein paisa add karo phir try karo."
      });
      return;
    }
    setFlowState("registering");
    try {
      const player = { name: nickname, freeFireId: uid };
      await registerMutation.mutateAsync({
        tournamentId: tournament.id,
        teamName: nickname,
        members: [player],
        substitutes: null
      });
      saveRegisteredUid(uid);
      setFlowState("done");
      ue.success("✅ Registration successful!", {
        description: `${nickname} tournament mein register ho gaya!`
      });
      setShowInterstitial(true);
    } catch (error) {
      setFlowState("formOpen");
      let errorMessage = "Registration failed. Please try again.";
      if (error == null ? void 0 : error.message) {
        if (error.message.includes("Insufficient balance")) {
          errorMessage = "Insufficient wallet balance.";
        } else if (error.message.includes("already registered")) {
          errorMessage = "You are already registered for this tournament.";
        } else if (error.message.includes("full")) {
          errorMessage = "This tournament is full.";
        } else {
          errorMessage = error.message;
        }
      }
      ue.error("Registration Failed", { description: errorMessage });
    }
  };
  const handleInterstitialDismiss = () => {
    setShowInterstitial(false);
    setTimeout(() => {
      navigate({ to: "/my-matches" });
    }, 100);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdModal,
      {
        isOpen: flowState === "adPlaying",
        onComplete: handleAdComplete,
        onCancel: handleAdCancel,
        duration: 30,
        title: "Watch Ad to Join Free",
        rewardLabel: "+1 Token Bonus"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InterstitialOverlay,
      {
        isOpen: showInterstitial,
        onDismiss: handleInterstitialDismiss
      }
    ),
    flowState === "idle" || flowState === "adPlaying" ? (
      /* Step 1: Show the Watch Ad & Join button */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleWatchAdClick,
            className: "relative px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3",
            style: {
              background: "linear-gradient(135deg, #00FF88, #00cc6a)",
              color: "#000",
              boxShadow: "0 0 24px rgba(0,255,136,0.6), 0 0 48px rgba(0,255,136,0.2)",
              fontFamily: "'Orbitron', sans-serif",
              minWidth: 260
            },
            "data-ocid": "tournament.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🎬" }),
              "WATCH AD & JOIN FREE"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Watch a 30-sec ad to register for free" })
      ] })
    ) : (
      /* Step 2: Registration form (shown after ad completes) */
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Dialog,
        {
          open: flowState === "formOpen" || flowState === "registering",
          onOpenChange: (v) => {
            if (!v && flowState !== "registering") setFlowState("idle");
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DialogTitle,
                {
                  style: {
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#00FF88"
                  },
                  children: "🎮 JOIN TOURNAMENT"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Ad dekh liya! Ab apni details bhar ke register karo." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleFormSubmit, className: "space-y-5 pt-2", children: [
              isFree && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg p-3 flex items-center gap-3",
                  style: {
                    background: "rgba(255,215,0,0.08)",
                    border: "1px solid rgba(255,215,0,0.3)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🏆" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-yellow-400 text-sm", children: "Free Tournament" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Winners get badges: 🥇🥈🥉" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ff-nickname", className: "font-semibold", children: "Free Fire Nickname *" }),
                  isNicknameAutoFilled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs px-2 py-0.5 rounded-full font-semibold",
                      style: {
                        background: "rgba(0,255,136,0.15)",
                        color: "#00FF88",
                        border: "1px solid rgba(0,255,136,0.4)",
                        fontFamily: "'Rajdhani', sans-serif"
                      },
                      children: "✨ Auto-filled via @spinzaf/freefire-api"
                    }
                  ),
                  manualEntryMode && !isNicknameAutoFilled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs px-2 py-0.5 rounded-full font-semibold",
                      style: {
                        background: "rgba(251,191,36,0.15)",
                        color: "#fbbf24",
                        border: "1px solid rgba(251,191,36,0.4)",
                        fontFamily: "'Rajdhani', sans-serif"
                      },
                      children: "✏️ Manual entry"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ff-nickname",
                    value: nickname,
                    onChange: (e) => {
                      setNickname(e.target.value);
                      if (isNicknameAutoFilled) setIsNicknameAutoFilled(false);
                    },
                    placeholder: "Enter your Free Fire nickname",
                    className: formTouched && !nickname.trim() ? "border-red-500 focus:border-red-500" : isNicknameAutoFilled ? "border-green-500" : "",
                    style: isNicknameAutoFilled ? { color: "#00FF88" } : {},
                    autoComplete: "off",
                    "data-ocid": "tournament.input"
                  }
                ),
                formTouched && !nickname.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: "❌ Nickname required hai." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ff-uid", className: "font-semibold", children: [
                    "Free Fire UID *",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "(8-12 digits)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      value: region,
                      onChange: (e) => {
                        setRegion(e.target.value);
                        setUidFetchStatus("idle");
                        setFetchedNickname("");
                      },
                      "aria-label": "Select region",
                      "data-ocid": "tournament.select",
                      style: {
                        background: "#16213E",
                        border: "1px solid #00FF88",
                        color: "#00FF88",
                        borderRadius: 8,
                        padding: "4px 8px",
                        fontSize: 12,
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 600,
                        cursor: "pointer",
                        outline: "none"
                      },
                      children: FF_REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "option",
                        {
                          value: r.value,
                          style: { background: "#16213E", color: "#fff" },
                          children: r.label
                        },
                        r.value
                      ))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ff-uid",
                    value: uid,
                    onChange: (e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setUid(val);
                      if (uidError) setUidError(validateUid(val));
                      if (isNicknameAutoFilled) {
                        setIsNicknameAutoFilled(false);
                        setNickname("");
                      }
                      setFetchedNickname("");
                      if (val.length === 0) setUidFetchStatus("idle");
                    },
                    placeholder: "e.g. 123456789",
                    inputMode: "numeric",
                    maxLength: 12,
                    className: uidError ? "border-red-500 focus:border-red-500" : uid.length >= 8 && uid.length <= 12 ? "border-green-500" : "",
                    "data-ocid": "tournament.input"
                  }
                ),
                uidError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: uidError }),
                !uidError && uid.length >= 8 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      transition: "all 0.2s ease"
                    },
                    children: [
                      uidFetchStatus === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-2",
                          "data-ocid": "tournament.loading_state",
                          style: { color: "#fbbf24" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⏳ Fetching player info..." })
                          ]
                        }
                      ),
                      uidFetchStatus === "success" && fetchedNickname && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex items-center gap-2",
                          "data-ocid": "tournament.success_state",
                          style: { color: "#00FF88" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                            "✅ Player: ",
                            fetchedNickname,
                            fetchedLevel ? ` | Level ${fetchedLevel}` : "",
                            fetchedRegionName ? ` | ${fetchedRegionName.toUpperCase()}` : ""
                          ] })
                        }
                      ),
                      uidFetchStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": "tournament.error_state",
                          className: "flex flex-col gap-1",
                          style: { color: "#f87171" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "❌ Invalid UID. Please try again or enter manually." }),
                            !manualEntryMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setManualEntryMode(true),
                                style: {
                                  color: "#fbbf24",
                                  fontSize: 11,
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  padding: 0,
                                  textAlign: "left",
                                  textDecoration: "underline",
                                  fontFamily: "'Rajdhani', sans-serif"
                                },
                                children: "✏️ Enter nickname manually instead"
                              }
                            )
                          ]
                        }
                      ),
                      uidFetchStatus === "network_error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": "tournament.error_state",
                          className: "flex flex-col gap-1",
                          style: { color: "#fb923c" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "❌ Unable to fetch via @spinzaf/freefire-api. Enter nickname manually." }),
                            !manualEntryMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setManualEntryMode(true),
                                style: {
                                  color: "#fbbf24",
                                  fontSize: 11,
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  padding: 0,
                                  textAlign: "left",
                                  textDecoration: "underline",
                                  fontFamily: "'Rajdhani', sans-serif"
                                },
                                children: "✏️ Enter nickname manually instead"
                              }
                            )
                          ]
                        }
                      ),
                      uidFetchStatus === "idle" && uid.length >= 8 && uid.length <= 12 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-400", children: "✅ Valid UID" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    id: "confirm",
                    checked: confirmed,
                    onCheckedChange: (checked) => setConfirmed(checked),
                    "data-ocid": "tournament.checkbox"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "confirm",
                    className: "text-sm cursor-pointer leading-relaxed",
                    children: "I confirm that the above details are correct and I agree to the tournament rules."
                  }
                )
              ] }),
              formTouched && !confirmed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 -mt-3", children: "❌ Please confirm to proceed." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: flowState === "registering",
                  className: "w-full py-4 rounded-xl font-bold uppercase tracking-widest text-base transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed",
                  style: {
                    background: flowState === "registering" ? "#5a2d91" : "linear-gradient(135deg, #9d4edd, #7b2fbf)",
                    color: "#fff",
                    boxShadow: flowState === "registering" ? "none" : "0 0 20px rgba(157,78,221,0.5)",
                    fontFamily: "'Orbitron', sans-serif"
                  },
                  "data-ocid": "tournament.submit_button",
                  children: flowState === "registering" ? "⏳ Registering..." : "✅ COMPLETE REGISTRATION"
                }
              )
            ] })
          ] })
        }
      )
    )
  ] });
}
export {
  TournamentDetailPage
};
