/**
 * useCheaterDetection — localStorage-based auto-flagging of suspicious players
 *
 * Storage keys:
 * - "kn_cheat_flags": CheaterFlag[]
 * - "kn_disqualified_teams": DisqualifiedTeam[]
 *
 * Auto-flag rules:
 * 1. kills >= 15 in a single match → flagged for suspicious activity
 */

const FLAGS_KEY = "kn_cheat_flags";
const DQ_TEAMS_KEY = "kn_disqualified_teams";

export interface CheaterFlag {
  id: string;
  playerId: string;
  playerName: string;
  ffId: string;
  reason: string;
  timestamp: number;
  tournamentId: string;
  tournamentName: string;
  kills: number;
  status: "flagged" | "cleared" | "banned";
}

export interface DisqualifiedTeam {
  id: string;
  teamId: string;
  teamName: string;
  tournamentId: string;
  tournamentName: string;
  reason: string;
  timestamp: number;
}

// ── Readers ────────────────────────────────────────────────────────────────────

export function getCheaterFlags(): CheaterFlag[] {
  try {
    const raw = localStorage.getItem(FLAGS_KEY);
    if (raw) return JSON.parse(raw) as CheaterFlag[];
  } catch {
    // ignore
  }
  return [];
}

export function getDisqualifiedTeams(): DisqualifiedTeam[] {
  try {
    const raw = localStorage.getItem(DQ_TEAMS_KEY);
    if (raw) return JSON.parse(raw) as DisqualifiedTeam[];
  } catch {
    // ignore
  }
  return [];
}

// ── Writers ────────────────────────────────────────────────────────────────────

function saveCheaterFlags(flags: CheaterFlag[]) {
  try {
    localStorage.setItem(FLAGS_KEY, JSON.stringify(flags));
  } catch {
    // ignore
  }
}

function saveDisqualifiedTeams(teams: DisqualifiedTeam[]) {
  try {
    localStorage.setItem(DQ_TEAMS_KEY, JSON.stringify(teams));
  } catch {
    // ignore
  }
}

// ── Actions ────────────────────────────────────────────────────────────────────

export function flagPlayer(
  player: { id: string; name: string; ffId: string },
  tournamentId: string,
  tournamentName: string,
  kills: number,
  reason: string,
): CheaterFlag | null {
  const flags = getCheaterFlags();

  // Avoid duplicate flags for same player in same tournament
  const existing = flags.find(
    (f) =>
      f.playerId === player.id &&
      f.tournamentId === tournamentId &&
      f.status !== "cleared",
  );
  if (existing) return existing;

  const newFlag: CheaterFlag = {
    id: `flag_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    playerId: player.id,
    playerName: player.name,
    ffId: player.ffId,
    reason,
    timestamp: Date.now(),
    tournamentId,
    tournamentName,
    kills,
    status: "flagged",
  };

  saveCheaterFlags([newFlag, ...flags]);
  return newFlag;
}

export function clearFlag(flagId: string): void {
  const flags = getCheaterFlags().map((f) =>
    f.id === flagId ? { ...f, status: "cleared" as const } : f,
  );
  saveCheaterFlags(flags);
}

export function banFlaggedPlayer(flagId: string): void {
  const flags = getCheaterFlags().map((f) =>
    f.id === flagId ? { ...f, status: "banned" as const } : f,
  );
  saveCheaterFlags(flags);
}

export function disqualifyTeam(
  teamId: string,
  teamName: string,
  tournamentId: string,
  tournamentName: string,
  reason = "Admin disqualification",
): void {
  const teams = getDisqualifiedTeams();

  // Avoid duplicate DQ for same team in same tournament
  const exists = teams.some(
    (t) => t.teamId === teamId && t.tournamentId === tournamentId,
  );
  if (exists) return;

  const entry: DisqualifiedTeam = {
    id: `dq_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    teamId,
    teamName,
    tournamentId,
    tournamentName,
    reason,
    timestamp: Date.now(),
  };
  saveDisqualifiedTeams([entry, ...teams]);
}

/**
 * Auto-flag logic triggered when admin submits scores.
 * Returns the flag if created, null otherwise.
 */
export function autoFlagOnScoreEntry(
  player: { id: string; name: string; ffId: string },
  tournamentId: string,
  tournamentName: string,
  kills: number,
): CheaterFlag | null {
  if (kills >= 15) {
    return flagPlayer(
      player,
      tournamentId,
      tournamentName,
      kills,
      `Single match mein ${kills} kills - Suspicious activity`,
    );
  }
  return null;
}

// ── React hooks ────────────────────────────────────────────────────────────────
// These are thin wrappers returning the data from localStorage for React usage

import { useCallback, useEffect, useState } from "react";

export function useGetCheaterFlags() {
  const [flags, setFlags] = useState<CheaterFlag[]>(() => getCheaterFlags());

  // Refresh when storage changes (e.g., after admin actions)
  const refresh = useCallback(() => {
    setFlags(getCheaterFlags());
  }, []);

  useEffect(() => {
    // Listen for storage changes from other tabs
    const handler = (e: StorageEvent) => {
      if (e.key === FLAGS_KEY) refresh();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [refresh]);

  return { flags, refresh };
}

export function useGetDisqualifiedTeams() {
  const [teams, setTeams] = useState<DisqualifiedTeam[]>(() =>
    getDisqualifiedTeams(),
  );

  const refresh = useCallback(() => {
    setTeams(getDisqualifiedTeams());
  }, []);

  return { teams, refresh };
}
