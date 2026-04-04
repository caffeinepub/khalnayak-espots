import type { TournamentStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  autoFlagOnScoreEntry,
  banFlaggedPlayer,
  clearFlag,
  disqualifyTeam,
  useGetCheaterFlags,
  useGetDisqualifiedTeams,
} from "@/hooks/useCheaterDetection";
import {
  useApproveDeposit,
  useApproveTeamRegistration,
  useApproveWithdrawal,
  useCreateTournament,
  useDistributePrizes,
  useGetAllUsers,
  useGetDepositRequests,
  useGetPlatformStats,
  useGetTeamRegistrations,
  useGetTeams,
  useGetTournaments,
  useGetWithdrawalRequests,
  useIsCallerAdmin,
  useRejectDeposit,
  useRejectTeamRegistration,
  useRejectWithdrawal,
  useUpdateTeamScore,
  useUpdateTournamentRoomCredentials,
  useUpdateTournamentStatus,
} from "@/hooks/useQueries";
import { type ReferralRecord, getReferralStats } from "@/hooks/useReferral";
import {
  getReferralSettings,
  saveReferralSettings,
} from "@/hooks/useReferralSettings";
import { useTokens } from "@/hooks/useTokens";
import {
  type FreeRegistration,
  type PaidRegistration,
  getFreeRegistrations,
  getPaidRegistrations,
} from "@/lib/firestore";
import type {
  PlayVoucher,
  RedeemRequest,
  WithdrawalDetail,
} from "@/pages/WalletPage";
import {
  getMyVouchers,
  getRedeemRequests,
  getWithdrawalDetails,
  saveRedeemRequests,
  saveWithdrawalDetails,
} from "@/pages/WalletPage";
import {
  formatCurrency,
  formatDateTime,
  getTournamentStatusLabel,
  getTournamentTypeLabel,
} from "@/utils/format";
import { Navigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Calendar,
  Check,
  CheckCircle2,
  Coins,
  DollarSign,
  Gift,
  IndianRupee,
  KeyRound,
  Loader2,
  Play,
  Plus,
  RefreshCw,
  Server,
  Shield,
  ShieldAlert,
  Swords,
  Trophy,
  Users,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// ── StoredFreeTournament type ─────────────────────────────────────────────────

interface StoredFreeTournament {
  name: string;
  mode: string;
  maxPlayers: number;
  startTime: string;
  prizes: { label: string; prize: string; condition?: string }[];
  prizePool: string;
}

function loadStoredFreeTournaments(): {
  id: string;
  data: StoredFreeTournament;
}[] {
  const results: { id: string; data: StoredFreeTournament }[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("customFreeTournament_")) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const data = JSON.parse(raw) as StoredFreeTournament;
          results.push({ id: key, data });
        }
      }
    }
  } catch {}
  return results;
}

function DynamicFreeTournamentAdminCard({
  id,
  data,
  onDelete,
}: {
  id: string;
  data: StoredFreeTournament;
  onDelete: () => void;
}) {
  const [roomId, setRoomId] = useState(
    localStorage.getItem(`freeRoomId_${id}`) || "",
  );
  const [roomPassword, setRoomPassword] = useState(
    localStorage.getItem(`freeRoomPassword_${id}`) || "",
  );
  const [matchStarted, setMatchStarted] = useState(
    localStorage.getItem(`freeMatchStarted_${id}`) === "true",
  );
  const [saved, setSaved] = useState(false);
  const [newMatchTime, setNewMatchTime] = useState(
    localStorage.getItem(`freeMatchTime_${id}`) || data.startTime || "",
  );
  const [timeSaved, setTimeSaved] = useState(false);
  const [isPublished, setIsPublished] = useState(
    localStorage.getItem(`ke_free_published_${id}`) === "true",
  );

  const joinCount = Number.parseInt(
    localStorage.getItem(`freeJoinCount_${id}`) || "0",
    10,
  );

  const handleSave = () => {
    localStorage.setItem(`freeRoomId_${id}`, roomId);
    localStorage.setItem(`freeRoomPassword_${id}`, roomPassword);
    window.dispatchEvent(new Event("freeTournamentUpdated"));
    setSaved(true);
    toast.success(`Room details saved for ${data.name}`);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleUpdateTime = () => {
    if (!newMatchTime) {
      toast.error("Please select a date and time.");
      return;
    }
    localStorage.setItem(`freeMatchTime_${id}`, newMatchTime);
    window.dispatchEvent(new Event("freeTournamentUpdated"));
    setTimeSaved(true);
    toast.success(`Match time updated for ${data.name}`);
    setTimeout(() => setTimeSaved(false), 2000);
  };

  const toggleMatchStarted = () => {
    const newVal = !matchStarted;
    setMatchStarted(newVal);
    localStorage.setItem(`freeMatchStarted_${id}`, String(newVal));
    window.dispatchEvent(new Event("freeTournamentUpdated"));
    toast.success(
      newVal
        ? "✅ Match started! LIVE button active for users."
        : "⏹️ Match stopped.",
    );
  };

  const togglePublish = () => {
    const newVal = !isPublished;
    setIsPublished(newVal);
    localStorage.setItem(`ke_free_published_${id}`, String(newVal));
    window.dispatchEvent(new Event("freeTournamentUpdated"));
    toast.success(
      newVal
        ? "✅ Tournament published for users!"
        : "⛔ Tournament hidden from users.",
    );
  };

  const handleDelete = () => {
    if (!window.confirm(`Delete "${data.name}"?`)) return;
    localStorage.removeItem(id);
    localStorage.removeItem(`freeRoomId_${id}`);
    localStorage.removeItem(`freeRoomPassword_${id}`);
    localStorage.removeItem(`freeMatchStarted_${id}`);
    localStorage.removeItem(`ke_free_published_${id}`);
    localStorage.removeItem(`freeMatchTime_${id}`);
    localStorage.removeItem(`freeJoinCount_${id}`);
    window.dispatchEvent(new Event("freeTournamentUpdated"));
    onDelete();
  };

  const handleCopyRoomId = () => {
    if (!roomId) return;
    navigator.clipboard
      .writeText(roomId)
      .then(() => toast.success("✅ Copied!", { duration: 2000 }));
  };
  const handleCopyPassword = () => {
    if (!roomPassword) return;
    navigator.clipboard
      .writeText(roomPassword)
      .then(() => toast.success("✅ Copied!", { duration: 2000 }));
  };

  const handleSubmitResults = () => {
    toast.info("Go to Scores tab to submit results.", { duration: 3000 });
  };

  const formattedMatchTime = newMatchTime
    ? new Date(newMatchTime).toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not set";

  return (
    <div
      className="rounded-2xl p-6 space-y-5"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        borderRadius: 20,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#000000",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          🎮 {data.name}
        </h3>
        <div className="flex gap-2 flex-wrap justify-end">
          {matchStarted && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
              style={{
                background: "rgba(255,68,68,0.15)",
                color: "#FF4444",
                border: "1px solid rgba(255,68,68,0.4)",
                animation: "pulse 1.5s infinite",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#FF4444",
                  display: "inline-block",
                }}
              />
              LIVE
            </span>
          )}
          {isPublished && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "rgba(0,255,136,0.15)",
                color: "#00AA55",
                border: "1px solid rgba(0,255,136,0.4)",
              }}
            >
              ✅ PUBLISHED
            </span>
          )}
          {!matchStarted && !isPublished && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "rgba(59,130,246,0.15)",
                color: "#3B82F6",
                border: "1px solid rgba(59,130,246,0.4)",
              }}
            >
              ⏰ UPCOMING
            </span>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: "#f9fafb", border: "1px solid #E5E7EB" }}
      >
        <p style={{ fontWeight: 600, fontSize: 15, color: "#333333" }}>
          📊 TOURNAMENT STATS
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span style={{ color: "#666666", fontSize: 13 }}>👥 Format</span>
            <br />
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {data.mode}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", fontSize: 13 }}>
              🏆 Prize Pool
            </span>
            <br />
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {data.prizePool}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", fontSize: 13 }}>🎁 Entry</span>
            <br />
            <span style={{ color: "#00AA55", fontWeight: 700 }}>FREE</span>
          </div>
          <div>
            <span style={{ color: "#666666", fontSize: 13 }}>📅 Date</span>
            <br />
            <span style={{ color: "#111827", fontWeight: 600, fontSize: 12 }}>
              {formattedMatchTime}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", fontSize: 13 }}>👥 Joined</span>
            <br />
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {joinCount}/{data.maxPlayers} players
            </span>
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: "#f9fafb", border: "1px solid #E5E7EB" }}
      >
        <p style={{ fontWeight: 600, fontSize: 15, color: "#333333" }}>
          🔐 MATCH DETAILS
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span style={{ color: "#666666", fontSize: 12 }}>Room ID</span>
              <p
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#111827",
                  fontSize: 16,
                }}
              >
                {roomId || "Not set"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyRoomId}
              disabled={!roomId}
              style={{
                background: "#00FF88",
                color: "#000",
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                fontWeight: 700,
                fontSize: 12,
                cursor: roomId ? "pointer" : "not-allowed",
                opacity: roomId ? 1 : 0.5,
              }}
            >
              📋 COPY
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <span style={{ color: "#666666", fontSize: 12 }}>Password</span>
              <p
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#111827",
                  fontSize: 16,
                }}
              >
                {roomPassword || "Not set"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyPassword}
              disabled={!roomPassword}
              style={{
                background: "#00FF88",
                color: "#000",
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                fontWeight: 700,
                fontSize: 12,
                cursor: roomPassword ? "pointer" : "not-allowed",
                opacity: roomPassword ? 1 : 0.5,
              }}
            >
              📋 COPY
            </button>
          </div>
        </div>
      </div>

      {/* Set Room Details form */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: "#f9fafb", border: "1px solid #E5E7EB" }}
      >
        <p style={{ fontWeight: 600, fontSize: 15, color: "#333333" }}>
          ⚙️ ADMIN CONTROLS
        </p>
        <div className="flex gap-2">
          <div className="flex-1 space-y-1">
            <label
              htmlFor={`dyn-room-id-${id}`}
              style={{
                color: "#666666",
                fontSize: 12,
                fontWeight: 600,
                display: "block",
              }}
            >
              Room ID
            </label>
            <input
              id={`dyn-room-id-${id}`}
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="e.g., 213579050"
              style={{
                width: "100%",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 13,
                fontFamily: "monospace",
                background: "#fff",
                border: "1px solid #D1D5DB",
                color: "#111827",
              }}
              data-ocid="admin.free_tournament.room_id.input"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label
              htmlFor={`dyn-room-pw-${id}`}
              style={{
                color: "#666666",
                fontSize: 12,
                fontWeight: 600,
                display: "block",
              }}
            >
              Password
            </label>
            <input
              id={`dyn-room-pw-${id}`}
              type="text"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
              placeholder="e.g., 00"
              style={{
                width: "100%",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 13,
                fontFamily: "monospace",
                background: "#fff",
                border: "1px solid #D1D5DB",
                color: "#111827",
              }}
              data-ocid="admin.free_tournament.password.input"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleSave}
            style={{
              background: "#00FF88",
              color: "#000",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
            data-ocid="admin.free_tournament.save_room.button"
          >
            {saved ? "✅ Saved!" : "🔧 SET ROOM ID & PASSWORD"}
          </button>
          <button
            type="button"
            onClick={toggleMatchStarted}
            style={{
              background: matchStarted ? "#FF4444" : "#00FF88",
              color: matchStarted ? "#fff" : "#000",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
            data-ocid="admin.free_tournament.match_started.toggle"
          >
            {matchStarted ? "⏹️ STOP MATCH" : "▶️ START MATCH"}
          </button>
          <button
            type="button"
            onClick={handleSubmitResults}
            style={{
              background: "#AA44FF",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            📝 SUBMIT RESULTS
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Cancel match?")) {
                localStorage.removeItem(`freeMatchStarted_${id}`);
                setMatchStarted(false);
                window.dispatchEvent(new Event("freeTournamentUpdated"));
                toast.success("Match cancelled.");
              }
            }}
            style={{
              background: "#666666",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            ❌ CANCEL MATCH
          </button>
        </div>
      </div>

      {/* Match Timing */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: "#f9fafb", border: "1px solid #E5E7EB" }}
      >
        <p style={{ fontWeight: 600, fontSize: 15, color: "#333333" }}>
          🕐 MATCH TIMING
        </p>
        <p style={{ color: "#666666", fontSize: 13 }}>
          Match Time:{" "}
          <span style={{ color: "#111827", fontWeight: 600 }}>
            {formattedMatchTime}
          </span>
        </p>
        <input
          id={`dyn-match-time-${id}`}
          type="datetime-local"
          value={newMatchTime}
          onChange={(e) => setNewMatchTime(e.target.value)}
          style={{
            width: "100%",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
            background: "#fff",
            border: "1px solid #D1D5DB",
            color: "#111827",
          }}
          data-ocid="admin.free_tournament.match_time.input"
        />
        <button
          type="button"
          onClick={handleUpdateTime}
          style={{
            width: "100%",
            background: "#00FF88",
            color: "#000",
            border: "none",
            borderRadius: 10,
            padding: "10px 0",
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "'Orbitron', sans-serif",
          }}
          data-ocid="admin.free_tournament.update_time.button"
        >
          {timeSaved ? "✅ Time Updated!" : "🟢 UPDATE MATCH TIME"}
        </button>
      </div>

      {/* Status / Publish / Delete */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: "#f9fafb", border: "1px solid #E5E7EB" }}
      >
        <p style={{ fontWeight: 600, fontSize: 15, color: "#333333" }}>
          🏷️ TOURNAMENT STATUS
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={togglePublish}
            className="flex-1"
            style={{
              background: isPublished ? "#FFAA33" : "#00FF88",
              color: "#000",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
            data-ocid="admin.free_tournament.publish.toggle"
          >
            {isPublished ? "🟡 UNPUBLISH" : "🚀 PUBLISH"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={{
              background: "#FF4444",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 16px",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
            data-ocid="admin.free_tournament.delete_button"
          >
            🔴 DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

function TokenRewardSettings() {
  const [amount, setAmount] = useState(
    localStorage.getItem("ke_token_reward_amount") || "1.25",
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const val = Number.parseFloat(amount);
    if (Number.isNaN(val) || val <= 0) {
      toast.error("Invalid amount");
      return;
    }
    localStorage.setItem("ke_token_reward_amount", val.toFixed(2));
    setSaved(true);
    toast.success(`✅ Token reward set to ₹${val.toFixed(2)}`);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className="rounded-xl p-4 space-y-3"
      style={{ background: "#f5f5f5", border: "1px solid #e0e0e0" }}
    >
      <h3
        style={{
          fontFamily: "'Orbitron',sans-serif",
          color: "#000",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        🪙 Token Reward Settings
      </h3>
      <p className="text-xs text-gray-500">
        25 tokens redeem karne par user ko kitna ₹ milega? (Default: ₹1.25)
      </p>
      <div className="flex gap-3 items-end">
        <div className="space-y-1 flex-1">
          <Label
            htmlFor="token-reward-input"
            className="text-xs font-semibold text-gray-600"
          >
            Token Redeem Reward Amount (₹)
          </Label>
          <Input
            id="token-reward-input"
            type="number"
            step="0.25"
            min="0.25"
            max="10"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ background: "#fff", border: "1px solid #e0e0e0" }}
          />
        </div>
        <Button
          onClick={handleSave}
          style={{
            background: saved
              ? "#00FF88"
              : "linear-gradient(135deg,#00FF88,#9d4edd)",
            color: "#000",
            fontWeight: 700,
          }}
          data-ocid="admin.token_reward.save_button"
        >
          {saved ? "✅ Saved" : "Save"}
        </Button>
      </div>
      <p className="text-xs" style={{ color: "#00AA55" }}>
        ℹ️ Current: ₹
        {Number.parseFloat(
          localStorage.getItem("ke_token_reward_amount") || "1.25",
        ).toFixed(2)}{" "}
        per 25 tokens
      </p>
    </div>
  );
}

export function AdminPage() {
  const { data: isAdmin, isLoading } = useIsCallerAdmin();

  if (isLoading) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">Checking permissions...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="container py-8 space-y-8"
      style={{ background: "#FFFFFF", minHeight: "100vh" }}
    >
      <div className="flex items-center gap-3">
        <div
          style={{
            background: "rgba(157,78,221,0.15)",
            border: "1px solid rgba(157,78,221,0.4)",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Shield style={{ width: 28, height: 28, color: "#9d4edd" }} />
        </div>
        <div>
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(20px, 5vw, 32px)",
              background: "linear-gradient(90deg, #00FF88, #9d4edd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            🛡️ Admin Panel
          </h1>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              color: "#666666",
              fontSize: 14,
            }}
          >
            Manage tournaments, users, and platform operations
          </p>
        </div>
      </div>

      <Tabs defaultValue="matches" className="space-y-6">
        {/* Admin Nav — Neon Gaming Design */}
        <div className="admin-nav-wrapper">
          <div className="admin-nav-scroll">
            <TabsList className="admin-nav-tabs">
              <TabsTrigger
                value="matches"
                data-ocid="admin.matches.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">⚔️</span>
                <span>Manage Matches</span>
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                data-ocid="admin.overview.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">📊</span>
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="registrations"
                data-ocid="admin.registrations.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">📝</span>
                <span>Registrations</span>
              </TabsTrigger>
              <TabsTrigger
                value="tournaments"
                data-ocid="admin.tournaments.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">🎮</span>
                <span>Tournaments</span>
              </TabsTrigger>
              <TabsTrigger
                value="scores"
                data-ocid="admin.scores.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">📈</span>
                <span>Scores</span>
              </TabsTrigger>
              <TabsTrigger
                value="deposits"
                data-ocid="admin.deposits.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">💰</span>
                <span>Deposits</span>
              </TabsTrigger>
              <TabsTrigger
                value="withdrawals"
                data-ocid="admin.withdrawals.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">💸</span>
                <span>Withdrawals</span>
              </TabsTrigger>
              <TabsTrigger
                value="users"
                data-ocid="admin.users.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">👥</span>
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="redeem"
                data-ocid="admin.redeem.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">🎟️</span>
                <span>Redeem Requests</span>
              </TabsTrigger>
              <TabsTrigger
                value="adstats"
                data-ocid="admin.adstats.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">📺</span>
                <span>Ad Stats</span>
              </TabsTrigger>
              <TabsTrigger
                value="referrals"
                data-ocid="admin.referrals.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">🎁</span>
                <span>Referrals</span>
              </TabsTrigger>
              <TabsTrigger
                value="security"
                data-ocid="admin.security.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">🛡️</span>
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger
                value="freeTournaments"
                data-ocid="admin.free_tournaments.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">🎁</span>
                <span>Free Tournaments</span>
              </TabsTrigger>
              <TabsTrigger
                value="freeRegistrations"
                data-ocid="admin.free_registrations.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">📋</span>
                <span>Free Registrations</span>
              </TabsTrigger>
              <TabsTrigger
                value="paidRegistrations"
                data-ocid="admin.paid_registrations.tab"
                className="admin-nav-trigger"
              >
                <span className="admin-nav-icon">💳</span>
                <span>Paid Registrations</span>
              </TabsTrigger>
            </TabsList>
          </div>
          {/* Scroll fade indicator on the right */}
          <div className="admin-nav-fade-right" aria-hidden="true" />
        </div>

        <TabsContent value="matches">
          <ManageMatchesTab />
        </TabsContent>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="registrations">
          <RegistrationsTab />
        </TabsContent>

        <TabsContent value="tournaments">
          <TournamentsTab />
        </TabsContent>

        <TabsContent value="scores">
          <ScoresTab />
        </TabsContent>

        <TabsContent value="deposits">
          <DepositsTab />
        </TabsContent>

        <TabsContent value="withdrawals">
          <WithdrawalsTab />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>

        <TabsContent value="redeem">
          <RedeemRequestsTab />
        </TabsContent>

        <TabsContent value="adstats">
          <AdStatsTab />
        </TabsContent>

        <TabsContent value="referrals">
          <ReferralsTab />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="freeTournaments">
          <FreeTournamentsManagementSection />
        </TabsContent>
        <TabsContent value="freeRegistrations">
          <FreeRegistrationsTab />
        </TabsContent>
        <TabsContent value="paidRegistrations">
          <PaidRegistrationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Paid Registrations Tab ────────────────────────────────────────────────────

function PaidRegistrationsTab() {
  const [registrations, setRegistrations] = useState<PaidRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTournament, setFilterTournament] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    getPaidRegistrations()
      .then((data) => setRegistrations(data))
      .finally(() => setLoading(false));
  }, []);

  const tournamentNames = Array.from(
    new Set(registrations.map((r) => r.tournamentName).filter(Boolean)),
  );
  const filtered = registrations
    .filter(
      (r) =>
        filterTournament === "all" || r.tournamentName === filterTournament,
    )
    .filter((r) => filterStatus === "all" || r.paymentStatus === filterStatus);

  const statusColor = (status: string) => {
    if (status === "Success") return { bg: "#d1fae5", color: "#065f46" };
    if (status === "Failed") return { bg: "#fee2e2", color: "#991b1b" };
    return { bg: "#fef9c3", color: "#92400e" };
  };

  return (
    <div className="space-y-4">
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 20,
        }}
      >
        <h2
          style={{
            color: "#000000",
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 4,
          }}
        >
          💳 Paid Registrations
        </h2>
        <p style={{ color: "#666666", fontSize: 13, marginBottom: 16 }}>
          Paid tournament ke saare registrations
        </p>

        <div className="flex gap-4 flex-wrap mb-4">
          <div>
            <label
              htmlFor="paid-filter-tournament"
              style={{
                color: "#333333",
                fontWeight: 600,
                fontSize: 13,
                display: "block",
                marginBottom: 4,
              }}
            >
              Filter by Tournament:
            </label>
            <select
              id="paid-filter-tournament"
              value={filterTournament}
              onChange={(e) => setFilterTournament(e.target.value)}
              style={{
                background: "#F5F5F5",
                border: "1px solid #333333",
                color: "#000000",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 14,
              }}
            >
              <option value="all">All Tournaments</option>
              {tournamentNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="paid-filter-status"
              style={{
                color: "#333333",
                fontWeight: 600,
                fontSize: 13,
                display: "block",
                marginBottom: 4,
              }}
            >
              Filter by Status:
            </label>
            <select
              id="paid-filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                background: "#F5F5F5",
                border: "1px solid #333333",
                color: "#000000",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 14,
              }}
            >
              <option value="all">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p
            style={{ color: "#666666", textAlign: "center", padding: "24px 0" }}
          >
            Loading...
          </p>
        ) : filtered.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "48px 0", color: "#666666" }}
            data-ocid="admin.paid_registrations.empty_state"
          >
            <p style={{ fontSize: 32 }}>💳</p>
            <p style={{ marginTop: 8, fontWeight: 600 }}>
              No paid registrations yet
            </p>
            <p style={{ fontSize: 13, marginTop: 4 }}>
              Paid tournament registrations yahan dikhenge
            </p>
          </div>
        ) : (
          <div
            style={{ overflowX: "auto" }}
            data-ocid="admin.paid_registrations.table"
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 700,
              }}
            >
              <thead>
                <tr style={{ background: "#EEEEEE" }}>
                  {[
                    "Nickname",
                    "UID",
                    "Tournament Name",
                    "Payment Status",
                    "Registration Time",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: 13,
                        borderBottom: "1px solid #DDDDDD",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg, idx) => {
                  const sc = statusColor(reg.paymentStatus);
                  return (
                    <tr
                      key={reg.id || idx}
                      style={{ borderBottom: "1px solid #F0F0F0" }}
                      data-ocid={`admin.paid_registrations.row.${idx + 1}`}
                    >
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#111111",
                          fontWeight: 600,
                        }}
                      >
                        {reg.nickname}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#444444",
                          fontFamily: "monospace",
                          fontSize: 13,
                        }}
                      >
                        {reg.uid}
                      </td>
                      <td style={{ padding: "10px 12px", color: "#444444" }}>
                        {reg.tournamentName}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span
                          style={{
                            background: sc.bg,
                            color: sc.color,
                            borderRadius: 6,
                            padding: "3px 10px",
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {reg.paymentStatus}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#666666",
                          fontSize: 13,
                        }}
                      >
                        {new Date(reg.registeredAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#666666",
                            fontFamily: "monospace",
                          }}
                        >
                          txn: {reg.transactionId?.slice(0, 10) || "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Free Tournaments Management Section ──────────────────────────────────────

const FREE_POOL_MAP: Record<string, string> = {
  Solo: "₹20",
  "4v4": "₹5",
  "1v1": "₹0.50",
  "2v2": "₹1.60",
};

const FREE_PRIZE_MAP: Record<
  string,
  { label: string; prize: string; condition?: string }[]
> = {
  Solo: [
    {
      label: "🏆 Booyah (1st Place)",
      prize: "₹10",
      condition: "1st place winner",
    },
    { label: "🔫 Most Kills", prize: "₹10", condition: "6+ kills required" },
  ],
  "4v4": [
    {
      label: "🏆 Winning Team (4 players)",
      prize: "₹1.25 each",
      condition: "4 × ₹1.25 = ₹5 total",
    },
  ],
  "1v1": [{ label: "🏆 Winner", prize: "₹0.50", condition: "Match winner" }],
  "2v2": [
    {
      label: "🏆 Winning Team (2 players)",
      prize: "₹0.80 each",
      condition: "2 × ₹0.80 = ₹1.60 total",
    },
  ],
};

function CreateFreeTournamentForm() {
  const [name, setName] = useState("");
  const [mode, setMode] = useState("Solo");
  const [maxPlayers, setMaxPlayers] = useState(500);
  const [startTime, setStartTime] = useState("");

  const prizes = FREE_PRIZE_MAP[mode] ?? [];

  const handleCreate = () => {
    if (!name.trim() || !startTime) {
      toast.error("Please fill in all fields");
      return;
    }
    const key = `customFreeTournament_${Date.now()}`;
    localStorage.setItem(
      key,
      JSON.stringify({
        name,
        mode,
        maxPlayers,
        startTime,
        prizes,
        prizePool: FREE_POOL_MAP[mode] ?? "₹0",
      }),
    );
    toast.success(`✅ Free tournament "${name}" created!`);
    setName("");
    setStartTime("");
  };

  return (
    <div
      className="rounded-xl p-4 space-y-4"
      style={{
        background: "#f5f5f5",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <h3
        className="text-base font-bold"
        style={{ fontFamily: "'Orbitron', sans-serif", color: "#000000" }}
      >
        ➕ Create Free Tournament
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label
            htmlFor="ft-name"
            className="text-xs font-semibold text-gray-600"
          >
            Tournament Name *
          </label>
          <Input
            id="ft-name"
            placeholder="e.g. Saturday Night Solo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ background: "#ffffff", border: "1px solid #e0e0e0" }}
          />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="ft-mode"
            className="text-xs font-semibold text-gray-600"
          >
            Mode *
          </Label>
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger
              style={{ background: "#ffffff", border: "1px solid #e0e0e0" }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Solo">Solo (Battle Ground)</SelectItem>
              <SelectItem value="4v4">4v4 Custom</SelectItem>
              <SelectItem value="1v1">1v1 Solo Duel</SelectItem>
              <SelectItem value="2v2">2v2 Duo Battle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label
            htmlFor="ft-max"
            className="text-xs font-semibold text-gray-600"
          >
            Max Players *
          </label>
          <Input
            id="ft-max"
            type="number"
            min={1}
            max={500}
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(Number(e.target.value))}
            style={{ background: "#ffffff", border: "1px solid #e0e0e0" }}
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="ft-time"
            className="text-xs font-semibold text-gray-600"
          >
            Start Time *
          </label>
          <Input
            id="ft-time"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ background: "#ffffff", border: "1px solid #e0e0e0" }}
          />
        </div>
      </div>

      {/* Prize auto-display */}
      <div
        className="rounded-lg p-3 space-y-1"
        style={{
          background: "rgba(0,255,136,0.06)",
          border: "1px solid rgba(0,255,136,0.25)",
        }}
      >
        <p className="text-xs font-bold text-gray-600">
          🏆 Prize Distribution (auto)
        </p>
        {prizes.map((p) => (
          <div
            key={p.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              padding: "4px 0",
            }}
          >
            <span style={{ color: "#333" }}>
              {p.label}
              {p.condition ? ` (${p.condition})` : ""}
            </span>
            <span style={{ color: "#00FF88", fontWeight: 700 }}>{p.prize}</span>
          </div>
        ))}
        <div
          style={{
            marginTop: 8,
            paddingTop: 8,
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
          }}
        >
          <span>Total Prize Pool:</span>
          <span style={{ color: "#00FF88" }}>
            {FREE_POOL_MAP[mode] ?? "₹0"}
          </span>
        </div>
      </div>

      <Button
        className="w-full neon-btn"
        onClick={handleCreate}
        data-ocid="admin.free_tournament.submit_button"
      >
        ✅ CREATE FREE TOURNAMENT
      </Button>
    </div>
  );
}

function DynamicFreeTournamentList() {
  const [tournaments, setTournaments] = useState<
    { id: string; data: StoredFreeTournament }[]
  >([]);

  const refresh = useCallback(
    () => setTournaments(loadStoredFreeTournaments()),
    [],
  );

  useEffect(() => {
    refresh();
    window.addEventListener("freeTournamentUpdated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("freeTournamentUpdated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  if (tournaments.length === 0) {
    return (
      <div
        className="py-8 text-center text-gray-400 text-sm"
        data-ocid="admin.free_tournaments.empty_state"
      >
        <p className="text-2xl mb-2">🎮</p>
        <p>
          No free tournaments created yet. Use the form above to create one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {tournaments.map((t) => (
        <DynamicFreeTournamentAdminCard
          key={t.id}
          id={t.id}
          data={t.data}
          onDelete={refresh}
        />
      ))}
    </div>
  );
}

// biome-ignore lint/correctness/noUnusedVariables: kept for compatibility
function FreeTournamentsInMatchesSection() {
  const [tournaments, setTournaments] = useState<
    { id: string; data: StoredFreeTournament }[]
  >([]);

  const refresh = useCallback(
    () => setTournaments(loadStoredFreeTournaments()),
    [],
  );

  useEffect(() => {
    refresh();
    window.addEventListener("freeTournamentUpdated", refresh);
    return () => window.removeEventListener("freeTournamentUpdated", refresh);
  }, [refresh]);

  if (tournaments.length === 0) return null;

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">🎁</span>
        <h3 className="font-bold text-lg font-display">Free Tournaments</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {tournaments.map((t) => (
          <DynamicFreeTournamentAdminCard
            key={t.id}
            id={t.id}
            data={t.data}
            onDelete={refresh}
          />
        ))}
      </div>
    </div>
  );
}

function FreeTournamentsInMatchesSectionAccordion() {
  const [tournaments, setTournaments] = useState<
    { id: string; data: StoredFreeTournament }[]
  >([]);

  const refresh = useCallback(
    () => setTournaments(loadStoredFreeTournaments()),
    [],
  );

  useEffect(() => {
    refresh();
    window.addEventListener("freeTournamentUpdated", refresh);
    return () => window.removeEventListener("freeTournamentUpdated", refresh);
  }, [refresh]);

  if (tournaments.length === 0) return null;

  return (
    <div className="space-y-2 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🎁</span>
        <h3 className="font-bold text-lg font-display">Free Tournaments</h3>
        <span style={{ color: "#888", fontSize: 13 }}>
          ({tournaments.length})
        </span>
      </div>
      {tournaments.map((t, idx) => (
        <AccordionFreeTournamentCard
          key={t.id}
          id={t.id}
          data={t.data}
          onDelete={refresh}
          index={idx + 1}
        />
      ))}
    </div>
  );
}

function FreeTournamentsManagementSection() {
  return (
    <div className="space-y-4">
      <TokenRewardSettings />

      <Tabs defaultValue="free">
        <TabsList
          className="flex gap-2 mb-4"
          style={{
            background: "transparent",
            borderBottom: "1px solid #e0e0e0",
            borderRadius: 0,
            padding: "0 0 8px 0",
            height: "auto",
          }}
        >
          <TabsTrigger
            value="free"
            data-ocid="admin.free_subtab.tab"
            style={{
              borderRadius: 8,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
            }}
          >
            🎁 Free Tournaments
          </TabsTrigger>
          <TabsTrigger
            value="paid"
            data-ocid="admin.paid_subtab.tab"
            style={{
              borderRadius: 8,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
            }}
          >
            💰 Paid Tournaments
          </TabsTrigger>
          <TabsTrigger
            value="all"
            data-ocid="admin.all_subtab.tab"
            style={{
              borderRadius: 8,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
            }}
          >
            📋 All Tournaments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="free" className="space-y-4">
          <CreateFreeTournamentForm />
          <h3
            className="text-sm font-bold mt-4"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "#000000" }}
          >
            🎁 Active Free Tournaments
          </h3>
          <p className="text-xs text-gray-500">
            Set Room ID & Password for each free tournament. Toggle match
            started to activate LIVE button for users.
          </p>
          <DynamicFreeTournamentList />
        </TabsContent>

        <TabsContent value="paid">
          <TournamentsTab />
        </TabsContent>

        <TabsContent value="all">
          <TournamentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Manage Matches Tab ────────────────────────────────────────────────────────

type MatchFilter = "all" | "upcoming" | "ongoing" | "completed";

function SetRoomDetailsDialog({
  tournament,
  onClose,
}: {
  tournament: any;
  onClose: () => void;
}) {
  const updateCredentialsMutation = useUpdateTournamentRoomCredentials();

  const defaultStartTime = (() => {
    try {
      const ms = Number(tournament.startTime) / 1_000_000;
      return new Date(ms).toISOString().slice(0, 16);
    } catch {
      return "";
    }
  })();

  const [roomId, setRoomId] = useState(tournament.roomId ?? "");
  const [roomPassword, setRoomPassword] = useState(
    tournament.roomPassword ?? "",
  );
  const [slotDetails, setSlotDetails] = useState(
    localStorage.getItem(`roomSlot_${tournament.id.toString()}`) ?? "",
  );
  const [matchStartTime, setMatchStartTime] = useState(defaultStartTime);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCredentialsMutation.mutateAsync({
        tournamentId: tournament.id,
        roomId,
        roomPassword,
      });
      // Save slot details to localStorage
      if (slotDetails.trim()) {
        localStorage.setItem(
          `roomSlot_${tournament.id.toString()}`,
          slotDetails.trim(),
        );
      }
      toast.success("Room details set! Users can now see room credentials.");
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to set room details");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          Set Room Details
        </DialogTitle>
        <DialogDescription className="truncate">
          {tournament.name}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="roomIdInput">Room ID</Label>
          <Input
            id="roomIdInput"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="e.g., 213579050"
            required
            data-ocid="admin.set_room.room_id.input"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="roomPassInput">Room Password</Label>
          <Input
            id="roomPassInput"
            value={roomPassword}
            onChange={(e) => setRoomPassword(e.target.value)}
            placeholder="e.g., 00"
            required
            data-ocid="admin.set_room.password.input"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slotInput">
            Slot Details{" "}
            <span className="text-muted-foreground text-xs">(optional)</span>
          </Label>
          <Input
            id="slotInput"
            value={slotDetails}
            onChange={(e) => setSlotDetails(e.target.value)}
            placeholder="e.g., A1 to A4"
            data-ocid="admin.set_room.slot.input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="matchStartInput">Match Start Time</Label>
          <Input
            id="matchStartInput"
            type="datetime-local"
            value={matchStartTime}
            onChange={(e) => setMatchStartTime(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Room credentials will be visible to users at this time.
          </p>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={updateCredentialsMutation.isPending}
          data-ocid="admin.set_room.submit_button"
        >
          {updateCredentialsMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting...
            </>
          ) : (
            <>
              <KeyRound className="mr-2 h-4 w-4" />
              Set Room Details
            </>
          )}
        </Button>
      </form>
    </DialogContent>
  );
}

function RescheduleDialog({
  tournament,
  onClose,
}: {
  tournament: any;
  onClose: () => void;
}) {
  const defaultStartTime = (() => {
    try {
      const ms = Number(tournament.startTime) / 1_000_000;
      return new Date(ms).toISOString().slice(0, 16);
    } catch {
      return "";
    }
  })();
  const [newTime, setNewTime] = useState(defaultStartTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only reschedule: save to localStorage
    localStorage.setItem(`rescheduled_${tournament.id.toString()}`, newTime);
    toast.success(
      `Rescheduled to ${new Date(newTime).toLocaleString("en-IN")}`,
    );
    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-secondary" />
          Reschedule Match
        </DialogTitle>
        <DialogDescription>{tournament.name}</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>New Start Time</Label>
          <Input
            type="datetime-local"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reschedule
        </Button>
      </form>
    </DialogContent>
  );
}

function DynamicPaidTournamentAdminCard({
  tournament,
  index,
}: {
  tournament: any;
  index: number;
}) {
  const updateStatusMutation = useUpdateTournamentStatus();
  const updateRoomMutation = useUpdateTournamentRoomCredentials();
  const [roomIdInput, setRoomIdInput] = useState(tournament.roomId || "");
  const [roomPasswordInput, setRoomPasswordInput] = useState(
    tournament.roomPassword || "",
  );
  const [saved, setSaved] = useState(false);
  const [newMatchTime, setNewMatchTime] = useState("");
  const [timeSaved, setTimeSaved] = useState(false);
  const [setRoomOpen, setSetRoomOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const isLive = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";

  const startMs = Number(tournament.startTime) / 1_000_000;
  const formattedMatchTime = new Date(startMs).toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const entryFee = Number(tournament.entryFee) / 100_000_000;
  const maxTeams = Number(tournament.maxTeams);
  const prizePool = Number(tournament.prizePool) / 100_000_000;

  const handleSaveRoom = async () => {
    try {
      await updateRoomMutation.mutateAsync({
        tournamentId: tournament.id,
        roomId: roomIdInput,
        roomPassword: roomPasswordInput,
      });
      setSaved(true);
      toast.success(`Room details saved for ${tournament.name}`);
      setTimeout(() => setSaved(false), 2000);
    } catch (error: any) {
      toast.error(error?.message || "Failed to save room details");
    }
  };

  const handleStartStop = async () => {
    try {
      const newStatus = isLive ? "upcoming" : "ongoing";
      await updateStatusMutation.mutateAsync({
        tournamentId: tournament.id,
        status: newStatus as any,
      });
      toast.success(
        isLive ? "⏹️ Match stopped." : "✅ Match started! LIVE for users.",
      );
    } catch (error: any) {
      toast.error(error?.message || "Failed to update status");
    }
  };

  const handleCancel = async () => {
    try {
      await updateStatusMutation.mutateAsync({
        tournamentId: tournament.id,
        status: "upcoming" as any,
      });
      toast.success("Match cancelled — status reset to Upcoming.");
      setCancelConfirmOpen(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to cancel match");
    }
  };

  const handleCopyRoomId = () => {
    const val = tournament.roomId || roomIdInput;
    if (!val) return;
    navigator.clipboard
      .writeText(val)
      .then(() => toast.success("✅ Copied!", { duration: 2000 }));
  };

  const handleCopyPassword = () => {
    const val = tournament.roomPassword || roomPasswordInput;
    if (!val) return;
    navigator.clipboard
      .writeText(val)
      .then(() => toast.success("✅ Copied!", { duration: 2000 }));
  };

  const displayRoomId = tournament.roomId || roomIdInput || "";
  const displayPassword = tournament.roomPassword || roomPasswordInput || "";

  return (
    <div
      data-ocid={`admin.paid_match.card.${index}`}
      className="rounded-2xl p-6 space-y-5"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        borderRadius: 20,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#000000",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          🎮 {tournament.name}
        </h3>
        <div className="flex gap-2 flex-wrap justify-end">
          {isLive && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
              style={{
                background: "rgba(255,68,68,0.15)",
                color: "#FF4444",
                border: "1px solid rgba(255,68,68,0.4)",
                animation: "pulse 1.5s infinite",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#FF4444",
                  display: "inline-block",
                }}
              />
              LIVE
            </span>
          )}
          {isCompleted && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "rgba(107,114,128,0.15)",
                color: "#6B7280",
                border: "1px solid rgba(107,114,128,0.4)",
              }}
            >
              ✅ COMPLETED
            </span>
          )}
          {!isLive && !isCompleted && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "rgba(170,68,255,0.15)",
                color: "#AA44FF",
                border: "1px solid rgba(170,68,255,0.4)",
              }}
            >
              ⏰ UPCOMING
            </span>
          )}
          <span
            className="px-2 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(170,68,255,0.12)",
              color: "#AA44FF",
              border: "1px solid rgba(170,68,255,0.3)",
            }}
          >
            💰 PAID
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: "#f9fafb", border: "1px solid #E5E7EB" }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "#333333",
            borderLeft: "3px solid #AA44FF",
            paddingLeft: 8,
          }}
        >
          📊 TOURNAMENT STATS
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span style={{ color: "#666666", fontSize: 13 }}>👥 Format</span>
            <br />
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {getTournamentTypeLabel(tournament.tournamentType)}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", fontSize: 13 }}>
              🏆 Prize Pool
            </span>
            <br />
            <span style={{ color: "#AA44FF", fontWeight: 700 }}>
              ₹{prizePool.toFixed(2)}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", fontSize: 13 }}>💰 Entry Fee</span>
            <br />
            <span style={{ color: "#AA44FF", fontWeight: 700 }}>
              ₹{entryFee.toFixed(2)}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", fontSize: 13 }}>📅 Date</span>
            <br />
            <span style={{ color: "#111827", fontWeight: 600, fontSize: 12 }}>
              {formattedMatchTime}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", fontSize: 13 }}>👥 Teams</span>
            <br />
            <span style={{ color: "#111827", fontWeight: 600 }}>
              0/{maxTeams}
            </span>
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: "#f9fafb", border: "1px solid #E5E7EB" }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "#333333",
            borderLeft: "3px solid #AA44FF",
            paddingLeft: 8,
          }}
        >
          🔐 MATCH DETAILS
        </p>
        <div className="space-y-2">
          <div
            style={{
              background: "#faf5ff",
              border: "1px solid #e9d5ff",
              borderRadius: 10,
              padding: 12,
              borderLeft: "3px solid #AA44FF",
            }}
          >
            <span style={{ color: "#666666", fontSize: 12 }}>Room ID</span>
            <div className="flex items-center justify-between gap-2 mt-1">
              <p
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#111827",
                }}
              >
                {displayRoomId || (
                  <span
                    style={{ color: "#aaa", fontStyle: "italic", fontSize: 14 }}
                  >
                    Not set yet
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={handleCopyRoomId}
                disabled={!displayRoomId}
                style={{
                  padding: "5px 12px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: displayRoomId ? "pointer" : "not-allowed",
                  border: "1.5px solid #AA44FF",
                  background: "#AA44FF22",
                  color: "#AA44FF",
                }}
              >
                📋 COPY
              </button>
            </div>
          </div>
          <div
            style={{
              background: "#faf5ff",
              border: "1px solid #e9d5ff",
              borderRadius: 10,
              padding: 12,
              borderLeft: "3px solid #AA44FF",
            }}
          >
            <span style={{ color: "#666666", fontSize: 12 }}>Password</span>
            <div className="flex items-center justify-between gap-2 mt-1">
              <p
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#111827",
                }}
              >
                {displayPassword || (
                  <span
                    style={{ color: "#aaa", fontStyle: "italic", fontSize: 14 }}
                  >
                    Not set yet
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={handleCopyPassword}
                disabled={!displayPassword}
                style={{
                  padding: "5px 12px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: displayPassword ? "pointer" : "not-allowed",
                  border: "1.5px solid #AA44FF",
                  background: "#AA44FF22",
                  color: "#AA44FF",
                }}
              >
                📋 COPY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: "#f9fafb", border: "1px solid #E5E7EB" }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "#333333",
            borderLeft: "3px solid #AA44FF",
            paddingLeft: 8,
          }}
        >
          ⚙️ ADMIN CONTROLS
        </p>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={roomIdInput}
            onChange={(e) => setRoomIdInput(e.target.value)}
            placeholder="Room ID"
            style={{
              flex: 1,
              minWidth: 120,
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 13,
              fontFamily: "monospace",
              background: "#fff",
              border: "1px solid #D1D5DB",
              color: "#111827",
            }}
            data-ocid={`admin.paid_tournament.room_id.input.${index}`}
          />
          <input
            type="text"
            value={roomPasswordInput}
            onChange={(e) => setRoomPasswordInput(e.target.value)}
            placeholder="Password"
            style={{
              flex: 1,
              minWidth: 120,
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 13,
              fontFamily: "monospace",
              background: "#fff",
              border: "1px solid #D1D5DB",
              color: "#111827",
            }}
            data-ocid={`admin.paid_tournament.password.input.${index}`}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleSaveRoom}
            disabled={updateRoomMutation.isPending}
            style={{
              background: "#AA44FF",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
            data-ocid={`admin.paid_tournament.save_room.button.${index}`}
          >
            {saved ? "✅ Saved!" : "🔧 SET ROOM ID & PASSWORD"}
          </button>
          <button
            type="button"
            onClick={handleStartStop}
            disabled={updateStatusMutation.isPending}
            style={{
              background: isLive ? "#FF4444" : "#AA44FF",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
            data-ocid={`admin.paid_tournament.match_started.toggle.${index}`}
          >
            {isLive ? "⏹️ STOP MATCH" : "▶️ START MATCH"}
          </button>
          <button
            type="button"
            onClick={() =>
              toast.info("Go to Scores tab to submit results.", {
                duration: 3000,
              })
            }
            style={{
              background: "#AA44FF",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            📝 SUBMIT RESULTS
          </button>
          <button
            type="button"
            onClick={() => setCancelConfirmOpen(true)}
            style={{
              background: "#666666",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            ❌ CANCEL MATCH
          </button>
        </div>
      </div>

      {/* Match Timing */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: "#f9fafb", border: "1px solid #E5E7EB" }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "#333333",
            borderLeft: "3px solid #AA44FF",
            paddingLeft: 8,
          }}
        >
          🕐 MATCH TIMING
        </p>
        <p style={{ color: "#666666", fontSize: 13 }}>
          Match Time:{" "}
          <span style={{ color: "#111827", fontWeight: 600 }}>
            {formattedMatchTime}
          </span>
        </p>
        <div className="flex gap-2 items-center">
          <input
            type="datetime-local"
            value={newMatchTime}
            onChange={(e) => setNewMatchTime(e.target.value)}
            style={{
              flex: 1,
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 13,
              background: "#fff",
              border: "1px solid #D1D5DB",
              color: "#111827",
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (!newMatchTime) {
                toast.error("Please select a date and time.");
                return;
              }
              setTimeSaved(true);
              toast.success(
                "Match time noted. Use Reschedule in dialog for backend update.",
              );
              setTimeout(() => setTimeSaved(false), 2000);
            }}
            style={{
              background: "#AA44FF",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 16px",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {timeSaved ? "✅ Noted" : "🟢 UPDATE TIME"}
          </button>
        </div>
      </div>

      {/* Tournament Status */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: "#f9fafb", border: "1px solid #E5E7EB" }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "#333333",
            borderLeft: "3px solid #AA44FF",
            paddingLeft: 8,
          }}
        >
          🏷️ TOURNAMENT STATUS
        </p>
        <div className="flex gap-2 flex-wrap">
          <Dialog open={setRoomOpen} onOpenChange={setSetRoomOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                style={{
                  background: "#FFAA33",
                  color: "#000",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "'Orbitron', sans-serif",
                }}
                data-ocid={`admin.paid_match.set_room.button.${index}`}
              >
                🔧 SET ROOM DETAILS (DIALOG)
              </button>
            </DialogTrigger>
            <SetRoomDetailsDialog
              tournament={tournament}
              onClose={() => setSetRoomOpen(false)}
            />
          </Dialog>
          <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                style={{
                  background: "#3B82F6",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                📅 RESCHEDULE
              </button>
            </DialogTrigger>
            <RescheduleDialog
              tournament={tournament}
              onClose={() => setRescheduleOpen(false)}
            />
          </Dialog>
        </div>
      </div>

      {/* Cancel Confirm Dialog */}
      <Dialog open={cancelConfirmOpen} onOpenChange={setCancelConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">
              Cancel Match?
            </DialogTitle>
            <DialogDescription>
              This will reset the match status to "Upcoming".{" "}
              <strong>{tournament.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleCancel}
              disabled={updateStatusMutation.isPending}
              data-ocid="admin.paid_matches.cancel.confirm_button"
            >
              {updateStatusMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Yes, Cancel Match"
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setCancelConfirmOpen(false)}
              data-ocid="admin.paid_matches.cancel.cancel_button"
            >
              Keep Match
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AccordionTournamentCard({
  tournament,
  index,
}: { tournament: any; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLive = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";

  const startMs = Number(tournament.startTime) / 1_000_000;
  const dateStr = new Date(startMs).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
  });

  const statusColor = isLive ? "#dc3545" : isCompleted ? "#6c757d" : "#3B82F6";
  const statusLabel = isLive
    ? "🔴 LIVE"
    : isCompleted
      ? "✅ DONE"
      : "⏰ UPCOMING";

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: `1px solid ${isLive ? "rgba(220,53,69,0.35)" : "#E5E7EB"}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: isLive
          ? "0 2px 12px rgba(220,53,69,0.12)"
          : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Collapsed Header — always visible */}
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          background: isExpanded ? "#f9fafb" : "#FFFFFF",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 10,
          transition: "background 0.15s ease",
        }}
        data-ocid={`admin.accordion.${index}.toggle`}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {/* Expand/collapse chevron */}
          <span style={{ color: "#666", fontSize: 14, flexShrink: 0 }}>
            {isExpanded ? "▼" : "▶"}
          </span>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: "#111827",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "160px",
            }}
          >
            {tournament.name}
          </span>
          <span
            style={{
              background: "rgba(170,68,255,0.12)",
              color: "#AA44FF",
              border: "1px solid rgba(170,68,255,0.3)",
              borderRadius: 20,
              padding: "2px 8px",
              fontSize: 10,
              fontWeight: 700,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {getTournamentTypeLabel(tournament.tournamentType)}
          </span>
          <span
            style={{
              background: `rgba(${isLive ? "220,53,69" : isCompleted ? "107,114,128" : "59,130,246"},0.12)`,
              color: statusColor,
              border: `1px solid rgba(${isLive ? "220,53,69" : isCompleted ? "107,114,128" : "59,130,246"},0.35)`,
              borderRadius: 20,
              padding: "2px 8px",
              fontSize: 10,
              fontWeight: 700,
              whiteSpace: "nowrap",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            {isLive && (
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#dc3545",
                  display: "inline-block",
                  animation: "pulse 1s infinite",
                }}
              />
            )}
            {statusLabel}
          </span>
          <span
            style={{
              color: "#888",
              fontSize: 11,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            📅 {dateStr}
          </span>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            padding: "0 16px 16px 16px",
          }}
        >
          <div style={{ paddingTop: 16 }}>
            <DynamicPaidTournamentAdminCard
              tournament={tournament}
              index={index}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function AccordionFreeTournamentCard({
  id,
  data,
  onDelete,
  index: _index,
}: {
  id: string;
  data: StoredFreeTournament;
  onDelete: () => void;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isStarted = localStorage.getItem(`freeMatchStarted_${id}`) === "true";
  const isDone = localStorage.getItem(`freeMatchDone_${id}`) === "true";

  const startTimeRaw = localStorage.getItem(`freeMatchTime_${id}`) || "";
  const dateStr = startTimeRaw
    ? new Date(startTimeRaw).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
      })
    : "TBD";

  const statusLabel = isDone
    ? "✅ DONE"
    : isStarted
      ? "🔴 LIVE"
      : "⏰ UPCOMING";
  const statusColor = isDone ? "#6c757d" : isStarted ? "#dc3545" : "#3B82F6";

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: `1px solid ${isStarted && !isDone ? "rgba(220,53,69,0.35)" : "#E5E7EB"}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          background: isExpanded ? "#f9fafb" : "#FFFFFF",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 10,
          transition: "background 0.15s ease",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: "#666", fontSize: 14, flexShrink: 0 }}>
            {isExpanded ? "▼" : "▶"}
          </span>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: "#111827",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "160px",
            }}
          >
            {data.name}
          </span>
          <span
            style={{
              background: "rgba(0,255,136,0.12)",
              color: "#00AA55",
              border: "1px solid rgba(0,255,136,0.35)",
              borderRadius: 20,
              padding: "2px 8px",
              fontSize: 10,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            🎁 {data.mode}
          </span>
          <span
            style={{
              background: `rgba(${isDone ? "107,114,128" : isStarted ? "220,53,69" : "59,130,246"},0.12)`,
              color: statusColor,
              border: `1px solid rgba(${isDone ? "107,114,128" : isStarted ? "220,53,69" : "59,130,246"},0.35)`,
              borderRadius: 20,
              padding: "2px 8px",
              fontSize: 10,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {statusLabel}
          </span>
          <span style={{ color: "#888", fontSize: 11, flexShrink: 0 }}>
            📅 {dateStr}
          </span>
        </div>
      </button>
      {isExpanded && (
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            padding: "0 16px 16px 16px",
          }}
        >
          <div style={{ paddingTop: 16 }}>
            <DynamicFreeTournamentAdminCard
              id={id}
              data={data}
              onDelete={onDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ManageMatchesTab() {
  const { data: tournaments } = useGetTournaments();
  const [filter, setFilter] = useState<MatchFilter>("all");

  const filtered = (tournaments ?? []).filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  // Sort: ongoing first, then upcoming by start time, then completed
  const sorted = [...filtered].sort((a, b) => {
    const order = { ongoing: 0, upcoming: 1, completed: 2 };
    const ao = order[a.status as keyof typeof order] ?? 3;
    const bo = order[b.status as keyof typeof order] ?? 3;
    if (ao !== bo) return ao - bo;
    return Number(a.startTime) / 1_000_000 - Number(b.startTime) / 1_000_000;
  });

  const counts = {
    all: tournaments?.length ?? 0,
    upcoming: tournaments?.filter((t) => t.status === "upcoming").length ?? 0,
    ongoing: tournaments?.filter((t) => t.status === "ongoing").length ?? 0,
    completed: tournaments?.filter((t) => t.status === "completed").length ?? 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{
            background: "oklch(0.12 0.06 195 / 0.4)",
            border: "1px solid oklch(0.75 0.18 195 / 0.4)",
          }}
        >
          <Swords className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Manage Matches</h2>
          <p className="text-sm text-muted-foreground">
            Click any tournament to expand and manage details
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "upcoming", "ongoing", "completed"] as MatchFilter[]).map(
          (f) => (
            <button
              type="button"
              key={f}
              onClick={() => setFilter(f)}
              data-ocid={`admin.matches.${f}.tab`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                filter === f
                  ? "bg-primary/20 text-primary border-primary/40"
                  : "bg-transparent text-muted-foreground border-border/40 hover:border-border hover:text-foreground"
              }`}
            >
              {f === "all"
                ? "All"
                : f === "ongoing"
                  ? "🔴 Live"
                  : f.charAt(0).toUpperCase() + f.slice(1)}{" "}
              <span className="opacity-60 ml-1">({counts[f]})</span>
            </button>
          ),
        )}
      </div>

      {/* Tournament list — accordion */}
      {sorted.length > 0 ? (
        <div className="space-y-2">
          {sorted.map((tournament, idx) => (
            <AccordionTournamentCard
              key={tournament.id.toString()}
              tournament={tournament}
              index={idx + 1}
            />
          ))}
        </div>
      ) : (
        <div
          className="py-14 text-center space-y-3"
          data-ocid="admin.matches.empty_state"
        >
          <Swords className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground">
            {filter === "all"
              ? "No tournaments created yet."
              : `No ${filter} matches.`}
          </p>
        </div>
      )}

      {/* Free Tournaments in Manage Matches — also accordion */}
      <FreeTournamentsInMatchesSectionAccordion />
    </div>
  );
}

function OverviewTab() {
  const { data: stats } = useGetPlatformStats();
  const { data: registrations } = useGetTeamRegistrations();
  const { data: deposits } = useGetDepositRequests();
  const { data: withdrawals } = useGetWithdrawalRequests();

  const pendingRegistrations =
    registrations?.filter((r) => r.status === "pending").length || 0;
  const pendingDeposits =
    deposits?.filter((d) => d.status === "pending").length || 0;
  const pendingWithdrawals =
    withdrawals?.filter((w) => w.status === "pending").length || 0;

  const { data: tournaments } = useGetTournaments();
  const unplayedMatches =
    tournaments?.filter((t) => t.status !== "completed").length || 0;

  const statCards = [
    {
      icon: "🎮",
      label: "Total Tournaments",
      value: stats?.totalTournaments.toString() || "0",
      color: "#9d4edd",
    },
    {
      icon: "👥",
      label: "Active Users",
      value: stats?.totalPlayers.toString() || "0",
      color: "#00AA55",
    },
    {
      icon: "💰",
      label: "Total Prize Pool",
      value: stats ? formatCurrency(stats.totalPrizeDistributed) : "₹0",
      color: "#FFD700",
    },
    {
      icon: "🔴",
      label: "Live Matches",
      value: (
        pendingRegistrations +
        pendingDeposits +
        pendingWithdrawals
      ).toString(),
      color: "#FF4444",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="gaming-card"
            style={{ padding: "16px", textAlign: "center" }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(18px, 4vw, 28px)",
                color: card.color,
                textShadow: `0 0 12px ${card.color}88`,
                lineHeight: 1.1,
              }}
            >
              {card.value}
            </div>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 11,
                color: "#666666",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginTop: 4,
              }}
            >
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Pending breakdown */}
      <div className="gaming-card" style={{ padding: 16 }}>
        <h3
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#00FF88",
            fontSize: 14,
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          ⚡ Pending Actions Breakdown
        </h3>
        <div className="space-y-2">
          {[
            { label: "Pending Registrations", count: pendingRegistrations },
            { label: "Pending Deposits", count: pendingDeposits },
            { label: "Pending Withdrawals", count: pendingWithdrawals },
            { label: "Unplayed Matches", count: unplayedMatches },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center"
              style={{
                padding: "8px 0",
                borderBottom: "1px solid rgba(0,255,136,0.1)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: "#444444",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  color: item.count > 0 ? "#FF4444" : "#00FF88",
                  fontSize: 14,
                }}
              >
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TournamentsTab() {
  const { data: tournaments } = useGetTournaments();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Tournaments</h2>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Tournament
            </Button>
          </DialogTrigger>
          <CreateTournamentDialog onClose={() => setCreateDialogOpen(false)} />
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Entry Fee</TableHead>
                <TableHead>Prize Pool</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournaments?.map((tournament) => (
                <TableRow key={tournament.id.toString()}>
                  <TableCell className="font-medium">
                    {tournament.name}
                  </TableCell>
                  <TableCell>
                    {getTournamentTypeLabel(tournament.tournamentType)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tournament.status === "ongoing"
                          ? "destructive"
                          : tournament.status === "upcoming"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {getTournamentStatusLabel(tournament.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(tournament.entryFee)}</TableCell>
                  <TableCell>{formatCurrency(tournament.prizePool)}</TableCell>
                  <TableCell>
                    <TournamentActions tournament={tournament} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function TournamentActions({ tournament }: { tournament: any }) {
  const updateStatusMutation = useUpdateTournamentStatus();
  const updateCredentialsMutation = useUpdateTournamentRoomCredentials();
  const distributePrizesMutation = useDistributePrizes();
  const [credentialsDialogOpen, setCredentialsDialogOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  const handleStatusChange = async (status: TournamentStatus) => {
    try {
      await updateStatusMutation.mutateAsync({
        tournamentId: tournament.id,
        status,
      });
      toast.success(`Tournament status updated to ${status}`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update status");
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCredentialsMutation.mutateAsync({
        tournamentId: tournament.id,
        roomId,
        roomPassword,
      });
      toast.success("Room credentials updated");
      setCredentialsDialogOpen(false);
      setRoomId("");
      setRoomPassword("");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update credentials");
    }
  };

  const handleDistributePrizes = async () => {
    try {
      await distributePrizesMutation.mutateAsync(tournament.id);
      toast.success("Prizes distributed successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to distribute prizes");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        onValueChange={(value) => handleStatusChange(value as TournamentStatus)}
        value={tournament.status}
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Dialog
        open={credentialsDialogOpen}
        onOpenChange={setCredentialsDialogOpen}
      >
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            Room
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Room Credentials</DialogTitle>
            <DialogDescription>{tournament.name}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateCredentials} className="space-y-4">
            <div className="space-y-2">
              <Label>Room ID</Label>
              <Input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Room Password</Label>
              <Input
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={updateCredentialsMutation.isPending}
            >
              {updateCredentialsMutation.isPending
                ? "Updating..."
                : "Update Credentials"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {tournament.status === "completed" && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleDistributePrizes}
          disabled={distributePrizesMutation.isPending}
        >
          Prizes
        </Button>
      )}
    </div>
  );
}

// Tournament type config: default maxTeams per type
const TOURNAMENT_TYPE_CONFIG: Record<
  string,
  {
    defaultMaxTeams: number;
    label: string;
    info: string;
    commissionPct: number;
    prizePct: number;
    prizeDetails: string;
  }
> = {
  battleground: {
    defaultMaxTeams: 12,
    label: "Battle Ground (48 players)",
    info: "12 teams × 4 players = 48 total",
    commissionPct: 40,
    prizePct: 60,
    prizeDetails: "1st: 40% | 2nd: 30% | 3rd: 20% | Most Kills (6+): 10%",
  },
  custom4v4: {
    defaultMaxTeams: 2,
    label: "4vs4 Custom",
    info: "2 teams × 4 players = 8 total (₹80 collection @ ₹10/player)",
    commissionPct: 15,
    prizePct: 85,
    prizeDetails: "Winning team ke 4 players mein ₹17-17 (25% each)",
  },
  custom1v1: {
    defaultMaxTeams: 2,
    label: "1vs1 Custom",
    info: "2 players (₹20 collection @ ₹10/player)",
    commissionPct: 18,
    prizePct: 82,
    prizeDetails: "Winner ko 100% prize pool (₹16.40)",
  },
  custom2v2: {
    defaultMaxTeams: 2,
    label: "2vs2 Custom",
    info: "2 teams × 2 players (₹40 collection @ ₹10/player)",
    commissionPct: 25,
    prizePct: 75,
    prizeDetails: "Winning team ke 2 players mein ₹15-15 (50% each)",
  },
};

function CreateTournamentDialog({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "battleground",
    entryFee: "",
    maxTeams: "12",
    startTime: "",
  });
  const createMutation = useCreateTournament();

  const selectedConfig =
    TOURNAMENT_TYPE_CONFIG[formData.type] ||
    TOURNAMENT_TYPE_CONFIG.battleground;

  const handleTypeChange = (value: string) => {
    const config =
      TOURNAMENT_TYPE_CONFIG[value] || TOURNAMENT_TYPE_CONFIG.battleground;
    setFormData({
      ...formData,
      type: value,
      maxTeams: config.defaultMaxTeams.toString(),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const startTimeMs = new Date(formData.startTime).getTime();
      const startTimeNs = BigInt(startTimeMs) * BigInt(1_000_000);
      await createMutation.mutateAsync({
        name: formData.name,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tournamentType: formData.type as any,
        entryFee: BigInt(
          Math.round(Number.parseFloat(formData.entryFee) * 100),
        ),
        maxTeams: BigInt(formData.maxTeams),
        startTime: startTimeNs,
      });
      toast.success("Tournament created successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to create tournament");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Tournament</DialogTitle>
        <DialogDescription>Fill in tournament details</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Tournament Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Friday Night Showdown"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={formData.type} onValueChange={handleTypeChange}>
            <SelectTrigger data-ocid="admin.create_tournament.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="battleground">
                Battle Ground (48 players)
              </SelectItem>
              <SelectItem value="custom4v4">4vs4 Custom</SelectItem>
              <SelectItem value="custom1v1">1vs1 Custom (नया)</SelectItem>
              <SelectItem value="custom2v2">2vs2 Custom (नया)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">{selectedConfig.info}</p>
          <div className="flex gap-4 text-xs">
            <span className="text-destructive">
              Platform: {selectedConfig.commissionPct}%
            </span>
            <span className="text-primary">
              Prize Pool: {selectedConfig.prizePct}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground italic">
            {selectedConfig.prizeDetails}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Entry Fee (₹)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={formData.entryFee}
              onChange={(e) =>
                setFormData({ ...formData, entryFee: e.target.value })
              }
              placeholder="e.g., 10"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Max Teams</Label>
            <Input
              type="number"
              min="1"
              value={formData.maxTeams}
              onChange={(e) =>
                setFormData({ ...formData, maxTeams: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Start Time</Label>
          <Input
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={createMutation.isPending}
          data-ocid="admin.create_tournament.submit_button"
        >
          {createMutation.isPending ? "Creating..." : "Create Tournament"}
        </Button>
      </form>
    </DialogContent>
  );
}

function RegistrationsTab() {
  const { data: registrations } = useGetTeamRegistrations();
  const { data: teams } = useGetTeams();
  const { data: tournaments } = useGetTournaments();
  const approveMutation = useApproveTeamRegistration();
  const rejectMutation = useRejectTeamRegistration();

  const handleApprove = async (id: bigint) => {
    try {
      await approveMutation.mutateAsync(id);
      toast.success("Registration approved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to approve");
    }
  };

  const handleReject = async (id: bigint) => {
    try {
      await rejectMutation.mutateAsync(id);
      toast.success("Registration rejected");
    } catch (error: any) {
      toast.error(error?.message || "Failed to reject");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Registrations</CardTitle>
        <CardDescription>Approve or reject team registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead>Tournament</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations && registrations.length > 0 ? (
              registrations.map((reg) => {
                const team = teams?.find((t) => t.id === reg.teamId);
                const tournament = tournaments?.find(
                  (t) => t.id === reg.tournamentId,
                );
                return (
                  <TableRow
                    key={reg.id.toString()}
                    data-ocid={`admin.registrations.row.${reg.id.toString()}`}
                  >
                    <TableCell className="font-medium">
                      {team?.name || "Unknown"}
                    </TableCell>
                    <TableCell>{tournament?.name || "Unknown"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          reg.status === "approved"
                            ? "default"
                            : reg.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          reg.status === "approved" ? "bg-success" : ""
                        }
                      >
                        {reg.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {reg.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            data-ocid="admin.registrations.confirm_button"
                            onClick={() => handleApprove(reg.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            data-ocid="admin.registrations.delete_button"
                            onClick={() => handleReject(reg.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="admin.registrations.empty_state"
                >
                  No registrations yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ScoresTab() {
  const [scoreboardTab, setScoreboardTab] = useState<"free" | "paid">("free");

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          borderBottom: "2px solid #E5E7EB",
          paddingBottom: 8,
        }}
      >
        {(["free", "paid"] as const).map((tab) => {
          const isActive = scoreboardTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setScoreboardTab(tab)}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                background: isActive ? "#00FF88" : "#F3F4F6",
                color: isActive ? "#000000" : "#6B7280",
                transition: "all 0.15s ease",
              }}
              data-ocid={`admin.scores.${tab}.tab`}
            >
              {tab === "free" ? "🎁 Free Scoreboard" : "💰 Paid Scoreboard"}
            </button>
          );
        })}
      </div>

      {scoreboardTab === "free" ? (
        <FreeScoreboardForm />
      ) : (
        <PaidScoreboardForm />
      )}
    </div>
  );
}

function FreeScoreboardForm() {
  const [selectedTournament, setSelectedTournament] = useState<string>("");
  const [kills, setKills] = useState("");
  const [placement, setPlacement] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const freeTournaments = loadStoredFreeTournaments();

  const getFreeTournamentMode = (): string => {
    const ft = freeTournaments.find(({ id }) => id === selectedTournament);
    return ft?.data.mode ?? "Solo";
  };

  const getFreeTournamentName = (): string => {
    const ft = freeTournaments.find(({ id }) => id === selectedTournament);
    return ft?.data.name ?? selectedTournament;
  };

  const calculateFreePrize = (): number => {
    const rank = Number.parseInt(placement, 10);
    if (!selectedTournament || !rank) return 0;
    const mode = getFreeTournamentMode();
    const prizeMap: Record<string, Record<number, number>> = {
      Solo: { 1: 10 }, // Booyah ₹10 (most kills is separate admin decision)
      "4v4": { 1: 1.25 }, // per player
      "1v1": { 1: 0.5 },
      "2v2": { 1: 0.8 }, // per player
    };
    return prizeMap[mode]?.[rank] ?? 0;
  };

  const calculatedPrize = calculateFreePrize();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTournament || !playerName) {
      toast.error("Please select a tournament and enter player name");
      return;
    }
    setIsSaving(true);
    try {
      const { collection, addDoc } = await import("firebase/firestore");
      const { getFirebaseDb } = await import("../lib/firebase");
      const db = getFirebaseDb();
      const rankNum = Number.parseInt(placement, 10);
      const rankLabel =
        rankNum === 1
          ? "1st"
          : rankNum === 2
            ? "2nd"
            : rankNum === 3
              ? "3rd"
              : `${rankNum}th`;
      await addDoc(collection(db, "matchResults"), {
        tournamentId: selectedTournament,
        tournamentName: getFreeTournamentName(),
        playerName,
        kills: Number.parseInt(kills, 10) || 0,
        rank: rankNum,
        rankLabel,
        prizeAmount: calculatedPrize,
        completedAt: new Date().toISOString(),
        type: "free",
      });
      // Mark tournament as done
      localStorage.setItem(`freeMatchDone_${selectedTournament}`, "true");
      window.dispatchEvent(new Event("freeTournamentUpdated"));
      toast.success(`✅ Score saved! Prize: ₹${calculatedPrize.toFixed(2)}`);
      setPlayerName("");
      setKills("");
      setPlacement("");
    } catch (_err) {
      toast.error("Failed to save score");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🎁 Free Tournament Scoreboard</CardTitle>
        <CardDescription>
          Enter scores for free tournaments — prize auto-calculates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Free Tournament</Label>
            <Select
              value={selectedTournament}
              onValueChange={setSelectedTournament}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select free tournament" />
              </SelectTrigger>
              <SelectContent>
                {freeTournaments.length === 0 ? (
                  <SelectItem value="__none__" disabled>
                    No free tournaments created
                  </SelectItem>
                ) : (
                  freeTournaments.map(({ id, data }) => (
                    <SelectItem key={id} value={id}>
                      {data.name} [{data.mode}]
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="free-score-player">👤 Player Name</Label>
            <Input
              id="free-score-player"
              type="text"
              placeholder="Enter player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              data-ocid="admin.free_scores.player_name.input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kills</Label>
              <Input
                type="number"
                min="0"
                value={kills}
                onChange={(e) => setKills(e.target.value)}
                required
                data-ocid="admin.free_scores.kills.input"
              />
            </div>
            <div className="space-y-2">
              <Label>Placement Rank</Label>
              <Input
                type="number"
                min="1"
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                required
                data-ocid="admin.free_scores.rank.input"
              />
            </div>
          </div>
          {selectedTournament && (
            <div
              style={{
                background: "#F0FFF4",
                border: "1px solid #D1FAE5",
                borderRadius: 10,
                padding: 12,
                fontSize: 13,
              }}
            >
              <p style={{ color: "#666", fontWeight: 600, marginBottom: 6 }}>
                🏆 Prize Structure ({getFreeTournamentMode()})
              </p>
              {getFreeTournamentMode() === "Solo" && (
                <>
                  <p style={{ color: "#333" }}>Rank 1 (Booyah): ₹10</p>
                  <p style={{ color: "#333" }}>Most Kills (6+): ₹10</p>
                </>
              )}
              {getFreeTournamentMode() === "4v4" && (
                <p style={{ color: "#333" }}>Winning Team (each): ₹1.25</p>
              )}
              {getFreeTournamentMode() === "1v1" && (
                <p style={{ color: "#333" }}>Winner: ₹0.50</p>
              )}
              {getFreeTournamentMode() === "2v2" && (
                <p style={{ color: "#333" }}>Winning Team (each): ₹0.80</p>
              )}
              {calculatedPrize > 0 && (
                <p
                  style={{
                    color: "#00AA55",
                    fontWeight: 800,
                    fontSize: 16,
                    marginTop: 8,
                  }}
                >
                  💰 Auto-calculated: ₹{calculatedPrize.toFixed(2)}
                </p>
              )}
            </div>
          )}
          <Button
            type="submit"
            disabled={isSaving}
            style={{ background: "#00FF88", color: "#000000", fontWeight: 700 }}
            data-ocid="admin.free_scores.submit_button"
          >
            {isSaving ? "Saving..." : "Update Score & Save Result"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function PaidScoreboardForm() {
  const { data: tournaments } = useGetTournaments();
  const { data: teams } = useGetTeams();
  const updateScoreMutation = useUpdateTeamScore();
  const [selectedTournament, setSelectedTournament] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [kills, setKills] = useState("");
  const [placement, setPlacement] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isSavingResult, setIsSavingResult] = useState(false);
  const { refresh: refreshFlags } = useGetCheaterFlags();

  const calculatePaidPrize = (): number => {
    const rank = Number.parseInt(placement, 10);
    if (!selectedTournament || !rank) return 0;
    const paidTournament = tournaments?.find(
      (t) => t.id.toString() === selectedTournament,
    );
    if (!paidTournament) return 0;
    const prizePool = Number(paidTournament.prizePool) / 100_000_000;
    if (rank === 1) return Math.round(prizePool * 0.4 * 100) / 100;
    if (rank === 2) return Math.round(prizePool * 0.25 * 100) / 100;
    if (rank === 3) return Math.round(prizePool * 0.15 * 100) / 100;
    return 0;
  };

  const calculatedPrize = calculatePaidPrize();

  const getPaidTournamentName = (): string => {
    return (
      tournaments?.find((t) => t.id.toString() === selectedTournament)?.name ??
      selectedTournament
    );
  };

  const saveResultToFirestore = async () => {
    if (!selectedTournament || !playerName) return;
    try {
      const { collection, addDoc } = await import("firebase/firestore");
      const { getFirebaseDb } = await import("../lib/firebase");
      const db = getFirebaseDb();
      const rankNum = Number.parseInt(placement, 10);
      const rankLabel =
        rankNum === 1
          ? "1st"
          : rankNum === 2
            ? "2nd"
            : rankNum === 3
              ? "3rd"
              : `${rankNum}th`;
      await addDoc(collection(db, "matchResults"), {
        tournamentId: selectedTournament,
        tournamentName: getPaidTournamentName(),
        playerName,
        kills: Number.parseInt(kills, 10) || 0,
        rank: rankNum,
        rankLabel,
        prizeAmount: calculatedPrize,
        completedAt: new Date().toISOString(),
        type: "paid",
      });
    } catch (err) {
      console.error("Failed to save match result:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTournament || !selectedTeam) return;
    const killsNum = Number.parseInt(kills, 10);
    setIsSavingResult(true);
    try {
      await updateScoreMutation.mutateAsync({
        tournamentId: BigInt(selectedTournament),
        teamId: BigInt(selectedTeam),
        kills: BigInt(kills),
        placementRank: BigInt(placement),
      });
      toast.success("Score updated successfully");
      await saveResultToFirestore();
      if (calculatedPrize > 0) {
        toast.success(
          `💰 Prize auto-calculated: ₹${calculatedPrize.toFixed(2)} for ${playerName || "player"}`,
        );
      }
      if (killsNum >= 15) {
        const team = teams?.find((t) => t.id.toString() === selectedTeam);
        const tournament = tournaments?.find(
          (t) => t.id.toString() === selectedTournament,
        );
        if (team) {
          const flag = autoFlagOnScoreEntry(
            {
              id: team.id.toString(),
              name: team.name,
              ffId: team.members[0]?.freeFireId ?? "Unknown",
            },
            selectedTournament,
            tournament?.name ?? "Unknown Tournament",
            killsNum,
          );
          if (flag) {
            refreshFlags();
            toast.warning(
              `⚠️ Auto-flagged: ${team.name} has ${killsNum} kills!`,
              { duration: 6000 },
            );
          }
        }
      }
      setKills("");
      setPlacement("");
      setPlayerName("");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update score");
    } finally {
      setIsSavingResult(false);
    }
  };

  const paidTournaments =
    tournaments?.filter(
      (t) => t.status === "ongoing" || t.status === "completed",
    ) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>💰 Paid Tournament Scoreboard</CardTitle>
        <CardDescription>
          Enter scores for paid tournaments — prize auto-calculates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Paid Tournament</Label>
            <Select
              value={selectedTournament}
              onValueChange={setSelectedTournament}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select paid tournament" />
              </SelectTrigger>
              <SelectContent>
                {paidTournaments.length === 0 ? (
                  <SelectItem value="__none__" disabled>
                    No ongoing/completed paid tournaments
                  </SelectItem>
                ) : (
                  paidTournaments.map((t) => (
                    <SelectItem key={t.id.toString()} value={t.id.toString()}>
                      {t.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Team</Label>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {teams?.map((t) => (
                  <SelectItem key={t.id.toString()} value={t.id.toString()}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="paid-score-player">👤 Player Name</Label>
            <Input
              id="paid-score-player"
              type="text"
              placeholder="Enter player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              data-ocid="admin.paid_scores.player_name.input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kills</Label>
              <Input
                type="number"
                min="0"
                value={kills}
                onChange={(e) => setKills(e.target.value)}
                required
                data-ocid="admin.paid_scores.kills.input"
              />
            </div>
            <div className="space-y-2">
              <Label>Placement Rank</Label>
              <Input
                type="number"
                min="1"
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                required
                data-ocid="admin.paid_scores.rank.input"
              />
            </div>
          </div>
          {calculatedPrize > 0 && (
            <div
              className="rounded-xl p-3 flex items-center gap-2"
              style={{
                background: "rgba(170,68,255,0.08)",
                border: "1px solid rgba(170,68,255,0.3)",
              }}
              data-ocid="admin.paid_scores.prize_preview.panel"
            >
              <span style={{ fontSize: 18 }}>💰</span>
              <span style={{ color: "#AA44FF", fontWeight: 700, fontSize: 15 }}>
                Auto-calculated Prize: ₹{calculatedPrize.toFixed(2)}
              </span>
              <span style={{ color: "#666", fontSize: 12 }}>
                (Rank{" "}
                {placement === "1"
                  ? "1st"
                  : placement === "2"
                    ? "2nd"
                    : placement === "3"
                      ? "3rd"
                      : `${placement}th`}
                )
              </span>
            </div>
          )}
          <Button
            type="submit"
            disabled={updateScoreMutation.isPending || isSavingResult}
            data-ocid="admin.paid_scores.submit_button"
          >
            {updateScoreMutation.isPending || isSavingResult
              ? "Saving..."
              : "Update Score & Save Result"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
function DepositsTab() {
  const { data: deposits } = useGetDepositRequests();
  const approveMutation = useApproveDeposit();
  const rejectMutation = useRejectDeposit();

  const handleApprove = async (id: bigint) => {
    try {
      await approveMutation.mutateAsync(id);
      toast.success("Deposit approved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to approve");
    }
  };

  const handleReject = async (id: bigint) => {
    try {
      await rejectMutation.mutateAsync(id);
      toast.success("Deposit rejected");
    } catch (error: any) {
      toast.error(error?.message || "Failed to reject");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit Requests</CardTitle>
        <CardDescription>
          Approve or reject user deposit requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deposits && deposits.length > 0 ? (
              deposits.map((deposit) => (
                <TableRow
                  key={deposit.id.toString()}
                  data-ocid={`admin.deposits.row.${deposit.id.toString()}`}
                >
                  <TableCell className="font-mono text-xs">
                    {deposit.userId.toString().slice(0, 15)}...
                  </TableCell>
                  <TableCell>{formatCurrency(deposit.amount)}</TableCell>
                  <TableCell>{formatDateTime(deposit.timestamp)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        deposit.status === "approved"
                          ? "default"
                          : deposit.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        deposit.status === "approved" ? "bg-success" : ""
                      }
                    >
                      {deposit.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {deposit.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          data-ocid="admin.deposits.confirm_button"
                          onClick={() => handleApprove(deposit.id)}
                          disabled={approveMutation.isPending}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          data-ocid="admin.deposits.delete_button"
                          onClick={() => handleReject(deposit.id)}
                          disabled={rejectMutation.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="admin.deposits.empty_state"
                >
                  No deposit requests
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function WithdrawalsTab() {
  const { data: withdrawals } = useGetWithdrawalRequests();
  const approveMutation = useApproveWithdrawal();
  const rejectMutation = useRejectWithdrawal();
  const [detailsState, setDetailsState] = useState<WithdrawalDetail[]>(
    getWithdrawalDetails(),
  );

  // Reload details from localStorage on render
  const refreshDetails = () => setDetailsState(getWithdrawalDetails());

  const handleApprove = async (id: bigint) => {
    try {
      await approveMutation.mutateAsync(id);
      // Update status in localStorage details
      const updated = getWithdrawalDetails().map((d) =>
        d.requestId === id.toString()
          ? { ...d, status: "approved" as const }
          : d,
      );
      saveWithdrawalDetails(updated);
      refreshDetails();
      toast.success("Withdrawal approved and processed");
    } catch (error: any) {
      toast.error(error?.message || "Failed to approve");
    }
  };

  const handleReject = async (id: bigint) => {
    try {
      await rejectMutation.mutateAsync(id);
      const updated = getWithdrawalDetails().map((d) =>
        d.requestId === id.toString()
          ? { ...d, status: "rejected" as const }
          : d,
      );
      saveWithdrawalDetails(updated);
      refreshDetails();
      toast.success("Withdrawal rejected");
    } catch (error: any) {
      toast.error(error?.message || "Failed to reject");
    }
  };

  // Count duplicate UPI IDs to flag fraud
  const upiCounts: Record<string, number> = {};
  for (const d of detailsState) {
    if (d.method === "upi" && d.upiId) {
      upiCounts[d.upiId.toLowerCase()] =
        (upiCounts[d.upiId.toLowerCase()] ?? 0) + 1;
    }
  }
  const fraudUpiIds = new Set(
    Object.entries(upiCounts)
      .filter(([, count]) => count >= 3)
      .map(([id]) => id),
  );

  const getDetail = (id: bigint): WithdrawalDetail | undefined =>
    detailsState.find((d) => d.requestId === id.toString());

  const methodLabel: Record<string, string> = {
    upi: "UPI",
    voucher: "Play Voucher",
    bank: "Bank Transfer",
  };
  const methodBadgeClass: Record<string, string> = {
    upi: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    voucher: "bg-green-500/20 text-green-300 border border-green-500/30",
    bank: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  };

  // Pending count
  const pendingCount =
    withdrawals?.filter((w) => w.status === "pending").length ?? 0;

  return (
    <div className="space-y-4">
      {/* Fraud alerts */}
      {fraudUpiIds.size > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-destructive flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Fraud Alerts — Suspicious UPI Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[...fraudUpiIds].map((upi) => (
                <Badge
                  key={upi}
                  variant="destructive"
                  className="font-mono text-xs"
                >
                  {upi} ({upiCounts[upi]} requests)
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              These UPI IDs have been used 3+ times. Review carefully before
              approving.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Withdrawal Requests
                {pendingCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {pendingCount} pending
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Process user withdrawal requests — UPI, Play Voucher, and Bank
                Transfer
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals && withdrawals.length > 0 ? (
                  withdrawals.map((withdrawal) => {
                    const detail = getDetail(withdrawal.id);
                    const method = detail?.method ?? "upi";
                    const isFraudUpi =
                      method === "upi" &&
                      detail?.upiId &&
                      fraudUpiIds.has(detail.upiId.toLowerCase());

                    return (
                      <TableRow
                        key={withdrawal.id.toString()}
                        className={isFraudUpi ? "bg-destructive/5" : ""}
                      >
                        <TableCell className="font-mono text-xs">
                          {detail?.userId
                            ? detail.userId.slice(0, 12)
                            : withdrawal.userId.toString().slice(0, 12)}
                          ...
                        </TableCell>
                        <TableCell>
                          {detail ? (
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded ${methodBadgeClass[method] ?? ""}`}
                            >
                              {methodLabel[method] ?? method}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[180px]">
                          {detail?.method === "upi" && (
                            <div>
                              <p className="font-mono text-xs truncate">
                                {detail.upiId}
                              </p>
                              {isFraudUpi && (
                                <p className="text-xs text-destructive flex items-center gap-1 mt-0.5">
                                  <AlertTriangle className="h-3 w-3" />
                                  Suspicious — multiple requests
                                </p>
                              )}
                            </div>
                          )}
                          {detail?.method === "voucher" && (
                            <div className="space-y-1">
                              <p className="text-xs text-green-400 font-medium">
                                Google Play Voucher
                              </p>
                              {detail.voucherCode && (
                                <p className="font-mono text-xs bg-green-950/30 border border-green-500/20 px-2 py-1 rounded tracking-widest">
                                  {detail.voucherCode}
                                </p>
                              )}
                              <span className="inline-block text-[10px] bg-green-500/20 text-green-300 border border-green-500/30 px-1.5 py-0.5 rounded-full">
                                INSTANT ⚡ Auto-Generated
                              </span>
                            </div>
                          )}

                          {!detail && (
                            <span className="text-xs text-muted-foreground">
                              No details
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(withdrawal.amount)}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDateTime(withdrawal.timestamp)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              withdrawal.status === "approved"
                                ? "default"
                                : withdrawal.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              withdrawal.status === "approved"
                                ? "bg-success"
                                : ""
                            }
                          >
                            {withdrawal.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {withdrawal.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleApprove(withdrawal.id)}
                                disabled={approveMutation.isPending}
                                data-ocid="admin.withdrawals.approve_button"
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(withdrawal.id)}
                                disabled={rejectMutation.isPending}
                                data-ocid="admin.withdrawals.delete_button"
                              >
                                <X className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-8"
                      data-ocid="admin.withdrawals.empty_state"
                    >
                      No withdrawal requests yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Voucher Transactions Log */}
      <VoucherTransactionsLog />
    </div>
  );
}

function VoucherTransactionsLog() {
  const allVouchers: PlayVoucher[] = getMyVouchers();
  const voucherWithdrawals = getWithdrawalDetails().filter(
    (d) => d.method === "voucher",
  );

  if (allVouchers.length === 0 && voucherWithdrawals.length === 0) return null;

  const sorted = [...allVouchers].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <Card className="border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Gift className="h-5 w-5" />
          Play Store Voucher Log
          <Badge className="bg-green-600/20 text-green-300 border-green-500/30 text-xs font-normal ml-1">
            {sorted.length} total
          </Badge>
        </CardTitle>
        <CardDescription>
          All auto-generated Play Store voucher codes. No admin action required
          — these are delivered instantly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Voucher Code</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length > 0 ? (
                sorted.map((v, idx) => (
                  <TableRow
                    key={v.id}
                    data-ocid={`admin.voucher_log.row.${idx + 1}`}
                  >
                    <TableCell>
                      <span className="font-mono text-xs bg-gray-100 border border-gray-300 px-2 py-1 rounded tracking-widest text-gray-800">
                        {v.code}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900">
                      ₹{v.amount}
                    </TableCell>
                    <TableCell className="text-xs text-gray-600">
                      {new Date(v.createdAt).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell className="text-xs text-gray-600">
                      {new Date(v.expiresAt).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          v.status === "used"
                            ? "secondary"
                            : Date.now() > v.expiresAt
                              ? "destructive"
                              : "default"
                        }
                        className={
                          v.status === "unused" && Date.now() <= v.expiresAt
                            ? "bg-green-600/30 text-green-300 border-green-500/40"
                            : ""
                        }
                      >
                        {v.status === "used"
                          ? "Used"
                          : Date.now() > v.expiresAt
                            ? "Expired"
                            : "Active"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="admin.voucher_log.empty_state"
                  >
                    No vouchers generated yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function UsersTab() {
  const { data: users } = useGetAllUsers();
  const [firestoreUsers, setFirestoreUsers] = useState<
    Array<{ username: string; email: string; role: string; banned: boolean }>
  >([]);

  useEffect(() => {
    const fetchFirestoreUsers = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { collection, getDocs } = await import("firebase/firestore");
        // @ts-ignore
        const { getFirebaseDb } = await import("../lib/firebase");
        const db = getFirebaseDb();
        // @ts-ignore
        const snap = await getDocs(collection(db, "users"));
        const fUsers = snap.docs.map((d) => {
          const data = d.data();
          return {
            username: data.display_name || data.username || d.id,
            email: data.email || "",
            role: "user",
            banned: false,
          };
        });
        setFirestoreUsers(fUsers);
      } catch {
        /* ignore */
      }
    };
    fetchFirestoreUsers();
  }, []);

  const mergedUsers = (() => {
    const motokoUsers = users ?? [];
    if (motokoUsers.length > 0) {
      const existingEmails = new Set(
        motokoUsers.map((u) => u.email?.toLowerCase()).filter(Boolean),
      );
      const extraFirestore = firestoreUsers.filter(
        (u) => !existingEmails.has(u.email?.toLowerCase()),
      );
      return [...motokoUsers, ...extraFirestore];
    }
    return firestoreUsers;
  })();

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>View all registered platform users</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mergedUsers.length > 0 ? (
              mergedUsers.map((user) => (
                <TableRow
                  key={`${user.username}-${user.email}`}
                  data-ocid={"admin.users.row"}
                >
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                    >
                      {user.role.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.banned ? "destructive" : "default"}
                      className={!user.banned ? "bg-success" : ""}
                    >
                      {user.banned ? "BANNED" : "ACTIVE"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="admin.users.empty_state"
                >
                  No users registered yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────
// Redeem Requests Tab (Google Play demo mode)
// ──────────────────────────────────────────────────────────────
function RedeemRequestsTab() {
  const approveDepositMutation = useApproveDeposit();
  const rejectDepositMutation = useRejectDeposit();
  const [requests, setRequests] = useState<RedeemRequest[]>(() =>
    getRedeemRequests(),
  );

  const refresh = () => setRequests(getRedeemRequests());

  const handleApprove = async (req: RedeemRequest) => {
    try {
      if (req.depositRequestId) {
        // Approve the linked backend deposit request
        // This will: credit user's wallet balance + create transaction history entry
        await approveDepositMutation.mutateAsync(BigInt(req.depositRequestId));
      }

      // Mark redeem request as approved + mark code as used
      const updated = getRedeemRequests().map((r) =>
        r.id === req.id ? { ...r, status: "approved" as const } : r,
      );
      saveRedeemRequests(updated);

      const usedCodes: string[] = JSON.parse(
        localStorage.getItem("gp_used_codes") || "[]",
      );
      usedCodes.push(req.code.toUpperCase().trim());
      localStorage.setItem("gp_used_codes", JSON.stringify(usedCodes));

      toast.success(
        `Approved ₹${req.amount} redeem for ${req.username}. Wallet credited!`,
      );
      refresh();
    } catch (error: any) {
      toast.error(error?.message || "Failed to approve redeem request");
    }
  };

  const handleReject = async (req: RedeemRequest) => {
    try {
      if (req.depositRequestId) {
        // Reject the linked backend deposit request too
        await rejectDepositMutation.mutateAsync(BigInt(req.depositRequestId));
      }
    } catch {
      // Best-effort: even if backend reject fails, update local state
    }
    const updated = getRedeemRequests().map((r) =>
      r.id === req.id ? { ...r, status: "rejected" as const } : r,
    );
    saveRedeemRequests(updated);
    toast.success(`Rejected redeem request from ${req.username}`);
    refresh();
  };

  const pending = requests.filter((r) => r.status === "pending");
  const others = requests.filter((r) => r.status !== "pending");

  return (
    <div className="space-y-6">
      <Card className="border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Pending Redeem Requests</span>
            {pending.length > 0 && (
              <Badge className="bg-yellow-500 text-black">
                {pending.length}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Google Play gift card codes awaiting approval (Demo Mode)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending.length > 0 ? (
                pending.map((req, idx) => (
                  <TableRow
                    key={req.id}
                    data-ocid={`admin.redeem.row.${idx + 1}`}
                  >
                    <TableCell className="font-medium">
                      {req.username}
                    </TableCell>
                    <TableCell>
                      <code className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {req.code}
                      </code>
                    </TableCell>
                    <TableCell className="font-semibold text-green-400">
                      ₹{req.amount}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(req.timestamp).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          data-ocid={`admin.redeem.confirm_button.${idx + 1}`}
                          onClick={() => handleApprove(req)}
                          disabled={approveDepositMutation.isPending}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          data-ocid={`admin.redeem.delete_button.${idx + 1}`}
                          onClick={() => handleReject(req)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                    data-ocid="admin.redeem.empty_state"
                  >
                    No pending redeem requests
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {others.length > 0 && (
        <Card className="border-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Redeem History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {others.map((req, idx) => (
                  <TableRow
                    key={req.id}
                    data-ocid={`admin.redeem_history.row.${idx + 1}`}
                  >
                    <TableCell>{req.username}</TableCell>
                    <TableCell>
                      <code className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {req.code}
                      </code>
                    </TableCell>
                    <TableCell>₹{req.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          req.status === "approved" ? "default" : "destructive"
                        }
                        className={
                          req.status === "approved" ? "bg-success" : ""
                        }
                      >
                        {req.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(req.timestamp).toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Ad Stats Tab ──────────────────────────────────────────────────────────────

function AdStatsTab() {
  const tokens = useTokens();
  const stats = tokens.adStats;
  const allTime = tokens.allTime;

  const todayCards = [
    {
      label: "Manual Ads Today",
      value: stats.manualAdsToday,
      icon: Play,
      color: "border-gray-200 bg-white",
      textColor: "text-gray-700",
    },
    {
      label: "Tournament Ads Today",
      value: stats.tournamentAdsToday,
      icon: Trophy,
      color: "border-gray-200 bg-white",
      textColor: "text-gray-700",
    },
    {
      label: "Withdrawal Ads Today",
      value: stats.withdrawalAdsToday,
      icon: IndianRupee,
      color: "border-gray-200 bg-white",
      textColor: "text-gray-700",
    },
    {
      label: "Total Ads Today",
      value: stats.totalAdsToday,
      icon: Coins,
      color: "border-[#00FF88]/50 bg-white",
      textColor: "text-gray-900",
    },
  ];

  return (
    <div className="space-y-6" data-ocid="admin.adstats.panel">
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="pt-4 pb-4">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Coins className="h-4 w-4 flex-shrink-0" />
            Stats shown for current admin's account (localStorage-based).
            Platform-wide stats require backend integration.
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Play className="h-5 w-5 text-gray-600" />
          Today's Ad Activity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {todayCards.map((card) => (
            <Card key={card.label} className={`${card.color}`}>
              <CardHeader className="pb-2">
                <CardTitle
                  className={`text-sm flex items-center gap-2 ${card.textColor}`}
                >
                  <card.icon className="h-4 w-4" />
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold font-display text-gray-900">
                  {card.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-gray-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-700 flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Tokens Distributed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-display text-gray-900">
              {stats.totalTokensEarnedToday}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Manual + Tournament bonus tokens
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-700 flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              Rewards Paid Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-display text-green-600">
              ₹{(stats.withdrawalAdsToday * 1.25).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.withdrawalAdsToday} × ₹1.25
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-gray-600" />
          All-Time Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-gray-200 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-gray-700 flex items-center gap-2">
                <Play className="h-3.5 w-3.5" />
                Total Ads Watched
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                {allTime.totalAdsWatched}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-gray-700 flex items-center gap-2">
                <Coins className="h-3.5 w-3.5" />
                Total Tokens Distributed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                {allTime.totalTokensDistributed}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-gray-700 flex items-center gap-2">
                <IndianRupee className="h-3.5 w-3.5" />
                Total Withdrawals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                {allTime.totalWithdrawals}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-gray-700 flex items-center gap-2">
                <DollarSign className="h-3.5 w-3.5" />
                Total Rewards Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                ₹{allTime.totalRupeesPaid.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4" />
            Current Admin Token Balance
          </CardTitle>
          <CardDescription>
            Your personal token balance (as logged-in user)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Balance</p>
              <p className="text-3xl font-bold text-gray-900">
                {tokens.balance} 🪙
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Earned</p>
              <p className="text-3xl font-bold text-gray-900">
                {tokens.totalEarned}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Total Withdrawn
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {tokens.totalWithdrawn}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Server Load Simulation (System 3) ─────────────────────────── */}
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Server className="h-5 w-5 text-cyan-400" />
          Server Load Simulation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {/* 50 users */}
          <Card className="border-green-500/30 bg-green-950/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-400 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  50 Users
                </span>
                <Badge className="bg-green-600 text-white text-xs">Fast</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress value={18} className="h-2" />
              <p className="text-2xl font-bold font-display text-green-300">
                &lt;100ms
              </p>
              <p className="text-xs text-muted-foreground">Response time</p>
            </CardContent>
          </Card>

          {/* 100 users */}
          <Card className="border-yellow-500/30 bg-yellow-950/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-yellow-400 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  100 Users
                </span>
                <Badge className="bg-yellow-600 text-white text-xs">Good</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress value={38} className="h-2" />
              <p className="text-2xl font-bold font-display text-yellow-300">
                &lt;300ms
              </p>
              <p className="text-xs text-muted-foreground">Response time</p>
            </CardContent>
          </Card>

          {/* 500 users */}
          <Card className="border-orange-500/30 bg-orange-950/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-orange-400 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  500 Users
                </span>
                <Badge className="bg-orange-600 text-white text-xs">
                  Moderate
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress value={65} className="h-2" />
              <p className="text-2xl font-bold font-display text-orange-300">
                &lt;800ms
              </p>
              <p className="text-xs text-muted-foreground">Response time</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-cyan-500/20 bg-cyan-950/10">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-cyan-300 flex items-start gap-2">
              <Zap className="h-4 w-4 mt-0.5 flex-shrink-0 text-cyan-400" />
              <span>
                <span className="font-semibold">
                  Internet Computer blockchain
                </span>{" "}
                scales automatically. No manual server management needed.
                Caching, lazy loading, and query optimization are active.
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────────────────

function SecurityTab() {
  const { flags, refresh: refreshFlags } = useGetCheaterFlags();
  const { teams: dqTeams, refresh: refreshDqTeams } = useGetDisqualifiedTeams();
  const { data: allTeams } = useGetTeams();

  const activeFlagCount = flags.filter((f) => f.status === "flagged").length;

  const handleBanAndDisqualify = (flagId: string) => {
    // Mark the flag as banned in localStorage
    banFlaggedPlayer(flagId);

    const flag = flags.find((f) => f.id === flagId);
    if (flag) {
      // Disqualify the team associated with this player
      const team = allTeams?.find((t) =>
        t.members.some((m) => m.freeFireId === flag.ffId),
      );
      if (team) {
        disqualifyTeam(
          team.id.toString(),
          team.name,
          flag.tournamentId,
          flag.tournamentName,
          `Auto-ban: ${flag.reason}`,
        );
        refreshDqTeams();
      }

      toast.error("Player disqualified and banned. No refund issued.", {
        description: `${flag.playerName} (${flag.ffId}) has been banned from the platform.`,
        duration: 5000,
      });
    }

    refreshFlags();
  };

  const handleDisqualifyTeamOnly = (flagId: string) => {
    const flag = flags.find((f) => f.id === flagId);
    if (!flag) return;

    const team = allTeams?.find((t) =>
      t.members.some((m) => m.freeFireId === flag.ffId),
    );
    if (team) {
      disqualifyTeam(
        team.id.toString(),
        team.name,
        flag.tournamentId,
        flag.tournamentName,
        `Disqualified: ${flag.reason}`,
      );
      refreshDqTeams();
      toast.warning(`Team "${team.name}" has been disqualified.`);
    } else {
      toast.error("Could not find the team for this player.");
    }
  };

  const handleClearFlag = (flagId: string) => {
    clearFlag(flagId);
    refreshFlags();
    toast.success("Flag cleared successfully.");
  };

  return (
    <div className="space-y-6" data-ocid="admin.security.panel">
      {/* Summary header */}
      <div className="flex items-center gap-4 flex-wrap">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: "rgba(220,0,0,0.08)",
            border: "1px solid rgba(220,0,0,0.2)",
          }}
        >
          <ShieldAlert className="h-6 w-6 text-destructive" />
          <div>
            <p className="text-xl font-bold font-display text-destructive">
              {activeFlagCount}
            </p>
            <p className="text-xs text-muted-foreground">Active Flags</p>
          </div>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: "rgba(255,130,0,0.08)",
            border: "1px solid rgba(255,130,0,0.2)",
          }}
        >
          <AlertTriangle className="h-6 w-6 text-orange-400" />
          <div>
            <p className="text-xl font-bold font-display text-orange-400">
              {dqTeams.length}
            </p>
            <p className="text-xs text-muted-foreground">Disqualified Teams</p>
          </div>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: "rgba(50,50,50,0.3)",
            border: "1px solid rgba(100,100,100,0.2)",
          }}
        >
          <Shield className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-xl font-bold font-display">
              {flags.filter((f) => f.status === "banned").length}
            </p>
            <p className="text-xs text-muted-foreground">Total Bans</p>
          </div>
        </div>
      </div>

      {/* ── Auto-Flagged Players ────────────────────────────────────── */}
      <Card
        style={{ border: "1px solid rgba(220,0,0,0.3)" }}
        data-ocid="admin.security.card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <ShieldAlert className="h-5 w-5" />
            Auto-Flagged Players
            {activeFlagCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {activeFlagCount} Pending
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Players automatically flagged for suspicious kill counts (15+).
            Review and take action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table data-ocid="admin.security.table">
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>FF ID</TableHead>
                <TableHead>Tournament</TableHead>
                <TableHead>Kills</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flags.length > 0 ? (
                flags.map((flag, idx) => (
                  <TableRow
                    key={flag.id}
                    data-ocid={`admin.security.row.${idx + 1}`}
                    style={
                      flag.status === "flagged"
                        ? { background: "rgba(220,0,0,0.04)" }
                        : {}
                    }
                  >
                    <TableCell className="font-semibold">
                      {flag.playerName}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {flag.ffId}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[120px] truncate">
                      {flag.tournamentName}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${flag.kills >= 15 ? "text-destructive" : ""}`}
                      >
                        {flag.kills}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[150px]">
                      {flag.reason}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(flag.timestamp).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          flag.status === "flagged"
                            ? "destructive"
                            : flag.status === "banned"
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          flag.status === "cleared"
                            ? "border-green-500/40 text-green-400"
                            : flag.status === "banned"
                              ? "border-orange-500/40 text-orange-400"
                              : ""
                        }
                      >
                        {flag.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {flag.status === "flagged" && (
                        <div className="flex flex-wrap gap-1">
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs h-7 px-2"
                            data-ocid={`admin.security.delete_button.${idx + 1}`}
                            onClick={() => handleBanAndDisqualify(flag.id)}
                          >
                            Ban + DQ
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 px-2 border-orange-500/40 text-orange-400 hover:bg-orange-950/20"
                            data-ocid={`admin.security.secondary_button.${idx + 1}`}
                            onClick={() => handleDisqualifyTeamOnly(flag.id)}
                          >
                            DQ Team
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs h-7 px-2 text-muted-foreground"
                            data-ocid={`admin.security.cancel_button.${idx + 1}`}
                            onClick={() => handleClearFlag(flag.id)}
                          >
                            Clear
                          </Button>
                        </div>
                      )}
                      {flag.status !== "flagged" && (
                        <span className="text-xs text-muted-foreground">
                          {flag.status === "banned" ? "Banned ✓" : "Cleared ✓"}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-muted-foreground"
                    data-ocid="admin.security.empty_state"
                  >
                    <div
                      className="flex flex-col items-center gap-2"
                      style={{ maxWidth: 320, margin: "0 auto" }}
                    >
                      <Shield className="h-8 w-8 opacity-30" />
                      <p>No suspicious activity detected</p>
                      <p
                        className="text-xs"
                        style={{
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        Players with 15+ kills will be auto-flagged here
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Disqualified Teams ────────────────────────────────────────── */}
      <Card
        style={{ border: "1px solid rgba(255,130,0,0.3)" }}
        data-ocid="admin.security.dq.card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="h-5 w-5" />
            Disqualified Teams
          </CardTitle>
          <CardDescription>
            Teams that have been disqualified from tournaments. No refunds are
            issued.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                <TableHead>Tournament</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dqTeams.length > 0 ? (
                dqTeams.map((team, idx) => (
                  <TableRow
                    key={team.id}
                    data-ocid={`admin.security.dq.row.${idx + 1}`}
                    style={{ background: "rgba(255,130,0,0.04)" }}
                  >
                    <TableCell className="font-semibold">
                      {team.teamName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {team.tournamentName}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {team.reason}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(team.timestamp).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-muted-foreground"
                    data-ocid="admin.security.dq.empty_state"
                  >
                    No teams disqualified yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Fair play reminder */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-4 pb-4">
          <p className="text-sm text-muted-foreground flex items-start gap-2">
            <Shield className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
            <span>
              <span className="font-semibold text-foreground">
                Fair Play Policy:{" "}
              </span>
              Hackers aur cheat users ko{" "}
              <span className="text-destructive font-semibold">
                permanently ban
              </span>{" "}
              kiya jayega with{" "}
              <span className="text-destructive font-semibold">no refund</span>.
              Har match mein fair play mandatory hai.
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Referrals Tab ─────────────────────────────────────────────────────────────

function ReferralsTab() {
  const stats = getReferralStats();
  const fraudOnly = stats.allReferrals.filter((r) => r.status === "fraud");

  // Referral Settings local state
  const initSettings = getReferralSettings();
  const [refEnabled, setRefEnabled] = useState(initSettings.enabled);
  const [referrerReward, setReferrerReward] = useState(
    initSettings.referrerReward.toString(),
  );
  const [newUserBonus, setNewUserBonus] = useState(
    initSettings.newUserBonus.toString(),
  );
  const [minUsers, setMinUsers] = useState(
    initSettings.minUsersRequired.toString(),
  );

  const handleSaveSettings = () => {
    saveReferralSettings({
      enabled: refEnabled,
      referrerReward: Number.parseFloat(referrerReward) || 1.5,
      newUserBonus: Number.parseFloat(newUserBonus) || 0.5,
      minUsersRequired: Number.parseInt(minUsers) || 0,
    });
    toast.success("✅ Referral settings saved!");
  };

  const maskName = (name: string) => {
    if (!name || name.length < 2) return "****";
    return `${name.slice(0, 2)}****`;
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* ─── Referral Settings Card ─────────────────────────────── */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E0E0E0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <p
          className="mb-4 text-sm tracking-widest uppercase"
          style={{ fontFamily: "'Orbitron', sans-serif", color: "#00FF88" }}
        >
          🔗 REFERRAL SETTINGS
        </p>

        {/* Enable Toggle */}
        <div
          className="flex items-center justify-between mb-5 p-3 rounded-xl"
          style={{
            background: "rgba(0,255,136,0.06)",
            border: "1px solid rgba(0,255,136,0.15)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "#111111",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Enable Referral Program
            </p>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "#777777",
                fontSize: 12,
              }}
            >
              {refEnabled
                ? "Program is active — users can earn referral rewards"
                : "Program disabled — referral section hidden from profiles"}
            </p>
          </div>
          <Switch
            checked={refEnabled}
            onCheckedChange={setRefEnabled}
            data-ocid="admin.referral.switch"
          />
        </div>

        {/* Reward Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div>
            <Label
              className="text-xs mb-1 block"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "#555555",
                letterSpacing: "0.05em",
              }}
            >
              REFERRER REWARD (₹)
            </Label>
            <div className="flex items-center gap-2">
              <span style={{ color: "#00FF88", fontSize: 18, fontWeight: 700 }}>
                ₹
              </span>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={referrerReward}
                onChange={(e) => setReferrerReward(e.target.value)}
                className="bg-[#F5F5F5] border-green-500/30 text-gray-900"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                data-ocid="admin.referral.input"
              />
            </div>
          </div>
          <div>
            <Label
              className="text-xs mb-1 block"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "#555555",
                letterSpacing: "0.05em",
              }}
            >
              NEW USER BONUS (₹)
            </Label>
            <div className="flex items-center gap-2">
              <span style={{ color: "#9d4edd", fontSize: 18, fontWeight: 700 }}>
                ₹
              </span>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={newUserBonus}
                onChange={(e) => setNewUserBonus(e.target.value)}
                className="bg-[#F5F5F5] border-purple-500/30 text-gray-900"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                data-ocid="admin.referral.input"
              />
            </div>
          </div>
          <div>
            <Label
              className="text-xs mb-1 block"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "#555555",
                letterSpacing: "0.05em",
              }}
            >
              MINIMUM USERS REQUIRED
            </Label>
            <Input
              type="number"
              min="0"
              value={minUsers}
              onChange={(e) => setMinUsers(e.target.value)}
              className="bg-[#F5F5F5] border-slate-500/30 text-gray-900"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              data-ocid="admin.referral.input"
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div
            className="rounded-xl p-3 text-center"
            style={{
              background: "#F0FFF8",
              border: "1px solid #D1FAE5",
            }}
          >
            <p
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: "#00FF88",
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              {stats.totalReferrals}
            </p>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "#666666",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Total Referrals
            </p>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{
              background: "#FAF0FF",
              border: "1px solid #E9D5FF",
            }}
          >
            <p
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: "#9d4edd",
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              ₹{stats.totalEarnings.toFixed(2)}
            </p>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "#666666",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Total Rewards Paid
            </p>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSaveSettings}
          className="w-full font-bold tracking-widest"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: "linear-gradient(90deg, #00FF88, #00cc6a)",
            color: "#0a0a0a",
            border: "none",
            borderRadius: 10,
            letterSpacing: "0.1em",
            boxShadow: "0 0 20px rgba(0,255,136,0.4)",
          }}
          data-ocid="admin.referral.save_button"
        >
          💾 SAVE CHANGES
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Gift className="h-4 w-4 text-green-400" />
              Total Successful Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalReferrals}
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-yellow-400" />
              Total Rewards Paid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">
              ₹{stats.totalEarnings.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-destructive" />
              Fraud Attempts Blocked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              {stats.fraudAttempts}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fraud Alerts */}
      {fraudOnly.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <AlertTriangle className="h-5 w-5" />
              Fraud Alerts ({fraudOnly.length})
            </CardTitle>
            <CardDescription className="text-yellow-400/70">
              These registrations were blocked due to same device/IP detection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referrer ID</TableHead>
                  <TableHead>Friend</TableHead>
                  <TableHead>Device Fingerprint</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fraudOnly.map((r) => (
                  <TableRow
                    key={r.id}
                    className="border-yellow-500/10 bg-yellow-950/10"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground max-w-24 truncate">
                      {r.referrerId.slice(0, 16)}...
                    </TableCell>
                    <TableCell className="font-medium">
                      {maskName(r.newUserName)}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {r.deviceFingerprint}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(r.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Referral Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Referral Logs
          </CardTitle>
          <CardDescription>
            All referral attempts sorted by newest first
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.allReferrals.length === 0 ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="admin.referrals.empty_state"
            >
              <Gift className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>No referrals yet</p>
            </div>
          ) : (
            <Table data-ocid="admin.referrals.table">
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Referred User</TableHead>
                  <TableHead>Reward</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.allReferrals.map((r: ReferralRecord, idx: number) => (
                  <TableRow
                    key={r.id}
                    data-ocid={`admin.referrals.row.${idx + 1}`}
                  >
                    <TableCell className="font-mono font-semibold text-gray-800">
                      {r.referrerCode}
                    </TableCell>
                    <TableCell className="font-medium text-gray-700">
                      {maskName(r.newUserName)}
                    </TableCell>
                    <TableCell>
                      {r.status === "success" ? (
                        <span className="text-green-600 font-semibold">
                          ₹{r.rewardAmount.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-gray-400">₹0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">
                      {formatDate(r.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Free Registrations Tab ────────────────────────────────────────────────────

function FreeRegistrationsTab() {
  const [registrations, setRegistrations] = useState<FreeRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTournament, setFilterTournament] = useState("all");

  useEffect(() => {
    getFreeRegistrations()
      .then((data) => setRegistrations(data))
      .finally(() => setLoading(false));
  }, []);

  const tournamentNames = Array.from(
    new Set(registrations.map((r) => r.tournamentName).filter(Boolean)),
  );

  const filtered =
    filterTournament === "all"
      ? registrations
      : registrations.filter((r) => r.tournamentName === filterTournament);

  return (
    <div className="space-y-4">
      <Card
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
        }}
      >
        <CardHeader>
          <CardTitle
            style={{ color: "#000000", fontWeight: "bold", fontSize: 18 }}
            className="flex items-center gap-2"
          >
            📋 Free Registrations
          </CardTitle>
          <CardDescription style={{ color: "#666666" }}>
            Free tournament ke saare registrations yahan dikhenge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-3 flex-wrap">
            <label
              htmlFor="free-reg-filter"
              style={{ color: "#333333", fontWeight: 600, fontSize: 14 }}
            >
              Filter by Tournament:
            </label>
            <select
              id="free-reg-filter"
              value={filterTournament}
              onChange={(e) => setFilterTournament(e.target.value)}
              data-ocid="admin.free_registrations.select"
              style={{
                background: "#F5F5F5",
                border: "1px solid #333333",
                color: "#000000",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 14,
                outline: "none",
              }}
            >
              <option value="all">All Tournaments</option>
              {tournamentNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p
              style={{
                color: "#666666",
                textAlign: "center",
                padding: "24px 0",
              }}
              data-ocid="admin.free_registrations.loading_state"
            >
              Loading...
            </p>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-12"
              data-ocid="admin.free_registrations.empty_state"
              style={{ color: "#666666" }}
            >
              <p style={{ fontSize: 32 }}>📋</p>
              <p style={{ marginTop: 8, fontWeight: 600 }}>
                No free registrations yet
              </p>
              <p style={{ fontSize: 13, marginTop: 4 }}>
                Free tournament registrations yahan dikhenge
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table
                style={{ width: "100%", borderCollapse: "collapse" }}
                data-ocid="admin.free_registrations.table"
              >
                <thead>
                  <tr style={{ background: "#EEEEEE" }}>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: 13,
                        borderBottom: "1px solid #DDDDDD",
                      }}
                    >
                      Nickname
                    </th>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: 13,
                        borderBottom: "1px solid #DDDDDD",
                      }}
                    >
                      UID
                    </th>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: 13,
                        borderBottom: "1px solid #DDDDDD",
                      }}
                    >
                      Tournament Name
                    </th>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: 13,
                        borderBottom: "1px solid #DDDDDD",
                      }}
                    >
                      Registration Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((reg, idx) => (
                    <tr
                      key={reg.id ?? idx}
                      data-ocid={`admin.free_registrations.row.${idx + 1}`}
                      style={{
                        background: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLTableRowElement
                        ).style.background = "#F5F5F5";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLTableRowElement
                        ).style.background =
                          idx % 2 === 0 ? "#ffffff" : "#fafafa";
                      }}
                    >
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#111111",
                          fontSize: 14,
                          borderBottom: "1px solid #DDDDDD",
                          fontWeight: 500,
                        }}
                      >
                        {reg.nickname}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#333333",
                          fontSize: 13,
                          borderBottom: "1px solid #DDDDDD",
                          fontFamily: "monospace",
                        }}
                      >
                        {reg.uid}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#333333",
                          fontSize: 14,
                          borderBottom: "1px solid #DDDDDD",
                        }}
                      >
                        {reg.tournamentName}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#666666",
                          fontSize: 13,
                          borderBottom: "1px solid #DDDDDD",
                        }}
                      >
                        {new Date(reg.registeredAt).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                style={{
                  color: "#666666",
                  fontSize: 12,
                  marginTop: 8,
                  textAlign: "right",
                }}
              >
                Total: {filtered.length} registration
                {filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
