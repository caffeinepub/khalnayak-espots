/**
 * CheaterAutoFlagBanner — shown on leaderboard when a player is auto-flagged
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  type CheaterFlag,
  useGetCheaterFlags,
} from "@/hooks/useCheaterDetection";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ShieldAlert } from "lucide-react";

interface CheaterAutoFlagBannerProps {
  tournamentId: string;
}

export function CheaterAutoFlagBanner({
  tournamentId,
}: CheaterAutoFlagBannerProps) {
  const { flags } = useGetCheaterFlags();

  const activeFlagsInTournament = flags.filter(
    (f) => f.tournamentId === tournamentId && f.status === "flagged",
  );

  if (activeFlagsInTournament.length === 0) return null;

  return (
    <div
      className="rounded-xl p-4 space-y-3"
      style={{
        background: "rgba(220,0,0,0.08)",
        border: "1px solid rgba(220,0,0,0.35)",
        boxShadow: "0 0 20px rgba(220,0,0,0.1)",
      }}
      data-ocid="security.banner"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
          style={{ background: "rgba(220,0,0,0.15)" }}
        >
          <ShieldAlert className="h-4 w-4 text-destructive" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-destructive text-sm">
            ⚠️ Auto-flagged player detected in this tournament
          </p>
          <p className="text-xs text-muted-foreground">
            Suspicious activity detected. Admin review in progress.
          </p>
        </div>
        <Badge variant="destructive" className="flex-shrink-0">
          {activeFlagsInTournament.length} Alert
          {activeFlagsInTournament.length > 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Flagged player list */}
      <div className="space-y-2">
        {activeFlagsInTournament.map((flag: CheaterFlag) => (
          <div
            key={flag.id}
            className="flex items-start gap-3 px-3 py-2 rounded-lg"
            style={{
              background: "rgba(220,0,0,0.06)",
              border: "1px solid rgba(220,0,0,0.15)",
            }}
          >
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0 text-sm">
              <p className="font-semibold text-foreground truncate">
                {flag.playerName}{" "}
                <span className="font-mono text-xs text-muted-foreground">
                  ({flag.ffId})
                </span>
              </p>
              <p className="text-xs text-muted-foreground">{flag.reason}</p>
            </div>
            <Badge
              variant="outline"
              className="flex-shrink-0 text-xs border-destructive/40 text-destructive"
            >
              {flag.kills} kills
            </Badge>
          </div>
        ))}
      </div>

      {/* Admin panel link */}
      <div className="pt-1">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
          data-ocid="security.secondary_button"
        >
          <Link to="/admin">View in Admin Panel →</Link>
        </Button>
      </div>
    </div>
  );
}
