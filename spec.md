# Khalnayak Espots

## Current State
App has a sticky top Header with desktop nav links and a mobile hamburger sheet menu. Footer exists at the bottom. No bottom navigation bar exists. Colors use CSS variables (primary = cyan). Gaming fonts Orbitron/Rajdhani are loaded.

## Requested Changes (Diff)

### Add
- New `BottomNavBar` component: fixed at bottom of screen, sits above footer on mobile/tablet, hidden on desktop (≥900px).
- Four nav items with outline-style lucide icons + labels:
  - Home (House icon) → "/"
  - Tournaments (Trophy icon) → "/tournaments"
  - Earn (Coins icon) → "/earn"
  - Profile (User icon) → "/profile"
- Active item: neon green color (#00FF88) with glow/neon text-shadow effect
- Inactive item: gray (#888888)
- Background: #0A0A0A (dark)
- Icons: 24-28px, outline style (stroke, no fill)
- Labels: 12px below icon
- Smooth color transition on active change
- Add bottom padding to `<main>` on mobile so content isn't hidden behind bottom bar
- Color scheme upgrade: swap primary neon color to #00FF88 (neon green) in CSS variables and update card glow effects to match
- Cards & containers: glow effect with `box-shadow: 0 4px 15px rgba(0,255,136,0.2)`, border-radius 12px
- Gradient buttons: subtle neon green gradient on primary buttons
- Add `data-ocid` markers to all BottomNavBar items

### Modify
- `App.tsx`: render `<BottomNavBar />` inside root layout, above `<Footer />`
- `index.css` / tailwind config: update `--primary` CSS variable to #00FF88, update glow utilities
- `Footer.tsx`: add `pb-16 md:pb-0` bottom padding compensation or handle via main padding
- Main layout `<main>`: add `pb-16 md:pb-0` so content not hidden behind bottom bar on mobile

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/BottomNavBar.tsx` with:
   - useRouter / Link from @tanstack/react-router for active detection
   - 4 nav items (Home/Tournaments/Earn/Profile)
   - CSS: `fixed bottom-0 left-0 right-0 z-40 md:hidden` (hidden on desktop ≥768px, or use lg:hidden for ≥1024px; use md:hidden to match 900px intent)
   - Active item: style with neon green + drop-shadow glow
   - Inactive: gray
   - Background: bg-[#0A0A0A] border-t border-[#00FF88]/20
   - Smooth transition via CSS transition property
   - data-ocid markers on each tab
2. Update `App.tsx` rootRoute component to include `<BottomNavBar />` and add `pb-16 md:pb-0` to `<main>`
3. Update `src/frontend/src/index.css`: change `--primary` hsl value to map to #00FF88 (neon green), update glow utilities
4. Validate with typecheck + build
