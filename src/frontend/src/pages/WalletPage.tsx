import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useGetCallerWallet, useDeposit, useWithdraw, useGetCallerUserProfile } from "@/hooks/useQueries";
import { formatCurrency, formatDateTime, getTransactionTypeLabel } from "@/utils/format";
import { Wallet as WalletIcon, Plus, Minus, Copy, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { toast } from "sonner";

export function WalletPage() {
  const { data: wallet, isLoading } = useGetCallerWallet();
  const { data: profile } = useGetCallerUserProfile();
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

  const transactions = wallet?.transactions || [];
  const sortedTransactions = [...transactions].sort((a, b) => Number(b.timestamp - a.timestamp));

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
        <p className="text-muted-foreground">Manage your funds and view transaction history</p>
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
            <p className="text-5xl font-bold font-display">{wallet ? formatCurrency(wallet.balance) : "₹0.00"}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Money
                </Button>
              </DialogTrigger>
              <DepositDialog onClose={() => setDepositDialogOpen(false)} />
            </Dialog>

            <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 border-primary/30">
                  <Minus className="mr-2 h-4 w-4" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <WithdrawDialog balance={wallet?.balance || BigInt(0)} onClose={() => setWithdrawDialogOpen(false)} />
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Referral Card */}
      {profile?.referralCode && (
        <Card className="border-secondary/30">
          <CardHeader>
            <CardTitle className="text-lg">Referral Code</CardTitle>
            <CardDescription>Share your code and earn bonuses when friends register</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <code className="flex-1 bg-muted px-4 py-3 rounded-md font-mono text-lg font-bold">{profile.referralCode}</code>
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
                    const isCredit = txn.transactionType === "deposit" || txn.transactionType === "prize" || txn.transactionType === "bonus";
                    return (
                      <TableRow key={txn.id.toString()}>
                        <TableCell>
                          <Badge variant={isCredit ? "default" : "secondary"} className={isCredit ? "bg-success" : ""}>
                            {getTransactionTypeLabel(txn.transactionType)}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{txn.description}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{formatDateTime(txn.timestamp)}</TableCell>
                        <TableCell className="text-right font-semibold">
                          <span className={isCredit ? "text-success" : "text-destructive"}>
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

function DepositDialog({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<string>("upi");
  const depositMutation = useDeposit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const amountInPaise = BigInt(Math.round(amountValue * 100));
      await depositMutation.mutateAsync(amountInPaise);
      toast.success(`Deposit request of ${formatCurrency(amountInPaise)} submitted. Awaiting admin approval.`);
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
        <DialogDescription>Choose your payment method and amount</DialogDescription>
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
              <SelectItem value="googleplay">Google Play Redeem Code</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Note: Actual payment integration is not available in this demo. Submit a request for admin approval.
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

        <Button type="submit" className="w-full" disabled={depositMutation.isPending}>
          {depositMutation.isPending ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </DialogContent>
  );
}

function WithdrawDialog({ balance, onClose }: { balance: bigint; onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const withdrawMutation = useWithdraw();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
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
      toast.success(`Withdrawal request of ${formatCurrency(amountInPaise)} submitted. Awaiting admin approval.`);
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
        <DialogDescription>Request a withdrawal from your wallet balance</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
          <p className="text-2xl font-bold font-display">{formatCurrency(balance)}</p>
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

        <Button type="submit" className="w-full" disabled={withdrawMutation.isPending}>
          {withdrawMutation.isPending ? "Submitting..." : "Submit Withdrawal Request"}
        </Button>
      </form>
    </DialogContent>
  );
}
