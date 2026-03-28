import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type {
  DepositRequest,
  LeaderboardEntry,
  NotificationRecord,
  Player,
  PrizeDistribution,
  Team,
  TeamRegistration,
  Tournament,
  TournamentScore,
  TournamentStatus,
  TournamentType,
  Transaction,
  UserProfile,
  UserRole,
  Variant_admin_player,
  Wallet,
  WithdrawalRequest,
} from "../backend";
import { useUnifiedAuth } from "../context/UnifiedAuthContext";
import { decodeTournament, encodeTournamentName } from "../utils/format";
import { useActor } from "./useActor";
import { useOtpAuth } from "./useOtpAuth";

// Platform Stats
export function useGetPlatformStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      if (!actor)
        return {
          totalPlayers: BigInt(0),
          totalTournaments: BigInt(0),
          totalPrizeDistributed: BigInt(0),
        };
      return actor.getPlatformStats();
    },
    enabled: !!actor && !isFetching,
  });
}

// Tournaments
export function useGetTournaments() {
  const { actor, isFetching } = useActor();
  return useQuery<Tournament[]>({
    queryKey: ["tournaments"],
    queryFn: async () => {
      if (!actor) return [];
      const tournaments = await actor.getTournaments();
      return tournaments.map((t) => {
        const decoded = decodeTournament(t);
        return {
          ...t,
          name: decoded.name,
          tournamentType: decoded.tournamentType as TournamentType,
        };
      });
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTournamentById(tournamentId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Tournament | null>({
    queryKey: ["tournament", tournamentId?.toString()],
    queryFn: async () => {
      if (!actor || !tournamentId) return null;
      const result = await actor.getTournamentById(tournamentId);
      if (!result) return null;
      // getTournamentById returns Tournament | null
      const t = result as Tournament;
      const decoded = decodeTournament(t);
      return {
        ...t,
        name: decoded.name,
        tournamentType: decoded.tournamentType as TournamentType,
      };
    },
    enabled: !!actor && !isFetching && tournamentId !== null,
  });
}

// Leaderboard
export function useGetLeaderboard(
  tournamentId: bigint | null,
  autoRefresh = false,
) {
  const { actor, isFetching } = useActor();
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard", tournamentId?.toString()],
    queryFn: async () => {
      if (!actor || !tournamentId) return [];
      return actor.getLeaderboard(tournamentId);
    },
    enabled: !!actor && !isFetching && tournamentId !== null,
    refetchInterval: autoRefresh ? 10000 : false, // Auto-refresh every 10 seconds if enabled
  });
}

// Teams
export function useGetTeams() {
  const { actor, isFetching } = useActor();
  return useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeams();
    },
    enabled: !!actor && !isFetching,
  });
}

// Team Registrations
export function useGetTeamRegistrations() {
  const { actor, isFetching } = useActor();
  return useQuery<TeamRegistration[]>({
    queryKey: ["teamRegistrations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeamRegistrations();
    },
    enabled: !!actor && !isFetching,
  });
}

// User Profile
export function useGetCallerUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserProfile(principal: Principal | null) {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile", principal?.toString()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getUserProfile(principal);
    },
    enabled: !!actor && !isFetching && principal !== null,
  });
}

// User Role
export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return "guest" as UserRole;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

const ADMIN_EMAILS = ["bindishwam512@gmail.com"];

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  const { firebaseEmail } = useUnifiedAuth();
  const isGoogleAdmin = firebaseEmail
    ? ADMIN_EMAILS.includes(firebaseEmail)
    : false;

  return useQuery<boolean>({
    queryKey: ["isCallerAdmin", firebaseEmail],
    queryFn: async () => {
      if (isGoogleAdmin) return true;
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !isFetching,
    ...(isGoogleAdmin ? { initialData: true } : {}),
  });
}

// Wallet
export function useGetCallerWallet() {
  const { actor, isFetching } = useActor();
  return useQuery<Wallet | null>({
    queryKey: ["callerWallet"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerWallet();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

// Transactions
export function useGetCallerTransactions() {
  const { actor, isFetching } = useActor();
  return useQuery<Transaction[]>({
    queryKey: ["callerTransactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerTransactions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllTransactions() {
  const { actor, isFetching } = useActor();
  return useQuery<Transaction[]>({
    queryKey: ["allTransactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTransactions();
    },
    enabled: !!actor && !isFetching,
  });
}

// Notifications
export function useGetCallerNotifications() {
  const { actor, isFetching } = useActor();
  return useQuery<NotificationRecord[]>({
    queryKey: ["callerNotifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerNotifications();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000, // Poll every 30 seconds
  });
}

// User Stats
export function useGetCallerStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["callerStats"],
    queryFn: async () => {
      if (!actor)
        return { tournamentsParticipated: BigInt(0), totalWinnings: BigInt(0) };
      return actor.getCallerStats();
    },
    enabled: !!actor && !isFetching,
  });
}

// My Registrations
export function useGetCallerTeamRegistrations() {
  const { actor, isFetching } = useActor();
  return useQuery<TeamRegistration[]>({
    queryKey: ["callerTeamRegistrations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerTeamRegistrations();
    },
    enabled: !!actor && !isFetching,
  });
}

// Deposit Requests
export function useGetCallerDepositRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<DepositRequest[]>({
    queryKey: ["callerDepositRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerDepositRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDepositRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<DepositRequest[]>({
    queryKey: ["depositRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDepositRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

// Withdrawal Requests
export function useGetCallerWithdrawalRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<WithdrawalRequest[]>({
    queryKey: ["callerWithdrawalRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerWithdrawalRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetWithdrawalRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<WithdrawalRequest[]>({
    queryKey: ["withdrawalRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWithdrawalRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

// Admin - All Users
export function useGetAllUsers() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile[]>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

// Tournament Scores
export function useGetTournamentScores() {
  const { actor, isFetching } = useActor();
  return useQuery<TournamentScore[]>({
    queryKey: ["tournamentScores"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTournamentScores();
    },
    enabled: !!actor && !isFetching,
  });
}

// Prize Distributions
export function useGetPrizeDistributions() {
  const { actor, isFetching } = useActor();
  return useQuery<PrizeDistribution[]>({
    queryKey: ["prizeDistributions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrizeDistributions();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mutations

// Save/Update User Profile
export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
    },
  });
}

// Register Team
export function useRegisterTeam() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tournamentId,
      teamName,
      members,
      substitutes,
    }: {
      tournamentId: bigint;
      teamName: string;
      members: Player[];
      substitutes: Player[] | null;
    }) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      console.log("Registering team:", {
        tournamentId,
        teamName,
        members,
        substitutes,
      });
      const result = await actor.registerTeam(
        tournamentId,
        teamName,
        members,
        substitutes,
      );
      console.log("Registration successful, team ID:", result);
      return result;
    },
    onSuccess: (_, variables) => {
      // Invalidate all relevant queries to update UI
      queryClient.invalidateQueries({ queryKey: ["callerTeamRegistrations"] });
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
      queryClient.invalidateQueries({ queryKey: ["teamRegistrations"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      queryClient.invalidateQueries({
        queryKey: ["tournament", variables.tournamentId.toString()],
      });
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
}

// Deposit
export function useDeposit() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (amount: bigint) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      return actor.userDeposit(amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
      queryClient.invalidateQueries({ queryKey: ["callerDepositRequests"] });
    },
  });
}

// Withdraw
export function useWithdraw() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (amount: bigint) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      return actor.userWithdraw(amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
      queryClient.invalidateQueries({ queryKey: ["callerWithdrawalRequests"] });
    },
  });
}

// Mark notification as read
export function useMarkNotificationAsRead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notificationId: bigint) => {
      if (!actor) return; // silently skip if actor not ready
      try {
        await actor.markNotificationAsRead(notificationId);
      } catch {
        // Backend may not support this yet — silently ignore
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerNotifications"] });
    },
  });
}

// Admin Mutations

// Create Tournament
export function useCreateTournament() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      tournamentType,
      entryFee,
      maxTeams,
      startTime,
    }: {
      name: string;
      tournamentType: TournamentType;
      entryFee: bigint;
      maxTeams: bigint;
      startTime: bigint;
    }) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );

      // Get string key from tournamentType (may be a plain string or enum value)
      const typeStr =
        typeof tournamentType === "string"
          ? tournamentType
          : (Object.keys(
              tournamentType as unknown as Record<string, unknown>,
            )[0] ?? "battleground");

      // For custom1v1/custom2v2: encode real type in tournament name, send custom4v4 to backend
      // (backend only supports 'battleground' and 'custom4v4')
      let backendType: TournamentType;
      let encodedName: string;

      if (typeStr === "custom1v1" || typeStr === "custom2v2") {
        backendType = "custom4v4" as TournamentType;
        encodedName = encodeTournamentName(name, typeStr);
      } else if (typeStr === "battleground") {
        backendType = "battleground" as TournamentType;
        encodedName = name;
      } else {
        backendType = "custom4v4" as TournamentType;
        encodedName = name;
      }

      return actor.createTournament(
        encodedName,
        backendType,
        entryFee,
        maxTeams,
        startTime,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      queryClient.invalidateQueries({ queryKey: ["platformStats"] });
    },
  });
}

// Update Tournament Status
export function useUpdateTournamentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tournamentId,
      status,
    }: { tournamentId: bigint; status: TournamentStatus }) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.updateTournamentStatus(tournamentId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      queryClient.invalidateQueries({ queryKey: ["tournament"] });
    },
  });
}

// Update Tournament Room Credentials
export function useUpdateTournamentRoomCredentials() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tournamentId,
      roomId,
      roomPassword,
    }: {
      tournamentId: bigint;
      roomId: string;
      roomPassword: string;
    }) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.updateTournamentRoomCredentials(
        tournamentId,
        roomId,
        roomPassword,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournament"] });
    },
  });
}

// Approve Team Registration
export function useApproveTeamRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (registrationId: bigint) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.approveTeamRegistration(registrationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamRegistrations"] });
    },
  });
}

// Reject Team Registration
export function useRejectTeamRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (registrationId: bigint) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.rejectTeamRegistration(registrationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamRegistrations"] });
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
    },
  });
}

// Update Team Score
export function useUpdateTeamScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tournamentId,
      teamId,
      kills,
      placementRank,
    }: {
      tournamentId: bigint;
      teamId: bigint;
      kills: bigint;
      placementRank: bigint;
    }) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.updateTeamScore(tournamentId, teamId, kills, placementRank);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["tournamentScores"] });
    },
  });
}

// Approve Deposit
export function useApproveDeposit() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (depositId: bigint) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.approveDeposit(depositId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["depositRequests"] });
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
    },
  });
}

// Reject Deposit
export function useRejectDeposit() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (depositId: bigint) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.rejectDeposit(depositId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["depositRequests"] });
    },
  });
}

// Approve Withdrawal
export function useApproveWithdrawal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (withdrawalId: bigint) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.approveWithdrawal(withdrawalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdrawalRequests"] });
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
    },
  });
}

// Reject Withdrawal
export function useRejectWithdrawal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (withdrawalId: bigint) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.rejectWithdrawal(withdrawalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdrawalRequests"] });
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
    },
  });
}

// Distribute Prizes
export function useDistributePrizes() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tournamentId: bigint) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      try {
        await actor.distributePrizes(tournamentId);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        // Surface only user-meaningful errors; swallow the "not implemented" trap
        if (
          msg.includes("not implemented") ||
          msg.includes("contact") ||
          msg.includes("Unhandled")
        ) {
          throw new Error(
            "Prize distribution is currently being set up. Please contact support.",
          );
        }
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prizeDistributions"] });
      queryClient.invalidateQueries({ queryKey: ["platformStats"] });
    },
  });
}

// Ban User
export function useBanUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: Principal) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.banUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
}

// Unban User
export function useUnbanUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: Principal) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.unbanUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
}

// Adjust User Balance (Admin)
export function useAdjustUserBalance() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      amount,
    }: { userId: Principal; amount: bigint }) => {
      if (!actor)
        throw new Error(
          "Connection not ready. Please wait a moment and try again.",
        );
      await actor.adjustUserBalance(userId, amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
    },
  });
}

// Auto-setup profile + wallet for new users on first login
export function useAutoSetupProfile() {
  const { actor, isFetching } = useActor();
  const { identity } = useOtpAuth();
  const queryClient = useQueryClient();
  // Prevent duplicate calls across re-renders
  const hasAttempted = useRef(false);

  useEffect(() => {
    if (!actor || isFetching || !identity || hasAttempted.current) return;

    const principal = identity.getPrincipal();
    if (principal.isAnonymous()) return;

    hasAttempted.current = true;

    void (async () => {
      try {
        const existingProfile = await actor.getCallerUserProfile();
        if (existingProfile !== null) {
          // Profile already exists – nothing to do
          return;
        }

        // Generate a human-friendly default username
        const shortId = principal.toString().slice(0, 8);
        const username = `Player_${shortId}`;

        // Generate a random 6-char alphanumeric referral code
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let referralCode = "";
        for (let i = 0; i < 6; i++) {
          referralCode += chars.charAt(
            Math.floor(Math.random() * chars.length),
          );
        }

        const newProfile: UserProfile = {
          username,
          email: "",
          role: "player" as Variant_admin_player,
          banned: false,
          referralCode,
        };

        await actor.saveCallerUserProfile(newProfile);

        // Refresh profile and wallet queries
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["callerProfile"] }),
          queryClient.invalidateQueries({ queryKey: ["callerWallet"] }),
        ]);
      } catch (err) {
        // Non-critical: log but don't surface to user
        console.error(
          "[useAutoSetupProfile] Failed to auto-create profile:",
          err,
        );
        // Allow retry on next mount
        hasAttempted.current = false;
      }
    })();
  }, [actor, isFetching, identity, queryClient]);
}
