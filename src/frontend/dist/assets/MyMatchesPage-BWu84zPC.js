import { c as createLucideIcon, af as useOtpAuth, r as reactExports, ao as useGetCallerTeamRegistrations, x as useGetTournaments, B as useGetTeamRegistrations, j as jsxRuntimeExports, y as Swords, U as Button, ai as Link, L as Card, T as CardContent, V as getTournamentTypeLabel, $ as formatDateTime, H as formatCurrency, a5 as Trophy, a9 as ue } from "./index-Chbj-AOn.js";
import { B as Badge } from "./badge-jp_-NXEv.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-CbA8zaKB.js";
import { S as Skeleton } from "./skeleton-Dx-t9y7q.js";
import { Z as Zap } from "./zap-eo5sERO8.js";
import { C as Calendar } from "./calendar-BudKIq18.js";
import { K as KeyRound } from "./key-round-BkzleIe9.js";
import { C as Check } from "./check-Bb_5y4m3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
];
const ClipboardCopy = createLucideIcon("clipboard-copy", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
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
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
function loadFreeMyMatches() {
  try {
    return JSON.parse(localStorage.getItem("ke_free_my_matches") || "[]");
  } catch {
    return [];
  }
}
function getFreeMatchTime(id) {
  return localStorage.getItem(`freeMatchTime_${id}`) || "";
}
function getFreeMatchStatus(id) {
  const started = localStorage.getItem(`freeMatchStarted_${id}`) === "true";
  return started ? "Live" : "Upcoming";
}
function getFreeRoomId(id) {
  return localStorage.getItem(`freeRoomId_${id}`) || "";
}
function getFreeRoomPassword(id) {
  return localStorage.getItem(`freeRoomPassword_${id}`) || "";
}
function FreeMatchCard({
  match,
  index
}) {
  const [roomOpen, setRoomOpen] = reactExports.useState(false);
  const timeStr = getFreeMatchTime(match.tournamentId);
  const status = getFreeMatchStatus(match.tournamentId);
  const roomId = getFreeRoomId(match.tournamentId);
  const roomPass = getFreeRoomPassword(match.tournamentId);
  const formattedTime = timeStr ? new Date(timeStr).toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : "Time TBD";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      "data-ocid": `free_match.card.${index}`,
      style: {
        background: "#16213E",
        borderRadius: 12,
        border: "1px solid rgba(0,255,136,0.2)",
        marginBottom: 12,
        overflow: "hidden"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-bold text-base leading-snug truncate",
                  style: {
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#FFFFFF",
                    textTransform: "uppercase"
                  },
                  children: match.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0",
                  style: {
                    background: "rgba(0,255,136,0.15)",
                    color: "#00FF88",
                    border: "1px solid rgba(0,255,136,0.3)"
                  },
                  children: "🎁 FREE"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 flex-shrink-0" }),
              formattedTime
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              match.mode,
              " • Prize: ",
              match.prizePool
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: 10,
                fontWeight: 700,
                fontFamily: "'Rajdhani', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                flexShrink: 0,
                background: status === "Live" ? "rgba(255,68,68,0.15)" : "rgba(255,215,0,0.15)",
                color: status === "Live" ? "#FF4444" : "#FFD700",
                border: status === "Live" ? "1px solid rgba(255,68,68,0.5)" : "1px solid rgba(255,215,0,0.5)"
              },
              children: status === "Live" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#FF4444",
                      display: "inline-block",
                      animation: "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite"
                    }
                  }
                ),
                "LIVE"
              ] }) : status
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground/70", children: [
          "Player:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: match.nickname }),
          " ",
          "• UID: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: match.uid })
        ] }),
        roomId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "w-full border-primary/30 text-primary hover:bg-primary/10",
            "data-ocid": `free_match.room_button.${index}`,
            onClick: () => setRoomOpen(true),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3.5 w-3.5 mr-1.5" }),
              "🔑 ID/PASSWORD"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: roomOpen, onOpenChange: setRoomOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-sm",
            "data-ocid": "free_room_details.dialog",
            style: {
              background: "linear-gradient(135deg, oklch(0.10 0.03 285), oklch(0.08 0.025 285))",
              border: "1px solid oklch(0.70 0.20 160 / 0.35)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: match.name }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-4",
                    style: {
                      background: "oklch(0.12 0.05 195 / 0.25)",
                      border: "1px solid oklch(0.75 0.18 195 / 0.25)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Room ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold text-primary", children: roomId })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-4",
                    style: {
                      background: "oklch(0.12 0.05 345 / 0.2)",
                      border: "1px solid oklch(0.62 0.25 345 / 0.25)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Password" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold text-secondary", children: roomPass || "—" })
                    ]
                  }
                )
              ] })
            ]
          }
        ) })
      ] })
    }
  );
}
function startTimeMs(t) {
  return Number(t.startTime) / 1e6;
}
function isRoomVisible(t) {
  const now = Date.now();
  const start = startTimeMs(t);
  return now >= start && !!t.roomId;
}
function isStartingSoon(t) {
  const now = Date.now();
  const start = startTimeMs(t);
  return now >= start - 15 * 60 * 1e3 && now < start;
}
function perKillDisplay(t) {
  const type = t.tournamentType;
  if (type === "battleground") {
    const perKillPaise = Math.round(Number(t.prizePool) * 0.1 / 48);
    if (perKillPaise <= 0) return "—";
    return `₹${(perKillPaise / 100).toFixed(2)}/kill`;
  }
  return "—";
}
function getSlotInfo(tournamentId) {
  return localStorage.getItem(`roomSlot_${tournamentId.toString()}`) ?? "";
}
function RoomDetailsDialog({
  open,
  onOpenChange,
  tournament
}) {
  const [copiedField, setCopiedField] = reactExports.useState(
    null
  );
  const slotInfo = getSlotInfo(tournament.id);
  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      ue.success("Copied!", {
        description: field === "roomId" ? "Room ID copied" : "Password copied",
        duration: 2e3
      });
      setTimeout(() => setCopiedField(null), 2e3);
    } catch {
      ue.error("Copy failed. Please copy manually.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-sm",
      "data-ocid": "room_details.dialog",
      style: {
        background: "linear-gradient(135deg, oklch(0.10 0.03 285), oklch(0.08 0.025 285))",
        border: "1px solid oklch(0.70 0.20 160 / 0.35)",
        boxShadow: "0 0 40px oklch(0.70 0.20 160 / 0.12), 0 8px 32px rgba(0,0,0,0.5)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-lg font-display font-bold text-foreground leading-tight", children: tournament.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 flex-shrink-0" }),
            formatDateTime(tournament.startTime)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-3 py-2 rounded-lg",
              style: { background: "oklch(0.14 0.03 285 / 0.8)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-yellow-400" }),
                  "Prize Pool"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-yellow-300 font-display", children: formatCurrency(tournament.prizePool) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-4 space-y-1",
              style: {
                background: "oklch(0.12 0.05 195 / 0.25)",
                border: "1px solid oklch(0.75 0.18 195 / 0.25)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3.5 w-3.5 text-primary" }),
                  "Room ID"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-mono text-2xl font-bold tracking-wider text-primary",
                    style: { letterSpacing: "0.15em" },
                    children: tournament.roomId ?? "—"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-4 space-y-1",
              style: {
                background: "oklch(0.12 0.05 345 / 0.2)",
                border: "1px solid oklch(0.62 0.25 345 / 0.25)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-secondary" }),
                  "Room Password"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-mono text-2xl font-bold tracking-widest text-secondary",
                    style: { letterSpacing: "0.2em" },
                    children: tournament.roomPassword ?? "—"
                  }
                )
              ]
            }
          ),
          slotInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-3 flex items-center gap-3",
              style: {
                background: "oklch(0.12 0.05 285 / 0.3)",
                border: "1px solid oklch(0.65 0.22 285 / 0.25)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-accent flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your Slot" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-accent", children: slotInfo })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                "data-ocid": "room_details.copy_room_id.button",
                className: "border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-primary gap-2 font-mono",
                onClick: () => tournament.roomId && handleCopy(tournament.roomId, "roomId"),
                disabled: !tournament.roomId,
                children: copiedField === "roomId" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }),
                  "Copied!"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "h-3.5 w-3.5" }),
                  "Copy ID"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                "data-ocid": "room_details.copy_password.button",
                className: "border-secondary/30 hover:border-secondary/60 hover:bg-secondary/10 text-secondary gap-2 font-mono",
                onClick: () => tournament.roomPassword && handleCopy(tournament.roomPassword, "password"),
                disabled: !tournament.roomPassword,
                children: copiedField === "password" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }),
                  "Copied!"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "h-3.5 w-3.5" }),
                  "Copy Pass"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function MatchCard({ tournament, registeredCount, index }) {
  const [roomDialogOpen, setRoomDialogOpen] = reactExports.useState(false);
  const isLive = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";
  const roomActive = isRoomVisible(tournament);
  const startingSoon = isStartingSoon(tournament);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        "data-ocid": `my_matches.card.${index}`,
        className: "p-0 overflow-hidden transition-all duration-300",
        style: {
          background: "#16213E",
          borderRadius: 12,
          marginBottom: 12,
          border: isLive ? "1px solid rgba(255,68,68,0.5)" : isCompleted ? "1px solid rgba(0,255,136,0.25)" : "1px solid rgba(0,255,136,0.2)",
          boxShadow: isLive ? "0 0 20px rgba(255,68,68,0.15)" : "0 4px 15px rgba(0,255,136,0.08)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 md:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: "'Rajdhani', sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      background: isLive ? "rgba(255,68,68,0.15)" : isCompleted ? "rgba(0,255,136,0.12)" : "rgba(255,215,0,0.15)",
                      color: isLive ? "#FF4444" : isCompleted ? "#00FF88" : "#FFD700",
                      border: isLive ? "1px solid rgba(255,68,68,0.5)" : isCompleted ? "1px solid rgba(0,255,136,0.4)" : "1px solid rgba(255,215,0,0.5)"
                    },
                    children: isLive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#FF4444",
                            display: "inline-block",
                            animation: "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite"
                          }
                        }
                      ),
                      "LIVE"
                    ] }) : isCompleted ? "✅ COMPLETED" : "⏰ UPCOMING"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[10px] tracking-wide uppercase border-border/50 text-muted-foreground",
                    children: getTournamentTypeLabel(tournament.tournamentType)
                  }
                ),
                startingSoon && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-yellow-400 text-xs font-semibold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-2 w-2 rounded-full bg-yellow-400",
                      style: {
                        animation: "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite"
                      }
                    }
                  ),
                  "Starting Soon!"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-bold text-base md:text-lg leading-tight truncate",
                  style: {
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#FFFFFF",
                    textTransform: "uppercase"
                  },
                  children: tournament.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 flex-shrink-0" }),
                formatDateTime(tournament.startTime)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-600/80 text-white border-0 shrink-0 mt-0.5", children: "✓ Joined" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-3 gap-2 my-3 py-3 rounded-lg",
              style: { background: "oklch(0.10 0.02 285 / 0.7)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5", children: "Prize Pool" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold font-mono text-sm text-yellow-300", children: formatCurrency(tournament.prizePool) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-1 border-x border-border/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5", children: "Per Kill" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold font-mono text-sm text-primary", children: perKillDisplay(tournament) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5", children: "Teams" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold font-mono text-sm text-foreground", children: [
                    registeredCount,
                    "/",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: tournament.maxTeams.toString() })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                "data-ocid": `my_matches.room_button.${index}`,
                disabled: !roomActive,
                onClick: () => setRoomDialogOpen(true),
                className: roomActive ? "flex-1 bg-green-600/90 hover:bg-green-500 text-white border-0 gap-2 font-semibold" : "flex-1 gap-2 font-semibold",
                variant: roomActive ? "default" : "outline",
                style: roomActive ? {
                  boxShadow: "0 0 12px oklch(0.70 0.20 160 / 0.4)"
                } : { opacity: 0.5 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3.5 w-3.5" }),
                  "Room ID & Password"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                "data-ocid": `my_matches.results_button.${index}`,
                disabled: !isCompleted,
                variant: isCompleted ? "default" : "outline",
                asChild: isCompleted,
                className: isCompleted ? "gap-2 font-semibold" : "gap-2 font-semibold opacity-50",
                children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/tournament/$id",
                    params: { id: tournament.id.toString() },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
                      "Results"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
                  "Results"
                ] })
              }
            )
          ] })
        ] })
      }
    ),
    roomActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RoomDetailsDialog,
      {
        open: roomDialogOpen,
        onOpenChange: setRoomDialogOpen,
        tournament
      }
    )
  ] });
}
function MyMatchesPage() {
  const { identity, login } = useOtpAuth();
  const [freeMatches] = reactExports.useState(() => loadFreeMyMatches());
  const { data: myRegistrations, isLoading: regLoading } = useGetCallerTeamRegistrations();
  const { data: tournaments, isLoading: tournLoading } = useGetTournaments();
  const { data: allRegistrations } = useGetTeamRegistrations();
  const isLoading = regLoading || tournLoading;
  const regCountMap = /* @__PURE__ */ new Map();
  if (allRegistrations) {
    for (const r of allRegistrations) {
      const key = r.tournamentId.toString();
      regCountMap.set(key, (regCountMap.get(key) ?? 0) + 1);
    }
  }
  const myTournaments = [];
  if (myRegistrations && tournaments) {
    const seen = /* @__PURE__ */ new Set();
    let idx = 1;
    for (const reg of myRegistrations) {
      const key = reg.tournamentId.toString();
      if (seen.has(key)) continue;
      seen.add(key);
      const tournament = tournaments.find((t) => t.id === reg.tournamentId);
      if (tournament) {
        myTournaments.push({ tournament, index: idx++ });
      }
    }
  }
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container py-16 text-center space-y-6",
        "data-ocid": "my_matches.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-auto w-20 h-20 rounded-full flex items-center justify-center",
              style: {
                background: "oklch(0.12 0.05 195 / 0.3)",
                border: "1px solid oklch(0.75 0.18 195 / 0.3)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-9 w-9 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold font-display", children: "My Matches" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto", children: "Login to view your registered tournaments and access room credentials." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: login,
              size: "lg",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 px-8",
              children: "Login to View Matches"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container py-8 md:py-12 space-y-8",
      "data-ocid": "my_matches.page",
      style: { minHeight: "100vh", background: "#0A0A0A" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
              style: {
                background: "oklch(0.12 0.06 195 / 0.4)",
                border: "1px solid oklch(0.75 0.18 195 / 0.4)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-5 w-5 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "text-3xl md:text-4xl font-bold",
                style: {
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#00FF88",
                  textTransform: "uppercase",
                  textShadow: "0 0 16px rgba(0,255,136,0.4)"
                },
                children: "⚔️ My Matches"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm mt-0.5",
                style: {
                  fontFamily: "'Rajdhani', sans-serif",
                  color: "rgba(255,255,255,0.5)"
                },
                children: "Your registered tournaments — access room details and results here"
              }
            )
          ] })
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "my_matches.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" }, i)) }),
        !isLoading && myTournaments.length === 0 && freeMatches.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-16 text-center space-y-5",
            "data-ocid": "my_matches.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mx-auto w-16 h-16 rounded-full flex items-center justify-center",
                  style: {
                    background: "oklch(0.12 0.05 285 / 0.4)",
                    border: "1px solid oklch(0.25 0.05 285 / 0.6)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-7 w-7 text-muted-foreground" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-muted-foreground", children: "No Matches Yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70", children: "Register for a tournament to see it here!" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tournaments", children: "Browse Tournaments" }) })
            ]
          }
        ),
        !isLoading && myTournaments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [...myTournaments].sort((a, b) => {
          const order = { ongoing: 0, upcoming: 1, completed: 2 };
          const ao = order[a.tournament.status] ?? 3;
          const bo = order[b.tournament.status] ?? 3;
          if (ao !== bo) return ao - bo;
          return startTimeMs(b.tournament) - startTimeMs(a.tournament);
        }).map(({ tournament, index }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          MatchCard,
          {
            tournament,
            registeredCount: regCountMap.get(tournament.id.toString()) ?? 0,
            index
          },
          tournament.id.toString()
        )) }),
        freeMatches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-sm font-bold",
              style: { color: "#00FF88", fontFamily: "'Orbitron', sans-serif" },
              children: "🎁 FREE TOURNAMENTS"
            }
          ) }),
          freeMatches.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            FreeMatchCard,
            {
              match,
              index: i + 1
            },
            `${match.tournamentId}-${match.uid}`
          ))
        ] })
      ]
    }
  );
}
export {
  MyMatchesPage
};
