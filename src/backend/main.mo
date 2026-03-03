import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type TournamentType = { #battleground; #custom4v4 };
  type TournamentStatus = { #upcoming; #ongoing; #completed };
  type RegistrationStatus = { #pending; #approved; #rejected };
  type TransactionType = { #deposit; #withdrawal; #entryFee; #prize; #bonus };
  type NotificationType = { #registrationConfirmed; #tournamentStarting; #scoresUpdated; #prizeCredited };

  var nextTransactionId = 1;
  var nextTournamentId = 1;
  var nextTeamId = 1;
  var nextRegistrationId = 1;
  var nextScoreId = 1;
  var nextDepositRequestId = 1;
  var nextWithdrawalRequestId = 1;
  var nextNotificationId = 1;

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

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  func checkUserNotBanned(caller : Principal) : () {
    switch (internal.userProfiles.get(caller)) {
      case (?profile) {
        if (profile.banned) {
          Runtime.trap("Unauthorized: User is banned");
        };
      };
      case (null) {};
    };
  };

  func addTransaction(userId : Principal, transactionType : TransactionType, amount : Nat, description : Text) : () {
    let transactionId = nextTransactionId;
    let transaction : Transaction = {
      id = transactionId;
      userId;
      transactionType;
      amount;
      description;
      timestamp = Time.now();
    };
    internal.transactions.add(transactionId, transaction);
    nextTransactionId += 1;
    // Update wallet transactions
    switch (internal.wallets.get(userId)) {
      case (?wallet) {
        let updatedTransactions = wallet.transactions.concat([transaction]);
        let updatedWallet = {
          wallet with transactions = updatedTransactions;
        };
        internal.wallets.add(userId, updatedWallet);
      };
      case (null) {};
    };
  };

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
    if (not profile.banned) {
      switch (internal.wallets.get(caller)) {
        case (null) {
          let wallet : Wallet = {
            balance = 0;
            transactions = [] : [Transaction];
          };
          internal.wallets.add(caller, wallet);
        };
        case (_) {};
      };
    };
    internal.userProfiles.add(caller, profile);
  };

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
    let existingProfile = internal.userProfiles.get(userId);
    switch (existingProfile) {
      case (?profile) {
        let bannedProfile = {
          profile with banned = true;
        };
        internal.userProfiles.add(userId, bannedProfile);
      };
      case (null) {
        Runtime.trap("Profile with ID '" # debug_show (userId) # "' does not exist.");
      };
    };
  };

  public shared ({ caller }) func unbanUser(userId : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can unban users");
    };
    let existingProfile = internal.userProfiles.get(userId);
    switch (existingProfile) {
      case (?profile) {
        let unbannedProfile = {
          profile with banned = false;
        };
        internal.userProfiles.add(userId, unbannedProfile);
      };
      case (null) {
        Runtime.trap("Profile with ID '" # debug_show (userId) # "' does not exist.");
      };
    };
  };

  public query ({ caller }) func getWalletByUserId(userId : Principal) : async ?Wallet {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own wallet");
    };
    internal.wallets.get(userId);
  };

  public query ({ caller }) func getCallerWallet() : async ?Wallet {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view wallet");
    };
    internal.wallets.get(caller);
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
    startTime : Time.Time,
  ) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create tournaments");
    };
    let tournamentId = nextTournamentId;
    let tournament : Tournament = {
      id = tournamentId;
      name;
      tournamentType;
      entryFee;
      maxTeams;
      startTime;
      status = #upcoming;
      roomId = null;
      roomPassword = null;
      prizePool = 0;
      createdBy = caller;
    };
    internal.tournaments.add(tournamentId, tournament);
    nextTournamentId += 1;
    tournamentId;
  };

  public shared ({ caller }) func updateTournamentStatus(tournamentId : Nat, status : TournamentStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update tournament status");
    };
    let existingTournament = internal.tournaments.get(tournamentId);
    switch (existingTournament) {
      case (?tournament) {
        let updatedTournament = {
          tournament with status;
        };
        internal.tournaments.add(tournamentId, updatedTournament);
      };
      case (null) {
        Runtime.trap("Tournament with ID '" # debug_show (tournamentId) # "' does not exist.");
      };
    };
  };

  public shared ({ caller }) func updateTournamentRoomCredentials(
    tournamentId : Nat,
    roomId : Text,
    roomPassword : Text,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update room credentials");
    };
    let existingTournament = internal.tournaments.get(tournamentId);
    switch (existingTournament) {
      case (?tournament) {
        let updatedTournament = {
          tournament with roomId = ?roomId;
          roomPassword = ?roomPassword;
        };
        internal.tournaments.add(tournamentId, updatedTournament);
      };
      case (null) {
        Runtime.trap("Tournament with ID '" # debug_show (tournamentId) # "' does not exist.");
      };
    };
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
    substitutes : ?[Player],
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register teams");
    };
    // Check if user is banned
    checkUserNotBanned(caller);
    // Get tournament to check entry fee
    let tournament = switch (internal.tournaments.get(tournamentId)) {
      case (?t) { t };
      case (null) {
        Runtime.trap("Tournament with ID '" # debug_show (tournamentId) # "' does not exist.");
      };
    };
    // Check wallet balance and deduct entry fee
    let wallet = switch (internal.wallets.get(caller)) {
      case (?w) { w };
      case (null) {
        Runtime.trap("Wallet not found. Please create a profile first.");
      };
    };
    if (wallet.balance < tournament.entryFee) {
      Runtime.trap("Insufficient balance. Required: " # debug_show (tournament.entryFee) # ", Available: " # debug_show (wallet.balance));
    };
    // Deduct entry fee
    let newBalance : Nat = wallet.balance - tournament.entryFee;
    let updatedWallet = {
      wallet with balance = newBalance;
    };
    internal.wallets.add(caller, updatedWallet);
    // Add transaction
    addTransaction(caller, #entryFee, tournament.entryFee, "Entry fee for tournament: " # tournament.name);
    // Create team
    let teamId = nextTeamId;
    let team : Team = {
      id = teamId;
      name = teamName;
      members;
      substitutes;
      captain = caller;
    };
    internal.teams.add(teamId, team);
    nextTeamId += 1;
    // Create registration
    let registrationId = nextRegistrationId;
    let registration : TeamRegistration = {
      id = registrationId;
      tournamentId;
      teamId;
      captainId = caller;
      status = #pending;
    };
    internal.teamsRegistrations.add(registrationId, registration);
    nextRegistrationId += 1;
    // Update tournament prize pool
    let updatedTournament = {
      tournament with prizePool = tournament.prizePool + tournament.entryFee;
    };
    internal.tournaments.add(tournamentId, updatedTournament);
    teamId;
  };

  public query ({ caller }) func getTeamRegistrations() : async [TeamRegistration] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all team registrations");
    };
    internal.teamsRegistrations.values().toArray();
  };

  public query ({ caller }) func getRegistrationsByTournament(tournamentId : Nat) : async [TeamRegistration] {
    // Public - anyone can view tournament registrations
    internal.teamsRegistrations.values().toArray().filter(func(r : TeamRegistration) : Bool { r.tournamentId == tournamentId });
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
    let existingRegistration = internal.teamsRegistrations.get(registrationId);
    switch (existingRegistration) {
      case (?registration) {
        let approvedRegistration = {
          registration with status = #approved;
        };
        internal.teamsRegistrations.add(registrationId, approvedRegistration);
      };
      case (null) {
        Runtime.trap("Registration with ID '" # debug_show (registrationId) # "' does not exist.");
      };
    };
  };

  public shared ({ caller }) func rejectTeamRegistration(registrationId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject team registrations");
    };
    let existingRegistration = internal.teamsRegistrations.get(registrationId);
    switch (existingRegistration) {
      case (?registration) {
        let rejectedRegistration = {
          registration with status = #rejected;
        };
        internal.teamsRegistrations.add(registrationId, rejectedRegistration);
      };
      case (null) {
        Runtime.trap("Registration with ID '" # debug_show (registrationId) # "' does not exist.");
      };
    };
  };

  // Scoring System
  public query ({ caller }) func getTournamentScores() : async [TournamentScore] {
    // Public - anyone can view scores
    internal.tournamentScores.values().toArray();
  };

  public query ({ caller }) func getLeaderboard(tournamentId : Nat) : async [LeaderboardEntry] {
    // Public - anyone can view leaderboard
    (internal.tournamentScores.values().toArray()).map(
      func(score) {
        {
          teamId = score.id;
          kills = score.kills;
          placementRank = score.placementRank;
          totalPoints = score.totalPoints;
        };
      }
    );
  };

  public shared ({ caller }) func updateTeamScore(
    tournamentId : Nat,
    teamId : Nat,
    kills : Nat,
    placementRank : Nat,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update team scores");
    };
    let scoreId = nextScoreId;
    let totalPoints = kills * 10 + placementRank;
    let score : TournamentScore = {
      id = scoreId;
      kills;
      placementRank;
      totalPoints;
    };
    internal.tournamentScores.add(scoreId, score);
    nextScoreId += 1;
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
    Runtime.trap("Function not implemented. Please contact the Khalnayak support instead.");
  };

  public shared ({ caller }) func userDeposit(amount : Nat) : async DepositRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can make deposits");
    };
    // Check if user is banned
    checkUserNotBanned(caller);
    let depositRequestId = nextDepositRequestId;
    let depositRequest : DepositRequest = {
      id = depositRequestId;
      userId = caller;
      amount;
      status = #pending;
      timestamp = Time.now();
    };
    internal.deposits.add(depositRequestId, depositRequest);
    nextDepositRequestId += 1;
    depositRequest;
  };

  public shared ({ caller }) func userWithdraw(amount : Nat) : async WithdrawalRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can request withdrawals");
    };
    // Check if user is banned
    checkUserNotBanned(caller);
    // Check wallet balance
    let wallet = switch (internal.wallets.get(caller)) {
      case (?w) { w };
      case (null) {
        Runtime.trap("Wallet not found. Please create a profile first.");
      };
    };
    if (wallet.balance < amount) {
      Runtime.trap("Insufficient balance. Available: " # debug_show (wallet.balance) # ", Requested: " # debug_show (amount));
    };
    let withdrawalRequestId = nextWithdrawalRequestId;
    let withdrawalRequest : WithdrawalRequest = {
      id = withdrawalRequestId;
      userId = caller;
      amount;
      status = #pending;
      timestamp = Time.now();
    };
    internal.withdrawals.add(withdrawalRequestId, withdrawalRequest);
    nextWithdrawalRequestId += 1;
    withdrawalRequest;
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
    let existingWithdrawal = internal.withdrawals.get(withdrawalId);
    switch (existingWithdrawal) {
      case (?withdrawal) {
        // Check wallet balance
        let wallet = switch (internal.wallets.get(withdrawal.userId)) {
          case (?w) { w };
          case (null) {
            Runtime.trap("Wallet not found for user.");
          };
        };
        if (wallet.balance < withdrawal.amount) {
          Runtime.trap("Insufficient balance in user wallet.");
        };
        // Deduct from wallet
        let newBalance : Nat = wallet.balance - withdrawal.amount;
        let updatedWallet = {
          wallet with balance = newBalance;
        };
        internal.wallets.add(withdrawal.userId, updatedWallet);
        // Add transaction
        addTransaction(withdrawal.userId, #withdrawal, withdrawal.amount, "Withdrawal approved");
        // Update withdrawal status
        let approvedWithdrawal = {
          withdrawal with status = #approved;
        };
        internal.withdrawals.add(withdrawalId, approvedWithdrawal);
      };
      case (null) {
        Runtime.trap("Withdrawal with ID '" # debug_show (withdrawalId) # "' does not exist.");
      };
    };
  };

  public shared ({ caller }) func rejectWithdrawal(withdrawalId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject withdrawals");
    };
    let existingWithdrawal = internal.withdrawals.get(withdrawalId);
    switch (existingWithdrawal) {
      case (?withdrawal) {
        let rejectedWithdrawal = {
          withdrawal with status = #rejected;
        };
        internal.withdrawals.add(withdrawalId, rejectedWithdrawal);
      };
      case (null) {
        Runtime.trap("Withdrawal with ID '" # debug_show (withdrawalId) # "' does not exist.");
      };
    };
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
    let existingDeposit = internal.deposits.get(depositId);
    switch (existingDeposit) {
      case (?deposit) {
        // Get wallet
        let wallet = switch (internal.wallets.get(deposit.userId)) {
          case (?w) { w };
          case (null) {
            Runtime.trap("Wallet not found for user.");
          };
        };
        // Credit wallet
        let newBalance = wallet.balance + deposit.amount;
        let updatedWallet = {
          wallet with balance = newBalance;
        };
        internal.wallets.add(deposit.userId, updatedWallet);
        // Add transaction
        addTransaction(deposit.userId, #deposit, deposit.amount, "Deposit approved");
        // Update deposit status
        let approvedDeposit = {
          deposit with status = #approved;
        };
        internal.deposits.add(depositId, approvedDeposit);
      };
      case (null) {
        Runtime.trap("Deposit with ID '" # debug_show (depositId) # "' does not exist.");
      };
    };
  };

  public shared ({ caller }) func rejectDeposit(depositId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject deposits");
    };
    let existingDeposit = internal.deposits.get(depositId);
    switch (existingDeposit) {
      case (?deposit) {
        let rejectedDeposit = {
          deposit with status = #rejected;
        };
        internal.deposits.add(depositId, rejectedDeposit);
      };
      case (null) {
        Runtime.trap("Deposit with ID '" # debug_show (depositId) # "' does not exist.");
      };
    };
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

  public query ({ caller }) func getFutureTournamentStartTimes() : async [Time.Time] {
    // Public - anyone can view future tournament times
    internal.tournaments.values().toArray()
      .filter(func(t : Tournament) : Bool { t.startTime > Time.now() })
      .map(func(t : Tournament) : Time.Time { t.startTime });
  };

  public query ({ caller }) func getTransactionsByUserId(userId : Principal) : async [Transaction] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own transactions");
    };
    internal.transactions.values().toArray().filter(func(t : Transaction) : Bool { t.userId == userId });
  };

  public query ({ caller }) func getUserBalances() : async [Nat] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all user balances");
    };
    internal.wallets.values().toArray().map(func(w : Wallet) : Nat { w.balance });
  };

  public shared ({ caller }) func adjustUserBalance(userId : Principal, amount : Int) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can adjust user balances");
    };
    let wallet = switch (internal.wallets.get(userId)) {
      case (?w) { w };
      case (null) {
        Runtime.trap("Wallet not found for user.");
      };
    };
    let newBalance : Int = wallet.balance + amount;
    if (newBalance < 0) {
      Runtime.trap("Cannot adjust balance below zero.");
    };
    let updatedWallet = {
      wallet with balance = Int.abs(newBalance);
    };
    internal.wallets.add(userId, updatedWallet);
    // Add transaction
    if (amount > 0) {
      addTransaction(userId, #bonus, Int.abs(amount), "Balance adjustment (credit)");
    } else if (amount < 0) {
      addTransaction(userId, #withdrawal, Int.abs(amount), "Balance adjustment (debit)");
    };
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
};
