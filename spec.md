# Khalnayak Espots

## Current State

The application has a complete frontend UI with:
- 10 pages: Home, Tournaments, Tournament Details, Wallet, Profile, Rules, Support, Admin Panel
- Mock data for tournaments, users, and leaderboards
- Dark gaming theme with neon accents
- Wallet system UI with transaction history
- Team registration forms
- Real-time leaderboard displays (UI only)
- Admin panel with 7 management tabs

Backend has not been generated yet - all data is currently mock/local state.

## Requested Changes (Diff)

### Add
- **Backend Motoko canister** with full data persistence
  - User management (registration, authentication, profiles)
  - Tournament CRUD operations (create, read, update, delete)
  - Team registration system with Free Fire IDs
  - Wallet system (deposits, withdrawals, balances, transactions)
  - Real-time leaderboard scoring and updates
  - Admin operations (approve entries, update scores, manage users)
  - Payment processing and prize distribution logic
- **Frontend-backend integration**
  - Replace all mock data with backend API calls
  - Connect authentication to Internet Identity
  - Wire wallet operations to backend balance management
  - Connect tournament registration to backend persistence
  - Integrate leaderboard updates with backend scoring API
  - Connect admin panel to backend management endpoints

### Modify
- Frontend components to use backend API calls instead of local state
- Authentication flow to use Internet Identity
- Wallet page to fetch and update backend balances
- Tournament pages to load data from backend
- Leaderboard to poll backend for real-time updates
- Admin panel to perform actual backend operations

### Remove
- Mock data arrays and local state management
- Simulated wallet transactions
- Fake tournament data
- Hardcoded leaderboard entries

## Implementation Plan

1. **Generate Motoko backend** with functional requirements:
   - User system with profiles, wallet balances, transaction history
   - Tournament management with two modes (Battle Ground 48-player, 4vs4 Custom)
   - Team registration with 4 players + substitute
   - Wallet operations (deposit, withdraw, transfer for entry fees)
   - Scoring system (kills + placement points)
   - Prize distribution (30/70 split, winner percentages)
   - Admin operations (create tournaments, update scores, approve teams, ban users)
   - Real-time leaderboard data access
   - Referral system tracking

2. **Frontend integration** (delegate to frontend subagent):
   - Integrate Internet Identity authentication
   - Connect all pages to backend APIs from `backend.d.ts`
   - Replace mock data with API calls
   - Add loading states and error handling
   - Implement real-time polling for leaderboards
   - Wire admin panel to backend management functions
   - Add wallet deposit/withdrawal integration (UPI/PhonePe placeholder UI)
   - Connect tournament registration to backend with validation
   - Implement prize auto-distribution on score updates

3. **Validation**:
   - TypeScript compilation
   - ESLint checks
   - Build verification
   - Test key user flows (registration, tournament entry, leaderboard updates)

## UX Notes

- Use Internet Identity for secure blockchain authentication (replaces email/password)
- Show loading spinners during backend calls
- Display friendly error messages if backend operations fail
- Keep leaderboard auto-refresh every 10 seconds for real-time feel
- Admin panel should show success/error toasts after operations
- Wallet transactions should reflect immediately in UI after backend confirmation
- Tournament registration should validate Free Fire IDs before submission
