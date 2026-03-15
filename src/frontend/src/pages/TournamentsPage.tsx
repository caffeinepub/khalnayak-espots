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

// ─────────────────────────────────────────────
// Static Free Tournaments (frontend-only)
// ─────────────────────────────────────────────
const FREE_TOURNAMENTS: FreeTournament[] = [
  {
    id: "free-battleground",
    name: "Battle Ground Championship",
    tournamentType: "battleground",
    gameMode: "SOLO",
    modeDetail: "Solo (har player apne liye)",
    mode: "⚔️",
    description: "500 Players • Solo Mode",
    maxPlayers: 500,
    slots: 500,
    status: "upcoming" as const,
    prizePool: "₹20",
    prizeDistribution: [
      {
        label: "🏆 Booyah Prize",
        amount: "₹10",
        condition: "1st Place Winner",
        icon: "🥇",
      },
      {
        label: "🔫 Most Kills Prize",
        amount: "₹10",
        condition: "Most kills (min 6 kills required)",
        icon: "💀",
      },
    ],
    rules: [
      "Ek player dono prizes le sakta hai (total ₹20)",
      "Most Kills prize ke liye minimum 6 kills zaroori hai",
      "Same kills hone par pehle kill wale ko priority milegi",
    ],
  },
  {
    id: "free-4v4",
    name: "4v4 Custom Match",
    tournamentType: "custom4v4",
    gameMode: "TEAM",
    modeDetail: "Team (2 teams × 4 players)",
    mode: "🎮",
    description: "40 Players • 2 Teams × 4",
    maxPlayers: 40,
    slots: 40,
    status: "upcoming" as const,
    prizePool: "₹5",
    prizeDistribution: [
      {
        label: "🏆 Winning Team",
        amount: "₹1.25 each",
        condition: "4 players × ₹1.25 = ₹5 total",
        icon: "🥇",
      },
    ],
    rules: [
      "Sirf winning team ke 4 players ko prize milega",
      "Losing team ko kuch nahi milega",
    ],
  },
  {
    id: "free-1v1",
    name: "1v1 Solo Duel",
    tournamentType: "custom1v1",
    gameMode: "SOLO",
    modeDetail: "Solo (2 players)",
    mode: "🥇",
    description: "10 Players • Solo Duel",
    maxPlayers: 10,
    slots: 10,
    status: "upcoming" as const,
    prizePool: "₹0.50",
    prizeDistribution: [
      {
        label: "🏆 Winner",
        amount: "₹0.50",
        condition: "Match winner",
        icon: "🥇",
      },
    ],
    rules: ["Sirf winner ko ₹0.50 milega", "Losing player ko kuch nahi milega"],
  },
  {
    id: "free-2v2",
    name: "2v2 Duo Battle",
    tournamentType: "custom2v2",
    gameMode: "TEAM",
    modeDetail: "Team (2 teams × 2 players)",
    mode: "🥈",
    description: "20 Players • 2 Teams × 2",
    maxPlayers: 20,
    slots: 20,
    status: "upcoming" as const,
    prizePool: "₹1.60",
    prizeDistribution: [
      {
        label: "🏆 Winning Team",
        amount: "₹0.80 each",
        condition: "2 players × ₹0.80 = ₹1.60 total",
        icon: "🥇",
      },
    ],
    rules: [
      "Sirf winning team ke 2 players ko prize milega",
      "Losing team ko kuch nahi milega",
    ],
  },
];

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
  const tokens = useTokens();

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
    tokens.earnToken();
    toast.success("🪙 +1 Token earned!");
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
        rewardLabel="+1 Token Bonus"
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
            <DialogDescription style={{ color: "rgba(255,255,255,0.55)" }}>
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
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
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
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                30-sec ad dekhne ke baad registration form khulega
              </p>
            </div>
          ) : (
            /* Registration form */
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              {/* Nickname */}
              <div className="space-y-1.5">
                <Label htmlFor="fn-nick" className="font-semibold text-white">
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
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
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
                <Label htmlFor="fn-uid" className="font-semibold text-white">
                  Free Fire UID *{" "}
                  <span
                    className="text-xs font-normal"
                    style={{ color: "rgba(255,255,255,0.4)" }}
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
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
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
                  style={{ color: "rgba(255,255,255,0.75)" }}
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
                  background:
                    state === "submitting"
                      ? "#5a2d91"
                      : "linear-gradient(135deg, #9d4edd, #7b2fbf)",
                  color: "#fff",
                  boxShadow:
                    state === "submitting"
                      ? "none"
                      : "0 0 20px rgba(157,78,221,0.5)",
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
function FreeTournamentCard({ t }: { t: FreeTournament }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [joinCount, setJoinCount] = useState(() => getFreeJoinCount(t.id));
  const [roomId, setRoomId] = useState(() => getFreeRoomId(t.id));
  const [roomPassword, setRoomPassword] = useState(() =>
    getFreeRoomPassword(t.id),
  );
  const [matchStarted, setMatchStarted] = useState(() =>
    isFreeMatchStarted(t.id),
  );
  const [showRoomPopup, setShowRoomPopup] = useState(false);
  const [isJoined, setIsJoined] = useState(
    () => localStorage.getItem(`ke_free_joined_${t.id}`) === "true",
  );

  useEffect(() => {
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

  const typeColors: Record<string, string> = {
    battleground: "#ff6b35",
    custom4v4: "#00FF88",
    custom1v1: "#ffd700",
    custom2v2: "#c084fc",
  };
  const accent = typeColors[t.tournamentType] || "#00FF88";
  const isSolo = t.gameMode === "SOLO";

  return (
    <>
      <div
        className="rounded-[12px] overflow-hidden transition-all duration-200"
        style={{
          background: "rgba(16,24,48,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${accent}33`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            `0 8px 32px ${accent}33, 0 4px 20px rgba(0,0,0,0.5)`;
          (e.currentTarget as HTMLElement).style.borderColor = `${accent}66`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 4px 20px rgba(0,0,0,0.5)";
          (e.currentTarget as HTMLElement).style.borderColor = `${accent}33`;
        }}
      >
        {/* Top gradient bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #9d4edd)` }}
        />

        <div className="p-4 space-y-3">
          {/* Badges row */}
          <div className="flex items-center justify-between gap-2">
            {/* Mode badge: SOLO / TEAM */}
            <span
              className="text-xs font-bold uppercase px-2 py-0.5 rounded-full"
              style={{
                background: isSolo
                  ? "rgba(255,215,0,0.12)"
                  : "rgba(0,255,136,0.12)",
                color: isSolo ? "#ffd700" : "#00FF88",
                border: `1px solid ${isSolo ? "rgba(255,215,0,0.35)" : "rgba(0,255,136,0.35)"}`,
              }}
            >
              {isSolo ? "👤 SOLO" : "👥 TEAM"}
            </span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(157,78,221,0.15)",
                color: "#c084fc",
                border: "1px solid rgba(157,78,221,0.3)",
              }}
            >
              {t.mode} {getTournamentTypeLabel(t.tournamentType)}
            </span>
          </div>

          {/* Name */}
          <h3
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1rem,4vw,1.15rem)" }}
          >
            {t.name}
          </h3>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            {t.description} • {t.modeDetail}
          </p>

          {/* Stats */}
          <div
            className="rounded-lg p-3 space-y-2"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex justify-between text-sm">
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Entry Fee</span>
              <span className="font-bold" style={{ color: "#00FF88" }}>
                FREE
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Prize Pool</span>
              <span className="font-bold" style={{ color: "#ffd700" }}>
                {t.prizePool}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span
                className="flex items-center gap-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                <Users className="h-3 w-3" /> Max Players
              </span>
              <span className="font-bold text-white">{t.maxPlayers}</span>
            </div>
          </div>

          {/* Join Count + Spots Left */}
          <div
            className="rounded-lg px-3 py-2 flex items-center justify-between text-sm font-bold"
            style={{
              background: isFull
                ? "rgba(255,50,50,0.1)"
                : "rgba(0,255,136,0.07)",
              border: `1px solid ${isFull ? "rgba(255,50,50,0.3)" : "rgba(0,255,136,0.2)"}`,
              fontFamily: "'Rajdhani', sans-serif",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.7)" }}>👥 Joined</span>
            {isFull ? (
              <span style={{ color: "#ff4444", fontWeight: 700 }}>
                {joinCount}/{t.maxPlayers} FULL
              </span>
            ) : (
              <span style={{ color: "#00FF88" }}>
                {joinCount}/{t.maxPlayers} &nbsp;·&nbsp; Only {spotsLeft} Spots
                Left
              </span>
            )}
          </div>

          {/* Prize Distribution */}
          <div
            className="rounded-lg p-3 space-y-1.5"
            style={{
              background: "rgba(255,215,0,0.05)",
              border: "1px solid rgba(255,215,0,0.18)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide mb-2"
              style={{ color: "#ffd700" }}
            >
              🏆 Prize Distribution
            </p>
            {t.prizeDistribution.map((prize) => (
              <div
                key={prize.label}
                className="flex items-start justify-between gap-2"
              >
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-white">
                    {prize.label}
                  </span>
                  {prize.condition && (
                    <p
                      className="text-xs leading-tight mt-0.5"
                      style={{ color: "rgba(255,255,255,0.45)" }}
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
                <span className="text-xs mt-0.5" style={{ color: accent }}>
                  ✓
                </span>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {rule}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!matchStarted}
              className="flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all"
              style={{
                background: matchStarted
                  ? "linear-gradient(135deg, #ffd700, #ff8c00)"
                  : "rgba(255,255,255,0.06)",
                color: matchStarted ? "#0A0A0A" : "rgba(255,255,255,0.25)",
                border: matchStarted
                  ? "1px solid #ffd700"
                  : "1px solid rgba(255,255,255,0.1)",
                boxShadow: matchStarted
                  ? "0 0 12px rgba(255,215,0,0.5)"
                  : "none",
                cursor: matchStarted ? "pointer" : "not-allowed",
                fontFamily: "'Orbitron', sans-serif",
              }}
              data-ocid="free_tournament.live_button"
            >
              🟡 LIVE
            </button>

            <button
              type="button"
              disabled={!roomId}
              onClick={() => roomId && setShowRoomPopup(true)}
              className="flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all"
              style={{
                background: roomId
                  ? "linear-gradient(135deg, #9d4edd, #6a0dad)"
                  : "rgba(255,255,255,0.06)",
                color: roomId ? "#ffffff" : "rgba(255,255,255,0.25)",
                border: roomId
                  ? "1px solid #9d4edd"
                  : "1px solid rgba(255,255,255,0.1)",
                boxShadow: roomId ? "0 0 12px rgba(157,78,221,0.5)" : "none",
                cursor: roomId ? "pointer" : "not-allowed",
                fontFamily: "'Orbitron', sans-serif",
              }}
              data-ocid="free_tournament.id_password_button"
            >
              🔑 ID/PASSWORD
            </button>
          </div>

          {/* Main JOIN button */}
          {isJoined ? (
            <button
              type="button"
              disabled
              className="block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide"
              style={{
                background: "rgba(0,255,136,0.1)",
                color: "#00FF88",
                border: "1px solid rgba(0,255,136,0.4)",
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
                  ? "rgba(255,255,255,0.08)"
                  : `linear-gradient(135deg, ${accent}, #00cc6a)`,
                color: isFull ? "rgba(255,255,255,0.3)" : "#0A0A0A",
                boxShadow: isFull ? "none" : `0 0 16px ${accent}66`,
                fontFamily: "'Orbitron', sans-serif",
                cursor: isFull ? "not-allowed" : "pointer",
              }}
              data-ocid="free_tournament.primary_button"
            >
              {isFull ? "🚫 TOURNAMENT FULL" : "🎬 WATCH AD & JOIN FREE"}
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
              background: "rgba(16,24,48,0.97)",
              border: "1px solid rgba(157,78,221,0.5)",
              boxShadow: "0 0 32px rgba(157,78,221,0.3)",
            }}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <h3
              className="text-center font-bold text-white text-lg"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              🔑 Room Details
            </h3>
            <div
              className="rounded-lg p-3 space-y-2"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex justify-between items-center">
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                  Room ID
                </span>
                <span className="font-mono font-bold text-white">{roomId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                  Password
                </span>
                <span className="font-mono font-bold text-white">
                  {roomPassword || "—"}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="w-full py-2 rounded-lg font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, #9d4edd, #6a0dad)",
                color: "#fff",
                fontFamily: "'Orbitron', sans-serif",
              }}
              onClick={() => {
                const text = `Room ID: ${roomId}\nPassword: ${roomPassword}`;
                navigator.clipboard.writeText(text).then(() => {
                  toast.success("📋 Copied to clipboard!");
                });
              }}
            >
              📋 COPY
            </button>
            <button
              type="button"
              className="w-full py-1.5 rounded-lg text-sm"
              style={{
                color: "rgba(255,255,255,0.4)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
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
    </>
  );
}

// ─────────────────────────────────────────────
// Main TournamentsPage
// ─────────────────────────────────────────────
export function TournamentsPage() {
  const { data: tournaments, isLoading } = useGetTournaments();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [section, setSection] = useState<"free" | "paid">("free");
  const [publishedIds, setPublishedIds] = useState<Set<string>>(() => {
    const ids = new Set<string>();
    for (const t of FREE_TOURNAMENTS) {
      if (localStorage.getItem(`ke_free_published_${t.id}`) === "true")
        ids.add(t.id);
    }
    return ids;
  });

  useEffect(() => {
    const handler = () => {
      const ids = new Set<string>();
      for (const t of FREE_TOURNAMENTS) {
        if (localStorage.getItem(`ke_free_published_${t.id}`) === "true")
          ids.add(t.id);
      }
      setPublishedIds(ids);
    };
    window.addEventListener("freeTournamentUpdated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("freeTournamentUpdated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const visibleFreeTournaments = FREE_TOURNAMENTS.filter((t) =>
    publishedIds.has(t.id),
  );

  const filteredTournaments =
    tournaments?.filter((t) => {
      const matchesType =
        typeFilter === "all" || t.tournamentType === typeFilter;
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      return matchesType && matchesStatus;
    }) || [];

  return (
    <div className="min-h-screen pb-24" style={{ background: "#0A0A0A" }}>
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
          <p
            className="pl-4 md:pl-0"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
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
                background:
                  section === tab
                    ? tab === "free"
                      ? "#00FF88"
                      : "#9d4edd"
                    : "rgba(22,33,62,0.6)",
                color: section === tab ? "#0A0A0A" : "rgba(255,255,255,0.6)",
                border:
                  section === tab
                    ? `1px solid ${tab === "free" ? "#00FF88" : "#9d4edd"}`
                    : "1px solid rgba(255,255,255,0.12)",
                boxShadow:
                  section === tab
                    ? `0 0 14px ${tab === "free" ? "rgba(0,255,136,0.4)" : "rgba(157,78,221,0.4)"}`
                    : "none",
                fontFamily: "'Orbitron', sans-serif",
              }}
              data-ocid="tournaments.section.tab"
            >
              {tab === "free" ? "🎁 Free Tournaments" : "💰 Paid Tournaments"}
            </button>
          ))}
        </div>

        {/* ── FREE SECTION ── */}
        {section === "free" && (
          <div className="space-y-4">
            <div
              className="rounded-xl p-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,255,136,0.06), rgba(157,78,221,0.06))",
                border: "1px solid rgba(0,255,136,0.2)",
              }}
            >
              <p
                className="font-display font-bold text-sm mb-1"
                style={{ color: "#00FF88" }}
              >
                🎉 FREE TOURNAMENTS — No Entry Fee!
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                Watch a 30-sec ad → Register instantly → Win real cash prizes 💰
              </p>
            </div>

            {visibleFreeTournaments.length === 0 ? (
              <div
                className="text-center py-12"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <p className="text-4xl mb-3">🎮</p>
                <p
                  className="font-bold"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  No tournaments available
                </p>
                <p className="text-sm mt-1">
                  Admin hasn't published any free tournaments yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {visibleFreeTournaments.map((t) => (
                  <FreeTournamentCard key={t.id} t={t} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PAID SECTION ── */}
        {section === "paid" && (
          <div className="space-y-6">
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
                        typeFilter === chip.value
                          ? "#00FF88"
                          : "rgba(22,33,62,0.6)",
                      color:
                        typeFilter === chip.value
                          ? "#0A0A0A"
                          : "rgba(255,255,255,0.6)",
                      border:
                        typeFilter === chip.value
                          ? "1px solid #00FF88"
                          : "1px solid rgba(0,255,136,0.2)",
                      boxShadow:
                        typeFilter === chip.value
                          ? "0 0 12px rgba(0,255,136,0.5)"
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
                        statusFilter === chip.value
                          ? "#9d4edd"
                          : "rgba(22,33,62,0.6)",
                      color:
                        statusFilter === chip.value
                          ? "#fff"
                          : "rgba(255,255,255,0.6)",
                      border:
                        statusFilter === chip.value
                          ? "1px solid rgba(157,78,221,0.8)"
                          : "1px solid rgba(157,78,221,0.2)",
                      boxShadow:
                        statusFilter === chip.value
                          ? "0 0 12px rgba(157,78,221,0.5)"
                          : "none",
                    }}
                    data-ocid="tournaments.status_filter.tab"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              <div
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
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
                    style={{ background: "rgba(22,33,62,0.4)" }}
                  />
                ))}
              </div>
            ) : filteredTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTournaments.map((tournament) => (
                  <TournamentCard
                    key={tournament.id.toString()}
                    tournament={tournament}
                  />
                ))}
              </div>
            ) : (
              <div
                className="p-12 rounded-[12px] text-center"
                style={{
                  background: "rgba(22,33,62,0.4)",
                  border: "1px solid rgba(0,255,136,0.12)",
                }}
                data-ocid="tournaments.empty_state"
              >
                <p style={{ color: "rgba(255,255,255,0.5)" }}>
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
function TournamentCard({ tournament }: { tournament: Tournament }) {
  const isUpcoming = tournament.status === "upcoming";
  const isOngoing = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";

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
      className="rounded-[12px] overflow-hidden transition-all duration-200"
      style={{
        background: "rgba(16,24,48,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isOngoing
          ? "1px solid rgba(239,68,68,0.5)"
          : "1px solid rgba(0,255,136,0.18)",
        boxShadow: isOngoing
          ? "0 4px 24px rgba(239,68,68,0.2)"
          : "0 4px 20px rgba(0,0,0,0.5)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = isOngoing
          ? "0 8px 32px rgba(239,68,68,0.3)"
          : "0 8px 32px rgba(0,255,136,0.15), 0 4px 20px rgba(0,0,0,0.5)";
        el.style.borderColor = isOngoing
          ? "rgba(239,68,68,0.8)"
          : "rgba(0,255,136,0.4)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = isOngoing
          ? "0 4px 24px rgba(239,68,68,0.2)"
          : "0 4px 20px rgba(0,0,0,0.5)";
        el.style.borderColor = isOngoing
          ? "rgba(239,68,68,0.5)"
          : "rgba(0,255,136,0.18)";
      }}
    >
      <div
        className="h-1 w-full"
        style={{
          background: isOngoing
            ? "linear-gradient(90deg, #ef4444, #ff6b6b)"
            : isCompleted
              ? "linear-gradient(90deg, #555, #777)"
              : "linear-gradient(90deg, #00FF88, #9d4edd)",
        }}
      />

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-bold uppercase px-2 py-0.5 rounded-full"
            style={{
              background: isOngoing
                ? "rgba(239,68,68,0.2)"
                : isCompleted
                  ? "rgba(100,100,100,0.2)"
                  : "rgba(0,255,136,0.12)",
              color: isOngoing ? "#ff6b6b" : isCompleted ? "#888" : "#00FF88",
              border: `1px solid ${isOngoing ? "rgba(239,68,68,0.4)" : isCompleted ? "rgba(100,100,100,0.3)" : "rgba(0,255,136,0.3)"}`,
            }}
          >
            {isOngoing ? "🔴 LIVE" : isCompleted ? "✅ DONE" : "⏰ UPCOMING"}
          </span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(157,78,221,0.15)",
              color: "#c084fc",
              border: "1px solid rgba(157,78,221,0.3)",
            }}
          >
            {modeIcon} {getTournamentTypeLabel(tournament.tournamentType)}
          </span>
        </div>

        <h3
          className="font-display font-bold text-white leading-tight"
          style={{ fontSize: "clamp(1rem, 4vw, 1.15rem)" }}
        >
          {tournament.name}
        </h3>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          {getTournamentPlayerInfo(tournament.tournamentType).description}
        </p>

        {isUpcoming && (
          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "#FFD700" }}
          >
            <Calendar className="h-3 w-3" />
            <span>Starts in: </span>
            <CountdownTimer targetTime={tournament.startTime} compact />
          </div>
        )}
        {isOngoing && (
          <div
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#ef4444" }}
          >
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Tournament is Live!
          </div>
        )}

        <div
          className="rounded-lg p-3 space-y-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex justify-between text-sm">
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Entry Fee</span>
            <span className="font-bold text-white">
              {formatCurrency(tournament.entryFee)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Prize Pool</span>
            <span className="font-bold" style={{ color: "#00FF88" }}>
              {formatCurrency(tournament.prizePool)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span
              className="flex items-center gap-1"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <Users className="h-3 w-3" /> Slots
            </span>
            <span className="font-bold text-white">
              {tournament.maxTeams.toString()} teams
            </span>
          </div>
        </div>

        <Link
          to="/tournament/$id"
          params={{ id: tournament.id.toString() }}
          className="block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all"
          style={
            isOngoing
              ? {
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#fff",
                  boxShadow: "0 0 16px rgba(239,68,68,0.4)",
                }
              : isUpcoming
                ? {
                    background: "linear-gradient(135deg, #00FF88, #00cc6a)",
                    color: "#0A0A0A",
                    boxShadow: "0 0 16px rgba(0,255,136,0.4)",
                  }
                : {
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }
          }
          data-ocid="tournaments.register.button"
        >
          {isOngoing
            ? "View Live"
            : isUpcoming
              ? "⚡ Register Now"
              : "View Details"}
        </Link>
      </div>
    </div>
  );
}
