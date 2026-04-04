# Khalnayak Esports

## Current State
- Free tournament join count reads from localStorage only (`freeJoinCount_{id}`) — not synced with Firestore
- Paid tournament progress bar uses a hardcoded fake percentage (30/75/100%) and shows `0/{maxTeams}` statically
- Registration status (✓ Registered) uses localStorage only
- Admin Manage Matches shows all tournament cards fully expanded at once — becomes very long with many tournaments
- Home page has no My Matches inline section
- MyMatchesPage exists in menu and works fine

## Requested Changes (Diff)

### Add
- Real-time joined count for free tournaments: fetch count from Firestore `freeRegistrations` collection filtered by `tournamentId`, display as "X/Total teams joined"; update after registration success
- Real-time joined count for paid tournaments: fetch count from Firestore `paid_registrations` collection filtered by `tournamentId`, display as "X/Total teams joined"
- Show "Full" label when count reaches maxTeams/maxPlayers
- My Matches mini-section on Home page: shows user's registered matches (free from localStorage, paid from useGetCallerTeamRegistrations), each card with tournament name, date, status, Room ID if LIVE, Result if DONE
- Accordion/collapsible design for Admin Panel Manage Matches: each tournament card collapsed by default showing only Name | Mode | Status | Date; click to expand full details

### Modify
- FreeTournamentCard: fetch count from Firestore on mount and after registration; also keep localStorage as fallback/optimistic update
- TournamentCard (paid): fetch real count from `paid_registrations` on mount instead of fake percentage
- Admin ManageMatchesTab: wrap each DynamicPaidTournamentAdminCard and free tournament card in accordion
- HomePage: add MyMatchesPreview section between HeroSection and UpcomingTournamentsSection

### Remove
- Hardcoded fake percentage in paid tournament progress bar

## Implementation Plan
1. Add `getFreeRegistrationCount(tournamentId)` helper in firestore.ts using `getDocs` with filter
2. Add `getPaidRegistrationCount(tournamentId)` helper similarly
3. Update FreeTournamentCard to fetch Firestore count on mount + listen for `freeTournamentUpdated` event to refetch
4. Update TournamentCard (paid) to fetch Firestore count on mount
5. Add MyMatchesPreview component to HomePage between Hero and Upcoming sections
6. Convert Admin ManageMatchesTab cards to accordion (collapsible) design with expand/collapse toggle
