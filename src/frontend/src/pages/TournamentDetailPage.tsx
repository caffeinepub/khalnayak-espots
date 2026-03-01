import { useState } from "react";
import { useParams, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetTournamentById, useGetCallerWallet, useRegisterTeam, useGetTeams, useGetTeamRegistrations, useGetLeaderboard } from "@/hooks/useQueries";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { CountdownTimer } from "@/components/CountdownTimer";
import { formatCurrency, getTournamentTypeLabel, getTournamentStatusLabel } from "@/utils/format";
import { Calendar, DollarSign, Users, Trophy, Info, Wallet, Shield, Flag } from "lucide-react";
import { toast } from "sonner";
import type { Player } from "@/backend";
import { ReportPlayerDialog } from "@/components/ReportPlayerDialog";
import { FairPlayReminder } from "@/components/FairPlayReminder";

export function TournamentDetailPage() {
  const { id } = useParams({ from: "/tournament/$id" });
  const tournamentId = BigInt(id);
  const { data: tournament, isLoading } = useGetTournamentById(tournamentId);
  const { data: wallet } = useGetCallerWallet();
  const { identity, login } = useInternetIdentity();
  const { data: teams } = useGetTeams();
  const { data: registrations } = useGetTeamRegistrations();
  const { data: leaderboard } = useGetLeaderboard(tournamentId, tournament?.status === "ongoing");
  const [showReportDialog, setShowReportDialog] = useState(false);

  const tournamentRegistrations = registrations?.filter((r) => r.tournamentId === tournamentId) || [];
  const registeredTeamIds = new Set(tournamentRegistrations.map((r) => r.teamId));
  const registeredTeams = teams?.filter((t) => registeredTeamIds.has(t.id)) || [];

  const isUserRegistered = tournamentRegistrations.some(
    (r) => identity && r.captainId.toString() === identity.getPrincipal().toString()
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

  const canRegister = tournament.status === "upcoming" && !isUserRegistered;
  const showRoomCredentials = tournament.status === "ongoing" && isUserRegistered && tournament.roomId && tournament.roomPassword;

  return (
    <div className="container py-12 space-y-8">
      {/* Tournament Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Badge className={tournament.status === "ongoing" ? "bg-destructive" : "bg-secondary"}>
            {getTournamentStatusLabel(tournament.status)}
          </Badge>
          <Badge variant="outline">{getTournamentTypeLabel(tournament.tournamentType)}</Badge>
        </div>
        <h1 className="text-4xl font-bold font-display mb-2">{tournament.name}</h1>
        <p className="text-muted-foreground">
          {tournament.tournamentType === "battleground" ? "Battle Ground Mode: 48 Players, 12 Teams" : "4v4 Custom Mode: Team vs Team"}
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
            <p className="text-2xl font-bold font-display">{formatCurrency(tournament.entryFee)}</p>
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
            <p className="text-2xl font-bold font-display text-primary">{formatCurrency(tournament.prizePool)}</p>
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
            <CardDescription>Join the tournament using these credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Room ID</Label>
              <p className="text-xl font-mono font-bold">{tournament.roomId}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Password</Label>
              <p className="text-xl font-mono font-bold">{tournament.roomPassword}</p>
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
                <p className="text-sm text-muted-foreground">{getTournamentTypeLabel(tournament.tournamentType)}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" /> General Rules
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>All players must have valid Free Fire IDs</li>
                  <li>Room ID and password will be shared 15 minutes before the match</li>
                  <li>Screenshot proof required for kills</li>
                  <li>Anti-cheat policy: Hackers will be banned permanently</li>
                  <li>Fair play is mandatory</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Scoring System</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>1 point per kill</li>
                  <li>Placement points: 1st (12pts), 2nd (9pts), 3rd (8pts), 4th (7pts), 5th (6pts), etc.</li>
                </ul>
              </div>
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
                    <div key={team.id.toString()} className="border border-border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{team.name}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {team.members.map((member, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className="text-muted-foreground">{member.name}</span>
                            <span className="font-mono">{member.freeFireId}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No teams registered yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Leaderboard</CardTitle>
                  <CardDescription>Rankings update in real-time during the tournament</CardDescription>
                </div>
                {tournament?.status === "completed" && identity && (
                  <Button variant="outline" size="sm" onClick={() => setShowReportDialog(true)}>
                    <Flag className="mr-2 h-4 w-4" />
                    Report Player
                  </Button>
                )}
              </div>
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
                          idx === 0 ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-bold font-display text-xl ${idx === 0 ? "text-primary" : ""}`}>
                            #{idx + 1}
                          </span>
                          <span className="font-semibold">{team?.name || "Unknown Team"}</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">Kills: </span>
                            <span className="font-semibold">{entry.kills.toString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Points: </span>
                            <span className="font-semibold text-primary">{entry.totalPoints.toString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {tournament.status === "upcoming" ? "Leaderboard will be available once the tournament starts" : "No scores yet"}
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
                  {wallet ? `Your wallet balance: ${formatCurrency(wallet.balance)}` : "Login to register"}
                </p>
              </div>
              {identity ? (
                <RegistrationDialog tournament={tournament} walletBalance={wallet?.balance || BigInt(0)} />
              ) : (
                <Button onClick={login} size="lg" className="bg-primary hover:bg-primary/90">
                  Login to Register
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Report Player Dialog */}
      <ReportPlayerDialog
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        tournamentId={id}
        tournamentName={tournament?.name}
      />

      {/* Fair Play Reminder (shows after tournament completion) */}
      {tournament?.status === "completed" && identity && isUserRegistered && (
        <FairPlayReminder
          tournamentId={id}
          tournamentName={tournament.name}
          onReportClick={() => setShowReportDialog(true)}
        />
      )}
    </div>
  );
}

function RegistrationDialog({ tournament, walletBalance }: { tournament: any; walletBalance: bigint }) {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState<Player[]>([
    { name: "", freeFireId: "" },
    { name: "", freeFireId: "" },
    { name: "", freeFireId: "" },
    { name: "", freeFireId: "" },
  ]);
  const [substitute, setSubstitute] = useState<Player>({ name: "", freeFireId: "" });
  const [includeSubstitute, setIncludeSubstitute] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const registerMutation = useRegisterTeam();

  const hasSubstituteData = substitute.name.trim() !== "" && substitute.freeFireId.trim() !== "";
  const sufficientBalance = walletBalance >= tournament.entryFee;
  const allPlayersFilled = players.every((p) => p.name.trim() !== "" && p.freeFireId.trim() !== "");
  const canSubmit = teamName.trim() !== "" && allPlayersFilled && agreedToTerms && sufficientBalance;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      const substitutes = includeSubstitute && hasSubstituteData ? [substitute] : null;
      
      console.log("Submitting registration:", {
        tournamentId: tournament.id,
        teamName,
        members: players,
        substitutes,
      });
      
      const teamId = await registerMutation.mutateAsync({
        tournamentId: tournament.id,
        teamName,
        members: players,
        substitutes,
      });

      console.log("Registration successful! Team ID:", teamId);
      
      toast.success("Registration Successful!", {
        description: `Your team "${teamName}" has been registered for the tournament.`,
      });
      
      setOpen(false);
      
      // Small delay to let the toast show before navigation
      setTimeout(() => {
        navigate({ to: "/profile" });
      }, 500);
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Extract meaningful error message
      let errorMessage = "Registration failed. Please try again.";
      
      if (error?.message) {
        if (error.message.includes("Insufficient balance")) {
          errorMessage = "Insufficient wallet balance. Please add money to your wallet.";
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Register Team
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register Your Team</DialogTitle>
          <DialogDescription>Fill in your team details to register for the tournament</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!sufficientBalance && (
            <Card className="border-destructive bg-destructive/5">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2 text-sm text-destructive">
                  <Wallet className="h-4 w-4 mt-0.5" />
                  <div>
                    <p className="font-semibold">Insufficient Balance</p>
                    <p className="text-xs">
                      You need {formatCurrency(tournament.entryFee)} but have {formatCurrency(walletBalance)}. Please add
                      money to your wallet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name *</Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Players (4 Required) *</Label>
            {players.map((player, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-3">
                <Input
                  placeholder={`Player ${idx + 1} Name`}
                  value={player.name}
                  onChange={(e) => {
                    const newPlayers = [...players];
                    newPlayers[idx] = { ...newPlayers[idx], name: e.target.value };
                    setPlayers(newPlayers);
                  }}
                  required
                />
                <Input
                  placeholder={`Free Fire ID`}
                  value={player.freeFireId}
                  onChange={(e) => {
                    const newPlayers = [...players];
                    newPlayers[idx] = { ...newPlayers[idx], freeFireId: e.target.value };
                    setPlayers(newPlayers);
                  }}
                  required
                />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="includeSubstitute" checked={includeSubstitute} onCheckedChange={(checked) => setIncludeSubstitute(checked as boolean)} />
              <Label htmlFor="includeSubstitute" className="cursor-pointer">
                Add Substitute Player (Optional)
              </Label>
            </div>
            {includeSubstitute && (
              <div className="grid grid-cols-2 gap-3 ml-6">
                <Input
                  placeholder="Substitute Name"
                  value={substitute.name}
                  onChange={(e) => setSubstitute({ ...substitute, name: e.target.value })}
                />
                <Input
                  placeholder="Free Fire ID"
                  value={substitute.freeFireId}
                  onChange={(e) => setSubstitute({ ...substitute, freeFireId: e.target.value })}
                />
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Entry Fee</span>
              <span className="font-semibold">{formatCurrency(tournament.entryFee)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your Balance</span>
              <span className={`font-semibold ${sufficientBalance ? "text-success" : "text-destructive"}`}>
                {formatCurrency(walletBalance)}
              </span>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} required />
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the tournament rules and understand that entry fee will be deducted from my wallet
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={!canSubmit || registerMutation.isPending}>
            {registerMutation.isPending ? "Registering..." : `Register Team - ${formatCurrency(tournament.entryFee)}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
