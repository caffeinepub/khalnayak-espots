const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/dialog-BlEBj48f.js","assets/index-BY_LkDWL.js","assets/index-C3weBdYi.css"])))=>i.map(i=>d[i]);
import { y as createLucideIcon, e as useGetTournaments, r as reactExports, j as jsxRuntimeExports, J as getTournamentTypeLabel, c as ue, K as getTournamentPlayerInfo, f as formatCurrency, L as Link, M as getFreeRegistrationCount, _ as __vitePreload, N as getPaidRegistrationCount, O as saveFreeRegistration } from "./index-BY_LkDWL.js";
import { C as CountdownTimer, I as InterstitialOverlay } from "./CountdownTimer-_UHyl6Ey.js";
import { a as AdModal } from "./AdModal-BjAMzZrF.js";
import { C as Checkbox } from "./checkbox-CWWArm3j.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-BlEBj48f.js";
import { L as Label, I as Input } from "./label-BKLRe-ZD.js";
import { S as Skeleton } from "./skeleton-BXjOZ5AR.js";
import { U as Users } from "./users-Bi-0brC2.js";
import { C as Calendar } from "./calendar-1BAXBFhr.js";
import "./progress-4ElVZwMV.js";
import "./play-C_Embanc.js";
import "./circle-check-vsffaBB3.js";
import "./index-DS9lFAqv.js";
import "./check-_lBHdqld.js";
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
      saveFreeRegistration({
        nickname,
        uid,
        tournamentId: tournament.id.toString(),
        tournamentName: tournament.name,
        registeredAt: Date.now()
      }).catch(() => {
      });
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
        hideClaimReward: true
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { style: { color: "#666666" }, children: [
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
                            prize.condition && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#666666" }, children: prize.condition })
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#666666" }, children: "30-sec ad dekhne ke baad registration form khulega" })
                ] })
              ) : (
                /* Registration form */
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "fn-nick",
                        className: "font-semibold",
                        style: { color: "#111827", fontWeight: 700 },
                        children: "Free Fire Nickname *"
                      }
                    ),
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
                          background: "#F5F5F5",
                          color: "#111827",
                          border: "1px solid #D1D5DB"
                        },
                        "data-ocid": "free_tournament.input"
                      }
                    ),
                    touched && !nickname.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: "❌ Nickname required hai." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "fn-uid",
                        className: "font-semibold",
                        style: { color: "#111827", fontWeight: 700 },
                        children: [
                          "Free Fire UID *",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-xs font-normal",
                              style: { color: "#666666" },
                              children: "(min 8 digits, numeric)"
                            }
                          )
                        ]
                      }
                    ),
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
                          background: "#F5F5F5",
                          color: "#111827",
                          border: "1px solid #D1D5DB"
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
                        style: { color: "#333333" },
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
                        background: state === "submitting" ? "#00cc6a" : "#00FF88",
                        color: "#000000",
                        fontWeight: 700,
                        boxShadow: state === "submitting" ? "none" : "0 0 20px rgba(0,255,136,0.5)",
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
function FreeTournamentCard({
  t,
  index = 0
}) {
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [joinCount, setJoinCount] = reactExports.useState(() => getFreeJoinCount(t.id));
  const [roomId, setRoomId] = reactExports.useState(() => getFreeRoomId(t.id));
  const [roomPassword, setRoomPassword] = reactExports.useState(
    () => getFreeRoomPassword(t.id)
  );
  const [matchStarted, setMatchStarted] = reactExports.useState(
    () => isFreeMatchStarted(t.id)
  );
  const [isDone, setIsDone] = reactExports.useState(
    () => localStorage.getItem(`freeMatchDone_${t.id}`) === "true"
  );
  const [showRoomPopup, setShowRoomPopup] = reactExports.useState(false);
  const [isJoined, setIsJoined] = reactExports.useState(
    () => localStorage.getItem(`ke_free_joined_${t.id}`) === "true"
  );
  const [showResultModal, setShowResultModal] = reactExports.useState(false);
  const [resultData, setResultData] = reactExports.useState([]);
  const [resultLoading, setResultLoading] = reactExports.useState(false);
  const fetchResults = async () => {
    setResultLoading(true);
    try {
      const { collection, query, where, getDocs } = await __vitePreload(async () => {
        const { collection: collection2, query: query2, where: where2, getDocs: getDocs2 } = await import("./dialog-BlEBj48f.js").then((n) => n.i);
        return { collection: collection2, query: query2, where: where2, getDocs: getDocs2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      const { getFirebaseDb } = await __vitePreload(async () => {
        const { getFirebaseDb: getFirebaseDb2 } = await import("./index-BY_LkDWL.js").then((n) => n.bN);
        return { getFirebaseDb: getFirebaseDb2 };
      }, true ? __vite__mapDeps([1,2]) : void 0);
      const db = getFirebaseDb();
      const q = query(
        collection(db, "matchResults"),
        where("tournamentId", "==", t.id)
      );
      const snap = await getDocs(q);
      const all = snap.docs.map(
        (d) => ({ id: d.id, ...d.data() })
      );
      all.sort((a, b) => a.rank - b.rank);
      setResultData(all);
    } catch {
    }
    setResultLoading(false);
  };
  reactExports.useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await getFreeRegistrationCount(t.id);
        if (count > 0) {
          setJoinCount(count);
          setFreeJoinCount(t.id, count);
        }
      } catch {
      }
    };
    fetchCount();
  }, []);
  reactExports.useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await getFreeRegistrationCount(t.id);
        if (count > 0) {
          setJoinCount(count);
          setFreeJoinCount(t.id, count);
        }
      } catch {
      }
    };
    const handler = () => {
      setJoinCount(getFreeJoinCount(t.id));
      setRoomId(getFreeRoomId(t.id));
      setRoomPassword(getFreeRoomPassword(t.id));
      setMatchStarted(isFreeMatchStarted(t.id));
      setIsDone(localStorage.getItem(`freeMatchDone_${t.id}`) === "true");
      setIsJoined(localStorage.getItem(`ke_free_joined_${t.id}`) === "true");
      fetchCount();
    };
    window.addEventListener("storage", handler);
    window.addEventListener("freeTournamentUpdated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("freeTournamentUpdated", handler);
    };
  }, []);
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
          background: matchStarted ? "rgba(255,0,0,0.03)" : "#FFFFFF",
          border: matchStarted ? "1.5px solid rgba(220,53,69,0.4)" : "1px solid #E8E8E8",
          borderRadius: 18,
          borderLeft: matchStarted ? "4px solid #dc3545" : `4px solid ${["#00FF88", "#9d4edd", "#FF6B35", "#00BFFF"][index % 4]}`,
          boxShadow: matchStarted ? hovered ? "0 8px 24px rgba(220,53,69,0.25)" : "0 4px 16px rgba(220,53,69,0.15)" : hovered ? "0 8px 24px rgba(0,0,0,0.15)" : "0 4px 12px rgba(0,0,0,0.08)",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transition: "all 0.2s ease",
          overflow: "hidden",
          cursor: "pointer"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-bold uppercase px-2 py-0.5 rounded-full",
                  style: {
                    background: "#00FF88",
                    color: "#000000",
                    borderRadius: 20,
                    boxShadow: "0 0 10px rgba(0,255,136,0.5)",
                    fontWeight: 800
                  },
                  children: "🎁 FREE"
                }
              ),
              matchStarted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1",
                  style: { background: "#dc3545", color: "#FFFFFF" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" }),
                    "LIVE"
                  ]
                }
              )
            ] }),
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
                    color: "#666666",
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
            matchStarted && !isDone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-1",
                style: {
                  background: "linear-gradient(135deg, #dc3545, #a71d2a)",
                  color: "#FFFFFF",
                  border: "none",
                  boxShadow: "0 0 12px rgba(220,53,69,0.4)",
                  cursor: "pointer",
                  fontFamily: "'Orbitron', sans-serif",
                  borderRadius: 25
                },
                "data-ocid": "free_tournament.live_button",
                onClick: () => window.open(
                  "https://www.youtube.com/@kl_tournament_007",
                  "_blank"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" }),
                  "🔴 VIEW LIVE"
                ]
              }
            ),
            !matchStarted && !isDone && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
            ),
            isDone && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "flex-1 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all active:scale-95",
                style: {
                  background: "#00FF88",
                  color: "#000000",
                  border: "none",
                  borderRadius: 25,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Orbitron', sans-serif",
                  boxShadow: "0 0 12px rgba(0,255,136,0.4)"
                },
                "data-ocid": "free_tournament.result_button",
                onClick: () => {
                  fetchResults();
                  setShowResultModal(true);
                },
                children: "📊 Result"
              }
            )
          ] }),
          isDone ? null : matchStarted ? null : isJoined ? /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                borderRadius: 50
              },
              "data-ocid": "free_tournament.primary_button",
              children: isFull ? "🚫 TOURNAMENT FULL" : "🔥 WATCH AD & JOIN FREE"
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
              background: "#FFFFFF",
              border: "1px solid #E0E0E0",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
            },
            role: "presentation",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "text-center font-bold text-lg",
                  style: { fontFamily: "'Orbitron', sans-serif", color: "#000000" },
                  children: "🔑 Room Details"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg p-3 space-y-2",
                  style: {
                    background: "#F5F5F5",
                    border: "1px solid #E0E0E0"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: { color: "#111827", fontSize: 12, fontWeight: 700 },
                          children: "Room ID"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontFamily: "monospace",
                              fontWeight: 700,
                              fontSize: 20,
                              color: "#111827",
                              letterSpacing: "0.05em"
                            },
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
                              border: "none",
                              background: "#00FF88",
                              color: "#000000",
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: { color: "#111827", fontSize: 12, fontWeight: 700 },
                          children: "Password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontFamily: "monospace",
                              fontWeight: 700,
                              fontSize: 20,
                              color: "#111827",
                              letterSpacing: "0.05em"
                            },
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
                              border: "none",
                              background: "#00FF88",
                              color: "#000000",
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
                    color: "#333333",
                    background: "#F5F5F5",
                    border: "1px solid #E0E0E0"
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
    ),
    showResultModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(0,0,0,0.7)" },
        role: "presentation",
        onClick: () => setShowResultModal(false),
        onKeyDown: (e) => e.key === "Escape" && setShowResultModal(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-sm rounded-2xl p-6 space-y-4",
            style: {
              background: "#FFFFFF",
              border: "1px solid #e5e7eb",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              maxHeight: "80vh",
              overflowY: "auto"
            },
            role: "presentation",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        style: {
                          fontFamily: "'Orbitron', sans-serif",
                          color: "#000000",
                          fontWeight: 700,
                          fontSize: 18
                        },
                        children: "🏆 MATCH RESULT"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowResultModal(false),
                        style: {
                          background: "none",
                          border: "none",
                          fontSize: 20,
                          cursor: "pointer",
                          color: "#666"
                        },
                        children: "×"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    background: "#f9fafb",
                    borderRadius: 12,
                    padding: 14,
                    border: "1px solid #e5e7eb",
                    marginBottom: 8
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#666", fontSize: 12 }, children: "🎮 Tournament" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#111827", fontWeight: 700, marginBottom: 8 }, children: t.name })
                  ]
                }
              ),
              resultLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#888", textAlign: "center", padding: 16 }, children: "⏳ Loading results..." }) : resultData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#888", textAlign: "center", padding: 16 }, children: "📊 Results not announced yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: resultData.slice(0, 3).map((res, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    background: "#f9fafb",
                    borderRadius: 12,
                    padding: 14,
                    border: "1px solid #e5e7eb"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 8,
                        fontSize: 13
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                color: "#666",
                                display: "block",
                                fontSize: 11
                              },
                              children: "👤 Player"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#111827", fontWeight: 700 }, children: res.playerName })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                color: "#666",
                                display: "block",
                                fontSize: 11
                              },
                              children: "🏆 Rank"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#AA44FF", fontWeight: 700 }, children: res.rankLabel })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                color: "#666",
                                display: "block",
                                fontSize: 11
                              },
                              children: "🔫 Kills"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#111827", fontWeight: 700 }, children: res.kills })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                color: "#666",
                                display: "block",
                                fontSize: 11
                              },
                              children: "💰 Prize"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#00AA55", fontWeight: 800 }, children: [
                            "₹",
                            res.prizeAmount.toFixed(2)
                          ] })
                        ] })
                      ]
                    }
                  )
                },
                res.id || i
              )) })
            ]
          }
        )
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pl-4 md:pl-0", style: { color: "#666666" }, children: "Browse and register for Free Fire tournaments" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["free", "paid"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setSection(tab),
        className: "flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
        style: {
          background: section === tab ? "#00FF88" : "#F0F0F0",
          color: section === tab ? "#000000" : "#666666",
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
              background: filterChip === chip ? "#00FF88" : "#F0F0F0",
              color: filterChip === chip ? "#0A0A0A" : "#888",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              border: filterChip === chip ? "none" : "1px solid #E0E0E0",
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs font-bold uppercase",
          style: {
            color: "#888888",
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: 1
          },
          children: "ALL STATUS"
        }
      ) }),
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
            background: "#F0FFF4",
            border: "1px solid #D1FAE5"
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#666666" }, children: "Watch a 30-sec ad → Register instantly → Win real cash prizes 💰" })
          ]
        }
      ),
      visibleFreeTournaments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", style: { color: "#666666" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🎮" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-bold",
            style: {
              fontFamily: "'Orbitron', sans-serif",
              color: "#666666"
            },
            children: "No tournaments available"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: freeStatusTab === "upcoming" ? "No upcoming tournaments scheduled." : freeStatusTab === "live" ? "No tournaments are live right now." : "No completed tournaments yet." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5", children: visibleFreeTournaments.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(FreeTournamentCard, { t, index: idx }, t.id)) })
    ] }),
    section === "paid" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", style: { paddingTop: 8 }, children: [
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
                  background: statusFilter === chip.value ? "#00FF88" : "#F0F0F0",
                  color: statusFilter === chip.value ? "#000000" : "#555555",
                  border: statusFilter === chip.value ? "none" : "1px solid #E0E0E0",
                  boxShadow: statusFilter === chip.value ? "0 0 8px rgba(0,255,136,0.3)" : "none"
                },
                "data-ocid": "tournaments.status_filter.tab",
                children: chip.label
              },
              chip.value
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", style: { color: "#555555" }, children: [
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
          style: { background: "#F0F0F0" }
        },
        i
      )) }) : filteredTournaments.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: filteredTournaments.map((tournament, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TournamentCard,
        {
          tournament,
          index: idx
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
function TournamentCard({
  tournament,
  index = 0
}) {
  const isUpcoming = tournament.status === "upcoming";
  const isOngoing = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";
  const totalTeams = Number(tournament.maxTeams);
  const [registeredCount, setRegisteredCount] = reactExports.useState(0);
  const [isPaidRegistered, setIsPaidRegistered] = reactExports.useState(() => {
    try {
      const key = `ke_paid_joined_${tournament.id.toString()}`;
      return localStorage.getItem(key) === "true";
    } catch {
      return false;
    }
  });
  const [showPaidRoomPopup, setShowPaidRoomPopup] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await getPaidRegistrationCount(tournament.id.toString());
        setRegisteredCount(count);
      } catch {
      }
    };
    fetchCount();
  }, []);
  reactExports.useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await getPaidRegistrationCount(tournament.id.toString());
        setRegisteredCount(count);
      } catch {
      }
    };
    const handler = () => {
      try {
        const key = `ke_paid_joined_${tournament.id.toString()}`;
        setIsPaidRegistered(localStorage.getItem(key) === "true");
        fetchCount();
      } catch {
      }
    };
    window.addEventListener("storage", handler);
    window.addEventListener("paidTournamentUpdated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("paidTournamentUpdated", handler);
    };
  }, []);
  const modeIcon = tournament.tournamentType === "battleground" ? "⚔️" : tournament.tournamentType === "custom4v4" ? "🎮" : tournament.tournamentType === "custom1v1" ? "🥇" : "🥈";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: "#FFFFFF",
        border: "1px solid #E8E8E8",
        borderRadius: 18,
        borderLeft: `4px solid ${["#9d4edd", "#00FF88", "#FF6B35", "#00BFFF"][index % 4]}`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        transition: "all 0.2s ease"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
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
            const isFull = registeredCount >= totalTeams;
            const pct = totalTeams > 0 ? Math.min(100, registeredCount / totalTeams * 100) : 0;
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
                        background: isFull ? "#dc3545" : "linear-gradient(90deg, #9d4edd, #00FF88)",
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
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: isFull ? "#dc3545" : "#333333" }, children: [
                      "👥 ",
                      registeredCount,
                      "/",
                      totalTeams,
                      " teams joined"
                    ] }),
                    isFull ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dc3545", fontWeight: 700 }, children: "🚫 FULL" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      totalTeams - registeredCount,
                      " spots left"
                    ] })
                  ]
                }
              )
            ] });
          })(),
          isOngoing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            isPaidRegistered && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "block w-full text-center py-2 rounded-lg font-bold text-sm uppercase tracking-wide",
                style: {
                  background: "transparent",
                  color: "#00FF88",
                  border: "2px solid #00FF88",
                  borderRadius: 50,
                  fontFamily: "'Orbitron', sans-serif",
                  cursor: "default"
                },
                "data-ocid": "tournaments.registered.badge",
                children: "✓ Registered"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all",
                disabled: !tournament.roomId,
                onClick: () => tournament.roomId && setShowPaidRoomPopup(true),
                style: {
                  background: tournament.roomId ? "linear-gradient(135deg, #9d4edd, #6b21a8)" : "#F0F0F0",
                  color: tournament.roomId ? "#FFFFFF" : "#CCCCCC",
                  border: tournament.roomId ? "none" : "1px solid #E0E0E0",
                  boxShadow: tournament.roomId ? "0 0 10px rgba(157,78,221,0.3)" : "none",
                  cursor: tournament.roomId ? "pointer" : "not-allowed",
                  borderRadius: 8,
                  fontFamily: "'Orbitron', sans-serif"
                },
                "data-ocid": "tournaments.id_password.button",
                children: "🔑 ID/PASSWORD"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2",
                style: {
                  background: "linear-gradient(135deg, #dc3545, #a71d2a)",
                  color: "#FFFFFF",
                  boxShadow: "0 0 12px rgba(220,53,69,0.3)",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 8
                },
                "data-ocid": "tournaments.view_live.button",
                onClick: () => window.open(
                  "https://www.youtube.com/@kl_tournament_007",
                  "_blank"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" }),
                  "🔴 VIEW LIVE"
                ]
              }
            )
          ] }) : isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/tournament/$id",
              params: { id: tournament.id.toString() },
              className: "block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all",
              style: {
                background: "#00FF88",
                color: "#000000",
                fontWeight: 700,
                borderRadius: 25
              },
              "data-ocid": "tournaments.result.button",
              children: "📊 Result"
            }
          ) : isPaidRegistered ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide",
              style: {
                background: "transparent",
                color: "#00FF88",
                border: "2px solid #00FF88",
                borderRadius: 50,
                fontFamily: "'Orbitron', sans-serif",
                cursor: "default"
              },
              "data-ocid": "tournaments.registered.badge",
              children: "✓ Registered"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/tournament/$id",
              params: { id: tournament.id.toString() },
              className: "block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all",
              style: {
                background: "linear-gradient(135deg, #9d4edd, #6b21a8)",
                color: "#FFFFFF",
                boxShadow: "0 0 12px rgba(157,78,221,0.4)",
                borderRadius: 50
              },
              "data-ocid": "tournaments.register.button",
              children: "⚡ PAY & REGISTER"
            }
          )
        ] }),
        showPaidRoomPopup && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4",
            style: {
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(6px)"
            },
            role: "presentation",
            onClick: () => setShowPaidRoomPopup(false),
            onKeyDown: (e) => e.key === "Escape" && setShowPaidRoomPopup(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "w-full max-w-xs rounded-xl p-5 space-y-4",
                style: {
                  background: "#FFFFFF",
                  border: "1px solid #E0E0E0",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
                },
                role: "presentation",
                onClick: (e) => e.stopPropagation(),
                onKeyDown: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "text-center font-bold text-lg",
                      style: { fontFamily: "'Orbitron', sans-serif", color: "#000000" },
                      children: "🔑 Room Details"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-lg p-3 space-y-2",
                      style: {
                        background: "#F5F5F5",
                        border: "1px solid #E0E0E0"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: { color: "#111827", fontSize: 12, fontWeight: 700 },
                              children: "Room ID"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  fontFamily: "monospace",
                                  fontWeight: 700,
                                  fontSize: 20,
                                  color: "#111827",
                                  letterSpacing: "0.05em"
                                },
                                children: tournament.roomId
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
                                  border: "none",
                                  background: "#00FF88",
                                  color: "#000000",
                                  cursor: "pointer",
                                  whiteSpace: "nowrap"
                                },
                                onClick: () => {
                                  navigator.clipboard.writeText(tournament.roomId ?? "").then(() => {
                                    ue.success("✅ Copied!", { duration: 2e3 });
                                  });
                                },
                                children: "📋 COPY ROOM ID"
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: { color: "#111827", fontSize: 12, fontWeight: 700 },
                              children: "Password"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  fontFamily: "monospace",
                                  fontWeight: 700,
                                  fontSize: 20,
                                  color: "#111827",
                                  letterSpacing: "0.05em"
                                },
                                children: tournament.roomPassword || "—"
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
                                  border: "none",
                                  background: "#00FF88",
                                  color: "#000000",
                                  cursor: tournament.roomPassword ? "pointer" : "not-allowed",
                                  opacity: tournament.roomPassword ? 1 : 0.5,
                                  whiteSpace: "nowrap"
                                },
                                disabled: !tournament.roomPassword,
                                onClick: () => {
                                  if (!tournament.roomPassword) return;
                                  navigator.clipboard.writeText(tournament.roomPassword).then(() => {
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
                        color: "#333333",
                        background: "#F5F5F5",
                        border: "1px solid #E0E0E0"
                      },
                      onClick: () => setShowPaidRoomPopup(false),
                      children: "Close"
                    }
                  )
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  TournamentsPage,
  saveFreeMyMatch
};
