import { c as createLucideIcon, x as useGetTournaments, r as reactExports, j as jsxRuntimeExports, V as getTournamentTypeLabel, a9 as ue, aC as getTournamentPlayerInfo, H as formatCurrency, ai as Link, a4 as useTokens } from "./index-DJtnZcma.js";
import { C as CountdownTimer, I as InterstitialOverlay } from "./CountdownTimer-Cq-m2S0n.js";
import { a as AdModal } from "./AdModal-DUP7qhFO.js";
import { C as Checkbox } from "./checkbox-Sj08NGRJ.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-BQpBGAmw.js";
import { L as Label, I as Input } from "./label-Beb8gxDz.js";
import { S as Skeleton } from "./skeleton-CsyK10G4.js";
import { U as Users } from "./users-DzqkMeR_.js";
import { C as Calendar } from "./calendar-O3lHy_e4.js";
import "./progress-BU5B3nK0.js";
import "./play-D87-jPJr.js";
import "./circle-check-BGDAcV92.js";
import "./index-ChNYZscB.js";
import "./check-Blbid6lb.js";
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
function saveFreeMyMatch(tournament, nickname, uid) {
  try {
    const key = "ke_free_my_matches";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    const exists = list.some(
      (m) => m.tournamentId === tournament.id && m.uid === uid
    );
    if (!exists) {
      const match = {
        tournamentId: tournament.id,
        name: tournament.name,
        mode: tournament.modeDetail,
        prizePool: tournament.prizePool,
        registeredAt: Date.now(),
        nickname,
        uid
      };
      list.push(match);
      localStorage.setItem(key, JSON.stringify(list));
    }
  } catch {
  }
}
function getFreeJoinCount(id) {
  return Number.parseInt(
    localStorage.getItem(`freeJoinCount_${id}`) || "0",
    10
  );
}
function setFreeJoinCount(id, count) {
  localStorage.setItem(`freeJoinCount_${id}`, String(count));
}
function getFreeRoomId(id) {
  return localStorage.getItem(`freeRoomId_${id}`) || "";
}
function getFreeRoomPassword(id) {
  return localStorage.getItem(`freeRoomPassword_${id}`) || "";
}
function isFreeMatchStarted(id) {
  return localStorage.getItem(`freeMatchStarted_${id}`) === "true";
}
function FreeRegistrationModal({
  tournament,
  isOpen,
  onClose
}) {
  const [state, setState] = reactExports.useState("idle");
  const [showInterstitial, setShowInterstitial] = reactExports.useState(false);
  const [nickname, setNickname] = reactExports.useState("");
  const [uid, setUid] = reactExports.useState("");
  const [confirmed, setConfirmed] = reactExports.useState(false);
  const [uidError, setUidError] = reactExports.useState("");
  const [touched, setTouched] = reactExports.useState(false);
  const tokens = useTokens();
  const validateUid = (v) => {
    if (!v) return "Free Fire UID required hai.";
    if (!/^\d+$/.test(v)) return "⚠️ UID sirf numbers mein hona chahiye.";
    if (v.length < 8) return "⚠️ UID minimum 8 digits ka hona chahiye.";
    return "";
  };
  const isDuplicateUid = (v) => {
    try {
      const key = `ke_free_uids_${tournament.id}`;
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      return list.includes(v);
    } catch {
      return false;
    }
  };
  const saveUid = (v) => {
    try {
      const key = `ke_free_uids_${tournament.id}`;
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      if (!list.includes(v)) {
        list.push(v);
        localStorage.setItem(key, JSON.stringify(list));
      }
    } catch {
    }
  };
  const handleClose = () => {
    if (state === "submitting") return;
    setState("idle");
    setNickname("");
    setUid("");
    setConfirmed(false);
    setUidError("");
    setTouched(false);
    onClose();
  };
  const handleAdComplete = () => {
    tokens.earnToken();
    ue.success("🪙 +1 Token earned!");
    setState("formOpen");
  };
  const handleAdCancel = () => {
    setState("idle");
    ue.error(
      "Ad pura nahi dekha — registration ke liye poora ad dekhna zaroori hai."
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (localStorage.getItem(`ke_free_joined_${tournament.id}`) === "true") {
      ue.error("❌ You have already registered for this tournament.");
      setState("idle");
      return;
    }
    if (!nickname.trim()) {
      ue.error("Nickname required hai.");
      return;
    }
    const err = validateUid(uid);
    if (err) {
      setUidError(err);
      return;
    }
    if (isDuplicateUid(uid)) {
      setUidError("⚠️ Ye UID is tournament mein already registered hai.");
      return;
    }
    if (!confirmed) {
      ue.error("Please confirm to continue.");
      return;
    }
    setState("submitting");
    setTimeout(() => {
      saveUid(uid);
      localStorage.setItem(`ke_free_joined_${tournament.id}`, "true");
      saveFreeMyMatch(tournament, nickname, uid);
      setState("done");
      setShowInterstitial(true);
      ue.success("✅ Registration successful!", {
        description: `${nickname} tournament mein register ho gaya! 🎉`
      });
      const newCount = getFreeJoinCount(tournament.id) + 1;
      setFreeJoinCount(tournament.id, newCount);
      window.dispatchEvent(new Event("freeTournamentUpdated"));
    }, 800);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdModal,
      {
        isOpen: state === "adPlaying",
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
        onDismiss: () => {
          setShowInterstitial(false);
          handleClose();
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: isOpen && state !== "adPlaying" && !showInterstitial,
        onOpenChange: (v) => {
          if (!v) handleClose();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-md",
            style: {
              background: "#0f172a",
              border: "1px solid rgba(0,255,136,0.3)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  DialogTitle,
                  {
                    style: { fontFamily: "'Orbitron', sans-serif", color: "#00FF88" },
                    children: [
                      tournament.mode,
                      " ",
                      tournament.name
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { style: { color: "rgba(255,255,255,0.55)" }, children: [
                  tournament.modeDetail,
                  " • Prize Pool: ",
                  tournament.prizePool
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg p-3 space-y-2",
                  style: {
                    background: "rgba(255,215,0,0.07)",
                    border: "1px solid rgba(255,215,0,0.25)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-bold uppercase tracking-wide",
                        style: { color: "#ffd700" },
                        children: "🏆 Prize Distribution"
                      }
                    ),
                    tournament.prizeDistribution.map((prize) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-start justify-between gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-white", children: prize.label }),
                            prize.condition && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs",
                                style: { color: "rgba(255,255,255,0.5)" },
                                children: prize.condition
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "font-bold text-sm shrink-0",
                              style: { color: "#00FF88" },
                              children: prize.amount
                            }
                          )
                        ]
                      },
                      prize.label
                    ))
                  ]
                }
              ),
              state === "idle" || state === "done" ? (
                /* Show WATCH AD button */
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setState("adPlaying"),
                      className: "relative px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3 w-full justify-center",
                      style: {
                        background: "linear-gradient(135deg, #00FF88, #00cc6a)",
                        color: "#000",
                        boxShadow: "0 0 24px rgba(0,255,136,0.6)",
                        fontFamily: "'Orbitron', sans-serif"
                      },
                      "data-ocid": "free_tournament.primary_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🎬" }),
                        "WATCH AD & JOIN FREE"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.4)" }, children: "30-sec ad dekhne ke baad registration form khulega" })
                ] })
              ) : (
                /* Registration form */
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fn-nick", className: "font-semibold text-white", children: "Free Fire Nickname *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "fn-nick",
                        value: nickname,
                        onChange: (e) => setNickname(e.target.value),
                        placeholder: "Enter your Free Fire nickname",
                        autoComplete: "off",
                        className: touched && !nickname.trim() ? "border-red-500" : "",
                        style: {
                          background: "rgba(255,255,255,0.06)",
                          color: "#fff"
                        },
                        "data-ocid": "free_tournament.input"
                      }
                    ),
                    touched && !nickname.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: "❌ Nickname required hai." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "fn-uid", className: "font-semibold text-white", children: [
                      "Free Fire UID *",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-normal",
                          style: { color: "rgba(255,255,255,0.4)" },
                          children: "(min 8 digits, numeric)"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "fn-uid",
                        value: uid,
                        onChange: (e) => {
                          const v = e.target.value.replace(/\D/g, "");
                          setUid(v);
                          if (uidError) setUidError(validateUid(v));
                        },
                        placeholder: "e.g. 123456789",
                        inputMode: "numeric",
                        className: uidError ? "border-red-500" : uid.length >= 8 ? "border-green-500" : "",
                        style: {
                          background: "rgba(255,255,255,0.06)",
                          color: "#fff"
                        },
                        "data-ocid": "free_tournament.input"
                      }
                    ),
                    uidError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: uidError }),
                    !uidError && uid.length >= 8 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-400", children: "✅ Valid UID" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        id: "fn-confirm",
                        checked: confirmed,
                        onCheckedChange: (v) => setConfirmed(v),
                        "data-ocid": "free_tournament.checkbox"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "fn-confirm",
                        className: "text-sm cursor-pointer leading-relaxed",
                        style: { color: "rgba(255,255,255,0.75)" },
                        children: "Main confirm karta/karti hoon ki ye details sahi hain aur main tournament rules se agree karta/karti hoon."
                      }
                    )
                  ] }),
                  touched && !confirmed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: "❌ Please confirm to proceed." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: state === "submitting",
                      className: "w-full py-4 rounded-xl font-bold uppercase tracking-widest text-base transition-all active:scale-95 disabled:opacity-60",
                      style: {
                        background: state === "submitting" ? "#5a2d91" : "linear-gradient(135deg, #9d4edd, #7b2fbf)",
                        color: "#fff",
                        boxShadow: state === "submitting" ? "none" : "0 0 20px rgba(157,78,221,0.5)",
                        fontFamily: "'Orbitron', sans-serif"
                      },
                      "data-ocid": "free_tournament.submit_button",
                      children: state === "submitting" ? "⏳ Registering..." : "✅ COMPLETE REGISTRATION"
                    }
                  )
                ] })
              )
            ]
          }
        )
      }
    )
  ] });
}
function FreeTournamentCard({ t }) {
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [joinCount, setJoinCount] = reactExports.useState(() => getFreeJoinCount(t.id));
  const [roomId, setRoomId] = reactExports.useState(() => getFreeRoomId(t.id));
  const [roomPassword, setRoomPassword] = reactExports.useState(
    () => getFreeRoomPassword(t.id)
  );
  const [matchStarted, setMatchStarted] = reactExports.useState(
    () => isFreeMatchStarted(t.id)
  );
  const [showRoomPopup, setShowRoomPopup] = reactExports.useState(false);
  const [isJoined, setIsJoined] = reactExports.useState(
    () => localStorage.getItem(`ke_free_joined_${t.id}`) === "true"
  );
  reactExports.useEffect(() => {
    const handler = () => {
      setJoinCount(getFreeJoinCount(t.id));
      setRoomId(getFreeRoomId(t.id));
      setRoomPassword(getFreeRoomPassword(t.id));
      setMatchStarted(isFreeMatchStarted(t.id));
      setIsJoined(localStorage.getItem(`ke_free_joined_${t.id}`) === "true");
    };
    window.addEventListener("storage", handler);
    window.addEventListener("freeTournamentUpdated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("freeTournamentUpdated", handler);
    };
  }, [t.id]);
  const spotsLeft = Math.max(0, t.maxPlayers - joinCount);
  const isFull = spotsLeft === 0;
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        style: {
          background: "#FFFFFF",
          border: "1px solid #E0E0E0",
          borderRadius: 16,
          boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 4px 12px rgba(0,0,0,0.05)",
          transform: hovered ? "scale(1.01)" : "scale(1)",
          transition: "all 0.2s ease",
          overflow: "hidden",
          cursor: "pointer"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-bold uppercase px-2 py-0.5 rounded-full",
                style: {
                  background: "#28a745",
                  color: "#FFFFFF",
                  borderRadius: 20
                },
                children: "🎁 FREE"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs font-medium px-2 py-0.5 rounded-full",
                style: {
                  background: "#6f42c1",
                  color: "#FFFFFF",
                  borderRadius: 20
                },
                children: [
                  t.mode,
                  " ",
                  getTournamentTypeLabel(t.tournamentType)
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display font-bold leading-tight",
              style: {
                fontSize: "clamp(1rem,4vw,1.125rem)",
                color: "#000000",
                fontWeight: 700
              },
              children: t.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "#666666" }, children: [
            t.description,
            " • ",
            t.modeDetail
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg p-3 space-y-2",
              style: {
                background: "#F8F8F8",
                border: "1px solid #E0E0E0"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666" }, children: "Entry Fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-bold text-xs px-2 py-0.5 rounded-full",
                      style: { background: "#28a745", color: "#FFFFFF" },
                      children: "🎁 FREE"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666" }, children: "Prize Pool" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", style: { color: "#00FF88" }, children: t.prizePool })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "flex items-center gap-1",
                      style: { color: "#666666" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
                        " Max Players"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", style: { color: "#333333" }, children: t.maxPlayers })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg px-3 py-2 flex items-center justify-between text-sm font-bold",
              style: {
                background: isFull ? "rgba(220,53,69,0.08)" : "rgba(40,167,69,0.05)",
                border: `1px solid ${isFull ? "rgba(220,53,69,0.3)" : "rgba(40,167,69,0.2)"}`,
                fontFamily: "'Rajdhani', sans-serif"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#333333" }, children: "👥 Joined" }),
                isFull ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#dc3545", fontWeight: 700 }, children: [
                  joinCount,
                  "/",
                  t.maxPlayers,
                  " FULL"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#333333" }, children: [
                  "👥 ",
                  joinCount,
                  "/",
                  t.maxPlayers,
                  " Only ",
                  spotsLeft,
                  " Spots Left"
                ] })
              ]
            }
          ),
          (() => {
            const pct = Math.min(100, joinCount / t.maxPlayers * 100);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    height: 4,
                    background: "#E0E0E0",
                    borderRadius: 2,
                    marginTop: 4
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        height: 4,
                        width: `${pct}%`,
                        background: "linear-gradient(90deg, #9d4edd, #00FF88)",
                        borderRadius: 2,
                        transition: "width 0.4s ease"
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.45)",
                    marginTop: 4,
                    fontFamily: "'Rajdhani', sans-serif"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      joinCount,
                      " joined"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      spotsLeft,
                      " spots left"
                    ] })
                  ]
                }
              )
            ] });
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg p-3 space-y-1.5",
              style: {
                background: "#F5F5F5",
                border: "1px solid #E0E0E0"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-bold uppercase tracking-wide mb-2",
                    style: { color: "#333333" },
                    children: "🏆 Prize Distribution"
                  }
                ),
                t.prizeDistribution.map((prize) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-start justify-between gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs font-semibold",
                            style: { color: "#333333" },
                            children: prize.label
                          }
                        ),
                        prize.condition && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs leading-tight mt-0.5",
                            style: { color: "#888888" },
                            children: prize.condition
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-bold text-xs shrink-0",
                          style: { color: "#00FF88" },
                          children: prize.amount
                        }
                      )
                    ]
                  },
                  prize.label
                ))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: t.rules.map((rule) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs mt-0.5", style: { color: "#28a745" }, children: "✓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#666666" }, children: rule })
          ] }, rule)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: !matchStarted,
                className: "flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all",
                style: {
                  background: matchStarted ? "linear-gradient(135deg, #dc3545, #a71d2a)" : "#F0F0F0",
                  color: matchStarted ? "#FFFFFF" : "#CCCCCC",
                  border: matchStarted ? "none" : "1px solid #E0E0E0",
                  boxShadow: "none",
                  cursor: matchStarted ? "pointer" : "not-allowed",
                  fontFamily: "'Orbitron', sans-serif"
                },
                "data-ocid": "free_tournament.live_button",
                children: "🟡 LIVE"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: !roomId,
                onClick: () => roomId && setShowRoomPopup(true),
                className: "flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all",
                style: {
                  background: roomId ? "linear-gradient(135deg, #9d4edd, #6a0dad)" : "#F0F0F0",
                  color: roomId ? "#FFFFFF" : "#CCCCCC",
                  border: roomId ? "none" : "1px solid #E0E0E0",
                  boxShadow: roomId ? "0 0 10px rgba(157,78,221,0.3)" : "none",
                  cursor: roomId ? "pointer" : "not-allowed",
                  fontFamily: "'Orbitron', sans-serif"
                },
                "data-ocid": "free_tournament.id_password_button",
                children: "🔑 ID/PASSWORD"
              }
            )
          ] }),
          isJoined ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled: true,
              className: "block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide",
              style: {
                background: "transparent",
                color: "#00FF88",
                border: "2px solid #00FF88",
                fontFamily: "'Orbitron', sans-serif",
                cursor: "not-allowed"
              },
              "data-ocid": "free_tournament.joined_button",
              children: "✅ JOINED"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => !isFull && setModalOpen(true),
              disabled: isFull,
              className: "block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2",
              style: {
                background: isFull ? "#F0F0F0" : "linear-gradient(135deg, #28a745, #1a6b2a)",
                color: isFull ? "#CCCCCC" : "#FFFFFF",
                boxShadow: isFull ? "none" : "0 0 12px rgba(40,167,69,0.3)",
                fontFamily: "'Orbitron', sans-serif",
                cursor: isFull ? "not-allowed" : "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease"
              },
              "data-ocid": "free_tournament.primary_button",
              children: isFull ? "🚫 TOURNAMENT FULL" : "🎬 WATCH AD & JOIN FREE"
            }
          )
        ] })
      }
    ),
    showRoomPopup && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: {
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(6px)"
        },
        role: "presentation",
        onClick: () => setShowRoomPopup(false),
        onKeyDown: (e) => e.key === "Escape" && setShowRoomPopup(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-xs rounded-xl p-5 space-y-4",
            style: {
              background: "rgba(16,24,48,0.97)",
              border: "1px solid rgba(157,78,221,0.5)",
              boxShadow: "0 0 32px rgba(157,78,221,0.3)"
            },
            role: "presentation",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "text-center font-bold text-white text-lg",
                  style: { fontFamily: "'Orbitron', sans-serif" },
                  children: "🔑 Room Details"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg p-3 space-y-2",
                  style: {
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.5)", fontSize: 12 }, children: "Room ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-mono font-bold text-white text-lg",
                            style: { letterSpacing: "0.05em" },
                            children: roomId
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            style: {
                              fontFamily: "'Orbitron', sans-serif",
                              fontSize: 11,
                              fontWeight: 700,
                              padding: "5px 12px",
                              borderRadius: 7,
                              border: "1.5px solid #00FF88",
                              background: "rgba(0,255,136,0.13)",
                              color: "#00FF88",
                              cursor: "pointer",
                              whiteSpace: "nowrap"
                            },
                            onClick: () => {
                              navigator.clipboard.writeText(roomId ?? "").then(() => {
                                ue.success("✅ Copied!", { duration: 2e3 });
                              });
                            },
                            children: "📋 COPY ROOM ID"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.5)", fontSize: 12 }, children: "Password" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-mono font-bold text-white text-lg",
                            style: { letterSpacing: "0.05em" },
                            children: roomPassword || "—"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            style: {
                              fontFamily: "'Orbitron', sans-serif",
                              fontSize: 11,
                              fontWeight: 700,
                              padding: "5px 12px",
                              borderRadius: 7,
                              border: "1.5px solid #9d4edd",
                              background: "rgba(157,78,221,0.13)",
                              color: "#9d4edd",
                              cursor: roomPassword ? "pointer" : "not-allowed",
                              opacity: roomPassword ? 1 : 0.5,
                              whiteSpace: "nowrap"
                            },
                            disabled: !roomPassword,
                            onClick: () => {
                              if (!roomPassword) return;
                              navigator.clipboard.writeText(roomPassword).then(() => {
                                ue.success("✅ Copied!", { duration: 2e3 });
                              });
                            },
                            children: "📋 COPY PASSWORD"
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full py-1.5 rounded-lg text-sm",
                  style: {
                    color: "rgba(255,255,255,0.4)",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)"
                  },
                  onClick: () => setShowRoomPopup(false),
                  children: "Close"
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FreeRegistrationModal,
      {
        tournament: t,
        isOpen: modalOpen,
        onClose: () => setModalOpen(false)
      }
    )
  ] });
}
function getAdminCreatedFreeTournaments() {
  const result = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!(key == null ? void 0 : key.startsWith("customFreeTournament_"))) continue;
    try {
      const data = JSON.parse(localStorage.getItem(key) || "");
      const modeMap = {
        Solo: {
          tournamentType: "battleground",
          gameMode: "SOLO",
          modeDetail: "Solo (har player apne liye)",
          mode: "⚔️",
          maxPlayers: 500
        },
        "4v4": {
          tournamentType: "custom4v4",
          gameMode: "TEAM",
          modeDetail: "Team (2 teams × 4 players)",
          mode: "🎮",
          maxPlayers: 40
        },
        "1v1": {
          tournamentType: "custom1v1",
          gameMode: "SOLO",
          modeDetail: "Solo (2 players)",
          mode: "🥇",
          maxPlayers: 10
        },
        "2v2": {
          tournamentType: "custom2v2",
          gameMode: "TEAM",
          modeDetail: "Team (2 teams × 2 players)",
          mode: "🥈",
          maxPlayers: 20
        }
      };
      const modeInfo = modeMap[data.mode] ?? modeMap.Solo;
      const prizeDistribution = (data.prizes || []).map(
        (p) => ({
          label: p.label,
          amount: p.prize,
          condition: p.condition || "",
          icon: "🏆"
        })
      );
      result.push({
        id: key,
        name: data.name,
        tournamentType: modeInfo.tournamentType,
        gameMode: modeInfo.gameMode,
        modeDetail: modeInfo.modeDetail,
        mode: modeInfo.mode,
        description: `${data.maxPlayers || modeInfo.maxPlayers} Players • ${data.mode} Mode`,
        maxPlayers: data.maxPlayers || modeInfo.maxPlayers,
        slots: data.maxPlayers || modeInfo.maxPlayers,
        status: "upcoming",
        prizePool: data.prizePool || "₹0",
        prizeDistribution,
        rules: []
      });
    } catch {
    }
  }
  return result;
}
function TournamentsPage() {
  const { data: tournaments, isLoading } = useGetTournaments();
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [section, setSection] = reactExports.useState("free");
  const [filterChip, setFilterChip] = reactExports.useState("ALL");
  const [adminFreeTournaments, setAdminFreeTournaments] = reactExports.useState(() => getAdminCreatedFreeTournaments());
  reactExports.useEffect(() => {
    const handler = () => {
      setAdminFreeTournaments(getAdminCreatedFreeTournaments());
    };
    window.addEventListener("freeTournamentUpdated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("freeTournamentUpdated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  const [freeStatusTab, setFreeStatusTab] = reactExports.useState("upcoming");
  function getFreeTournamentStatus(t) {
    const isLive = localStorage.getItem(`freeMatchStarted_${t.id}`) === "true";
    if (isLive) return "live";
    const isDone = localStorage.getItem(`freeMatchDone_${t.id}`) === "true";
    if (isDone) return "done";
    try {
      const raw = localStorage.getItem(t.id);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.startTime) {
          const startMs = new Date(data.startTime).getTime();
          if (startMs && startMs < Date.now()) return "done";
        }
      }
    } catch {
    }
    return "upcoming";
  }
  const visibleFreeTournaments = adminFreeTournaments.filter(
    (t) => getFreeTournamentStatus(t) === freeStatusTab
  );
  const filteredTournaments = (tournaments == null ? void 0 : tournaments.filter((t) => {
    const matchesType = typeFilter === "all" || t.tournamentType === typeFilter;
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesType && matchesStatus;
  })) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pb-24", style: { background: "#FFFFFF" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8 space-y-6 px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderLeft: "3px solid #00FF88", paddingLeft: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-4xl font-bold font-display",
            style: {
              borderBottom: "2px solid rgba(0,255,136,0.4)",
              paddingBottom: 4
            },
            children: "All Tournaments"
          }
        ) }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["free", "paid"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setSection(tab),
        className: "flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
        style: {
          background: section === tab ? tab === "free" ? "#28a745" : "#6f42c1" : "#F0F0F0",
          color: section === tab ? "#FFFFFF" : "#666666",
          border: section === tab ? "none" : "1px solid #E0E0E0",
          boxShadow: "none",
          fontFamily: "'Orbitron', sans-serif"
        },
        "data-ocid": "tournaments.section.tab",
        children: tab === "free" ? "🎁 Free Tournaments" : "💰 Paid Tournaments"
      },
      tab
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          overflowX: "auto",
          display: "flex",
          gap: 8,
          padding: "0 0 12px",
          msOverflowStyle: "none",
          scrollbarWidth: "none"
        },
        className: "scrollbar-hide",
        "data-ocid": "tournaments.mode_filter.panel",
        children: ["ALL", "BG", "4V4", "1V1", "2V2"].map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilterChip(chip),
            style: {
              flexShrink: 0,
              padding: "6px 16px",
              borderRadius: 20,
              background: filterChip === chip ? "#00FF88" : "rgba(255,255,255,0.08)",
              color: filterChip === chip ? "#0A0A0A" : "#888",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              border: filterChip === chip ? "none" : "1px solid rgba(255,255,255,0.12)",
              boxShadow: filterChip === chip ? "0 0 12px rgba(0,255,136,0.4)" : "none",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: 1,
              transition: "all 0.15s ease"
            },
            "data-ocid": "tournaments.mode_filter.tab",
            children: chip
          },
          chip
        ))
      }
    ),
    section === "free" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
            msOverflowStyle: "none",
            scrollbarWidth: "none"
          },
          children: ["upcoming", "live", "done"].map((tab) => {
            const labels = {
              upcoming: "⏰ UPCOMING",
              live: "🔴 LIVE",
              done: "✅ DONE"
            };
            const isActive = freeStatusTab === tab;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setFreeStatusTab(tab),
                style: {
                  flexShrink: 0,
                  padding: "8px 20px",
                  borderRadius: 24,
                  background: isActive ? "#00FF88" : "#F0F0F0",
                  color: isActive ? "#000000" : "#666666",
                  border: isActive ? "none" : "1px solid #E0E0E0",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isActive ? "0 0 12px rgba(0,255,136,0.4)" : "none",
                  textTransform: "uppercase",
                  letterSpacing: 1
                },
                children: labels[tab]
              },
              tab
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-4",
          style: {
            background: "linear-gradient(135deg, rgba(40,167,69,0.05), rgba(111,66,193,0.05))",
            border: "1px solid rgba(40,167,69,0.2)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display font-bold text-sm mb-1",
                style: { color: "#00FF88" },
                children: "🎉 FREE TOURNAMENTS — No Entry Fee!"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.5)" }, children: "Watch a 30-sec ad → Register instantly → Win real cash prizes 💰" })
          ]
        }
      ),
      visibleFreeTournaments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-12",
          style: { color: "rgba(255,255,255,0.4)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🎮" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-bold",
                style: {
                  fontFamily: "'Orbitron', sans-serif",
                  color: "rgba(255,255,255,0.6)"
                },
                children: "No tournaments available"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: freeStatusTab === "upcoming" ? "No upcoming tournaments scheduled." : freeStatusTab === "live" ? "No tournaments are live right now." : "No completed tournaments yet." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5", children: visibleFreeTournaments.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(FreeTournamentCard, { t }, t.id)) })
    ] }),
    section === "paid" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
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
                  background: typeFilter === chip.value ? "#00FF88" : "#F0F0F0",
                  color: typeFilter === chip.value ? "#0A0A0A" : "#555555",
                  border: typeFilter === chip.value ? "none" : "1px solid #E0E0E0",
                  boxShadow: typeFilter === chip.value ? "0 0 8px rgba(0,255,136,0.3)" : "none"
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
                  background: statusFilter === chip.value ? "#6f42c1" : "#F0F0F0",
                  color: statusFilter === chip.value ? "#FFFFFF" : "#555555",
                  border: statusFilter === chip.value ? "none" : "1px solid #E0E0E0",
                  boxShadow: statusFilter === chip.value ? "0 0 8px rgba(111,66,193,0.3)" : "none"
                },
                "data-ocid": "tournaments.status_filter.tab",
                children: chip.label
              },
              chip.value
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-sm",
            style: { color: "rgba(255,255,255,0.4)" },
            children: [
              filteredTournaments.length,
              " tournament",
              filteredTournaments.length !== 1 ? "s" : "",
              " found"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Skeleton,
        {
          className: "h-96 rounded-[12px]",
          style: { background: "#F0F0F0" }
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
            background: "#F8F8F8",
            border: "1px solid #E0E0E0"
          },
          "data-ocid": "tournaments.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#666666" }, children: "No tournaments found matching your filters." })
        }
      )
    ] })
  ] }) });
}
function TournamentCard({ tournament }) {
  const isUpcoming = tournament.status === "upcoming";
  const isOngoing = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";
  const modeIcon = tournament.tournamentType === "battleground" ? "⚔️" : tournament.tournamentType === "custom4v4" ? "🎮" : tournament.tournamentType === "custom1v1" ? "🥇" : "🥈";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        background: "#FFFFFF",
        border: "1px solid #E0E0E0",
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        overflow: "hidden",
        transition: "all 0.2s ease"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          isOngoing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-xs font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1",
              style: { background: "#dc3545", color: "#FFFFFF" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" }),
                "LIVE"
              ]
            }
          ) : isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-bold uppercase px-2 py-0.5 rounded-full",
              style: { background: "#6c757d", color: "#FFFFFF" },
              children: "✅ DONE"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-bold uppercase px-2 py-0.5 rounded-full",
              style: { background: "#0d6efd", color: "#FFFFFF" },
              children: "⏰ UPCOMING"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-xs font-medium px-2 py-0.5 rounded-full",
              style: { background: "#6f42c1", color: "#FFFFFF" },
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
            className: "font-display font-bold leading-tight",
            style: {
              fontSize: "clamp(1rem, 4vw, 1.125rem)",
              color: "#000000",
              fontWeight: 700
            },
            children: tournament.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#666666" }, children: getTournamentPlayerInfo(tournament.tournamentType).description }),
        isUpcoming && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 text-xs",
            style: { color: "#666666" },
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
            style: { color: "#dc3545" },
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
              background: "#F8F8F8",
              border: "1px solid #E0E0E0"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666" }, children: "Entry Fee" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", style: { color: "#333333" }, children: formatCurrency(tournament.entryFee) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666666" }, children: "Prize Pool" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", style: { color: "#00FF88" }, children: formatCurrency(tournament.prizePool) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1",
                    style: { color: "#666666" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
                      " Slots"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", style: { color: "#333333" }, children: [
                  tournament.maxTeams.toString(),
                  " teams"
                ] })
              ] })
            ]
          }
        ),
        (() => {
          const totalTeams = Number(tournament.maxTeams);
          const pct = isCompleted ? 100 : isOngoing ? 75 : 30;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { height: 4, background: "#E0E0E0", borderRadius: 2 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      height: 4,
                      width: `${pct}%`,
                      background: "#00FF88",
                      borderRadius: 2,
                      transition: "width 0.4s ease"
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "#888888",
                  marginTop: 4,
                  fontFamily: "'Rajdhani', sans-serif"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "0/",
                    totalTeams,
                    " teams"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    totalTeams,
                    " spots total"
                  ] })
                ]
              }
            )
          ] });
        })(),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/tournament/$id",
            params: { id: tournament.id.toString() },
            className: "block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all",
            style: isOngoing ? {
              background: "linear-gradient(135deg, #dc3545, #a71d2a)",
              color: "#FFFFFF",
              boxShadow: "0 0 12px rgba(220,53,69,0.3)"
            } : isUpcoming ? {
              background: "linear-gradient(135deg, #00FF88, #9d4edd)",
              color: "#FFFFFF",
              boxShadow: "0 0 12px rgba(0,255,136,0.3)"
            } : {
              background: "#F0F0F0",
              color: "#999999",
              border: "1px solid #E0E0E0"
            },
            "data-ocid": "tournaments.register.button",
            children: isOngoing ? "View Live" : isUpcoming ? "⚡ Register Now" : "View Details"
          }
        )
      ] })
    }
  );
}
export {
  TournamentsPage,
  saveFreeMyMatch
};
