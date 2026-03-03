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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import type { RedeemRequest } from "@/pages/WalletPage";
import { getRedeemRequests, saveRedeemRequests } from "@/pages/WalletPage";
import {
  formatCurrency,
  formatDateTime,
  getTournamentStatusLabel,
  getTournamentTypeLabel,
} from "@/utils/format";
import { Navigate } from "@tanstack/react-router";
import {
  Check,
  DollarSign,
  Plus,
  Shield,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
    <div className="container py-12 space-y-8">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-4xl font-bold font-display">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage tournaments, users, and platform operations
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-max min-w-full h-auto flex-wrap gap-1 p-1">
            <TabsTrigger
              value="overview"
              data-ocid="admin.overview.tab"
              className="flex-shrink-0"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="registrations"
              data-ocid="admin.registrations.tab"
              className="flex-shrink-0"
            >
              Registrations
            </TabsTrigger>
            <TabsTrigger
              value="tournaments"
              data-ocid="admin.tournaments.tab"
              className="flex-shrink-0"
            >
              Tournaments
            </TabsTrigger>
            <TabsTrigger
              value="scores"
              data-ocid="admin.scores.tab"
              className="flex-shrink-0"
            >
              Scores
            </TabsTrigger>
            <TabsTrigger
              value="deposits"
              data-ocid="admin.deposits.tab"
              className="flex-shrink-0"
            >
              Deposits
            </TabsTrigger>
            <TabsTrigger
              value="withdrawals"
              data-ocid="admin.withdrawals.tab"
              className="flex-shrink-0"
            >
              Withdrawals
            </TabsTrigger>
            <TabsTrigger
              value="users"
              data-ocid="admin.users.tab"
              className="flex-shrink-0"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="redeem"
              data-ocid="admin.redeem.tab"
              className="flex-shrink-0"
            >
              Redeem Requests
            </TabsTrigger>
          </TabsList>
        </div>

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
      </Tabs>
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-display">
              {stats?.totalPlayers.toString() || "0"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-secondary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Tournaments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-display">
              {stats?.totalTournaments.toString() || "0"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Prize Distributed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-display text-primary">
              {stats ? formatCurrency(stats.totalPrizeDistributed) : "₹0"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Registrations</span>
              <Badge variant="secondary">{pendingRegistrations}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Deposits</span>
              <Badge variant="secondary">{pendingDeposits}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Withdrawals</span>
              <Badge variant="secondary">{pendingWithdrawals}</Badge>
            </div>
          </CardContent>
        </Card>
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
  const { data: tournaments } = useGetTournaments();
  const { data: teams } = useGetTeams();
  const updateScoreMutation = useUpdateTeamScore();
  const [selectedTournament, setSelectedTournament] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [kills, setKills] = useState("");
  const [placement, setPlacement] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTournament || !selectedTeam) return;

    try {
      await updateScoreMutation.mutateAsync({
        tournamentId: BigInt(selectedTournament),
        teamId: BigInt(selectedTeam),
        kills: BigInt(kills),
        placementRank: BigInt(placement),
      });
      toast.success("Score updated successfully");
      setKills("");
      setPlacement("");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update score");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Team Scores</CardTitle>
        <CardDescription>Enter kills and placement for teams</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tournament</Label>
            <Select
              value={selectedTournament}
              onValueChange={setSelectedTournament}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tournament" />
              </SelectTrigger>
              <SelectContent>
                {tournaments
                  ?.filter(
                    (t) => t.status === "ongoing" || t.status === "completed",
                  )
                  .map((t) => (
                    <SelectItem key={t.id.toString()} value={t.id.toString()}>
                      {t.name}
                    </SelectItem>
                  ))}
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kills</Label>
              <Input
                type="number"
                min="0"
                value={kills}
                onChange={(e) => setKills(e.target.value)}
                required
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
              />
            </div>
          </div>
          <Button type="submit" disabled={updateScoreMutation.isPending}>
            {updateScoreMutation.isPending ? "Updating..." : "Update Score"}
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

  const handleApprove = async (id: bigint) => {
    try {
      await approveMutation.mutateAsync(id);
      toast.success("Withdrawal approved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to approve");
    }
  };

  const handleReject = async (id: bigint) => {
    try {
      await rejectMutation.mutateAsync(id);
      toast.success("Withdrawal rejected");
    } catch (error: any) {
      toast.error(error?.message || "Failed to reject");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdrawal Requests</CardTitle>
        <CardDescription>Process user withdrawal requests</CardDescription>
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
            {withdrawals?.map((withdrawal) => (
              <TableRow key={withdrawal.id.toString()}>
                <TableCell className="font-mono text-xs">
                  {withdrawal.userId.toString().slice(0, 15)}...
                </TableCell>
                <TableCell>{formatCurrency(withdrawal.amount)}</TableCell>
                <TableCell>{formatDateTime(withdrawal.timestamp)}</TableCell>
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
                      withdrawal.status === "approved" ? "bg-success" : ""
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
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(withdrawal.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function UsersTab() {
  const { data: users } = useGetAllUsers();

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
            {users && users.length > 0 ? (
              users.map((user) => (
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
