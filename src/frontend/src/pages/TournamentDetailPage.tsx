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
  DialogTrigger,
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
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  Calendar,
  Coins,
  DollarSign,
  Info,
  Shield,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
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

  // VPN mid-match disconnect
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
              {formatCurrency(tournament.entryFee)}
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
            <p className="text-2xl font-bold font-display text-primary">
              {formatCurrency(tournament.prizePool)}
            </p>
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

      {/* Room Credentials (for registered users in ongoing tournaments) */}
      {showRoomCredentials && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" />
              Room Credentials
            </CardTitle>
            <CardDescription>
              Join the tournament using these credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Room ID</Label>
              <p className="text-xl font-mono font-bold">{tournament.roomId}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Password</Label>
              <p className="text-xl font-mono font-bold">
                {tournament.roomPassword}
              </p>
            </div>
          </CardContent>
        </Card>
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
                {(() => {
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
                                    <span className="ml-2 text-xs text-muted-foreground">
                                      ({item.note})
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
                })()}
              </div>
              {(tournament.tournamentType === "battleground" ||
                tournament.tournamentType === "custom4v4") && (
                <div>
                  <h3 className="font-semibold mb-2">Scoring System</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>1 point per kill</li>
                    <li>
                      Placement points: 1st (12pts), 2nd (9pts), 3rd (8pts), 4th
                      (7pts), 5th (6pts), etc.
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
                <p className="text-center text-muted-foreground py-8">
                  No teams registered yet
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          {/* Auto-cheat banner — shown when a player in this tournament is flagged */}
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
                            className={`font-bold font-display text-xl ${idx === 0 ? "text-primary" : ""}`}
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
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Ready to compete?</h3>
                <p className="text-sm text-muted-foreground">
                  {hasWallet
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
                  className="bg-primary hover:bg-primary/90"
                  data-ocid="tournament.primary_button"
                >
                  Login to Register
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Returns number of player fields to show based on tournament type
function getRequiredPlayers(tournamentType: string): number {
  switch (tournamentType) {
    case "custom1v1":
      return 1;
    case "custom2v2":
      return 2;
    case "battleground":
      return 4;
    case "custom4v4":
      return 4;
    default:
      return 4;
  }
}

function getTeamNameLabel(tournamentType: string): string {
  switch (tournamentType) {
    case "custom1v1":
      return "Player Name";
    default:
      return "Team Name";
  }
}

type RegFlowState = "idle" | "adPlaying" | "registering" | "done";

function RegistrationDialog({
  tournament,
  walletBalance,
}: { tournament: any; walletBalance: bigint }) {
  const [open, setOpen] = useState(false);
  const [flowState, setFlowState] = useState<RegFlowState>("idle");
  // Post-registration interstitial state
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [teamName, setTeamName] = useState("");
  const requiredPlayers = getRequiredPlayers(tournament.tournamentType);
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: requiredPlayers }, () => ({
      name: "",
      freeFireId: "",
    })),
  );
  const [substitute, setSubstitute] = useState<Player>({
    name: "",
    freeFireId: "",
  });
  const [includeSubstitute, setIncludeSubstitute] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const tokens = useTokens();

  const registerMutation = useRegisterTeam();

  const hasSubstituteData =
    substitute.name.trim() !== "" && substitute.freeFireId.trim() !== "";
  const sufficientBalance = walletBalance >= tournament.entryFee;
  const allPlayersFilled = players.every(
    (p) => p.name.trim() !== "" && p.freeFireId.trim() !== "",
  );
  const is1v1 = tournament.tournamentType === "custom1v1";
  const canSubmit =
    (is1v1 ? teamName.trim() !== "" : teamName.trim() !== "") &&
    allPlayersFilled &&
    agreedToTerms &&
    sufficientBalance;

  // When form is submitted, show ad first
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // Start the ad-gate flow
    setFlowState("adPlaying");
  };

  // Ad completed → earn token + register
  const handleAdComplete = async () => {
    setFlowState("registering");

    // Award +1 bonus token for tournament join
    tokens.earnTokenFromTournament(tournament.name);
    toast.success("🪙 +1 Token Bonus Earned!", {
      description: "Tournament join bonus credited!",
    });

    try {
      const substitutes =
        includeSubstitute && hasSubstituteData ? [substitute] : null;

      await registerMutation.mutateAsync({
        tournamentId: tournament.id,
        teamName,
        members: players,
        substitutes,
      });

      setFlowState("done");

      toast.success("Registration Successful! +1 Token Bonus Credited", {
        description: `Your team "${teamName}" has been registered for the tournament.`,
      });

      setOpen(false);
      setFlowState("idle");

      // Show post-registration interstitial ad (optional — user can skip)
      setShowInterstitial(true);
    } catch (error: any) {
      console.error("Registration error:", error);
      setFlowState("idle");

      let errorMessage = "Registration failed. Please try again.";
      if (error?.message) {
        if (error.message.includes("Insufficient balance")) {
          errorMessage =
            "Insufficient wallet balance. Please add money to your wallet.";
        } else if (error.message.includes("already registered")) {
          errorMessage = "You are already registered for this tournament.";
        } else if (error.message.includes("full")) {
          errorMessage = "This tournament is full. Registration is closed.";
        } else {
          errorMessage = error.message;
        }
      }

      toast.error("Registration Failed", {
        description: errorMessage,
      });
    }
  };

  /** Called when user dismisses the post-registration interstitial */
  const handleInterstitialDismiss = () => {
    setShowInterstitial(false);
    setTimeout(() => {
      navigate({ to: "/profile" });
    }, 100);
  };

  // Ad cancelled → cancel registration
  const handleAdCancel = () => {
    setFlowState("idle");
    toast.error("Registration Cancelled", {
      description: "Ad not completed. Registration cancelled.",
    });
  };

  return (
    <>
      {/* Ad modal renders outside dialog for proper z-index */}
      <AdModal
        isOpen={flowState === "adPlaying"}
        onComplete={handleAdComplete}
        onCancel={handleAdCancel}
        duration={30}
        title="Watch Ad to Register"
        rewardLabel="+1 Token Bonus"
      />

      {/* Post-registration interstitial ad — optional, user can skip */}
      <InterstitialOverlay
        isOpen={showInterstitial}
        onDismiss={handleInterstitialDismiss}
      />

      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v && flowState === "adPlaying") return; // don't close dialog while ad playing
          setOpen(v);
          if (!v) setFlowState("idle");
        }}
      >
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            data-ocid="tournament.open_modal_button"
          >
            Register → Watch Ad → Get +1 Token
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Register Your Team</DialogTitle>
            <DialogDescription>
              Fill in your team details to register for the tournament
            </DialogDescription>
          </DialogHeader>

          {/* Token bonus banner */}
          <div className="flex items-center gap-3 rounded-lg border border-yellow-500/40 bg-yellow-950/20 px-4 py-3">
            <Coins className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-yellow-300">
                🪙 Watch Ad & Get +1 Token Bonus
              </p>
              <p className="text-xs text-muted-foreground">
                Ek 30-second rewarded video ad dikhega. Ad complete karne par +1
                bonus token milega. Agar ad skip karo to registration cancel ho
                jayega.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!sufficientBalance && (
              <Card className="border-destructive bg-destructive/5">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-2 text-sm text-destructive">
                    <Wallet className="h-4 w-4 mt-0.5" />
                    <div>
                      <p className="font-semibold">Insufficient Balance</p>
                      <p className="text-xs">
                        You need {formatCurrency(tournament.entryFee)} but have{" "}
                        {formatCurrency(walletBalance)}. Please add money to
                        your wallet.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Prize info for all modes */}
            {(() => {
              const prizeInfo = getTournamentPrizeInfo(
                tournament.tournamentType,
              );
              return (
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs space-y-2">
                  <p className="font-semibold text-primary">Prize Structure</p>
                  <div className="flex gap-3 text-muted-foreground">
                    <span className="text-destructive">
                      Commission: {prizeInfo.commissionPct}%
                    </span>
                    <span>Prize Pool: {prizeInfo.prizePct}%</span>
                  </div>
                  <p className="text-muted-foreground">
                    {prizeInfo.prizeStructure}
                  </p>
                </div>
              );
            })()}

            <div className="space-y-2">
              <Label htmlFor="teamName">
                {getTeamNameLabel(tournament.tournamentType)} *
              </Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder={
                  is1v1 ? "Enter your player name" : "Enter your team name"
                }
                required
                data-ocid="tournament.input"
              />
            </div>

            <div className="space-y-4">
              <Label>
                {is1v1
                  ? "Player Details *"
                  : `Players (${requiredPlayers} Required) *`}
              </Label>
              {players.map((player, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed-size player array, positions don't change
                <div key={idx} className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder={is1v1 ? "Your Name" : `Player ${idx + 1} Name`}
                    value={player.name}
                    onChange={(e) => {
                      const newPlayers = [...players];
                      newPlayers[idx] = {
                        ...newPlayers[idx],
                        name: e.target.value,
                      };
                      setPlayers(newPlayers);
                    }}
                    required
                  />
                  <Input
                    placeholder={"Free Fire ID"}
                    value={player.freeFireId}
                    onChange={(e) => {
                      const newPlayers = [...players];
                      newPlayers[idx] = {
                        ...newPlayers[idx],
                        freeFireId: e.target.value,
                      };
                      setPlayers(newPlayers);
                    }}
                    required
                  />
                </div>
              ))}
            </div>

            {!is1v1 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeSubstitute"
                    checked={includeSubstitute}
                    onCheckedChange={(checked) =>
                      setIncludeSubstitute(checked as boolean)
                    }
                    data-ocid="tournament.checkbox"
                  />
                  <Label htmlFor="includeSubstitute" className="cursor-pointer">
                    Add Substitute Player (Optional)
                  </Label>
                </div>
                {includeSubstitute && (
                  <div className="grid grid-cols-2 gap-3 ml-6">
                    <Input
                      placeholder="Substitute Name"
                      value={substitute.name}
                      onChange={(e) =>
                        setSubstitute({ ...substitute, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Free Fire ID"
                      value={substitute.freeFireId}
                      onChange={(e) =>
                        setSubstitute({
                          ...substitute,
                          freeFireId: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Entry Fee</span>
                <span className="font-semibold">
                  {formatCurrency(tournament.entryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Your Balance</span>
                <span
                  className={`font-semibold ${sufficientBalance ? "text-success" : "text-destructive"}`}
                >
                  {formatCurrency(walletBalance)}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-yellow-500/20 pt-2">
                <span className="text-yellow-400 font-medium">
                  🪙 Token Bonus
                </span>
                <span className="text-yellow-400 font-semibold">
                  +1 Token (after ad)
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) =>
                  setAgreedToTerms(checked as boolean)
                }
                required
                data-ocid="tournament.checkbox"
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer">
                I agree to the tournament rules and understand that entry fee
                will be deducted from my wallet
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={
                !canSubmit ||
                registerMutation.isPending ||
                flowState === "registering"
              }
              data-ocid="tournament.submit_button"
            >
              {flowState === "registering"
                ? "Registering..."
                : "Register → Watch Ad → Get +1 Token"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
