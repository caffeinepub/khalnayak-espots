import { w as createLucideIcon, H as reactExports, h as useGetCallerTeamRegistrations, d as useGetTournaments, a8 as useGetTeamRegistrations, j as jsxRuntimeExports, aj as Swords, m as Button, L as Link, Q as getTournamentTypeLabel, f as formatCurrency, T as Trophy, c as ue } from "./index-Bq9COV-K.js";
import { B as Badge } from "./badge-CPKanA6G.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Bj5yHM1K.js";
import { S as Skeleton } from "./skeleton-DPpORLpt.js";
import { Z as Zap } from "./zap-CaP09V0y.js";
import { C as Check } from "./check-D1VszcOf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
];
const ClipboardCopy = createLucideIcon("clipboard-copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const YOUTUBE_URL = "https://www.youtube.com/@kl_tournament_007";
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
  const isLive = status === "Live";
  const formattedTime = timeStr ? new Date(timeStr).toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : "Time TBD";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `free_match.card.${index}`,
        style: {
          background: "#FFFFFF",
          borderRadius: 16,
          boxShadow: isLive ? "0 4px 16px rgba(255,68,68,0.15)" : "0 4px 16px rgba(0,0,0,0.08)",
          border: isLive ? "1px solid rgba(255,68,68,0.4)" : "1px solid #e5e7eb",
          padding: 20,
          marginBottom: 16,
          transition: "all 0.2s ease"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 14
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                      marginBottom: 6
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          style: {
                            background: isLive ? "rgba(255,68,68,0.15)" : "rgba(59,130,246,0.15)",
                            color: isLive ? "#FF4444" : "#3B82F6",
                            border: `1px solid ${isLive ? "rgba(255,68,68,0.4)" : "rgba(59,130,246,0.4)"}`,
                            borderRadius: 20,
                            padding: "3px 10px",
                            fontSize: 10,
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: 4
                          },
                          children: [
                            isLive && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                            isLive ? "LIVE" : "UPCOMING"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            background: "#00FF88",
                            color: "#000000",
                            borderRadius: 20,
                            padding: "3px 10px",
                            fontSize: 10,
                            fontWeight: 800,
                            boxShadow: "0 0 8px rgba(0,255,136,0.4)"
                          },
                          children: "🎁 FREE"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h3",
                  {
                    style: {
                      fontFamily: "'Orbitron', sans-serif",
                      color: "#000000",
                      fontWeight: 700,
                      fontSize: 17,
                      textTransform: "uppercase",
                      marginBottom: 4
                    },
                    children: [
                      "🎮 ",
                      match.name
                    ]
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                background: "#f9fafb",
                borderRadius: 12,
                padding: 14,
                marginBottom: 14,
                border: "1px solid #e5e7eb",
                fontSize: 13
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666", display: "block", fontSize: 11 }, children: "📅 Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#111827", fontWeight: 600 }, children: formattedTime })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666", display: "block", fontSize: 11 }, children: "👥 Format" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#111827", fontWeight: 600 }, children: match.mode })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666", display: "block", fontSize: 11 }, children: "💰 Prize" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#00FF88", fontWeight: 700 }, children: match.prizePool })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666", display: "block", fontSize: 11 }, children: "🆔 UID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        color: "#111827",
                        fontFamily: "monospace",
                        fontWeight: 600
                      },
                      children: match.uid
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666", display: "block", fontSize: 11 }, children: "👤 Player" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#111827", fontWeight: 600 }, children: match.nickname })
                ] })
              ]
            }
          ),
          roomId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "#f0fdf4",
                border: "1px solid #d1fae5",
                borderRadius: 10,
                padding: 12,
                marginBottom: 14,
                fontSize: 13
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666" }, children: "Room ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "#111827"
                          },
                          children: roomId
                        }
                      )
                    ]
                  }
                ),
                roomPass && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666" }, children: "Password" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "#111827"
                          },
                          children: roomPass
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: !isLive,
                onClick: () => isLive && window.open(YOUTUBE_URL, "_blank"),
                style: {
                  flex: 1,
                  background: isLive ? "#EF4444" : "#f1f5f9",
                  color: isLive ? "#FFFFFF" : "#94a3b8",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: isLive ? "pointer" : "not-allowed",
                  fontFamily: "'Orbitron', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                },
                "data-ocid": `free_match.live_button.${index}`,
                children: isLive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" }),
                  "🔗 VIEW LIVE"
                ] }) : "🔗 LIVE"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => roomId && setRoomOpen(true),
                disabled: !roomId,
                style: {
                  flex: 1,
                  background: roomId ? "#3B82F6" : "#f1f5f9",
                  color: roomId ? "#FFFFFF" : "#94a3b8",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: roomId ? "pointer" : "not-allowed",
                  fontFamily: "'Orbitron', sans-serif"
                },
                "data-ocid": `free_match.room_button.${index}`,
                children: "📊 RESULTS"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: roomOpen, onOpenChange: setRoomOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-sm",
        "data-ocid": "free_room_details.dialog",
        style: { background: "#fff", border: "1px solid #e5e7eb" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DialogTitle,
            {
              style: { fontFamily: "'Orbitron', sans-serif", color: "#000" },
              children: [
                "🔑 ",
                match.name
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  background: "#f0fdf4",
                  border: "1px solid #d1fae5",
                  borderRadius: 10,
                  padding: 14
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#666666", fontSize: 12, marginBottom: 4 }, children: "Room ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 700,
                        fontSize: 22,
                        color: "#111827"
                      },
                      children: roomId
                    }
                  )
                ]
              }
            ),
            roomPass && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  background: "#faf5ff",
                  border: "1px solid #e9d5ff",
                  borderRadius: 10,
                  padding: 14
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#666666", fontSize: 12, marginBottom: 4 }, children: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 700,
                        fontSize: 22,
                        color: "#111827"
                      },
                      children: roomPass
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
function RoomDetailsDialog({
  open,
  onOpenChange,
  tournament
}) {
  const [copiedField, setCopiedField] = reactExports.useState(
    null
  );
  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      ue.success("Copied!", { duration: 2e3 });
      setTimeout(() => setCopiedField(null), 2e3);
    } catch {
      ue.error("Copy failed.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-sm",
      "data-ocid": "room_details.dialog",
      style: { background: "#ffffff", border: "1px solid #e5e7eb" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogTitle,
          {
            style: { fontFamily: "'Orbitron', sans-serif", color: "#000" },
            children: [
              "🔑 ",
              tournament.name
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "#f0fdf4",
                border: "1px solid #d1fae5",
                borderRadius: 12,
                padding: 14
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#666666", fontSize: 12, marginBottom: 4 }, children: "Room ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            fontFamily: "monospace",
                            fontWeight: 700,
                            fontSize: 22,
                            color: "#111827"
                          },
                          children: tournament.roomId ?? "—"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          "data-ocid": "room_details.copy_room_id.button",
                          style: { borderColor: "#00FF88", color: "#00AA55" },
                          onClick: () => tournament.roomId && handleCopy(tournament.roomId, "roomId"),
                          disabled: !tournament.roomId,
                          children: copiedField === "roomId" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 mr-1" }),
                            "Copied!"
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "h-3.5 w-3.5 mr-1" }),
                            "Copy"
                          ] })
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "#faf5ff",
                border: "1px solid #e9d5ff",
                borderRadius: 12,
                padding: 14
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#666666", fontSize: 12, marginBottom: 4 }, children: "Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            fontFamily: "monospace",
                            fontWeight: 700,
                            fontSize: 22,
                            color: "#111827"
                          },
                          children: tournament.roomPassword ?? "—"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          "data-ocid": "room_details.copy_password.button",
                          style: { borderColor: "#9d4edd", color: "#9d4edd" },
                          onClick: () => tournament.roomPassword && handleCopy(tournament.roomPassword, "password"),
                          disabled: !tournament.roomPassword,
                          children: copiedField === "password" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 mr-1" }),
                            "Copied!"
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 mr-1" }),
                            "Copy"
                          ] })
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function MatchCard({
  tournament,
  registeredCount,
  index
}) {
  const [roomDialogOpen, setRoomDialogOpen] = reactExports.useState(false);
  const isLive = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";
  const startMs = Number(tournament.startTime) / 1e6;
  const hasRoom = !!tournament.roomId;
  const formattedTime = new Date(startMs).toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  const statusBadgeStyle = isLive ? {
    background: "rgba(255,68,68,0.15)",
    color: "#FF4444",
    border: "1px solid rgba(255,68,68,0.4)"
  } : isCompleted ? {
    background: "rgba(107,114,128,0.15)",
    color: "#6B7280",
    border: "1px solid rgba(107,114,128,0.4)"
  } : {
    background: "rgba(59,130,246,0.15)",
    color: "#3B82F6",
    border: "1px solid rgba(59,130,246,0.4)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `my_matches.card.${index}`,
        style: {
          background: "#FFFFFF",
          borderRadius: 16,
          boxShadow: isLive ? "0 4px 20px rgba(255,68,68,0.12)" : "0 4px 16px rgba(0,0,0,0.08)",
          border: isLive ? "1px solid rgba(255,68,68,0.35)" : "1px solid #e5e7eb",
          padding: 20,
          marginBottom: 16,
          transition: "transform 0.2s ease, box-shadow 0.2s ease"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "scale(1.01)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = isLive ? "0 4px 20px rgba(255,68,68,0.12)" : "0 4px 16px rgba(0,0,0,0.08)";
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 14
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 8
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            style: {
                              ...statusBadgeStyle,
                              borderRadius: 20,
                              padding: "3px 10px",
                              fontSize: 10,
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              gap: 4
                            },
                            children: [
                              isLive && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                              isLive ? "LIVE" : isCompleted ? "✅ DONE" : "⏰ UPCOMING"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              background: "rgba(157,78,221,0.15)",
                              color: "#9d4edd",
                              border: "1px solid rgba(157,78,221,0.3)",
                              borderRadius: 20,
                              padding: "3px 10px",
                              fontSize: 10,
                              fontWeight: 700
                            },
                            children: "💰 PAID"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] uppercase", children: getTournamentTypeLabel(tournament.tournamentType) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "h3",
                    {
                      style: {
                        fontFamily: "'Orbitron', sans-serif",
                        color: "#000000",
                        fontWeight: 700,
                        fontSize: 17,
                        textTransform: "uppercase"
                      },
                      children: [
                        "🎮 ",
                        tournament.name
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-600/80 text-white border-0 shrink-0 mt-0.5", children: "✓ Joined" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                background: "#f9fafb",
                borderRadius: 12,
                padding: 14,
                marginBottom: 14,
                border: "1px solid #e5e7eb",
                fontSize: 13
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666", display: "block", fontSize: 11 }, children: "📅 Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#111827", fontWeight: 600, fontSize: 12 }, children: formattedTime })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666", display: "block", fontSize: 11 }, children: "👥 Format" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#111827", fontWeight: 600 }, children: getTournamentTypeLabel(tournament.tournamentType) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666", display: "block", fontSize: 11 }, children: "💰 Prize" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#00FF88", fontWeight: 700 }, children: formatCurrency(tournament.prizePool) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666", display: "block", fontSize: 11 }, children: "👥 Teams" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#111827", fontWeight: 600 }, children: [
                    registeredCount,
                    "/",
                    tournament.maxTeams.toString()
                  ] })
                ] })
              ]
            }
          ),
          hasRoom && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "#f0fdf4",
                border: "1px solid #d1fae5",
                borderRadius: 10,
                padding: 12,
                marginBottom: 14,
                fontSize: 13
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666" }, children: "Room ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "#111827"
                          },
                          children: tournament.roomId
                        }
                      )
                    ]
                  }
                ),
                tournament.roomPassword && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666" }, children: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 700,
                        color: "#111827"
                      },
                      children: tournament.roomPassword
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: !isLive,
                onClick: () => isLive && window.open(YOUTUBE_URL, "_blank"),
                style: {
                  flex: 1,
                  background: isLive ? "#EF4444" : "#f1f5f9",
                  color: isLive ? "#FFFFFF" : "#94a3b8",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: isLive ? "pointer" : "not-allowed",
                  fontFamily: "'Orbitron', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                },
                "data-ocid": `my_matches.live_button.${index}`,
                children: isLive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" }),
                  "VIEW LIVE"
                ] }) : "🔗 LIVE"
              }
            ),
            hasRoom ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setRoomDialogOpen(true),
                style: {
                  flex: 1,
                  background: "#3B82F6",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "'Orbitron', sans-serif"
                },
                "data-ocid": `my_matches.room_button.${index}`,
                children: "🔑 ROOM DETAILS"
              }
            ) : isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/tournament/$id",
                params: { id: tournament.id.toString() },
                style: {
                  flex: 1,
                  background: "#3B82F6",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "'Orbitron', sans-serif",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                },
                "data-ocid": `my_matches.results_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
                  "📊 RESULTS"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: true,
                style: {
                  flex: 1,
                  background: "#f1f5f9",
                  color: "#94a3b8",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "not-allowed",
                  fontFamily: "'Orbitron', sans-serif"
                },
                "data-ocid": `my_matches.results_button.${index}`,
                children: "📊 RESULTS"
              }
            )
          ] })
        ]
      }
    ),
    hasRoom && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container py-8 md:py-12 space-y-8",
      "data-ocid": "my_matches.page",
      style: { minHeight: "100vh", background: "#FFFFFF", paddingBottom: 100 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(0,255,136,0.12)",
                border: "1px solid rgba(0,255,136,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-5 w-5", style: { color: "#00FF88" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                style: {
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#000000",
                  fontSize: "clamp(1.5rem, 5vw, 2rem)",
                  fontWeight: 800,
                  textTransform: "uppercase"
                },
                children: "⚔️ My Matches"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#666666", fontSize: 14, marginTop: 2 }, children: "Your registered tournaments — access room details and results here" })
          ] })
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "my_matches.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "h-64 w-full rounded-2xl",
            style: { background: "#F0F0F0" }
          },
          i
        )) }),
        !isLoading && myTournaments.length === 0 && freeMatches.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-16 text-center space-y-5",
            "data-ocid": "my_matches.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    margin: "0 auto",
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#F5F5F5",
                    border: "1px solid #E0E0E0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-7 w-7", style: { color: "#CCCCCC" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 18, fontWeight: 600, color: "#333333" }, children: "No Matches Yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 14, color: "#888888", marginTop: 4 }, children: "Register for a tournament to see it here!" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  style: { borderColor: "#00FF88", color: "#00AA55" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tournaments", children: "Browse Tournaments" })
                }
              )
            ]
          }
        ),
        !isLoading && myTournaments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    color: "#9d4edd",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 13,
                    fontWeight: 700
                  },
                  children: "💰 PAID TOURNAMENTS"
                }
              )
            }
          ),
          [...myTournaments].sort((a, b) => {
            const order = { ongoing: 0, upcoming: 1, completed: 2 };
            const ao = order[a.tournament.status] ?? 3;
            const bo = order[b.tournament.status] ?? 3;
            if (ao !== bo) return ao - bo;
            return Number(b.tournament.startTime) / 1e6 - Number(a.tournament.startTime) / 1e6;
          }).map(({ tournament, index }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MatchCard,
            {
              tournament,
              registeredCount: regCountMap.get(tournament.id.toString()) ?? 0,
              index
            },
            tournament.id.toString()
          ))
        ] }),
        freeMatches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    color: "#00FF88",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 13,
                    fontWeight: 700
                  },
                  children: "🎁 FREE TOURNAMENTS"
                }
              )
            }
          ),
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
