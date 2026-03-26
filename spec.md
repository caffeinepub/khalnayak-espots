# KL TOURNAMENTS

## Current State
- Firebase imported in code but `firebase` npm package is NOT in package.json → app crashes (white screen)
- User profiles stored in localStorage (not Firestore)
- Login: Google (Firebase) + Internet Identity both present
- Protected pages redirect to login if not logged in — but session not persisting due to missing firebase package

## Requested Changes (Diff)

### Add
- `firebase` npm package (firebase/app, firebase/auth, firebase/firestore)
- Firestore service layer: `src/lib/firestore.ts` — CRUD for users, transactions, referrals collections
- Firestore profile hook replacing localStorage in useIIProfile
- Persistent session: Firebase Auth persists automatically; II session via authClient storage

### Modify
- `package.json` — add firebase dependency
- `lib/firebase.ts` — also export Firestore db instance
- `hooks/useIIProfile.ts` — read/write user profiles from Firestore instead of localStorage
- `App.tsx` `AppContent` — remove PROTECTED_PATHS entirely; after login, all pages accessible; only redirect to /login if no session at all (first open)
- Remove repeated login guards on individual pages

### Remove
- localStorage profile storage (migrate to Firestore)
- PROTECTED_PATHS array and per-page login requirement after login

## Implementation Plan
1. Add firebase to package.json
2. Update lib/firebase.ts to export Firestore db
3. Create lib/firestore.ts — user CRUD, transaction CRUD, referral CRUD
4. Update hooks/useIIProfile.ts — use Firestore instead of localStorage
5. Update App.tsx — remove PROTECTED_PATHS; one-time login only
6. Validate and deploy
