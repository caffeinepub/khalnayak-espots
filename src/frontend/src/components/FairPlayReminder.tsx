import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, Flag } from "lucide-react";

interface FairPlayReminderProps {
  tournamentId: string;
  tournamentName: string;
  onReportClick: () => void;
}

export function FairPlayReminder({ tournamentId, tournamentName, onReportClick }: FairPlayReminderProps) {
  const [open, setOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if user has dismissed this for this tournament
    const dismissedKey = `fair-play-dismissed-${tournamentId}`;
    const isDismissed = localStorage.getItem(dismissedKey) === "true";
    
    // Check global don't show again
    const globalDismiss = localStorage.getItem("fair-play-dont-show") === "true";

    if (!isDismissed && !globalDismiss) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [tournamentId]);

  const handleDismiss = () => {
    if (dontShowAgain) {
      localStorage.setItem("fair-play-dont-show", "true");
    } else {
      localStorage.setItem(`fair-play-dismissed-${tournamentId}`, "true");
    }
    setOpen(false);
  };

  const handleReportPlayer = () => {
    handleDismiss();
    onReportClick();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md border-primary/50">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Shield className="h-16 w-16 text-primary" strokeWidth={1.5} />
              <div className="absolute inset-0 h-16 w-16 text-primary/30 animate-pulse">
                <Shield className="h-16 w-16" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <DialogTitle className="text-2xl font-display text-center">Fair Play Matters</DialogTitle>
          <DialogDescription className="text-center text-base">
            Help us maintain a competitive and fair gaming environment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-center">
              Did you witness any suspicious activity in <span className="font-semibold">{tournamentName}</span>?
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Our community thrives on fair competition. If you noticed any cheating, hacking, or suspicious behavior,
              please report it.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
              <li>✓ All reports are reviewed confidentially</li>
              <li>✓ Your identity remains anonymous</li>
              <li>✓ Help us keep tournaments fair for everyone</li>
            </ul>
          </div>

          <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
            <Checkbox
              id="dont-show"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
            />
            <Label htmlFor="dont-show" className="text-sm cursor-pointer font-normal">
              Don't show this reminder again
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleDismiss} className="w-full">
              No Issues
            </Button>
            <Button onClick={handleReportPlayer} className="w-full bg-destructive hover:bg-destructive/90">
              <Flag className="mr-2 h-4 w-4" />
              Report Player
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Thank you for helping us maintain a fair and competitive environment! 🎮
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
