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
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  type LocalSession,
  getAllLocalUsers,
  useCurrentUser,
} from "@/hooks/useLocalAuth";
import {
  useGetCallerStats,
  useGetCallerTeamRegistrations,
  useGetCallerUserProfile,
  useGetCallerWallet,
  useGetTeams,
  useGetTournaments,
  useSaveUserProfile,
} from "@/hooks/useQueries";
import {
  type ReferralStats,
  generateReferralCode,
  getUserReferralStats,
} from "@/hooks/useReferral";
import { useTokens } from "@/hooks/useTokens";
import {
  type PlayVoucher,
  getMyVouchers,
  saveMyVouchers,
} from "@/pages/WalletPage";
import { formatCurrency, getTournamentStatusLabel } from "@/utils/format";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Coins,
  Copy,
  DollarSign,
  ExternalLink,
  Gift,
  Loader2,
  LogIn,
  MessageCircle,
  Phone,
  Send,
  ShoppingBag,
  Ticket,
  Trophy,
  User,
  UserPlus,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ProfilePage() {
  const { identity } = useInternetIdentity();
  const localUser = useCurrentUser();
  const { data: profile, isLoading: profileLoading } =
    useGetCallerUserProfile();
  const { data: stats, isLoading: statsLoading } = useGetCallerStats();
  const { data: registrations } = useGetCallerTeamRegistrations();
  const { data: tournaments } = useGetTournaments();
  const { data: teams } = useGetTeams();
  const { data: wallet } = useGetCallerWallet();
  const tokens = useTokens();

  // Get the full local user to access referralCode
  const localUserFull = localUser
    ? getAllLocalUsers().find((u) => u.id === localUser.userId)
    : undefined;

  const myTournaments =
    registrations?.map((reg) => {
      const tournament = tournaments?.find((t) => t.id === reg.tournamentId);
      const team = teams?.find((t) => t.id === reg.teamId);
      return { registration: reg, tournament, team };
    }) || [];

  // Not logged in (neither local auth nor II)
  if (!localUser && !identity) {
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
        <div className="flex gap-3">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90"
            data-ocid="profile.primary_button"
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-secondary/50 hover:border-secondary"
            data-ocid="profile.secondary_button"
          >
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Loading state (only if II identity is established)
  if (identity && profileLoading) {
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

  // Profile does not exist yet — show setup form (only if II identity is connected)
  if (identity && !profile) {
    return <ProfileSetupCard />;
  }

  // If user is logged in locally but not via II, show a minimal local profile view
  if (localUser && !identity) {
    return <LocalProfileView localUser={localUser} />;
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
            {/* Full Name from local auth */}
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg font-semibold">
                {localUser?.fullName || profile?.username || "Not set"}
              </p>
            </div>
            {/* Email — prefer local auth */}
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-base font-medium break-all">
                {localUser?.email || profile?.email || "Not set"}
              </p>
            </div>
            {/* Phone — from local auth only */}
            {localUser?.phone && (
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-base font-medium flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {localUser.phone}
                  </p>
                </div>
              </div>
            )}
            {/* Role */}
            {profile && (
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
            )}
            {/* Referral Code */}
            {profile?.referralCode && (
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
          <CardContent className="space-y-3">
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
              <Wallet className="h-5 w-5" />
              Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-4xl font-bold font-display text-primary">
                {wallet ? formatCurrency(wallet.balance) : "₹0.00"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Available balance
              </p>
            </div>
            <div className="pt-1">
              <p className="text-sm text-muted-foreground">Total Winnings</p>
              {statsLoading ? (
                <Skeleton className="h-6 w-20 mt-1" />
              ) : (
                <p className="text-lg font-semibold text-success">
                  {stats ? formatCurrency(stats.totalWinnings) : "₹0.00"}
                </p>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="flex-1 border-primary/40 text-xs"
              >
                <Link to="/wallet">
                  <DollarSign className="h-3.5 w-3.5 mr-1" />
                  Add Money
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token Balance Card */}
      <Card className="border-yellow-500/40 bg-gradient-to-br from-yellow-950/30 to-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Coins className="h-5 w-5 text-yellow-400" />
              Token Balance
            </CardTitle>
            <Button
              asChild
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
            >
              <Link to="/earn">Watch Ads & Earn</Link>
            </Button>
          </div>
          <CardDescription>
            Ads dekho, tokens kamao, real money withdraw karo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p
                className="text-5xl font-bold font-display text-yellow-300"
                style={{ textShadow: "0 0 14px rgba(253,224,71,0.5)" }}
              >
                {tokens.balance}
              </p>
              <p className="text-xs text-muted-foreground mt-1">🪙 Tokens</p>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{tokens.tokensForNextWithdrawal}/25 for withdrawal</span>
                <span
                  className={
                    tokens.canWithdraw ? "text-green-400 font-semibold" : ""
                  }
                >
                  {tokens.canWithdraw
                    ? "₹1.25 ready!"
                    : `${tokens.tokensNeeded} more needed`}
                </span>
              </div>
              <Progress value={tokens.progressPct} className="h-2" />
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-center">
                <div className="rounded-md bg-muted/40 py-1.5">
                  <p className="text-muted-foreground">Total Earned</p>
                  <p className="font-bold text-yellow-400">
                    {tokens.totalEarned} 🪙
                  </p>
                </div>
                <div className="rounded-md bg-muted/40 py-1.5">
                  <p className="text-muted-foreground">Withdrawn</p>
                  <p className="font-bold text-green-400">
                    ₹{((tokens.totalWithdrawn / 25) * 1.25).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Vouchers */}
      <MyVouchersCard
        userId={localUser?.userId || identity?.getPrincipal().toString() || ""}
      />

      {/* Refer & Earn */}
      {(localUserFull?.referralCode || profile?.referralCode) && (
        <ReferAndEarnCard
          userId={
            localUser?.userId || identity?.getPrincipal().toString() || ""
          }
          referralCode={
            localUserFull?.referralCode ||
            profile?.referralCode ||
            generateReferralCode(
              localUser?.userId ||
                identity?.getPrincipal().toString() ||
                "anon",
            )
          }
        />
      )}

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

// ─── Local Profile View (when only local auth, no II identity) ────────────────

function LocalProfileView({ localUser }: { localUser: LocalSession }) {
  const tokens = useTokens();
  const { login: iiLogin } = useInternetIdentity();
  // Get full local user to access referralCode
  const localUserFull = getAllLocalUsers().find(
    (u) => u.id === localUser.userId,
  );

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-display mb-2">My Profile</h1>
        <p className="text-muted-foreground">Welcome, {localUser.fullName}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Player Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg font-semibold">{localUser.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-base font-medium break-all">
                {localUser.email}
              </p>
            </div>
            {localUser.phone && (
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-base font-medium flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {localUser.phone}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge variant="secondary">PLAYER</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Token Balance */}
        <Card className="border-yellow-500/40 bg-gradient-to-br from-yellow-950/30 to-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Coins className="h-5 w-5" />
              Token Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p
              className="text-5xl font-bold font-display text-yellow-300"
              style={{ textShadow: "0 0 14px rgba(253,224,71,0.5)" }}
            >
              {tokens.balance}
            </p>
            <p className="text-xs text-muted-foreground">🪙 Tokens</p>
            <Progress value={tokens.progressPct} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {tokens.tokensForNextWithdrawal}/25 for withdrawal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Refer & Earn */}
      {localUserFull?.referralCode && (
        <ReferAndEarnCard
          userId={localUser.userId}
          referralCode={localUserFull.referralCode}
        />
      )}

      {/* Connect blockchain identity */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔗 Connect Blockchain Identity
          </CardTitle>
          <CardDescription>
            Connect your Internet Identity to unlock tournament participation,
            wallet deposits, and live leaderboards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={iiLogin}
            className="bg-primary hover:bg-primary/90"
            data-ocid="profile.primary_button"
          >
            Connect Internet Identity
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Profile Setup Card ────────────────────────────────────────────────────────

function ProfileSetupCard() {
  const { identity } = useInternetIdentity();
  const localUser = useCurrentUser();
  const saveProfileMutation = useSaveUserProfile();
  const [username, setUsername] = useState(() => {
    // Pre-fill from local auth if available
    if (localUser?.fullName) return localUser.fullName;
    if (!identity) return "";
    return `Player_${identity.getPrincipal().toString().slice(0, 8)}`;
  });
  const [email, setEmail] = useState(() => localUser?.email || "");

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

// ─── My Vouchers Card ─────────────────────────────────────────────────────────

function MyVouchersCard({ userId }: { userId: string }) {
  const [vouchers, setVouchers] = useState<PlayVoucher[]>(() =>
    getMyVouchers(userId || undefined),
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (voucher: PlayVoucher) => {
    try {
      await navigator.clipboard.writeText(voucher.code);
      setCopiedId(voucher.id);
      toast.success("Voucher code copied!", {
        description: "Paste it in Google Play Store to redeem",
      });
      setTimeout(() => setCopiedId(null), 3000);
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  };

  const handleMarkUsed = (voucherId: string) => {
    const allVouchers = getMyVouchers();
    const updated = allVouchers.map((v) =>
      v.id === voucherId ? { ...v, status: "used" as const } : v,
    );
    saveMyVouchers(updated);
    setVouchers(updated.filter((v) => v.userId === userId));
    toast.success("Voucher marked as used");
  };

  const isExpired = (expiry: number) => Date.now() > expiry;

  if (vouchers.length === 0) return null;

  const unusedCount = vouchers.filter((v) => v.status === "unused").length;

  return (
    <Card
      className="border-green-500/40 bg-gradient-to-br from-green-950/20 to-card"
      data-ocid="profile.my_vouchers.card"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Ticket className="h-5 w-5" />
            My Vouchers
          </CardTitle>
          {unusedCount > 0 && (
            <Badge className="bg-green-600/30 text-green-300 border-green-500/40">
              {unusedCount} Unused
            </Badge>
          )}
        </div>
        <CardDescription>Your Google Play Store voucher codes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {vouchers.map((voucher, idx) => {
          const expired = isExpired(voucher.expiresAt);
          const statusColor =
            voucher.status === "used"
              ? "border-muted-foreground/30 bg-muted/10 opacity-60"
              : expired
                ? "border-red-500/30 bg-red-950/10 opacity-70"
                : "border-green-500/30 bg-green-950/20";

          return (
            <div
              key={voucher.id}
              className={`rounded-xl border p-4 space-y-3 transition-colors ${statusColor}`}
              data-ocid={`profile.my_vouchers.item.${idx + 1}`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg font-bold text-foreground">
                      ₹{voucher.amount}
                    </span>
                    <Badge
                      variant={
                        voucher.status === "used"
                          ? "secondary"
                          : expired
                            ? "destructive"
                            : "default"
                      }
                      className={
                        voucher.status === "unused" && !expired
                          ? "bg-green-600/30 text-green-300 border-green-500/40"
                          : ""
                      }
                    >
                      {voucher.status === "used"
                        ? "Used"
                        : expired
                          ? "Expired"
                          : "Unused"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Created:{" "}
                    {new Date(voucher.createdAt).toLocaleDateString("en-IN")}
                    {" · "}
                    Expires:{" "}
                    {new Date(voucher.expiresAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <ShoppingBag className="h-4 w-4 text-green-400/60 shrink-0 mt-1" />
              </div>

              {/* Voucher code */}
              <div
                className="rounded-lg border border-green-500/20 bg-black/30 px-4 py-2.5 font-mono text-base font-bold tracking-[0.15em] text-center select-all"
                style={
                  voucher.status === "unused" && !expired
                    ? { textShadow: "0 0 10px rgba(74,222,128,0.35)" }
                    : {}
                }
              >
                {voucher.code}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {voucher.status === "unused" && !expired && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`flex-1 border-green-500/40 text-xs ${
                        copiedId === voucher.id
                          ? "bg-green-600/30 text-green-300"
                          : "hover:bg-green-950/40"
                      }`}
                      onClick={() => handleCopy(voucher)}
                      data-ocid={`profile.my_vouchers.copy_button.${idx + 1}`}
                    >
                      {copiedId === voucher.id ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 mr-1.5" />
                          Copy Code
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500/40 text-xs hover:bg-green-950/40"
                      onClick={() =>
                        window.open(
                          "https://play.google.com/store",
                          "_blank",
                          "noopener",
                        )
                      }
                      data-ocid={`profile.my_vouchers.redeem_button.${idx + 1}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      Redeem
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => handleMarkUsed(voucher.id)}
                      data-ocid={`profile.my_vouchers.used_button.${idx + 1}`}
                    >
                      Mark Used
                    </Button>
                  </>
                )}
                {(voucher.status === "used" || expired) && (
                  <p className="text-xs text-muted-foreground italic">
                    {voucher.status === "used"
                      ? "This voucher has been redeemed"
                      : "This voucher has expired"}
                  </p>
                )}
              </div>

              {/* Redeem instructions for unused vouchers */}
              {voucher.status === "unused" && !expired && (
                <details className="group">
                  <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    How to redeem ▸
                  </summary>
                  <ol className="mt-2 space-y-1 text-xs text-muted-foreground list-none pl-1">
                    {[
                      "Open Google Play Store app",
                      'Tap profile icon → "Payments & subscriptions"',
                      'Select "Redeem gift code"',
                      "Paste your voucher code → tap Redeem",
                    ].map((step, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static steps
                      <li key={i} className="flex gap-2">
                        <span className="text-green-400 font-bold shrink-0">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </details>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

// ─── Refer & Earn Card ────────────────────────────────────────────────────────

function ReferAndEarnCard({
  userId,
  referralCode,
}: {
  userId: string;
  referralCode: string;
}) {
  const [copied, setCopied] = useState(false);
  const stats: ReferralStats = userId
    ? getUserReferralStats(userId)
    : { totalReferrals: 0, totalEarnings: 0, fraudAttempts: 0, referrals: [] };

  const appUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://khalnayak.app";
  const shareText = `Join Khalnayak Espots - India's Best Free Fire Tournament Platform! Use my referral code ${referralCode} to register and win prizes! 🎮🔥 Register here: ${appUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      toast.success("Referral code copied!", {
        description: `Code "${referralCode}" is now in your clipboard.`,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(`Join Khalnayak Espots! Use referral code ${referralCode} when registering 🎮`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const maskName = (name: string) => {
    if (!name || name.length < 2) return "****";
    return `${name.slice(0, 2)}****`;
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="border-green-500/40 bg-gradient-to-br from-green-950/40 to-yellow-950/20">
      <CardHeader>
        <CardTitle
          className="flex items-center gap-2 text-xl"
          style={{ textShadow: "0 0 12px rgba(74,222,128,0.3)" }}
        >
          <Gift className="h-5 w-5 text-green-400" />
          <span className="text-green-400">Refer &amp; Earn</span>
        </CardTitle>
        <CardDescription>
          Share your code. Friend registers → You earn ₹2!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Referral Code Display */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Your Referral Code
          </p>
          <div className="flex items-center gap-3">
            <div
              className="flex-1 py-3 px-4 rounded-lg border border-green-500/40 bg-green-950/30 font-mono text-2xl font-bold tracking-[0.2em] text-green-300"
              style={{ textShadow: "0 0 10px rgba(74,222,128,0.4)" }}
            >
              {referralCode}
            </div>
            <Button
              onClick={handleCopy}
              size="sm"
              className={`px-4 transition-all duration-200 ${
                copied
                  ? "bg-green-600 hover:bg-green-600 text-white"
                  : "bg-green-700/60 hover:bg-green-600 text-green-100 border border-green-500/40"
              }`}
              data-ocid="referral.copy_button"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1.5" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Share Via
          </p>
          <div className="flex gap-3">
            <Button
              onClick={handleWhatsApp}
              className="flex-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] font-semibold"
              size="sm"
              data-ocid="referral.whatsapp_button"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button
              onClick={handleTelegram}
              className="flex-1 bg-[#229ED9]/20 hover:bg-[#229ED9]/30 border border-[#229ED9]/40 text-[#229ED9] font-semibold"
              size="sm"
              data-ocid="referral.telegram_button"
            >
              <Send className="h-4 w-4 mr-2" />
              Telegram
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-green-500/20 bg-green-950/20 p-3 text-center">
            <p className="text-2xl font-bold text-green-400">
              {stats.totalReferrals}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Total Referrals
            </p>
          </div>
          <div className="rounded-lg border border-yellow-500/20 bg-yellow-950/20 p-3 text-center">
            <p className="text-2xl font-bold text-yellow-400">
              ₹{stats.totalEarnings.toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Earnings</p>
          </div>
          <div className="rounded-lg border border-border/30 bg-muted/10 p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              ₹{(stats.totalReferrals * 2).toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Total Paid</p>
          </div>
        </div>

        {/* Referred Friends List */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Referred Friends
          </p>
          {stats.referrals.length === 0 ? (
            <div
              className="text-center py-6 rounded-lg border border-dashed border-green-500/20 bg-green-950/10"
              data-ocid="referral.empty_state"
            >
              <Gift className="h-8 w-8 text-green-500/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Share your code to start earning!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Earn ₹2 for every friend who registers
              </p>
            </div>
          ) : (
            <div
              className="space-y-2 max-h-52 overflow-y-auto"
              data-ocid="referral.list"
            >
              {stats.referrals.map((ref, idx) => (
                <div
                  key={ref.id}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-sm ${
                    ref.status === "success"
                      ? "border-green-500/20 bg-green-950/15"
                      : "border-red-500/20 bg-red-950/15"
                  }`}
                  data-ocid={`referral.item.${idx + 1}`}
                >
                  <div className="flex items-center gap-2">
                    {ref.status === "success" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">
                        {maskName(ref.newUserName)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(ref.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    {ref.status === "success" ? (
                      <Badge className="bg-green-700/40 text-green-300 border-green-500/30 text-xs">
                        ₹2 earned
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="text-xs opacity-80"
                      >
                        Blocked
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="rounded-lg border border-border/30 bg-muted/5 p-3 space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            How It Works
          </p>
          {[
            "Share your unique referral code with friends",
            "Friend registers using your code",
            "You instantly earn ₹2 in your wallet",
          ].map((step, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list, order never changes
            <p key={i} className="text-xs text-muted-foreground flex gap-2">
              <span className="text-green-400 font-bold shrink-0">
                {i + 1}.
              </span>
              {step}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
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
