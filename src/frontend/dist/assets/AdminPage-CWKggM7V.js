import { c as createLucideIcon, u as useIsCallerAdmin, j as jsxRuntimeExports, N as Navigate, S as Shield, a as useGetTournaments, r as reactExports, b as Swords, d as useGetPlatformStats, e as useGetTeamRegistrations, f as useGetDepositRequests, g as useGetWithdrawalRequests, C as Card, h as CardHeader, i as CardTitle, k as CardContent, T as Trophy, l as formatCurrency, m as useGetTeams, n as useApproveTeamRegistration, o as useRejectTeamRegistration, p as CardDescription, B as Button, X, q as getTournamentTypeLabel, s as getTournamentStatusLabel, t as useUpdateTeamScore, v as useApproveDeposit, w as useRejectDeposit, x as formatDateTime, y as useApproveWithdrawal, z as useRejectWithdrawal, A as TriangleAlert, D as useGetAllUsers, E as useTokens, F as Coins, G as Gift, H as useUpdateTournamentStatus, I as ue, L as LoaderCircle, J as useCreateTournament, K as useUpdateTournamentRoomCredentials, M as useDistributePrizes, R as RefreshCw } from "./index-CDAki4Zg.js";
import { B as Badge } from "./badge-CHh4aQZx.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-BpobsB6g.js";
import { L as Label, I as Input } from "./label-Cr5z5YgL.js";
import { P as Progress } from "./progress-D2GIIijd.js";
import { P as Plus, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, g as getWithdrawalDetails, e as getRedeemRequests, s as saveWithdrawalDetails, f as getMyVouchers, h as saveRedeemRequests } from "./WalletPage-CSppuxjP.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-B3emK3Vf.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-iqqY5PgI.js";
import { u as useGetCheaterFlags, S as ShieldAlert, a as useGetDisqualifiedTeams, b as autoFlagOnScoreEntry, c as banFlaggedPlayer, d as disqualifyTeam, e as clearFlag } from "./useCheaterDetection-DRUJAW1y.js";
import { g as getReferralStats, C as CircleX } from "./useReferral-CYX23NcX.js";
import { U as Users } from "./users-v1dpv8r7.js";
import { D as DollarSign } from "./dollar-sign-a1UTLEJ6.js";
import { C as Check } from "./check-D-TUClFD.js";
import { P as Play } from "./play-fOi_wGkG.js";
import { Z as Zap } from "./zap-D3ixfL4z.js";
import { C as CircleCheck } from "./circle-check-CdeddFJ6.js";
import { C as Calendar } from "./calendar-BCoP9Nar.js";
import { K as KeyRound } from "./key-round-CL6a1xAO.js";
import "./index-BWkmWqfw.js";
import "./index-Czx6krmW.js";
import "./chevron-down-BqDuH8nm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
];
const Server = createLucideIcon("server", __iconNode);
function AdminPage() {
  const { data: isAdmin, isLoading } = useIsCallerAdmin();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Checking permissions..." }) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-12 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold font-display", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage tournaments, users, and platform operations" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "matches", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-nav-wrapper", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "admin-nav-scroll", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "admin-nav-tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "matches",
              "data-ocid": "admin.matches.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "⚔️" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Manage Matches" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "overview",
              "data-ocid": "admin.overview.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "📊" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Overview" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "registrations",
              "data-ocid": "admin.registrations.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "📝" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Registrations" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "tournaments",
              "data-ocid": "admin.tournaments.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "🎮" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tournaments" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "scores",
              "data-ocid": "admin.scores.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "📈" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scores" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "deposits",
              "data-ocid": "admin.deposits.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "💰" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Deposits" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "withdrawals",
              "data-ocid": "admin.withdrawals.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "💸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Withdrawals" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "users",
              "data-ocid": "admin.users.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "👥" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Users" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "redeem",
              "data-ocid": "admin.redeem.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "🎟️" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Redeem Requests" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "adstats",
              "data-ocid": "admin.adstats.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "📺" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ad Stats" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "referrals",
              "data-ocid": "admin.referrals.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "🎁" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Referrals" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "security",
              "data-ocid": "admin.security.tab",
              className: "admin-nav-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-nav-icon", children: "🛡️" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Security" })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "admin-nav-fade-right", "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "matches", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ManageMatchesTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "registrations", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RegistrationsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tournaments", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TournamentsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "scores", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScoresTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "deposits", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DepositsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "withdrawals", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WithdrawalsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "users", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "redeem", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RedeemRequestsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "adstats", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdStatsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "referrals", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReferralsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "security", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SecurityTab, {}) })
    ] })
  ] });
}
function SetRoomDetailsDialog({
  tournament,
  onClose
}) {
  const updateCredentialsMutation = useUpdateTournamentRoomCredentials();
  const defaultStartTime = (() => {
    try {
      const ms = Number(tournament.startTime) / 1e6;
      return new Date(ms).toISOString().slice(0, 16);
    } catch {
      return "";
    }
  })();
  const [roomId, setRoomId] = reactExports.useState(tournament.roomId ?? "");
  const [roomPassword, setRoomPassword] = reactExports.useState(
    tournament.roomPassword ?? ""
  );
  const [slotDetails, setSlotDetails] = reactExports.useState(
    localStorage.getItem(`roomSlot_${tournament.id.toString()}`) ?? ""
  );
  const [matchStartTime, setMatchStartTime] = reactExports.useState(defaultStartTime);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCredentialsMutation.mutateAsync({
        tournamentId: tournament.id,
        roomId,
        roomPassword
      });
      if (slotDetails.trim()) {
        localStorage.setItem(
          `roomSlot_${tournament.id.toString()}`,
          slotDetails.trim()
        );
      }
      ue.success("Room details set! Users can now see room credentials.");
      onClose();
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to set room details");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-5 w-5 text-primary" }),
        "Set Room Details"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "truncate", children: tournament.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "roomIdInput", children: "Room ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "roomIdInput",
            value: roomId,
            onChange: (e) => setRoomId(e.target.value),
            placeholder: "e.g., 213579050",
            required: true,
            "data-ocid": "admin.set_room.room_id.input",
            className: "font-mono"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "roomPassInput", children: "Room Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "roomPassInput",
            value: roomPassword,
            onChange: (e) => setRoomPassword(e.target.value),
            placeholder: "e.g., 00",
            required: true,
            "data-ocid": "admin.set_room.password.input",
            className: "font-mono"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "slotInput", children: [
          "Slot Details",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "slotInput",
            value: slotDetails,
            onChange: (e) => setSlotDetails(e.target.value),
            placeholder: "e.g., A1 to A4",
            "data-ocid": "admin.set_room.slot.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "matchStartInput", children: "Match Start Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "matchStartInput",
            type: "datetime-local",
            value: matchStartTime,
            onChange: (e) => setMatchStartTime(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Room credentials will be visible to users at this time." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "w-full",
          disabled: updateCredentialsMutation.isPending,
          "data-ocid": "admin.set_room.submit_button",
          children: updateCredentialsMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Setting..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "mr-2 h-4 w-4" }),
            "Set Room Details"
          ] })
        }
      )
    ] })
  ] });
}
function RescheduleDialog({
  tournament,
  onClose
}) {
  const defaultStartTime = (() => {
    try {
      const ms = Number(tournament.startTime) / 1e6;
      return new Date(ms).toISOString().slice(0, 16);
    } catch {
      return "";
    }
  })();
  const [newTime, setNewTime] = reactExports.useState(defaultStartTime);
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(`rescheduled_${tournament.id.toString()}`, newTime);
    ue.success(
      `Rescheduled to ${new Date(newTime).toLocaleString("en-IN")}`
    );
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-secondary" }),
        "Reschedule Match"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: tournament.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "New Start Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "datetime-local",
            value: newTime,
            onChange: (e) => setNewTime(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-2 h-4 w-4" }),
        "Reschedule"
      ] })
    ] })
  ] });
}
function ManageMatchCard({
  tournament,
  index
}) {
  const updateStatusMutation = useUpdateTournamentStatus();
  const [setRoomOpen, setSetRoomOpen] = reactExports.useState(false);
  const [rescheduleOpen, setRescheduleOpen] = reactExports.useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = reactExports.useState(false);
  const statusColors = {
    upcoming: "bg-secondary/20 text-secondary border-secondary/30",
    ongoing: "bg-primary/20 text-primary border-primary/30",
    completed: "bg-muted text-muted-foreground border-border/40"
  };
  const statusLabel = {
    upcoming: "Upcoming",
    ongoing: "🔴 Live",
    completed: "Completed"
  };
  const handleCancel = async () => {
    try {
      await updateStatusMutation.mutateAsync({
        tournamentId: tournament.id,
        status: "upcoming"
      });
      ue.success("Match cancelled — status reset to Upcoming.");
      setCancelConfirmOpen(false);
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to cancel match");
    }
  };
  const startMs = Number(tournament.startTime) / 1e6;
  const formattedStart = new Date(startMs).toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border-border/40 bg-card/60 overflow-hidden",
      style: tournament.status === "ongoing" ? {
        boxShadow: "0 0 16px oklch(0.75 0.18 195 / 0.2)",
        border: "1px solid oklch(0.75 0.18 195 / 0.35)"
      } : {},
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold font-display text-base leading-snug truncate", children: tournament.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 flex-shrink-0" }),
              formattedStart
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-[10px] uppercase tracking-wide ${statusColors[tournament.status] ?? "bg-muted"}`,
                children: statusLabel[tournament.status] ?? tournament.status
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: getTournamentTypeLabel(tournament.tournamentType) })
          ] })
        ] }),
        (tournament.roomId || tournament.roomPassword) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-xs flex items-center gap-2 px-2 py-1.5 rounded-lg",
            style: {
              background: "oklch(0.12 0.06 160 / 0.3)",
              border: "1px solid oklch(0.70 0.20 160 / 0.25)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3.5 w-3.5 text-green-400 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400 font-mono", children: [
                "Room: ",
                tournament.roomId
              ] }),
              tournament.roomPassword && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "/ Pass: ",
                tournament.roomPassword
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: setRoomOpen, onOpenChange: setSetRoomOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "border-primary/30 text-primary hover:bg-primary/10 gap-1.5 text-xs",
                "data-ocid": `admin.matches.set_room.button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3.5 w-3.5" }),
                  "Set Room Details"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SetRoomDetailsDialog,
              {
                tournament,
                onClose: () => setSetRoomOpen(false)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: rescheduleOpen, onOpenChange: setRescheduleOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "border-secondary/30 text-secondary hover:bg-secondary/10 gap-1.5 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                  "Reschedule"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RescheduleDialog,
              {
                tournament,
                onClose: () => setRescheduleOpen(false)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "border-yellow-500/30 text-yellow-400 hover:bg-yellow-950/20 gap-1.5 text-xs",
              onClick: () => {
                ue.info(
                  "Go to the Scores tab to submit results for this tournament.",
                  { description: tournament.name, duration: 3e3 }
                );
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
                "Submit Results"
              ]
            }
          ),
          tournament.status !== "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Dialog,
            {
              open: cancelConfirmOpen,
              onOpenChange: setCancelConfirmOpen,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "border-destructive/30 text-destructive hover:bg-destructive/10 gap-1.5 text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                      "Cancel Match"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-destructive", children: "Cancel Match?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
                      'This will reset the match status to "Upcoming".',
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: tournament.name })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "destructive",
                        className: "flex-1",
                        onClick: handleCancel,
                        disabled: updateStatusMutation.isPending,
                        "data-ocid": "admin.matches.cancel.confirm_button",
                        children: updateStatusMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Yes, Cancel Match"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        className: "flex-1",
                        onClick: () => setCancelConfirmOpen(false),
                        "data-ocid": "admin.matches.cancel.cancel_button",
                        children: "Keep Match"
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function ManageMatchesTab() {
  const { data: tournaments } = useGetTournaments();
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = (tournaments ?? []).filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });
  const sorted = [...filtered].sort((a, b) => {
    const order = { ongoing: 0, upcoming: 1, completed: 2 };
    const ao = order[a.status] ?? 3;
    const bo = order[b.status] ?? 3;
    if (ao !== bo) return ao - bo;
    return Number(a.startTime) / 1e6 - Number(b.startTime) / 1e6;
  });
  const counts = {
    all: (tournaments == null ? void 0 : tournaments.length) ?? 0,
    upcoming: (tournaments == null ? void 0 : tournaments.filter((t) => t.status === "upcoming").length) ?? 0,
    ongoing: (tournaments == null ? void 0 : tournaments.filter((t) => t.status === "ongoing").length) ?? 0,
    completed: (tournaments == null ? void 0 : tournaments.filter((t) => t.status === "completed").length) ?? 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-9 h-9 rounded-lg flex items-center justify-center",
          style: {
            background: "oklch(0.12 0.06 195 / 0.4)",
            border: "1px solid oklch(0.75 0.18 195 / 0.4)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-4.5 w-4.5 text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold font-display", children: "Manage Matches" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Set room details, reschedule, cancel, and submit results" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["all", "upcoming", "ongoing", "completed"].map(
      (f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setFilter(f),
          "data-ocid": `admin.matches.${f}.tab`,
          className: `px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${filter === f ? "bg-primary/20 text-primary border-primary/40" : "bg-transparent text-muted-foreground border-border/40 hover:border-border hover:text-foreground"}`,
          children: [
            f === "all" ? "All" : f === "ongoing" ? "🔴 Live" : f.charAt(0).toUpperCase() + f.slice(1),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60 ml-1", children: [
              "(",
              counts[f],
              ")"
            ] })
          ]
        },
        f
      )
    ) }),
    sorted.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sorted.map((tournament, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ManageMatchCard,
      {
        tournament,
        index: idx + 1
      },
      tournament.id.toString()
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-14 text-center space-y-3",
        "data-ocid": "admin.matches.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-10 w-10 text-muted-foreground/30 mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: filter === "all" ? "No tournaments created yet." : `No ${filter} matches.` })
        ]
      }
    )
  ] });
}
function OverviewTab() {
  const { data: stats } = useGetPlatformStats();
  const { data: registrations } = useGetTeamRegistrations();
  const { data: deposits } = useGetDepositRequests();
  const { data: withdrawals } = useGetWithdrawalRequests();
  const pendingRegistrations = (registrations == null ? void 0 : registrations.filter((r) => r.status === "pending").length) || 0;
  const pendingDeposits = (deposits == null ? void 0 : deposits.filter((d) => d.status === "pending").length) || 0;
  const pendingWithdrawals = (withdrawals == null ? void 0 : withdrawals.filter((w) => w.status === "pending").length) || 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
        "Total Players"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold font-display", children: (stats == null ? void 0 : stats.totalPlayers.toString()) || "0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-secondary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }),
        "Tournaments"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold font-display", children: (stats == null ? void 0 : stats.totalTournaments.toString()) || "0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-accent/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4" }),
        "Prize Distributed"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold font-display text-primary", children: stats ? formatCurrency(stats.totalPrizeDistributed) : "₹0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Pending Actions" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Registrations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: pendingRegistrations })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Deposits" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: pendingDeposits })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Withdrawals" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: pendingWithdrawals })
        ] })
      ] })
    ] })
  ] }) });
}
function TournamentsTab() {
  const { data: tournaments } = useGetTournaments();
  const [createDialogOpen, setCreateDialogOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "All Tournaments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: createDialogOpen, onOpenChange: setCreateDialogOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Create Tournament"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreateTournamentDialog, { onClose: () => setCreateDialogOpen(false) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Entry Fee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Prize Pool" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: tournaments == null ? void 0 : tournaments.map((tournament) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: tournament.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getTournamentTypeLabel(tournament.tournamentType) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: tournament.status === "ongoing" ? "destructive" : tournament.status === "upcoming" ? "secondary" : "outline",
            children: getTournamentStatusLabel(tournament.status)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatCurrency(tournament.entryFee) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatCurrency(tournament.prizePool) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TournamentActions, { tournament }) })
      ] }, tournament.id.toString())) })
    ] }) }) })
  ] });
}
function TournamentActions({ tournament }) {
  const updateStatusMutation = useUpdateTournamentStatus();
  const updateCredentialsMutation = useUpdateTournamentRoomCredentials();
  const distributePrizesMutation = useDistributePrizes();
  const [credentialsDialogOpen, setCredentialsDialogOpen] = reactExports.useState(false);
  const [roomId, setRoomId] = reactExports.useState("");
  const [roomPassword, setRoomPassword] = reactExports.useState("");
  const handleStatusChange = async (status) => {
    try {
      await updateStatusMutation.mutateAsync({
        tournamentId: tournament.id,
        status
      });
      ue.success(`Tournament status updated to ${status}`);
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to update status");
    }
  };
  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    try {
      await updateCredentialsMutation.mutateAsync({
        tournamentId: tournament.id,
        roomId,
        roomPassword
      });
      ue.success("Room credentials updated");
      setCredentialsDialogOpen(false);
      setRoomId("");
      setRoomPassword("");
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to update credentials");
    }
  };
  const handleDistributePrizes = async () => {
    try {
      await distributePrizesMutation.mutateAsync(tournament.id);
      ue.success("Prizes distributed successfully");
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to distribute prizes");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        onValueChange: (value) => handleStatusChange(value),
        value: tournament.status,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "upcoming", children: "Upcoming" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ongoing", children: "Ongoing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "completed", children: "Completed" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Dialog,
      {
        open: credentialsDialogOpen,
        onOpenChange: setCredentialsDialogOpen,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "Room" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Update Room Credentials" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: tournament.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdateCredentials, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Room ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: roomId,
                    onChange: (e) => setRoomId(e.target.value),
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Room Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: roomPassword,
                    onChange: (e) => setRoomPassword(e.target.value),
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  disabled: updateCredentialsMutation.isPending,
                  children: updateCredentialsMutation.isPending ? "Updating..." : "Update Credentials"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    tournament.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: handleDistributePrizes,
        disabled: distributePrizesMutation.isPending,
        children: "Prizes"
      }
    )
  ] });
}
const TOURNAMENT_TYPE_CONFIG = {
  battleground: {
    defaultMaxTeams: 12,
    label: "Battle Ground (48 players)",
    info: "12 teams × 4 players = 48 total",
    commissionPct: 40,
    prizePct: 60,
    prizeDetails: "1st: 40% | 2nd: 30% | 3rd: 20% | Most Kills (6+): 10%"
  },
  custom4v4: {
    defaultMaxTeams: 2,
    label: "4vs4 Custom",
    info: "2 teams × 4 players = 8 total (₹80 collection @ ₹10/player)",
    commissionPct: 15,
    prizePct: 85,
    prizeDetails: "Winning team ke 4 players mein ₹17-17 (25% each)"
  },
  custom1v1: {
    defaultMaxTeams: 2,
    label: "1vs1 Custom",
    info: "2 players (₹20 collection @ ₹10/player)",
    commissionPct: 18,
    prizePct: 82,
    prizeDetails: "Winner ko 100% prize pool (₹16.40)"
  },
  custom2v2: {
    defaultMaxTeams: 2,
    label: "2vs2 Custom",
    info: "2 teams × 2 players (₹40 collection @ ₹10/player)",
    commissionPct: 25,
    prizePct: 75,
    prizeDetails: "Winning team ke 2 players mein ₹15-15 (50% each)"
  }
};
function CreateTournamentDialog({ onClose }) {
  const [formData, setFormData] = reactExports.useState({
    name: "",
    type: "battleground",
    entryFee: "",
    maxTeams: "12",
    startTime: ""
  });
  const createMutation = useCreateTournament();
  const selectedConfig = TOURNAMENT_TYPE_CONFIG[formData.type] || TOURNAMENT_TYPE_CONFIG.battleground;
  const handleTypeChange = (value) => {
    const config = TOURNAMENT_TYPE_CONFIG[value] || TOURNAMENT_TYPE_CONFIG.battleground;
    setFormData({
      ...formData,
      type: value,
      maxTeams: config.defaultMaxTeams.toString()
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const startTimeMs = new Date(formData.startTime).getTime();
      const startTimeNs = BigInt(startTimeMs) * BigInt(1e6);
      await createMutation.mutateAsync({
        name: formData.name,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tournamentType: formData.type,
        entryFee: BigInt(
          Math.round(Number.parseFloat(formData.entryFee) * 100)
        ),
        maxTeams: BigInt(formData.maxTeams),
        startTime: startTimeNs
      });
      ue.success("Tournament created successfully");
      onClose();
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to create tournament");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Tournament" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Fill in tournament details" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tournament Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value }),
            placeholder: "e.g., Friday Night Showdown",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formData.type, onValueChange: handleTypeChange, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.create_tournament.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "battleground", children: "Battle Ground (48 players)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "custom4v4", children: "4vs4 Custom" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "custom1v1", children: "1vs1 Custom (नया)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "custom2v2", children: "2vs2 Custom (नया)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: selectedConfig.info }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-destructive", children: [
            "Platform: ",
            selectedConfig.commissionPct,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
            "Prize Pool: ",
            selectedConfig.prizePct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: selectedConfig.prizeDetails })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Entry Fee (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              step: "0.01",
              min: "0",
              value: formData.entryFee,
              onChange: (e) => setFormData({ ...formData, entryFee: e.target.value }),
              placeholder: "e.g., 10",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Max Teams" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "1",
              value: formData.maxTeams,
              onChange: (e) => setFormData({ ...formData, maxTeams: e.target.value }),
              required: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Start Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "datetime-local",
            value: formData.startTime,
            onChange: (e) => setFormData({ ...formData, startTime: e.target.value }),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "w-full",
          disabled: createMutation.isPending,
          "data-ocid": "admin.create_tournament.submit_button",
          children: createMutation.isPending ? "Creating..." : "Create Tournament"
        }
      )
    ] })
  ] });
}
function RegistrationsTab() {
  const { data: registrations } = useGetTeamRegistrations();
  const { data: teams } = useGetTeams();
  const { data: tournaments } = useGetTournaments();
  const approveMutation = useApproveTeamRegistration();
  const rejectMutation = useRejectTeamRegistration();
  const handleApprove = async (id) => {
    try {
      await approveMutation.mutateAsync(id);
      ue.success("Registration approved");
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to approve");
    }
  };
  const handleReject = async (id) => {
    try {
      await rejectMutation.mutateAsync(id);
      ue.success("Registration rejected");
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to reject");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Team Registrations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Approve or reject team registrations" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tournament" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: registrations && registrations.length > 0 ? registrations.map((reg) => {
        const team = teams == null ? void 0 : teams.find((t) => t.id === reg.teamId);
        const tournament = tournaments == null ? void 0 : tournaments.find(
          (t) => t.id === reg.tournamentId
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `admin.registrations.row.${reg.id.toString()}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: (team == null ? void 0 : team.name) || "Unknown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: (tournament == null ? void 0 : tournament.name) || "Unknown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: reg.status === "approved" ? "default" : reg.status === "pending" ? "secondary" : "destructive",
                  className: reg.status === "approved" ? "bg-success" : "",
                  children: reg.status.toUpperCase()
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: reg.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "default",
                    "data-ocid": "admin.registrations.confirm_button",
                    onClick: () => handleApprove(reg.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "destructive",
                    "data-ocid": "admin.registrations.delete_button",
                    onClick: () => handleReject(reg.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }) })
            ]
          },
          reg.id.toString()
        );
      }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: 4,
          className: "text-center py-8 text-muted-foreground",
          "data-ocid": "admin.registrations.empty_state",
          children: "No registrations yet"
        }
      ) }) })
    ] }) })
  ] });
}
function ScoresTab() {
  const { data: tournaments } = useGetTournaments();
  const { data: teams } = useGetTeams();
  const updateScoreMutation = useUpdateTeamScore();
  const [selectedTournament, setSelectedTournament] = reactExports.useState("");
  const [selectedTeam, setSelectedTeam] = reactExports.useState("");
  const [kills, setKills] = reactExports.useState("");
  const [placement, setPlacement] = reactExports.useState("");
  const { refresh: refreshFlags } = useGetCheaterFlags();
  const handleSubmit = async (e) => {
    var _a;
    e.preventDefault();
    if (!selectedTournament || !selectedTeam) return;
    const killsNum = Number.parseInt(kills, 10);
    try {
      await updateScoreMutation.mutateAsync({
        tournamentId: BigInt(selectedTournament),
        teamId: BigInt(selectedTeam),
        kills: BigInt(kills),
        placementRank: BigInt(placement)
      });
      ue.success("Score updated successfully");
      if (killsNum >= 15) {
        const team = teams == null ? void 0 : teams.find((t) => t.id.toString() === selectedTeam);
        const tournament = tournaments == null ? void 0 : tournaments.find(
          (t) => t.id.toString() === selectedTournament
        );
        if (team) {
          const flag = autoFlagOnScoreEntry(
            {
              id: team.id.toString(),
              name: team.name,
              ffId: ((_a = team.members[0]) == null ? void 0 : _a.freeFireId) ?? "Unknown"
            },
            selectedTournament,
            (tournament == null ? void 0 : tournament.name) ?? "Unknown Tournament",
            killsNum
          );
          if (flag) {
            refreshFlags();
            ue.warning(
              `⚠️ Auto-flagged: ${team.name} has ${killsNum} kills!`,
              {
                description: "This team has been flagged for suspicious activity. Check the Security tab.",
                duration: 6e3
              }
            );
          }
        }
      }
      setKills("");
      setPlacement("");
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to update score");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Update Team Scores" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Enter kills and placement for teams" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tournament" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: selectedTournament,
            onValueChange: setSelectedTournament,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select tournament" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: tournaments == null ? void 0 : tournaments.filter(
                (t) => t.status === "ongoing" || t.status === "completed"
              ).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.id.toString(), children: t.name }, t.id.toString())) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedTeam, onValueChange: setSelectedTeam, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select team" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: teams == null ? void 0 : teams.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.id.toString(), children: t.name }, t.id.toString())) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kills" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              value: kills,
              onChange: (e) => setKills(e.target.value),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Placement Rank" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "1",
              value: placement,
              onChange: (e) => setPlacement(e.target.value),
              required: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: updateScoreMutation.isPending, children: updateScoreMutation.isPending ? "Updating..." : "Update Score" })
    ] }) })
  ] });
}
function DepositsTab() {
  const { data: deposits } = useGetDepositRequests();
  const approveMutation = useApproveDeposit();
  const rejectMutation = useRejectDeposit();
  const handleApprove = async (id) => {
    try {
      await approveMutation.mutateAsync(id);
      ue.success("Deposit approved");
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to approve");
    }
  };
  const handleReject = async (id) => {
    try {
      await rejectMutation.mutateAsync(id);
      ue.success("Deposit rejected");
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to reject");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Deposit Requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Approve or reject user deposit requests" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: deposits && deposits.length > 0 ? deposits.map((deposit) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": `admin.deposits.row.${deposit.id.toString()}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-mono text-xs", children: [
              deposit.userId.toString().slice(0, 15),
              "..."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatCurrency(deposit.amount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatDateTime(deposit.timestamp) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: deposit.status === "approved" ? "default" : deposit.status === "pending" ? "secondary" : "destructive",
                className: deposit.status === "approved" ? "bg-success" : "",
                children: deposit.status.toUpperCase()
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: deposit.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  "data-ocid": "admin.deposits.confirm_button",
                  onClick: () => handleApprove(deposit.id),
                  disabled: approveMutation.isPending,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "destructive",
                  "data-ocid": "admin.deposits.delete_button",
                  onClick: () => handleReject(deposit.id),
                  disabled: rejectMutation.isPending,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }) })
          ]
        },
        deposit.id.toString()
      )) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: 5,
          className: "text-center py-8 text-muted-foreground",
          "data-ocid": "admin.deposits.empty_state",
          children: "No deposit requests"
        }
      ) }) })
    ] }) })
  ] });
}
function WithdrawalsTab() {
  const { data: withdrawals } = useGetWithdrawalRequests();
  const approveMutation = useApproveWithdrawal();
  const rejectMutation = useRejectWithdrawal();
  const [detailsState, setDetailsState] = reactExports.useState(
    getWithdrawalDetails()
  );
  const refreshDetails = () => setDetailsState(getWithdrawalDetails());
  const handleApprove = async (id) => {
    try {
      await approveMutation.mutateAsync(id);
      const updated = getWithdrawalDetails().map(
        (d) => d.requestId === id.toString() ? { ...d, status: "approved" } : d
      );
      saveWithdrawalDetails(updated);
      refreshDetails();
      ue.success("Withdrawal approved and processed");
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to approve");
    }
  };
  const handleReject = async (id) => {
    try {
      await rejectMutation.mutateAsync(id);
      const updated = getWithdrawalDetails().map(
        (d) => d.requestId === id.toString() ? { ...d, status: "rejected" } : d
      );
      saveWithdrawalDetails(updated);
      refreshDetails();
      ue.success("Withdrawal rejected");
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to reject");
    }
  };
  const upiCounts = {};
  for (const d of detailsState) {
    if (d.method === "upi" && d.upiId) {
      upiCounts[d.upiId.toLowerCase()] = (upiCounts[d.upiId.toLowerCase()] ?? 0) + 1;
    }
  }
  const fraudUpiIds = new Set(
    Object.entries(upiCounts).filter(([, count]) => count >= 3).map(([id]) => id)
  );
  const getDetail = (id) => detailsState.find((d) => d.requestId === id.toString());
  const methodLabel = {
    upi: "UPI",
    voucher: "Play Voucher",
    bank: "Bank Transfer"
  };
  const methodBadgeClass = {
    upi: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    voucher: "bg-green-500/20 text-green-300 border border-green-500/30",
    bank: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
  };
  const pendingCount = (withdrawals == null ? void 0 : withdrawals.filter((w) => w.status === "pending").length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    fraudUpiIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/30 bg-destructive/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-destructive flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
        "Fraud Alerts — Suspicious UPI Activity"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [...fraudUpiIds].map((upi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "destructive",
            className: "font-mono text-xs",
            children: [
              upi,
              " (",
              upiCounts[upi],
              " requests)"
            ]
          },
          upi
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "These UPI IDs have been used 3+ times. Review carefully before approving." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          "Withdrawal Requests",
          pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            pendingCount,
            " pending"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Process user withdrawal requests — UPI, Play Voucher, and Bank Transfer" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: withdrawals && withdrawals.length > 0 ? withdrawals.map((withdrawal) => {
          var _a;
          const detail = getDetail(withdrawal.id);
          const method = (detail == null ? void 0 : detail.method) ?? "upi";
          const isFraudUpi = method === "upi" && (detail == null ? void 0 : detail.upiId) && fraudUpiIds.has(detail.upiId.toLowerCase());
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              className: isFraudUpi ? "bg-destructive/5" : "",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-mono text-xs", children: [
                  (detail == null ? void 0 : detail.userId) ? detail.userId.slice(0, 12) : withdrawal.userId.toString().slice(0, 12),
                  "..."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: detail ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-medium px-2 py-0.5 rounded ${methodBadgeClass[method] ?? ""}`,
                    children: methodLabel[method] ?? method
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "max-w-[180px]", children: [
                  (detail == null ? void 0 : detail.method) === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs truncate", children: detail.upiId }),
                    isFraudUpi && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1 mt-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
                      "Suspicious — multiple requests"
                    ] })
                  ] }),
                  (detail == null ? void 0 : detail.method) === "voucher" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-400 font-medium", children: "Google Play Voucher" }),
                    detail.voucherCode && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs bg-green-950/30 border border-green-500/20 px-2 py-1 rounded tracking-widest", children: detail.voucherCode }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-[10px] bg-green-500/20 text-green-300 border border-green-500/30 px-1.5 py-0.5 rounded-full", children: "INSTANT ⚡ Auto-Generated" })
                  ] }),
                  (detail == null ? void 0 : detail.method) === "bank" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs space-y-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: detail.accountHolderName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-muted-foreground", children: [
                      "A/C: ****",
                      (_a = detail.accountNumber) == null ? void 0 : _a.slice(-4)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-muted-foreground", children: [
                      "IFSC: ",
                      detail.ifscCode
                    ] })
                  ] }),
                  !detail && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "No details" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: formatCurrency(withdrawal.amount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatDateTime(withdrawal.timestamp) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: withdrawal.status === "approved" ? "default" : withdrawal.status === "pending" ? "secondary" : "destructive",
                    className: withdrawal.status === "approved" ? "bg-success" : "",
                    children: withdrawal.status.toUpperCase()
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: withdrawal.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      onClick: () => handleApprove(withdrawal.id),
                      disabled: approveMutation.isPending,
                      "data-ocid": "admin.withdrawals.approve_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 mr-1" }),
                        "Approve"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "destructive",
                      onClick: () => handleReject(withdrawal.id),
                      disabled: rejectMutation.isPending,
                      "data-ocid": "admin.withdrawals.delete_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3 mr-1" }),
                        "Reject"
                      ]
                    }
                  )
                ] }) })
              ]
            },
            withdrawal.id.toString()
          );
        }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 7,
            className: "text-center text-muted-foreground py-8",
            "data-ocid": "admin.withdrawals.empty_state",
            children: "No withdrawal requests yet"
          }
        ) }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VoucherTransactionsLog, {})
  ] });
}
function VoucherTransactionsLog() {
  const allVouchers = getMyVouchers();
  const voucherWithdrawals = getWithdrawalDetails().filter(
    (d) => d.method === "voucher"
  );
  if (allVouchers.length === 0 && voucherWithdrawals.length === 0) return null;
  const sorted = [...allVouchers].sort((a, b) => b.createdAt - a.createdAt);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-green-500/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-green-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-5 w-5" }),
        "Play Store Voucher Log",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-600/20 text-green-300 border-green-500/30 text-xs font-normal ml-1", children: [
          sorted.length,
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "All auto-generated Play Store voucher codes. No admin action required — these are delivered instantly." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Voucher Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Expires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: sorted.length > 0 ? sorted.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": `admin.voucher_log.row.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-mono text-xs", children: [
              v.userId.slice(0, 12),
              "..."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-semibold", children: [
              "₹",
              v.amount
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-green-950/30 border border-green-500/20 px-2 py-1 rounded tracking-widest text-green-300", children: v.code }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: new Date(v.createdAt).toLocaleDateString("en-IN") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: new Date(v.expiresAt).toLocaleDateString("en-IN") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: v.status === "used" ? "secondary" : Date.now() > v.expiresAt ? "destructive" : "default",
                className: v.status === "unused" && Date.now() <= v.expiresAt ? "bg-green-600/30 text-green-300 border-green-500/40" : "",
                children: v.status === "used" ? "Used" : Date.now() > v.expiresAt ? "Expired" : "Active"
              }
            ) })
          ]
        },
        v.id
      )) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: 6,
          className: "text-center text-muted-foreground py-8",
          "data-ocid": "admin.voucher_log.empty_state",
          children: "No vouchers generated yet"
        }
      ) }) })
    ] }) }) })
  ] });
}
function UsersTab() {
  const { data: users } = useGetAllUsers();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "User Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View all registered platform users" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: users && users.length > 0 ? users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": "admin.users.row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: user.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: user.role === "admin" ? "default" : "secondary",
                children: user.role.toUpperCase()
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: user.banned ? "destructive" : "default",
                className: !user.banned ? "bg-success" : "",
                children: user.banned ? "BANNED" : "ACTIVE"
              }
            ) })
          ]
        },
        `${user.username}-${user.email}`
      )) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: 4,
          className: "text-center py-8 text-muted-foreground",
          "data-ocid": "admin.users.empty_state",
          children: "No users registered yet"
        }
      ) }) })
    ] }) })
  ] });
}
function RedeemRequestsTab() {
  const approveDepositMutation = useApproveDeposit();
  const rejectDepositMutation = useRejectDeposit();
  const [requests, setRequests] = reactExports.useState(
    () => getRedeemRequests()
  );
  const refresh = () => setRequests(getRedeemRequests());
  const handleApprove = async (req) => {
    try {
      if (req.depositRequestId) {
        await approveDepositMutation.mutateAsync(BigInt(req.depositRequestId));
      }
      const updated = getRedeemRequests().map(
        (r) => r.id === req.id ? { ...r, status: "approved" } : r
      );
      saveRedeemRequests(updated);
      const usedCodes = JSON.parse(
        localStorage.getItem("gp_used_codes") || "[]"
      );
      usedCodes.push(req.code.toUpperCase().trim());
      localStorage.setItem("gp_used_codes", JSON.stringify(usedCodes));
      ue.success(
        `Approved ₹${req.amount} redeem for ${req.username}. Wallet credited!`
      );
      refresh();
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to approve redeem request");
    }
  };
  const handleReject = async (req) => {
    try {
      if (req.depositRequestId) {
        await rejectDepositMutation.mutateAsync(BigInt(req.depositRequestId));
      }
    } catch {
    }
    const updated = getRedeemRequests().map(
      (r) => r.id === req.id ? { ...r, status: "rejected" } : r
    );
    saveRedeemRequests(updated);
    ue.success(`Rejected redeem request from ${req.username}`);
    refresh();
  };
  const pending = requests.filter((r) => r.status === "pending");
  const others = requests.filter((r) => r.status !== "pending");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-500/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pending Redeem Requests" }),
          pending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-500 text-black", children: pending.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Google Play gift card codes awaiting approval (Demo Mode)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: pending.length > 0 ? pending.map((req, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `admin.redeem.row.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: req.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-xs bg-muted px-2 py-1 rounded", children: req.code }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-semibold text-green-400", children: [
                "₹",
                req.amount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: new Date(req.timestamp).toLocaleString("en-IN") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "bg-green-600 hover:bg-green-700",
                    "data-ocid": `admin.redeem.confirm_button.${idx + 1}`,
                    onClick: () => handleApprove(req),
                    disabled: approveDepositMutation.isPending,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-1" }),
                      "Approve"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "destructive",
                    "data-ocid": `admin.redeem.delete_button.${idx + 1}`,
                    onClick: () => handleReject(req),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-1" }),
                      "Reject"
                    ]
                  }
                )
              ] }) })
            ]
          },
          req.id
        )) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 5,
            className: "text-center py-8 text-muted-foreground",
            "data-ocid": "admin.redeem.empty_state",
            children: "No pending redeem requests"
          }
        ) }) })
      ] }) })
    ] }),
    others.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-muted/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Redeem History" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: others.map((req, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `admin.redeem_history.row.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: req.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-xs bg-muted px-2 py-1 rounded", children: req.code }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                "₹",
                req.amount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: req.status === "approved" ? "default" : "destructive",
                  className: req.status === "approved" ? "bg-success" : "",
                  children: req.status.toUpperCase()
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: new Date(req.timestamp).toLocaleString("en-IN") })
            ]
          },
          req.id
        )) })
      ] }) })
    ] })
  ] });
}
function AdStatsTab() {
  const tokens = useTokens();
  const stats = tokens.adStats;
  const allTime = tokens.allTime;
  const todayCards = [
    {
      label: "Manual Ads Today",
      value: stats.manualAdsToday,
      icon: Play,
      color: "border-cyan-500/30 bg-cyan-950/20",
      textColor: "text-cyan-400"
    },
    {
      label: "Tournament Ads Today",
      value: stats.tournamentAdsToday,
      icon: Trophy,
      color: "border-yellow-500/30 bg-yellow-950/20",
      textColor: "text-yellow-400"
    },
    {
      label: "Withdrawal Ads Today",
      value: stats.withdrawalAdsToday,
      icon: IndianRupee,
      color: "border-green-500/30 bg-green-950/20",
      textColor: "text-green-400"
    },
    {
      label: "Total Ads Today",
      value: stats.totalAdsToday,
      icon: Coins,
      color: "border-primary/30 bg-primary/5",
      textColor: "text-primary"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.adstats.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-yellow-500/30 bg-yellow-950/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-yellow-400 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-4 w-4 flex-shrink-0" }),
      "Stats shown for current admin's account (localStorage-based). Platform-wide stats require backend integration."
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-5 w-5 text-cyan-400" }),
        "Today's Ad Activity"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: todayCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `${card.color}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CardTitle,
          {
            className: `text-sm flex items-center gap-2 ${card.textColor}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: "h-4 w-4" }),
              card.label
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `text-4xl font-bold font-display ${card.textColor}`,
            children: card.value
          }
        ) })
      ] }, card.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-500/30 bg-yellow-950/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-yellow-400 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-4 w-4" }),
          "Tokens Distributed Today"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold font-display text-yellow-300", children: stats.totalTokensEarnedToday }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Manual + Tournament bonus tokens" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-green-500/30 bg-green-950/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-green-400 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-4 w-4" }),
          "Rewards Paid Today"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold font-display text-green-300", children: [
            "₹",
            (stats.withdrawalAdsToday * 1.25).toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            stats.withdrawalAdsToday,
            " × ₹1.25"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-primary" }),
        "All-Time Statistics"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-cyan-500/30 bg-cyan-950/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs text-cyan-400 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5" }),
            "Total Ads Watched"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-cyan-300", children: allTime.totalAdsWatched }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-500/30 bg-yellow-950/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs text-yellow-400 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-3.5 w-3.5" }),
            "Total Tokens Distributed"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-yellow-300", children: allTime.totalTokensDistributed }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-green-500/30 bg-green-950/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs text-green-400 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3.5 w-3.5" }),
            "Total Withdrawals"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-300", children: allTime.totalWithdrawals }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-primary/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs text-primary flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-3.5 w-3.5" }),
            "Total Rewards Paid"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-primary", children: [
            "₹",
            allTime.totalRupeesPaid.toFixed(2)
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
          "Current Admin Token Balance"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your personal token balance (as logged-in user)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-yellow-400", children: [
            tokens.balance,
            " 🪙"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Total Earned" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-yellow-300", children: tokens.totalEarned })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Total Withdrawn" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-400", children: tokens.totalWithdrawn })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-5 w-5 text-cyan-400" }),
        "Server Load Simulation"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-green-500/30 bg-green-950/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-green-400 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
              "50 Users"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-600 text-white text-xs", children: "Fast" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: 18, className: "h-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-green-300", children: "<100ms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Response time" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-500/30 bg-yellow-950/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-yellow-400 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4" }),
              "100 Users"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-600 text-white text-xs", children: "Good" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: 38, className: "h-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-yellow-300", children: "<300ms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Response time" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-orange-500/30 bg-orange-950/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-orange-400 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4" }),
              "500 Users"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-600 text-white text-xs", children: "Moderate" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: 65, className: "h-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-orange-300", children: "<800ms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Response time" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-cyan-500/20 bg-cyan-950/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-cyan-300 flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 mt-0.5 flex-shrink-0 text-cyan-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Internet Computer blockchain" }),
          " ",
          "scales automatically. No manual server management needed. Caching, lazy loading, and query optimization are active."
        ] })
      ] }) }) })
    ] })
  ] });
}
function SecurityTab() {
  const { flags, refresh: refreshFlags } = useGetCheaterFlags();
  const { teams: dqTeams, refresh: refreshDqTeams } = useGetDisqualifiedTeams();
  const { data: allTeams } = useGetTeams();
  const activeFlagCount = flags.filter((f) => f.status === "flagged").length;
  const handleBanAndDisqualify = (flagId) => {
    banFlaggedPlayer(flagId);
    const flag = flags.find((f) => f.id === flagId);
    if (flag) {
      const team = allTeams == null ? void 0 : allTeams.find(
        (t) => t.members.some((m) => m.freeFireId === flag.ffId)
      );
      if (team) {
        disqualifyTeam(
          team.id.toString(),
          team.name,
          flag.tournamentId,
          flag.tournamentName,
          `Auto-ban: ${flag.reason}`
        );
        refreshDqTeams();
      }
      ue.error("Player disqualified and banned. No refund issued.", {
        description: `${flag.playerName} (${flag.ffId}) has been banned from the platform.`,
        duration: 5e3
      });
    }
    refreshFlags();
  };
  const handleDisqualifyTeamOnly = (flagId) => {
    const flag = flags.find((f) => f.id === flagId);
    if (!flag) return;
    const team = allTeams == null ? void 0 : allTeams.find(
      (t) => t.members.some((m) => m.freeFireId === flag.ffId)
    );
    if (team) {
      disqualifyTeam(
        team.id.toString(),
        team.name,
        flag.tournamentId,
        flag.tournamentName,
        `Disqualified: ${flag.reason}`
      );
      refreshDqTeams();
      ue.warning(`Team "${team.name}" has been disqualified.`);
    } else {
      ue.error("Could not find the team for this player.");
    }
  };
  const handleClearFlag = (flagId) => {
    clearFlag(flagId);
    refreshFlags();
    ue.success("Flag cleared successfully.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.security.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 px-4 py-3 rounded-xl",
          style: {
            background: "rgba(220,0,0,0.08)",
            border: "1px solid rgba(220,0,0,0.2)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-6 w-6 text-destructive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-display text-destructive", children: activeFlagCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Active Flags" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 px-4 py-3 rounded-xl",
          style: {
            background: "rgba(255,130,0,0.08)",
            border: "1px solid rgba(255,130,0,0.2)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-6 w-6 text-orange-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-display text-orange-400", children: dqTeams.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disqualified Teams" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 px-4 py-3 rounded-xl",
          style: {
            background: "rgba(50,50,50,0.3)",
            border: "1px solid rgba(100,100,100,0.2)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-display", children: flags.filter((f) => f.status === "banned").length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Bans" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        style: { border: "1px solid rgba(220,0,0,0.3)" },
        "data-ocid": "admin.security.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-5 w-5" }),
              "Auto-Flagged Players",
              activeFlagCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "ml-2", children: [
                activeFlagCount,
                " Pending"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Players automatically flagged for suspicious kill counts (15+). Review and take action." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "admin.security.table", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Player" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "FF ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tournament" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kills" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Reason" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: flags.length > 0 ? flags.map((flag, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TableRow,
              {
                "data-ocid": `admin.security.row.${idx + 1}`,
                style: flag.status === "flagged" ? { background: "rgba(220,0,0,0.04)" } : {},
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: flag.playerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: flag.ffId }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground max-w-[120px] truncate", children: flag.tournamentName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-bold ${flag.kills >= 15 ? "text-destructive" : ""}`,
                      children: flag.kills
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground max-w-[150px]", children: flag.reason }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground whitespace-nowrap", children: new Date(flag.timestamp).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit"
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: flag.status === "flagged" ? "destructive" : flag.status === "banned" ? "outline" : "secondary",
                      className: flag.status === "cleared" ? "border-green-500/40 text-green-400" : flag.status === "banned" ? "border-orange-500/40 text-orange-400" : "",
                      children: flag.status.toUpperCase()
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                    flag.status === "flagged" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "destructive",
                          className: "text-xs h-7 px-2",
                          "data-ocid": `admin.security.delete_button.${idx + 1}`,
                          onClick: () => handleBanAndDisqualify(flag.id),
                          children: "Ban + DQ"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          className: "text-xs h-7 px-2 border-orange-500/40 text-orange-400 hover:bg-orange-950/20",
                          "data-ocid": `admin.security.secondary_button.${idx + 1}`,
                          onClick: () => handleDisqualifyTeamOnly(flag.id),
                          children: "DQ Team"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "text-xs h-7 px-2 text-muted-foreground",
                          "data-ocid": `admin.security.cancel_button.${idx + 1}`,
                          onClick: () => handleClearFlag(flag.id),
                          children: "Clear"
                        }
                      )
                    ] }),
                    flag.status !== "flagged" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: flag.status === "banned" ? "Banned ✓" : "Cleared ✓" })
                  ] })
                ]
              },
              flag.id
            )) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              TableCell,
              {
                colSpan: 8,
                className: "text-center py-12 text-muted-foreground",
                "data-ocid": "admin.security.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No suspicious activity detected" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Players with 15+ kills will be auto-flagged here" })
                ] })
              }
            ) }) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        style: { border: "1px solid rgba(255,130,0,0.3)" },
        "data-ocid": "admin.security.dq.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-orange-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
              "Disqualified Teams"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Teams that have been disqualified from tournaments. No refunds are issued." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Team Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tournament" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Reason" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: dqTeams.length > 0 ? dqTeams.map((team, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TableRow,
              {
                "data-ocid": `admin.security.dq.row.${idx + 1}`,
                style: { background: "rgba(255,130,0,0.04)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: team.teamName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: team.tournamentName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: team.reason }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground whitespace-nowrap", children: new Date(team.timestamp).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit"
                  }) })
                ]
              },
              team.id
            )) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              TableCell,
              {
                colSpan: 4,
                className: "text-center py-8 text-muted-foreground",
                "data-ocid": "admin.security.dq.empty_state",
                children: "No teams disqualified yet"
              }
            ) }) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary/20 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 mt-0.5 flex-shrink-0 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
          "Fair Play Policy:",
          " "
        ] }),
        "Hackers aur cheat users ko",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-semibold", children: "permanently ban" }),
        " ",
        "kiya jayega with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-semibold", children: "no refund" }),
        ". Har match mein fair play mandatory hai."
      ] })
    ] }) }) })
  ] });
}
function ReferralsTab() {
  const stats = getReferralStats();
  const fraudOnly = stats.allReferrals.filter((r) => r.status === "fraud");
  const maskName = (name) => {
    if (!name || name.length < 2) return "****";
    return `${name.slice(0, 2)}****`;
  };
  const formatDate = (ts) => {
    return new Date(ts).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-green-500/30 bg-green-950/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-4 w-4 text-green-400" }),
          "Total Successful Referrals"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-400", children: stats.totalReferrals }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-500/30 bg-yellow-950/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-4 w-4 text-yellow-400" }),
          "Total Rewards Paid"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-yellow-400", children: [
          "₹",
          stats.totalEarnings.toFixed(2)
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/30 bg-destructive/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 text-destructive" }),
          "Fraud Attempts Blocked"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-destructive", children: stats.fraudAttempts }) })
      ] })
    ] }),
    fraudOnly.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-500/40 bg-yellow-950/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-yellow-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
          "Fraud Alerts (",
          fraudOnly.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-yellow-400/70", children: "These registrations were blocked due to same device/IP detection" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Referrer ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Friend" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Device Fingerprint" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: fraudOnly.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "border-yellow-500/10 bg-yellow-950/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-mono text-xs text-muted-foreground max-w-24 truncate", children: [
                r.referrerId.slice(0, 16),
                "..."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: maskName(r.newUserName) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-muted-foreground", children: r.deviceFingerprint }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatDate(r.timestamp) })
            ]
          },
          r.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }),
          "Referral Logs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "All referral attempts sorted by newest first" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: stats.allReferrals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-10 text-muted-foreground",
          "data-ocid": "admin.referrals.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-10 w-10 mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No referrals yet" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "admin.referrals.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Referrer Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Friend" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: stats.allReferrals.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `admin.referrals.row.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono font-semibold text-primary", children: r.referrerCode }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: maskName(r.newUserName) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatDate(r.timestamp) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-yellow-400 font-semibold", children: [
                "₹",
                r.rewardAmount.toFixed(2)
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "₹0" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-700/30 text-green-300 border-green-500/30 flex items-center gap-1 w-fit", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                "Success"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "destructive",
                  className: "flex items-center gap-1 w-fit opacity-80",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
                    "Fraud"
                  ]
                }
              ) })
            ]
          },
          r.id
        )) })
      ] }) })
    ] })
  ] });
}
export {
  AdminPage
};
