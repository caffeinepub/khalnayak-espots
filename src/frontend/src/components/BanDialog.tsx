import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { BanDuration } from "@/data/mockAntiCheat";
import { AlertTriangle, Ban } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playerId: string;
  playerName: string;
  onBanConfirmed?: () => void;
}

export function BanDialog({
  open,
  onOpenChange,
  playerId,
  playerName,
  onBanConfirmed,
}: BanDialogProps) {
  const [duration, setDuration] = useState<BanDuration>("1day");
  const [reason, setReason] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (reason.trim().length < 10) {
      toast.error("Please provide a detailed reason (minimum 10 characters)");
      return;
    }

    // Show confirmation dialog for permanent bans
    if (duration === "permanent") {
      setShowConfirmation(true);
    } else {
      executeBan();
    }
  };

  const executeBan = async () => {
    setIsSubmitting(true);
    setShowConfirmation(false);

    try {
      // TODO: Replace with actual backend call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock: Store ban
      const bans = JSON.parse(localStorage.getItem("playerBans") || "[]");
      const expiryDate =
        duration === "permanent"
          ? undefined
          : duration === "7days"
            ? Date.now() + 7 * 24 * 60 * 60 * 1000
            : Date.now() + 24 * 60 * 60 * 1000;

      const newBan = {
        id: `ban-${Date.now()}`,
        playerId,
        playerName,
        reason: reason.trim(),
        bannedBy: "Admin",
        banDate: Date.now(),
        duration,
        expiryDate,
        active: true,
      };
      bans.push(newBan);
      localStorage.setItem("playerBans", JSON.stringify(bans));

      toast.success("Player Banned", {
        description: `${playerName} has been banned for ${duration === "permanent" ? "permanent" : duration === "7days" ? "7 days" : "1 day"}.`,
      });

      // Reset form
      setDuration("1day");
      setReason("");
      onOpenChange(false);
      onBanConfirmed?.();
    } catch (_error) {
      toast.error("Failed to ban player. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Ban className="h-5 w-5" />
              Ban Player
            </DialogTitle>
            <DialogDescription>
              You are about to ban{" "}
              <span className="font-semibold">{playerName}</span>. This action
              will restrict their access to the platform.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label>Ban Duration *</Label>
              <RadioGroup
                value={duration}
                onValueChange={(value) => setDuration(value as BanDuration)}
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="1day" id="1day" />
                  <Label
                    htmlFor="1day"
                    className="cursor-pointer font-normal flex-1"
                  >
                    <p className="font-semibold">1 Day</p>
                    <p className="text-xs text-muted-foreground">
                      Temporary ban for minor violations
                    </p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="7days" id="7days" />
                  <Label
                    htmlFor="7days"
                    className="cursor-pointer font-normal flex-1"
                  >
                    <p className="font-semibold">7 Days</p>
                    <p className="text-xs text-muted-foreground">
                      Standard ban for serious violations
                    </p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-destructive/30 rounded-lg hover:bg-destructive/5 transition-colors">
                  <RadioGroupItem value="permanent" id="permanent" />
                  <Label
                    htmlFor="permanent"
                    className="cursor-pointer font-normal flex-1"
                  >
                    <p className="font-semibold text-destructive">
                      Permanent Ban
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Irreversible ban for severe violations (cheating, hacking)
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {duration === "permanent" && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-destructive">
                    Warning: Permanent Ban
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This action cannot be undone. The player will lose access
                    forever. Use only for confirmed cheaters.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="reason">Ban Reason * (min. 10 characters)</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe the violation (e.g., 'Confirmed aimbot usage with video evidence', 'Multiple reports of wallhack', etc.)"
                rows={4}
                required
                minLength={10}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                {reason.length}/500 characters
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-destructive hover:bg-destructive/90"
                disabled={isSubmitting || reason.trim().length < 10}
              >
                {isSubmitting ? "Banning..." : "Confirm Ban"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Permanent Bans */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-6 w-6" />
              Permanent Ban Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                You are about to{" "}
                <span className="font-bold text-destructive">
                  permanently ban
                </span>{" "}
                <span className="font-semibold">{playerName}</span>.
              </p>
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-sm">
                <p className="font-semibold mb-1">This action will:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Block all platform access forever</li>
                  <li>• Cannot be reversed by admins</li>
                  <li>• Remove player from all active tournaments</li>
                  <li>• Set an example for other potential cheaters</li>
                </ul>
              </div>
              <p className="text-sm">
                Are you absolutely sure you want to proceed?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={executeBan}
              disabled={isSubmitting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isSubmitting ? "Banning..." : "Yes, Ban Permanently"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
