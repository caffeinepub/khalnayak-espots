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
  CheckCircle2,
  Clock,
  Coins,
  IndianRupee,
  LogIn,
  Play,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Ad Simulation ─────────────────────────────────────────────────────────────
// In a real app this would integrate AdMob / Google Ad Manager.
// Here we simulate with a countdown timer.

const AD_DURATION_SECONDS = 15; // short ad per token
const WITHDRAWAL_AD_SECONDS = 60; // 1-minute rewarded ad for withdrawal

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
  const [adState, setAdState] = useState<"idle" | "playing" | "done">("idle");
  const [countdown, setCountdown] = useState(AD_DURATION_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAd = useCallback(() => {
    setAdState("playing");
    setCountdown(AD_DURATION_SECONDS);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setAdState("done");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const claimToken = useCallback(() => {
    onAdComplete();
    setAdState("idle");
    setCountdown(AD_DURATION_SECONDS);
    toast.success("🪙 +1 Token Earned!", {
      description: "Keep watching ads to earn more tokens!",
    });
  }, [onAdComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
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
        {adState === "idle" && (
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
                  15 sec ad
                </Badge>
              </div>
            </div>
            <Button
              onClick={startAd}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 text-lg shadow-lg"
              style={{ boxShadow: "0 0 20px rgba(234,179,8,0.4)" }}
              data-ocid="earn.primary_button"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Ad & Earn 1 Token
            </Button>
            <p className="text-xs text-muted-foreground">
              Unlimited ads available • 1 Token per ad
            </p>
          </div>
        )}

        {adState === "playing" && (
          <div className="text-center space-y-4" data-ocid="earn.loading_state">
            {/* Simulated Ad Playing */}
            <div className="w-full h-40 rounded-xl border-2 border-yellow-500/60 bg-yellow-950/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 via-yellow-800/30 to-yellow-900/20 animate-pulse" />
              <div className="relative z-10 text-center space-y-2">
                <div className="text-5xl font-bold font-display text-yellow-300">
                  {countdown}
                </div>
                <p className="text-sm text-yellow-400">Ad playing...</p>
              </div>
            </div>
            <div className="space-y-2">
              <Progress
                value={
                  ((AD_DURATION_SECONDS - countdown) / AD_DURATION_SECONDS) *
                  100
                }
                className="h-3"
              />
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                {countdown} seconds remaining...
              </p>
            </div>
            <Button
              disabled
              size="lg"
              className="opacity-50 cursor-not-allowed"
            >
              Please wait...
            </Button>
          </div>
        )}

        {adState === "done" && (
          <div className="text-center space-y-4" data-ocid="earn.success_state">
            <div className="w-full h-40 rounded-xl border-2 border-green-500/50 bg-green-950/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto" />
                <p className="text-green-400 font-semibold">
                  Ad complete! Claim your token
                </p>
              </div>
            </div>
            <Button
              onClick={claimToken}
              size="lg"
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-10 text-lg"
              data-ocid="earn.primary_button"
            >
              <Coins className="mr-2 h-5 w-5" />
              Claim 1 Token!
            </Button>
          </div>
        )}

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
  );
}

// ─── Withdrawal Section ────────────────────────────────────────────────────────

function WithdrawalSection({
  tokens,
}: {
  tokens: ReturnType<typeof useTokens>;
}) {
  const [adState, setAdState] = useState<"idle" | "playing" | "done">("idle");
  const [countdown, setCountdown] = useState(WITHDRAWAL_AD_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startWithdrawalAd = useCallback(() => {
    if (!tokens.canWithdraw) return;
    setAdState("playing");
    setCountdown(WITHDRAWAL_AD_SECONDS);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setAdState("done");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [tokens.canWithdraw]);

  const confirmWithdrawal = useCallback(() => {
    const success = tokens.withdrawTokens();
    if (success) {
      setAdState("idle");
      setCountdown(WITHDRAWAL_AD_SECONDS);
      toast.success("💰 ₹1.25 Wallet mein add ho gaye!", {
        description:
          "25 tokens deduct ho gaye. Transaction history mein dekho.",
        duration: 5000,
      });
    }
  }, [tokens]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
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
          25 tokens = ₹1.25 wallet mein. Ek rewarded video ad dekhna hoga.
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

        {/* Withdraw button / ad states */}
        {adState === "idle" && (
          <Button
            onClick={startWithdrawalAd}
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
        )}

        {adState === "playing" && (
          <div className="space-y-3" data-ocid="earn.loading_state">
            <div className="w-full h-32 rounded-xl border-2 border-yellow-500/50 bg-yellow-950/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 via-yellow-700/20 to-yellow-900/20 animate-pulse" />
              <div className="relative z-10 text-center">
                <div className="text-4xl font-bold font-display text-yellow-300">
                  {countdown}s
                </div>
                <p className="text-xs text-yellow-400 mt-1">
                  Rewarded video playing...
                </p>
              </div>
            </div>
            <Progress
              value={
                ((WITHDRAWAL_AD_SECONDS - countdown) / WITHDRAWAL_AD_SECONDS) *
                100
              }
              className="h-3"
            />
            <Button
              disabled
              size="lg"
              className="w-full opacity-60 cursor-not-allowed"
            >
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Ad complete karo... ({countdown}s)
            </Button>
          </div>
        )}

        {adState === "done" && (
          <div className="space-y-3 text-center" data-ocid="earn.success_state">
            <div className="rounded-xl border border-green-500/40 bg-green-950/20 p-4">
              <CheckCircle2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 font-semibold">Ad complete!</p>
              <p className="text-sm text-muted-foreground">
                Confirm karke ₹1.25 pao
              </p>
            </div>
            <Button
              onClick={confirmWithdrawal}
              size="lg"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold text-base"
              data-ocid="earn.confirm_button"
            >
              <IndianRupee className="mr-2 h-5 w-5" />
              Confirm — ₹1.25 Wallet mein add karo
            </Button>
          </div>
        )}

        {!tokens.canWithdraw && adState === "idle" && (
          <p className="text-xs text-center text-muted-foreground">
            Aur {tokens.tokensNeeded} ads dekho phir withdraw button active ho
            jayega
          </p>
        )}
      </CardContent>
    </Card>
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
