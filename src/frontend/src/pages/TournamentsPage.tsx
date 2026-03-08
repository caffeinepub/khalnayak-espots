import type { Tournament } from "@/backend";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTournaments } from "@/hooks/useQueries";
import {
  formatCurrency,
  getTournamentPlayerInfo,
  getTournamentTypeLabel,
} from "@/utils/format";
import { Link } from "@tanstack/react-router";
import { Calendar, SlidersHorizontal, Users } from "lucide-react";
import { useState } from "react";

export function TournamentsPage() {
  const { data: tournaments, isLoading } = useGetTournaments();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTournaments =
    tournaments?.filter((t) => {
      const matchesType =
        typeFilter === "all" || t.tournamentType === typeFilter;
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      return matchesType && matchesStatus;
    }) || [];

  return (
    <div className="min-h-screen pb-24" style={{ background: "#0A0A0A" }}>
      <div className="container py-8 space-y-6 px-4 md:px-6">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div
              style={{
                borderLeft: "3px solid #00FF88",
                paddingLeft: 12,
              }}
            >
              <h1
                className="text-4xl font-bold font-display"
                style={{
                  borderBottom: "2px solid rgba(0,255,136,0.4)",
                  paddingBottom: 4,
                }}
              >
                All Tournaments
              </h1>
            </div>
            <SlidersHorizontal
              className="md:hidden"
              style={{ width: 20, height: 20, color: "#00FF88", flexShrink: 0 }}
            />
          </div>
          <p
            className="pl-4 md:pl-0"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Browse and register for Free Fire tournaments
          </p>
        </div>

        {/* Filter chips — Type */}
        <div className="space-y-3">
          <div
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
            data-ocid="tournaments.type_filter.panel"
          >
            {[
              { value: "all", label: "All" },
              { value: "battleground", label: "⚔️ Battle Ground" },
              { value: "custom4v4", label: "🎮 4vs4" },
              { value: "custom1v1", label: "🥇 1vs1" },
              { value: "custom2v2", label: "🥈 2vs2" },
            ].map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setTypeFilter(chip.value)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all"
                style={{
                  background:
                    typeFilter === chip.value
                      ? "#00FF88"
                      : "rgba(22,33,62,0.6)",
                  color:
                    typeFilter === chip.value
                      ? "#0A0A0A"
                      : "rgba(255,255,255,0.6)",
                  border:
                    typeFilter === chip.value
                      ? "1px solid #00FF88"
                      : "1px solid rgba(0,255,136,0.2)",
                  boxShadow:
                    typeFilter === chip.value
                      ? "0 0 12px rgba(0,255,136,0.5)"
                      : "none",
                }}
                data-ocid="tournaments.type_filter.tab"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Filter chips — Status */}
          <div
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
            data-ocid="tournaments.status_filter.panel"
          >
            {[
              { value: "all", label: "All Status" },
              { value: "upcoming", label: "⏰ Upcoming" },
              { value: "ongoing", label: "🔴 Live" },
              { value: "completed", label: "✅ Done" },
            ].map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setStatusFilter(chip.value)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all"
                style={{
                  background:
                    statusFilter === chip.value
                      ? "#9d4edd"
                      : "rgba(22,33,62,0.6)",
                  color:
                    statusFilter === chip.value
                      ? "#fff"
                      : "rgba(255,255,255,0.6)",
                  border:
                    statusFilter === chip.value
                      ? "1px solid rgba(157,78,221,0.8)"
                      : "1px solid rgba(157,78,221,0.2)",
                  boxShadow:
                    statusFilter === chip.value
                      ? "0 0 12px rgba(157,78,221,0.5)"
                      : "none",
                }}
                data-ocid="tournaments.status_filter.tab"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Result count */}
          <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            {filteredTournaments.length} tournament
            {filteredTournaments.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {/* Tournament Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton
                key={i}
                className="h-96 rounded-[12px]"
                style={{ background: "rgba(22,33,62,0.4)" }}
              />
            ))}
          </div>
        ) : filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id.toString()}
                tournament={tournament}
              />
            ))}
          </div>
        ) : (
          <div
            className="p-12 rounded-[12px] text-center"
            style={{
              background: "rgba(22,33,62,0.4)",
              border: "1px solid rgba(0,255,136,0.12)",
            }}
            data-ocid="tournaments.empty_state"
          >
            <p style={{ color: "rgba(255,255,255,0.5)" }}>
              No tournaments found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
  const isUpcoming = tournament.status === "upcoming";
  const isOngoing = tournament.status === "ongoing";
  const isCompleted = tournament.status === "completed";

  const modeIcon =
    tournament.tournamentType === "battleground"
      ? "⚔️"
      : tournament.tournamentType === "custom4v4"
        ? "🎮"
        : tournament.tournamentType === "custom1v1"
          ? "🥇"
          : "🥈";

  return (
    <div
      className="rounded-[12px] overflow-hidden transition-all duration-200"
      style={{
        background: "rgba(16,24,48,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isOngoing
          ? "1px solid rgba(239,68,68,0.5)"
          : "1px solid rgba(0,255,136,0.18)",
        boxShadow: isOngoing
          ? "0 4px 24px rgba(239,68,68,0.2)"
          : "0 4px 20px rgba(0,0,0,0.5)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = isOngoing
          ? "0 8px 32px rgba(239,68,68,0.3)"
          : "0 8px 32px rgba(0,255,136,0.15), 0 4px 20px rgba(0,0,0,0.5)";
        el.style.borderColor = isOngoing
          ? "rgba(239,68,68,0.8)"
          : "rgba(0,255,136,0.4)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = isOngoing
          ? "0 4px 24px rgba(239,68,68,0.2)"
          : "0 4px 20px rgba(0,0,0,0.5)";
        el.style.borderColor = isOngoing
          ? "rgba(239,68,68,0.5)"
          : "rgba(0,255,136,0.18)";
      }}
    >
      {/* Top gradient accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: isOngoing
            ? "linear-gradient(90deg, #ef4444, #ff6b6b)"
            : isCompleted
              ? "linear-gradient(90deg, #555, #777)"
              : "linear-gradient(90deg, #00FF88, #9d4edd)",
        }}
      />

      <div className="p-4 space-y-3">
        {/* Badges row */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-bold uppercase px-2 py-0.5 rounded-full"
            style={{
              background: isOngoing
                ? "rgba(239,68,68,0.2)"
                : isCompleted
                  ? "rgba(100,100,100,0.2)"
                  : "rgba(0,255,136,0.12)",
              color: isOngoing ? "#ff6b6b" : isCompleted ? "#888" : "#00FF88",
              border: `1px solid ${
                isOngoing
                  ? "rgba(239,68,68,0.4)"
                  : isCompleted
                    ? "rgba(100,100,100,0.3)"
                    : "rgba(0,255,136,0.3)"
              }`,
            }}
          >
            {isOngoing ? "🔴 LIVE" : isCompleted ? "✅ DONE" : "⏰ UPCOMING"}
          </span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(157,78,221,0.15)",
              color: "#c084fc",
              border: "1px solid rgba(157,78,221,0.3)",
            }}
          >
            {modeIcon} {getTournamentTypeLabel(tournament.tournamentType)}
          </span>
        </div>

        {/* Tournament name */}
        <h3
          className="font-display font-bold text-white leading-tight"
          style={{ fontSize: "clamp(1rem, 4vw, 1.15rem)" }}
        >
          {tournament.name}
        </h3>

        {/* Player info */}
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          {getTournamentPlayerInfo(tournament.tournamentType).description}
        </p>

        {/* Countdown / Live indicator */}
        {isUpcoming && (
          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "#FFD700" }}
          >
            <Calendar className="h-3 w-3" />
            <span>Starts in: </span>
            <CountdownTimer targetTime={tournament.startTime} compact />
          </div>
        )}
        {isOngoing && (
          <div
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#ef4444" }}
          >
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Tournament is Live!
          </div>
        )}

        {/* Stats row */}
        <div
          className="rounded-lg p-3 space-y-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex justify-between text-sm">
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Entry Fee</span>
            <span className="font-bold text-white">
              {formatCurrency(tournament.entryFee)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Prize Pool</span>
            <span className="font-bold" style={{ color: "#00FF88" }}>
              {formatCurrency(tournament.prizePool)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span
              className="flex items-center gap-1"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <Users className="h-3 w-3" /> Slots
            </span>
            <span className="font-bold text-white">
              {tournament.maxTeams.toString()} teams
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to="/tournament/$id"
          params={{ id: tournament.id.toString() }}
          className="block w-full text-center py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all"
          style={
            isOngoing
              ? {
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#fff",
                  boxShadow: "0 0 16px rgba(239,68,68,0.4)",
                }
              : isUpcoming
                ? {
                    background: "linear-gradient(135deg, #00FF88, #00cc6a)",
                    color: "#0A0A0A",
                    boxShadow: "0 0 16px rgba(0,255,136,0.4)",
                  }
                : {
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }
          }
          data-ocid="tournaments.register.button"
        >
          {isOngoing
            ? "View Live"
            : isUpcoming
              ? "⚡ Register Now"
              : "View Details"}
        </Link>
      </div>
    </div>
  );
}
