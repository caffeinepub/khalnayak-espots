import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Player {
    freeFireId: string;
    name: string;
}
export interface LeaderboardEntry {
    placementRank: bigint;
    totalPoints: bigint;
    teamId: bigint;
    kills: bigint;
}
export type Time = bigint;
export interface Tournament {
    id: bigint;
    startTime: Time;
    status: TournamentStatus;
    tournamentType: TournamentType;
    name: string;
    createdBy: Principal;
    roomPassword?: string;
    maxTeams: bigint;
    entryFee: bigint;
    roomId?: string;
    prizePool: bigint;
}
export interface TeamRegistration {
    id: bigint;
    status: RegistrationStatus;
    teamId: bigint;
    tournamentId: bigint;
    captainId: Principal;
}
export interface PrizeDistribution {
    firstPlace: bigint;
    thirdPlace: bigint;
    mostKills: bigint;
    secondPlace: bigint;
    remaining: bigint;
    tournamentId: bigint;
    highKills: bigint;
}
export interface Transaction {
    id: bigint;
    transactionType: TransactionType;
    userId: Principal;
    description: string;
    timestamp: Time;
    amount: bigint;
}
export interface Wallet {
    balance: bigint;
    transactions: Array<Transaction>;
}
export interface NotificationRecord {
    id: bigint;
    userId: Principal;
    notificationType: NotificationType;
    read: boolean;
    message: string;
    timestamp: Time;
}
export interface DepositRequest {
    id: bigint;
    status: RegistrationStatus;
    userId: Principal;
    timestamp: Time;
    amount: bigint;
}
export interface WithdrawalRequest {
    id: bigint;
    status: RegistrationStatus;
    userId: Principal;
    timestamp: Time;
    amount: bigint;
}
export interface TournamentScore {
    id: bigint;
    placementRank: bigint;
    totalPoints: bigint;
    kills: bigint;
}
export interface UserProfile {
    referralCode: string;
    username: string;
    role: Variant_admin_player;
    banned: boolean;
    email: string;
}
export interface Team {
    id: bigint;
    members: Array<Player>;
    substitutes?: Array<Player>;
    name: string;
    captain: Principal;
}
export enum NotificationType {
    prizeCredited = "prizeCredited",
    scoresUpdated = "scoresUpdated",
    tournamentStarting = "tournamentStarting",
    registrationConfirmed = "registrationConfirmed"
}
export enum RegistrationStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum TournamentStatus {
    upcoming = "upcoming",
    completed = "completed",
    ongoing = "ongoing"
}
export enum TournamentType {
    battleground = "battleground",
    custom4v4 = "custom4v4"
}
export enum TransactionType {
    deposit = "deposit",
    withdrawal = "withdrawal",
    bonus = "bonus",
    entryFee = "entryFee",
    prize = "prize"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_admin_player {
    admin = "admin",
    player = "player"
}
export interface backendInterface {
    adjustUserBalance(userId: Principal, amount: bigint): Promise<void>;
    approveDeposit(depositId: bigint): Promise<void>;
    approveTeamRegistration(registrationId: bigint): Promise<void>;
    approveWithdrawal(withdrawalId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    banUser(userId: Principal): Promise<void>;
    createTournament(name: string, tournamentType: TournamentType, entryFee: bigint, maxTeams: bigint, startTime: Time): Promise<bigint>;
    distributePrizes(tournamentId: bigint): Promise<void>;
    getAllNotifications(): Promise<Array<[Principal, Array<NotificationRecord>]>>;
    getAllTransactions(): Promise<Array<Transaction>>;
    getAllUsers(): Promise<Array<UserProfile>>;
    getCallerDepositRequests(): Promise<Array<DepositRequest>>;
    getCallerNotifications(): Promise<Array<NotificationRecord>>;
    getCallerStats(): Promise<{
        totalWinnings: bigint;
        tournamentsParticipated: bigint;
    }>;
    getCallerTeamRegistrations(): Promise<Array<TeamRegistration>>;
    getCallerTransactions(): Promise<Array<Transaction>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCallerWallet(): Promise<Wallet | null>;
    getCallerWithdrawalRequests(): Promise<Array<WithdrawalRequest>>;
    getDepositRequests(): Promise<Array<DepositRequest>>;
    getFutureTournamentStartTimes(): Promise<Array<Time>>;
    getLeaderboard(tournamentId: bigint): Promise<Array<LeaderboardEntry>>;
    getPlatformStats(): Promise<{
        totalPrizeDistributed: bigint;
        totalPlayers: bigint;
        totalTournaments: bigint;
    }>;
    getPrizeDistributions(): Promise<Array<PrizeDistribution>>;
    getTeamRegistrations(): Promise<Array<TeamRegistration>>;
    getTeams(): Promise<Array<Team>>;
    getTournamentById(tournamentId: bigint): Promise<Tournament | null>;
    getTournamentScores(): Promise<Array<TournamentScore>>;
    getTournaments(): Promise<Array<Tournament>>;
    getTransactionsByType(transactionType: TransactionType): Promise<Array<Transaction>>;
    getTransactionsByUserId(userId: Principal): Promise<Array<Transaction>>;
    getUserBalances(): Promise<Array<bigint>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserStats(userId: Principal): Promise<{
        totalWinnings: bigint;
        tournamentsParticipated: bigint;
    }>;
    getWalletByUserId(userId: Principal): Promise<Wallet | null>;
    getWallets(): Promise<Array<Wallet>>;
    getWithdrawalRequests(): Promise<Array<WithdrawalRequest>>;
    isCallerAdmin(): Promise<boolean>;
    markNotificationAsRead(notificationId: bigint): Promise<void>;
    registerTeam(tournamentId: bigint, teamName: string, members: Array<Player>, substitutes: Array<Player> | null): Promise<bigint>;
    rejectTeamRegistration(registrationId: bigint): Promise<void>;
    rejectWithdrawal(withdrawalId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    unbanUser(userId: Principal): Promise<void>;
    updateTeamScore(tournamentId: bigint, teamId: bigint, kills: bigint, placementRank: bigint): Promise<void>;
    updateTournamentRoomCredentials(tournamentId: bigint, roomId: string, roomPassword: string): Promise<void>;
    updateTournamentStatus(tournamentId: bigint, status: TournamentStatus): Promise<void>;
    userDeposit(amount: bigint): Promise<DepositRequest>;
    userWithdraw(amount: bigint): Promise<WithdrawalRequest>;
}
