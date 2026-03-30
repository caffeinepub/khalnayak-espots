# Khalnayak Esports

## Current State
- AdminPage.tsx has WithdrawalsTab with correct columns (User, Method, Details, Amount, Date, Status, Actions)
- VoucherTransactionsLog has columns: User, Amount, Voucher Code, Created, Expires, Status (needs reordering to: Voucher Code, Amount, Created Date, Expiry Date, Status)
- AdStatsTab shows all stats but uses dark neon colors — needs light mode readable colors
- ReferralsTab has tab named "Referrals" already, but referral logs table shows: Referrer Code, Friend, Date, Amount, Status — needs to show: User, Referred User, Reward, Date
- Token earning: TournamentDetailPage.tsx line 816 calls `tokens.earnToken()` when ad is watched during tournament registration — should NOT earn tokens here
- No PaidRegistrationsTab exists in AdminPage
- firestore.ts has FreeRegistration interface and functions — needs PaidRegistration interface and functions added

## Requested Changes (Diff)

### Add
- PaidRegistration interface + savePaidRegistration + getPaidRegistrations functions in firestore.ts
- PaidRegistrationsTab component in AdminPage.tsx with columns: Nickname, UID, Tournament Name, Payment Status, Registration Time, Actions
- Tab trigger "Paid Registrations" in admin nav (value="paidRegistrations")
- TabsContent for paidRegistrations
- Tournament-wise and status-wise filter in PaidRegistrationsTab
- savePaidRegistration call in TournamentDetailPage when paid tournament registration succeeds
- "Watch ads to earn tokens!" message on Earn page

### Modify
- VoucherTransactionsLog: reorder columns to Voucher Code, Amount, Created Date, Expiry Date, Status (remove User column)
- AdStatsTab: switch all dark neon colors to light-mode readable dark text on light gray card backgrounds (match white bg theme)
- ReferralsTab: Referral Logs table columns → User, Referred User, Reward, Date (rename from Referrer Code/Friend/Amount/Status)
- ReferralsTab: ensure currency symbol is ₹ everywhere (already is, just verify)
- TournamentDetailPage.tsx line 816: REMOVE `tokens.earnToken()` call — tournament registration ad should NOT earn tokens
- WithdrawalsTab: ensure overflow-x-auto is present for mobile scroll (already there, verify)
- AdStatsTab cards: use white bg (#ffffff), light gray (#F5F5F5), black/dark gray text instead of dark neon backgrounds

### Remove
- `tokens.earnToken()` call in TournamentDetailPage.tsx handleAdComplete function

## Implementation Plan
1. firestore.ts: Add PaidRegistration interface and save/get functions
2. AdminPage.tsx: Add PaidRegistrationsTab, add tab trigger, add TabsContent
3. AdminPage.tsx: Fix VoucherTransactionsLog column order (Voucher Code, Amount, Created Date, Expiry Date, Status)
4. AdminPage.tsx: Fix AdStatsTab to use light mode colors
5. AdminPage.tsx: Fix ReferralsTab Referral Logs columns (User, Referred User, Reward, Date)
6. TournamentDetailPage.tsx: Remove earnToken() from handleAdComplete
7. EarnPage.tsx: Add "Watch ads to earn tokens!" message
8. TournamentDetailPage.tsx: Call savePaidRegistration when paid registration succeeds
