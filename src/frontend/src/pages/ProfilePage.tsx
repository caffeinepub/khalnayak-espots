import type { Variant_admin_player } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetCallerStats,
  useGetCallerTeamRegistrations,
  useGetCallerUserProfile,
  useGetTeams,
  useGetTournaments,
  useSaveUserProfile,
} from "@/hooks/useQueries";
import { formatCurrency, getTournamentStatusLabel } from "@/utils/format";
import { Link } from "@tanstack/react-router";
import {
  DollarSign,
  Loader2,
  LogIn,
  Trophy,
  User,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ProfilePage() {
  const { identity, login } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } =
    useGetCallerUserProfile();
  const { data: stats, isLoading: statsLoading } = useGetCallerStats();
  const { data: registrations } = useGetCallerTeamRegistrations();
  const { data: tournaments } = useGetTournaments();
  const { data: teams } = useGetTeams();

  const myTournaments =
    registrations?.map((reg) => {
      const tournament = tournaments?.find((t) => t.id === reg.tournamentId);
      const team = teams?.find((t) => t.id === reg.teamId);
      return { registration: reg, tournament, team };
    }) || [];

  // Not logged in
  if (!identity) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center gap-6 text-center">
        <div className="rounded-full bg-primary/10 p-6">
          <LogIn className="h-12 w-12 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display mb-2">
            Login Required
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Please login to view your profile, wallet balance, and tournament
            history.
          </p>
        </div>
        <Button
          onClick={login}
          size="lg"
          className="bg-primary hover:bg-primary/90"
          data-ocid="profile.primary_button"
        >
          Login to Continue
        </Button>
      </div>
    );
  }

  // Loading state
  if (profileLoading) {
    return (
      <div
        className="container py-12 space-y-8"
        data-ocid="profile.loading_state"
      >
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  // Profile does not exist yet — show setup form
  if (!profile) {
    return <ProfileSetupCard />;
  }

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-display mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          View your stats and tournament history
        </p>
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Player Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="text-lg font-semibold">
                {profile.username || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-semibold">
                {profile.email || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge
                variant={
                  profile.role === ("admin" as Variant_admin_player)
                    ? "default"
                    : "secondary"
                }
              >
                {typeof profile.role === "string"
                  ? profile.role.toUpperCase()
                  : "PLAYER"}
              </Badge>
            </div>
            {profile.referralCode && (
              <div>
                <p className="text-sm text-muted-foreground">Referral Code</p>
                <p className="text-base font-mono font-semibold text-primary">
                  {profile.referralCode}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Tournaments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-10 w-16" />
            ) : (
              <>
                <p className="text-4xl font-bold font-display">
                  {stats?.tournamentsParticipated.toString() || "0"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Total participated
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Total Winnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <>
                <p className="text-4xl font-bold font-display text-primary">
                  {stats ? formatCurrency(stats.totalWinnings) : "₹0"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  All-time earnings
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* My Tournaments */}
      <Card>
        <CardHeader>
          <CardTitle>My Tournaments</CardTitle>
          <CardDescription>
            View all tournaments you've registered for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all" data-ocid="profile.tab">
                All
              </TabsTrigger>
              <TabsTrigger value="upcoming" data-ocid="profile.tab">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="ongoing" data-ocid="profile.tab">
                Live
              </TabsTrigger>
              <TabsTrigger value="completed" data-ocid="profile.tab">
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <TournamentList items={myTournaments} />
            </TabsContent>
            <TabsContent value="upcoming">
              <TournamentList
                items={myTournaments.filter(
                  (t) => t.tournament?.status === "upcoming",
                )}
              />
            </TabsContent>
            <TabsContent value="ongoing">
              <TournamentList
                items={myTournaments.filter(
                  (t) => t.tournament?.status === "ongoing",
                )}
              />
            </TabsContent>
            <TabsContent value="completed">
              <TournamentList
                items={myTournaments.filter(
                  (t) => t.tournament?.status === "completed",
                )}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Profile Setup Card ────────────────────────────────────────────────────────

function ProfileSetupCard() {
  const { identity } = useInternetIdentity();
  const saveProfileMutation = useSaveUserProfile();
  const [username, setUsername] = useState(() => {
    if (!identity) return "";
    return `Player_${identity.getPrincipal().toString().slice(0, 8)}`;
  });
  const [email, setEmail] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let referralCode = "";
    for (let i = 0; i < 6; i++) {
      referralCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    try {
      await saveProfileMutation.mutateAsync({
        username: username.trim(),
        email: email.trim(),
        role: "player" as Variant_admin_player,
        banned: false,
        referralCode,
      });
      toast.success("Profile created!", {
        description: "Your wallet has been created with ₹0 balance.",
      });
    } catch (err: any) {
      toast.error("Failed to create profile", {
        description: err?.message || "Please try again.",
      });
    }
  };

  return (
    <div className="container py-20 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md border-primary/40">
        <CardHeader className="text-center">
          <div className="mx-auto rounded-full bg-primary/10 p-4 w-fit mb-3">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-display">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Set up your player profile to get a wallet and join tournaments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="setup-username">
                Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="setup-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                minLength={3}
                data-ocid="profile.input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="setup-email">Email (optional)</Label>
              <Input
                id="setup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                data-ocid="profile.input"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={!username.trim() || saveProfileMutation.isPending}
              data-ocid="profile.submit_button"
            >
              {saveProfileMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                "Create Profile & Wallet"
              )}
            </Button>
            {saveProfileMutation.isError && (
              <p
                className="text-sm text-destructive text-center"
                data-ocid="profile.error_state"
              >
                Failed to create profile. Please try again.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tournament List ───────────────────────────────────────────────────────────

function TournamentList({ items }: { items: any[] }) {
  if (items.length === 0) {
    return (
      <div
        className="text-center text-muted-foreground py-8"
        data-ocid="profile.empty_state"
      >
        <p>No tournaments found</p>
        <Button asChild variant="outline" size="sm" className="mt-3">
          <Link to="/tournaments">Browse Tournaments</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(({ registration, tournament, team }, idx) => (
        <Link
          key={registration.id.toString()}
          to="/tournament/$id"
          params={{ id: tournament?.id.toString() || "0" }}
          className="block p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
          data-ocid={`profile.item.${idx + 1}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={
                    tournament?.status === "ongoing"
                      ? "destructive"
                      : tournament?.status === "upcoming"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {tournament
                    ? getTournamentStatusLabel(tournament.status)
                    : "Unknown"}
                </Badge>
                <Badge
                  variant={
                    registration.status === "approved"
                      ? "default"
                      : registration.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                  className={
                    registration.status === "approved" ? "bg-success" : ""
                  }
                >
                  {registration.status.toUpperCase()}
                </Badge>
              </div>
              <h4 className="font-semibold text-lg">
                {tournament?.name || "Unknown Tournament"}
              </h4>
              <p className="text-sm text-muted-foreground">
                Team: {team?.name || "Unknown Team"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Prize Pool</p>
              <p className="font-semibold text-primary">
                {tournament ? formatCurrency(tournament.prizePool) : "N/A"}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
