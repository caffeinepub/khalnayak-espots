import { AdModal } from "@/components/AdModal";
import { Button } from "@/components/ui/button";
import { useAdMob } from "@/hooks/useAdMob";
import { useTokens } from "@/hooks/useTokens";
import { Loader2, Play } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const AD_DURATION_SECONDS = 30;
const WITHDRAWAL_AD_SECONDS = 60;

const neonGreen = "#00FF88";
const neonPurple = "#9d4edd";
const lightCard = "#F5F5F5";
const lightBg = "#FFFFFF";

const orbitron: React.CSSProperties = {
  fontFamily: "'Orbitron', sans-serif",
};
const rajdhani: React.CSSProperties = {
  fontFamily: "'Rajdhani', sans-serif",
};

export function EarnPage() {
  const tokens = useTokens();

  return (
    <div
      className="min-h-screen pb-28"
      style={{ background: lightBg }}
      data-ocid="earn.page"
    >
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;600;700&display=swap');`}</style>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        {/* ── HEADER ── */}
        <div className="text-center pb-2">
          <h1
            className="text-3xl font-black"
            style={{
              ...orbitron,
              color: neonGreen,
              textShadow: `0 0 24px ${neonGreen}`,
            }}
          >
            💰 EARN REAL MONEY
          </h1>
          <p
            style={{
              ...rajdhani,
              color: "#666666",
              fontSize: 15,
              marginTop: 4,
            }}
          >
            Watch Ads → Tokens → Cashout
          </p>
        </div>

        {/* ── TOKEN BALANCE CARD ── */}
        <div
          className="rounded-2xl p-5 text-center"
          style={{
            background: lightCard,
            border: "1.5px solid rgba(0,255,136,0.3)",
            boxShadow: `0 0 32px ${neonGreen}22`,
          }}
          data-ocid="earn.card"
        >
          <p
            style={{
              ...rajdhani,
              color: "#666666",
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Token Balance
          </p>
          <p
            className="font-black"
            style={{
              ...orbitron,
              fontSize: 64,
              color: neonGreen,
              textShadow: `0 0 32px ${neonGreen}`,
              lineHeight: 1.1,
            }}
          >
            {tokens.balance}
          </p>
          <p
            style={{
              ...rajdhani,
              color: neonGreen,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            ₹
            {(
              (tokens.balance / tokens.TOKENS_FOR_WITHDRAWAL) *
              tokens.RUPEES_PER_WITHDRAWAL
            ).toFixed(2)}{" "}
            INR
          </p>
        </div>

        {/* ── WITHDRAWAL PROGRESS ── */}
        <div
          className="rounded-2xl p-5 space-y-3"
          style={{
            background: lightCard,
            border: "1.5px solid rgba(157,78,221,0.3)",
          }}
        >
          <div className="flex justify-between items-center">
            <p
              style={{
                ...orbitron,
                color: neonPurple,
                fontSize: 12,
                letterSpacing: 1,
              }}
            >
              WITHDRAWAL PROGRESS
            </p>
            <p style={{ ...rajdhani, color: "#666666", fontSize: 14 }}>
              {tokens.tokensForNextWithdrawal}/{tokens.TOKENS_FOR_WITHDRAWAL}{" "}
              tokens
            </p>
          </div>
          {/* Progress bar */}
          <div
            className="relative h-4 rounded-full overflow-hidden"
            style={{ background: "#E0E0E0" }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
              style={{
                width: `${tokens.progressPct}%`,
                background: `linear-gradient(90deg, ${neonPurple}, ${neonGreen})`,
                boxShadow: `0 0 12px ${neonGreen}99`,
              }}
            />
          </div>
          <p
            style={{
              ...rajdhani,
              color: tokens.canWithdraw ? neonGreen : "#666666",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {tokens.canWithdraw
              ? `✅ Ready to withdraw ₹${tokens.RUPEES_PER_WITHDRAWAL.toFixed(2)}!`
              : `${tokens.tokensNeeded} more tokens to withdraw ₹${tokens.RUPEES_PER_WITHDRAWAL.toFixed(2)}`}
          </p>
        </div>

        {/* ── WATCH AD BUTTON ── */}
        <WatchAdSection onAdComplete={tokens.earnToken} />

        {/* ── WITHDRAWAL METHODS ── */}
        <WithdrawalSection tokens={tokens} />

        {/* ── TOP EARNERS LEADERBOARD ── */}
        <TopEarnersSection />
      </div>
    </div>
  );
}

// ── Watch Ad Section ────────────────────────────────────────────────────────

function WatchAdSection({ onAdComplete }: { onAdComplete: () => void }) {
  const [adOpen, setAdOpen] = useState(false);
  const [timer, setTimer] = useState(0);
  const { showRewardedAd, rewardedAdStatus, isTestMode } = useAdMob();

  const handleComplete = useCallback(() => {
    setAdOpen(false);
    setTimer(0);
    onAdComplete();
    toast.success("✅ +1 Token credited!", {
      description: "Keep watching ads to earn more!",
    });
  }, [onAdComplete]);

  const handleCancel = useCallback(() => {
    setAdOpen(false);
    setTimer(0);
  }, []);

  const handleWatchAd = useCallback(() => {
    showRewardedAd(handleComplete, () => {
      setAdOpen(true);
      // Start countdown
      let t = AD_DURATION_SECONDS;
      setTimer(t);
      const iv = setInterval(() => {
        t -= 1;
        setTimer(t);
        if (t <= 0) clearInterval(iv);
      }, 1000);
    });
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
        className="rounded-2xl p-5 text-center space-y-3"
        style={{
          background: lightCard,
          border: `1.5px solid ${neonGreen}66`,
          boxShadow: `0 0 24px ${neonGreen}22`,
        }}
        data-ocid="earn.panel"
      >
        <p style={{ ...orbitron, color: neonGreen, fontSize: 13 }}>
          WATCH AD & EARN
        </p>
        <Button
          onClick={handleWatchAd}
          size="lg"
          className="w-full font-black text-lg"
          style={{
            ...orbitron,
            background: `linear-gradient(90deg, ${neonGreen}, #00cc6a)`,
            color: "#000",
            borderRadius: 12,
            boxShadow: `0 0 28px ${neonGreen}88`,
            border: "none",
            height: 56,
          }}
          disabled={isLoading}
          data-ocid="earn.primary_button"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading Ad...
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              ▶️ WATCH AD &nbsp;<span style={{ opacity: 0.8 }}>+1 Token</span>
            </>
          )}
        </Button>
        <p style={{ ...rajdhani, color: "#666666", fontSize: 13 }}>
          {adOpen && timer > 0 ? (
            <span style={{ color: neonGreen }}>⏱ {timer} sec remaining...</span>
          ) : (
            <>
              30 sec ad • Unlimited • No daily limit
              {isTestMode ? " • Test Mode" : ""}
            </>
          )}
        </p>
      </div>
    </>
  );
}

// ── Withdrawal Section ──────────────────────────────────────────────────────

function WithdrawalSection({
  tokens,
}: { tokens: ReturnType<typeof useTokens> }) {
  const [adOpen, setAdOpen] = useState(false);
  const rewardAmount = tokens.RUPEES_PER_WITHDRAWAL;

  const handleComplete = useCallback(() => {
    setAdOpen(false);
    const success = tokens.withdrawTokens();
    if (success) {
      toast.success(`✅ ₹${rewardAmount.toFixed(2)} added to your wallet!`, {
        duration: 5000,
      });
    }
  }, [tokens, rewardAmount]);

  const handleCancel = useCallback(() => {
    setAdOpen(false);
  }, []);

  const handleWithdraw = () => {
    if (!tokens.canWithdraw) {
      toast.error(`${tokens.tokensNeeded} more tokens needed to withdraw`);
      return;
    }
    setAdOpen(true);
  };

  return (
    <>
      <AdModal
        isOpen={adOpen}
        onComplete={handleComplete}
        onCancel={handleCancel}
        duration={WITHDRAWAL_AD_SECONDS}
        title={`Watch Ad to Redeem ₹${rewardAmount.toFixed(2)}`}
        rewardLabel={`₹${rewardAmount.toFixed(2)}`}
      />

      <div
        className="rounded-2xl p-5 space-y-3"
        style={{ background: lightCard, border: `1.5px solid ${neonGreen}44` }}
        data-ocid="earn.panel"
      >
        <p style={{ ...orbitron, color: neonGreen, fontSize: 13 }}>
          REDEEM TOKENS
        </p>
        <p style={{ ...rajdhani, color: "#666666", fontSize: 13 }}>
          {tokens.canWithdraw
            ? `✅ Ready! Watch a short ad to redeem ₹${rewardAmount.toFixed(2)} directly to your wallet.`
            : `Need ${tokens.tokensNeeded} more tokens to unlock redemption.`}
        </p>
        <button
          type="button"
          style={{
            ...orbitron,
            fontSize: 14,
            fontWeight: 700,
            borderRadius: 12,
            padding: "14px 0",
            width: "100%",
            cursor: tokens.canWithdraw ? "pointer" : "not-allowed",
            opacity: tokens.canWithdraw ? 1 : 0.5,
            transition: "all 0.2s",
            border: `2px solid ${neonGreen}`,
            background: tokens.canWithdraw ? `${neonGreen}22` : "#E0E0E0",
            color: tokens.canWithdraw ? neonGreen : "#999999",
            boxShadow: tokens.canWithdraw ? `0 0 20px ${neonGreen}44` : "none",
          }}
          onClick={handleWithdraw}
          disabled={!tokens.canWithdraw}
          data-ocid="earn.redeem.primary_button"
        >
          {tokens.canWithdraw
            ? `🎬 WATCH AD TO REDEEM ₹${rewardAmount.toFixed(2)}`
            : "Collect 25 tokens to redeem"}
        </button>
        {!tokens.canWithdraw && (
          <div
            className="rounded-xl p-3 text-center"
            style={{
              background: "#F0F0F0",
              border: `1px solid ${neonPurple}44`,
            }}
          >
            <div
              className="flex items-center justify-between text-xs mb-1"
              style={{ ...rajdhani, color: "#666666" }}
            >
              <span>{tokens.tokensForNextWithdrawal} tokens</span>
              <span>{tokens.TOKENS_FOR_WITHDRAWAL} needed</span>
            </div>
            <div
              className="relative h-2 rounded-full overflow-hidden"
              style={{ background: "#E0E0E0" }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${tokens.progressPct}%`,
                  background: `linear-gradient(90deg, ${neonPurple}, ${neonGreen})`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── Top Earners Leaderboard ─────────────────────────────────────────────────

function TopEarnersSection() {
  return (
    <div
      className="rounded-2xl p-5 space-y-3"
      style={{
        background: lightCard,
        border: "1.5px solid #E0E0E0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
      data-ocid="earn.panel"
    >
      <p
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: "#9d4edd",
          fontSize: 13,
        }}
      >
        🏆 TOP EARNERS TODAY
      </p>
      <div style={{ textAlign: "center", padding: "24px 0", color: "#999999" }}>
        <p style={{ fontSize: 32, marginBottom: 8 }}>📊</p>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15 }}>
          No earnings yet
        </p>
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 12,
            color: "#BBBBBB",
            marginTop: 4,
          }}
        >
          Be the first to earn tokens!
        </p>
      </div>
    </div>
  );
}

export function TodayAdStatsBar() {
  return null;
}
