# Khalnayak Espots

## Current State

The app has Internet Identity login in `LoginPage.tsx` and a `ProfileSetupPage.tsx` with display name + Free Fire UID form. However, several files still import `useOtpAuth` (from `useOtpAuth.ts`) and `useLocalAuth` (from `useLocalAuth.ts`), which are leftover from previous Firebase/MSG91 implementations. Firebase-related code exists in `src/lib/firebase.ts` and the two legacy hooks.

## Requested Changes (Diff)

### Add
- Nothing new to add (system already exists)

### Modify
- Replace all `useOtpAuth` imports in: `useQueries.ts`, `HomePage.tsx`, `PushNotificationManager.tsx`, `NotificationPoller.tsx`, `useTokens.ts`, `BanNotification.tsx`, `TournamentDetailPage.tsx`, `EarnPage.tsx`, `MyMatchesPage.tsx` — migrate to `useInternetIdentity` + `useIIProfile`

### Remove
- `src/frontend/src/lib/firebase.ts` — delete Firebase REST API integration
- `src/frontend/src/hooks/useOtpAuth.ts` — delete MSG91/OTP hook  
- `src/frontend/src/hooks/useLocalAuth.ts` — delete email/password local auth hook
- `src/frontend/src/pages/RegisterPage.tsx` — delete registration page (not needed)

## Implementation Plan

1. For each file using `useOtpAuth`, replace usage pattern:
   - `currentUser` from OtpAuth → use `profile` from `useIIProfile`
   - `isLoggedIn` → `!!identity && !identity.getPrincipal().isAnonymous()`
   - `isInitializing` → from `useInternetIdentity`
   - `identity` → from `useInternetIdentity`
   - `logout`/`clear` → `clear` from `useInternetIdentity` + navigate to /login
2. For files using `currentUser.username` → use `profile.display_name`
3. For files using `currentUser.referralCode` → use `profile.referral_code`  
4. Delete legacy files: firebase.ts, useOtpAuth.ts, useLocalAuth.ts
