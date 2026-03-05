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
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
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
  MapPin,
  Swords,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── Helpers ──────────────────────────────────────────────────────────────────

function startTimeMs(t: Tournament): number {
  return Number(t.startTime) / 1_000_000;
}

function isRoomVisible(t: Tournament): boolean {
  const now = Date.now();
  const start = startTimeMs(t);
  return now >= start && !!t.roomId;
}

function isStartingSoon(t: Tournament): boolean {
  const now = Date.now();
  const start = startTimeMs(t);
  return now >= start - 15 * 60 * 1000 && now < start;
}

function perKillDisplay(t: Tournament): string {
  const type = t.tournamentType as string;
  if (type === "battleground") {
    // 10% of prize pool / 48 players (in paise), convert to rupees
    const perKillPaise = Math.round((Number(t.prizePool) * 0.1) / 48);
    if (perKillPaise <= 0) return "—";
    return `₹${(perKillPaise / 100).toFixed(2)}/kill`;
  }
  return "—";
}

function getSlotInfo(tournamentId: bigint): string {
  return localStorage.getItem(`roomSlot_${tournamentId.toString()}`) ?? "";
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

  const slotInfo = getSlotInfo(tournament.id);

  const handleCopy = async (text: string, field: "roomId" | "password") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success("Copied!", {
        description: field === "roomId" ? "Room ID copied" : "Password copied",
        duration: 2000,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm"
        data-ocid="room_details.dialog"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.10 0.03 285), oklch(0.08 0.025 285))",
          border: "1px solid oklch(0.70 0.20 160 / 0.35)",
          boxShadow:
            "0 0 40px oklch(0.70 0.20 160 / 0.12), 0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-display font-bold text-foreground leading-tight">
            {tournament.name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            {formatDateTime(tournament.startTime)}
          </p>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Prize Pool */}
          <div
            className="flex items-center justify-between px-3 py-2 rounded-lg"
            style={{ background: "oklch(0.14 0.03 285 / 0.8)" }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="h-4 w-4 text-yellow-400" />
              Prize Pool
            </div>
            <span className="font-bold text-yellow-300 font-display">
              {formatCurrency(tournament.prizePool)}
            </span>
          </div>

          {/* Room ID */}
          <div
            className="rounded-xl p-4 space-y-1"
            style={{
              background: "oklch(0.12 0.05 195 / 0.25)",
              border: "1px solid oklch(0.75 0.18 195 / 0.25)",
            }}
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <KeyRound className="h-3.5 w-3.5 text-primary" />
              Room ID
            </div>
            <p
              className="font-mono text-2xl font-bold tracking-wider text-primary"
              style={{ letterSpacing: "0.15em" }}
            >
              {tournament.roomId ?? "—"}
            </p>
          </div>

          {/* Room Password */}
          <div
            className="rounded-xl p-4 space-y-1"
            style={{
              background: "oklch(0.12 0.05 345 / 0.2)",
              border: "1px solid oklch(0.62 0.25 345 / 0.25)",
            }}
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Lock className="h-3.5 w-3.5 text-secondary" />
              Room Password
            </div>
            <p
              className="font-mono text-2xl font-bold tracking-widest text-secondary"
              style={{ letterSpacing: "0.2em" }}
            >
              {tournament.roomPassword ?? "—"}
            </p>
          </div>

          {/* Slot Info (if set by admin) */}
          {slotInfo && (
            <div
              className="rounded-xl p-3 flex items-center gap-3"
              style={{
                background: "oklch(0.12 0.05 285 / 0.3)",
                border: "1px solid oklch(0.65 0.22 285 / 0.25)",
              }}
            >
              <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Your Slot</p>
                <p className="font-mono font-bold text-accent">{slotInfo}</p>
              </div>
            </div>
          )}

          {/* Copy Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              data-ocid="room_details.copy_room_id.button"
              className="border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-primary gap-2 font-mono"
              onClick={() =>
                tournament.roomId && handleCopy(tournament.roomId, "roomId")
              }
              disabled={!tournament.roomId}
            >
              {copiedField === "roomId" ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-3.5 w-3.5" />
                  Copy ID
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              data-ocid="room_details.copy_password.button"
              className="border-secondary/30 hover:border-secondary/60 hover:bg-secondary/10 text-secondary gap-2 font-mono"
              onClick={() =>
                tournament.roomPassword &&
                handleCopy(tournament.roomPassword, "password")
              }
              disabled={!tournament.roomPassword}
            >
              {copiedField === "password" ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-3.5 w-3.5" />
                  Copy Pass
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── MatchCard ─────────────────────────────────────────────────────────────────

interface MatchCardProps {
  tournament: Tournament;
  registeredCount: number;
  index: number;
}

function MatchCard({ tournament, registeredCount, index }: MatchCardProps) {
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);

  const isLive = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";
  const roomActive = isRoomVisible(tournament);
  const startingSoon = isStartingSoon(tournament);

  return (
    <>
      <Card
        data-ocid={`my_matches.card.${index}`}
        className="rounded-xl border-border/40 bg-card/50 p-0 overflow-hidden transition-all duration-300"
        style={
          isLive
            ? {
                boxShadow:
                  "0 0 20px oklch(0.75 0.18 195 / 0.3), 0 0 1px oklch(0.75 0.18 195 / 0.6)",
                border: "1px solid oklch(0.75 0.18 195 / 0.45)",
              }
            : { border: "1px solid oklch(0.25 0.05 285 / 0.6)" }
        }
      >
        <CardContent className="p-4 md:p-5">
          {/* Top row: name + starting-soon indicator */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              {/* Status + Starting Soon badges */}
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <Badge
                  className={
                    isLive
                      ? "bg-primary/20 text-primary border border-primary/40 uppercase text-[10px] tracking-widest"
                      : isCompleted
                        ? "bg-muted text-muted-foreground uppercase text-[10px] tracking-widest"
                        : "bg-secondary/20 text-secondary border border-secondary/40 uppercase text-[10px] tracking-widest"
                  }
                >
                  {isLive ? "🔴 Live" : isCompleted ? "Completed" : "Upcoming"}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[10px] tracking-wide uppercase border-border/50 text-muted-foreground"
                >
                  {getTournamentTypeLabel(tournament.tournamentType)}
                </Badge>
                {startingSoon && (
                  <span className="flex items-center gap-1.5 text-yellow-400 text-xs font-semibold">
                    <span
                      className="h-2 w-2 rounded-full bg-yellow-400"
                      style={{
                        animation:
                          "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite",
                      }}
                    />
                    Starting Soon!
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-base md:text-lg leading-tight truncate">
                {tournament.name}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                <Calendar className="h-3 w-3 flex-shrink-0" />
                {formatDateTime(tournament.startTime)}
              </p>
            </div>

            {/* Joined badge */}
            <Badge className="bg-green-600/80 text-white border-0 shrink-0 mt-0.5">
              ✓ Joined
            </Badge>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-2 my-3 py-3 rounded-lg"
            style={{ background: "oklch(0.10 0.02 285 / 0.7)" }}
          >
            <div className="text-center px-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                Prize Pool
              </p>
              <p className="font-bold font-mono text-sm text-yellow-300">
                {formatCurrency(tournament.prizePool)}
              </p>
            </div>
            <div className="text-center px-1 border-x border-border/30">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                Per Kill
              </p>
              <p className="font-bold font-mono text-sm text-primary">
                {perKillDisplay(tournament)}
              </p>
            </div>
            <div className="text-center px-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                Teams
              </p>
              <p className="font-bold font-mono text-sm text-foreground">
                {registeredCount}/
                <span className="text-muted-foreground">
                  {tournament.maxTeams.toString()}
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Room ID & Password button */}
            <Button
              size="sm"
              data-ocid={`my_matches.room_button.${index}`}
              disabled={!roomActive}
              onClick={() => setRoomDialogOpen(true)}
              className={
                roomActive
                  ? "flex-1 bg-green-600/90 hover:bg-green-500 text-white border-0 gap-2 font-semibold"
                  : "flex-1 gap-2 font-semibold"
              }
              variant={roomActive ? "default" : "outline"}
              style={
                roomActive
                  ? {
                      boxShadow: "0 0 12px oklch(0.70 0.20 160 / 0.4)",
                    }
                  : { opacity: 0.5 }
              }
            >
              <KeyRound className="h-3.5 w-3.5" />
              Room ID & Password
            </Button>

            {/* Results button */}
            <Button
              size="sm"
              data-ocid={`my_matches.results_button.${index}`}
              disabled={!isCompleted}
              variant={isCompleted ? "default" : "outline"}
              asChild={isCompleted}
              className={
                isCompleted
                  ? "gap-2 font-semibold"
                  : "gap-2 font-semibold opacity-50"
              }
            >
              {isCompleted ? (
                <Link
                  to="/tournament/$id"
                  params={{ id: tournament.id.toString() }}
                >
                  <Trophy className="h-3.5 w-3.5" />
                  Results
                </Link>
              ) : (
                <span className="flex items-center gap-2">
                  <Trophy className="h-3.5 w-3.5" />
                  Results
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {roomActive && (
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
  const { identity, login } = useInternetIdentity();
  const { data: myRegistrations, isLoading: regLoading } =
    useGetCallerTeamRegistrations();
  const { data: tournaments, isLoading: tournLoading } = useGetTournaments();
  const { data: allRegistrations } = useGetTeamRegistrations();

  const isLoading = regLoading || tournLoading;

  // Build a map: tournamentId → number of registered teams
  const regCountMap = new Map<string, number>();
  if (allRegistrations) {
    for (const r of allRegistrations) {
      const key = r.tournamentId.toString();
      regCountMap.set(key, (regCountMap.get(key) ?? 0) + 1);
    }
  }

  // Find tournaments for user's registrations
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

  if (!identity) {
    return (
      <div
        className="container py-16 text-center space-y-6"
        data-ocid="my_matches.page"
      >
        <div
          className="mx-auto w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.12 0.05 195 / 0.3)",
            border: "1px solid oklch(0.75 0.18 195 / 0.3)",
          }}
        >
          <Swords className="h-9 w-9 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-display">My Matches</h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Login to view your registered tournaments and access room
            credentials.
          </p>
        </div>
        <Button
          onClick={login}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
        >
          Login to View Matches
        </Button>
      </div>
    );
  }

  return (
    <div
      className="container py-8 md:py-12 space-y-8"
      data-ocid="my_matches.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "oklch(0.12 0.06 195 / 0.4)",
            border: "1px solid oklch(0.75 0.18 195 / 0.4)",
          }}
        >
          <Swords className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-display">
            My Matches
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your registered tournaments — access room details and results here
          </p>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4" data-ocid="my_matches.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && myTournaments.length === 0 && (
        <div
          className="py-16 text-center space-y-5"
          data-ocid="my_matches.empty_state"
        >
          <div
            className="mx-auto w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.12 0.05 285 / 0.4)",
              border: "1px solid oklch(0.25 0.05 285 / 0.6)",
            }}
          >
            <Zap className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-muted-foreground">
              No Matches Yet
            </p>
            <p className="text-sm text-muted-foreground/70">
              Register for a tournament to see it here!
            </p>
          </div>
          <Button asChild variant="outline" className="border-primary/30">
            <Link to="/tournaments">Browse Tournaments</Link>
          </Button>
        </div>
      )}

      {/* Match Cards */}
      {!isLoading && myTournaments.length > 0 && (
        <div className="space-y-4">
          {/* Sort: live first, then upcoming, then completed */}
          {[...myTournaments]
            .sort((a, b) => {
              const order = { ongoing: 0, upcoming: 1, completed: 2 };
              const ao = order[a.tournament.status as keyof typeof order] ?? 3;
              const bo = order[b.tournament.status as keyof typeof order] ?? 3;
              if (ao !== bo) return ao - bo;
              return startTimeMs(b.tournament) - startTimeMs(a.tournament);
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
    </div>
  );
}
