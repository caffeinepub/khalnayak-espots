import { ae as useInternetIdentity, ak as useCurrentUser, al as useGetCallerUserProfile, am as useGetCallerStats, an as useGetCallerTeamRegistrations, w as useGetTournaments, L as useGetTeams, ao as useGetCallerWallet, a4 as useTokens, r as reactExports, ap as getAllLocalUsers, j as jsxRuntimeExports, U as Button, ag as Link, G as Card, H as CardHeader, I as CardTitle, ai as User, J as CardContent, a8 as ue, T as Trophy, aq as Wallet, K as formatCurrency, a5 as Coins, Q as CardDescription, ar as useSaveUserProfile, a9 as LoaderCircle, a6 as Gift, as as SiWhatsapp, at as SiFacebook, au as SiInstagram, av as Mail, W as getTournamentStatusLabel } from "./index-VIWjWtVa.js";
import { B as Badge } from "./badge-BR_kH1hm.js";
import { I as Input, L as Label } from "./label-DJT1Ci_D.js";
import { P as Progress } from "./progress-a6popVrZ.js";
import { S as Skeleton } from "./skeleton-BEd6tqtA.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-06pDRxPC.js";
import { a as generateReferralCode, b as getUserReferralStats, C as CircleX } from "./useReferral-DnjGdFY8.js";
import { b as getMyVouchers, T as Ticket, S as ShoppingBag, C as Copy, E as ExternalLink, d as saveMyVouchers } from "./WalletPage-DMGX0QS-.js";
import { L as LogIn } from "./log-in-Dgn0x5BR.js";
import { P as Phone } from "./phone-DK8C8WG0.js";
import { D as DollarSign } from "./dollar-sign-CkPE-ZrR.js";
import { U as UserPlus } from "./user-plus-DUiayioy.js";
import { C as CircleCheck } from "./circle-check-CC3Gy9Et.js";
import { U as Users } from "./users-Bfy8Xq8w.js";
import "./dialog-DfyzdZfO.js";
import "./index-Bj-lkyA5.js";
import "./table-DXc6zw39.js";
import "./zap-D_hb_VH8.js";
function ProfilePage() {
  const { identity } = useInternetIdentity();
  const localUser = useCurrentUser();
  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: stats, isLoading: statsLoading } = useGetCallerStats();
  const { data: registrations } = useGetCallerTeamRegistrations();
  const { data: tournaments } = useGetTournaments();
  const { data: teams } = useGetTeams();
  const { data: wallet } = useGetCallerWallet();
  const tokens = useTokens();
  const [showEmailEdit, setShowEmailEdit] = reactExports.useState(false);
  const [showPhoneEdit, setShowPhoneEdit] = reactExports.useState(false);
  const [editEmail, setEditEmail] = reactExports.useState("");
  const [editPhone, setEditPhone] = reactExports.useState("");
  const [savedEmail, setSavedEmail] = reactExports.useState(null);
  const [savedPhone, setSavedPhone] = reactExports.useState(null);
  const localUserFull = localUser ? getAllLocalUsers().find((u) => u.id === localUser.userId) : void 0;
  const myTournaments = (registrations == null ? void 0 : registrations.map((reg) => {
    const tournament = tournaments == null ? void 0 : tournaments.find((t) => t.id === reg.tournamentId);
    const team = teams == null ? void 0 : teams.find((t) => t.id === reg.teamId);
    return { registration: reg, tournament, team };
  })) || [];
  if (!localUser && !identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-20 flex flex-col items-center justify-center gap-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-primary/10 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-12 w-12 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold font-display mb-2", children: "Login Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto", children: "Please login to view your profile, wallet balance, and tournament history." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            className: "bg-primary hover:bg-primary/90",
            "data-ocid": "profile.primary_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Login" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            variant: "outline",
            className: "border-secondary/50 hover:border-secondary",
            "data-ocid": "profile.secondary_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register" })
          }
        )
      ] })
    ] });
  }
  if (identity && profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container py-12 space-y-8",
        "data-ocid": "profile.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48 mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-64" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" })
        ]
      }
    );
  }
  if (identity && !profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSetupCard, {});
  }
  if (localUser && !identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LocalProfileView, { localUser });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-12 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold font-display mb-2", children: "My Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "View your stats and tournament history" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }),
          "Player Info"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: (localUser == null ? void 0 : localUser.fullName) || (profile == null ? void 0 : profile.username) || "Not set" })
          ] }),
          identity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Player ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-primary/80 break-all", children: [
              "player_",
              identity.getPrincipal().toString().slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Email" }),
            savedEmail || (localUser == null ? void 0 : localUser.email) || (profile == null ? void 0 : profile.email) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium break-all", children: savedEmail || (localUser == null ? void 0 : localUser.email) || (profile == null ? void 0 : profile.email) }) : showEmailEdit ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "email",
                  value: editEmail,
                  onChange: (e) => setEditEmail(e.target.value),
                  placeholder: "your@email.com",
                  className: "h-8 text-sm",
                  "data-ocid": "profile.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "h-8 px-3 bg-primary hover:bg-primary/90 text-xs",
                  onClick: () => {
                    if (editEmail) {
                      setSavedEmail(editEmail);
                      setShowEmailEdit(false);
                      ue.success("Email saved!");
                    }
                  },
                  "data-ocid": "profile.save_button",
                  children: "Save"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 px-2 text-xs text-primary hover:text-primary/80 -ml-2",
                onClick: () => setShowEmailEdit(true),
                "data-ocid": "profile.edit_button",
                children: "+ Add Email"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Phone" }),
            savedPhone || (localUser == null ? void 0 : localUser.phone) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-medium flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
              savedPhone || (localUser == null ? void 0 : localUser.phone)
            ] }) : showPhoneEdit ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "tel",
                  value: editPhone,
                  onChange: (e) => setEditPhone(e.target.value),
                  placeholder: "+91XXXXXXXXXX",
                  className: "h-8 text-sm",
                  "data-ocid": "profile.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "h-8 px-3 bg-primary hover:bg-primary/90 text-xs",
                  onClick: () => {
                    if (editPhone) {
                      setSavedPhone(editPhone);
                      setShowPhoneEdit(false);
                      ue.success("Phone number saved!");
                    }
                  },
                  "data-ocid": "profile.save_button",
                  children: "Save"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 px-2 text-xs text-primary hover:text-primary/80 -ml-2",
                onClick: () => setShowPhoneEdit(true),
                "data-ocid": "profile.edit_button",
                children: "+ Add Phone"
              }
            )
          ] }),
          profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: profile.role === "admin" ? "default" : "secondary",
                children: typeof profile.role === "string" ? profile.role.toUpperCase() : "PLAYER"
              }
            )
          ] }),
          (profile == null ? void 0 : profile.referralCode) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Referral Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-mono font-semibold text-primary", children: profile.referralCode })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-secondary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5" }),
          "Tournaments"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-16" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold font-display", children: (stats == null ? void 0 : stats.tournamentsParticipated.toString()) || "0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Total participated" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-accent/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5" }),
          "Wallet"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold font-display text-primary", children: wallet ? formatCurrency(wallet.balance) : "₹0.00" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Available balance" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Winnings" }),
            statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-success", children: stats ? formatCurrency(stats.totalWinnings) : "₹0.00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "sm",
              variant: "outline",
              className: "flex-1 border-primary/40 text-xs",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/wallet", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-3.5 w-3.5 mr-1" }),
                "Add Money"
              ] })
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-500/40 bg-gradient-to-br from-yellow-950/30 to-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-yellow-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-5 w-5 text-yellow-400" }),
            "Token Balance"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "sm",
              className: "bg-yellow-500 hover:bg-yellow-400 text-black font-bold",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/earn", children: "Watch Ads & Earn" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Ads dekho, tokens kamao, real money withdraw karo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-5xl font-bold font-display text-yellow-300",
              style: { textShadow: "0 0 14px rgba(253,224,71,0.5)" },
              children: tokens.balance
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "🪙 Tokens" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              tokens.tokensForNextWithdrawal,
              "/25 for withdrawal"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: tokens.canWithdraw ? "text-green-400 font-semibold" : "",
                children: tokens.canWithdraw ? "₹1.25 ready!" : `${tokens.tokensNeeded} more needed`
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: tokens.progressPct, className: "h-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 pt-1 text-xs text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/40 py-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Total Earned" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-yellow-400", children: [
                tokens.totalEarned,
                " 🪙"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/40 py-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Withdrawn" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-green-400", children: [
                "₹",
                (tokens.totalWithdrawn / 25 * 1.25).toFixed(2)
              ] })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MyVouchersCard,
      {
        userId: (localUser == null ? void 0 : localUser.userId) || (identity == null ? void 0 : identity.getPrincipal().toString()) || ""
      }
    ),
    ((localUserFull == null ? void 0 : localUserFull.referralCode) || (profile == null ? void 0 : profile.referralCode)) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReferAndEarnCard,
      {
        userId: (localUser == null ? void 0 : localUser.userId) || (identity == null ? void 0 : identity.getPrincipal().toString()) || "",
        referralCode: (localUserFull == null ? void 0 : localUserFull.referralCode) || (profile == null ? void 0 : profile.referralCode) || generateReferralCode(
          (localUser == null ? void 0 : localUser.userId) || (identity == null ? void 0 : identity.getPrincipal().toString()) || "anon"
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "My Tournaments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View all tournaments you've registered for" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", "data-ocid": "profile.tab", children: "All" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "upcoming", "data-ocid": "profile.tab", children: "Upcoming" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "ongoing", "data-ocid": "profile.tab", children: "Live" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "completed", "data-ocid": "profile.tab", children: "Completed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TournamentList, { items: myTournaments }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "upcoming", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TournamentList,
          {
            items: myTournaments.filter(
              (t) => {
                var _a;
                return ((_a = t.tournament) == null ? void 0 : _a.status) === "upcoming";
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "ongoing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TournamentList,
          {
            items: myTournaments.filter(
              (t) => {
                var _a;
                return ((_a = t.tournament) == null ? void 0 : _a.status) === "ongoing";
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "completed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TournamentList,
          {
            items: myTournaments.filter(
              (t) => {
                var _a;
                return ((_a = t.tournament) == null ? void 0 : _a.status) === "completed";
              }
            )
          }
        ) })
      ] }) })
    ] })
  ] });
}
function LocalProfileView({ localUser }) {
  const tokens = useTokens();
  const { login: iiLogin } = useInternetIdentity();
  const localUserFull = getAllLocalUsers().find(
    (u) => u.id === localUser.userId
  );
  const [showEmailEdit, setShowEmailEdit] = reactExports.useState(false);
  const [showPhoneEdit, setShowPhoneEdit] = reactExports.useState(false);
  const [editEmail, setEditEmail] = reactExports.useState("");
  const [editPhone, setEditPhone] = reactExports.useState("");
  const [savedEmail, setSavedEmail] = reactExports.useState(null);
  const [savedPhone, setSavedPhone] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-12 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold font-display mb-2", children: "My Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Welcome, ",
        localUser.fullName,
        "!"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }),
          "Player Info"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: localUser.fullName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Email" }),
            savedEmail || localUser.email ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium break-all", children: savedEmail || localUser.email }) : showEmailEdit ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "email",
                  value: editEmail,
                  onChange: (e) => setEditEmail(e.target.value),
                  placeholder: "your@email.com",
                  className: "h-8 text-sm",
                  "data-ocid": "profile.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "h-8 px-3 bg-primary hover:bg-primary/90 text-xs",
                  onClick: () => {
                    if (editEmail) {
                      setSavedEmail(editEmail);
                      setShowEmailEdit(false);
                      ue.success("Email saved!");
                    }
                  },
                  "data-ocid": "profile.save_button",
                  children: "Save"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 px-2 text-xs text-primary hover:text-primary/80 -ml-2",
                onClick: () => setShowEmailEdit(true),
                "data-ocid": "profile.edit_button",
                children: "+ Add Email"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Phone" }),
            savedPhone || localUser.phone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-medium flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
              savedPhone || localUser.phone
            ] }) : showPhoneEdit ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "tel",
                  value: editPhone,
                  onChange: (e) => setEditPhone(e.target.value),
                  placeholder: "+91XXXXXXXXXX",
                  className: "h-8 text-sm",
                  "data-ocid": "profile.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "h-8 px-3 bg-primary hover:bg-primary/90 text-xs",
                  onClick: () => {
                    if (editPhone) {
                      setSavedPhone(editPhone);
                      setShowPhoneEdit(false);
                      ue.success("Phone number saved!");
                    }
                  },
                  "data-ocid": "profile.save_button",
                  children: "Save"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 px-2 text-xs text-primary hover:text-primary/80 -ml-2",
                onClick: () => setShowPhoneEdit(true),
                "data-ocid": "profile.edit_button",
                children: "+ Add Phone"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "PLAYER" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-500/40 bg-gradient-to-br from-yellow-950/30 to-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-yellow-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-5 w-5" }),
          "Token Balance"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-5xl font-bold font-display text-yellow-300",
              style: { textShadow: "0 0 14px rgba(253,224,71,0.5)" },
              children: tokens.balance
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "🪙 Tokens" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: tokens.progressPct, className: "h-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            tokens.tokensForNextWithdrawal,
            "/25 for withdrawal"
          ] })
        ] })
      ] })
    ] }),
    (localUserFull == null ? void 0 : localUserFull.referralCode) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReferAndEarnCard,
      {
        userId: localUser.userId,
        referralCode: localUserFull.referralCode
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "flex items-center gap-2", children: "🔗 Connect Blockchain Identity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Connect your Internet Identity to unlock tournament participation, wallet deposits, and live leaderboards." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: iiLogin,
          className: "bg-primary hover:bg-primary/90",
          "data-ocid": "profile.primary_button",
          children: "Connect Internet Identity"
        }
      ) })
    ] })
  ] });
}
function ProfileSetupCard() {
  const { identity } = useInternetIdentity();
  const localUser = useCurrentUser();
  const saveProfileMutation = useSaveUserProfile();
  const [username, setUsername] = reactExports.useState(() => {
    if (localUser == null ? void 0 : localUser.fullName) return localUser.fullName;
    return "";
  });
  const [email, setEmail] = reactExports.useState(() => (localUser == null ? void 0 : localUser.email) || "");
  const [phone, setPhone] = reactExports.useState(() => (localUser == null ? void 0 : localUser.phone) || "");
  const playerId = identity ? `player_${identity.getPrincipal().toString().slice(0, 8)}` : null;
  const handleSave = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let referralCode = "";
    for (let i = 0; i < 6; i++) {
      referralCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    try {
      await saveProfileMutation.mutateAsync({
        username: username.trim(),
        email: email.trim(),
        role: "player",
        banned: false,
        referralCode
      });
      ue.success("Profile created!", {
        description: "Your wallet has been created with ₹0 balance."
      });
    } catch (err) {
      ue.error("Failed to create profile", {
        description: (err == null ? void 0 : err.message) || "Please try again."
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-20 flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md border-primary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto rounded-full bg-primary/10 p-4 w-fit mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-8 w-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-display", children: "Complete Your Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Set up your player profile to get a wallet and join tournaments." }),
      playerId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 font-mono", children: [
        "Player ID: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/80", children: playerId })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "setup-username", children: [
          "Your Name ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "setup-username",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            placeholder: "Enter your name",
            required: true,
            minLength: 3,
            "data-ocid": "profile.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "setup-email", children: "Email (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "setup-email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "your@email.com",
            "data-ocid": "profile.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "setup-phone", children: "Phone Number (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "setup-phone",
            type: "tel",
            value: phone,
            onChange: (e) => setPhone(e.target.value),
            placeholder: "+91XXXXXXXXXX",
            "data-ocid": "profile.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "w-full bg-primary hover:bg-primary/90",
          disabled: !username.trim() || saveProfileMutation.isPending,
          "data-ocid": "profile.submit_button",
          children: saveProfileMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Creating Profile..."
          ] }) : "Create Profile & Wallet"
        }
      ),
      saveProfileMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-destructive text-center",
          "data-ocid": "profile.error_state",
          children: "Failed to create profile. Please try again."
        }
      )
    ] }) })
  ] }) });
}
function MyVouchersCard({ userId }) {
  const [vouchers, setVouchers] = reactExports.useState(
    () => getMyVouchers(userId || void 0)
  );
  const [copiedId, setCopiedId] = reactExports.useState(null);
  const handleCopy = async (voucher) => {
    try {
      await navigator.clipboard.writeText(voucher.code);
      setCopiedId(voucher.id);
      ue.success("Voucher code copied!", {
        description: "Paste it in Google Play Store to redeem"
      });
      setTimeout(() => setCopiedId(null), 3e3);
    } catch {
      ue.error("Could not copy. Please copy manually.");
    }
  };
  const handleMarkUsed = (voucherId) => {
    const allVouchers = getMyVouchers();
    const updated = allVouchers.map(
      (v) => v.id === voucherId ? { ...v, status: "used" } : v
    );
    saveMyVouchers(updated);
    setVouchers(updated.filter((v) => v.userId === userId));
    ue.success("Voucher marked as used");
  };
  const isExpired = (expiry) => Date.now() > expiry;
  if (vouchers.length === 0) return null;
  const unusedCount = vouchers.filter((v) => v.status === "unused").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "border-green-500/40 bg-gradient-to-br from-green-950/20 to-card",
      "data-ocid": "profile.my_vouchers.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-green-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-5 w-5" }),
              "My Vouchers"
            ] }),
            unusedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-600/30 text-green-300 border-green-500/40", children: [
              unusedCount,
              " Unused"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your Google Play Store voucher codes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: vouchers.map((voucher, idx) => {
          const expired = isExpired(voucher.expiresAt);
          const statusColor = voucher.status === "used" ? "border-muted-foreground/30 bg-muted/10 opacity-60" : expired ? "border-red-500/30 bg-red-950/10 opacity-70" : "border-green-500/30 bg-green-950/20";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-xl border p-4 space-y-3 transition-colors ${statusColor}`,
              "data-ocid": `profile.my_vouchers.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-foreground", children: [
                        "₹",
                        voucher.amount
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: voucher.status === "used" ? "secondary" : expired ? "destructive" : "default",
                          className: voucher.status === "unused" && !expired ? "bg-green-600/30 text-green-300 border-green-500/40" : "",
                          children: voucher.status === "used" ? "Used" : expired ? "Expired" : "Unused"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      "Created:",
                      " ",
                      new Date(voucher.createdAt).toLocaleDateString("en-IN"),
                      " · ",
                      "Expires:",
                      " ",
                      new Date(voucher.expiresAt).toLocaleDateString("en-IN")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4 text-green-400/60 shrink-0 mt-1" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-lg border border-green-500/20 bg-black/30 px-4 py-2.5 font-mono text-base font-bold tracking-[0.15em] text-center select-all",
                    style: voucher.status === "unused" && !expired ? { textShadow: "0 0 10px rgba(74,222,128,0.35)" } : {},
                    children: voucher.code
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  voucher.status === "unused" && !expired && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: `flex-1 border-green-500/40 text-xs ${copiedId === voucher.id ? "bg-green-600/30 text-green-300" : "hover:bg-green-950/40"}`,
                        onClick: () => handleCopy(voucher),
                        "data-ocid": `profile.my_vouchers.copy_button.${idx + 1}`,
                        children: copiedId === voucher.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 mr-1.5" }),
                          "Copied!"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5 mr-1.5" }),
                          "Copy Code"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "border-green-500/40 text-xs hover:bg-green-950/40",
                        onClick: () => window.open(
                          "https://play.google.com/store",
                          "_blank",
                          "noopener"
                        ),
                        "data-ocid": `profile.my_vouchers.redeem_button.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 mr-1" }),
                          "Redeem"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "text-xs text-muted-foreground hover:text-foreground",
                        onClick: () => handleMarkUsed(voucher.id),
                        "data-ocid": `profile.my_vouchers.used_button.${idx + 1}`,
                        children: "Mark Used"
                      }
                    )
                  ] }),
                  (voucher.status === "used" || expired) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: voucher.status === "used" ? "This voucher has been redeemed" : "This voucher has expired" })
                ] }),
                voucher.status === "unused" && !expired && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors", children: "How to redeem ▸" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-2 space-y-1 text-xs text-muted-foreground list-none pl-1", children: [
                    "Open Google Play Store app",
                    'Tap profile icon → "Payments & subscriptions"',
                    'Select "Redeem gift code"',
                    "Paste your voucher code → tap Redeem"
                  ].map((step, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static steps
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400 font-bold shrink-0", children: [
                        i + 1,
                        "."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
                    ] }, i)
                  )) })
                ] })
              ]
            },
            voucher.id
          );
        }) })
      ]
    }
  );
}
function ReferAndEarnCard({
  userId,
  referralCode
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const [linkCopied, setLinkCopied] = reactExports.useState(false);
  const stats = userId ? getUserReferralStats(userId) : { totalReferrals: 0, totalEarnings: 0, referrals: [] };
  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://khalnayak.app";
  const registerUrl = `${appUrl}/register`;
  const shareMessage = `Join me on Khalnayak Espots! Use my referral code ${referralCode} and get ₹2 bonus. Register here: ${registerUrl}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      ue.success("Referral code copied!", {
        description: `Code "${referralCode}" is now in your clipboard.`
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      ue.error("Could not copy. Please copy manually.");
    }
  };
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(registerUrl)}&quote=${encodeURIComponent(shareMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const handleInstagram = () => {
    navigator.clipboard.writeText(shareMessage).then(() => {
      ue.info("Message copied!", {
        description: "Copy your code and paste it in Instagram story/post!"
      });
    }).catch(() => {
    });
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };
  const handleEmail = () => {
    window.open(
      `mailto:?subject=Join%20Khalnayak%20Espots!&body=${encodeURIComponent(shareMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setLinkCopied(true);
      ue.success("Share message copied!", {
        description: "Paste it anywhere to share."
      });
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      ue.error("Could not copy. Please copy manually.");
    }
  };
  const maskName = (name) => {
    if (!name || name.length < 2) return "****";
    return `${name.slice(0, 2)}****`;
  };
  const formatDate = (ts) => {
    return new Date(ts).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-green-500/40 bg-gradient-to-br from-green-950/40 to-yellow-950/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CardTitle,
        {
          className: "flex items-center gap-2 text-xl",
          style: { textShadow: "0 0 12px rgba(74,222,128,0.3)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-5 w-5 text-green-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: "Refer & Earn" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Share your code. Friend registers → You earn ₹2!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Your Referral Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 py-3 px-4 rounded-lg border border-green-500/40 bg-green-950/30 font-mono text-2xl font-bold tracking-[0.2em] text-green-300",
              style: { textShadow: "0 0 10px rgba(74,222,128,0.4)" },
              children: referralCode
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleCopy,
              size: "sm",
              className: `px-4 transition-all duration-200 ${copied ? "bg-green-600 hover:bg-green-600 text-white" : "bg-green-700/60 hover:bg-green-600 text-green-100 border border-green-500/40"}`,
              "data-ocid": "referral.copy_button",
              children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mr-1.5" }),
                "Copied!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4 mr-1.5" }),
                "Copy"
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Share Via" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleWhatsApp,
              size: "sm",
              className: "bg-[#25D366]/20 hover:bg-[#25D366]/35 border border-[#25D366]/40 text-[#25D366] font-semibold flex items-center gap-1.5",
              "data-ocid": "referral.whatsapp_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SiWhatsapp, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline", children: "WhatsApp" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "xs:hidden", children: "WA" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleFacebook,
              size: "sm",
              className: "bg-[#1877F2]/20 hover:bg-[#1877F2]/35 border border-[#1877F2]/40 text-[#1877F2] font-semibold flex items-center gap-1.5",
              "data-ocid": "referral.facebook_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SiFacebook, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline", children: "Facebook" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "xs:hidden", children: "FB" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleInstagram,
              size: "sm",
              className: "font-semibold flex items-center gap-1.5 border",
              style: {
                background: "linear-gradient(135deg, rgba(253,92,99,0.2) 0%, rgba(162,59,189,0.2) 100%)",
                borderColor: "rgba(162,59,189,0.4)",
                color: "#e879f9"
              },
              "data-ocid": "referral.instagram_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SiInstagram, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline", children: "Instagram" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "xs:hidden", children: "IG" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleEmail,
              size: "sm",
              className: "bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-400 font-semibold flex items-center gap-1.5",
              "data-ocid": "referral.email_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 shrink-0" }),
                "Email"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleCopyLink,
              size: "sm",
              className: `col-span-2 font-semibold flex items-center gap-1.5 transition-all ${linkCopied ? "bg-primary/30 border-primary/60 text-primary" : "bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary"}`,
              "data-ocid": "referral.copylink_button",
              children: linkCopied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 shrink-0" }),
                "Message Copied!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4 shrink-0" }),
                "Copy Share Message"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70 italic", children: [
          'Message: "Join me on Khalnayak Espots! Use my referral code',
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-green-400", children: referralCode }),
          ' and get ₹2 bonus."'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-green-500/20 bg-green-950/20 p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-400", children: stats.totalReferrals }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total Referrals" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-yellow-500/20 bg-yellow-950/20 p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-yellow-400", children: [
            "₹",
            stats.totalEarnings.toFixed(0)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Earnings" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/30 bg-muted/10 p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground", children: [
            "₹",
            (stats.totalReferrals * 2).toFixed(0)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total Paid" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
          "Referred Friends"
        ] }),
        stats.referrals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-6 rounded-lg border border-dashed border-green-500/20 bg-green-950/10",
            "data-ocid": "referral.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-8 w-8 text-green-500/40 mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Share your code to start earning!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Earn ₹2 for every friend who registers" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-2 max-h-52 overflow-y-auto",
            "data-ocid": "referral.list",
            children: stats.referrals.map((ref, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center justify-between p-2.5 rounded-lg border text-sm ${ref.status === "success" ? "border-green-500/20 bg-green-950/15" : "border-red-500/20 bg-red-950/15"}`,
                "data-ocid": `referral.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    ref.status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-400 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-red-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: maskName(ref.newUserName) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(ref.timestamp) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: ref.status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-700/40 text-green-300 border-green-500/30 text-xs", children: "₹2 earned" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "destructive",
                      className: "text-xs opacity-80",
                      children: "Blocked"
                    }
                  ) })
                ]
              },
              ref.id
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/30 bg-muted/5 p-3 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "How It Works" }),
        [
          "Share your unique referral code with friends",
          "Friend registers using your code at signup",
          "You instantly earn ₹2 in your wallet"
        ].map((step, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static list
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400 font-bold shrink-0", children: [
              i + 1,
              "."
            ] }),
            step
          ] }, i)
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-green-500/20 bg-green-950/10 p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-green-400 uppercase tracking-wide", children: "📖 How to Use Referral Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
          {
            step: "1",
            icon: "🔑",
            title: "Get Your Code",
            desc: "Copy your unique code from above"
          },
          {
            step: "2",
            icon: "📤",
            title: "Share It",
            desc: "Send via WhatsApp, Facebook, or Email"
          },
          {
            step: "3",
            icon: "👤",
            title: "Friend Registers",
            desc: "Friend signs up using your code"
          },
          {
            step: "4",
            icon: "💰",
            title: "Earn ₹2!",
            desc: "₹2 credited to your wallet instantly!"
          }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-green-500/15 bg-green-950/15 p-2.5 space-y-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: item.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-bold flex items-center justify-center shrink-0", children: item.step })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: item.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-tight", children: item.desc })
            ]
          },
          item.step
        )) })
      ] })
    ] })
  ] });
}
function TournamentList({ items }) {
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center text-muted-foreground py-8",
        "data-ocid": "profile.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No tournaments found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tournaments", children: "Browse Tournaments" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map(({ registration, tournament, team }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/tournament/$id",
      params: { id: (tournament == null ? void 0 : tournament.id.toString()) || "0" },
      className: "block p-4 border border-border rounded-lg hover:border-primary/50 transition-colors",
      "data-ocid": `profile.item.${idx + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: (tournament == null ? void 0 : tournament.status) === "ongoing" ? "destructive" : (tournament == null ? void 0 : tournament.status) === "upcoming" ? "secondary" : "outline",
                children: tournament ? getTournamentStatusLabel(tournament.status) : "Unknown"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: registration.status === "approved" ? "default" : registration.status === "pending" ? "secondary" : "destructive",
                className: registration.status === "approved" ? "bg-success" : "",
                children: registration.status.toUpperCase()
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-lg", children: (tournament == null ? void 0 : tournament.name) || "Unknown Tournament" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Team: ",
            (team == null ? void 0 : team.name) || "Unknown Team"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Prize Pool" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-primary", children: tournament ? formatCurrency(tournament.prizePool) : "N/A" })
        ] })
      ] })
    },
    registration.id.toString()
  )) });
}
export {
  ProfilePage
};
