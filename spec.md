# KL TOURNAMENTS

## Current State
- Login page has both Internet Identity (II) and Google Sign-In buttons
- EarnPage uses `useOtpAuth` (legacy hook) and dark background (#0A0A0A, #16213E)
- Home page already has no stats cards; upcoming tournaments show real data or empty state
- Leaderboard/top earners section in EarnPage already shows empty state
- UnifiedAuthContext supports both II and Firebase Google auth
- Some pages still reference dark bg colors

## Requested Changes (Diff)

### Add
- Nothing new to add

### Modify
1. **LoginPage.tsx**: Remove Internet Identity button and OR divider. Keep only "Sign in with Google" button. Update tagline to remove II references.
2. **EarnPage.tsx**: Fix auth — replace `useOtpAuth` with `useUnifiedAuth`. Change dark background colors to white theme: background #FFFFFF, cards #F5F5F5, text #333333/#666666, keep neon green/purple accents on buttons.
3. **UnifiedAuthContext.tsx**: Remove Internet Identity dependency entirely. Firebase Google-only. userId = `fb_${firebaseUser.uid}` when logged in. logoutAll = signOut(firebase only). Remove iiPrincipal logic.
4. **main.tsx**: Remove `InternetIdentityProvider` wrapper (no longer needed).
5. **LoginPage.tsx**: Update subtitle text from "blockchain login" to reflect Google-only.

### Remove
- Internet Identity login button from LoginPage
- II-related auth logic from UnifiedAuthContext
- InternetIdentityProvider from main.tsx

## Implementation Plan
1. Update `LoginPage.tsx` — remove II button + OR divider, keep only Google Sign-In
2. Update `UnifiedAuthContext.tsx` — Firebase-only auth, no II
3. Update `main.tsx` — remove InternetIdentityProvider wrapper
4. Update `EarnPage.tsx` — use `useUnifiedAuth` instead of `useOtpAuth`, white light theme
5. Validate build
