import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type {
  Tournament,
  Team,
  TeamRegistration,
  Wallet,
  Transaction,
  UserProfile,
  NotificationRecord,
  LeaderboardEntry,
  TournamentScore,
  Player,
  TournamentType,
  TournamentStatus,
  DepositRequest,
  WithdrawalRequest,
  PrizeDistribution,
  UserRole,
} from "../backend";
import { Principal } from "@icp-sdk/core/principal";

// Platform Stats
export function useGetPlatformStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      if (!actor) return { totalPlayers: BigInt(0), totalTournaments: BigInt(0), totalPrizeDistributed: BigInt(0) };
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
      return actor.getTournaments();
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
      return actor.getTournamentById(tournamentId);
    },
    enabled: !!actor && !isFetching && tournamentId !== null,
  });
}

// Leaderboard
export function useGetLeaderboard(tournamentId: bigint | null, autoRefresh = false) {
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

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
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
      if (!actor) return { tournamentsParticipated: BigInt(0), totalWinnings: BigInt(0) };
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
      if (!actor) throw new Error("Actor not initialized");
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
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
      if (!actor) throw new Error("Actor not initialized");
      console.log("Registering team:", { tournamentId, teamName, members, substitutes });
      const result = await actor.registerTeam(tournamentId, teamName, members, substitutes);
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
      queryClient.invalidateQueries({ queryKey: ["tournament", variables.tournamentId.toString()] });
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
      if (!actor) throw new Error("Actor not initialized");
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
      if (!actor) throw new Error("Actor not initialized");
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
      if (!actor) throw new Error("Actor not initialized");
      await actor.markNotificationAsRead(notificationId);
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
      if (!actor) throw new Error("Actor not initialized");
      return actor.createTournament(name, tournamentType, entryFee, maxTeams, startTime);
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
    mutationFn: async ({ tournamentId, status }: { tournamentId: bigint; status: TournamentStatus }) => {
      if (!actor) throw new Error("Actor not initialized");
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
      if (!actor) throw new Error("Actor not initialized");
      await actor.updateTournamentRoomCredentials(tournamentId, roomId, roomPassword);
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
      if (!actor) throw new Error("Actor not initialized");
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
      if (!actor) throw new Error("Actor not initialized");
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
      if (!actor) throw new Error("Actor not initialized");
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
      if (!actor) throw new Error("Actor not initialized");
      await actor.approveDeposit(depositId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["depositRequests"] });
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
    },
  });
}

// Approve Withdrawal
export function useApproveWithdrawal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (withdrawalId: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
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
      if (!actor) throw new Error("Actor not initialized");
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
      if (!actor) throw new Error("Actor not initialized");
      await actor.distributePrizes(tournamentId);
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
      if (!actor) throw new Error("Actor not initialized");
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
      if (!actor) throw new Error("Actor not initialized");
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
    mutationFn: async ({ userId, amount }: { userId: Principal; amount: bigint }) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.adjustUserBalance(userId, amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
    },
  });
}
