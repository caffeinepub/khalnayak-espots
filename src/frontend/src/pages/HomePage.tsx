import { AdMobBanner } from "@/components/AdMobBanner";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetPlatformStats, useGetTournaments } from "@/hooks/useQueries";
import { useTokens } from "@/hooks/useTokens";
import {
  formatCurrency,
  getTournamentStatusLabel,
  getTournamentTypeLabel,
} from "@/utils/format";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Coins,
  DollarSign,
  IndianRupee,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

export function HomePage() {
  const { identity, login } = useInternetIdentity();
  const { data: tournaments, isLoading: tournamentsLoading } =
    useGetTournaments();
  const { data: stats, isLoading: statsLoading } = useGetPlatformStats();
  const tokens = useTokens();
  const upcomingTournaments =
    tournaments?.filter((t) => t.status === "upcoming").slice(0, 3) || [];
  const ongoingTournaments =
    tournaments?.filter((t) => t.status === "ongoing").slice(0, 3) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              {/* Shield Logo */}
              <div className="flex justify-center">
                <img
                  src="/assets/generated/khalnayak-espots-logo.dim_512x512.png"
                  alt="Khalnayak Espots"
                  className="w-32 h-32 md:w-44 md:h-44 object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 0 24px rgba(0,245,255,0.6)) drop-shadow(0 0 48px rgba(0,245,255,0.25))",
                    animation: "hero-logo-float 4s ease-in-out infinite",
                  }}
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-display">
                <span className="glow-cyan">DOMINATE</span>
                <br />
                <span className="text-secondary glow-pink">
                  THE BATTLEGROUND
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Join India's most competitive Free Fire tournament platform.
                Battle, conquer, and claim your victory.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {identity ? (
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8 shadow-glow"
                >
                  <Link to="/tournaments">
                    Browse Tournaments <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button
                  onClick={login}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8 shadow-glow"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 border-primary/30"
              >
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
                  <p className="text-4xl font-bold font-display">
                    {stats?.totalPlayers.toString() || "0"}
                  </p>
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
                  <p className="text-4xl font-bold font-display">
                    {stats?.totalTournaments.toString() || "0"}
                  </p>
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

      {/* Earn Tokens Section */}
      <section className="py-14 bg-gradient-to-br from-yellow-950/30 via-background to-background border-y border-yellow-500/20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left: CTA */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-500/20 p-3 border border-yellow-500/30">
                  <Coins className="h-7 w-7 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-display text-yellow-400">
                    Earn Real Money
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Watch Ads → Tokens Kamao → ₹ Withdraw Karo
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  {
                    icon: "▶️",
                    label: "Watch Ad → 1 Token",
                    sub: "Unlimited • No daily limit",
                    color: "border-yellow-500/20 bg-yellow-950/20",
                  },
                  {
                    icon: "🎮",
                    label: "Register Tournament → +1 Token Bonus",
                    sub: "Extra token on every tournament join",
                    color: "border-cyan-500/20 bg-cyan-950/20",
                  },
                  {
                    icon: "💰",
                    label: "25 Tokens → Watch Ad → ₹1.25",
                    sub: "Multiple withdrawals allowed",
                    color: "border-green-500/20 bg-green-950/20",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 ${item.color}`}
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8"
                  style={{ boxShadow: "0 0 20px rgba(234,179,8,0.4)" }}
                  data-ocid="home.primary_button"
                >
                  <Link to="/earn">
                    <Zap className="mr-2 h-5 w-5" />
                    Watch Ad Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-yellow-500/40 text-yellow-400 hover:bg-yellow-950/30"
                >
                  <Link to="/earn">Start Earning</Link>
                </Button>
              </div>
            </div>

            {/* Right: Token Status (if logged in) */}
            {identity ? (
              <div className="w-full md:w-80 rounded-2xl border border-yellow-500/30 bg-yellow-950/20 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-yellow-400 font-medium">
                    Your Tokens
                  </span>
                  <Badge
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-400"
                  >
                    {tokens.canWithdraw ? "Withdraw Ready!" : "Earning..."}
                  </Badge>
                </div>
                <div className="text-center py-2">
                  <p
                    className="text-6xl font-bold font-display text-yellow-300"
                    style={{ textShadow: "0 0 16px rgba(253,224,71,0.5)" }}
                  >
                    {tokens.balance}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    🪙 Tokens
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{tokens.tokensForNextWithdrawal}/25</span>
                    <span>
                      {tokens.canWithdraw
                        ? "₹1.25 ready!"
                        : `${tokens.tokensNeeded} more needed`}
                    </span>
                  </div>
                  <Progress value={tokens.progressPct} className="h-2" />
                </div>
                {tokens.canWithdraw ? (
                  <Button
                    asChild
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-bold"
                  >
                    <Link to="/earn">
                      <IndianRupee className="mr-2 h-4 w-4" />
                      Withdraw ₹1.25
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-yellow-500/40 text-yellow-400 hover:bg-yellow-950/30"
                  >
                    <Link to="/earn">Watch Ads to Earn More</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="w-full md:w-80 rounded-2xl border border-yellow-500/30 bg-yellow-950/20 p-6 text-center space-y-4">
                <Coins className="h-12 w-12 text-yellow-400/50 mx-auto" />
                <p className="text-muted-foreground text-sm">
                  Login karke earning shuru karo
                </p>
                <Button
                  onClick={login}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold w-full"
                >
                  Login & Earn
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ongoing Tournaments */}
      {ongoingTournaments.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold font-display text-primary">
                  🔴 Live Tournaments
                </h2>
                <p className="text-muted-foreground mt-2">
                  Battles happening right now
                </p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link to="/tournaments">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingTournaments.map((tournament) => (
                <Card
                  key={tournament.id.toString()}
                  className="border-primary/30 hover:border-primary/50 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge
                          variant="default"
                          className="mb-2 bg-destructive"
                        >
                          {getTournamentStatusLabel(tournament.status)}
                        </Badge>
                        <CardTitle className="text-xl">
                          {tournament.name}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription>
                      {getTournamentTypeLabel(tournament.tournamentType)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Entry Fee</span>
                      <span className="font-semibold">
                        {formatCurrency(tournament.entryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prize Pool</span>
                      <span className="font-semibold text-primary">
                        {formatCurrency(tournament.prizePool)}
                      </span>
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <Link
                        to="/tournament/$id"
                        params={{ id: tournament.id.toString() }}
                      >
                        View Details
                      </Link>
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
              <h2 className="text-3xl font-bold font-display">
                Upcoming Tournaments
              </h2>
              <p className="text-muted-foreground mt-2">
                Register now and secure your spot
              </p>
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
                        <CardTitle className="text-xl">
                          {tournament.name}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription>
                      {getTournamentTypeLabel(tournament.tournamentType)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Starts in:</span>
                    </div>
                    <CountdownTimer targetTime={tournament.startTime} compact />
                    <div className="flex justify-between text-sm border-t border-border pt-3">
                      <span className="text-muted-foreground">Entry Fee</span>
                      <span className="font-semibold">
                        {formatCurrency(tournament.entryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prize Pool</span>
                      <span className="font-semibold text-primary">
                        {formatCurrency(tournament.prizePool)}
                      </span>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-accent hover:bg-accent/90"
                    >
                      <Link
                        to="/tournament/$id"
                        params={{ id: tournament.id.toString() }}
                      >
                        Register Now
                      </Link>
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
              <h2 className="text-4xl font-bold font-display">
                Ready to Compete?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of players competing in daily tournaments. Start
                your journey to become a champion.
              </p>
              <Button
                onClick={login}
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-lg px-8"
              >
                Create Account
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Banner Ad — softly placed above footer, non-intrusive */}
      <section className="mt-auto pb-1">
        <AdMobBanner />
      </section>
    </div>
  );
}
