# KL TOURNAMENTS

## Current State
App uses Internet Identity (DFINITY @dfinity/auth-client) for login. The `useInternetIdentity` hook manages auth state, `useIIProfile` manages user profiles stored in localStorage keyed by principal. LoginPage shows a single "Login with Internet Identity" button.

## Requested Changes (Diff)

### Add
- Firebase SDK (`firebase` npm package) with provided config
- `useFirebaseAuth` hook that provides same interface as `useInternetIdentity` (identity/login/clear/isLoggingIn/isInitializing)
- Google Sign-In button on LoginPage
- Firebase config file at `src/lib/firebase.ts`

### Modify
- `LoginPage.tsx` — Replace II button with Google Sign-In button (Firebase Google Auth popup)
- `App.tsx` — Replace `useInternetIdentity` with `useFirebaseAuth`; replace `InternetIdentityProvider` usage
- `useIIProfile.ts` — Replace `identity.getPrincipal().toText()` with Firebase `user.uid`; adapt to Firebase auth state
- `ProfileSetupPage.tsx` — Use Firebase auth user instead of II identity
- `package.json` — Add `firebase` dependency

### Remove
- All `useInternetIdentity` imports and usage
- `InternetIdentityProvider` wrapper
- `@dfinity/auth-client` usage from auth flow (keep dfinity packages for backend calls if needed)

## Implementation Plan
1. Add `firebase` to package.json dependencies
2. Create `src/lib/firebase.ts` with the provided Firebase config and initialize app, auth
3. Create `src/hooks/useFirebaseAuth.ts` — wraps Firebase Google Sign-In, exposes: `user`, `login()`, `clear()`, `isLoggingIn`, `isInitializing`, `isLoginSuccess`
4. Update `useIIProfile.ts` — use `useFirebaseAuth` instead of `useInternetIdentity`; derive principal/uid from Firebase `user.uid`
5. Update `LoginPage.tsx` — Google Sign-In button with Firebase branding
6. Update `App.tsx` — use `useFirebaseAuth` instead of `useInternetIdentity`; remove InternetIdentityProvider
7. Update `ProfileSetupPage.tsx` — use `useFirebaseAuth`
