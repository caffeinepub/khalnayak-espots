import type { Variant_admin_player } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIIProfile } from "@/hooks/useIIProfile";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetCallerStats,
  useGetCallerTeamRegistrations,
  useGetTeams,
  useGetTournaments,
} from "@/hooks/useQueries";
import { type ReferralStats, getUserReferralStats } from "@/hooks/useReferral";
import { getReferralSettings } from "@/hooks/useReferralSettings";
import { useTokens } from "@/hooks/useTokens";
import { type PlayVoucher, getMyVouchers } from "@/pages/WalletPage";
import { formatCurrency, getTournamentStatusLabel } from "@/utils/format";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  Coins,
  Copy,
  DollarSign,
  ExternalLink,
  Gift,
  LogOut,
  MessageCircle,
  Send,
  ShoppingBag,
  Ticket,
  Trophy,
  User,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiGmail, SiInstagram, SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

export function ProfilePage() {
  const { identity, clear } = useInternetIdentity();
  const { profile } = useIIProfile();
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useGetCallerStats();
  const { data: registrations } = useGetCallerTeamRegistrations();
  const { data: tournaments } = useGetTournaments();
  const { data: teams } = useGetTeams();
  const tokens = useTokens();

  const myTournaments =
    registrations?.map((reg) => {
      const tournament = tournaments?.find((t) => t.id === reg.tournamentId);
      const team = teams?.find((t) => t.id === reg.teamId);
      return { registration: reg, tournament, team };
    }) || [];

  const handleLogout = () => {
    clear();
    void navigate({ to: "/login" });
    toast.success("Logged out successfully");
  };

  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  // Not logged in
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto gaming-card">
          <CardHeader className="text-center">
            <User
              className="h-16 w-16 mx-auto mb-4"
              style={{ color: "rgba(255,255,255,0.2)" }}
            />
            <CardTitle style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Login Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Please login to view your profile.
            </p>
            <Button asChild className="neon-btn w-full">
              <Link to="/login">Login with Internet Identity</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto gaming-card">
          <CardContent className="text-center py-10">
            <p className="text-muted-foreground mb-4">
              Setting up your profile...
            </p>
            <Button asChild className="neon-btn">
              <Link to="/setup-profile">Complete Setup</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Truncate principal
  const principalStr = profile.principal;
  const shortPrincipal =
    principalStr.length > 14
      ? `${principalStr.slice(0, 8)}...${principalStr.slice(-4)}`
      : principalStr;

  // Referral stats from localStorage
  const referralStats: ReferralStats = getUserReferralStats(
    profile.referral_code,
  );

  // Vouchers
  const myVouchers: PlayVoucher[] = getMyVouchers();

  const copyToClipboard = (text: string, label = "Copied!") => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(label))
      .catch(() => toast.error("Copy failed"));
  };

  // Referral link
  const referralLink = `https://khalnayak.app/ref/${profile.referral_code}`;
  const referralSettings = getReferralSettings();
  const referralEnabled = referralSettings.enabled;
  const shareMessage = `Join me on Khalnayak Espots! Use my referral code ${profile.referral_code} and get ₹2 bonus. Download here: ${referralLink}`;
  const shareMessageEncoded = encodeURIComponent(shareMessage);

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${shareMessageEncoded}`, "_blank");
  };

  const handleGmailShare = () => {
    const subject = encodeURIComponent("Join Khalnayak Espots & Get ₹2 Bonus!");
    const body = shareMessageEncoded;
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
      "_blank",
    );
  };

  const handleInstagramShare = () => {
    // Instagram doesn't support direct web share; copy link instead
    navigator.clipboard
      .writeText(shareMessage)
      .then(() => toast.success("📷 Message copied! Paste it on Instagram."))
      .catch(() => toast.error("Copy failed"));
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(referralLink);
    const quote = encodeURIComponent(
      `Join Khalnayak Espots! Use code ${profile.referral_code} and get ₹2 bonus.`,
    );
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
      "_blank",
    );
  };

  const handleCopyLink = () => {
    copyToClipboard(referralLink, "✅ Referral link copied!");
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-2xl">
      {/* Profile Card */}
      <Card
        className="gaming-card mb-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(22,33,62,0.95), rgba(10,10,10,0.95))",
          border: "1.5px solid rgba(0,255,136,0.2)",
        }}
      >
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #00FF88, #9d4edd)",
                color: "#0a0a0a",
                fontFamily: "'Orbitron', sans-serif",
                boxShadow: "0 0 20px rgba(0,255,136,0.4)",
              }}
            >
              {profile.display_name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2
                className="text-xl font-bold truncate"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#00FF88",
                }}
              >
                {profile.display_name}
              </h2>
              <p
                className="text-xs mt-0.5"
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "monospace",
                }}
              >
                {shortPrincipal}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  style={{
                    background: "rgba(0,255,136,0.15)",
                    color: "#00FF88",
                    border: "1px solid rgba(0,255,136,0.3)",
                    fontSize: 10,
                  }}
                >
                  🎮 Free Fire
                </Badge>
                <Badge
                  style={{
                    background: "rgba(157,78,221,0.15)",
                    color: "#9d4edd",
                    border: "1px solid rgba(157,78,221,0.3)",
                    fontSize: 10,
                  }}
                >
                  🔐 II Verified
                </Badge>
              </div>
            </div>

            {/* Logout */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              data-ocid="profile.delete_button"
              style={{ color: "rgba(255,100,100,0.7)" }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Free Fire Info */}
          <div
            className="mt-4 p-3 rounded-xl"
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,140,0,0.2)",
            }}
          >
            <p
              className="text-xs font-bold mb-2 uppercase tracking-widest"
              style={{
                color: "rgba(255,140,0,0.8)",
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              🔥 Free Fire Profile
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Nickname
                </p>
                <p className="text-sm font-bold" style={{ color: "#FFD700" }}>
                  {profile.freefire_nickname || "—"}
                </p>
              </div>
              <div>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Level
                </p>
                <p className="text-sm font-bold" style={{ color: "#FFD700" }}>
                  {profile.freefire_level || "—"}
                </p>
              </div>
              <div>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  UID
                </p>
                <p
                  className="text-sm font-mono"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {profile.freefire_uid}
                </p>
              </div>
              <div>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Wallet
                </p>
                <p className="text-sm font-bold" style={{ color: "#00FF88" }}>
                  {formatCurrency(BigInt(Math.floor(profile.wallet_balance)))}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          {statsLoading ? (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                {
                  label: "Matches",
                  value: Number(stats?.tournamentsParticipated ?? 0n),
                  icon: Trophy,
                },
                {
                  label: "Wins",
                  value: Number(stats?.tournamentsParticipated ?? 0n),
                  icon: CheckCircle2,
                },
                {
                  label: "Earnings",
                  value: formatCurrency(stats?.totalWinnings ?? 0n),
                  icon: DollarSign,
                },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center p-3 rounded-xl"
                  style={{
                    background: "rgba(0,255,136,0.05)",
                    border: "1px solid rgba(0,255,136,0.15)",
                  }}
                >
                  <Icon className="h-4 w-4 mb-1" style={{ color: "#00FF88" }} />
                  <p className="text-sm font-bold" style={{ color: "white" }}>
                    {value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {referralEnabled && (
        <>
          {/* ===== REFERRAL SECTION (Enhanced) ===== */}
          <Card
            className="gaming-card mb-6"
            style={{
              background: "rgba(10,10,10,0.95)",
              border: "1.5px solid rgba(157,78,221,0.35)",
              boxShadow: "0 0 24px rgba(157,78,221,0.12)",
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle
                className="text-sm tracking-widest uppercase"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#9d4edd",
                }}
              >
                🔗 Your Referral Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Code Display */}
              <div
                className="flex items-center justify-between p-4 rounded-xl mb-3"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(157,78,221,0.12), rgba(10,10,10,0.8))",
                  border: "1.5px solid rgba(157,78,221,0.4)",
                  boxShadow: "0 0 16px rgba(157,78,221,0.1)",
                }}
              >
                <code
                  className="text-2xl font-bold tracking-[0.3em]"
                  style={{ color: "#9d4edd", fontFamily: "monospace" }}
                >
                  {profile.referral_code}
                </code>
                <Button
                  size="sm"
                  data-ocid="profile.button"
                  onClick={handleCopyLink}
                  style={{
                    background: "linear-gradient(135deg, #9d4edd, #7c3aed)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 11,
                    letterSpacing: 1,
                  }}
                >
                  📋 COPY LINK
                </Button>
              </div>

              {/* Referral Link (small) */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4"
                style={{
                  background: "rgba(157,78,221,0.06)",
                  border: "1px solid rgba(157,78,221,0.15)",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>
                  🔗
                </span>
                <code
                  className="text-xs flex-1 truncate"
                  style={{
                    color: "rgba(157,78,221,0.8)",
                    fontFamily: "monospace",
                  }}
                >
                  {referralLink}
                </code>
              </div>

              {/* Share Buttons */}
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Share with Friends:
              </p>
              <div className="grid grid-cols-5 gap-2 mb-5">
                {/* WhatsApp */}
                <button
                  type="button"
                  data-ocid="profile.button"
                  onClick={handleWhatsAppShare}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(37,211,102,0.12)",
                    border: "1px solid rgba(37,211,102,0.3)",
                  }}
                >
                  <SiWhatsapp
                    className="h-6 w-6"
                    style={{ color: "#25D366" }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      color: "#25D366",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    WhatsApp
                  </span>
                </button>

                {/* Gmail */}
                <button
                  type="button"
                  data-ocid="profile.button"
                  onClick={handleGmailShare}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(234,67,53,0.12)",
                    border: "1px solid rgba(234,67,53,0.3)",
                  }}
                >
                  <SiGmail className="h-6 w-6" style={{ color: "#EA4335" }} />
                  <span
                    style={{
                      fontSize: 9,
                      color: "#EA4335",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Gmail
                  </span>
                </button>

                {/* Instagram */}
                <button
                  type="button"
                  data-ocid="profile.button"
                  onClick={handleInstagramShare}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(225,48,108,0.12)",
                    border: "1px solid rgba(225,48,108,0.3)",
                  }}
                >
                  <SiInstagram
                    className="h-6 w-6"
                    style={{ color: "#E1306C" }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      color: "#E1306C",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Insta
                  </span>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  data-ocid="profile.button"
                  onClick={handleFacebookShare}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(24,119,242,0.12)",
                    border: "1px solid rgba(24,119,242,0.3)",
                  }}
                >
                  <SiFacebook
                    className="h-6 w-6"
                    style={{ color: "#1877F2" }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      color: "#1877F2",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Facebook
                  </span>
                </button>

                {/* Copy Link */}
                <button
                  type="button"
                  data-ocid="profile.button"
                  onClick={handleCopyLink}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(0,255,136,0.1)",
                    border: "1px solid rgba(0,255,136,0.3)",
                  }}
                >
                  <Copy className="h-6 w-6" style={{ color: "#00FF88" }} />
                  <span
                    style={{
                      fontSize: 9,
                      color: "#00FF88",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Copy Link
                  </span>
                </button>
              </div>

              {/* How to Refer Guide */}
              <div
                className="rounded-xl p-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,255,136,0.05), rgba(157,78,221,0.05))",
                  border: "1px solid rgba(0,255,136,0.15)",
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#00FF88",
                  }}
                >
                  📢 How to Refer &amp; Earn
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      step: "1",
                      icon: "🔑",
                      text: "Get your unique referral code above",
                    },
                    {
                      step: "2",
                      icon: "📲",
                      text: "Share with friends on WhatsApp, Instagram, etc.",
                    },
                    {
                      step: "3",
                      icon: "✅",
                      text: "Friend registers using your code",
                    },
                    {
                      step: "4",
                      icon: "💰",
                      text: "You get ₹2 in wallet instantly!",
                    },
                  ].map(({ step, icon, text }) => (
                    <div key={step} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #00FF88, #9d4edd)",
                          color: "#0a0a0a",
                          fontFamily: "'Orbitron', sans-serif",
                        }}
                      >
                        {step}
                      </div>
                      <p
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        <span className="mr-1">{icon}</span>
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {referralStats.totalReferrals > 0 && (
                <p
                  className="text-xs mt-3 text-center"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Total referrals: {referralStats.totalReferrals} • Earned:{" "}
                  {formatCurrency(
                    BigInt(Math.floor(referralStats.totalEarnings)),
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Token Balance */}
      <Card
        className="gaming-card mb-6"
        style={{
          background: "rgba(10,10,10,0.9)",
          border: "1.5px solid rgba(255,215,0,0.25)",
        }}
      >
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-400" />
              <span
                className="text-sm font-bold"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#FFD700",
                }}
              >
                Tokens
              </span>
            </div>
            <span
              className="text-xl font-bold"
              style={{ color: "#FFD700", fontFamily: "'Orbitron', sans-serif" }}
            >
              {tokens.balance}
            </span>
          </div>
          <Progress value={(tokens.balance % 25) * 4} className="mt-2 h-1.5" />
          <p
            className="text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {tokens.balance % 25}/{25} to next ₹1.25 redeem
          </p>
        </CardContent>
      </Card>

      {/* Play Vouchers */}
      {myVouchers.length > 0 && (
        <Card
          className="gaming-card mb-6"
          style={{
            background: "rgba(10,10,10,0.9)",
            border: "1.5px solid rgba(0,255,136,0.15)",
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle
              className="text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "#00FF88" }}
            >
              🎟️ My Play Vouchers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {myVouchers.map((v, i) => (
                <div
                  key={v.code}
                  data-ocid={`profile.item.${i + 1}`}
                  className="flex items-center justify-between p-2 rounded-lg"
                  style={{
                    background: "rgba(0,255,136,0.06)",
                    border: "1px solid rgba(0,255,136,0.15)",
                  }}
                >
                  <div>
                    <code
                      className="text-sm font-mono"
                      style={{ color: "#00FF88" }}
                    >
                      {v.code}
                    </code>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {formatCurrency(BigInt(Math.floor(v.amount)))} •{" "}
                      {new Date(v.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-ocid={`profile.button.${i + 1}`}
                    onClick={() =>
                      copyToClipboard(v.code, "✅ Voucher code copied!")
                    }
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* My Tournaments */}
      <Card
        className="gaming-card"
        style={{
          background: "rgba(10,10,10,0.9)",
          border: "1.5px solid rgba(0,255,136,0.15)",
        }}
      >
        <CardHeader className="pb-2">
          <CardTitle
            className="text-sm tracking-widest uppercase"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "#00FF88" }}
          >
            ⚔️ My Tournaments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList
              className="w-full mb-4"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <TabsTrigger value="upcoming" data-ocid="profile.tab">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="live" data-ocid="profile.tab">
                Live
              </TabsTrigger>
              <TabsTrigger value="completed" data-ocid="profile.tab">
                Completed
              </TabsTrigger>
            </TabsList>
            {["upcoming", "live", "completed"].map((status) => {
              const filtered = myTournaments.filter(
                ({ tournament }) =>
                  tournament &&
                  getTournamentStatusLabel(tournament.status).toLowerCase() ===
                    status,
              );
              return (
                <TabsContent key={status} value={status}>
                  {filtered.length === 0 ? (
                    <div
                      data-ocid="profile.empty_state"
                      className="text-center py-8"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      No {status} tournaments
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {filtered.map(
                        ({ registration, tournament, team }, idx) => (
                          <div
                            key={registration.id}
                            data-ocid={`profile.item.${idx + 1}`}
                            className="p-3 rounded-xl"
                            style={{
                              background: "rgba(0,255,136,0.05)",
                              border: "1px solid rgba(0,255,136,0.15)",
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p
                                  className="text-sm font-bold"
                                  style={{
                                    fontFamily: "'Orbitron', sans-serif",
                                    color: "white",
                                    fontSize: 11,
                                  }}
                                >
                                  {tournament?.name}
                                </p>
                                {team && (
                                  <p
                                    className="text-xs mt-0.5"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                  >
                                    Team: {team.name}
                                  </p>
                                )}
                              </div>
                              <Badge
                                style={{
                                  background:
                                    status === "live"
                                      ? "rgba(255,68,68,0.2)"
                                      : status === "completed"
                                        ? "rgba(0,255,136,0.1)"
                                        : "rgba(255,215,0,0.1)",
                                  color:
                                    status === "live"
                                      ? "#FF4444"
                                      : status === "completed"
                                        ? "#00FF88"
                                        : "#FFD700",
                                  border: `1px solid ${
                                    status === "live"
                                      ? "rgba(255,68,68,0.3)"
                                      : status === "completed"
                                        ? "rgba(0,255,136,0.2)"
                                        : "rgba(255,215,0,0.2)"
                                  }`,
                                  fontSize: 9,
                                  textTransform: "uppercase",
                                }}
                              >
                                {status}
                              </Badge>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
