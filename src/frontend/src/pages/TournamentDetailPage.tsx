import type { Player } from "@/backend";
import { InterstitialOverlay } from "@/components/AdMobBanner";
import { AdModal } from "@/components/AdModal";
import { CheaterAutoFlagBanner } from "@/components/CheaterAutoFlagBanner";
import { CountdownTimer } from "@/components/CountdownTimer";
import { useVpnStatus } from "@/components/VpnBlocker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetCallerWallet,
  useGetLeaderboard,
  useGetTeamRegistrations,
  useGetTeams,
  useGetTournamentById,
  useRegisterTeam,
} from "@/hooks/useQueries";
import { useTokens } from "@/hooks/useTokens";
import {
  formatCurrency,
  getTournamentPlayerInfo,
  getTournamentPrizeInfo,
  getTournamentStatusLabel,
  getTournamentTypeLabel,
} from "@/utils/format";
import { fetchFFPlayerByUID } from "@/utils/freefirePlayerLookup";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  Calendar,
  DollarSign,
  Info,
  Loader2,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function TournamentDetailPage() {
  const { id } = useParams({ from: "/tournament/$id" });
  const tournamentId = BigInt(id);
  const { data: tournament, isLoading } = useGetTournamentById(tournamentId);
  const { data: wallet } = useGetCallerWallet();
  const { identity, login } = useInternetIdentity();
  const { data: teams } = useGetTeams();
  const { data: registrations } = useGetTeamRegistrations();
  const { data: leaderboard } = useGetLeaderboard(
    tournamentId,
    tournament?.status === "ongoing",
  );
  const navigate = useNavigate();
  const { isVpnDetected } = useVpnStatus();

  useEffect(() => {
    if (tournament?.status === "ongoing" && isVpnDetected) {
      toast.error("VPN detected! You have been disconnected from the match.", {
        duration: 5000,
      });
      navigate({ to: "/tournaments" });
    }
  }, [isVpnDetected, tournament?.status, navigate]);

  const tournamentRegistrations =
    registrations?.filter((r) => r.tournamentId === tournamentId) || [];
  const registeredTeamIds = new Set(
    tournamentRegistrations.map((r) => r.teamId),
  );
  const registeredTeams =
    teams?.filter((t) => registeredTeamIds.has(t.id)) || [];

  const isUserRegistered = tournamentRegistrations.some(
    (r) =>
      identity && r.captainId.toString() === identity.getPrincipal().toString(),
  );

  if (isLoading) {
    return (
      <div className="container py-12">
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="container py-12">
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Tournament not found</p>
          <Button asChild className="mt-4">
            <Link to="/tournaments">Back to Tournaments</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const hasWallet = wallet !== null && wallet !== undefined;
  const canRegister = tournament.status === "upcoming" && !isUserRegistered;
  const isFree = tournament.entryFee === 0n;
  const showRoomCredentials =
    tournament.status === "ongoing" &&
    isUserRegistered &&
    tournament.roomId &&
    tournament.roomPassword;

  return (
    <div className="container py-12 space-y-8">
      {/* Tournament Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Badge
            className={
              tournament.status === "ongoing"
                ? "bg-destructive"
                : "bg-secondary"
            }
          >
            {getTournamentStatusLabel(tournament.status)}
          </Badge>
          <Badge variant="outline">
            {getTournamentTypeLabel(tournament.tournamentType)}
          </Badge>
          {isFree && (
            <Badge
              style={{
                background: "linear-gradient(135deg, #00FF88, #00cc6a)",
                color: "#000",
                fontWeight: 700,
              }}
            >
              🎟️ FREE ENTRY
            </Badge>
          )}
        </div>
        <h1 className="text-4xl font-bold font-display mb-2">
          {tournament.name}
        </h1>
        <p className="text-muted-foreground">
          {getTournamentTypeLabel(tournament.tournamentType)} —{" "}
          {getTournamentPlayerInfo(tournament.tournamentType).description}
        </p>
      </div>

      {/* Tournament Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Start Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tournament.status === "upcoming" ? (
              <CountdownTimer targetTime={tournament.startTime} compact />
            ) : (
              <p className="text-lg font-semibold">
                {tournament.status === "ongoing" ? "Live Now" : "Completed"}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Entry Fee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold font-display">
              {isFree ? (
                <span style={{ color: "#00FF88" }}>FREE</span>
              ) : (
                formatCurrency(tournament.entryFee)
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Prize Pool
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isFree ? (
              <p className="text-lg font-bold" style={{ color: "#ffd700" }}>
                🥇🥈🥉 Badges
              </p>
            ) : (
              <p className="text-2xl font-bold font-display text-primary">
                {formatCurrency(tournament.prizePool)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Teams Registered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold font-display">
              {registeredTeams.length} / {tournament.maxTeams.toString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Room Credentials */}
      {showRoomCredentials && (
        <div
          className="rounded-2xl p-5 space-y-4"
          style={{ background: "#0d1117", border: "1.5px solid #00FF8844" }}
        >
          <p
            className="flex items-center gap-2 font-bold text-base"
            style={{ fontFamily: "Orbitron, sans-serif", color: "#00FF88" }}
          >
            🔑 MATCH DETAILS
          </p>
          {/* Room ID */}
          <div className="space-y-1">
            <p
              className="text-xs"
              style={{ color: "#888", fontFamily: "Rajdhani, sans-serif" }}
            >
              Room ID
            </p>
            <div className="flex items-center gap-3">
              <p
                className="text-xl font-mono font-bold"
                style={{ color: "#fff", letterSpacing: "0.08em" }}
              >
                {tournament.roomId}
              </p>
              <button
                type="button"
                data-ocid="room.copy_button"
                onClick={() => {
                  navigator.clipboard.writeText(tournament.roomId ?? "");
                  toast.success("✅ Copied!");
                }}
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1.5px solid #00FF88",
                  background: "#00FF8822",
                  color: "#00FF88",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                📋 COPY ROOM ID
              </button>
            </div>
          </div>
          {/* Password */}
          <div className="space-y-1">
            <p
              className="text-xs"
              style={{ color: "#888", fontFamily: "Rajdhani, sans-serif" }}
            >
              Password
            </p>
            <div className="flex items-center gap-3">
              <p
                className="text-xl font-mono font-bold"
                style={{ color: "#fff", letterSpacing: "0.08em" }}
              >
                {tournament.roomPassword}
              </p>
              <button
                type="button"
                data-ocid="password.copy_button"
                onClick={() => {
                  navigator.clipboard.writeText(tournament.roomPassword ?? "");
                  toast.success("✅ Copied!");
                }}
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1.5px solid #00FF88",
                  background: "#00FF8822",
                  color: "#00FF88",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                📋 COPY PASSWORD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="teams">Registered Teams</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Game Mode</h3>
                <p className="text-sm text-muted-foreground">
                  {getTournamentTypeLabel(tournament.tournamentType)}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" /> General Rules
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>All players must have valid Free Fire IDs</li>
                  <li>
                    Room ID and password will be shared 15 minutes before the
                    match
                  </li>
                  <li>Screenshot proof required for kills</li>
                  <li>Anti-cheat policy: Hackers will be banned permanently</li>
                  <li>Fair play is mandatory</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Prize Distribution</h3>
                {isFree ? (
                  <div
                    className="rounded-lg p-4 text-center space-y-2"
                    style={{
                      background: "rgba(255,215,0,0.08)",
                      border: "1px solid rgba(255,215,0,0.3)",
                    }}
                  >
                    <p className="font-bold text-yellow-400 text-lg">
                      🏆 Free Tournament — Winners Get Badges!
                    </p>
                    <div className="flex justify-center gap-6 text-2xl mt-2">
                      <div className="text-center">
                        <div>🥇</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          1st Place
                        </div>
                      </div>
                      <div className="text-center">
                        <div>🥈</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          2nd Place
                        </div>
                      </div>
                      <div className="text-center">
                        <div>🥉</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          3rd Place
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ₹0 prize pool — Play for glory and exclusive badges!
                    </p>
                  </div>
                ) : (
                  (() => {
                    const prizeInfo = getTournamentPrizeInfo(
                      tournament.tournamentType,
                    );
                    return (
                      <div className="space-y-3">
                        <div className="flex gap-4 text-sm">
                          <span className="text-destructive font-medium">
                            Platform Commission: {prizeInfo.commissionPct}%
                          </span>
                          <span className="text-primary font-medium">
                            Prize Pool: {prizeInfo.prizePct}%
                          </span>
                        </div>
                        {prizeInfo.prizeBreakdown.length > 0 && (
                          <div className="rounded-lg border border-primary/30 overflow-hidden">
                            <div className="bg-primary/10 px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wide">
                              Prize Breakdown
                            </div>
                            <div className="divide-y divide-border">
                              {prizeInfo.prizeBreakdown.map((item) => (
                                <div
                                  key={item.label}
                                  className="flex items-center justify-between px-3 py-2 text-sm"
                                >
                                  <div>
                                    <span className="font-medium">
                                      {item.label}
                                    </span>
                                    {item.note && (
                                      <span className="ml-2 text-xs font-bold text-primary">
                                        {item.note}
                                      </span>
                                    )}
                                  </div>
                                  <span className="font-bold text-primary">
                                    {item.pct}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()
                )}
              </div>
              {(tournament.tournamentType === "battleground" ||
                tournament.tournamentType === "custom4v4") && (
                <div>
                  <h3 className="font-semibold mb-2">Scoring System</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>1 point per kill</li>
                    <li>
                      Placement points: 1st:12, 2nd:9, 3rd:8, 4th:7, 5th:6,
                      6th:5, 7th:4, 8th:3, 9th:2, 10th:1, 11th–48th:0
                    </li>
                    <li>Total score = Kill points + Placement points</li>
                    <li>
                      Most Kills prize: minimum 6 kills zaroori — tie-breaker:
                      pehle kill wala jeets
                    </li>
                    <li>
                      Entry Fee: ₹10 per player | Total Collection: ₹480 (48
                      players)
                    </li>
                    <li>
                      Platform Commission: 35% (₹168) | Prize Pool: 65% (₹312)
                    </li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams">
          <Card>
            <CardHeader>
              <CardTitle>Registered Teams ({registeredTeams.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {registeredTeams.length > 0 ? (
                <div className="space-y-3">
                  {registeredTeams.map((team) => (
                    <div
                      key={team.id.toString()}
                      className="border border-border rounded-lg p-4"
                    >
                      <h4 className="font-semibold mb-2">{team.name}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {team.members.map((member) => (
                          <div
                            key={member.freeFireId}
                            className="flex justify-between"
                          >
                            <span className="text-muted-foreground">
                              {member.name}
                            </span>
                            <span className="font-mono">
                              {member.freeFireId}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className="text-center text-muted-foreground py-8"
                  data-ocid="teams.empty_state"
                >
                  No teams registered yet
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <CheaterAutoFlagBanner tournamentId={id} />

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Live Leaderboard</CardTitle>
              <CardDescription>
                Rankings update in real-time during the tournament
              </CardDescription>
            </CardHeader>
            <CardContent>
              {leaderboard && leaderboard.length > 0 ? (
                <div className="space-y-2">
                  {leaderboard.map((entry, idx) => {
                    const team = teams?.find((t) => t.id === entry.teamId);
                    return (
                      <div
                        key={entry.teamId.toString()}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          idx === 0
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-bold font-display text-xl ${
                              idx === 0 ? "text-primary" : ""
                            }`}
                          >
                            #{idx + 1}
                          </span>
                          <span className="font-semibold">
                            {team?.name || "Unknown Team"}
                          </span>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Kills:{" "}
                            </span>
                            <span className="font-semibold">
                              {entry.kills.toString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Points:{" "}
                            </span>
                            <span className="font-semibold text-primary">
                              {entry.totalPoints.toString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {tournament.status === "upcoming"
                    ? "Leaderboard will be available once the tournament starts"
                    : "No scores yet"}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Registration CTA */}
      {canRegister && (
        <Card
          style={{
            border: "1px solid rgba(0,255,136,0.3)",
            background: "rgba(0,255,136,0.04)",
          }}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Ready to compete?</h3>
                <p className="text-sm text-muted-foreground">
                  {isFree
                    ? "Free entry! Watch a short ad and join instantly."
                    : hasWallet
                      ? `Your wallet balance: ${formatCurrency(wallet!.balance)}`
                      : identity
                        ? "Set up your profile to create a wallet"
                        : "Login to register"}
                </p>
              </div>
              {identity ? (
                hasWallet ? (
                  <RegistrationDialog
                    tournament={tournament}
                    walletBalance={wallet!.balance}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Please complete your profile setup first to create a
                      wallet, then you can register for tournaments.
                    </p>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      <Link
                        to="/profile"
                        data-ocid="tournament.secondary_button"
                      >
                        Complete Profile Setup
                      </Link>
                    </Button>
                  </div>
                )
              ) : (
                <Button
                  onClick={login}
                  size="lg"
                  className="font-bold uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(135deg, #00FF88, #00cc6a)",
                    color: "#000",
                    boxShadow: "0 0 20px rgba(0,255,136,0.5)",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                  data-ocid="tournament.primary_button"
                >
                  🔐 Login to Register
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

type RegFlowState = "idle" | "adPlaying" | "formOpen" | "registering" | "done";
type UidFetchStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "network_error";

const FF_REGIONS = [
  { value: "ind", label: "🇮🇳 IND (India)" },
  { value: "pk", label: "🇵🇰 PK (Pakistan)" },
  { value: "id", label: "🇮🇩 ID (Indonesia)" },
  { value: "sg", label: "🇸🇬 SG (Singapore)" },
];

function RegistrationDialog({
  tournament,
  walletBalance,
}: { tournament: any; walletBalance: bigint }) {
  const isFree = tournament.entryFee === 0n;

  // Flow states
  const [flowState, setFlowState] = useState<RegFlowState>("idle");
  const [showInterstitial, setShowInterstitial] = useState(false);

  // Form fields (simplified: nickname + UID)
  const [nickname, setNickname] = useState("");
  const [uid, setUid] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const [uidError, setUidError] = useState("");

  // UID Auto-Fill states
  const [region, setRegion] = useState("ind");
  const [uidFetchStatus, setUidFetchStatus] = useState<UidFetchStatus>("idle");
  const [fetchedNickname, setFetchedNickname] = useState("");
  const [isNicknameAutoFilled, setIsNicknameAutoFilled] = useState(false);
  const [manualEntryMode, setManualEntryMode] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const tokens = useTokens();
  const registerMutation = useRegisterTeam();

  // UID validation
  const validateUid = (value: string): string => {
    if (!value.trim()) return "Free Fire UID required hai.";
    if (!/^\d+$/.test(value)) return "⚠️ UID sirf numbers mein hona chahiye.";
    if (value.length < 8 || value.length > 12)
      return "⚠️ UID 8-12 digits ka hona chahiye.";
    return "";
  };

  // Auto-fetch player info when UID reaches valid length
  useEffect(() => {
    // Clear any previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Only fetch when UID is valid length
    if (uid.length < 8 || uid.length > 12 || !/^\d+$/.test(uid)) {
      if (uid.length > 0 && uid.length < 8) {
        setUidFetchStatus("idle");
        setManualEntryMode(false);
      } else if (uid.length === 0) {
        setUidFetchStatus("idle");
        setFetchedNickname("");
        setManualEntryMode(false);
      }
      return;
    }
    setManualEntryMode(false);

    setUidFetchStatus("loading");

    debounceTimerRef.current = setTimeout(async () => {
      // Uses @spinzaf/freefire-api approach: new FreeFireAPI().getPlayerProfile(uid)
      // No API key needed — auth handled internally by the library
      const result = await fetchFFPlayerByUID(
        uid,
        region as import("@/utils/freefirePlayerLookup").FFRegion,
      );

      if (result.success && result.player?.nickname) {
        setFetchedNickname(result.player.nickname);
        setUidFetchStatus("success");
        setNickname(result.player.nickname);
        setIsNicknameAutoFilled(true);
      } else if (result.error === "network_error") {
        setUidFetchStatus("network_error");
        setFetchedNickname("");
      } else {
        // invalid_uid or unknown
        setUidFetchStatus("error");
        setFetchedNickname("");
      }
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [uid, region]);

  // Duplicate UID check per tournament
  const isUidAlreadyRegistered = (uidValue: string): boolean => {
    try {
      const key = `ke_registered_uids_${tournament.id.toString()}`;
      const stored = localStorage.getItem(key);
      const list: string[] = stored ? JSON.parse(stored) : [];
      return list.includes(uidValue);
    } catch {
      return false;
    }
  };

  const saveRegisteredUid = (uidValue: string) => {
    try {
      const key = `ke_registered_uids_${tournament.id.toString()}`;
      const stored = localStorage.getItem(key);
      const list: string[] = stored ? JSON.parse(stored) : [];
      if (!list.includes(uidValue)) {
        list.push(uidValue);
        localStorage.setItem(key, JSON.stringify(list));
      }
    } catch {
      // ignore storage errors
    }
  };

  // Step 1: Click WATCH AD & JOIN FREE → start ad
  const handleWatchAdClick = () => {
    setFlowState("adPlaying");
  };

  // Step 2: Ad completed → show form
  const handleAdComplete = () => {
    tokens.earnToken();
    toast.success("🪙 +1 Token earned!", {
      description: "Token credited! Ab registration complete karo.",
    });
    setFlowState("formOpen");
  };

  const handleAdCancel = () => {
    setFlowState("idle");
    toast.error("Ad pura nahi dekha.", {
      description: "Registration ke liye poora ad dekhna zaroori hai.",
    });
  };

  // Step 3: Form submit → register
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);

    if (!nickname.trim()) {
      toast.error("Nickname required hai.");
      return;
    }

    const uidValidationError = validateUid(uid);
    if (uidValidationError) {
      setUidError(uidValidationError);
      return;
    }

    if (isUidAlreadyRegistered(uid)) {
      setUidError("⚠️ This UID is already registered for this tournament.");
      return;
    }

    if (!confirmed) {
      toast.error("Please confirm to continue.");
      return;
    }

    if (!isFree && walletBalance < tournament.entryFee) {
      toast.error("Insufficient wallet balance.", {
        description: "Wallet mein paisa add karo phir try karo.",
      });
      return;
    }

    setFlowState("registering");

    try {
      const player: Player = { name: nickname, freeFireId: uid };
      await registerMutation.mutateAsync({
        tournamentId: tournament.id,
        teamName: nickname,
        members: [player],
        substitutes: null,
      });

      saveRegisteredUid(uid);
      setFlowState("done");

      toast.success("✅ Registration successful!", {
        description: `${nickname} tournament mein register ho gaya!`,
      });

      setShowInterstitial(true);
    } catch (error: any) {
      setFlowState("formOpen");
      let errorMessage = "Registration failed. Please try again.";
      if (error?.message) {
        if (error.message.includes("Insufficient balance")) {
          errorMessage = "Insufficient wallet balance.";
        } else if (error.message.includes("already registered")) {
          errorMessage = "You are already registered for this tournament.";
        } else if (error.message.includes("full")) {
          errorMessage = "This tournament is full.";
        } else {
          errorMessage = error.message;
        }
      }
      toast.error("Registration Failed", { description: errorMessage });
    }
  };

  const handleInterstitialDismiss = () => {
    setShowInterstitial(false);
    setTimeout(() => {
      navigate({ to: "/my-matches" });
    }, 100);
  };

  return (
    <>
      {/* Rewarded Ad Modal */}
      <AdModal
        isOpen={flowState === "adPlaying"}
        onComplete={handleAdComplete}
        onCancel={handleAdCancel}
        duration={30}
        title="Watch Ad to Join Free"
        rewardLabel="+1 Token Bonus"
      />

      {/* Post-registration interstitial */}
      <InterstitialOverlay
        isOpen={showInterstitial}
        onDismiss={handleInterstitialDismiss}
      />

      {/* Main registration flow */}
      {flowState === "idle" || flowState === "adPlaying" ? (
        /* Step 1: Show the Watch Ad & Join button */
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleWatchAdClick}
            className="relative px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, #00FF88, #00cc6a)",
              color: "#000",
              boxShadow:
                "0 0 24px rgba(0,255,136,0.6), 0 0 48px rgba(0,255,136,0.2)",
              fontFamily: "'Orbitron', sans-serif",
              minWidth: 260,
            }}
            data-ocid="tournament.primary_button"
          >
            <span className="text-xl">🎬</span>
            WATCH AD &amp; JOIN FREE
          </button>
          <p className="text-xs text-muted-foreground">
            Watch a 30-sec ad to register for free
          </p>
        </div>
      ) : (
        /* Step 2: Registration form (shown after ad completes) */
        <Dialog
          open={flowState === "formOpen" || flowState === "registering"}
          onOpenChange={(v) => {
            if (!v && flowState !== "registering") setFlowState("idle");
          }}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#00FF88",
                }}
              >
                🎮 JOIN TOURNAMENT
              </DialogTitle>
              <DialogDescription>
                Ad dekh liya! Ab apni details bhar ke register karo.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleFormSubmit} className="space-y-5 pt-2">
              {/* Free tournament badge section */}
              {isFree && (
                <div
                  className="rounded-lg p-3 flex items-center gap-3"
                  style={{
                    background: "rgba(255,215,0,0.08)",
                    border: "1px solid rgba(255,215,0,0.3)",
                  }}
                >
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="font-bold text-yellow-400 text-sm">
                      Free Tournament
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Winners get badges: 🥇🥈🥉
                    </p>
                  </div>
                </div>
              )}

              {/* Nickname */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Label htmlFor="ff-nickname" className="font-semibold">
                    Free Fire Nickname *
                  </Label>
                  {isNicknameAutoFilled && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: "rgba(0,255,136,0.15)",
                        color: "#00FF88",
                        border: "1px solid rgba(0,255,136,0.4)",
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                    >
                      ✨ Auto-filled via @spinzaf/freefire-api
                    </span>
                  )}
                  {manualEntryMode && !isNicknameAutoFilled && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: "rgba(251,191,36,0.15)",
                        color: "#fbbf24",
                        border: "1px solid rgba(251,191,36,0.4)",
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                    >
                      ✏️ Manual entry
                    </span>
                  )}
                </div>
                <Input
                  id="ff-nickname"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    // If user manually edits, clear auto-filled flag
                    if (isNicknameAutoFilled) setIsNicknameAutoFilled(false);
                  }}
                  placeholder="Enter your Free Fire nickname"
                  className={
                    formTouched && !nickname.trim()
                      ? "border-red-500 focus:border-red-500"
                      : isNicknameAutoFilled
                        ? "border-green-500"
                        : ""
                  }
                  style={isNicknameAutoFilled ? { color: "#00FF88" } : {}}
                  autoComplete="off"
                  data-ocid="tournament.input"
                />
                {formTouched && !nickname.trim() && (
                  <p className="text-xs text-red-400">
                    ❌ Nickname required hai.
                  </p>
                )}
              </div>

              {/* UID + Region Row */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ff-uid" className="font-semibold">
                    Free Fire UID *{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      (8-12 digits)
                    </span>
                  </Label>
                  {/* Region Selector */}
                  <select
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value);
                      // Re-trigger fetch on region change
                      setUidFetchStatus("idle");
                      setFetchedNickname("");
                    }}
                    aria-label="Select region"
                    data-ocid="tournament.select"
                    style={{
                      background: "#16213E",
                      border: "1px solid #00FF88",
                      color: "#00FF88",
                      borderRadius: 8,
                      padding: "4px 8px",
                      fontSize: 12,
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {FF_REGIONS.map((r) => (
                      <option
                        key={r.value}
                        value={r.value}
                        style={{ background: "#16213E", color: "#fff" }}
                      >
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  id="ff-uid"
                  value={uid}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setUid(val);
                    if (uidError) setUidError(validateUid(val));
                    // Reset auto-fill if UID changes
                    if (isNicknameAutoFilled) {
                      setIsNicknameAutoFilled(false);
                      setNickname("");
                    }
                    setFetchedNickname("");
                    if (val.length === 0) setUidFetchStatus("idle");
                  }}
                  placeholder="e.g. 123456789"
                  inputMode="numeric"
                  maxLength={12}
                  className={
                    uidError
                      ? "border-red-500 focus:border-red-500"
                      : uid.length >= 8 && uid.length <= 12
                        ? "border-green-500"
                        : ""
                  }
                  data-ocid="tournament.input"
                />

                {uidError && <p className="text-xs text-red-400">{uidError}</p>}

                {/* UID Fetch Status Display */}
                {!uidError && uid.length >= 8 && (
                  <div
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {uidFetchStatus === "loading" && (
                      <div
                        className="flex items-center gap-2"
                        data-ocid="tournament.loading_state"
                        style={{ color: "#fbbf24" }}
                      >
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>⏳ Fetching player info...</span>
                      </div>
                    )}

                    {uidFetchStatus === "success" && fetchedNickname && (
                      <div
                        className="flex items-center gap-2"
                        data-ocid="tournament.success_state"
                        style={{ color: "#00FF88" }}
                      >
                        <span>✅ Player: {fetchedNickname}</span>
                      </div>
                    )}

                    {uidFetchStatus === "error" && (
                      <div
                        data-ocid="tournament.error_state"
                        className="flex flex-col gap-1"
                        style={{ color: "#f87171" }}
                      >
                        <span>
                          ❌ Invalid UID. Please try again or enter manually.
                        </span>
                        {!manualEntryMode && (
                          <button
                            type="button"
                            onClick={() => setManualEntryMode(true)}
                            style={{
                              color: "#fbbf24",
                              fontSize: 11,
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                              textAlign: "left",
                              textDecoration: "underline",
                              fontFamily: "'Rajdhani', sans-serif",
                            }}
                          >
                            ✏️ Enter nickname manually instead
                          </button>
                        )}
                      </div>
                    )}

                    {uidFetchStatus === "network_error" && (
                      <div
                        data-ocid="tournament.error_state"
                        className="flex flex-col gap-1"
                        style={{ color: "#fb923c" }}
                      >
                        <span>
                          ❌ Unable to fetch via @spinzaf/freefire-api. Enter
                          nickname manually.
                        </span>
                        {!manualEntryMode && (
                          <button
                            type="button"
                            onClick={() => setManualEntryMode(true)}
                            style={{
                              color: "#fbbf24",
                              fontSize: 11,
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                              textAlign: "left",
                              textDecoration: "underline",
                              fontFamily: "'Rajdhani', sans-serif",
                            }}
                          >
                            ✏️ Enter nickname manually instead
                          </button>
                        )}
                      </div>
                    )}

                    {uidFetchStatus === "idle" &&
                      uid.length >= 8 &&
                      uid.length <= 12 && (
                        <p className="text-xs text-green-400">✅ Valid UID</p>
                      )}
                  </div>
                )}
              </div>

              {/* Confirm checkbox */}
              <div className="flex items-start gap-3 pt-1">
                <Checkbox
                  id="confirm"
                  checked={confirmed}
                  onCheckedChange={(checked) =>
                    setConfirmed(checked as boolean)
                  }
                  data-ocid="tournament.checkbox"
                />
                <Label
                  htmlFor="confirm"
                  className="text-sm cursor-pointer leading-relaxed"
                >
                  I confirm that the above details are correct and I agree to
                  the tournament rules.
                </Label>
              </div>
              {formTouched && !confirmed && (
                <p className="text-xs text-red-400 -mt-3">
                  ❌ Please confirm to proceed.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={flowState === "registering"}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-base transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background:
                    flowState === "registering"
                      ? "#5a2d91"
                      : "linear-gradient(135deg, #9d4edd, #7b2fbf)",
                  color: "#fff",
                  boxShadow:
                    flowState === "registering"
                      ? "none"
                      : "0 0 20px rgba(157,78,221,0.5)",
                  fontFamily: "'Orbitron', sans-serif",
                }}
                data-ocid="tournament.submit_button"
              >
                {flowState === "registering"
                  ? "⏳ Registering..."
                  : "✅ COMPLETE REGISTRATION"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
