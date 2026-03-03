// Format bigint to readable number
export function formatNumber(value: bigint): string {
  return value.toLocaleString();
}

// Format bigint currency (assuming it's in smallest unit, e.g., paise)
export function formatCurrency(value: bigint): string {
  const amount = Number(value) / 100; // Convert paise to rupees
  return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Format timestamp (bigint nanoseconds) to readable date
export function formatDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000); // Convert nanoseconds to milliseconds
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Format timestamp to date and time
export function formatDateTime(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Format relative time (e.g., "2 hours ago", "in 3 days")
export function formatRelativeTime(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
  if (diffDays < 0)
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
  if (diffHours > 0) return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
  if (diffHours < 0)
    return `${Math.abs(diffHours)} hour${Math.abs(diffHours) > 1 ? "s" : ""} ago`;
  if (diffMins > 0) return `in ${diffMins} minute${diffMins > 1 ? "s" : ""}`;
  if (diffMins < 0)
    return `${Math.abs(diffMins)} minute${Math.abs(diffMins) > 1 ? "s" : ""} ago`;
  return "just now";
}

// Calculate time remaining
export function getTimeRemaining(targetTime: bigint) {
  const target = new Date(Number(targetTime) / 1_000_000);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: false };
}

// Truncate principal ID for display
export function truncatePrincipal(
  principal: string,
  startChars = 5,
  endChars = 3,
): string {
  if (principal.length <= startChars + endChars) return principal;
  return `${principal.slice(0, startChars)}...${principal.slice(-endChars)}`;
}

// Get tournament type label
export function getTournamentTypeLabel(type: string): string {
  switch (type) {
    case "battleground":
      return "Battle Ground (48 Players)";
    case "custom4v4":
      return "4vs4 Custom";
    case "custom1v1":
      return "1vs1 Custom";
    case "custom2v2":
      return "2vs2 Custom";
    default:
      return type;
  }
}

// Get tournament player count info
export function getTournamentPlayerInfo(type: string): {
  teams: number;
  playersPerTeam: number;
  totalPlayers: number;
  description: string;
} {
  switch (type) {
    case "battleground":
      return {
        teams: 12,
        playersPerTeam: 4,
        totalPlayers: 48,
        description: "48 Players, 12 Teams of 4",
      };
    case "custom4v4":
      return {
        teams: 2,
        playersPerTeam: 4,
        totalPlayers: 8,
        description: "4 vs 4 Team Match",
      };
    case "custom1v1":
      return {
        teams: 2,
        playersPerTeam: 1,
        totalPlayers: 2,
        description: "1 vs 1 Solo Match",
      };
    case "custom2v2":
      return {
        teams: 2,
        playersPerTeam: 2,
        totalPlayers: 4,
        description: "2 vs 2 Team Match",
      };
    default:
      return {
        teams: 2,
        playersPerTeam: 4,
        totalPlayers: 8,
        description: "Custom Match",
      };
  }
}

// Get tournament commission and prize info
export function getTournamentPrizeInfo(type: string): {
  commissionPct: number;
  prizePct: number;
  prizeStructure: string;
  prizeBreakdown: { label: string; pct: number; note?: string }[];
} {
  switch (type) {
    case "battleground":
      return {
        commissionPct: 40,
        prizePct: 60,
        prizeStructure:
          "1st: 40%, 2nd: 30%, 3rd: 20%, Most Kills (6+ kills): 10%",
        prizeBreakdown: [
          { label: "1st Place", pct: 40 },
          { label: "2nd Place", pct: 30 },
          { label: "3rd Place", pct: 20 },
          { label: "Most Kills (6+ kills)", pct: 10, note: "Sirf 1 player ko" },
        ],
      };
    case "custom4v4":
      return {
        commissionPct: 15,
        prizePct: 85,
        prizeStructure:
          "Winning team ke 4 players mein 25%-25%-25%-25% equally",
        prizeBreakdown: [
          {
            label: "Winning Team (4 players)",
            pct: 100,
            note: "25% each player",
          },
        ],
      };
    case "custom1v1":
      return {
        commissionPct: 18,
        prizePct: 82,
        prizeStructure: "Winner takes 100% of prize pool",
        prizeBreakdown: [{ label: "Winner", pct: 100 }],
      };
    case "custom2v2":
      return {
        commissionPct: 25,
        prizePct: 75,
        prizeStructure: "Winning team ke 2 players mein 50%-50% equally",
        prizeBreakdown: [
          {
            label: "Winning Team (2 players)",
            pct: 100,
            note: "50% each player",
          },
        ],
      };
    default:
      return {
        commissionPct: 40,
        prizePct: 60,
        prizeStructure: "Winner takes prize pool",
        prizeBreakdown: [],
      };
  }
}

// Get tournament status label
export function getTournamentStatusLabel(status: string): string {
  switch (status) {
    case "upcoming":
      return "Upcoming";
    case "ongoing":
      return "Live";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

// Get registration status label
export function getRegistrationStatusLabel(status: string): string {
  switch (status) {
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}

// Get transaction type label
export function getTransactionTypeLabel(type: string): string {
  switch (type) {
    case "deposit":
      return "Deposit";
    case "withdrawal":
      return "Withdrawal";
    case "entryFee":
      return "Entry Fee";
    case "prize":
      return "Prize Won";
    case "bonus":
      return "Bonus";
    default:
      return type;
  }
}

// Calculate placement points
export function getPlacementPoints(rank: number): number {
  const pointsMap: { [key: number]: number } = {
    1: 12,
    2: 9,
    3: 8,
    4: 7,
    5: 6,
    6: 5,
    7: 4,
    8: 3,
    9: 2,
    10: 1,
  };
  return pointsMap[rank] || 0;
}

// Generate referral code
export function generateReferralCode(username: string): string {
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${username.substring(0, 4).toUpperCase()}${random}`;
}

// Encode extended tournament type into name for backend compatibility
// Backend only supports 'battleground' and 'custom4v4'
// custom1v1 and custom2v2 are stored as custom4v4 with a name suffix
export function encodeTournamentName(name: string, type: string): string {
  if (type === "custom1v1" || type === "custom2v2") {
    return `${name}[T:${type}]`;
  }
  return name;
}

// Decode the real tournament type and clean name from a stored tournament
export function decodeTournament(tournament: {
  name: string;
  tournamentType: unknown;
}): { name: string; tournamentType: string } {
  const match = tournament.name.match(/\[T:(custom1v1|custom2v2)\]$/);
  if (match) {
    return {
      name: tournament.name.replace(/\[T:(custom1v1|custom2v2)\]$/, "").trim(),
      tournamentType: match[1],
    };
  }
  // Normalize backend variant object to string key
  const type = tournament.tournamentType;
  if (typeof type === "object" && type !== null) {
    const key = Object.keys(type as Record<string, unknown>)[0];
    return { name: tournament.name, tournamentType: key || "battleground" };
  }
  return { name: tournament.name, tournamentType: String(type) };
}
