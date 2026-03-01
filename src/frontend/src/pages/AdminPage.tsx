import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  useIsCallerAdmin,
  useGetPlatformStats,
  useGetTournaments,
  useGetTeamRegistrations,
  useGetDepositRequests,
  useGetWithdrawalRequests,
  useGetAllUsers,
  useCreateTournament,
  useUpdateTournamentStatus,
  useUpdateTournamentRoomCredentials,
  useApproveTeamRegistration,
  useRejectTeamRegistration,
  useApproveDeposit,
  useApproveWithdrawal,
  useRejectWithdrawal,
  useUpdateTeamScore,
  useDistributePrizes,
  useBanUser,
  useUnbanUser,
  useGetTeams,
} from "@/hooks/useQueries";
import { formatCurrency, formatDateTime, getTournamentTypeLabel, getTournamentStatusLabel } from "@/utils/format";
import { Shield, Users, Trophy, DollarSign, Plus, Check, X, Ban, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Navigate } from "@tanstack/react-router";
import type { TournamentType, TournamentStatus } from "@/backend";
import { Principal } from "@icp-sdk/core/principal";
import { AdminReportsTab } from "@/components/AdminReportsTab";
import { mockReports } from "@/data/mockAntiCheat";

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
          <p className="text-muted-foreground">Manage tournaments, users, and platform operations</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="scores">Scores</TabsTrigger>
          <TabsTrigger value="deposits">Deposits</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="anticheat" className="relative">
            <ShieldAlert className="h-4 w-4 mr-2" />
            Anti-Cheat
            {mockReports.filter((r) => r.status === "pending").length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full text-xs flex items-center justify-center">
                {mockReports.filter((r) => r.status === "pending").length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="tournaments">
          <TournamentsTab />
        </TabsContent>

        <TabsContent value="registrations">
          <RegistrationsTab />
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

        <TabsContent value="anticheat">
          <AdminReportsTab />
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

  const pendingRegistrations = registrations?.filter((r) => r.status === "pending").length || 0;
  const pendingDeposits = deposits?.filter((d) => d.status === "pending").length || 0;
  const pendingWithdrawals = withdrawals?.filter((w) => w.status === "pending").length || 0;

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
            <p className="text-3xl font-bold font-display">{stats?.totalPlayers.toString() || "0"}</p>
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
            <p className="text-3xl font-bold font-display">{stats?.totalTournaments.toString() || "0"}</p>
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
                  <TableCell className="font-medium">{tournament.name}</TableCell>
                  <TableCell>{getTournamentTypeLabel(tournament.tournamentType)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tournament.status === "ongoing" ? "destructive" : tournament.status === "upcoming" ? "secondary" : "outline"
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
      await updateStatusMutation.mutateAsync({ tournamentId: tournament.id, status });
      toast.success(`Tournament status updated to ${status}`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update status");
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCredentialsMutation.mutateAsync({ tournamentId: tournament.id, roomId, roomPassword });
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
      <Select onValueChange={(value) => handleStatusChange(value as TournamentStatus)} value={tournament.status}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Dialog open={credentialsDialogOpen} onOpenChange={setCredentialsDialogOpen}>
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
              <Input value={roomId} onChange={(e) => setRoomId(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Room Password</Label>
              <Input value={roomPassword} onChange={(e) => setRoomPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={updateCredentialsMutation.isPending}>
              {updateCredentialsMutation.isPending ? "Updating..." : "Update Credentials"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {tournament.status === "completed" && (
        <Button size="sm" variant="outline" onClick={handleDistributePrizes} disabled={distributePrizesMutation.isPending}>
          Prizes
        </Button>
      )}
    </div>
  );
}

function CreateTournamentDialog({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "battleground" as TournamentType,
    entryFee: "",
    maxTeams: "",
    startTime: "",
  });
  const createMutation = useCreateTournament();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const startTimeMs = new Date(formData.startTime).getTime();
      const startTimeNs = BigInt(startTimeMs) * BigInt(1_000_000);
      await createMutation.mutateAsync({
        name: formData.name,
        tournamentType: formData.type,
        entryFee: BigInt(Math.round(parseFloat(formData.entryFee) * 100)),
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
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as TournamentType })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="battleground">Battle Ground</SelectItem>
              <SelectItem value="custom4v4">4v4 Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Entry Fee (₹)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={formData.entryFee}
              onChange={(e) => setFormData({ ...formData, entryFee: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Max Teams</Label>
            <Input
              type="number"
              min="1"
              value={formData.maxTeams}
              onChange={(e) => setFormData({ ...formData, maxTeams: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Start Time</Label>
          <Input
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={createMutation.isPending}>
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
            {registrations?.map((reg) => {
              const team = teams?.find((t) => t.id === reg.teamId);
              const tournament = tournaments?.find((t) => t.id === reg.tournamentId);
              return (
                <TableRow key={reg.id.toString()}>
                  <TableCell className="font-medium">{team?.name || "Unknown"}</TableCell>
                  <TableCell>{tournament?.name || "Unknown"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={reg.status === "approved" ? "default" : reg.status === "pending" ? "secondary" : "destructive"}
                      className={reg.status === "approved" ? "bg-success" : ""}
                    >
                      {reg.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {reg.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="default" onClick={() => handleApprove(reg.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(reg.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
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
            <Select value={selectedTournament} onValueChange={setSelectedTournament}>
              <SelectTrigger>
                <SelectValue placeholder="Select tournament" />
              </SelectTrigger>
              <SelectContent>
                {tournaments
                  ?.filter((t) => t.status === "ongoing" || t.status === "completed")
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
              <Input type="number" min="0" value={kills} onChange={(e) => setKills(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Placement Rank</Label>
              <Input type="number" min="1" value={placement} onChange={(e) => setPlacement(e.target.value)} required />
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

  const handleApprove = async (id: bigint) => {
    try {
      await approveMutation.mutateAsync(id);
      toast.success("Deposit approved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to approve");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit Requests</CardTitle>
        <CardDescription>Approve user deposit requests</CardDescription>
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
            {deposits?.map((deposit) => (
              <TableRow key={deposit.id.toString()}>
                <TableCell className="font-mono text-xs">{deposit.userId.toString().slice(0, 15)}...</TableCell>
                <TableCell>{formatCurrency(deposit.amount)}</TableCell>
                <TableCell>{formatDateTime(deposit.timestamp)}</TableCell>
                <TableCell>
                  <Badge variant={deposit.status === "approved" ? "default" : deposit.status === "pending" ? "secondary" : "destructive"} className={deposit.status === "approved" ? "bg-success" : ""}>
                    {deposit.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {deposit.status === "pending" && (
                    <Button size="sm" onClick={() => handleApprove(deposit.id)}>
                      Approve
                    </Button>
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
                <TableCell className="font-mono text-xs">{withdrawal.userId.toString().slice(0, 15)}...</TableCell>
                <TableCell>{formatCurrency(withdrawal.amount)}</TableCell>
                <TableCell>{formatDateTime(withdrawal.timestamp)}</TableCell>
                <TableCell>
                  <Badge variant={withdrawal.status === "approved" ? "default" : withdrawal.status === "pending" ? "secondary" : "destructive"} className={withdrawal.status === "approved" ? "bg-success" : ""}>
                    {withdrawal.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {withdrawal.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleApprove(withdrawal.id)}>
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(withdrawal.id)}>
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
  const banMutation = useBanUser();
  const unbanMutation = useUnbanUser();

  const handleBan = async (userId: string) => {
    try {
      await banMutation.mutateAsync(Principal.fromText(userId));
      toast.success("User banned");
    } catch (error: any) {
      toast.error(error?.message || "Failed to ban user");
    }
  };

  const handleUnban = async (userId: string) => {
    try {
      await unbanMutation.mutateAsync(Principal.fromText(userId));
      toast.success("User unbanned");
    } catch (error: any) {
      toast.error(error?.message || "Failed to unban user");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>View and manage platform users</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role.toUpperCase()}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.banned ? "destructive" : "default"} className={!user.banned ? "bg-success" : ""}>
                    {user.banned ? "BANNED" : "ACTIVE"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {/* Note: We can't get the principal from UserProfile, this is a limitation */}
                  <span className="text-xs text-muted-foreground">Action requires principal</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
