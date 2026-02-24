import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetCallerUserProfile, useGetCallerStats, useGetCallerTeamRegistrations, useGetTournaments, useGetTeams } from "@/hooks/useQueries";
import { formatCurrency, getTournamentStatusLabel, formatDateTime } from "@/utils/format";
import { User, Trophy, DollarSign, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ProfilePage() {
  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: stats } = useGetCallerStats();
  const { data: registrations } = useGetCallerTeamRegistrations();
  const { data: tournaments } = useGetTournaments();
  const { data: teams } = useGetTeams();

  const myTournaments = registrations?.map((reg) => {
    const tournament = tournaments?.find((t) => t.id === reg.tournamentId);
    const team = teams?.find((t) => t.id === reg.teamId);
    return { registration: reg, tournament, team };
  }) || [];

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-display mb-2">My Profile</h1>
        <p className="text-muted-foreground">View your stats and tournament history</p>
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
              <p className="text-lg font-semibold">{profile?.username || "Loading..."}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-semibold">{profile?.email || "Loading..."}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge variant={profile?.role === "admin" ? "default" : "secondary"}>
                {profile?.role?.toUpperCase() || "PLAYER"}
              </Badge>
            </div>
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
            <p className="text-4xl font-bold font-display">{stats?.tournamentsParticipated.toString() || "0"}</p>
            <p className="text-sm text-muted-foreground mt-1">Total participated</p>
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
            <p className="text-4xl font-bold font-display text-primary">
              {stats ? formatCurrency(stats.totalWinnings) : "₹0"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">All-time earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* My Tournaments */}
      <Card>
        <CardHeader>
          <CardTitle>My Tournaments</CardTitle>
          <CardDescription>View all tournaments you've registered for</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="ongoing">Live</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <TournamentList items={myTournaments} />
            </TabsContent>
            <TabsContent value="upcoming">
              <TournamentList items={myTournaments.filter((t) => t.tournament?.status === "upcoming")} />
            </TabsContent>
            <TabsContent value="ongoing">
              <TournamentList items={myTournaments.filter((t) => t.tournament?.status === "ongoing")} />
            </TabsContent>
            <TabsContent value="completed">
              <TournamentList items={myTournaments.filter((t) => t.tournament?.status === "completed")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function TournamentList({ items }: { items: any[] }) {
  if (items.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No tournaments found</p>;
  }

  return (
    <div className="space-y-3">
      {items.map(({ registration, tournament, team }) => (
        <Link
          key={registration.id.toString()}
          to="/tournament/$id"
          params={{ id: tournament?.id.toString() || "0" }}
          className="block p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={
                    tournament?.status === "ongoing" ? "destructive" : tournament?.status === "upcoming" ? "secondary" : "outline"
                  }
                >
                  {tournament ? getTournamentStatusLabel(tournament.status) : "Unknown"}
                </Badge>
                <Badge
                  variant={
                    registration.status === "approved"
                      ? "default"
                      : registration.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                  className={registration.status === "approved" ? "bg-success" : ""}
                >
                  {registration.status.toUpperCase()}
                </Badge>
              </div>
              <h4 className="font-semibold text-lg">{tournament?.name || "Unknown Tournament"}</h4>
              <p className="text-sm text-muted-foreground">Team: {team?.name || "Unknown Team"}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Prize Pool</p>
              <p className="font-semibold text-primary">{tournament ? formatCurrency(tournament.prizePool) : "N/A"}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
