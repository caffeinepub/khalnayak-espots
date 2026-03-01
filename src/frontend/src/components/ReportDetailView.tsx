import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Flag, Ban, Shield, UserX, Users, Eye, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";
import { formatDateTime } from "@/utils/format";
import { getReportReasonLabel, getReportStatusVariant, getPlayerStats, getReportsBySuspect, type Report } from "@/data/mockAntiCheat";
import { BanDialog } from "./BanDialog";

interface ReportDetailViewProps {
  report: Report;
  open: boolean;
  onClose: () => void;
}

export function ReportDetailView({ report, open, onClose }: ReportDetailViewProps) {
  const [adminNotes, setAdminNotes] = useState(report.adminNotes || "");
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showDisqualifyDialog, setShowDisqualifyDialog] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);

  // Get suspect player stats
  const playerStats = getPlayerStats(report.suspectId);
  const otherReports = getReportsBySuspect(report.suspectId).filter((r) => r.id !== report.id);

  const handleSetStatus = async (status: "investigating" | "cleared") => {
    setActionInProgress(true);
    try {
      // TODO: Replace with actual backend call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success(`Report marked as ${status}`);
      onClose();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setActionInProgress(false);
    }
  };

  const handleSaveNotes = async () => {
    setActionInProgress(true);
    try {
      // TODO: Replace with actual backend call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      toast.success("Admin notes saved");
    } catch (error) {
      toast.error("Failed to save notes");
    } finally {
      setActionInProgress(false);
    }
  };

  const handleDisqualifyTeam = async () => {
    setActionInProgress(true);
    setShowDisqualifyDialog(false);
    try {
      // TODO: Replace with actual backend call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Team disqualified from tournament");
      onClose();
    } catch (error) {
      toast.error("Failed to disqualify team");
    } finally {
      setActionInProgress(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-destructive" />
              Report Details - {report.id}
            </DialogTitle>
            <DialogDescription>Review report and take appropriate action</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <Badge variant={getReportStatusVariant(report.status)} className="text-sm py-1 px-3">
                {report.status.toUpperCase()}
              </Badge>
              <Badge variant="outline">{getReportReasonLabel(report.reason)}</Badge>
              <span className="text-sm text-muted-foreground">{formatDateTime(BigInt(report.timestamp))}</span>
            </div>

            <Tabs defaultValue="details" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Report Details</TabsTrigger>
                <TabsTrigger value="suspect">Suspect Profile</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>

              {/* Tab 1: Report Details */}
              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Report Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Reporter</Label>
                        <p className="font-semibold">{report.reporterName}</p>
                        <p className="text-xs text-muted-foreground">ID: {report.reporterId}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Tournament</Label>
                        <p className="font-semibold">{report.tournamentName}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Suspect Player</Label>
                        <p className="font-semibold">{report.suspectName}</p>
                        <p className="text-xs text-muted-foreground">FF ID: {report.suspectFreeFireId}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Report Reason</Label>
                        <p className="font-semibold">{getReportReasonLabel(report.reason)}</p>
                      </div>
                    </div>

                    {report.description && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Description</Label>
                        <div className="p-3 bg-muted rounded-lg mt-1">
                          <p className="text-sm italic">"{report.description}"</p>
                        </div>
                      </div>
                    )}

                    {report.reviewedBy && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Reviewed By</Label>
                        <p className="font-semibold">{report.reviewedBy}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Other Reports on Same Player */}
                {otherReports.length > 0 && (
                  <Card className="border-destructive/30">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Multiple Reports on This Player
                      </CardTitle>
                      <CardDescription>{otherReports.length} other report(s) found</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {otherReports.map((r) => (
                          <div key={r.id} className="p-3 border rounded-lg text-sm">
                            <div className="flex items-center justify-between">
                              <div>
                                <Badge variant="outline" className="mb-1">
                                  {getReportReasonLabel(r.reason)}
                                </Badge>
                                <p className="text-xs text-muted-foreground">{r.tournamentName}</p>
                              </div>
                              <Badge variant={getReportStatusVariant(r.status)}>{r.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Tab 2: Suspect Profile */}
              <TabsContent value="suspect" className="space-y-4">
                {playerStats ? (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Player Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-xs text-muted-foreground">Account Age</p>
                            <p className="text-2xl font-bold">{playerStats.accountAge}d</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-xs text-muted-foreground">Total Matches</p>
                            <p className="text-2xl font-bold">{playerStats.totalMatches}</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-xs text-muted-foreground">Avg Kills</p>
                            <p className="text-2xl font-bold text-primary">{playerStats.avgKills.toFixed(1)}</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-xs text-muted-foreground">Top Placements</p>
                            <p className="text-2xl font-bold">{playerStats.topPlacements}</p>
                          </div>
                          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">Reports Against</p>
                            <p className="text-2xl font-bold text-destructive">{playerStats.reportsAgainst}</p>
                          </div>
                          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">Ban History</p>
                            <p className="text-2xl font-bold text-destructive">{playerStats.banHistory}</p>
                          </div>
                        </div>

                        {/* Red flags */}
                        {(playerStats.avgKills > 12 || playerStats.accountAge < 14 || playerStats.reportsAgainst > 1) && (
                          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                            <p className="font-semibold text-destructive text-sm flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              Suspicious Patterns Detected
                            </p>
                            <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                              {playerStats.avgKills > 12 && <li>• Unusually high average kills ({playerStats.avgKills.toFixed(1)})</li>}
                              {playerStats.accountAge < 14 && <li>• New account (less than 2 weeks old)</li>}
                              {playerStats.reportsAgainst > 1 && <li>• Multiple reports from different players</li>}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Match History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Tournament</TableHead>
                              <TableHead className="text-right">Kills</TableHead>
                              <TableHead className="text-right">Placement</TableHead>
                              <TableHead className="text-right">Points</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {playerStats.matchHistory.map((match) => (
                              <TableRow key={`${match.tournamentName}-${match.date}`}>
                                <TableCell className="font-medium">{match.tournamentName}</TableCell>
                                <TableCell className={`text-right ${match.kills >= 15 ? "text-destructive font-bold" : ""}`}>
                                  {match.kills}
                                </TableCell>
                                <TableCell className="text-right">#{match.placement}</TableCell>
                                <TableCell className="text-right font-semibold">{match.points}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">Player statistics not available</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Tab 3: Actions */}
              <TabsContent value="actions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Admin Notes</CardTitle>
                    <CardDescription>Add internal notes about this investigation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add your investigation notes, evidence links, or observations..."
                      rows={4}
                    />
                    <Button onClick={handleSaveNotes} disabled={actionInProgress} size="sm">
                      Save Notes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Available Actions</CardTitle>
                    <CardDescription>Take action based on your investigation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button
                        variant="destructive"
                        onClick={() => setShowBanDialog(true)}
                        disabled={actionInProgress || report.status === "banned"}
                        className="w-full"
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        Ban Player
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setShowDisqualifyDialog(true)}
                        disabled={actionInProgress}
                        className="w-full"
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Disqualify from Tournament
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => handleSetStatus("investigating")}
                        disabled={actionInProgress || report.status === "investigating"}
                        className="w-full"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Mark as Investigating
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => handleSetStatus("cleared")}
                        disabled={actionInProgress || report.status === "cleared"}
                        className="w-full"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Mark as Cleared
                      </Button>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                      <p className="font-semibold mb-1">Action Guidelines:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Review all evidence before taking action</li>
                        <li>• Ban only if there's clear proof of cheating</li>
                        <li>• Disqualify for rule violations in specific tournaments</li>
                        <li>• Mark as cleared if report is false or unverifiable</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ban Dialog */}
      <BanDialog
        open={showBanDialog}
        onOpenChange={setShowBanDialog}
        playerId={report.suspectId}
        playerName={report.suspectName}
        onBanConfirmed={() => {
          toast.success("Player banned successfully");
          onClose();
        }}
      />

      {/* Disqualify Confirmation */}
      <AlertDialog open={showDisqualifyDialog} onOpenChange={setShowDisqualifyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disqualify Team?</AlertDialogTitle>
            <AlertDialogDescription>
              This will disqualify <span className="font-semibold">{report.suspectName}</span>'s team from{" "}
              <span className="font-semibold">{report.tournamentName}</span>. The team will be removed from the
              leaderboard and will not receive any prizes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionInProgress}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDisqualifyTeam} disabled={actionInProgress} className="bg-destructive hover:bg-destructive/90">
              {actionInProgress ? "Disqualifying..." : "Disqualify Team"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
