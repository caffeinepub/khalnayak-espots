import { c as createLucideIcon, r as reactExports } from "./index-CDAki4Zg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
const FLAGS_KEY = "kn_cheat_flags";
const DQ_TEAMS_KEY = "kn_disqualified_teams";
function getCheaterFlags() {
  try {
    const raw = localStorage.getItem(FLAGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}
function getDisqualifiedTeams() {
  try {
    const raw = localStorage.getItem(DQ_TEAMS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}
function saveCheaterFlags(flags) {
  try {
    localStorage.setItem(FLAGS_KEY, JSON.stringify(flags));
  } catch {
  }
}
function saveDisqualifiedTeams(teams) {
  try {
    localStorage.setItem(DQ_TEAMS_KEY, JSON.stringify(teams));
  } catch {
  }
}
function flagPlayer(player, tournamentId, tournamentName, kills, reason) {
  const flags = getCheaterFlags();
  const existing = flags.find(
    (f) => f.playerId === player.id && f.tournamentId === tournamentId && f.status !== "cleared"
  );
  if (existing) return existing;
  const newFlag = {
    id: `flag_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    playerId: player.id,
    playerName: player.name,
    ffId: player.ffId,
    reason,
    timestamp: Date.now(),
    tournamentId,
    tournamentName,
    kills,
    status: "flagged"
  };
  saveCheaterFlags([newFlag, ...flags]);
  return newFlag;
}
function clearFlag(flagId) {
  const flags = getCheaterFlags().map(
    (f) => f.id === flagId ? { ...f, status: "cleared" } : f
  );
  saveCheaterFlags(flags);
}
function banFlaggedPlayer(flagId) {
  const flags = getCheaterFlags().map(
    (f) => f.id === flagId ? { ...f, status: "banned" } : f
  );
  saveCheaterFlags(flags);
}
function disqualifyTeam(teamId, teamName, tournamentId, tournamentName, reason = "Admin disqualification") {
  const teams = getDisqualifiedTeams();
  const exists = teams.some(
    (t) => t.teamId === teamId && t.tournamentId === tournamentId
  );
  if (exists) return;
  const entry = {
    id: `dq_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    teamId,
    teamName,
    tournamentId,
    tournamentName,
    reason,
    timestamp: Date.now()
  };
  saveDisqualifiedTeams([entry, ...teams]);
}
function autoFlagOnScoreEntry(player, tournamentId, tournamentName, kills) {
  if (kills >= 15) {
    return flagPlayer(
      player,
      tournamentId,
      tournamentName,
      kills,
      `Single match mein ${kills} kills - Suspicious activity`
    );
  }
  return null;
}
function useGetCheaterFlags() {
  const [flags, setFlags] = reactExports.useState(() => getCheaterFlags());
  const refresh = reactExports.useCallback(() => {
    setFlags(getCheaterFlags());
  }, []);
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === FLAGS_KEY) refresh();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [refresh]);
  return { flags, refresh };
}
function useGetDisqualifiedTeams() {
  const [teams, setTeams] = reactExports.useState(
    () => getDisqualifiedTeams()
  );
  const refresh = reactExports.useCallback(() => {
    setTeams(getDisqualifiedTeams());
  }, []);
  return { teams, refresh };
}
export {
  ShieldAlert as S,
  useGetDisqualifiedTeams as a,
  autoFlagOnScoreEntry as b,
  banFlaggedPlayer as c,
  disqualifyTeam as d,
  clearFlag as e,
  useGetCheaterFlags as u
};
