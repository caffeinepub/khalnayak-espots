# Khalnayak Esports

## Current State
- Tournament cards exist for free and paid tournaments
- Admin panel has tabs: Overview, Manage Matches, Registrations, Tournaments, Scores, Deposits, Withdrawals, Users, Ad Stats, Referrals, Security, Free Registrations, Paid Registrations
- My Matches page shows joined tournaments
- Earn page has token earning via ads
- Token earning currently may fire from multiple places
- Admin free tournament detail page exists but looks basic
- Paid tournaments may lack same controls as free tournaments

## Requested Changes (Diff)

### Add
- LIVE tab click → open YouTube channel (https://www.youtube.com/@KL_Tournaments) in new tab for both free & paid
- Score entry for both free AND paid tournaments in admin Scores section (dropdown showing both types)
- My Matches page: detailed card with tournament name, date, format, prize, type, UID, player name, status, room ID, password, LIVE button, RESULTS button
- Admin free tournament detail page: premium redesign with sections (Stats, Match Details, Admin Controls, Match Timing, Tournament Status), colored buttons, copy buttons with toast, pulsing LIVE badge
- Paid tournament detail page: same premium style, purple accents
- Paid tournament full controls: Room ID/Password set, match start/stop, scores update, results publish, unpublish/delete
- Earn page message: "Watch ads to earn tokens! Only ads watched here give tokens."

### Modify
- Free tournament cards: branded design — white+gradient bg, 16-20px radius, shadow, hover scale, FREE badge neon green glow, prize neon green, join button gradient pill, status badges (UPCOMING blue, LIVE red pulsing, DONE gray)
- Paid tournament cards: same premium design, PAID badge neon purple glow, join button "PAY & REGISTER" purple gradient
- Token earning: ONLY fire from Earn page Watch Ad button — remove token award from tournament registration ads, deposit ads, withdrawal ads
- Admin panel tabs: full names visible, no cut-off, horizontally scrollable
- Tournaments page tabs (ALL, BG, 4V4, 1V1, 2V2): properly aligned
- Free & Paid sections properly spaced
- Overall layout: mobile responsive, no overlapping

### Remove
- Token award from non-Earn-page ad interactions

## Implementation Plan
1. TournamentsPage.tsx: LIVE tab → window.open YouTube URL; redesign free/paid tournament cards with branded styles
2. AdminPage.tsx: Scores section — dropdown includes both free & paid tournaments; free tournament detail view premium redesign; paid tournament detail view with full controls (Room ID/Password, start/stop, results, unpublish/delete); fix tab names cut-off
3. MyMatchesPage.tsx: redesign match cards with all details (name, date, format, prize, type, UID, player, status, roomID, password, LIVE/RESULTS buttons)
4. EarnPage.tsx: add message, ensure token only from here
5. Any other files where token is awarded outside Earn page: remove token award logic
