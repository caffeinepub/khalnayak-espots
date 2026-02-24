import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTournaments, useGetPlatformStats } from "@/hooks/useQueries";
import { CountdownTimer } from "@/components/CountdownTimer";
import { formatCurrency, getTournamentTypeLabel, getTournamentStatusLabel } from "@/utils/format";
import { Trophy, Users, DollarSign, Calendar, ArrowRight } from "lucide-react";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";

export function HomePage() {
  const { identity, login } = useInternetIdentity();
  const { data: tournaments, isLoading: tournamentsLoading } = useGetTournaments();
  const { data: stats, isLoading: statsLoading } = useGetPlatformStats();

  const upcomingTournaments = tournaments?.filter((t) => t.status === "upcoming").slice(0, 3) || [];
  const ongoingTournaments = tournaments?.filter((t) => t.status === "ongoing").slice(0, 3) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold font-display">
                <span className="glow-cyan">DOMINATE</span>
                <br />
                <span className="text-secondary glow-pink">THE BATTLEGROUND</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Join India's most competitive Free Fire tournament platform. Battle, conquer, and claim your victory.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {identity ? (
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 shadow-glow">
                  <Link to="/tournaments">
                    Browse Tournaments <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button onClick={login} size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 shadow-glow">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-primary/30">
                <Link to="/rules">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card/50 border-y border-primary/20">
        <div className="container">
          {statsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20 bg-card/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Users className="h-5 w-5" />
                    Total Players
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold font-display">{stats?.totalPlayers.toString() || "0"}</p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 bg-card/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-secondary">
                    <Trophy className="h-5 w-5" />
                    Total Tournaments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold font-display">{stats?.totalTournaments.toString() || "0"}</p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-card/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-accent">
                    <DollarSign className="h-5 w-5" />
                    Prize Distributed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold font-display">
                    {stats ? formatCurrency(stats.totalPrizeDistributed) : "₹0"}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Ongoing Tournaments */}
      {ongoingTournaments.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold font-display text-primary">🔴 Live Tournaments</h2>
                <p className="text-muted-foreground mt-2">Battles happening right now</p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link to="/tournaments">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingTournaments.map((tournament) => (
                <Card key={tournament.id.toString()} className="border-primary/30 hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="default" className="mb-2 bg-destructive">
                          {getTournamentStatusLabel(tournament.status)}
                        </Badge>
                        <CardTitle className="text-xl">{tournament.name}</CardTitle>
                      </div>
                    </div>
                    <CardDescription>{getTournamentTypeLabel(tournament.tournamentType)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Entry Fee</span>
                      <span className="font-semibold">{formatCurrency(tournament.entryFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prize Pool</span>
                      <span className="font-semibold text-primary">{formatCurrency(tournament.prizePool)}</span>
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/tournament/$id" params={{ id: tournament.id.toString() }}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Tournaments */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold font-display">Upcoming Tournaments</h2>
              <p className="text-muted-foreground mt-2">Register now and secure your spot</p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link to="/tournaments">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {tournamentsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-80" />
              ))}
            </div>
          ) : upcomingTournaments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTournaments.map((tournament) => (
                <Card
                  key={tournament.id.toString()}
                  className="border-accent/30 hover:border-accent/50 transition-all hover:shadow-glow-purple"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          {getTournamentStatusLabel(tournament.status)}
                        </Badge>
                        <CardTitle className="text-xl">{tournament.name}</CardTitle>
                      </div>
                    </div>
                    <CardDescription>{getTournamentTypeLabel(tournament.tournamentType)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Starts in:</span>
                    </div>
                    <CountdownTimer targetTime={tournament.startTime} compact />
                    <div className="flex justify-between text-sm border-t border-border pt-3">
                      <span className="text-muted-foreground">Entry Fee</span>
                      <span className="font-semibold">{formatCurrency(tournament.entryFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prize Pool</span>
                      <span className="font-semibold text-primary">{formatCurrency(tournament.prizePool)}</span>
                    </div>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90">
                      <Link to="/tournament/$id" params={{ id: tournament.id.toString() }}>Register Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12">
              <div className="text-center text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming tournaments at the moment. Check back soon!</p>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!identity && (
        <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-4xl font-bold font-display">Ready to Compete?</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of players competing in daily tournaments. Start your journey to become a champion.
              </p>
              <Button onClick={login} size="lg" className="bg-secondary hover:bg-secondary/90 text-lg px-8">
                Create Account
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
