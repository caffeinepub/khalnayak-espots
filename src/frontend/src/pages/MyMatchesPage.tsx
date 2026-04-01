import type { Tournament } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetCallerTeamRegistrations,
  useGetTeamRegistrations,
  useGetTournaments,
} from "@/hooks/useQueries";
import {
  formatCurrency,
  formatDateTime,
  getTournamentTypeLabel,
} from "@/utils/format";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  ClipboardCopy,
  KeyRound,
  Lock,
  Swords,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const YOUTUBE_URL = "https://www.youtube.com/@KL_Tournaments";

// ── Helpers ───────────────────────────────────────────────────────────────────
type FreeMyMatch = {
  tournamentId: string;
  name: string;
  mode: string;
  prizePool: string;
  registeredAt: number;
  nickname: string;
  uid: string;
};
function loadFreeMyMatches(): FreeMyMatch[] {
  try {
    return JSON.parse(localStorage.getItem("ke_free_my_matches") || "[]");
  } catch {
    return [];
  }
}
function getFreeMatchTime(id: string): string {
  return localStorage.getItem(`freeMatchTime_${id}`) || "";
}
function getFreeMatchStatus(id: string): string {
  const started = localStorage.getItem(`freeMatchStarted_${id}`) === "true";
  return started ? "Live" : "Upcoming";
}
function getFreeRoomId(id: string): string {
  return localStorage.getItem(`freeRoomId_${id}`) || "";
}
function getFreeRoomPassword(id: string): string {
  return localStorage.getItem(`freeRoomPassword_${id}`) || "";
}

// ── FreeMatchCard ──────────────────────────────────────────────────────────────
function FreeMatchCard({
  match,
  index,
}: { match: FreeMyMatch; index: number }) {
  const [roomOpen, setRoomOpen] = useState(false);
  const timeStr = getFreeMatchTime(match.tournamentId);
  const status = getFreeMatchStatus(match.tournamentId);
  const roomId = getFreeRoomId(match.tournamentId);
  const roomPass = getFreeRoomPassword(match.tournamentId);
  const isLive = status === "Live";

  const formattedTime = timeStr
    ? new Date(timeStr).toLocaleString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Time TBD";

  return (
    <>
      <div
        data-ocid={`free_match.card.${index}`}
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          boxShadow: isLive
            ? "0 4px 16px rgba(255,68,68,0.15)"
            : "0 4px 16px rgba(0,0,0,0.08)",
          border: isLive
            ? "1px solid rgba(255,68,68,0.4)"
            : "1px solid #e5e7eb",
          padding: 20,
          marginBottom: 16,
          transition: "all 0.2s ease",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 14,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  background: isLive
                    ? "rgba(255,68,68,0.15)"
                    : "rgba(59,130,246,0.15)",
                  color: isLive ? "#FF4444" : "#3B82F6",
                  border: `1px solid ${isLive ? "rgba(255,68,68,0.4)" : "rgba(59,130,246,0.4)"}`,
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {isLive && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#FF4444",
                      display: "inline-block",
                      animation: "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite",
                    }}
                  />
                )}
                {isLive ? "LIVE" : "UPCOMING"}
              </span>
              <span
                style={{
                  background: "#00FF88",
                  color: "#000000",
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontSize: 10,
                  fontWeight: 800,
                  boxShadow: "0 0 8px rgba(0,255,136,0.4)",
                }}
              >
                🎁 FREE
              </span>
            </div>
            <h3
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: "#000000",
                fontWeight: 700,
                fontSize: 17,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              🎮 {match.name}
            </h3>
          </div>
        </div>

        {/* Info grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            background: "#f9fafb",
            borderRadius: 12,
            padding: 14,
            marginBottom: 14,
            border: "1px solid #e5e7eb",
            fontSize: 13,
          }}
        >
          <div>
            <span style={{ color: "#666666", display: "block", fontSize: 11 }}>
              📅 Date
            </span>
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {formattedTime}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", display: "block", fontSize: 11 }}>
              👥 Format
            </span>
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {match.mode}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", display: "block", fontSize: 11 }}>
              💰 Prize
            </span>
            <span style={{ color: "#00FF88", fontWeight: 700 }}>
              {match.prizePool}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", display: "block", fontSize: 11 }}>
              🆔 UID
            </span>
            <span
              style={{
                color: "#111827",
                fontFamily: "monospace",
                fontWeight: 600,
              }}
            >
              {match.uid}
            </span>
          </div>
          <div className="col-span-2">
            <span style={{ color: "#666666", display: "block", fontSize: 11 }}>
              👤 Player
            </span>
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {match.nickname}
            </span>
          </div>
        </div>

        {/* Room details if available */}
        {roomId && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #d1fae5",
              borderRadius: 10,
              padding: 12,
              marginBottom: 14,
              fontSize: 13,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span style={{ color: "#666666" }}>Room ID</span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {roomId}
              </span>
            </div>
            {roomPass && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#666666" }}>Password</span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {roomPass}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={() => window.open(YOUTUBE_URL, "_blank")}
            style={{
              flex: 1,
              background: isLive ? "#EF4444" : "#f1f5f9",
              color: isLive ? "#FFFFFF" : "#94a3b8",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
            data-ocid={`free_match.live_button.${index}`}
          >
            🔗 LIVE
          </button>
          <button
            type="button"
            onClick={() => roomId && setRoomOpen(true)}
            disabled={!roomId}
            style={{
              flex: 1,
              background: roomId ? "#3B82F6" : "#f1f5f9",
              color: roomId ? "#FFFFFF" : "#94a3b8",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: roomId ? "pointer" : "not-allowed",
              fontFamily: "'Orbitron', sans-serif",
            }}
            data-ocid={`free_match.room_button.${index}`}
          >
            📊 RESULTS
          </button>
        </div>
      </div>

      {/* Room popup */}
      <Dialog open={roomOpen} onOpenChange={setRoomOpen}>
        <DialogContent
          className="max-w-sm"
          data-ocid="free_room_details.dialog"
          style={{ background: "#fff", border: "1px solid #e5e7eb" }}
        >
          <DialogHeader>
            <DialogTitle
              style={{ fontFamily: "'Orbitron', sans-serif", color: "#000" }}
            >
              🔑 {match.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #d1fae5",
                borderRadius: 10,
                padding: 14,
              }}
            >
              <p style={{ color: "#666666", fontSize: 12, marginBottom: 4 }}>
                Room ID
              </p>
              <p
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#111827",
                }}
              >
                {roomId}
              </p>
            </div>
            {roomPass && (
              <div
                style={{
                  background: "#faf5ff",
                  border: "1px solid #e9d5ff",
                  borderRadius: 10,
                  padding: 14,
                }}
              >
                <p style={{ color: "#666666", fontSize: 12, marginBottom: 4 }}>
                  Password
                </p>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "#111827",
                  }}
                >
                  {roomPass}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ── RoomDetailsDialog ─────────────────────────────────────────────────────────
interface RoomDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournament: Tournament;
}

function RoomDetailsDialog({
  open,
  onOpenChange,
  tournament,
}: RoomDetailsDialogProps) {
  const [copiedField, setCopiedField] = useState<"roomId" | "password" | null>(
    null,
  );

  const handleCopy = async (text: string, field: "roomId" | "password") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success("Copied!", { duration: 2000 });
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Copy failed.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm"
        data-ocid="room_details.dialog"
        style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}
      >
        <DialogHeader>
          <DialogTitle
            style={{ fontFamily: "'Orbitron', sans-serif", color: "#000" }}
          >
            🔑 {tournament.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #d1fae5",
              borderRadius: 12,
              padding: 14,
            }}
          >
            <p style={{ color: "#666666", fontSize: 12, marginBottom: 4 }}>
              Room ID
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#111827",
                }}
              >
                {tournament.roomId ?? "—"}
              </p>
              <Button
                size="sm"
                variant="outline"
                data-ocid="room_details.copy_room_id.button"
                style={{ borderColor: "#00FF88", color: "#00AA55" }}
                onClick={() =>
                  tournament.roomId && handleCopy(tournament.roomId, "roomId")
                }
                disabled={!tournament.roomId}
              >
                {copiedField === "roomId" ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
          <div
            style={{
              background: "#faf5ff",
              border: "1px solid #e9d5ff",
              borderRadius: 12,
              padding: 14,
            }}
          >
            <p style={{ color: "#666666", fontSize: 12, marginBottom: 4 }}>
              Password
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#111827",
                }}
              >
                {tournament.roomPassword ?? "—"}
              </p>
              <Button
                size="sm"
                variant="outline"
                data-ocid="room_details.copy_password.button"
                style={{ borderColor: "#9d4edd", color: "#9d4edd" }}
                onClick={() =>
                  tournament.roomPassword &&
                  handleCopy(tournament.roomPassword, "password")
                }
                disabled={!tournament.roomPassword}
              >
                {copiedField === "password" ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── MatchCard ─────────────────────────────────────────────────────────────────
function MatchCard({
  tournament,
  registeredCount,
  index,
}: { tournament: Tournament; registeredCount: number; index: number }) {
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);

  const isLive = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";
  const startMs = Number(tournament.startTime) / 1_000_000;
  const hasRoom = !!tournament.roomId;

  const formattedTime = new Date(startMs).toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusBadgeStyle = isLive
    ? {
        background: "rgba(255,68,68,0.15)",
        color: "#FF4444",
        border: "1px solid rgba(255,68,68,0.4)",
      }
    : isCompleted
      ? {
          background: "rgba(107,114,128,0.15)",
          color: "#6B7280",
          border: "1px solid rgba(107,114,128,0.4)",
        }
      : {
          background: "rgba(59,130,246,0.15)",
          color: "#3B82F6",
          border: "1px solid rgba(59,130,246,0.4)",
        };

  return (
    <>
      <div
        data-ocid={`my_matches.card.${index}`}
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          boxShadow: isLive
            ? "0 4px 20px rgba(255,68,68,0.12)"
            : "0 4px 16px rgba(0,0,0,0.08)",
          border: isLive
            ? "1px solid rgba(255,68,68,0.35)"
            : "1px solid #e5e7eb",
          padding: 20,
          marginBottom: 16,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.01)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 24px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = isLive
            ? "0 4px 20px rgba(255,68,68,0.12)"
            : "0 4px 16px rgba(0,0,0,0.08)";
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 14,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  ...statusBadgeStyle,
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {isLive && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#FF4444",
                      display: "inline-block",
                      animation: "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite",
                    }}
                  />
                )}
                {isLive ? "LIVE" : isCompleted ? "✅ DONE" : "⏰ UPCOMING"}
              </span>
              <span
                style={{
                  background: "rgba(157,78,221,0.15)",
                  color: "#9d4edd",
                  border: "1px solid rgba(157,78,221,0.3)",
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                💰 PAID
              </span>
              <Badge variant="outline" className="text-[10px] uppercase">
                {getTournamentTypeLabel(tournament.tournamentType)}
              </Badge>
            </div>
            <h3
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: "#000000",
                fontWeight: 700,
                fontSize: 17,
                textTransform: "uppercase",
              }}
            >
              🎮 {tournament.name}
            </h3>
          </div>
          <Badge className="bg-green-600/80 text-white border-0 shrink-0 mt-0.5">
            ✓ Joined
          </Badge>
        </div>

        {/* Info grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            background: "#f9fafb",
            borderRadius: 12,
            padding: 14,
            marginBottom: 14,
            border: "1px solid #e5e7eb",
            fontSize: 13,
          }}
        >
          <div>
            <span style={{ color: "#666666", display: "block", fontSize: 11 }}>
              📅 Date
            </span>
            <span style={{ color: "#111827", fontWeight: 600, fontSize: 12 }}>
              {formattedTime}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", display: "block", fontSize: 11 }}>
              👥 Format
            </span>
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {getTournamentTypeLabel(tournament.tournamentType)}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", display: "block", fontSize: 11 }}>
              💰 Prize
            </span>
            <span style={{ color: "#00FF88", fontWeight: 700 }}>
              {formatCurrency(tournament.prizePool)}
            </span>
          </div>
          <div>
            <span style={{ color: "#666666", display: "block", fontSize: 11 }}>
              👥 Teams
            </span>
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {registeredCount}/{tournament.maxTeams.toString()}
            </span>
          </div>
        </div>

        {/* Room credentials if available */}
        {hasRoom && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #d1fae5",
              borderRadius: 10,
              padding: 12,
              marginBottom: 14,
              fontSize: 13,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ color: "#666666" }}>Room ID</span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {tournament.roomId}
              </span>
            </div>
            {tournament.roomPassword && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666666" }}>Password</span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {tournament.roomPassword}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={() => window.open(YOUTUBE_URL, "_blank")}
            style={{
              flex: 1,
              background: isLive ? "#EF4444" : "#f1f5f9",
              color: isLive ? "#FFFFFF" : "#94a3b8",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
            data-ocid={`my_matches.live_button.${index}`}
          >
            🔗 LIVE
          </button>

          {hasRoom ? (
            <button
              type="button"
              onClick={() => setRoomDialogOpen(true)}
              style={{
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
              }}
              data-ocid={`my_matches.room_button.${index}`}
            >
              🔑 ROOM DETAILS
            </button>
          ) : isCompleted ? (
            <Link
              to="/tournament/$id"
              params={{ id: tournament.id.toString() }}
              style={{
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
                gap: 6,
              }}
              data-ocid={`my_matches.results_button.${index}`}
            >
              <Trophy className="h-3.5 w-3.5" />📊 RESULTS
            </Link>
          ) : (
            <button
              type="button"
              disabled
              style={{
                flex: 1,
                background: "#f1f5f9",
                color: "#94a3b8",
                border: "none",
                borderRadius: 10,
                padding: "10px 0",
                fontWeight: 700,
                fontSize: 12,
                cursor: "not-allowed",
                fontFamily: "'Orbitron', sans-serif",
              }}
              data-ocid={`my_matches.results_button.${index}`}
            >
              📊 RESULTS
            </button>
          )}
        </div>
      </div>

      {hasRoom && (
        <RoomDetailsDialog
          open={roomDialogOpen}
          onOpenChange={setRoomDialogOpen}
          tournament={tournament}
        />
      )}
    </>
  );
}

// ── MyMatchesPage ─────────────────────────────────────────────────────────────
export function MyMatchesPage() {
  const [freeMatches] = useState<FreeMyMatch[]>(() => loadFreeMyMatches());
  const { data: myRegistrations, isLoading: regLoading } =
    useGetCallerTeamRegistrations();
  const { data: tournaments, isLoading: tournLoading } = useGetTournaments();
  const { data: allRegistrations } = useGetTeamRegistrations();

  const isLoading = regLoading || tournLoading;

  const regCountMap = new Map<string, number>();
  if (allRegistrations) {
    for (const r of allRegistrations) {
      const key = r.tournamentId.toString();
      regCountMap.set(key, (regCountMap.get(key) ?? 0) + 1);
    }
  }

  const myTournaments: Array<{ tournament: Tournament; index: number }> = [];
  if (myRegistrations && tournaments) {
    const seen = new Set<string>();
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

  return (
    <div
      className="container py-8 md:py-12 space-y-8"
      data-ocid="my_matches.page"
      style={{ minHeight: "100vh", background: "#FFFFFF", paddingBottom: 100 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgba(0,255,136,0.12)",
            border: "1px solid rgba(0,255,136,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Swords className="h-5 w-5" style={{ color: "#00FF88" }} />
        </div>
        <div>
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#000000",
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            ⚔️ My Matches
          </h1>
          <p style={{ color: "#666666", fontSize: 14, marginTop: 2 }}>
            Your registered tournaments — access room details and results here
          </p>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4" data-ocid="my_matches.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-64 w-full rounded-2xl"
              style={{ background: "#F0F0F0" }}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && myTournaments.length === 0 && freeMatches.length === 0 && (
        <div
          className="py-16 text-center space-y-5"
          data-ocid="my_matches.empty_state"
        >
          <div
            style={{
              margin: "0 auto",
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#F5F5F5",
              border: "1px solid #E0E0E0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap className="h-7 w-7" style={{ color: "#CCCCCC" }} />
          </div>
          <div>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#333333" }}>
              No Matches Yet
            </p>
            <p style={{ fontSize: 14, color: "#888888", marginTop: 4 }}>
              Register for a tournament to see it here!
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            style={{ borderColor: "#00FF88", color: "#00AA55" }}
          >
            <Link to="/tournaments">Browse Tournaments</Link>
          </Button>
        </div>
      )}

      {/* Paid Tournament Matches */}
      {!isLoading && myTournaments.length > 0 && (
        <div className="space-y-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                color: "#9d4edd",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              💰 PAID TOURNAMENTS
            </span>
          </div>
          {[...myTournaments]
            .sort((a, b) => {
              const order = { ongoing: 0, upcoming: 1, completed: 2 };
              const ao = order[a.tournament.status as keyof typeof order] ?? 3;
              const bo = order[b.tournament.status as keyof typeof order] ?? 3;
              if (ao !== bo) return ao - bo;
              return (
                Number(b.tournament.startTime) / 1_000_000 -
                Number(a.tournament.startTime) / 1_000_000
              );
            })
            .map(({ tournament, index }) => (
              <MatchCard
                key={tournament.id.toString()}
                tournament={tournament}
                registeredCount={regCountMap.get(tournament.id.toString()) ?? 0}
                index={index}
              />
            ))}
        </div>
      )}

      {/* Free Tournament Matches */}
      {freeMatches.length > 0 && (
        <div className="space-y-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                color: "#00FF88",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              🎁 FREE TOURNAMENTS
            </span>
          </div>
          {freeMatches.map((match, i) => (
            <FreeMatchCard
              key={`${match.tournamentId}-${match.uid}`}
              match={match}
              index={i + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
