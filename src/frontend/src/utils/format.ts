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
  if (diffDays < 0) return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
  if (diffHours > 0) return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
  if (diffHours < 0) return `${Math.abs(diffHours)} hour${Math.abs(diffHours) > 1 ? "s" : ""} ago`;
  if (diffMins > 0) return `in ${diffMins} minute${diffMins > 1 ? "s" : ""}`;
  if (diffMins < 0) return `${Math.abs(diffMins)} minute${Math.abs(diffMins) > 1 ? "s" : ""} ago`;
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
export function truncatePrincipal(principal: string, startChars = 5, endChars = 3): string {
  if (principal.length <= startChars + endChars) return principal;
  return `${principal.slice(0, startChars)}...${principal.slice(-endChars)}`;
}

// Get tournament type label
export function getTournamentTypeLabel(type: string): string {
  switch (type) {
    case "battleground":
      return "Battle Ground (48 Players)";
    case "custom4v4":
      return "4v4 Custom Match";
    default:
      return type;
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
