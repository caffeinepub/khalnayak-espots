import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIIProfile } from "@/hooks/useIIProfile";
import {
  useApproveDeposit,
  useDeposit,
  useGetCallerUserProfile,
  useGetCallerWallet,
  useWithdraw,
} from "@/hooks/useQueries";
import {
  formatCurrency,
  formatDateTime,
  getTransactionTypeLabel,
} from "@/utils/format";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Gift,
  Minus,
  Plus,
  ShoppingBag,
  Smartphone,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ──────────────────────────────────────────────────────────────
// Google Play Redeem Code localStorage helpers (demo mode)
// ──────────────────────────────────────────────────────────────
const REDEEM_REQUESTS_KEY = "gp_redeem_requests";
// const USED_CODES_KEY = "gp_used_codes"; // removed with RedeemCodeSection

export interface RedeemRequest {
  id: string;
  code: string;
  amount: number; // in rupees
  userId: string; // principal string
  username: string;
  timestamp: number;
  status: "pending" | "approved" | "rejected";
  // depositRequestId links this redeem request to backend deposit request
  depositRequestId?: string;
}

function getRedeemRequests(): RedeemRequest[] {
  try {
    return JSON.parse(localStorage.getItem(REDEEM_REQUESTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRedeemRequests(requests: RedeemRequest[]) {
  localStorage.setItem(REDEEM_REQUESTS_KEY, JSON.stringify(requests));
}

export { getRedeemRequests, saveRedeemRequests };

// ──────────────────────────────────────────────────────────────
// Withdrawal Details localStorage helpers
// ──────────────────────────────────────────────────────────────
const WITHDRAWAL_DETAILS_KEY = "withdrawal_details_v2";
const WITHDRAWAL_DAILY_KEY = "withdrawal_daily_v2";

export type WithdrawMethod = "upi" | "voucher";

export interface WithdrawalDetail {
  requestId: string; // stringified bigint from backend
  userId: string;
  method: WithdrawMethod;
  amount: number; // in rupees
  timestamp: number;
  status: "pending" | "approved" | "rejected";
  // UPI
  upiId?: string;
  // Bank
  accountNumber?: string;
  ifscCode?: string;
  accountHolderName?: string;
  // Voucher
  voucherCode?: string;
  voucherExpiry?: number; // timestamp
}

// ──────────────────────────────────────────────────────────────
// Play Store Voucher localStorage helpers
// ──────────────────────────────────────────────────────────────
const MY_VOUCHERS_KEY = "my_play_vouchers_v1";

export interface PlayVoucher {
  id: string;
  userId: string;
  code: string; // e.g. ABCD-1234-EFGH-5678
  amount: number; // in rupees
  createdAt: number; // timestamp
  expiresAt: number; // timestamp (1 year from creation)
  status: "unused" | "used";
  withdrawalRequestId: string;
}

export function getMyVouchers(userId?: string): PlayVoucher[] {
  try {
    const all: PlayVoucher[] = JSON.parse(
      localStorage.getItem(MY_VOUCHERS_KEY) || "[]",
    );
    if (!userId) return all;
    return all.filter((v) => v.userId === userId);
  } catch {
    return [];
  }
}

export function saveMyVouchers(vouchers: PlayVoucher[]) {
  localStorage.setItem(MY_VOUCHERS_KEY, JSON.stringify(vouchers));
}

export function generateVoucherCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segment = () =>
    Array.from(
      { length: 4 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  return `${segment()}-${segment()}-${segment()}-${segment()}`;
}

export function getWithdrawalDetails(): WithdrawalDetail[] {
  try {
    return JSON.parse(localStorage.getItem(WITHDRAWAL_DETAILS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveWithdrawalDetails(details: WithdrawalDetail[]) {
  localStorage.setItem(WITHDRAWAL_DETAILS_KEY, JSON.stringify(details));
}

// Daily limit helpers — returns count of withdrawals today for a userId
function getWithdrawalsToday(userId: string): number {
  try {
    const raw = JSON.parse(localStorage.getItem(WITHDRAWAL_DAILY_KEY) || "{}");
    const todayKey = `${userId}_${new Date().toISOString().slice(0, 10)}`;
    return raw[todayKey] ?? 0;
  } catch {
    return 0;
  }
}

function incrementWithdrawalsToday(userId: string) {
  try {
    const raw = JSON.parse(localStorage.getItem(WITHDRAWAL_DAILY_KEY) || "{}");
    const todayKey = `${userId}_${new Date().toISOString().slice(0, 10)}`;
    raw[todayKey] = (raw[todayKey] ?? 0) + 1;
    localStorage.setItem(WITHDRAWAL_DAILY_KEY, JSON.stringify(raw));
  } catch {}
}

// Check if same UPI ID was used by this user before (fraud prevention)
function getUpiUsageCount(userId: string, upiId: string): number {
  const details = getWithdrawalDetails();
  return details.filter(
    (d) =>
      d.userId === userId &&
      d.method === "upi" &&
      d.upiId?.toLowerCase() === upiId.toLowerCase(),
  ).length;
}

export function WalletPage() {
  const { data: wallet } = useGetCallerWallet();
  const { data: profile } = useGetCallerUserProfile();
  const { profile: iiProfile } = useIIProfile();
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

  const transactions = wallet?.transactions || [];
  const sortedTransactions = [...transactions].sort((a, b) =>
    Number(b.timestamp - a.timestamp),
  );

  const copyReferralCode = () => {
    if (iiProfile?.referral_code) {
      navigator.clipboard.writeText(iiProfile?.referral_code || "");
      toast.success("Referral code copied to clipboard!");
    }
  };

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1
          className="text-4xl font-bold mb-2 uppercase tracking-wider"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: "linear-gradient(90deg, #00FF88, #9d4edd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          💳 My Wallet
        </h1>
        <p
          style={{
            color: "#666666",
            fontFamily: "'Rajdhani', sans-serif",
          }}
        >
          Manage your funds and view transaction history
        </p>
      </div>

      {/* Balance Card */}
      <Card
        style={{
          background: "#F5F5F5",
          border: "2px solid #00FF88",
          boxShadow: "0 0 32px rgba(0,255,136,0.3)",
          borderRadius: 16,
        }}
      >
        <CardHeader>
          <CardTitle
            className="flex items-center gap-2"
            style={{
              color: "rgba(0,255,136,0.8)",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            💰 Available Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(36px, 10vw, 56px)",
                fontWeight: 900,
                color: "#00FF88",
                textShadow: "0 0 20px rgba(0,255,136,0.6)",
                lineHeight: 1.1,
              }}
            >
              {wallet ? formatCurrency(wallet.balance) : "₹0.00"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Dialog
              open={depositDialogOpen}
              onOpenChange={setDepositDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  className="flex-1 font-bold hover:opacity-90 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #00FF88, #00cc6a)",
                    color: "#0A0A0A",
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 700,
                    borderRadius: 10,
                    boxShadow: "0 0 16px rgba(0,255,136,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    minHeight: 44,
                  }}
                >
                  📥 Add Money
                </Button>
              </DialogTrigger>
              <DepositDialog onClose={() => setDepositDialogOpen(false)} />
            </Dialog>

            <Dialog
              open={withdrawDialogOpen}
              onOpenChange={setWithdrawDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  className="flex-1 font-bold hover:opacity-90 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #9d4edd, #7b2ff7)",
                    color: "#fff",
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 700,
                    borderRadius: 10,
                    boxShadow: "0 0 16px rgba(157,78,221,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    minHeight: 44,
                  }}
                >
                  💸 Withdraw
                </Button>
              </DialogTrigger>
              <WithdrawDialog
                balance={wallet?.balance || BigInt(0)}
                onClose={() => setWithdrawDialogOpen(false)}
                userId={profile?.username ?? undefined}
              />
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Pending Withdrawals */}
      <PendingWithdrawalsCard userId={profile?.username ?? ""} />

      {/* Google Play Redeem Code */}

      {/* Referral Card */}
      {iiProfile?.referral_code && (
        <Card
          className="border-[#00FF88]/40"
          style={{ boxShadow: "0 0 16px rgba(0,255,136,0.08)" }}
        >
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-[#00FF88]">
              🔗 Referral Code
            </CardTitle>
            <CardDescription>
              Share your code and earn bonuses when friends register
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <code className="flex-1 bg-[#F5F5F5] border border-[#00FF88]/30 px-4 py-3 rounded-xl font-mono text-lg font-bold text-[#00FF88]">
                {iiProfile.referral_code}
              </code>
              <Button
                onClick={copyReferralCode}
                variant="outline"
                size="icon"
                className="border-[#00FF88]/40 text-[#00FF88] hover:bg-[#00FF88]/10"
                data-ocid="wallet.referral.button"
              >
                📋
              </Button>
            </div>
            <div className="flex gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Join Khalnayak Espots using my referral code: ${iiProfile.referral_code}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center text-sm font-semibold rounded-xl border border-green-500/40 text-green-400 bg-green-500/10 hover:bg-green-500/20 transition-all"
              >
                📱 WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent("https://khalnayak.app")}&text=${encodeURIComponent(`Join with my code: ${iiProfile.referral_code}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center text-sm font-semibold rounded-xl border border-blue-500/40 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-all"
              >
                ✈️ Telegram
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <Card
        style={{
          background: "#F5F5F5",
          border: "1px solid rgba(0,255,136,0.15)",
          borderRadius: 12,
        }}
      >
        <CardHeader>
          <CardTitle
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#00FF88",
              fontSize: 16,
              textTransform: "uppercase",
            }}
          >
            💳 Transaction History
          </CardTitle>
          <CardDescription
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              color: "#666666",
            }}
          >
            View all your wallet transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F5F5F5]">
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.map((txn) => {
                    const isCredit =
                      txn.transactionType === "deposit" ||
                      txn.transactionType === "prize" ||
                      txn.transactionType === "bonus";
                    return (
                      <TableRow key={txn.id.toString()}>
                        <TableCell>
                          <Badge
                            variant={isCredit ? "default" : "secondary"}
                            className={isCredit ? "bg-success" : ""}
                          >
                            {getTransactionTypeLabel(txn.transactionType)}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {txn.description}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDateTime(txn.timestamp)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          <span
                            className={isCredit ? "font-bold" : "font-bold"}
                            style={{ color: isCredit ? "#00FF88" : "#FF4444" }}
                          >
                            {isCredit ? "📈 +" : "📉 -"}
                            {formatCurrency(txn.amount)}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              💳<p className="mt-2">No transactions yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Redeem Code Section
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// Pending Withdrawals Card — shows user's own pending withdrawal requests
// ──────────────────────────────────────────────────────────────
function PendingWithdrawalsCard({ userId }: { userId: string }) {
  const details = getWithdrawalDetails();
  const userDetails = details
    .filter((d) => d.userId === userId || !userId)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);

  const methodLabel: Record<WithdrawMethod, string> = {
    upi: "UPI",
    voucher: "Play Voucher",
  };

  const methodColor: Record<WithdrawMethod, string> = {
    upi: "bg-blue-500/20 text-blue-700 border-blue-500/30",
    voucher: "bg-green-500/20 text-green-700 border-green-500/30",
  };

  if (userDetails.length === 0) return null;

  return (
    <Card
      className="border-[#00FF88]/20"
      data-ocid="wallet.pending_withdrawals.card"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-[#00FF88]">
          🎟️ My Withdrawal Requests
        </CardTitle>
        <CardDescription>
          Track your recent withdrawal requests and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {userDetails.map((d, idx) => (
            <div
              key={d.requestId}
              className="flex items-center gap-3 bg-[#F5F5F5] border border-[#00FF88]/20 rounded-xl p-4"
              data-ocid={`wallet.pending_withdrawals.item.${idx + 1}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm">
                    {d.method === "voucher" ? "🎟️" : "💸"}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded border ${methodColor[d.method]}`}
                  >
                    {methodLabel[d.method]}
                  </span>
                  <span className="font-bold text-sm text-gray-900">
                    ₹{d.amount.toFixed(2)}
                  </span>
                  {d.method === "upi" && d.upiId && (
                    <span className="font-mono text-xs text-muted-foreground truncate max-w-[150px]">
                      {d.upiId}
                    </span>
                  )}
                  {d.method === "voucher" && d.voucherCode && (
                    <span className="font-mono text-[#00FF88] tracking-widest text-sm">
                      {d.voucherCode}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(d.timestamp).toLocaleString("en-IN")}
                </p>
              </div>
              {d.status === "pending" ? (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  ⏳ Pending
                </span>
              ) : d.status === "approved" ? (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  ✅ Completed
                </span>
              ) : (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                  ❌ Failed
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DepositDialog({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const depositMutation = useDeposit();

  const handleUpiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = Number.parseFloat(amount);
    if (Number.isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!upiId.trim()) {
      toast.error("Please enter your UPI ID");
      return;
    }
    try {
      const amountInPaise = BigInt(Math.round(amountValue * 100));
      await depositMutation.mutateAsync(amountInPaise);
      toast.success(
        `Deposit request of ₹${amountValue} submitted. Admin will verify and credit.`,
      );
      setAmount("");
      setUpiId("");
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit deposit request");
    }
  };

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle
          className="flex items-center gap-2"
          style={{ fontFamily: "Orbitron, sans-serif", color: "#00FF88" }}
        >
          <Plus className="h-5 w-5" />
          ADD MONEY
        </DialogTitle>
        <DialogDescription>
          Deposit via UPI ID or scan QR code
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleUpiSubmit}
        className="space-y-4"
        data-ocid="wallet.deposit.upi.panel"
      >
        <div className="space-y-2">
          <Label
            htmlFor="depositUpiId"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            UPI ID
          </Label>
          <Input
            id="depositUpiId"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="yourname@oksbi"
            className="font-mono border-[#00FF88]/30 bg-[#F5F5F5] focus:border-[#00FF88]"
            data-ocid="wallet.deposit.upi_id.input"
            required
          />
          <p className="text-xs text-muted-foreground">
            Supported: GPay, PhonePe, Paytm (e.g. name@okaxis, number@paytm)
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="depositAmount"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Amount (₹)
          </Label>
          <Input
            id="depositAmount"
            type="number"
            step="1"
            min="10"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount (min ₹10)"
            className="border-[#00FF88]/30 bg-[#F5F5F5] focus:border-[#00FF88]"
            data-ocid="wallet.deposit.amount.input"
            required
          />
        </div>

        <div className="grid grid-cols-4 gap-1">
          {[100, 500, 1000, 2000].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset.toString())}
              className="py-1.5 text-xs font-semibold rounded-lg border border-[#00FF88]/30 text-[#00FF88] bg-[#00FF88]/5 hover:bg-[#00FF88]/15 transition-colors"
            >
              ₹{preset}
            </button>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-700 space-y-1">
          <p className="font-semibold">📌 How it works:</p>
          <p>1. Enter UPI ID &amp; amount → Submit request</p>
          <p>
            2. Pay ₹{amount || "X"} to{" "}
            <span className="font-mono">khalnayak@okaxis</span>
          </p>
          <p>3. Admin verifies &amp; credits your wallet</p>
        </div>

        <Button
          type="submit"
          className="w-full font-bold"
          style={{
            background: "linear-gradient(135deg, #00FF88, #00cc6a)",
            color: "#0A0A0A",
            fontFamily: "Orbitron, sans-serif",
          }}
          disabled={depositMutation.isPending}
          data-ocid="wallet.deposit.upi.submit_button"
        >
          {depositMutation.isPending
            ? "Submitting..."
            : "⚡ SUBMIT UPI REQUEST"}
        </Button>
      </form>
    </DialogContent>
  );
}

const DAILY_LIMIT = 2;

function WithdrawDialog({
  balance,
  onClose,
  userId,
}: { balance: bigint; onClose: () => void; userId?: string }) {
  const [method, setMethod] = useState<WithdrawMethod>("upi");
  const [amount, setAmount] = useState("");
  // UPI fields
  const [upiId, setUpiId] = useState("");
  // Voucher result state
  const [generatedVoucher, setGeneratedVoucher] = useState<{
    code: string;
    amount: number;
    expiresAt: number;
  } | null>(null);
  const [voucherCopied, setVoucherCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAmount, setSubmittedAmount] = useState(0);

  const withdrawMutation = useWithdraw();
  const queryClient = useQueryClient();

  const balanceRupees = Number(balance) / 100;
  const uid = userId ?? "guest";

  const getMinMax = () => {
    return { min: 10, max: 500 };
  };

  const handleCopyVoucherCode = async () => {
    if (!generatedVoucher) return;
    try {
      await navigator.clipboard.writeText(generatedVoucher.code);
      setVoucherCopied(true);
      toast.success("Voucher code copied!", {
        description: "Paste it in Google Play Store to redeem",
      });
      setTimeout(() => setVoucherCopied(false), 3000);
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = Number.parseFloat(amount);
    const { min, max } = getMinMax();

    if (Number.isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (amountValue < min) {
      toast.error(`Minimum withdrawal is ₹${min} for this method`);
      return;
    }
    if (amountValue > max) {
      toast.error(`Maximum withdrawal is ₹${max} per request`);
      return;
    }
    if (amountValue > balanceRupees) {
      toast.error("Insufficient wallet balance");
      return;
    }

    // Daily limit check
    const todayCount = getWithdrawalsToday(uid);
    if (todayCount >= DAILY_LIMIT) {
      toast.error(
        `Daily withdrawal limit reached (${DAILY_LIMIT} requests per day). Try again tomorrow.`,
      );
      return;
    }

    // UPI fraud check
    if (method === "upi") {
      if (!upiId.trim()) {
        toast.error("Please enter your UPI ID");
        return;
      }
      const upiCount = getUpiUsageCount(uid, upiId.trim());
      if (upiCount >= 3) {
        toast.error(
          "This UPI ID has been used too many times. Contact support.",
        );
        return;
      }
    }

    try {
      const amountInPaise = BigInt(Math.round(amountValue * 100));
      const result = await withdrawMutation.mutateAsync(amountInPaise);

      const requestId = result?.id?.toString() ?? `wd_${Date.now()}`;

      // For voucher: generate code instantly, deduct balance immediately
      let voucherCode: string | undefined;
      if (method === "voucher") {
        voucherCode = generateVoucherCode();
        const now = Date.now();
        const expiry = now + 365 * 24 * 60 * 60 * 1000; // 1 year
        const newVoucher: PlayVoucher = {
          id: `voucher_${now}_${Math.random().toString(36).slice(2, 7)}`,
          userId: uid,
          code: voucherCode,
          amount: amountValue,
          createdAt: now,
          expiresAt: expiry,
          status: "unused",
          withdrawalRequestId: requestId,
        };
        const allVouchers = getMyVouchers();
        allVouchers.push(newVoucher);
        saveMyVouchers(allVouchers);
        setGeneratedVoucher({
          code: voucherCode,
          amount: amountValue,
          expiresAt: expiry,
        });
      }

      // Store method details locally
      const detail: WithdrawalDetail = {
        requestId,
        userId: uid,
        method,
        amount: amountValue,
        timestamp: Date.now(),
        status: method === "voucher" ? "approved" : "pending",
        ...(method === "upi" ? { upiId: upiId.trim() } : {}),

        ...(method === "voucher"
          ? {
              voucherCode,
              voucherExpiry: Date.now() + 365 * 24 * 60 * 60 * 1000,
            }
          : {}),
      };
      const existing = getWithdrawalDetails();
      existing.push(detail);
      saveWithdrawalDetails(existing);
      incrementWithdrawalsToday(uid);

      await queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
      await queryClient.invalidateQueries({
        queryKey: ["callerWithdrawalRequests"],
      });

      setSubmittedAmount(amountValue);
      setSubmitted(true);
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit withdrawal request");
    }
  };

  const methodLabel: Record<WithdrawMethod, string> = {
    upi: "UPI Transfer",
    voucher: "Google Play Voucher",
  };

  // ── Voucher Success Screen ──────────────────────────────────
  if (submitted && method === "voucher" && generatedVoucher) {
    return (
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-green-400" />
            Play Store Voucher Ready!
          </DialogTitle>
        </DialogHeader>
        <div
          className="space-y-5"
          data-ocid="wallet.withdraw.voucher.success_state"
        >
          {/* Amount badge */}
          <div className="flex items-center justify-center gap-3 py-3">
            <div className="rounded-full bg-green-500/20 p-3">
              <Ticket className="h-8 w-8 text-green-400" />
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-green-700">
                ₹{generatedVoucher.amount}
              </p>
              <p className="text-xs text-muted-foreground">
                Play Store Voucher
              </p>
            </div>
          </div>

          {/* Voucher Code Box */}
          <div className="rounded-xl border border-green-500/40 bg-green-950/30 p-4 space-y-3">
            <p className="text-xs text-green-400 font-semibold uppercase tracking-wider text-center">
              Your Voucher Code
            </p>
            <div
              className="font-mono text-2xl font-bold tracking-[0.15em] text-center py-3 px-2 rounded-lg bg-black/40 border border-green-500/20 select-all"
              style={{ textShadow: "0 0 12px rgba(74,222,128,0.4)" }}
            >
              {generatedVoucher.code}
            </div>
            <Button
              onClick={handleCopyVoucherCode}
              className={`w-full transition-all ${
                voucherCopied
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-green-700/60 hover:bg-green-600 border border-green-500/40"
              }`}
              data-ocid="wallet.withdraw.copy_voucher.button"
            >
              {voucherCopied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
          </div>

          {/* Expiry */}
          <p className="text-xs text-muted-foreground text-center">
            Expires:{" "}
            {new Date(generatedVoucher.expiresAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Redeem Instructions */}
          <div className="rounded-lg border border-border/30 bg-muted/10 p-4 space-y-2">
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-green-400" />
              How to Redeem
            </p>
            <ol className="space-y-1.5 text-xs text-muted-foreground list-none">
              {[
                "Open Google Play Store app on your phone",
                'Tap your profile icon (top right) → "Payments & subscriptions"',
                'Select "Redeem gift code"',
                "Paste your voucher code and tap Redeem",
                "Balance will be added to your Play Store account",
              ].map((step, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static steps
                <li key={i} className="flex gap-2">
                  <span className="text-green-400 font-bold shrink-0 w-4 text-right">
                    {i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Note */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-950/20 border border-yellow-500/20">
            <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-300">
              Save this code now. It is also available in your "My Vouchers"
              section in Profile.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-primary/30"
              onClick={onClose}
              data-ocid="wallet.withdraw.close_button"
            >
              Done
            </Button>
            <Button
              className="flex-1 bg-green-700/60 hover:bg-green-600 border border-green-500/40"
              onClick={() =>
                window.open(
                  "https://play.google.com/store",
                  "_blank",
                  "noopener",
                )
              }
              data-ocid="wallet.withdraw.open_playstore.button"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Play Store
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  }

  // ── UPI / Bank Success Screen ───────────────────────────────
  if (submitted) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdrawal Requested</DialogTitle>
        </DialogHeader>
        <div
          className="flex flex-col items-center gap-4 py-6 text-center"
          data-ocid="wallet.withdraw.success_state"
        >
          <div className="rounded-full bg-yellow-500/20 p-4">
            <Clock className="h-10 w-10 text-yellow-400" />
          </div>
          <p className="text-xl font-bold text-yellow-300">
            ₹{submittedAmount} Request Submitted!
          </p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Your withdrawal request is pending admin approval. You will be
            notified once it is processed.
          </p>
          <div className="w-full p-3 rounded-lg bg-muted text-left space-y-1 text-sm">
            <p>
              <span className="text-muted-foreground">Method:</span>{" "}
              <span className="font-medium">{methodLabel[method]}</span>
            </p>
            {method === "upi" && (
              <p>
                <span className="text-muted-foreground">UPI ID:</span>{" "}
                <span className="font-mono">{upiId}</span>
              </p>
            )}
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
            data-ocid="wallet.withdraw.close_button"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    );
  }

  const { min, max } = getMinMax();
  const todayCount = getWithdrawalsToday(uid);
  const remainingToday = DAILY_LIMIT - todayCount;

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Minus className="h-5 w-5 text-primary" />
          Withdraw Money
        </DialogTitle>
        <DialogDescription>
          Choose a withdrawal method and fill in the details
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        data-ocid="wallet.withdraw.dialog"
      >
        {/* Balance */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
          <div>
            <p className="text-xs text-muted-foreground">Available Balance</p>
            <p className="text-xl font-bold font-display">
              {formatCurrency(balance)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Today's Requests</p>
            <p
              className={`font-semibold text-sm ${remainingToday <= 0 ? "text-destructive" : "text-green-400"}`}
            >
              {todayCount}/{DAILY_LIMIT} used
            </p>
          </div>
        </div>

        {remainingToday <= 0 && (
          <div
            className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive"
            data-ocid="wallet.withdraw.error_state"
          >
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            Daily limit reached (2/day). Try again tomorrow.
          </div>
        )}

        {/* Method Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Withdrawal Method</Label>
          <RadioGroup
            value={method}
            onValueChange={(v) => {
              setMethod(v as WithdrawMethod);
              setAmount("");
            }}
            className="space-y-2"
            data-ocid="wallet.withdraw.select"
          >
            {/* UPI */}
            <label
              htmlFor="method-upi"
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                method === "upi"
                  ? "border-blue-500/60 bg-blue-500/10"
                  : "border-border hover:border-primary/40 hover:bg-muted/40"
              }`}
              data-ocid="wallet.withdraw.upi.radio"
            >
              <RadioGroupItem value="upi" id="method-upi" />
              <Smartphone className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  UPI (GPay / PhonePe / Paytm)
                </p>
                <p className="text-xs text-muted-foreground">
                  ₹10 – ₹500 · Admin approval required
                </p>
              </div>
            </label>

            {/* Google Play Voucher */}
            <label
              htmlFor="method-voucher"
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                method === "voucher"
                  ? "border-green-500/60 bg-green-500/10"
                  : "border-border hover:border-primary/40 hover:bg-muted/40"
              }`}
              data-ocid="wallet.withdraw.voucher.radio"
            >
              <RadioGroupItem value="voucher" id="method-voucher" />
              <Gift className="h-4 w-4 text-green-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">
                    Google Play Store Voucher
                  </p>
                  <span className="text-[10px] bg-green-500/20 text-green-700 border border-green-500/30 px-1.5 py-0.5 rounded-full font-medium">
                    INSTANT ⚡
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  ₹10 – ₹500 · Code generated instantly, no admin approval
                </p>
              </div>
            </label>
          </RadioGroup>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="withdrawAmount">
            Amount (₹){" "}
            <span className="text-muted-foreground font-normal text-xs">
              Min ₹{min} – Max ₹{max}
            </span>
          </Label>
          <Input
            id="withdrawAmount"
            type="number"
            step="1"
            min={min}
            max={Math.min(max, balanceRupees)}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter amount (₹${min} - ₹${max})`}
            required
            data-ocid="wallet.withdraw.amount.input"
          />
          {/* Quick amount buttons */}
          <div className="grid grid-cols-4 gap-1">
            {[10, 50, 100, 500]
              .filter((v) => v >= min && v <= Math.min(max, balanceRupees))
              .map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs border-primary/30"
                  onClick={() => setAmount(v.toString())}
                >
                  ₹{v}
                </Button>
              ))}
          </div>
        </div>

        {/* UPI fields */}
        {method === "upi" && (
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@oksbi"
              required
              data-ocid="wallet.withdraw.upi_id.input"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Formats: number@okhdfcbank, number@okicici, name@paytm
            </p>
          </div>
        )}

        {/* Voucher preview info */}
        {method === "voucher" && (
          <div className="p-3 rounded-lg bg-green-950/30 border border-green-500/20 text-sm space-y-2">
            <p className="text-green-700 font-medium flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Play Store Voucher — Instant Delivery
            </p>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>✅ Unique code generated instantly on withdrawal</li>
              <li>✅ No admin approval needed</li>
              <li>✅ Code valid for 1 year</li>
              <li>✅ Saved in "My Vouchers" in your Profile</li>
              <li>✅ Redeem directly on Google Play Store</li>
            </ul>
            {amount && Number(amount) >= min && Number(amount) <= max && (
              <div className="mt-2 pt-2 border-t border-green-500/20">
                <p className="text-xs text-green-400">
                  Preview code format:{" "}
                  <span className="font-mono font-bold">
                    ABCD-1234-EFGH-5678
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        <Button
          type="submit"
          className={`w-full ${method === "voucher" ? "bg-green-700 hover:bg-green-600" : ""}`}
          disabled={withdrawMutation.isPending || remainingToday <= 0}
          data-ocid="wallet.withdraw.submit_button"
        >
          {withdrawMutation.isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {method === "voucher" ? "Generating Code..." : "Submitting..."}
            </span>
          ) : method === "voucher" ? (
            <span className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Generate Voucher Code
            </span>
          ) : (
            "Submit Withdrawal Request"
          )}
        </Button>
      </form>
    </DialogContent>
  );
}
