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
  getReportReasonLabel,
  getReportStatusVariant,
  mockReports,
} from "@/data/mockAntiCheat";
import { formatDateTime } from "@/utils/format";
import { Eye, Flag } from "lucide-react";
import { useState } from "react";

export function MyReportsSection() {
  // TODO: Get current user ID from auth context
  const currentUserId = "user-001"; // Mock current user

  // Filter reports by current user
  const myReports = mockReports.filter((r) => r.reporterId === currentUserId);

  // Also check localStorage for user-submitted reports
  const localReports = JSON.parse(
    localStorage.getItem("playerReports") || "[]",
  );

  const allReports = [...myReports, ...localReports];

  if (allReports.length === 0) {
    return (
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            My Reports
          </CardTitle>
          <CardDescription>
            Reports you've submitted to help maintain fair play
          </CardDescription>
        </CardHeader>
        <CardContent className="py-12 text-center">
          <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">
            You haven't submitted any reports
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            If you witness suspicious behavior in tournaments, you can report
            players
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5" />
          My Reports
        </CardTitle>
        <CardDescription>
          Reports you've submitted: {allReports.length} total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {allReports.map((report) => (
            <ReportItem key={report.id} report={report} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ReportItem({ report }: { report: any }) {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    investigating: "bg-orange-500/20 text-orange-500 border-orange-500/30",
    banned: "bg-destructive/20 text-destructive border-destructive/30",
    cleared: "bg-success/20 text-success border-success/30",
  };

  return (
    <div className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant={getReportStatusVariant(report.status)}
              className={statusColors[report.status]}
            >
              {report.status.toUpperCase()}
            </Badge>
            <Badge variant="outline">
              {getReportReasonLabel(report.reason)}
            </Badge>
          </div>

          <div className="space-y-1 text-sm">
            <div>
              <span className="text-muted-foreground">Reported Player:</span>{" "}
              <span className="font-semibold">{report.suspectName}</span>
              <span className="text-muted-foreground ml-1 text-xs">
                ({report.suspectFreeFireId})
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Tournament:</span>{" "}
              <span className="font-medium">{report.tournamentName}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Date:</span>{" "}
              <span className="font-medium">
                {formatDateTime(BigInt(report.timestamp))}
              </span>
            </div>
          </div>

          {showDetails && report.description && (
            <div className="p-3 bg-muted rounded-lg text-sm mt-2">
              <p className="font-semibold mb-1">Your Report:</p>
              <p className="text-muted-foreground italic">
                "{report.description}"
              </p>
            </div>
          )}

          {showDetails && report.adminNotes && (
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm mt-2">
              <p className="font-semibold mb-1">Admin Response:</p>
              <p className="text-muted-foreground">{report.adminNotes}</p>
            </div>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          <Eye className="h-4 w-4 mr-2" />
          {showDetails ? "Hide" : "Details"}
        </Button>
      </div>

      {/* Status message */}
      {report.status === "pending" && (
        <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-muted-foreground">
          Your report is under review. We'll notify you once action is taken.
        </div>
      )}
      {report.status === "investigating" && (
        <div className="mt-3 p-2 bg-orange-500/10 border border-orange-500/20 rounded text-xs text-muted-foreground">
          Our team is actively investigating this report. Thank you for your
          patience.
        </div>
      )}
      {report.status === "banned" && (
        <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded text-xs text-muted-foreground">
          ✓ Action taken: Player has been banned. Thank you for helping maintain
          fair play!
        </div>
      )}
      {report.status === "cleared" && (
        <div className="mt-3 p-2 bg-success/10 border border-success/20 rounded text-xs text-muted-foreground">
          Report reviewed and cleared. No violation found or insufficient
          evidence.
        </div>
      )}
    </div>
  );
}
