# Khalnayak Esports

## Current State
- React + Firebase (Firestore) app
- HomePage has TopBar with Bell icon (shows toast), Hero section, My Matches preview, Upcoming Tournaments
- AdminPage has all tournament management (SET ROOM ID, START MATCH, SUBMIT RESULTS, CANCEL MATCH, UPDATE MATCH TIME)
- Firestore collections: users, transactions, freeRegistrations, paid_registrations, tournaments
- NotificationPoller exists but uses backend (ICP) notifications — NOT Firestore
- No IST live clock anywhere
- No Firestore notification system
- Bell icon in TopBar just shows a toast, no real notification panel

## Requested Changes (Diff)

### Add
1. **IST Live Clock** — component that shows current IST time updating every second, format: "Thursday, 04 April 2026 — 08:45:30 PM", with green pulsing LIVE badge. Position: below TopBar / in HeroSection on HomePage.
2. **Tournament card countdown timer** — on each tournament card in TournamentsPage/HomePage, show countdown to match start time for UPCOMING tournaments.
3. **Firestore notifications collection** — new `notifications` collection with fields: userId, title, message, type (roomDetails/matchLive/resultDeclared/timeUpdated/matchCancelled), tournamentId, tournamentName, read (bool), createdAt.
4. **Firestore notification helpers** in `src/frontend/src/lib/firestore.ts` — addNotification(), getUserNotifications(), markNotificationRead(), markAllRead().
5. **useNotifications hook** — fetches notifications from Firestore for logged-in user (real-time listener), returns {notifications, unreadCount, markRead, markAllRead}.
6. **Notification panel UI** — bell icon click pe slide-down dropdown panel with list of notifications. Bell shows red badge with unread count.
7. **Admin triggers** — in AdminPage, after each action (SET ROOM ID & PASSWORD, START MATCH, SUBMIT RESULTS, CANCEL MATCH, UPDATE MATCH TIME), send Firestore notifications to all registered users of that tournament.

### Modify
- `src/frontend/src/pages/HomePage.tsx` — Add `LiveClock` component between TopBar and HeroSection.
- `src/frontend/src/pages/HomePage.tsx` — TopBar: replace simple Bell toast with NotificationBell component (badge + panel).
- `src/frontend/src/lib/firestore.ts` — Add notification CRUD functions.
- `src/frontend/src/pages/AdminPage.tsx` — Add notification triggers to 5 admin actions (free + paid tournaments both).

### Remove
- Nothing removed

## Implementation Plan
1. Add notification Firestore helpers to `firestore.ts`
2. Create `useNotifications.ts` hook with real-time Firestore listener
3. Create `LiveClock.tsx` component (IST, updates every second, LIVE badge)
4. Create `NotificationBell.tsx` component (bell + unread badge + dropdown panel)
5. Update `HomePage.tsx` — add LiveClock, replace bell with NotificationBell
6. Update `AdminPage.tsx` — add notification calls after each of 5 admin actions for both free and paid tournaments
7. Add countdown display to tournament cards in TournamentsPage where startTime is available
