# KL TOURNAMENTS

## Current State
- App is a mobile-first Free Fire tournament PWA with Firebase Google Sign-In + Internet Identity.
- White background (#FFFFFF) light mode already in place.
- BottomNavBar uses Lucide icons with neon green active color.
- Tournaments page has FREE/PAID tab separation, free tournaments with 🎬 WATCH AD & JOIN FREE button.
- AdminPage has FreeTournamentAdminCard managing existing FREE_TOURNAMENT_LIST (fixed 4 modes).
- Status badges use CSS classes `fire-badge-live`, `fire-badge-completed`.
- Logo in Header is "KL Esports Life" (Orbitron, neon green).
- Admin panel tabs: matches, overview, registrations, tournaments, scores, deposits, withdrawals, users, security, referrals.

## Requested Changes (Diff)

### Add
- Tap animation on BottomNavBar icons: scale(0.9) → scale(1.0) with 0.1s transition on press
- Glow effect on active nav icon tap
- Status badge CSS classes: .badge-free (green bg #22c55e, white text), .badge-paid (purple bg #9d4edd, white text), .badge-live (red bg #ef4444, white text), .badge-completed (gray bg #9ca3af, white text)
- Admin panel "Free Tournaments" tab, "Paid Tournaments" tab, "All Tournaments" tab inside the existing Tournaments management area
- "Create Free Tournament" admin section with fields: Tournament Name, Mode, Max Players, Start Time, and auto-calculated prize display
- Free tournament cards: "🎁 FREE" badge prominently displayed
- Join count display: "👥 X/500 Only Y Spots Left" format

### Modify
- Logo text: change from "KL Esports Life" to "KL TOURNAMENTS" — Neon Green (#00FF88) with black text-shadow outline, visible on white background
- BottomNavBar: active color #00FF88, inactive color #666666, add tap animation
- White background enforced globally: background #FFFFFF, headings #000000 bold, body text #333333, secondary text #666666
- Cards: #F5F5F5 background, #E0E0E0 border, subtle shadow
- Buttons: gradient neon green (#00FF88) to neon purple (#9d4edd), white text
- Progress bars: #00FF88 color
- Status badges updated to solid-color style: FREE=green, PAID=purple, LIVE=red, COMPLETED=gray, all with white text
- Free tournament card join button: "🎬 WATCH AD & JOIN FREE" (already present, keep visible)
- Free tournament card badge: "🎁 FREE" (already has FREE text, make it more prominent)
- Admin panel add Free/Paid/All tabs within tournaments management section

### Remove
- Nothing to remove; only UI/color changes

## Implementation Plan
1. Update Header.tsx: change KLEsportsLogo to display "KL TOURNAMENTS" with neon green color + black outline
2. Update BottomNavBar.tsx: add tap animation (active scale transition 0.9→1.0), ensure active=#00FF88, inactive=#666666
3. Update index.css: add .badge-free/.badge-paid/.badge-live/.badge-completed utility classes; ensure white bg globals
4. Update TournamentsPage.tsx: make FREE badge style use new .badge-free class, update status badges (LIVE, COMPLETED) to use solid-color classes with white text
5. Update AdminPage.tsx: add Free/Paid/All sub-tabs within the tournaments tab area, and add a "Create Free Tournament" form section with Name, Mode, Max Players, Start Time fields, and prize auto-display
