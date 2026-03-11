import { c as createLucideIcon, a as useGetTournaments, r as reactExports, j as jsxRuntimeExports, q as getTournamentTypeLabel, ap as getTournamentPlayerInfo, l as formatCurrency, Q as Link } from "./index-CDAki4Zg.js";
import { C as CountdownTimer } from "./CountdownTimer-B4ghTFvn.js";
import { S as Skeleton } from "./skeleton-DLt6UjPI.js";
import { C as Calendar } from "./calendar-BCoP9Nar.js";
import { U as Users } from "./users-v1dpv8r7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function TournamentsPage() {
  const { data: tournaments, isLoading } = useGetTournaments();
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const filteredTournaments = (tournaments == null ? void 0 : tournaments.filter((t) => {
    const matchesType = typeFilter === "all" || t.tournamentType === typeFilter;
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesType && matchesStatus;
  })) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pb-24", style: { background: "#0A0A0A" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8 space-y-6 px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              borderLeft: "3px solid #00FF88",
              paddingLeft: 12
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "text-4xl font-bold font-display",
                style: {
                  borderBottom: "2px solid rgba(0,255,136,0.4)",
                  paddingBottom: 4
                },
                children: "All Tournaments"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlidersHorizontal,
          {
            className: "md:hidden",
            style: { width: 20, height: 20, color: "#00FF88", flexShrink: 0 }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "pl-4 md:pl-0",
          style: { color: "rgba(255,255,255,0.5)" },
          children: "Browse and register for Free Fire tournaments"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide",
          "data-ocid": "tournaments.type_filter.panel",
          children: [
            { value: "all", label: "All" },
            { value: "battleground", label: "⚔️ Battle Ground" },
            { value: "custom4v4", label: "🎮 4vs4" },
            { value: "custom1v1", label: "🥇 1vs1" },
            { value: "custom2v2", label: "🥈 2vs2" }
          ].map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setTypeFilter(chip.value),
              className: "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all",
              style: {
                background: typeFilter === chip.value ? "#00FF88" : "rgba(22,33,62,0.6)",
                color: typeFilter === chip.value ? "#0A0A0A" : "rgba(255,255,255,0.6)",
                border: typeFilter === chip.value ? "1px solid #00FF88" : "1px solid rgba(0,255,136,0.2)",
                boxShadow: typeFilter === chip.value ? "0 0 12px rgba(0,255,136,0.5)" : "none"
              },
              "data-ocid": "tournaments.type_filter.tab",
              children: chip.label
            },
            chip.value
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide",
          "data-ocid": "tournaments.status_filter.panel",
          children: [
            { value: "all", label: "All Status" },
            { value: "upcoming", label: "⏰ Upcoming" },
            { value: "ongoing", label: "🔴 Live" },
            { value: "completed", label: "✅ Done" }
          ].map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setStatusFilter(chip.value),
              className: "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all",
              style: {
                background: statusFilter === chip.value ? "#9d4edd" : "rgba(22,33,62,0.6)",
                color: statusFilter === chip.value ? "#fff" : "rgba(255,255,255,0.6)",
                border: statusFilter === chip.value ? "1px solid rgba(157,78,221,0.8)" : "1px solid rgba(157,78,221,0.2)",
                boxShadow: statusFilter === chip.value ? "0 0 12px rgba(157,78,221,0.5)" : "none"
              },
              "data-ocid": "tournaments.status_filter.tab",
              children: chip.label
            },
            chip.value
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", style: { color: "rgba(255,255,255,0.4)" }, children: [
        filteredTournaments.length,
        " tournament",
        filteredTournaments.length !== 1 ? "s" : "",
        " found"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "h-96 rounded-[12px]",
        style: { background: "rgba(22,33,62,0.4)" }
      },
      i
    )) }) : filteredTournaments.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: filteredTournaments.map((tournament) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TournamentCard,
      {
        tournament
      },
      tournament.id.toString()
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-12 rounded-[12px] text-center",
        style: {
          background: "rgba(22,33,62,0.4)",
          border: "1px solid rgba(0,255,136,0.12)"
        },
        "data-ocid": "tournaments.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "rgba(255,255,255,0.5)" }, children: "No tournaments found matching your filters." })
      }
    )
  ] }) });
}
function TournamentCard({ tournament }) {
  const isUpcoming = tournament.status === "upcoming";
  const isOngoing = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";
  const modeIcon = tournament.tournamentType === "battleground" ? "⚔️" : tournament.tournamentType === "custom4v4" ? "🎮" : tournament.tournamentType === "custom1v1" ? "🥇" : "🥈";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-[12px] overflow-hidden transition-all duration-200",
      style: {
        background: "rgba(16,24,48,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isOngoing ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(0,255,136,0.18)",
        boxShadow: isOngoing ? "0 4px 24px rgba(239,68,68,0.2)" : "0 4px 20px rgba(0,0,0,0.5)"
      },
      onMouseEnter: (e) => {
        const el = e.currentTarget;
        el.style.boxShadow = isOngoing ? "0 8px 32px rgba(239,68,68,0.3)" : "0 8px 32px rgba(0,255,136,0.15), 0 4px 20px rgba(0,0,0,0.5)";
        el.style.borderColor = isOngoing ? "rgba(239,68,68,0.8)" : "rgba(0,255,136,0.4)";
      },
      onMouseLeave: (e) => {
        const el = e.currentTarget;
        el.style.boxShadow = isOngoing ? "0 4px 24px rgba(239,68,68,0.2)" : "0 4px 20px rgba(0,0,0,0.5)";
        el.style.borderColor = isOngoing ? "rgba(239,68,68,0.5)" : "rgba(0,255,136,0.18)";
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-1 w-full",
            style: {
              background: isOngoing ? "linear-gradient(90deg, #ef4444, #ff6b6b)" : isCompleted ? "linear-gradient(90deg, #555, #777)" : "linear-gradient(90deg, #00FF88, #9d4edd)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-bold uppercase px-2 py-0.5 rounded-full",
                style: {
                  background: isOngoing ? "rgba(239,68,68,0.2)" : isCompleted ? "rgba(100,100,100,0.2)" : "rgba(0,255,136,0.12)",
                  color: isOngoing ? "#ff6b6b" : isCompleted ? "#888" : "#00FF88",
                  border: `1px solid ${isOngoing ? "rgba(239,68,68,0.4)" : isCompleted ? "rgba(100,100,100,0.3)" : "rgba(0,255,136,0.3)"}`
                },
                children: isOngoing ? "🔴 LIVE" : isCompleted ? "✅ DONE" : "⏰ UPCOMING"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs font-medium px-2 py-0.5 rounded-full",
                style: {
                  background: "rgba(157,78,221,0.15)",
                  color: "#c084fc",
                  border: "1px solid rgba(157,78,221,0.3)"
                },
                children: [
                  modeIcon,
                  " ",
                  getTournamentTypeLabel(tournament.tournamentType)
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display font-bold text-white leading-tight",
              style: { fontSize: "clamp(1rem, 4vw, 1.15rem)" },
              children: tournament.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.45)" }, children: getTournamentPlayerInfo(tournament.tournamentType).description }),
          isUpcoming && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 text-xs",
              style: { color: "#FFD700" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Starts in: " }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownTimer, { targetTime: tournament.startTime, compact: true })
              ]
            }
          ),
          isOngoing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-sm font-semibold",
              style: { color: "#ef4444" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-red-500 animate-pulse" }),
                "Tournament is Live!"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg p-3 space-y-2",
              style: {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.5)" }, children: "Entry Fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white", children: formatCurrency(tournament.entryFee) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.5)" }, children: "Prize Pool" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", style: { color: "#00FF88" }, children: formatCurrency(tournament.prizePool) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "flex items-center gap-1",
                      style: { color: "rgba(255,255,255,0.5)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
                        " Slots"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-white", children: [
                    tournament.maxTeams.toString(),
                    " teams"
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/tournament/$id",
              params: { id: tournament.id.toString() },
              className: "block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all",
              style: isOngoing ? {
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff",
                boxShadow: "0 0 16px rgba(239,68,68,0.4)"
              } : isUpcoming ? {
                background: "linear-gradient(135deg, #00FF88, #00cc6a)",
                color: "#0A0A0A",
                boxShadow: "0 0 16px rgba(0,255,136,0.4)"
              } : {
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.15)"
              },
              "data-ocid": "tournaments.register.button",
              children: isOngoing ? "View Live" : isUpcoming ? "⚡ Register Now" : "View Details"
            }
          )
        ] })
      ]
    }
  );
}
export {
  TournamentsPage
};
