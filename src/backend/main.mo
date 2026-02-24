import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type TournamentType = { #battleground; #custom4v4 };
  type TournamentStatus = { #upcoming; #ongoing; #completed };
  type RegistrationStatus = { #pending; #approved; #rejected };
  type TransactionType = { #deposit; #withdrawal; #entryFee; #prize; #bonus };
  type NotificationType = { #registrationConfirmed; #tournamentStarting; #scoresUpdated; #prizeCredited };

  public type UserProfile = {
    username : Text;
    email : Text;
    role : { #player; #admin };
    banned : Bool;
    referralCode : Text;
  };

  type Wallet = {
    balance : Nat;
    transactions : [Transaction];
  };

  type Transaction = {
    id : Nat;
    userId : Principal;
    transactionType : TransactionType;
    amount : Nat;
    description : Text;
    timestamp : Time.Time;
  };

  type Tournament = {
    id : Nat;
    name : Text;
    tournamentType : TournamentType;
    entryFee : Nat;
    maxTeams : Nat;
    startTime : Time.Time;
    status : TournamentStatus;
    roomId : ?Text;
    roomPassword : ?Text;
    prizePool : Nat;
    createdBy : Principal;
  };

  type Team = {
    id : Nat;
    name : Text;
    members : [Player];
    substitutes : ?[Player];
    captain : Principal;
  };

  type Player = {
    name : Text;
    freeFireId : Text;
  };

  type TeamRegistration = {
    id : Nat;
    tournamentId : Nat;
    teamId : Nat;
    captainId : Principal;
    status : RegistrationStatus;
  };

  type TournamentScore = {
    id : Nat;
    kills : Nat;
    placementRank : Nat;
    totalPoints : Nat;
  };

  type LeaderboardEntry = {
    teamId : Nat;
    kills : Nat;
    placementRank : Nat;
    totalPoints : Nat;
  };

  type PrizeDistribution = {
    tournamentId : Nat;
    firstPlace : Nat;
    secondPlace : Nat;
    thirdPlace : Nat;
    mostKills : Nat;
    highKills : Nat;
    remaining : Nat;
  };

  type DepositRequest = {
    id : Nat;
    userId : Principal;
    amount : Nat;
    status : { #pending; #approved; #rejected };
    timestamp : Time.Time;
  };

  type WithdrawalRequest = {
    id : Nat;
    userId : Principal;
    amount : Nat;
    status : { #pending; #approved; #rejected };
    timestamp : Time.Time;
  };

  type NotificationRecord = {
    id : Nat;
    userId : Principal;
    notificationType : NotificationType;
    message : Text;
    timestamp : Time.Time;
    read : Bool;
  };

  type Internal = {
    transactions : Map.Map<Nat, Transaction>;
    userProfiles : Map.Map<Principal, UserProfile>;
    notifications : Map.Map<Principal, [NotificationRecord]>;
    tournaments : Map.Map<Nat, Tournament>;
    teams : Map.Map<Nat, Team>;
    tournamentScores : Map.Map<Nat, TournamentScore>;
    withdrawals : Map.Map<Nat, WithdrawalRequest>;
    deposits : Map.Map<Nat, DepositRequest>;
    teamsRegistrations : Map.Map<Nat, TeamRegistration>;
    wallets : Map.Map<Principal, Wallet>;
  };

  let internal : Internal = {
    transactions = Map.empty<Nat, Transaction>();
    userProfiles = Map.empty<Principal, UserProfile>();
    notifications = Map.empty<Principal, [NotificationRecord]>();
    tournaments = Map.empty<Nat, Tournament>();
    teams = Map.empty<Nat, Team>();
    tournamentScores = Map.empty<Nat, TournamentScore>();
    withdrawals = Map.empty<Nat, WithdrawalRequest>();
    deposits = Map.empty<Nat, DepositRequest>();
    teamsRegistrations = Map.empty<Nat, TeamRegistration>();
    wallets = Map.empty<Principal, Wallet>();
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management (Required by instructions)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    internal.userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    internal.userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    internal.userProfiles.add(caller, profile);
  };

  // Transaction Management
  public query ({ caller }) func getAllTransactions() : async [Transaction] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all transactions");
    };
    internal.transactions.values().toArray();
  };

  public query ({ caller }) func getCallerTransactions() : async [Transaction] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view transactions");
    };
    internal.transactions.values().toArray().filter(func(t : Transaction) : Bool { t.userId == caller });
  };

  public query ({ caller }) func getTransactionsByUserId(userId : Principal) : async [Transaction] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own transactions");
    };
    internal.transactions.values().toArray().filter(func(t : Transaction) : Bool { t.userId == userId });
  };

  // Wallet Management
  public shared ({ caller }) func userDeposit(amount : Nat) : async DepositRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can make deposits");
    };
    ignore amount;
    Runtime.trap("Unhandled deposit");
  };

  public shared ({ caller }) func userWithdraw(amount : Nat) : async WithdrawalRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can request withdrawals");
    };
    ignore amount;
    Runtime.trap("Unhandled withdrawal");
  };

  public query ({ caller }) func getCallerWallet() : async ?Wallet {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view wallet");
    };
    internal.wallets.get(caller);
  };

  public query ({ caller }) func getWalletByUserId(userId : Principal) : async ?Wallet {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own wallet");
    };
    internal.wallets.get(userId);
  };

  public query ({ caller }) func getWithdrawalRequests() : async [WithdrawalRequest] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all withdrawal requests");
    };
    internal.withdrawals.values().toArray();
  };

  public query ({ caller }) func getCallerWithdrawalRequests() : async [WithdrawalRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view withdrawal requests");
    };
    internal.withdrawals.values().toArray().filter(func(w : WithdrawalRequest) : Bool { w.userId == caller });
  };

  public shared ({ caller }) func approveWithdrawal(withdrawalId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve withdrawals");
    };
    ignore withdrawalId;
    Runtime.trap("Unhandled approval");
  };

  public shared ({ caller }) func rejectWithdrawal(withdrawalId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject withdrawals");
    };
    ignore withdrawalId;
    Runtime.trap("Unhandled rejection");
  };

  public query ({ caller }) func getDepositRequests() : async [DepositRequest] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all deposit requests");
    };
    internal.deposits.values().toArray();
  };

  public query ({ caller }) func getCallerDepositRequests() : async [DepositRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view deposit requests");
    };
    internal.deposits.values().toArray().filter(func(d : DepositRequest) : Bool { d.userId == caller });
  };

  public shared ({ caller }) func approveDeposit(depositId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve deposits");
    };
    ignore depositId;
    Runtime.trap("Unhandled approval");
  };

  public query ({ caller }) func getWallets() : async [Wallet] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all wallets");
    };
    internal.wallets.values().toArray();
  };

  public query ({ caller }) func getTransactionsByType(transactionType : TransactionType) : async [Transaction] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can filter transactions by type");
    };
    internal.transactions.values().toArray().filter(func(t : Transaction) : Bool { t.transactionType == transactionType });
  };

  public query ({ caller }) func getUserBalances() : async [Nat] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all user balances");
    };
    internal.wallets.values().toArray().map(func(w : Wallet) : Nat { w.balance });
  };

  // User Management
  public query ({ caller }) func getAllUsers() : async [UserProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };
    internal.userProfiles.values().toArray();
  };

  public shared ({ caller }) func banUser(userId : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can ban users");
    };
    ignore userId;
    Runtime.trap("Unhandled ban");
  };

  public shared ({ caller }) func unbanUser(userId : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can unban users");
    };
    ignore userId;
    Runtime.trap("Unhandled unban");
  };

  // Tournament Management
  public query ({ caller }) func getTournaments() : async [Tournament] {
    // Public - anyone can view tournaments
    internal.tournaments.values().toArray();
  };

  public query ({ caller }) func getTournamentById(tournamentId : Nat) : async ?Tournament {
    // Public - anyone can view tournament details
    internal.tournaments.get(tournamentId);
  };

  public shared ({ caller }) func createTournament(
    name : Text,
    tournamentType : TournamentType,
    entryFee : Nat,
    maxTeams : Nat,
    startTime : Time.Time
  ) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create tournaments");
    };
    ignore (name, tournamentType, entryFee, maxTeams, startTime);
    Runtime.trap("Unhandled tournament creation");
  };

  public shared ({ caller }) func updateTournamentStatus(tournamentId : Nat, status : TournamentStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update tournament status");
    };
    ignore (tournamentId, status);
    Runtime.trap("Unhandled status update");
  };

  public shared ({ caller }) func updateTournamentRoomCredentials(
    tournamentId : Nat,
    roomId : Text,
    roomPassword : Text
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update room credentials");
    };
    ignore (tournamentId, roomId, roomPassword);
    Runtime.trap("Unhandled credentials update");
  };

  // Team Management
  public query ({ caller }) func getTeams() : async [Team] {
    // Public - anyone can view teams
    internal.teams.values().toArray();
  };

  public shared ({ caller }) func registerTeam(
    tournamentId : Nat,
    teamName : Text,
    members : [Player],
    substitutes : ?[Player]
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register teams");
    };
    ignore (tournamentId, teamName, members, substitutes);
    Runtime.trap("Unhandled team registration");
  };

  public query ({ caller }) func getTeamRegistrations() : async [TeamRegistration] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all team registrations");
    };
    internal.teamsRegistrations.values().toArray();
  };

  public query ({ caller }) func getCallerTeamRegistrations() : async [TeamRegistration] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view team registrations");
    };
    internal.teamsRegistrations.values().toArray().filter(func(r : TeamRegistration) : Bool { r.captainId == caller });
  };

  public shared ({ caller }) func approveTeamRegistration(registrationId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve team registrations");
    };
    ignore registrationId;
    Runtime.trap("Unhandled approval");
  };

  public shared ({ caller }) func rejectTeamRegistration(registrationId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject team registrations");
    };
    ignore registrationId;
    Runtime.trap("Unhandled rejection");
  };

  // Scoring System
  public query ({ caller }) func getTournamentScores() : async [TournamentScore] {
    // Public - anyone can view scores
    internal.tournamentScores.values().toArray();
  };

  public query ({ caller }) func getLeaderboard(tournamentId : Nat) : async [LeaderboardEntry] {
    // Public - anyone can view leaderboard
    ignore tournamentId;
    ([] : [LeaderboardEntry]);
  };

  public shared ({ caller }) func updateTeamScore(
    tournamentId : Nat,
    teamId : Nat,
    kills : Nat,
    placementRank : Nat
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update team scores");
    };
    ignore (tournamentId, teamId, kills, placementRank);
    Runtime.trap("Unhandled score update");
  };

  // Prize Distribution
  public query ({ caller }) func getPrizeDistributions() : async [PrizeDistribution] {
    // Public - anyone can view prize distributions
    ([] : [PrizeDistribution]);
  };

  public shared ({ caller }) func distributePrizes(tournamentId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can distribute prizes");
    };
    ignore tournamentId;
    Runtime.trap("Unhandled prize distribution");
  };

  // Notifications
  public query ({ caller }) func getCallerNotifications() : async [NotificationRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view notifications");
    };
    switch (internal.notifications.get(caller)) {
      case (?notifications) { notifications };
      case null { [] };
    };
  };

  public query ({ caller }) func getAllNotifications() : async [(Principal, [NotificationRecord])] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all notifications");
    };
    let result = List.empty<(Principal, [NotificationRecord])>();
    for ((userId, notifications) in internal.notifications.entries()) {
      result.add((userId, notifications));
    };
    result.toArray();
  };

  public shared ({ caller }) func markNotificationAsRead(notificationId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can mark notifications as read");
    };
    ignore notificationId;
    Runtime.trap("Unhandled notification update");
  };

  // Statistics
  public query ({ caller }) func getPlatformStats() : async {
    totalPlayers : Nat;
    totalTournaments : Nat;
    totalPrizeDistributed : Nat;
  } {
    // Public - anyone can view platform stats
    {
      totalPlayers = internal.userProfiles.size();
      totalTournaments = internal.tournaments.size();
      totalPrizeDistributed = 0;
    };
  };

  public query ({ caller }) func getCallerStats() : async {
    tournamentsParticipated : Nat;
    totalWinnings : Nat;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view stats");
    };
    {
      tournamentsParticipated = 0;
      totalWinnings = 0;
    };
  };

  public query ({ caller }) func getUserStats(userId : Principal) : async {
    tournamentsParticipated : Nat;
    totalWinnings : Nat;
  } {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own stats");
    };
    {
      tournamentsParticipated = 0;
      totalWinnings = 0;
    };
  };

  // Admin Wallet Operations
  public shared ({ caller }) func adjustUserBalance(userId : Principal, amount : Int) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can adjust user balances");
    };
    ignore (userId, amount);
    Runtime.trap("Unhandled balance adjustment");
  };

  // Utility Functions
  public query ({ caller }) func getFutureTournamentStartTimes() : async [Time.Time] {
    // Public - anyone can view future tournament times
    internal.tournaments.values().toArray()
      .filter(func(t : Tournament) : Bool { t.startTime > Time.now() })
      .map(func(t : Tournament) : Time.Time { t.startTime });
  };
};
