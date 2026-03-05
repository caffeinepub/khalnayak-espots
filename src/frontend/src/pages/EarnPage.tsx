import { AdModal } from "@/components/AdModal";
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
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useTokens } from "@/hooks/useTokens";
import { Link } from "@tanstack/react-router";
import {
  Coins,
  IndianRupee,
  LogIn,
  Play,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const AD_DURATION_SECONDS = 30;
const WITHDRAWAL_AD_SECONDS = 60;

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function EarnPage() {
  const { identity, login } = useInternetIdentity();
  const tokens = useTokens();

  if (!identity) {
    return (
      <div
        className="container py-20 flex flex-col items-center justify-center gap-6 text-center"
        data-ocid="earn.page"
      >
        <div className="rounded-full bg-yellow-500/10 p-6 border border-yellow-500/30">
          <Coins className="h-12 w-12 text-yellow-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display mb-2 text-yellow-400">
            Earn Tokens
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Login karke ads dekho, tokens kamao aur real money withdraw karo!
          </p>
        </div>
        <Button
          onClick={login}
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
          data-ocid="earn.primary_button"
        >
          <LogIn className="mr-2 h-5 w-5" />
          Login to Start Earning
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-8" data-ocid="earn.page">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Coins className="h-8 w-8 text-yellow-400" />
          <h1 className="text-4xl font-bold font-display text-yellow-400">
            EARN TOKENS
          </h1>
          <Coins className="h-8 w-8 text-yellow-400" />
        </div>
        <p className="text-muted-foreground text-lg">
          Ads dekho → Tokens kamao → Real Money withdraw karo
        </p>
      </div>

      {/* 3-system explainer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: "▶️",
            label: "System 1: Manual Ads",
            desc: "Watch Ad → Get 1 Token",
            sub: "Unlimited • No daily limit",
            color: "border-yellow-500/30 bg-yellow-950/20",
          },
          {
            icon: "🎮",
            label: "System 2: Tournament Join",
            desc: "Register → Watch Ad → Get +1 Token",
            sub: "Bonus token on every registration",
            color: "border-cyan-500/30 bg-cyan-950/20",
          },
          {
            icon: "💰",
            label: "System 3: Withdrawal",
            desc: "25 Tokens → Watch Ad → ₹1.25",
            sub: "Multiple withdrawals allowed",
            color: "border-green-500/30 bg-green-950/20",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border p-4 space-y-1 ${item.color}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm font-bold">{item.label}</p>
            </div>
            <p className="text-sm font-semibold text-yellow-300">{item.desc}</p>
            <p className="text-xs text-muted-foreground">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Token Balance Card + Progress */}
      <TokenBalanceCard tokens={tokens} />

      {/* Watch Ad Section */}
      <WatchAdSection onAdComplete={tokens.earnToken} />

      {/* Withdrawal Section */}
      <WithdrawalSection tokens={tokens} />

      {/* Transaction History */}
      <TokenHistorySection transactions={tokens.transactions} />
    </div>
  );
}

// ─── Token Balance Card ────────────────────────────────────────────────────────

function TokenBalanceCard({
  tokens,
}: {
  tokens: ReturnType<typeof useTokens>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Balance */}
      <Card className="border-yellow-500/40 bg-gradient-to-br from-yellow-950/40 to-yellow-900/20 md:col-span-1">
        <CardContent className="pt-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Coins className="h-6 w-6 text-yellow-400" />
            <span className="text-sm text-yellow-400 font-medium uppercase tracking-widest">
              Token Balance
            </span>
          </div>
          <p
            className="text-6xl font-bold font-display text-yellow-300"
            style={{ textShadow: "0 0 20px rgba(253,224,71,0.6)" }}
            data-ocid="earn.card"
          >
            {tokens.balance}
          </p>
          <p className="text-xs text-muted-foreground">
            Total Earned: {tokens.totalEarned} tokens
          </p>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="border-yellow-500/30 bg-card/50 md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-yellow-400" />
            Next Withdrawal Progress
          </CardTitle>
          <CardDescription>
            {tokens.tokensForNextWithdrawal}/{tokens.TOKENS_FOR_WITHDRAWAL}{" "}
            tokens collected
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {tokens.tokensForNextWithdrawal} tokens
              </span>
              <span className="text-yellow-400 font-semibold">
                {tokens.TOKENS_FOR_WITHDRAWAL} tokens needed
              </span>
            </div>
            <Progress
              value={tokens.progressPct}
              className="h-4"
              style={
                {
                  "--progress-color": "rgb(234,179,8)",
                } as React.CSSProperties
              }
            />
            <p className="text-xs text-center text-muted-foreground">
              {tokens.canWithdraw ? (
                <span className="text-green-400 font-semibold">
                  ✅ You can withdraw now! ₹{tokens.RUPEES_PER_WITHDRAWAL} ready
                </span>
              ) : (
                <>
                  {tokens.tokensNeeded} more tokens needed → ₹
                  {tokens.RUPEES_PER_WITHDRAWAL} milenge
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-lg bg-muted/40 p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Total Withdrawn
              </p>
              <p className="font-bold text-yellow-400">
                {tokens.totalWithdrawn} tokens
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Total Earned (₹)
              </p>
              <p className="font-bold text-green-400">
                ₹
                {(
                  (tokens.totalWithdrawn / tokens.TOKENS_FOR_WITHDRAWAL) *
                  tokens.RUPEES_PER_WITHDRAWAL
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Watch Ad Section ──────────────────────────────────────────────────────────

function WatchAdSection({ onAdComplete }: { onAdComplete: () => void }) {
  const [adOpen, setAdOpen] = useState(false);

  const handleComplete = useCallback(() => {
    setAdOpen(false);
    onAdComplete();
    toast.success("🪙 +1 Token Earned!", {
      description: "Keep watching ads to earn more tokens!",
    });
  }, [onAdComplete]);

  const handleCancel = useCallback(() => {
    setAdOpen(false);
  }, []);

  return (
    <>
      <AdModal
        isOpen={adOpen}
        onComplete={handleComplete}
        onCancel={handleCancel}
        duration={AD_DURATION_SECONDS}
        title="Watch Ad & Earn Token"
        rewardLabel="+1 Token"
      />

      <Card
        className="border-yellow-500/30 bg-gradient-to-br from-card to-yellow-950/20"
        data-ocid="earn.panel"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Zap className="h-5 w-5" />
            Watch Ads & Earn Tokens
          </CardTitle>
          <CardDescription>
            Koi daily limit nahi — jitne chahe utne ads dekho! Har ad = 1 Token
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            {/* Ad Placeholder Banner */}
            <div className="w-full h-40 rounded-xl border-2 border-dashed border-yellow-500/40 bg-yellow-950/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Play className="h-10 w-10 text-yellow-500/60 mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Advertisement will play here
                </p>
                <Badge
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-400"
                >
                  30 sec ad
                </Badge>
              </div>
            </div>
            <Button
              onClick={() => setAdOpen(true)}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 text-lg shadow-lg"
              style={{ boxShadow: "0 0 20px rgba(234,179,8,0.4)" }}
              data-ocid="earn.primary_button"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Ad & Earn 1 Token
            </Button>
            <p className="text-xs text-muted-foreground">
              Unlimited ads available • 1 Token per ad • 30 sec ad
            </p>
          </div>

          {/* How it works */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border/50">
            {[
              { step: "1", label: "Ad Dekho", icon: "▶️" },
              { step: "2", label: "Token Pao", icon: "🪙" },
              { step: "3", label: "Withdraw Karo", icon: "💰" },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-1">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-xs text-muted-foreground font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// ─── Withdrawal Section ────────────────────────────────────────────────────────

function WithdrawalSection({
  tokens,
}: {
  tokens: ReturnType<typeof useTokens>;
}) {
  const [adOpen, setAdOpen] = useState(false);

  const handleComplete = useCallback(() => {
    setAdOpen(false);
    const success = tokens.withdrawTokens();
    if (success) {
      toast.success("💰 ₹1.25 Wallet mein add ho gaye!", {
        description:
          "25 tokens deduct ho gaye. Transaction history mein dekho.",
        duration: 5000,
      });
    }
  }, [tokens]);

  const handleCancel = useCallback(() => {
    setAdOpen(false);
  }, []);

  return (
    <>
      <AdModal
        isOpen={adOpen}
        onComplete={handleComplete}
        onCancel={handleCancel}
        duration={WITHDRAWAL_AD_SECONDS}
        title="Watch Ad to Withdraw"
        rewardLabel="₹1.25"
      />

      <Card
        className={`border-2 transition-all ${
          tokens.canWithdraw
            ? "border-yellow-500/60 bg-gradient-to-br from-yellow-950/30 to-card shadow-lg"
            : "border-border/40 bg-card/50 opacity-80"
        }`}
        data-ocid="earn.panel"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee
              className={`h-5 w-5 ${tokens.canWithdraw ? "text-yellow-400" : "text-muted-foreground"}`}
            />
            <span
              className={
                tokens.canWithdraw ? "text-yellow-400" : "text-muted-foreground"
              }
            >
              Token Withdrawal
            </span>
            {tokens.canWithdraw && (
              <Badge className="bg-green-500 text-black text-xs animate-pulse ml-1">
                AVAILABLE
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            25 tokens = ₹1.25 wallet mein. Ek 1-minute rewarded video ad dekhna
            hoga.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rate card */}
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-950/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-500/20 p-2">
                  <Coins className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-yellow-300">
                    25 Tokens = ₹1.25
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Directly wallet mein add hoga
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Your balance</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {tokens.balance}
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{tokens.tokensForNextWithdrawal}/25 tokens</span>
              <span>{tokens.progressPct}%</span>
            </div>
            <Progress value={tokens.progressPct} className="h-2" />
          </div>

          {/* Withdraw button */}
          <Button
            onClick={() => setAdOpen(true)}
            disabled={!tokens.canWithdraw}
            size="lg"
            className={`w-full font-bold text-base ${
              tokens.canWithdraw
                ? "bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            style={
              tokens.canWithdraw
                ? { boxShadow: "0 0 24px rgba(234,179,8,0.5)" }
                : {}
            }
            data-ocid="earn.primary_button"
          >
            {tokens.canWithdraw ? (
              <>
                <IndianRupee className="mr-2 h-5 w-5" />
                Withdraw ₹1.25 (Watch 1-min Ad)
              </>
            ) : (
              <>
                <Coins className="mr-2 h-5 w-5" />
                {tokens.tokensNeeded} aur tokens chahiye
              </>
            )}
          </Button>

          {!tokens.canWithdraw && (
            <p className="text-xs text-center text-muted-foreground">
              Aur {tokens.tokensNeeded} ads dekho phir withdraw button active ho
              jayega
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}

// ─── Token History Section ─────────────────────────────────────────────────────

function TokenHistorySection({
  transactions,
}: {
  transactions: ReturnType<typeof useTokens>["transactions"];
}) {
  return (
    <Card className="border-border/50" data-ocid="earn.panel">
      <CardHeader>
        <CardTitle className="text-base">Token History</CardTitle>
        <CardDescription>
          Aapke saare earn aur withdrawal records
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div
            className="text-center text-muted-foreground py-8"
            data-ocid="earn.empty_state"
          >
            <Coins className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Koi transactions nahi. Pehla ad dekho!</p>
            <Link
              to="/earn"
              className="text-yellow-400 text-sm mt-2 inline-block hover:underline"
            >
              Earning shuru karo ↑
            </Link>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {transactions.map((tx, idx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20"
                data-ocid={`earn.item.${idx + 1}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-1.5 ${
                      tx.type === "earned"
                        ? "bg-yellow-500/20"
                        : "bg-green-500/20"
                    }`}
                  >
                    {tx.type === "earned" ? (
                      <Coins className="h-3.5 w-3.5 text-yellow-400" />
                    ) : (
                      <IndianRupee className="h-3.5 w-3.5 text-green-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.timestamp).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {tx.type === "earned" ? (
                    <p className="text-sm font-bold text-yellow-400">
                      +{tx.amount} 🪙
                    </p>
                  ) : (
                    <div>
                      <p className="text-sm font-bold text-green-400">
                        +₹{tx.rupeesAmount?.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        -{tx.amount} tokens
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Today's Ad Stats Mini Card ────────────────────────────────────────────────

export function TodayAdStatsBar() {
  const tokens = useTokens();
  const stats = tokens.adStats;

  if (stats.totalAdsToday === 0) return null;

  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground px-4 py-2 rounded-lg border border-yellow-500/20 bg-yellow-950/10">
      <Trophy className="h-3.5 w-3.5 text-yellow-400" />
      <span>
        Today:{" "}
        <strong className="text-yellow-400">{stats.totalAdsToday} ads</strong>{" "}
        watched,{" "}
        <strong className="text-yellow-400">
          {stats.totalTokensEarnedToday} tokens
        </strong>{" "}
        earned
      </span>
    </div>
  );
}
