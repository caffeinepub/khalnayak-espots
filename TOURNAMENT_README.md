# Khalnayak Espots - Free Fire Tournament Platform

A complete Free Fire tournament management platform built on the Internet Computer with React + TypeScript frontend.

## 🎮 Features

### For Players
- **Tournament Discovery**: Browse upcoming, live, and completed tournaments
- **Team Registration**: Register teams of 4 players (+ 1 substitute) for tournaments
- **Wallet Management**: Integrated wallet system for entry fees and prize distribution
- **Real-time Leaderboards**: Live tournament rankings with kill counts and placement points
- **Profile & Stats**: Track tournament participation, earnings, and performance
- **Referral System**: Share referral codes and earn bonuses

### For Admins
- **Tournament Management**: Create, update, and manage tournament lifecycle
- **Registration Approval**: Review and approve/reject team registrations
- **Score Updates**: Live score updates with kills and placement data
- **Payment Processing**: Approve deposits and withdrawals
- **Prize Distribution**: Automated prize pool calculation and distribution
- **User Management**: View users and manage bans

## 🎨 Design

The platform features a bold **cyberpunk gaming aesthetic** with:
- Dark background with neon accents (cyan, pink, purple)
- Custom gaming fonts: **Orbitron** (display) and **Rajdhani** (body)
- Glow effects and smooth animations
- Fully responsive design (mobile-first)
- OKLCH color system for vibrant, perceptually uniform colors

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom gaming design tokens
- **UI Components**: shadcn/ui (Radix primitives)
- **Routing**: TanStack Router
- **State Management**: TanStack Query (React Query)
- **Authentication**: Internet Identity
- **Backend**: Motoko canister with authorization component

### Key Components

#### Pages
- `HomePage`: Hero section, stats, featured tournaments
- `TournamentsPage`: Filterable tournament list
- `TournamentDetailPage`: Detailed view with registration, leaderboard, teams
- `WalletPage`: Balance, transactions, deposit/withdrawal
- `ProfilePage`: User stats and tournament history
- `RulesPage`: Complete game rules and scoring system
- `SupportPage`: Contact form and FAQ
- `AdminPage`: Comprehensive admin dashboard

#### Custom Hooks
- `useQueries.ts`: All backend integration hooks using React Query
- `useActor.ts`: Backend actor management (generated)
- `useInternetIdentity.ts`: Authentication (generated)

#### Utilities
- `format.ts`: Currency, date, time formatting
- `urlParams.ts`: URL parameter handling (generated)

## 📋 Tournament Rules

### Game Modes
1. **Battle Ground**: 48 players, 12 teams, classic BR
2. **4v4 Custom**: Team vs team matches

### Scoring
- **Kill Points**: 1 point per elimination
- **Placement Points**: 1st (12pts), 2nd (9pts), 3rd (8pts), etc.

### Prize Distribution
- Platform takes 30% commission
- 70% distributed to winners:
  - 1st Place: 35%
  - 2nd Place: 25%
  - 3rd Place: 15%
  - Most Kills (6+): 10%
  - 8+ Kills: 5%
  - Top Performers: 10%

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation
```bash
# Install dependencies
pnpm install

# Run TypeScript check
pnpm --filter '@caffeine/template-frontend' typescript-check

# Run linter
pnpm --filter '@caffeine/template-frontend' lint

# Build frontend
pnpm --filter '@caffeine/template-frontend' build:skip-bindings

# Deploy (from project root)
caffeine deploy
```

## 🎯 Key Features Implemented

✅ Complete responsive UI with gaming aesthetics  
✅ Internet Identity authentication  
✅ Full tournament lifecycle management  
✅ Team registration with wallet balance validation  
✅ Real-time leaderboard with auto-refresh  
✅ Wallet system with deposits/withdrawals  
✅ Admin panel with all management features  
✅ Notification polling system  
✅ Countdown timers for tournaments  
✅ Prize distribution calculation  
✅ Mobile-first responsive design  
✅ Type-safe backend integration  
✅ Toast notifications for user actions  

## 📱 Pages Overview

### Public Pages
- **/** - Homepage with featured tournaments and platform stats
- **/tournaments** - Browse all tournaments with filters
- **/tournament/:id** - Tournament details, registration, and leaderboard
- **/rules** - Complete rules and scoring system
- **/support** - Contact form and FAQ

### Authenticated Pages
- **/wallet** - Manage wallet balance and transactions
- **/profile** - View stats and tournament history

### Admin Pages
- **/admin** - Complete admin dashboard with 7 tabs:
  - Overview: Platform stats and pending actions
  - Tournaments: Create and manage tournaments
  - Registrations: Approve/reject team registrations
  - Scores: Update team scores
  - Deposits: Process deposit requests
  - Withdrawals: Process withdrawal requests
  - Users: View and manage users

## 🎨 Design Tokens

### Colors
- **Primary (Cyan)**: `0.75 0.18 195` - Main actions, highlights
- **Secondary (Pink)**: `0.62 0.25 345` - Accents, CTAs
- **Accent (Purple)**: `0.65 0.22 285` - Tertiary elements
- **Background**: Deep purple-black `0.06 0.015 285`

### Typography
- **Display**: Orbitron (700-900 weight) - Headers, numbers
- **Body**: Rajdhani (400-600 weight) - Content
- **Mono**: Fira Code - IDs, codes, wallet addresses

### Animations
- Glow effects on hover
- Fade-in transitions
- Countdown timers
- Live badge pulse
- Smooth page transitions

## 🔐 Security

- Internet Identity for authentication
- Role-based access control (player/admin)
- Wallet balance validation before registration
- Admin-only routes protected
- Ban system for cheaters
- Secure transaction handling

## 🎮 User Flow

1. **New User**: Login with Internet Identity → Add money to wallet
2. **Registration**: Browse tournaments → Register team → Wait for approval
3. **Tournament**: Get room credentials → Play → Scores updated live
4. **Prizes**: Win tournament → Prize auto-credited to wallet → Withdraw anytime

## 📊 Backend Integration

All backend methods are properly integrated through React Query hooks:
- Tournament management (CRUD operations)
- Team registration and approval
- Wallet operations (deposit, withdraw, balance)
- Score updates and leaderboards
- User profile management
- Notification system
- Prize distribution

## 🎯 Code Quality

- ✅ TypeScript strict mode
- ✅ ESLint compliance
- ✅ Proper error handling
- ✅ Loading states for all async operations
- ✅ Toast notifications for user feedback
- ✅ Form validation
- ✅ Responsive design tested

## 📝 Notes

- Payment integration is UI-only (deposit/withdrawal requires admin approval)
- Real-time leaderboard auto-refreshes every 10 seconds during live tournaments
- Notifications are polled every 30 seconds when logged in
- All dates/times are properly formatted for Indian timezone
- Currency is displayed in INR (₹)

---

Built with ❤️ using [caffeine.ai](https://caffeine.ai)
