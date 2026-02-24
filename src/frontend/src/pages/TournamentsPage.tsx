import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetTournaments } from "@/hooks/useQueries";
import { CountdownTimer } from "@/components/CountdownTimer";
import { formatCurrency, getTournamentTypeLabel, getTournamentStatusLabel } from "@/utils/format";
import { Calendar, Users } from "lucide-react";
import type { Tournament } from "@/backend";

export function TournamentsPage() {
  const { data: tournaments, isLoading } = useGetTournaments();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTournaments = tournaments?.filter((t) => {
    const matchesType = typeFilter === "all" || t.tournamentType === typeFilter;
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesType && matchesStatus;
  }) || [];

  const getTournamentStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-destructive";
      case "upcoming":
        return "bg-secondary";
      case "completed":
        return "bg-muted";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="container py-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold font-display mb-2">All Tournaments</h1>
        <p className="text-muted-foreground">Browse and register for Free Fire tournaments</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Live</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="battleground">Battle Ground</SelectItem>
            <SelectItem value="custom4v4">4v4 Custom</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto text-sm text-muted-foreground flex items-center">
          {filteredTournaments.length} tournament{filteredTournaments.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Tournament Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      ) : filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id.toString()} tournament={tournament} statusColor={getTournamentStatusColor(tournament.status)} />
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="text-center text-muted-foreground">
            <p>No tournaments found matching your filters.</p>
          </div>
        </Card>
      )}
    </div>
  );
}

function TournamentCard({ tournament, statusColor }: { tournament: Tournament; statusColor: string }) {
  const isUpcoming = tournament.status === "upcoming";
  const isOngoing = tournament.status === "ongoing";

  return (
    <Card className={`border-primary/30 hover:border-primary/50 transition-all hover:shadow-glow ${isOngoing ? "border-destructive/50" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge className={statusColor}>{getTournamentStatusLabel(tournament.status)}</Badge>
          <Badge variant="outline">{getTournamentTypeLabel(tournament.tournamentType)}</Badge>
        </div>
        <CardTitle className="text-xl">{tournament.name}</CardTitle>
        <CardDescription>
          {tournament.tournamentType === "battleground" ? "48 Players, 12 Teams" : "4 vs 4 Team Match"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isUpcoming && (
          <div>
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Starts in:
            </p>
            <CountdownTimer targetTime={tournament.startTime} compact />
          </div>
        )}

        {isOngoing && (
          <div className="flex items-center gap-2 text-sm font-medium text-destructive">
            <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
            Tournament is Live!
          </div>
        )}

        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Entry Fee</span>
            <span className="font-semibold">{formatCurrency(tournament.entryFee)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Prize Pool</span>
            <span className="font-semibold text-primary">{formatCurrency(tournament.prizePool)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" /> Slots
            </span>
            <span className="font-semibold">{tournament.maxTeams.toString()} teams</span>
          </div>
        </div>

        <Button asChild className="w-full" variant={isOngoing ? "default" : isUpcoming ? "default" : "outline"}>
          <Link to="/tournament/$id" params={{ id: tournament.id.toString() }}>
            {isOngoing ? "View Live" : isUpcoming ? "Register Now" : "View Details"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
