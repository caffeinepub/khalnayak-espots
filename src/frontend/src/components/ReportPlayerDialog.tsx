import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Flag } from "lucide-react";
import { toast } from "sonner";
import type { ReportReason } from "@/data/mockAntiCheat";
import { getReportReasonLabel } from "@/data/mockAntiCheat";

interface ReportPlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentId?: string;
  tournamentName?: string;
  defaultSuspectName?: string;
  defaultSuspectId?: string;
}

export function ReportPlayerDialog({
  open,
  onOpenChange,
  tournamentId,
  tournamentName,
  defaultSuspectName = "",
  defaultSuspectId = "",
}: ReportPlayerDialogProps) {
  const [suspectName, setSuspectName] = useState(defaultSuspectName);
  const [suspectFreeFireId, setSuspectFreeFireId] = useState(defaultSuspectId);
  const [reason, setReason] = useState<ReportReason>("aimbot");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!suspectName.trim() || !suspectFreeFireId.trim()) {
      toast.error("Please provide suspect player details");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual backend call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock: Store report in localStorage for now
      const reports = JSON.parse(localStorage.getItem("playerReports") || "[]");
      const newReport = {
        id: `report-${Date.now()}`,
        reporterId: "current-user-id", // TODO: Get from auth context
        reporterName: "Current User", // TODO: Get from user profile
        suspectId: suspectFreeFireId,
        suspectName,
        suspectFreeFireId,
        tournamentId: tournamentId || "unknown",
        tournamentName: tournamentName || "Unknown Tournament",
        reason,
        description: description.trim() || undefined,
        timestamp: Date.now(),
        status: "pending",
      };
      reports.push(newReport);
      localStorage.setItem("playerReports", JSON.stringify(reports));

      toast.success("Report Submitted", {
        description: "Thank you for helping us maintain fair play. We'll review this report soon.",
      });

      // Reset form
      setSuspectName("");
      setSuspectFreeFireId("");
      setReason("aimbot");
      setDescription("");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-destructive" />
            Report Suspicious Player
          </DialogTitle>
          <DialogDescription>
            Help us maintain fair play by reporting suspicious behavior. All reports are reviewed by our admin team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {tournamentName && (
            <div className="p-3 bg-muted rounded-lg text-sm">
              <span className="text-muted-foreground">Tournament: </span>
              <span className="font-semibold">{tournamentName}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="suspectName">Suspect Player Name *</Label>
            <Input
              id="suspectName"
              value={suspectName}
              onChange={(e) => setSuspectName(e.target.value)}
              placeholder="Enter player name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="suspectId">Suspect Free Fire ID *</Label>
            <Input
              id="suspectId"
              value={suspectFreeFireId}
              onChange={(e) => setSuspectFreeFireId(e.target.value)}
              placeholder="Enter Free Fire ID"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Report Reason *</Label>
            <RadioGroup value={reason} onValueChange={(value) => setReason(value as ReportReason)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aimbot" id="aimbot" />
                <Label htmlFor="aimbot" className="cursor-pointer font-normal">
                  {getReportReasonLabel("aimbot")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wallhack" id="wallhack" />
                <Label htmlFor="wallhack" className="cursor-pointer font-normal">
                  {getReportReasonLabel("wallhack")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="speedhack" id="speedhack" />
                <Label htmlFor="speedhack" className="cursor-pointer font-normal">
                  {getReportReasonLabel("speedhack")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="modmenu" id="modmenu" />
                <Label htmlFor="modmenu" className="cursor-pointer font-normal">
                  {getReportReasonLabel("modmenu")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="cursor-pointer font-normal">
                  {getReportReasonLabel("other")}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Additional Details (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you observed (e.g., 'Perfect headshots through smoke', 'Moving faster than vehicle speed', etc.)"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">{description.length}/500 characters</p>
          </div>

          <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg text-sm text-muted-foreground">
            <p className="font-semibold text-destructive mb-1">Important:</p>
            <ul className="space-y-1 text-xs">
              <li>• False reports may result in penalties</li>
              <li>• Provide accurate information only</li>
              <li>• Screenshots as proof are encouraged (upload feature coming soon)</li>
            </ul>
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
            <Button type="submit" className="flex-1 bg-destructive hover:bg-destructive/90" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
