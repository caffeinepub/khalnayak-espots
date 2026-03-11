import { r as reactExports, j as jsxRuntimeExports, X, A as TriangleAlert, B as Button, Q as Link, ak as useParams, al as useGetTournamentById, a0 as useGetCallerWallet, O as useInternetIdentity, m as useGetTeams, e as useGetTeamRegistrations, am as useGetLeaderboard, an as useNavigate, ao as useVpnStatus, I as ue, C as Card, s as getTournamentStatusLabel, q as getTournamentTypeLabel, ap as getTournamentPlayerInfo, h as CardHeader, i as CardTitle, k as CardContent, l as formatCurrency, T as Trophy, S as Shield, p as CardDescription, aq as getTournamentPrizeInfo, E as useTokens, ar as useRegisterTeam } from "./index-CDAki4Zg.js";
import { g as getAdUnitId, A as ADMOB_CONFIG, a as AdModal } from "./AdModal-vKXoYE0O.js";
import { B as Badge } from "./badge-CHh4aQZx.js";
import { u as useGetCheaterFlags, S as ShieldAlert } from "./useCheaterDetection-DRUJAW1y.js";
import { C as CountdownTimer } from "./CountdownTimer-B4ghTFvn.js";
import { C as Checkbox } from "./checkbox-CIfTN6GJ.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-BpobsB6g.js";
import { L as Label, I as Input } from "./label-Cr5z5YgL.js";
import { S as Skeleton } from "./skeleton-DLt6UjPI.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-iqqY5PgI.js";
import { C as Calendar } from "./calendar-BCoP9Nar.js";
import { D as DollarSign } from "./dollar-sign-a1UTLEJ6.js";
import { U as Users } from "./users-v1dpv8r7.js";
import { I as Info } from "./info-Ba0A_0F1.js";
import "./progress-D2GIIijd.js";
import "./play-fOi_wGkG.js";
import "./circle-check-CdeddFJ6.js";
import "./index-BWkmWqfw.js";
import "./check-D-TUClFD.js";
function InterstitialOverlay({
  isOpen,
  onDismiss
}) {
  const [skipCountdown, setSkipCountdown] = reactExports.useState(5);
  const [canSkip, setCanSkip] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isOpen) {
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
          clearInterval(timerRef.current);
          timerRef.current = null;
          setCanSkip(true);
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
  }, [isOpen]);
  if (!isOpen) return null;
  const adUnitId = getAdUnitId("interstitial");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: { backgroundColor: "rgba(0,0,0,0.95)" },
      "data-ocid": "admob.interstitial.modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden border border-zinc-700/50 bg-zinc-950", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-zinc-900 border-b border-zinc-800/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-500 uppercase tracking-widest", children: "Advertisement" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            canSkip ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onDismiss,
                className: "text-sm font-semibold text-primary hover:text-primary/80 px-3 py-1 rounded-lg border border-primary/40 transition-colors",
                "data-ocid": "admob.interstitial.close_button",
                children: "Skip Ad →"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full font-mono", children: [
              "Skip in ",
              skipCountdown,
              "s"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onDismiss,
                className: "text-zinc-600 hover:text-zinc-300 transition-colors p-1 rounded",
                "aria-label": "Close ad",
                "data-ocid": "admob.interstitial.cancel_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-[300px] flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black", children: window.adsbygoogle ? (
          /* Real ad slot */
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ins",
            {
              className: "adsbygoogle",
              style: { display: "block", width: "100%", minHeight: "300px" },
              "data-ad-client": ADMOB_CONFIG.PUBLISHER_ID,
              "data-ad-slot": adUnitId,
              "data-ad-format": "auto",
              "data-full-width-responsive": "true",
              ...{ "data-adtest": "on" }
            }
          )
        ) : (
          /* Styled mock ad for test/fallback */
          /* @__PURE__ */ jsxRuntimeExports.jsx(MockInterstitialContent, {})
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 bg-zinc-900 border-t border-zinc-800/50 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-600", children: "Sponsored content — close any time" }),
          canSkip && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onDismiss,
              className: "text-xs text-zinc-400 hover:text-zinc-200 underline transition-colors",
              "data-ocid": "admob.interstitial.confirm_button",
              children: "Continue to App →"
            }
          )
        ] })
      ] })
    }
  );
}
function MockInterstitialContent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4 px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-4xl",
        style: {
          background: "linear-gradient(135deg, #0ff2 0%, #0ff4 50%, #f0f2 100%)",
          border: "1px solid rgba(0,245,255,0.3)",
          boxShadow: "0 0 32px rgba(0,245,255,0.15)"
        },
        children: "🎮"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xl font-bold font-display text-white",
          style: { textShadow: "0 0 12px rgba(0,245,255,0.5)" },
          children: "Level Up Your Game!"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-400", children: "Discover more gaming apps and tournaments" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "inline-block px-6 py-2 rounded-full text-sm font-semibold text-black",
        style: {
          background: "linear-gradient(90deg, #00f5ff, #a855f7)",
          boxShadow: "0 0 16px rgba(0,245,255,0.3)"
        },
        children: "Play Now"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-[10px] text-zinc-600 tracking-widest uppercase",
        "aria-hidden": "true",
        children: "Test Ad — Google AdMob (Test Mode)"
      }
    )
  ] });
}
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
  const { identity, login } = useInternetIdentity();
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
    showRoomCredentials && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/50 bg-destructive/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5" }),
          "Room Credentials"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Join the tournament using these credentials" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Room ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-mono font-bold", children: tournament.roomId })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-mono font-bold", children: tournament.roomPassword })
        ] })
      ] })
    ] }),
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
                          item.note && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-muted-foreground", children: [
                            "(",
                            item.note,
                            ")"
                          ] })
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Placement points: 1st (12pts), 2nd (9pts), 3rd (8pts), 4th (7pts), 5th (6pts), etc." })
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ff-nickname", className: "font-semibold", children: "Free Fire Nickname *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ff-nickname",
                    value: nickname,
                    onChange: (e) => setNickname(e.target.value),
                    placeholder: "Enter your Free Fire nickname",
                    className: formTouched && !nickname.trim() ? "border-red-500 focus:border-red-500" : "",
                    autoComplete: "off",
                    "data-ocid": "tournament.input"
                  }
                ),
                formTouched && !nickname.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: "❌ Nickname required hai." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ff-uid", className: "font-semibold", children: [
                  "Free Fire UID *",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "(8-12 digits)" })
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
                    },
                    placeholder: "e.g. 123456789",
                    inputMode: "numeric",
                    maxLength: 12,
                    className: uidError ? "border-red-500 focus:border-red-500" : uid.length >= 8 && uid.length <= 12 ? "border-green-500" : "",
                    "data-ocid": "tournament.input"
                  }
                ),
                uidError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: uidError }),
                !uidError && uid.length >= 8 && uid.length <= 12 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-400", children: "✅ Valid UID" })
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
