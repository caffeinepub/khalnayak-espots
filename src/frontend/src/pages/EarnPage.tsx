import { AdModal } from "@/components/AdModal";
import { Button } from "@/components/ui/button";
import { useAdMob } from "@/hooks/useAdMob";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useTokens } from "@/hooks/useTokens";
import { Link } from "@tanstack/react-router";
import {
  Coins,
  IndianRupee,
  Loader2,
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
    <div
      className="min-h-screen pb-24"
      style={{ background: "#0A0A0A" }}
      data-ocid="earn.page"
    >
      <div className="container py-10 space-y-8 px-4 md:px-6">
        {/* Page Header */}
        <div
          className="text-center space-y-2 pb-4"
          style={{ borderBottom: "1px solid rgba(255,215,0,0.2)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Coins className="h-8 w-8 text-yellow-400" />
            <h1
              className="text-5xl font-bold font-display text-yellow-400 glow-yellow"
              style={{
                textShadow:
                  "0 0 20px rgba(253,224,71,0.8), 0 0 40px rgba(253,224,71,0.4)",
              }}
            >
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
              bg: "rgba(66,32,6,0.5)",
              border: "rgba(234,179,8,0.3)",
              shadow: "rgba(234,179,8,0.1)",
            },
            {
              icon: "🎮",
              label: "System 2: Tournament Join",
              desc: "Register → Watch Ad → Get +1 Token",
              sub: "Bonus token on every registration",
              bg: "rgba(6,40,66,0.5)",
              border: "rgba(34,211,238,0.3)",
              shadow: "rgba(34,211,238,0.1)",
            },
            {
              icon: "💰",
              label: "System 3: Withdrawal",
              desc: "25 Tokens → Watch Ad → ₹1.25",
              sub: "Multiple withdrawals allowed",
              bg: "rgba(6,50,20,0.5)",
              border: "rgba(0,255,136,0.3)",
              shadow: "rgba(0,255,136,0.1)",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-5 space-y-1"
              style={{
                background: item.bg,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${item.border}`,
                boxShadow: `0 4px 20px ${item.shadow}`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <p className="text-sm font-bold">{item.label}</p>
              </div>
              <p className="text-sm font-semibold text-yellow-300">
                {item.desc}
              </p>
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
      <div
        className="rounded-2xl md:col-span-1"
        style={{
          background:
            "linear-gradient(135deg, rgba(66,32,6,0.8) 0%, rgba(40,20,4,0.6) 100%)",
          border: "1px solid rgba(234,179,8,0.4)",
          boxShadow:
            "0 0 30px rgba(234,179,8,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="pt-6 pb-6 px-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Coins className="h-6 w-6 text-yellow-400" />
            <span className="text-sm text-yellow-400 font-medium uppercase tracking-widest">
              Token Balance
            </span>
          </div>
          <p
            className="text-6xl font-bold font-display text-yellow-300"
            style={{ textShadow: "0 0 24px rgba(253,224,71,0.7)" }}
            data-ocid="earn.card"
          >
            {tokens.balance}
          </p>
          <p className="text-xs text-muted-foreground">
            Total Earned: {tokens.totalEarned} tokens
          </p>
        </div>
      </div>

      {/* Progress */}
      <div
        className="rounded-2xl md:col-span-2"
        style={{
          background: "rgba(16,24,40,0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(234,179,8,0.25)",
        }}
      >
        <div className="p-5 pb-3 border-b border-white/5">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-yellow-400" />
            Next Withdrawal Progress
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {tokens.tokensForNextWithdrawal}/{tokens.TOKENS_FOR_WITHDRAWAL}{" "}
            tokens collected
          </p>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {tokens.tokensForNextWithdrawal} tokens
              </span>
              <span className="text-yellow-400 font-semibold">
                {tokens.TOKENS_FOR_WITHDRAWAL} tokens needed
              </span>
            </div>
            {/* Custom styled progress bar */}
            <div
              className="relative h-4 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                style={{
                  width: `${tokens.progressPct}%`,
                  background: "linear-gradient(90deg, #eab308, #fde047)",
                  boxShadow: "0 0 10px rgba(234,179,8,0.7)",
                }}
              />
            </div>
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
            <div
              className="rounded-xl p-3 text-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p className="text-xs text-muted-foreground mb-1">
                Total Withdrawn
              </p>
              <p className="font-bold text-yellow-400">
                {tokens.totalWithdrawn} tokens
              </p>
            </div>
            <div
              className="rounded-xl p-3 text-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
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
        </div>
      </div>
    </div>
  );
}

// ─── Watch Ad Section ──────────────────────────────────────────────────────────

function WatchAdSection({ onAdComplete }: { onAdComplete: () => void }) {
  const [adOpen, setAdOpen] = useState(false);
  const { showRewardedAd, rewardedAdStatus, isTestMode } = useAdMob();

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

  const handleWatchAd = useCallback(() => {
    showRewardedAd(handleComplete, () => setAdOpen(true));
  }, [showRewardedAd, handleComplete]);

  const isLoading = rewardedAdStatus === "loading";

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

      <div
        className="rounded-2xl"
        style={{
          background: "rgba(20,16,4,0.85)",
          border: "1px solid rgba(234,179,8,0.35)",
          boxShadow: "0 4px 24px rgba(234,179,8,0.1)",
        }}
        data-ocid="earn.panel"
      >
        <div className="p-5 border-b border-yellow-500/15">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-yellow-400">
            <Zap className="h-5 w-5" />
            Watch Ads & Earn Tokens
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Koi daily limit nahi — jitne chahe utne ads dekho! Har ad = 1 Token
          </p>
        </div>
        <div className="p-5 space-y-6">
          <div className="text-center space-y-4">
            {/* Ad Area */}
            <div
              className="w-full h-40 flex items-center justify-center relative overflow-hidden"
              style={{
                border: "2px dashed rgba(234,179,8,0.4)",
                borderRadius: 16,
                background: "rgba(66,32,6,0.3)",
              }}
            >
              <ins
                className="adsbygoogle"
                style={{ display: "block", width: "100%", height: "100%" }}
                data-ad-client="ca-pub-9216368060577966"
                data-ad-slot="2950149540"
                data-ad-format="auto"
                data-full-width-responsive="true"
                {...(isTestMode ? { "data-adtest": "on" } : {})}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center space-y-2 opacity-40">
                  <Play className="h-10 w-10 text-yellow-500 mx-auto" />
                  <p className="text-sm text-muted-foreground">Advertisement</p>
                  <span
                    className="inline-block text-xs px-2 py-0.5 rounded-full"
                    style={{
                      border: "1px solid rgba(234,179,8,0.5)",
                      color: "rgba(234,179,8,0.8)",
                    }}
                  >
                    30 sec ad
                  </span>
                </div>
              </div>
            </div>

            {/* Watch Ad button */}
            <Button
              onClick={handleWatchAd}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 text-lg shadow-lg"
              style={{
                boxShadow:
                  "0 0 24px rgba(234,179,8,0.6), 0 4px 16px rgba(0,0,0,0.4)",
              }}
              data-ocid="earn.primary_button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading Ad…
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Watch Ad & Earn 1 Token
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              Unlimited ads available • 1 Token per ad • 30 sec ad
            </p>
          </div>

          {/* How it works */}
          <div
            className="grid grid-cols-3 gap-3 pt-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { step: "1", label: "Ad Dekho", icon: "▶️" },
              { step: "2", label: "Token Pao", icon: "🪙" },
              { step: "3", label: "Withdraw Karo", icon: "💰" },
            ].map((item) => (
              <div
                key={item.step}
                className="text-center space-y-1 py-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 12,
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="text-xs text-muted-foreground font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
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

      <div
        className="rounded-2xl transition-all"
        style={{
          border: tokens.canWithdraw
            ? "2px solid rgba(234,179,8,0.6)"
            : "1px solid rgba(255,255,255,0.1)",
          background: tokens.canWithdraw
            ? "linear-gradient(135deg, rgba(66,32,6,0.4) 0%, rgba(10,10,10,0.7) 100%)"
            : "rgba(12,16,28,0.6)",
          boxShadow: tokens.canWithdraw
            ? "0 0 40px rgba(234,179,8,0.3), 0 8px 32px rgba(0,0,0,0.4)"
            : "none",
          opacity: tokens.canWithdraw ? 1 : 0.85,
        }}
        data-ocid="earn.panel"
      >
        <div className="p-5 border-b border-white/5">
          <h3 className="text-base font-semibold flex items-center gap-2">
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
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full animate-pulse ml-1"
                style={{
                  background: "rgba(34,197,94,0.2)",
                  color: "#4ade80",
                  border: "1px solid rgba(34,197,94,0.4)",
                }}
              >
                AVAILABLE
              </span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            25 tokens = ₹1.25 wallet mein. Ek 1-minute rewarded video ad dekhna
            hoga.
          </p>
        </div>
        <div className="p-5 space-y-4">
          {/* Rate card */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "rgba(40,30,4,0.8)",
              border: "1px solid rgba(234,179,8,0.35)",
            }}
          >
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
            <div
              className="relative h-2 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                style={{
                  width: `${tokens.progressPct}%`,
                  background: "linear-gradient(90deg, #eab308, #fde047)",
                  boxShadow: "0 0 8px rgba(234,179,8,0.6)",
                }}
              />
            </div>
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
                ? {
                    boxShadow:
                      "0 0 32px rgba(234,179,8,0.7), 0 4px 20px rgba(0,0,0,0.4)",
                  }
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
        </div>
      </div>
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
    <div
      className="rounded-2xl"
      style={{
        background: "rgba(12,16,32,0.8)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      data-ocid="earn.panel"
    >
      <div className="p-5 border-b border-white/5">
        <h3 className="text-base font-semibold">Token History</h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Aapke saare earn aur withdrawal records
        </p>
      </div>
      <div className="p-5">
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
                className="flex items-center justify-between p-3 transition-colors"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.03)";
                }}
                data-ocid={`earn.item.${idx + 1}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-full p-1.5"
                    style={{
                      background:
                        tx.type === "earned"
                          ? "rgba(234,179,8,0.2)"
                          : "rgba(0,255,136,0.2)",
                    }}
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
      </div>
    </div>
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
