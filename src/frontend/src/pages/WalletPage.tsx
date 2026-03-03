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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Gift,
  Minus,
  Plus,
  Wallet as WalletIcon,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ──────────────────────────────────────────────────────────────
// Google Play Redeem Code localStorage helpers (demo mode)
// ──────────────────────────────────────────────────────────────
const REDEEM_REQUESTS_KEY = "gp_redeem_requests";
const USED_CODES_KEY = "gp_used_codes";

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

function getUsedCodes(): string[] {
  try {
    return JSON.parse(localStorage.getItem(USED_CODES_KEY) || "[]");
  } catch {
    return [];
  }
}

// Validate Google Play code format: XXXX-XXXX-XXXX  (4-4-4 alphanumeric, case-insensitive)
function isValidCodeFormat(code: string): boolean {
  return /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(code.trim());
}

export { getRedeemRequests, saveRedeemRequests };

export function WalletPage() {
  const { data: wallet } = useGetCallerWallet();
  const { data: profile } = useGetCallerUserProfile();
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

  const transactions = wallet?.transactions || [];
  const sortedTransactions = [...transactions].sort((a, b) =>
    Number(b.timestamp - a.timestamp),
  );

  const copyReferralCode = () => {
    if (profile?.referralCode) {
      navigator.clipboard.writeText(profile.referralCode);
      toast.success("Referral code copied to clipboard!");
    }
  };

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-display mb-2">My Wallet</h1>
        <p className="text-muted-foreground">
          Manage your funds and view transaction history
        </p>
      </div>

      {/* Balance Card */}
      <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <WalletIcon className="h-5 w-5" />
            Available Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-5xl font-bold font-display">
              {wallet ? formatCurrency(wallet.balance) : "₹0.00"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Dialog
              open={depositDialogOpen}
              onOpenChange={setDepositDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Money
                </Button>
              </DialogTrigger>
              <DepositDialog onClose={() => setDepositDialogOpen(false)} />
            </Dialog>

            <Dialog
              open={withdrawDialogOpen}
              onOpenChange={setWithdrawDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 border-primary/30">
                  <Minus className="mr-2 h-4 w-4" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <WithdrawDialog
                balance={wallet?.balance || BigInt(0)}
                onClose={() => setWithdrawDialogOpen(false)}
              />
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Google Play Redeem Code */}
      <RedeemCodeSection profile={profile} />

      {/* x402 Demo Payment */}
      <X402PaymentSection />

      {/* Referral Card */}
      {profile?.referralCode && (
        <Card className="border-secondary/30">
          <CardHeader>
            <CardTitle className="text-lg">Referral Code</CardTitle>
            <CardDescription>
              Share your code and earn bonuses when friends register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <code className="flex-1 bg-muted px-4 py-3 rounded-md font-mono text-lg font-bold">
                {profile.referralCode}
              </code>
              <Button onClick={copyReferralCode} variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View all your wallet transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {sortedTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
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
                            className={
                              isCredit ? "text-success" : "text-destructive"
                            }
                          >
                            {isCredit ? "+" : "-"}
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
              <WalletIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No transactions yet</p>
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
const PRESET_AMOUNTS = [10, 20, 50, 100, 200, 500, 1000];

function RedeemCodeSection({
  profile,
}: { profile: { username?: string } | null | undefined }) {
  const [code, setCode] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const depositMutation = useDeposit();

  const handleCodeChange = (val: string) => {
    setCode(val);
    setCodeError(null);
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError(null);

    const trimmed = code.trim().toUpperCase();

    if (!selectedAmount) {
      toast.error("Please select an amount");
      return;
    }

    if (!isValidCodeFormat(trimmed)) {
      setCodeError("Invalid code. Format: XXXX-XXXX-XXXX");
      return;
    }

    const usedCodes = getUsedCodes();
    if (usedCodes.includes(trimmed)) {
      setCodeError("This code has already been redeemed");
      return;
    }

    const existing = getRedeemRequests().find(
      (r) => r.code === trimmed && r.status === "pending",
    );
    if (existing) {
      setCodeError("This code is already awaiting admin approval");
      return;
    }

    setSubmitting(true);
    try {
      // Create a backend deposit request so admin can approve it properly
      // This links wallet balance update + transaction history to backend
      const amountInPaise = BigInt(Math.round(selectedAmount * 100));
      const depositReq = await depositMutation.mutateAsync(amountInPaise);

      const requests = getRedeemRequests();
      const newReq: RedeemRequest = {
        id: `redeem_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        code: trimmed,
        amount: selectedAmount,
        userId: profile ? (profile.username ?? "unknown") : "unknown",
        username: profile?.username ?? "Unknown User",
        timestamp: Date.now(),
        status: "pending",
        depositRequestId: depositReq?.id?.toString(),
      };
      requests.push(newReq);
      saveRedeemRequests(requests);
      setSubmitted(true);
      setCode("");
      setSelectedAmount(null);
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit redeem request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-950/20 to-emerald-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Gift className="h-5 w-5" />
          Redeem Google Play Code
        </CardTitle>
        <CardDescription>
          Enter your Google Play gift card code to add balance (Demo Mode)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div
            className="flex flex-col items-center gap-3 py-6 text-center"
            data-ocid="wallet.redeem.success_state"
          >
            <div className="rounded-full bg-yellow-500/20 p-4">
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
            <p className="text-lg font-semibold text-yellow-300">
              Awaiting Admin Approval
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your redeem request has been submitted. Admin will review and
              credit your wallet shortly.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-green-500/30"
              onClick={() => setSubmitted(false)}
              data-ocid="wallet.redeem.secondary_button"
            >
              Redeem Another Code
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Amount Preset Buttons */}
            <div className="space-y-2">
              <Label>Select Amount (₹)</Label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {PRESET_AMOUNTS.map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant={selectedAmount === amt ? "default" : "outline"}
                    size="sm"
                    className={
                      selectedAmount === amt
                        ? "bg-green-600 hover:bg-green-700 border-green-500 font-bold"
                        : "border-green-500/30 hover:border-green-400/60 hover:bg-green-950/40"
                    }
                    onClick={() => setSelectedAmount(amt)}
                    data-ocid={`wallet.redeem.amount_button.${amt}`}
                  >
                    ₹{amt}
                  </Button>
                ))}
              </div>
              {selectedAmount && (
                <p className="text-xs text-green-400">
                  Selected: ₹{selectedAmount} code
                </p>
              )}
            </div>

            {/* Code Input */}
            <div className="space-y-2">
              <Label htmlFor="redeemCode">Google Play Code</Label>
              <Input
                id="redeemCode"
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                placeholder="XXXX-XXXX-XXXX"
                className={`font-mono uppercase tracking-widest ${
                  codeError
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-green-500/30 focus-visible:ring-green-500/50"
                }`}
                maxLength={14}
                data-ocid="wallet.redeem.input"
              />
              {codeError && (
                <p
                  className="text-sm text-destructive font-medium"
                  data-ocid="wallet.redeem.error_state"
                >
                  {codeError}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Format: XXXX-XXXX-XXXX (letters and numbers)
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={submitting || !code || !selectedAmount}
              data-ocid="wallet.redeem.submit_button"
            >
              {submitting ? "Submitting..." : "Submit Redeem Request"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────
// x402 Demo Payment Section — instant wallet top-up (no admin approval needed)
// ──────────────────────────────────────────────────────────────
const X402_AMOUNTS = [10, 20, 50, 100, 500, 1000];

function X402PaymentSection() {
  const depositMutation = useDeposit();
  const approveDepositMutation = useApproveDeposit();
  const queryClient = useQueryClient();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState<number | null>(null);

  const handlePay = async () => {
    if (!selectedAmount) {
      toast.error("Please select an amount");
      return;
    }
    setProcessing(true);
    try {
      // Step 1: Create deposit request in backend
      const amountInPaise = BigInt(Math.round(selectedAmount * 100));
      const depositReq = await depositMutation.mutateAsync(amountInPaise);

      // Step 2: Immediately auto-approve it (demo mode — no real payment gateway)
      if (depositReq?.id !== undefined) {
        await approveDepositMutation.mutateAsync(depositReq.id);
      }

      // Step 3: Refresh wallet + transactions
      await queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
      await queryClient.invalidateQueries({ queryKey: ["callerTransactions"] });

      setSuccess(selectedAmount);
      setSelectedAmount(null);
      toast.success(`₹${selectedAmount} added to your wallet instantly!`);
    } catch (err: any) {
      toast.error(err?.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-950/20 to-blue-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Zap className="h-5 w-5" />
          x402 Instant Payment
          <span className="text-xs font-normal bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
            Demo Mode
          </span>
        </CardTitle>
        <CardDescription>
          Instant wallet top-up — no admin approval needed (simulated payment)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success !== null ? (
          <div
            className="flex flex-col items-center gap-3 py-6 text-center"
            data-ocid="wallet.x402.success_state"
          >
            <div className="rounded-full bg-green-500/20 p-4">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-lg font-semibold text-green-300">
              ₹{success} Added Successfully!
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your wallet has been updated instantly. Check your balance above.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-purple-500/30"
              onClick={() => setSuccess(null)}
              data-ocid="wallet.x402.secondary_button"
            >
              Add More
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Select Amount (₹)</Label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {X402_AMOUNTS.map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant={selectedAmount === amt ? "default" : "outline"}
                    size="sm"
                    className={
                      selectedAmount === amt
                        ? "bg-purple-600 hover:bg-purple-700 border-purple-500 font-bold"
                        : "border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-950/40"
                    }
                    onClick={() => setSelectedAmount(amt)}
                    data-ocid={`wallet.x402.amount_button.${amt}`}
                  >
                    ₹{amt}
                  </Button>
                ))}
              </div>
            </div>

            {selectedAmount && (
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <p className="text-sm text-purple-300">
                  <span className="font-semibold">₹{selectedAmount}</span> will
                  be added to your wallet instantly via x402 demo payment
                </p>
              </div>
            )}

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={handlePay}
              disabled={processing || !selectedAmount}
              data-ocid="wallet.x402.submit_button"
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Pay Instantly{selectedAmount ? ` ₹${selectedAmount}` : ""}
                </span>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              This is a demo payment — no real money is transferred
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DepositDialog({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<string>("upi");
  const depositMutation = useDeposit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = Number.parseFloat(amount);
    if (Number.isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const amountInPaise = BigInt(Math.round(amountValue * 100));
      await depositMutation.mutateAsync(amountInPaise);
      toast.success(
        `Deposit request of ${formatCurrency(amountInPaise)} submitted. Awaiting admin approval.`,
      );
      setAmount("");
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit deposit request");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Money to Wallet</DialogTitle>
        <DialogDescription>
          Choose your payment method and amount
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="method">Payment Method</Label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upi">UPI</SelectItem>
              <SelectItem value="phonepe">PhonePe</SelectItem>
              <SelectItem value="googleplay">
                Google Play Redeem Code
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Note: Actual payment integration is not available in this demo.
            Submit a request for admin approval.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="flex gap-2">
          {[100, 500, 1000, 2000].map((preset) => (
            <Button
              key={preset}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAmount(preset.toString())}
              className="flex-1"
            >
              ₹{preset}
            </Button>
          ))}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={depositMutation.isPending}
        >
          {depositMutation.isPending ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </DialogContent>
  );
}

function WithdrawDialog({
  balance,
  onClose,
}: { balance: bigint; onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const withdrawMutation = useWithdraw();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = Number.parseFloat(amount);
    if (Number.isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const amountInPaise = BigInt(Math.round(amountValue * 100));
    if (amountInPaise > balance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      await withdrawMutation.mutateAsync(amountInPaise);
      toast.success(
        `Withdrawal request of ${formatCurrency(amountInPaise)} submitted. Awaiting admin approval.`,
      );
      setAmount("");
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit withdrawal request");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Withdraw Money</DialogTitle>
        <DialogDescription>
          Request a withdrawal from your wallet balance
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">
            Available Balance
          </p>
          <p className="text-2xl font-bold font-display">
            {formatCurrency(balance)}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="withdrawAmount">Withdrawal Amount (₹)</Label>
          <Input
            id="withdrawAmount"
            type="number"
            step="0.01"
            min="1"
            max={Number(balance) / 100}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={withdrawMutation.isPending}
        >
          {withdrawMutation.isPending
            ? "Submitting..."
            : "Submit Withdrawal Request"}
        </Button>
      </form>
    </DialogContent>
  );
}
