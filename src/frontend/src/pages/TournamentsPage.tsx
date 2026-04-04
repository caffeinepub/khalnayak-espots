import type { Tournament } from "@/backend";
import { InterstitialOverlay } from "@/components/AdMobBanner";
import { AdModal } from "@/components/AdModal";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTournaments } from "@/hooks/useQueries";
import { useTokens } from "@/hooks/useTokens";
import {
  getFreeRegistrationCount,
  getPaidRegistrationCount,
  saveFreeRegistration,
} from "@/lib/firestore";
import {
  formatCurrency,
  getTournamentPlayerInfo,
  getTournamentTypeLabel,
} from "@/utils/format";
import { Link } from "@tanstack/react-router";
import { Calendar, SlidersHorizontal, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─────────────────────────────────────────────
// Free Tournament Types
// ─────────────────────────────────────────────
type PrizeDistribution = {
  label: string;
  amount: string;
  condition?: string;
  icon: string;
};

type FreeTournament = {
  id: string;
  name: string;
  tournamentType: string;
  gameMode: "SOLO" | "TEAM";
  modeDetail: string;
  mode: string;
  description: string;
  maxPlayers: number;
  slots: number;
  status: "upcoming";
  prizePool: string;
  prizeDistribution: PrizeDistribution[];
  rules: string[];
};
export type FreeMyMatch = {
  tournamentId: string;
  name: string;
  mode: string;
  prizePool: string;
  registeredAt: number;
  nickname: string;
  uid: string;
};

export function saveFreeMyMatch(
  tournament: FreeTournament,
  nickname: string,
  uid: string,
) {
  try {
    const key = "ke_free_my_matches";
    const list: FreeMyMatch[] = JSON.parse(localStorage.getItem(key) || "[]");
    const exists = list.some(
      (m) => m.tournamentId === tournament.id && m.uid === uid,
    );
    if (!exists) {
      const match: FreeMyMatch = {
        tournamentId: tournament.id,
        name: tournament.name,
        mode: tournament.modeDetail,
        prizePool: tournament.prizePool,
        registeredAt: Date.now(),
        nickname,
        uid,
      };
      list.push(match);
      localStorage.setItem(key, JSON.stringify(list));
    }
  } catch {}
}
// ── Free Tournament State (localStorage) ──────────────────────────────────
function getFreeJoinCount(id: string): number {
  return Number.parseInt(
    localStorage.getItem(`freeJoinCount_${id}`) || "0",
    10,
  );
}
function setFreeJoinCount(id: string, count: number) {
  localStorage.setItem(`freeJoinCount_${id}`, String(count));
}
function getFreeRoomId(id: string): string {
  return localStorage.getItem(`freeRoomId_${id}`) || "";
}
function getFreeRoomPassword(id: string): string {
  return localStorage.getItem(`freeRoomPassword_${id}`) || "";
}
function isFreeMatchStarted(id: string): boolean {
  return localStorage.getItem(`freeMatchStarted_${id}`) === "true";
}

// ─────────────────────────────────────────────
// Free Registration Modal
// ─────────────────────────────────────────────
type FreeRegState = "idle" | "adPlaying" | "formOpen" | "submitting" | "done";

function FreeRegistrationModal({
  tournament,
  isOpen,
  onClose,
}: {
  tournament: FreeTournament;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [state, setState] = useState<FreeRegState>("idle");
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [nickname, setNickname] = useState("");
  const [uid, setUid] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [uidError, setUidError] = useState("");
  const [touched, setTouched] = useState(false);
  const validateUid = (v: string) => {
    if (!v) return "Free Fire UID required hai.";
    if (!/^\d+$/.test(v)) return "⚠️ UID sirf numbers mein hona chahiye.";
    if (v.length < 8) return "⚠️ UID minimum 8 digits ka hona chahiye.";
    return "";
  };

  const isDuplicateUid = (v: string) => {
    try {
      const key = `ke_free_uids_${tournament.id}`;
      const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
      return list.includes(v);
    } catch {
      return false;
    }
  };

  const saveUid = (v: string) => {
    try {
      const key = `ke_free_uids_${tournament.id}`;
      const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
      if (!list.includes(v)) {
        list.push(v);
        localStorage.setItem(key, JSON.stringify(list));
      }
    } catch {}
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
    toast.error(
      "Ad pura nahi dekha — registration ke liye poora ad dekhna zaroori hai.",
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    // Check if this browser/user already joined this tournament
    if (localStorage.getItem(`ke_free_joined_${tournament.id}`) === "true") {
      toast.error("❌ You have already registered for this tournament.");
      setState("idle");
      return;
    }
    if (!nickname.trim()) {
      toast.error("Nickname required hai.");
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
      toast.error("Please confirm to continue.");
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
        registeredAt: Date.now(),
      }).catch(() => {});
      setState("done");
      setShowInterstitial(true);
      toast.success("✅ Registration successful!", {
        description: `${nickname} tournament mein register ho gaya! 🎉`,
      });
      // Increment join count
      const newCount = getFreeJoinCount(tournament.id) + 1;
      setFreeJoinCount(tournament.id, newCount);
      window.dispatchEvent(new Event("freeTournamentUpdated"));
    }, 800);
  };

  return (
    <>
      {/* Rewarded ad */}
      <AdModal
        isOpen={state === "adPlaying"}
        onComplete={handleAdComplete}
        onCancel={handleAdCancel}
        duration={30}
        title="Watch Ad to Join Free"
        hideClaimReward={true}
      />

      {/* Post-registration interstitial */}
      <InterstitialOverlay
        isOpen={showInterstitial}
        onDismiss={() => {
          setShowInterstitial(false);
          handleClose();
        }}
      />

      {/* Form dialog */}
      <Dialog
        open={isOpen && state !== "adPlaying" && !showInterstitial}
        onOpenChange={(v) => {
          if (!v) handleClose();
        }}
      >
        <DialogContent
          className="max-w-md"
          style={{
            background: "#0f172a",
            border: "1px solid rgba(0,255,136,0.3)",
          }}
        >
          <DialogHeader>
            <DialogTitle
              style={{ fontFamily: "'Orbitron', sans-serif", color: "#00FF88" }}
            >
              {tournament.mode} {tournament.name}
            </DialogTitle>
            <DialogDescription style={{ color: "#666666" }}>
              {tournament.modeDetail} • Prize Pool: {tournament.prizePool}
            </DialogDescription>
          </DialogHeader>

          {/* Prize info */}
          <div
            className="rounded-lg p-3 space-y-2"
            style={{
              background: "rgba(255,215,0,0.07)",
              border: "1px solid rgba(255,215,0,0.25)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide"
              style={{ color: "#ffd700" }}
            >
              🏆 Prize Distribution
            </p>
            {tournament.prizeDistribution.map((prize) => (
              <div
                key={prize.label}
                className="flex items-start justify-between gap-2"
              >
                <div>
                  <span className="text-sm font-semibold text-white">
                    {prize.label}
                  </span>
                  {prize.condition && (
                    <p className="text-xs" style={{ color: "#666666" }}>
                      {prize.condition}
                    </p>
                  )}
                </div>
                <span
                  className="font-bold text-sm shrink-0"
                  style={{ color: "#00FF88" }}
                >
                  {prize.amount}
                </span>
              </div>
            ))}
          </div>

          {state === "idle" || state === "done" ? (
            /* Show WATCH AD button */
            <div className="flex flex-col items-center gap-3 py-4">
              <button
                type="button"
                onClick={() => setState("adPlaying")}
                className="relative px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3 w-full justify-center"
                style={{
                  background: "linear-gradient(135deg, #00FF88, #00cc6a)",
                  color: "#000",
                  boxShadow: "0 0 24px rgba(0,255,136,0.6)",
                  fontFamily: "'Orbitron', sans-serif",
                }}
                data-ocid="free_tournament.primary_button"
              >
                <span className="text-xl">🎬</span>
                WATCH AD &amp; JOIN FREE
              </button>
              <p className="text-xs" style={{ color: "#666666" }}>
                30-sec ad dekhne ke baad registration form khulega
              </p>
            </div>
          ) : (
            /* Registration form */
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              {/* Nickname */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="fn-nick"
                  className="font-semibold"
                  style={{ color: "#111827", fontWeight: 700 }}
                >
                  Free Fire Nickname *
                </Label>
                <Input
                  id="fn-nick"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Enter your Free Fire nickname"
                  autoComplete="off"
                  className={
                    touched && !nickname.trim() ? "border-red-500" : ""
                  }
                  style={{
                    background: "#F5F5F5",
                    color: "#111827",
                    border: "1px solid #D1D5DB",
                  }}
                  data-ocid="free_tournament.input"
                />
                {touched && !nickname.trim() && (
                  <p className="text-xs text-red-400">
                    ❌ Nickname required hai.
                  </p>
                )}
              </div>

              {/* UID */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="fn-uid"
                  className="font-semibold"
                  style={{ color: "#111827", fontWeight: 700 }}
                >
                  Free Fire UID *{" "}
                  <span
                    className="text-xs font-normal"
                    style={{ color: "#666666" }}
                  >
                    (min 8 digits, numeric)
                  </span>
                </Label>
                <Input
                  id="fn-uid"
                  value={uid}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    setUid(v);
                    if (uidError) setUidError(validateUid(v));
                  }}
                  placeholder="e.g. 123456789"
                  inputMode="numeric"
                  className={
                    uidError
                      ? "border-red-500"
                      : uid.length >= 8
                        ? "border-green-500"
                        : ""
                  }
                  style={{
                    background: "#F5F5F5",
                    color: "#111827",
                    border: "1px solid #D1D5DB",
                  }}
                  data-ocid="free_tournament.input"
                />
                {uidError && <p className="text-xs text-red-400">{uidError}</p>}
                {!uidError && uid.length >= 8 && (
                  <p className="text-xs text-green-400">✅ Valid UID</p>
                )}
              </div>

              {/* Confirm */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="fn-confirm"
                  checked={confirmed}
                  onCheckedChange={(v) => setConfirmed(v as boolean)}
                  data-ocid="free_tournament.checkbox"
                />
                <Label
                  htmlFor="fn-confirm"
                  className="text-sm cursor-pointer leading-relaxed"
                  style={{ color: "#333333" }}
                >
                  Main confirm karta/karti hoon ki ye details sahi hain aur main
                  tournament rules se agree karta/karti hoon.
                </Label>
              </div>
              {touched && !confirmed && (
                <p className="text-xs text-red-400">
                  ❌ Please confirm to proceed.
                </p>
              )}

              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-base transition-all active:scale-95 disabled:opacity-60"
                style={{
                  background: state === "submitting" ? "#00cc6a" : "#00FF88",
                  color: "#000000",
                  fontWeight: 700,
                  boxShadow:
                    state === "submitting"
                      ? "none"
                      : "0 0 20px rgba(0,255,136,0.5)",
                  fontFamily: "'Orbitron', sans-serif",
                }}
                data-ocid="free_tournament.submit_button"
              >
                {state === "submitting"
                  ? "⏳ Registering..."
                  : "✅ COMPLETE REGISTRATION"}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─────────────────────────────────────────────
// Free Tournament Card
// ─────────────────────────────────────────────
function FreeTournamentCard({
  t,
  index = 0,
}: { t: FreeTournament; index?: number }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [joinCount, setJoinCount] = useState(() => getFreeJoinCount(t.id));
  const [roomId, setRoomId] = useState(() => getFreeRoomId(t.id));
  const [roomPassword, setRoomPassword] = useState(() =>
    getFreeRoomPassword(t.id),
  );
  const [matchStarted, setMatchStarted] = useState(() =>
    isFreeMatchStarted(t.id),
  );
  const [isDone, setIsDone] = useState(
    () => localStorage.getItem(`freeMatchDone_${t.id}`) === "true",
  );
  const [showRoomPopup, setShowRoomPopup] = useState(false);
  const [isJoined, setIsJoined] = useState(
    () => localStorage.getItem(`ke_free_joined_${t.id}`) === "true",
  );
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultData, setResultData] = useState<
    Array<{
      id?: string;
      tournamentId: string;
      tournamentName: string;
      playerName: string;
      kills: number;
      rank: number;
      rankLabel: string;
      prizeAmount: number;
      completedAt: string;
    }>
  >([]);
  const [resultLoading, setResultLoading] = useState(false);

  const fetchResults = async () => {
    setResultLoading(true);
    try {
      const { collection, query, where, getDocs } = await import(
        "firebase/firestore"
      );
      const { getFirebaseDb } = await import("../lib/firebase");
      const db = getFirebaseDb();
      const q = query(
        collection(db, "matchResults"),
        where("tournamentId", "==", t.id),
      );
      const snap = await getDocs(q);
      const all = snap.docs.map(
        (d) =>
          ({ id: d.id, ...d.data() }) as {
            id: string;
            tournamentId: string;
            tournamentName: string;
            playerName: string;
            kills: number;
            rank: number;
            rankLabel: string;
            prizeAmount: number;
            completedAt: string;
          },
      );
      all.sort((a, b) => a.rank - b.rank);
      setResultData(all);
    } catch {}
    setResultLoading(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-only fetch, t.id stable
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await getFreeRegistrationCount(t.id);
        if (count > 0) {
          setJoinCount(count);
          setFreeJoinCount(t.id, count);
        }
      } catch {}
    };
    fetchCount();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: event listener setup, t.id stable
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await getFreeRegistrationCount(t.id);
        if (count > 0) {
          setJoinCount(count);
          setFreeJoinCount(t.id, count);
        }
      } catch {}
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

  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: matchStarted ? "rgba(255,0,0,0.03)" : "#FFFFFF",
          border: matchStarted
            ? "1.5px solid rgba(220,53,69,0.4)"
            : "1px solid #E8E8E8",
          borderRadius: 18,
          borderLeft: matchStarted
            ? "4px solid #dc3545"
            : `4px solid ${["#00FF88", "#9d4edd", "#FF6B35", "#00BFFF"][index % 4]}`,
          boxShadow: matchStarted
            ? hovered
              ? "0 8px 24px rgba(220,53,69,0.25)"
              : "0 4px 16px rgba(220,53,69,0.15)"
            : hovered
              ? "0 8px 24px rgba(0,0,0,0.15)"
              : "0 4px 12px rgba(0,0,0,0.08)",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transition: "all 0.2s ease",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div className="p-4 space-y-3">
          {/* Badges row */}
          <div className="flex items-center justify-between gap-2">
            {/* FREE badge */}
            <div className="flex items-center gap-1.5">
              <span
                className="text-xs font-bold uppercase px-2 py-0.5 rounded-full"
                style={{
                  background: "#00FF88",
                  color: "#000000",
                  borderRadius: 20,
                  boxShadow: "0 0 10px rgba(0,255,136,0.5)",
                  fontWeight: 800,
                }}
              >
                🎁 FREE
              </span>
              {matchStarted && (
                <span
                  className="text-xs font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={{ background: "#dc3545", color: "#FFFFFF" }}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              )}
            </div>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                background: "#6f42c1",
                color: "#FFFFFF",
                borderRadius: 20,
              }}
            >
              {t.mode} {getTournamentTypeLabel(t.tournamentType)}
            </span>
          </div>

          {/* Name */}
          <h3
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(1rem,4vw,1.125rem)",
              color: "#000000",
              fontWeight: 700,
            }}
          >
            {t.name}
          </h3>
          <p className="text-xs" style={{ color: "#666666" }}>
            {t.description} • {t.modeDetail}
          </p>

          {/* Stats */}
          <div
            className="rounded-lg p-3 space-y-2"
            style={{
              background: "#F8F8F8",
              border: "1px solid #E0E0E0",
            }}
          >
            <div className="flex justify-between text-sm">
              <span style={{ color: "#666666" }}>Entry Fee</span>
              <span
                className="font-bold text-xs px-2 py-0.5 rounded-full"
                style={{ background: "#28a745", color: "#FFFFFF" }}
              >
                🎁 FREE
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "#666666" }}>Prize Pool</span>
              <span className="font-bold" style={{ color: "#00FF88" }}>
                {t.prizePool}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span
                className="flex items-center gap-1"
                style={{ color: "#666666" }}
              >
                <Users className="h-3 w-3" /> Max Players
              </span>
              <span className="font-bold" style={{ color: "#333333" }}>
                {t.maxPlayers}
              </span>
            </div>
          </div>

          {/* Join Count + Spots Left */}
          <div
            className="rounded-lg px-3 py-2 flex items-center justify-between text-sm font-bold"
            style={{
              background: isFull
                ? "rgba(220,53,69,0.08)"
                : "rgba(40,167,69,0.05)",
              border: `1px solid ${isFull ? "rgba(220,53,69,0.3)" : "rgba(40,167,69,0.2)"}`,
              fontFamily: "'Rajdhani', sans-serif",
            }}
          >
            <span style={{ color: "#333333" }}>👥 Joined</span>
            {isFull ? (
              <span style={{ color: "#dc3545", fontWeight: 700 }}>
                {joinCount}/{t.maxPlayers} FULL
              </span>
            ) : (
              <span style={{ color: "#333333" }}>
                👥 {joinCount}/{t.maxPlayers} Only {spotsLeft} Spots Left
              </span>
            )}
          </div>

          {/* Progress bar — spots filled */}
          {(() => {
            const pct = Math.min(100, (joinCount / t.maxPlayers) * 100);
            return (
              <div>
                <div
                  style={{
                    height: 4,
                    background: "#E0E0E0",
                    borderRadius: 2,
                    marginTop: 4,
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      width: `${pct}%`,
                      background: "linear-gradient(90deg, #9d4edd, #00FF88)",
                      borderRadius: 2,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "#666666",
                    marginTop: 4,
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                >
                  <span>{joinCount} joined</span>
                  <span>{spotsLeft} spots left</span>
                </div>
              </div>
            );
          })()}

          {/* Prize Distribution */}
          <div
            className="rounded-lg p-3 space-y-1.5"
            style={{
              background: "#F5F5F5",
              border: "1px solid #E0E0E0",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide mb-2"
              style={{ color: "#333333" }}
            >
              🏆 Prize Distribution
            </p>
            {t.prizeDistribution.map((prize) => (
              <div
                key={prize.label}
                className="flex items-start justify-between gap-2"
              >
                <div className="min-w-0">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "#333333" }}
                  >
                    {prize.label}
                  </span>
                  {prize.condition && (
                    <p
                      className="text-xs leading-tight mt-0.5"
                      style={{ color: "#888888" }}
                    >
                      {prize.condition}
                    </p>
                  )}
                </div>
                <span
                  className="font-bold text-xs shrink-0"
                  style={{ color: "#00FF88" }}
                >
                  {prize.amount}
                </span>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div className="space-y-1">
            {t.rules.map((rule) => (
              <div key={rule} className="flex items-start gap-1.5">
                <span className="text-xs mt-0.5" style={{ color: "#28a745" }}>
                  ✓
                </span>
                <p className="text-xs" style={{ color: "#666666" }}>
                  {rule}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="flex gap-2">
            {matchStarted && !isDone && (
              <button
                type="button"
                className="flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-1"
                style={{
                  background: "linear-gradient(135deg, #dc3545, #a71d2a)",
                  color: "#FFFFFF",
                  border: "none",
                  boxShadow: "0 0 12px rgba(220,53,69,0.4)",
                  cursor: "pointer",
                  fontFamily: "'Orbitron', sans-serif",
                  borderRadius: 25,
                }}
                data-ocid="free_tournament.live_button"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/@kl_tournament_007",
                    "_blank",
                  )
                }
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                🔴 VIEW LIVE
              </button>
            )}

            {!matchStarted && !isDone && (
              <button
                type="button"
                disabled={!roomId}
                onClick={() => roomId && setShowRoomPopup(true)}
                className="flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all"
                style={{
                  background: roomId
                    ? "linear-gradient(135deg, #9d4edd, #6a0dad)"
                    : "#F0F0F0",
                  color: roomId ? "#FFFFFF" : "#CCCCCC",
                  border: roomId ? "none" : "1px solid #E0E0E0",
                  boxShadow: roomId ? "0 0 10px rgba(157,78,221,0.3)" : "none",
                  cursor: roomId ? "pointer" : "not-allowed",
                  fontFamily: "'Orbitron', sans-serif",
                }}
                data-ocid="free_tournament.id_password_button"
              >
                🔑 ID/PASSWORD
              </button>
            )}

            {isDone && (
              <button
                type="button"
                className="flex-1 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all active:scale-95"
                style={{
                  background: "#00FF88",
                  color: "#000000",
                  border: "none",
                  borderRadius: 25,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Orbitron', sans-serif",
                  boxShadow: "0 0 12px rgba(0,255,136,0.4)",
                }}
                data-ocid="free_tournament.result_button"
                onClick={() => {
                  fetchResults();
                  setShowResultModal(true);
                }}
              >
                📊 Result
              </button>
            )}
          </div>

          {/* Main JOIN / JOINED / Status button */}
          {isDone ? null : matchStarted ? null : isJoined ? (
            <button
              type="button"
              disabled
              className="block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide"
              style={{
                background: "transparent",
                color: "#00FF88",
                border: "2px solid #00FF88",
                fontFamily: "'Orbitron', sans-serif",
                cursor: "not-allowed",
              }}
              data-ocid="free_tournament.joined_button"
            >
              ✅ JOINED
            </button>
          ) : (
            <button
              type="button"
              onClick={() => !isFull && setModalOpen(true)}
              disabled={isFull}
              className="block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{
                background: isFull
                  ? "#F0F0F0"
                  : "linear-gradient(135deg, #28a745, #1a6b2a)",
                color: isFull ? "#CCCCCC" : "#FFFFFF",
                boxShadow: isFull ? "none" : "0 0 12px rgba(40,167,69,0.3)",
                fontFamily: "'Orbitron', sans-serif",
                cursor: isFull ? "not-allowed" : "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                borderRadius: 50,
              }}
              data-ocid="free_tournament.primary_button"
            >
              {isFull ? "🚫 TOURNAMENT FULL" : "🔥 WATCH AD & JOIN FREE"}
            </button>
          )}
        </div>
      </div>

      {/* Room ID/Password Popup */}
      {showRoomPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
          }}
          role="presentation"
          onClick={() => setShowRoomPopup(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowRoomPopup(false)}
        >
          <div
            className="w-full max-w-xs rounded-xl p-5 space-y-4"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E0E0E0",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <h3
              className="text-center font-bold text-lg"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "#000000" }}
            >
              🔑 Room Details
            </h3>
            <div
              className="rounded-lg p-3 space-y-2"
              style={{
                background: "#F5F5F5",
                border: "1px solid #E0E0E0",
              }}
            >
              {/* Room ID row */}
              <div className="space-y-1">
                <span
                  style={{ color: "#111827", fontSize: 12, fontWeight: 700 }}
                >
                  Room ID
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#111827",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {roomId}
                  </span>
                  <button
                    type="button"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "5px 12px",
                      borderRadius: 7,
                      border: "none",
                      background: "#00FF88",
                      color: "#000000",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(roomId ?? "").then(() => {
                        toast.success("✅ Copied!", { duration: 2000 });
                      });
                    }}
                  >
                    📋 COPY ROOM ID
                  </button>
                </div>
              </div>
              {/* Password row */}
              <div className="space-y-1">
                <span
                  style={{ color: "#111827", fontSize: 12, fontWeight: 700 }}
                >
                  Password
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#111827",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {roomPassword || "—"}
                  </span>
                  <button
                    type="button"
                    style={{
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
                      whiteSpace: "nowrap",
                    }}
                    disabled={!roomPassword}
                    onClick={() => {
                      if (!roomPassword) return;
                      navigator.clipboard.writeText(roomPassword).then(() => {
                        toast.success("✅ Copied!", { duration: 2000 });
                      });
                    }}
                  >
                    📋 COPY PASSWORD
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="w-full py-1.5 rounded-lg text-sm"
              style={{
                color: "#333333",
                background: "#F5F5F5",
                border: "1px solid #E0E0E0",
              }}
              onClick={() => setShowRoomPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <FreeRegistrationModal
        tournament={t}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Result Modal */}
      {showResultModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          role="presentation"
          onClick={() => setShowResultModal(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowResultModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 space-y-4"
            style={{
              background: "#FFFFFF",
              border: "1px solid #e5e7eb",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#000000",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                🏆 MATCH RESULT
              </h3>
              <button
                type="button"
                onClick={() => setShowResultModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                ×
              </button>
            </div>
            <div
              style={{
                background: "#f9fafb",
                borderRadius: 12,
                padding: 14,
                border: "1px solid #e5e7eb",
                marginBottom: 8,
              }}
            >
              <p style={{ color: "#666", fontSize: 12 }}>🎮 Tournament</p>
              <p style={{ color: "#111827", fontWeight: 700, marginBottom: 8 }}>
                {t.name}
              </p>
            </div>
            {resultLoading ? (
              <p style={{ color: "#888", textAlign: "center", padding: 16 }}>
                ⏳ Loading results...
              </p>
            ) : resultData.length === 0 ? (
              <p style={{ color: "#888", textAlign: "center", padding: 16 }}>
                📊 Results not announced yet
              </p>
            ) : (
              <div className="space-y-3">
                {resultData.slice(0, 3).map((res, i) => (
                  <div
                    key={res.id || i}
                    style={{
                      background: "#f9fafb",
                      borderRadius: 12,
                      padding: 14,
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 8,
                        fontSize: 13,
                      }}
                    >
                      <div>
                        <span
                          style={{
                            color: "#666",
                            display: "block",
                            fontSize: 11,
                          }}
                        >
                          👤 Player
                        </span>
                        <span style={{ color: "#111827", fontWeight: 700 }}>
                          {res.playerName}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            color: "#666",
                            display: "block",
                            fontSize: 11,
                          }}
                        >
                          🏆 Rank
                        </span>
                        <span style={{ color: "#AA44FF", fontWeight: 700 }}>
                          {res.rankLabel}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            color: "#666",
                            display: "block",
                            fontSize: 11,
                          }}
                        >
                          🔫 Kills
                        </span>
                        <span style={{ color: "#111827", fontWeight: 700 }}>
                          {res.kills}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            color: "#666",
                            display: "block",
                            fontSize: 11,
                          }}
                        >
                          💰 Prize
                        </span>
                        <span style={{ color: "#00AA55", fontWeight: 800 }}>
                          ₹{res.prizeAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
// Load admin-created free tournaments from localStorage
// ─────────────────────────────────────────────
function getAdminCreatedFreeTournaments(): FreeTournament[] {
  const result: FreeTournament[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith("customFreeTournament_")) continue;
    try {
      const data = JSON.parse(localStorage.getItem(key) || "");
      const modeMap: Record<
        string,
        {
          tournamentType: string;
          gameMode: "SOLO" | "TEAM";
          modeDetail: string;
          mode: string;
          maxPlayers: number;
        }
      > = {
        Solo: {
          tournamentType: "battleground",
          gameMode: "SOLO",
          modeDetail: "Solo (har player apne liye)",
          mode: "⚔️",
          maxPlayers: 500,
        },
        "4v4": {
          tournamentType: "custom4v4",
          gameMode: "TEAM",
          modeDetail: "Team (2 teams × 4 players)",
          mode: "🎮",
          maxPlayers: 40,
        },
        "1v1": {
          tournamentType: "custom1v1",
          gameMode: "SOLO",
          modeDetail: "Solo (2 players)",
          mode: "🥇",
          maxPlayers: 10,
        },
        "2v2": {
          tournamentType: "custom2v2",
          gameMode: "TEAM",
          modeDetail: "Team (2 teams × 2 players)",
          mode: "🥈",
          maxPlayers: 20,
        },
      };
      const modeInfo = modeMap[data.mode] ?? modeMap.Solo;
      const prizeDistribution: PrizeDistribution[] = (data.prizes || []).map(
        (p: { label: string; prize: string; condition?: string }) => ({
          label: p.label,
          amount: p.prize,
          condition: p.condition || "",
          icon: "🏆",
        }),
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
        status: "upcoming" as const,
        prizePool: data.prizePool || "₹0",
        prizeDistribution,
        rules: [],
      });
    } catch {}
  }
  return result;
}

// ─────────────────────────────────────────────
// Main TournamentsPage
// ─────────────────────────────────────────────
export function TournamentsPage() {
  const { data: tournaments, isLoading } = useGetTournaments();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [section, setSection] = useState<"free" | "paid">("free");
  const [filterChip, setFilterChip] = useState("ALL");
  const [adminFreeTournaments, setAdminFreeTournaments] = useState<
    FreeTournament[]
  >(() => getAdminCreatedFreeTournaments());
  useEffect(() => {
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

  const [freeStatusTab, setFreeStatusTab] = useState<
    "upcoming" | "live" | "done"
  >("upcoming");

  function getFreeTournamentStatus(
    t: FreeTournament,
  ): "upcoming" | "live" | "done" {
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
    } catch {}
    return "upcoming";
  }

  const visibleFreeTournaments = adminFreeTournaments.filter(
    (t) => getFreeTournamentStatus(t) === freeStatusTab,
  );

  const filteredTournaments =
    tournaments?.filter((t) => {
      const matchesType =
        typeFilter === "all" || t.tournamentType === typeFilter;
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      return matchesType && matchesStatus;
    }) || [];

  return (
    <div className="min-h-screen pb-24" style={{ background: "#FFFFFF" }}>
      <div className="container py-8 space-y-6 px-4 md:px-6">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div style={{ borderLeft: "3px solid #00FF88", paddingLeft: 12 }}>
              <h1
                className="text-4xl font-bold font-display"
                style={{
                  borderBottom: "2px solid rgba(0,255,136,0.4)",
                  paddingBottom: 4,
                }}
              >
                All Tournaments
              </h1>
            </div>
            <SlidersHorizontal
              className="md:hidden"
              style={{ width: 20, height: 20, color: "#00FF88", flexShrink: 0 }}
            />
          </div>
          <p className="pl-4 md:pl-0" style={{ color: "#666666" }}>
            Browse and register for Free Fire tournaments
          </p>
        </div>

        {/* Section tabs: Free / Paid */}
        <div className="flex gap-3">
          {(["free", "paid"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSection(tab)}
              className="flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              style={{
                background: section === tab ? "#00FF88" : "#F0F0F0",
                color: section === tab ? "#000000" : "#666666",
                border: section === tab ? "none" : "1px solid #E0E0E0",
                boxShadow: "none",
                fontFamily: "'Orbitron', sans-serif",
              }}
              data-ocid="tournaments.section.tab"
            >
              {tab === "free" ? "🎁 Free Tournaments" : "💰 Paid Tournaments"}
            </button>
          ))}
        </div>

        {/* Filter chips row — visual mode filter */}
        <div
          style={{
            overflowX: "auto",
            display: "flex",
            gap: 8,
            padding: "0 0 12px",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          className="scrollbar-hide"
          data-ocid="tournaments.mode_filter.panel"
        >
          {["ALL", "BG", "4V4", "1V1", "2V2"].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setFilterChip(chip)}
              style={{
                flexShrink: 0,
                padding: "6px 16px",
                borderRadius: 20,
                background: filterChip === chip ? "#00FF88" : "#F0F0F0",
                color: filterChip === chip ? "#0A0A0A" : "#888",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                border: filterChip === chip ? "none" : "1px solid #E0E0E0",
                boxShadow:
                  filterChip === chip ? "0 0 12px rgba(0,255,136,0.4)" : "none",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: 1,
                transition: "all 0.15s ease",
              }}
              data-ocid="tournaments.mode_filter.tab"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* ── FREE SECTION ── */}
        {section === "free" && (
          <div className="space-y-4">
            {/* Status tabs — Upcoming / Live / Done */}
            <div style={{ marginBottom: 6 }}>
              <p
                className="text-xs font-bold uppercase"
                style={{
                  color: "#888888",
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: 1,
                }}
              >
                ALL STATUS
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                paddingBottom: 4,
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {(["upcoming", "live", "done"] as const).map((tab) => {
                const labels = {
                  upcoming: "⏰ UPCOMING",
                  live: "🔴 LIVE",
                  done: "✅ DONE",
                };
                const isActive = freeStatusTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFreeStatusTab(tab)}
                    style={{
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
                      boxShadow: isActive
                        ? "0 0 12px rgba(0,255,136,0.4)"
                        : "none",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                background: "#F0FFF4",
                border: "1px solid #D1FAE5",
              }}
            >
              <p
                className="font-display font-bold text-sm mb-1"
                style={{ color: "#00FF88" }}
              >
                🎉 FREE TOURNAMENTS — No Entry Fee!
              </p>
              <p className="text-xs" style={{ color: "#666666" }}>
                Watch a 30-sec ad → Register instantly → Win real cash prizes 💰
              </p>
            </div>

            {visibleFreeTournaments.length === 0 ? (
              <div className="text-center py-12" style={{ color: "#666666" }}>
                <p className="text-4xl mb-3">🎮</p>
                <p
                  className="font-bold"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#666666",
                  }}
                >
                  No tournaments available
                </p>
                <p className="text-sm mt-1">
                  {freeStatusTab === "upcoming"
                    ? "No upcoming tournaments scheduled."
                    : freeStatusTab === "live"
                      ? "No tournaments are live right now."
                      : "No completed tournaments yet."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {visibleFreeTournaments.map((t, idx) => (
                  <FreeTournamentCard key={t.id} t={t} index={idx} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PAID SECTION ── */}
        {section === "paid" && (
          <div className="space-y-6" style={{ paddingTop: 8 }}>
            {/* Filter chips — Type */}
            <div className="space-y-3">
              <div
                className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
                data-ocid="tournaments.type_filter.panel"
              >
                {[
                  { value: "all", label: "All" },
                  { value: "battleground", label: "⚔️ Battle Ground" },
                  { value: "custom4v4", label: "🎮 4vs4" },
                  { value: "custom1v1", label: "🥇 1vs1" },
                  { value: "custom2v2", label: "🥈 2vs2" },
                ].map((chip) => (
                  <button
                    key={chip.value}
                    type="button"
                    onClick={() => setTypeFilter(chip.value)}
                    className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all"
                    style={{
                      background:
                        typeFilter === chip.value ? "#00FF88" : "#F0F0F0",
                      color: typeFilter === chip.value ? "#0A0A0A" : "#555555",
                      border:
                        typeFilter === chip.value
                          ? "none"
                          : "1px solid #E0E0E0",
                      boxShadow:
                        typeFilter === chip.value
                          ? "0 0 8px rgba(0,255,136,0.3)"
                          : "none",
                    }}
                    data-ocid="tournaments.type_filter.tab"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Status chips */}
              <div
                className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
                data-ocid="tournaments.status_filter.panel"
              >
                {[
                  { value: "all", label: "All Status" },
                  { value: "upcoming", label: "⏰ Upcoming" },
                  { value: "ongoing", label: "🔴 Live" },
                  { value: "completed", label: "✅ Done" },
                ].map((chip) => (
                  <button
                    key={chip.value}
                    type="button"
                    onClick={() => setStatusFilter(chip.value)}
                    className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all"
                    style={{
                      background:
                        statusFilter === chip.value ? "#00FF88" : "#F0F0F0",
                      color:
                        statusFilter === chip.value ? "#000000" : "#555555",
                      border:
                        statusFilter === chip.value
                          ? "none"
                          : "1px solid #E0E0E0",
                      boxShadow:
                        statusFilter === chip.value
                          ? "0 0 8px rgba(0,255,136,0.3)"
                          : "none",
                    }}
                    data-ocid="tournaments.status_filter.tab"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              <div className="text-sm" style={{ color: "#555555" }}>
                {filteredTournaments.length} tournament
                {filteredTournaments.length !== 1 ? "s" : ""} found
              </div>
            </div>

            {/* Tournament Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-96 rounded-[12px]"
                    style={{ background: "#F0F0F0" }}
                  />
                ))}
              </div>
            ) : filteredTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTournaments.map((tournament, idx) => (
                  <TournamentCard
                    key={tournament.id.toString()}
                    tournament={tournament}
                    index={idx}
                  />
                ))}
              </div>
            ) : (
              <div
                className="p-12 rounded-[12px] text-center"
                style={{
                  background: "#F8F8F8",
                  border: "1px solid #E0E0E0",
                }}
                data-ocid="tournaments.empty_state"
              >
                <p style={{ color: "#666666" }}>
                  No tournaments found matching your filters.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Paid Tournament Card (unchanged)
// ─────────────────────────────────────────────
function TournamentCard({
  tournament,
  index = 0,
}: { tournament: Tournament; index?: number }) {
  const isUpcoming = tournament.status === "upcoming";
  const isOngoing = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";
  const totalTeams = Number(tournament.maxTeams);

  // Real-time registration count from Firestore
  const [registeredCount, setRegisteredCount] = useState(0);

  // Check if current user has already registered for this paid tournament
  const [isPaidRegistered, setIsPaidRegistered] = useState(() => {
    try {
      const key = `ke_paid_joined_${tournament.id.toString()}`;
      return localStorage.getItem(key) === "true";
    } catch {
      return false;
    }
  });
  const [showPaidRoomPopup, setShowPaidRoomPopup] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-only fetch, tournament.id stable
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await getPaidRegistrationCount(tournament.id.toString());
        setRegisteredCount(count);
      } catch {}
    };
    fetchCount();
  }, []);

  // Listen for registration updates
  // biome-ignore lint/correctness/useExhaustiveDependencies: event listener setup, tournament.id stable
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await getPaidRegistrationCount(tournament.id.toString());
        setRegisteredCount(count);
      } catch {}
    };
    const handler = () => {
      try {
        const key = `ke_paid_joined_${tournament.id.toString()}`;
        setIsPaidRegistered(localStorage.getItem(key) === "true");
        fetchCount();
      } catch {}
    };
    window.addEventListener("storage", handler);
    window.addEventListener("paidTournamentUpdated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("paidTournamentUpdated", handler);
    };
  }, []);

  const modeIcon =
    tournament.tournamentType === "battleground"
      ? "⚔️"
      : tournament.tournamentType === "custom4v4"
        ? "🎮"
        : tournament.tournamentType === "custom1v1"
          ? "🥇"
          : "🥈";

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E8E8E8",
        borderRadius: 18,
        borderLeft: `4px solid ${["#9d4edd", "#00FF88", "#FF6B35", "#00BFFF"][index % 4]}`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          {isOngoing ? (
            <span
              className="text-xs font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: "#dc3545", color: "#FFFFFF" }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          ) : isCompleted ? (
            <span
              className="text-xs font-bold uppercase px-2 py-0.5 rounded-full"
              style={{ background: "#6c757d", color: "#FFFFFF" }}
            >
              ✅ DONE
            </span>
          ) : (
            <span
              className="text-xs font-bold uppercase px-2 py-0.5 rounded-full"
              style={{ background: "#0d6efd", color: "#FFFFFF" }}
            >
              ⏰ UPCOMING
            </span>
          )}
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: "#6f42c1", color: "#FFFFFF" }}
          >
            {modeIcon} {getTournamentTypeLabel(tournament.tournamentType)}
          </span>
        </div>

        <h3
          className="font-display font-bold leading-tight"
          style={{
            fontSize: "clamp(1rem, 4vw, 1.125rem)",
            color: "#000000",
            fontWeight: 700,
          }}
        >
          {tournament.name}
        </h3>
        <p className="text-xs" style={{ color: "#666666" }}>
          {getTournamentPlayerInfo(tournament.tournamentType).description}
        </p>

        {isUpcoming && (
          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "#666666" }}
          >
            <Calendar className="h-3 w-3" />
            <span>Starts in: </span>
            <CountdownTimer targetTime={tournament.startTime} compact />
          </div>
        )}
        {isOngoing && (
          <div
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#dc3545" }}
          >
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Tournament is Live!
          </div>
        )}

        <div
          className="rounded-lg p-3 space-y-2"
          style={{
            background: "#F8F8F8",
            border: "1px solid #E0E0E0",
          }}
        >
          <div className="flex justify-between text-sm">
            <span style={{ color: "#666666" }}>Entry Fee</span>
            <span className="font-bold" style={{ color: "#333333" }}>
              {formatCurrency(tournament.entryFee)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "#666666" }}>Prize Pool</span>
            <span className="font-bold" style={{ color: "#00FF88" }}>
              {formatCurrency(tournament.prizePool)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span
              className="flex items-center gap-1"
              style={{ color: "#666666" }}
            >
              <Users className="h-3 w-3" /> Slots
            </span>
            <span className="font-bold" style={{ color: "#333333" }}>
              {tournament.maxTeams.toString()} teams
            </span>
          </div>
        </div>

        {/* Progress bar — teams registered (real count) */}
        {(() => {
          const isFull = registeredCount >= totalTeams;
          const pct =
            totalTeams > 0
              ? Math.min(100, (registeredCount / totalTeams) * 100)
              : 0;
          return (
            <div style={{ marginBottom: 12 }}>
              <div
                style={{ height: 4, background: "#E0E0E0", borderRadius: 2 }}
              >
                <div
                  style={{
                    height: 4,
                    width: `${pct}%`,
                    background: isFull
                      ? "#dc3545"
                      : "linear-gradient(90deg, #9d4edd, #00FF88)",
                    borderRadius: 2,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "#888888",
                  marginTop: 4,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                }}
              >
                <span style={{ color: isFull ? "#dc3545" : "#333333" }}>
                  👥 {registeredCount}/{totalTeams} teams joined
                </span>
                {isFull ? (
                  <span style={{ color: "#dc3545", fontWeight: 700 }}>
                    🚫 FULL
                  </span>
                ) : (
                  <span>{totalTeams - registeredCount} spots left</span>
                )}
              </div>
            </div>
          );
        })()}

        {isOngoing ? (
          <div className="space-y-2">
            {isPaidRegistered && (
              <div
                className="block w-full text-center py-2 rounded-lg font-bold text-sm uppercase tracking-wide"
                style={{
                  background: "transparent",
                  color: "#00FF88",
                  border: "2px solid #00FF88",
                  borderRadius: 50,
                  fontFamily: "'Orbitron', sans-serif",
                  cursor: "default",
                }}
                data-ocid="tournaments.registered.badge"
              >
                ✓ Registered
              </div>
            )}
            <button
              type="button"
              className="block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all"
              disabled={!tournament.roomId}
              onClick={() => tournament.roomId && setShowPaidRoomPopup(true)}
              style={{
                background: tournament.roomId
                  ? "linear-gradient(135deg, #9d4edd, #6b21a8)"
                  : "#F0F0F0",
                color: tournament.roomId ? "#FFFFFF" : "#CCCCCC",
                border: tournament.roomId ? "none" : "1px solid #E0E0E0",
                boxShadow: tournament.roomId
                  ? "0 0 10px rgba(157,78,221,0.3)"
                  : "none",
                cursor: tournament.roomId ? "pointer" : "not-allowed",
                borderRadius: 8,
                fontFamily: "'Orbitron', sans-serif",
              }}
              data-ocid="tournaments.id_password.button"
            >
              🔑 ID/PASSWORD
            </button>
            <button
              type="button"
              className="block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #dc3545, #a71d2a)",
                color: "#FFFFFF",
                boxShadow: "0 0 12px rgba(220,53,69,0.3)",
                border: "none",
                cursor: "pointer",
                borderRadius: 8,
              }}
              data-ocid="tournaments.view_live.button"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/@kl_tournament_007",
                  "_blank",
                )
              }
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              🔴 VIEW LIVE
            </button>
          </div>
        ) : isCompleted ? (
          <Link
            to="/tournament/$id"
            params={{ id: tournament.id.toString() }}
            className="block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all"
            style={{
              background: "#00FF88",
              color: "#000000",
              fontWeight: 700,
              borderRadius: 25,
            }}
            data-ocid="tournaments.result.button"
          >
            📊 Result
          </Link>
        ) : isPaidRegistered ? (
          <div
            className="block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide"
            style={{
              background: "transparent",
              color: "#00FF88",
              border: "2px solid #00FF88",
              borderRadius: 50,
              fontFamily: "'Orbitron', sans-serif",
              cursor: "default",
            }}
            data-ocid="tournaments.registered.badge"
          >
            ✓ Registered
          </div>
        ) : (
          <Link
            to="/tournament/$id"
            params={{ id: tournament.id.toString() }}
            className="block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all"
            style={{
              background: "linear-gradient(135deg, #9d4edd, #6b21a8)",
              color: "#FFFFFF",
              boxShadow: "0 0 12px rgba(157,78,221,0.4)",
              borderRadius: 50,
            }}
            data-ocid="tournaments.register.button"
          >
            ⚡ PAY & REGISTER
          </Link>
        )}
      </div>

      {showPaidRoomPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
          }}
          role="presentation"
          onClick={() => setShowPaidRoomPopup(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowPaidRoomPopup(false)}
        >
          <div
            className="w-full max-w-xs rounded-xl p-5 space-y-4"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E0E0E0",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <h3
              className="text-center font-bold text-lg"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "#000000" }}
            >
              🔑 Room Details
            </h3>
            <div
              className="rounded-lg p-3 space-y-2"
              style={{
                background: "#F5F5F5",
                border: "1px solid #E0E0E0",
              }}
            >
              <div className="space-y-1">
                <span
                  style={{ color: "#111827", fontSize: 12, fontWeight: 700 }}
                >
                  Room ID
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#111827",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {tournament.roomId}
                  </span>
                  <button
                    type="button"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "5px 12px",
                      borderRadius: 7,
                      border: "none",
                      background: "#00FF88",
                      color: "#000000",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      navigator.clipboard
                        .writeText(tournament.roomId ?? "")
                        .then(() => {
                          toast.success("✅ Copied!", { duration: 2000 });
                        });
                    }}
                  >
                    📋 COPY ROOM ID
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <span
                  style={{ color: "#111827", fontSize: 12, fontWeight: 700 }}
                >
                  Password
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#111827",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {tournament.roomPassword || "—"}
                  </span>
                  <button
                    type="button"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "5px 12px",
                      borderRadius: 7,
                      border: "none",
                      background: "#00FF88",
                      color: "#000000",
                      cursor: tournament.roomPassword
                        ? "pointer"
                        : "not-allowed",
                      opacity: tournament.roomPassword ? 1 : 0.5,
                      whiteSpace: "nowrap",
                    }}
                    disabled={!tournament.roomPassword}
                    onClick={() => {
                      if (!tournament.roomPassword) return;
                      navigator.clipboard
                        .writeText(tournament.roomPassword)
                        .then(() => {
                          toast.success("✅ Copied!", { duration: 2000 });
                        });
                    }}
                  >
                    📋 COPY PASSWORD
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="w-full py-1.5 rounded-lg text-sm"
              style={{
                color: "#333333",
                background: "#F5F5F5",
                border: "1px solid #E0E0E0",
              }}
              onClick={() => setShowPaidRoomPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
