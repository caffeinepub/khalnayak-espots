# Khalnayak Esports — Tournament Button Logic + Readability + Scoreboard

## Current State
- Free tournament join button always shows regardless of LIVE/DONE status (no state-based hiding)
- Paid tournament DONE state shows "View Details" gray link — no Result button
- No LIVE state disables registration — user can still try to join while match is ongoing
- FreeMatchCard in MyMatchesPage labels "📊 RESULTS" but actually opens Room ID dialog
- Admin Scores tab has one combined dropdown for both free and paid tournaments (not separated)
- Text readability issues: registration form labels, room details popup numbers, inputs have dark background

## Requested Changes (Diff)

### Add
- Result button on tournament cards (free + paid) when status is DONE/completed
- Result button navigates to result page showing: player name, kills, rank, prize
- Separate Free Scoreboard tab and Paid Scoreboard tab in Admin Scores section
- Each scoreboard: tournament dropdown (filtered by type), player name, kills, rank, prize auto-calc

### Modify
- Free tournament card: UPCOMING/LIVE → show "Watch Ad & Join" button; DONE → hide join button, show "Result" button
- Free tournament card LIVE state: hide/disable join button completely, show "VIEW LIVE" button only
- Paid tournament card: UPCOMING → show "Pay & Register" button; LIVE/ongoing → show "View Live" button, hide register; DONE/completed → show "Result" button
- FreeMatchCard in MyMatchesPage: fix "RESULTS" button to open actual result data (not Room ID popup)
- Registration form: label colors black/dark gray bold, inputs light gray bg #F5F5F5 black text, checkbox text dark gray #333333, COMPLETE REGISTRATION button neon green #00FF88 black text
- Room Details popup: Room ID label black bold, numbers black bold 20px, COPY buttons neon green black text, white card background

### Remove
- Mixed dropdown in Admin Scores tab (replaced by separate tabs)

## Implementation Plan
1. TournamentsPage.tsx: Add status check in free tournament card — LIVE/DONE states control button visibility
2. TournamentsPage.tsx: Paid tournament card — completed state shows Result button linking to /tournament/:id
3. TournamentsPage.tsx + registration modal: Fix colors for labels, inputs, buttons per readability spec
4. AdminPage.tsx Scores section: Split into two sub-tabs — Free Scoreboard (free tournament dropdown) and Paid Scoreboard (paid tournament dropdown) with separate prize calculation
5. MyMatchesPage.tsx: Fix FreeMatchCard RESULTS button to show actual match result data
