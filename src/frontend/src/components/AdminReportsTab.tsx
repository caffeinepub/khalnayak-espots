import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type Report,
  type ReportReason,
  type ReportStatus,
  getReportReasonLabel,
  getReportStatusVariant,
  mockBans,
  mockReports,
} from "@/data/mockAntiCheat";
import { formatRelativeTime } from "@/utils/format";
import { Ban as BanIcon, Eye, Flag, Search, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { ReportDetailView } from "./ReportDetailView";

export function AdminReportsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");
  const [reasonFilter, setReasonFilter] = useState<ReportReason | "all">("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Calculate stats
  const totalReports = mockReports.length;
  const pendingReports = mockReports.filter(
    (r) => r.status === "pending",
  ).length;
  const resolvedReports = mockReports.filter(
    (r) => r.status === "banned" || r.status === "cleared",
  ).length;
  const activeBans = mockBans.filter((b) => b.active).length;

  // Filter reports
  const filteredReports = useMemo(() => {
    return mockReports.filter((report) => {
      // Status filter
      if (statusFilter !== "all" && report.status !== statusFilter)
        return false;

      // Reason filter
      if (reasonFilter !== "all" && report.reason !== reasonFilter)
        return false;

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          report.suspectName.toLowerCase().includes(query) ||
          report.suspectFreeFireId.toLowerCase().includes(query) ||
          report.reporterName.toLowerCase().includes(query) ||
          report.tournamentName.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, statusFilter, reasonFilter]);

  // Group reports by status
  const pendingList = filteredReports.filter((r) => r.status === "pending");
  const investigatingList = filteredReports.filter(
    (r) => r.status === "investigating",
  );
  const bannedList = filteredReports.filter((r) => r.status === "banned");
  const clearedList = filteredReports.filter((r) => r.status === "cleared");

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-display">{totalReports}</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-display text-yellow-500">
              {pendingReports}
            </p>
          </CardContent>
        </Card>

        <Card className="border-success/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-display text-success">
              {resolvedReports}
            </p>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <BanIcon className="h-4 w-4" />
              Active Bans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-display text-destructive">
              {activeBans}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Player Reports Management
          </CardTitle>
          <CardDescription>
            Review and take action on suspicious player reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search player, FF ID, tournament..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as ReportStatus | "all")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
                <SelectItem value="cleared">Cleared</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={reasonFilter}
              onValueChange={(value) =>
                setReasonFilter(value as ReportReason | "all")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                <SelectItem value="aimbot">Aimbot</SelectItem>
                <SelectItem value="wallhack">Wallhack</SelectItem>
                <SelectItem value="speedhack">Speed Hack</SelectItem>
                <SelectItem value="modmenu">Mod Menu</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Report Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">
                All
                <Badge variant="secondary" className="ml-2">
                  {filteredReports.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                <Badge
                  variant="secondary"
                  className="ml-2 bg-yellow-500/20 text-yellow-500"
                >
                  {pendingList.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="investigating">
                Investigating
                <Badge
                  variant="secondary"
                  className="ml-2 bg-orange-500/20 text-orange-500"
                >
                  {investigatingList.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="banned">
                Banned
                <Badge variant="destructive" className="ml-2">
                  {bannedList.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="cleared">
                Cleared
                <Badge
                  variant="secondary"
                  className="ml-2 bg-success/20 text-success"
                >
                  {clearedList.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ReportList
                reports={filteredReports}
                onReportClick={setSelectedReport}
              />
            </TabsContent>
            <TabsContent value="pending">
              <ReportList
                reports={pendingList}
                onReportClick={setSelectedReport}
              />
            </TabsContent>
            <TabsContent value="investigating">
              <ReportList
                reports={investigatingList}
                onReportClick={setSelectedReport}
              />
            </TabsContent>
            <TabsContent value="banned">
              <ReportList
                reports={bannedList}
                onReportClick={setSelectedReport}
              />
            </TabsContent>
            <TabsContent value="cleared">
              <ReportList
                reports={clearedList}
                onReportClick={setSelectedReport}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Report Detail View (Modal/Drawer) */}
      {selectedReport && (
        <ReportDetailView
          report={selectedReport}
          open={!!selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}

function ReportList({
  reports,
  onReportClick,
}: { reports: Report[]; onReportClick: (report: Report) => void }) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <ShieldAlert className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-muted-foreground">No reports found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onClick={() => onReportClick(report)}
        />
      ))}
    </div>
  );
}

function ReportCard({
  report,
  onClick,
}: { report: Report; onClick: () => void }) {
  const statusColors = {
    pending: "border-yellow-500/30 bg-yellow-500/5",
    investigating: "border-orange-500/30 bg-orange-500/5",
    banned: "border-destructive/30 bg-destructive/5",
    cleared: "border-success/30 bg-success/5",
  };

  const statusBadgeColors = {
    pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    investigating: "bg-orange-500/20 text-orange-500 border-orange-500/30",
    banned: "bg-destructive/20 text-destructive border-destructive/30",
    cleared: "bg-success/20 text-success border-success/30",
  };

  return (
    <button
      type="button"
      className={`w-full p-4 border rounded-lg hover:border-primary/50 transition-all cursor-pointer text-left ${statusColors[report.status]}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant={getReportStatusVariant(report.status)}
              className={statusBadgeColors[report.status]}
            >
              {report.status.toUpperCase()}
            </Badge>
            <Badge variant="outline">
              {getReportReasonLabel(report.reason)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(BigInt(report.timestamp))}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Suspect:</span>{" "}
              <span className="font-semibold">{report.suspectName}</span>
              <span className="text-muted-foreground ml-1 text-xs">
                ({report.suspectFreeFireId})
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Reporter:</span>{" "}
              <span className="font-medium">{report.reporterName}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-muted-foreground">Tournament:</span>{" "}
              <span className="font-medium">{report.tournamentName}</span>
            </div>
          </div>

          {report.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 italic">
              "{report.description}"
            </p>
          )}

          {report.adminNotes && (
            <div className="p-2 bg-muted/50 rounded text-xs border border-border">
              <span className="font-semibold">Admin Notes:</span>{" "}
              {report.adminNotes}
            </div>
          )}
        </div>

        <Button variant="outline" size="sm" onClick={onClick}>
          <Eye className="h-4 w-4 mr-2" />
          Review
        </Button>
      </div>
    </button>
  );
}
