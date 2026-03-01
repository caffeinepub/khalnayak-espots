// Mock data for anti-cheat system until backend is ready

export type ReportReason = 'aimbot' | 'wallhack' | 'speedhack' | 'modmenu' | 'other';
export type ReportStatus = 'pending' | 'investigating' | 'banned' | 'cleared';
export type BanDuration = '1day' | '7days' | 'permanent';

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  suspectId: string;
  suspectName: string;
  suspectFreeFireId: string;
  tournamentId: string;
  tournamentName: string;
  matchId?: string;
  reason: ReportReason;
  description?: string;
  timestamp: number;
  status: ReportStatus;
  adminNotes?: string;
  reviewedBy?: string;
}

export interface Ban {
  id: string;
  playerId: string;
  playerName: string;
  reason: string;
  bannedBy: string;
  banDate: number;
  duration: BanDuration;
  expiryDate?: number;
  active: boolean;
}

export interface PlayerStats {
  userId: string;
  username: string;
  freeFireId: string;
  accountAge: number; // days
  totalMatches: number;
  totalKills: number;
  avgKills: number;
  topPlacements: number;
  reportsAgainst: number;
  banHistory: number;
  matchHistory: Array<{
    tournamentName: string;
    kills: number;
    placement: number;
    points: number;
    date: number;
  }>;
}

// Generate mock reports
export const mockReports: Report[] = [
  {
    id: "1",
    reporterId: "user-001",
    reporterName: "ShadowHunter",
    suspectId: "user-042",
    suspectName: "ProGamer9999",
    suspectFreeFireId: "FF12345678",
    tournamentId: "1",
    tournamentName: "Friday Night Showdown",
    reason: "aimbot",
    description: "Perfect headshots every time, unnatural aim tracking through walls",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
    status: "pending",
  },
  {
    id: "2",
    reporterId: "user-005",
    reporterName: "NightRider",
    suspectId: "user-042",
    suspectName: "ProGamer9999",
    suspectFreeFireId: "FF12345678",
    tournamentId: "1",
    tournamentName: "Friday Night Showdown",
    reason: "wallhack",
    description: "Could see players through walls, always knew exact positions",
    timestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
    status: "investigating",
  },
  {
    id: "3",
    reporterId: "user-012",
    reporterName: "ThunderBolt",
    suspectId: "user-089",
    suspectName: "SpeedDemon",
    suspectFreeFireId: "FF87654321",
    tournamentId: "2",
    tournamentName: "Sunday Legends Cup",
    reason: "speedhack",
    description: "Moving impossibly fast, faster than vehicles",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    status: "pending",
  },
  {
    id: "4",
    reporterId: "user-023",
    reporterName: "FireStorm",
    suspectId: "user-156",
    suspectName: "NoRecoilKing",
    suspectFreeFireId: "FF11223344",
    tournamentId: "1",
    tournamentName: "Friday Night Showdown",
    reason: "modmenu",
    description: "No recoil, unlimited ammo, instant reload",
    timestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    status: "banned",
    adminNotes: "Evidence confirmed. Multiple reports. Permanent ban issued.",
    reviewedBy: "Admin",
  },
  {
    id: "5",
    reporterId: "user-034",
    reporterName: "IceQueen",
    suspectId: "user-201",
    suspectName: "LegitPlayer",
    suspectFreeFireId: "FF99887766",
    tournamentId: "3",
    tournamentName: "Weekend Warriors",
    reason: "other",
    description: "Suspicious gameplay but not sure what exactly",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    status: "cleared",
    adminNotes: "Reviewed gameplay. No evidence of cheating. Cleared.",
    reviewedBy: "Admin",
  },
  {
    id: "6",
    reporterId: "user-045",
    reporterName: "BlazeMaster",
    suspectId: "user-178",
    suspectName: "HackerBoy",
    suspectFreeFireId: "FF55443322",
    tournamentId: "2",
    tournamentName: "Sunday Legends Cup",
    reason: "aimbot",
    description: "100% headshot accuracy, instant kills",
    timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
    status: "investigating",
    adminNotes: "Reviewing match replay and screenshots",
    reviewedBy: "Admin",
  },
  {
    id: "7",
    reporterId: "user-056",
    reporterName: "DragonSlayer",
    suspectId: "user-042",
    suspectName: "ProGamer9999",
    suspectFreeFireId: "FF12345678",
    tournamentId: "3",
    tournamentName: "Weekend Warriors",
    reason: "wallhack",
    description: "Third report on same player. Always pre-fires corners.",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    status: "investigating",
  },
  {
    id: "8",
    reporterId: "user-067",
    reporterName: "StormBringer",
    suspectId: "user-234",
    suspectName: "AutoClicker",
    suspectFreeFireId: "FF66778899",
    tournamentId: "1",
    tournamentName: "Friday Night Showdown",
    reason: "modmenu",
    description: "Using auto-clicker for pistols, firing too fast",
    timestamp: Date.now() - 1000 * 60 * 15, // 15 mins ago
    status: "pending",
  },
  {
    id: "9",
    reporterId: "user-078",
    reporterName: "PhantomKiller",
    suspectId: "user-267",
    suspectName: "FlyingHacker",
    suspectFreeFireId: "FF22334455",
    tournamentId: "2",
    tournamentName: "Sunday Legends Cup",
    reason: "other",
    description: "Player was flying in the air, clearly using mods",
    timestamp: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
    status: "banned",
    adminNotes: "Clear evidence of fly hack. Permanent ban.",
    reviewedBy: "Admin",
  },
  {
    id: "10",
    reporterId: "user-089",
    reporterName: "VenomSnake",
    suspectId: "user-298",
    suspectName: "WallSeeker",
    suspectFreeFireId: "FF77889900",
    tournamentId: "3",
    tournamentName: "Weekend Warriors",
    reason: "wallhack",
    description: "ESP hack confirmed, team admitted in chat",
    timestamp: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
    status: "banned",
    adminNotes: "Confession in chat. Evidence clear. 7-day ban.",
    reviewedBy: "Admin",
  },
];

// Generate mock bans
export const mockBans: Ban[] = [
  {
    id: "1",
    playerId: "user-156",
    playerName: "NoRecoilKing",
    reason: "Use of mod menu - no recoil, unlimited ammo",
    bannedBy: "Admin",
    banDate: Date.now() - 1000 * 60 * 60 * 5,
    duration: "permanent",
    active: true,
  },
  {
    id: "2",
    playerId: "user-267",
    playerName: "FlyingHacker",
    reason: "Flying hack - clear evidence",
    bannedBy: "Admin",
    banDate: Date.now() - 1000 * 60 * 60 * 6,
    duration: "permanent",
    active: true,
  },
  {
    id: "3",
    playerId: "user-298",
    playerName: "WallSeeker",
    reason: "ESP/Wallhack - admitted in chat",
    bannedBy: "Admin",
    banDate: Date.now() - 1000 * 60 * 60 * 12,
    duration: "7days",
    expiryDate: Date.now() + 1000 * 60 * 60 * 24 * 6, // 6 days from now
    active: true,
  },
  {
    id: "4",
    playerId: "user-042",
    playerName: "ProGamer9999",
    reason: "Multiple reports - aimbot investigation",
    bannedBy: "Admin",
    banDate: Date.now() - 1000 * 60 * 60 * 24 * 10,
    duration: "7days",
    expiryDate: Date.now() - 1000 * 60 * 60 * 24 * 3, // Expired 3 days ago
    active: false,
  },
  {
    id: "5",
    playerId: "user-389",
    playerName: "ToxicPlayer",
    reason: "Abusive behavior and harassment",
    bannedBy: "Admin",
    banDate: Date.now() - 1000 * 60 * 60 * 24,
    duration: "1day",
    expiryDate: Date.now() - 1000 * 60 * 60, // Expired 1 hour ago
    active: false,
  },
];

// Generate mock player stats
export const mockPlayerStats: { [userId: string]: PlayerStats } = {
  "user-042": {
    userId: "user-042",
    username: "ProGamer9999",
    freeFireId: "FF12345678",
    accountAge: 45, // days
    totalMatches: 23,
    totalKills: 287,
    avgKills: 12.5,
    topPlacements: 8,
    reportsAgainst: 3,
    banHistory: 1,
    matchHistory: [
      { tournamentName: "Friday Night Showdown", kills: 18, placement: 1, points: 30, date: Date.now() - 1000 * 60 * 60 },
      { tournamentName: "Weekend Warriors", kills: 15, placement: 2, points: 24, date: Date.now() - 1000 * 60 * 60 * 24 * 2 },
      { tournamentName: "Sunday Legends Cup", kills: 14, placement: 1, points: 26, date: Date.now() - 1000 * 60 * 60 * 24 * 5 },
      { tournamentName: "Midnight Battle", kills: 16, placement: 3, points: 24, date: Date.now() - 1000 * 60 * 60 * 24 * 7 },
      { tournamentName: "Friday Night Showdown", kills: 13, placement: 4, points: 20, date: Date.now() - 1000 * 60 * 60 * 24 * 10 },
      { tournamentName: "Weekend Warriors", kills: 12, placement: 5, points: 18, date: Date.now() - 1000 * 60 * 60 * 24 * 12 },
      { tournamentName: "Sunday Legends Cup", kills: 11, placement: 2, points: 20, date: Date.now() - 1000 * 60 * 60 * 24 * 15 },
      { tournamentName: "Midnight Battle", kills: 10, placement: 1, points: 22, date: Date.now() - 1000 * 60 * 60 * 24 * 20 },
      { tournamentName: "Friday Night Showdown", kills: 9, placement: 3, points: 17, date: Date.now() - 1000 * 60 * 60 * 24 * 25 },
      { tournamentName: "Weekend Warriors", kills: 8, placement: 6, points: 13, date: Date.now() - 1000 * 60 * 60 * 24 * 30 },
    ],
  },
  "user-089": {
    userId: "user-089",
    username: "SpeedDemon",
    freeFireId: "FF87654321",
    accountAge: 15,
    totalMatches: 8,
    totalKills: 76,
    avgKills: 9.5,
    topPlacements: 2,
    reportsAgainst: 1,
    banHistory: 0,
    matchHistory: [
      { tournamentName: "Sunday Legends Cup", kills: 12, placement: 2, points: 21, date: Date.now() - 1000 * 60 * 60 * 2 },
      { tournamentName: "Friday Night Showdown", kills: 10, placement: 5, points: 16, date: Date.now() - 1000 * 60 * 60 * 24 * 3 },
      { tournamentName: "Weekend Warriors", kills: 11, placement: 3, points: 19, date: Date.now() - 1000 * 60 * 60 * 24 * 7 },
      { tournamentName: "Midnight Battle", kills: 9, placement: 4, points: 16, date: Date.now() - 1000 * 60 * 60 * 24 * 10 },
      { tournamentName: "Sunday Legends Cup", kills: 8, placement: 7, points: 12, date: Date.now() - 1000 * 60 * 60 * 24 * 12 },
    ],
  },
  "user-156": {
    userId: "user-156",
    username: "NoRecoilKing",
    freeFireId: "FF11223344",
    accountAge: 7,
    totalMatches: 12,
    totalKills: 189,
    avgKills: 15.8,
    topPlacements: 9,
    reportsAgainst: 5,
    banHistory: 1,
    matchHistory: [
      { tournamentName: "Friday Night Showdown", kills: 22, placement: 1, points: 34, date: Date.now() - 1000 * 60 * 60 * 5 },
      { tournamentName: "Weekend Warriors", kills: 19, placement: 1, points: 31, date: Date.now() - 1000 * 60 * 60 * 24 },
      { tournamentName: "Sunday Legends Cup", kills: 21, placement: 1, points: 33, date: Date.now() - 1000 * 60 * 60 * 24 * 2 },
      { tournamentName: "Midnight Battle", kills: 18, placement: 1, points: 30, date: Date.now() - 1000 * 60 * 60 * 24 * 3 },
      { tournamentName: "Friday Night Showdown", kills: 20, placement: 1, points: 32, date: Date.now() - 1000 * 60 * 60 * 24 * 5 },
    ],
  },
  "user-201": {
    userId: "user-201",
    username: "LegitPlayer",
    freeFireId: "FF99887766",
    accountAge: 120,
    totalMatches: 45,
    totalKills: 234,
    avgKills: 5.2,
    topPlacements: 3,
    reportsAgainst: 1,
    banHistory: 0,
    matchHistory: [
      { tournamentName: "Weekend Warriors", kills: 7, placement: 8, points: 10, date: Date.now() - 1000 * 60 * 60 * 24 },
      { tournamentName: "Friday Night Showdown", kills: 5, placement: 12, points: 5, date: Date.now() - 1000 * 60 * 60 * 24 * 5 },
      { tournamentName: "Sunday Legends Cup", kills: 6, placement: 10, points: 7, date: Date.now() - 1000 * 60 * 60 * 24 * 10 },
      { tournamentName: "Midnight Battle", kills: 4, placement: 15, points: 4, date: Date.now() - 1000 * 60 * 60 * 24 * 15 },
      { tournamentName: "Weekend Warriors", kills: 5, placement: 9, points: 7, date: Date.now() - 1000 * 60 * 60 * 24 * 20 },
    ],
  },
};

// Helper functions
export function getReportsByStatus(status: ReportStatus): Report[] {
  return mockReports.filter((r) => r.status === status);
}

export function getReportsBySuspect(suspectId: string): Report[] {
  return mockReports.filter((r) => r.suspectId === suspectId);
}

export function getActiveBans(): Ban[] {
  return mockBans.filter((b) => b.active);
}

export function getUserBan(userId: string): Ban | null {
  const ban = mockBans.find((b) => b.playerId === userId && b.active);
  if (!ban) return null;
  
  // Check if ban has expired
  if (ban.expiryDate && ban.expiryDate < Date.now()) {
    ban.active = false;
    return null;
  }
  
  return ban;
}

export function getPlayerStats(userId: string): PlayerStats | null {
  return mockPlayerStats[userId] || null;
}

// Get report reason label
export function getReportReasonLabel(reason: ReportReason): string {
  switch (reason) {
    case "aimbot":
      return "Aimbot / Headshot Hack";
    case "wallhack":
      return "Wallhack / ESP";
    case "speedhack":
      return "Speed Hack";
    case "modmenu":
      return "Mod Menu / Other Hacks";
    case "other":
      return "Other";
    default:
      return reason;
  }
}

// Get report status badge variant
export function getReportStatusVariant(status: ReportStatus): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "banned":
      return "destructive";
    case "cleared":
      return "default";
    case "investigating":
      return "secondary";
    case "pending":
    default:
      return "outline";
  }
}
