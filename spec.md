# Khalnayak Espots

## Current State
- Local auth system (localStorage-based) with email + phone login
- Phone OTP flow exists but has no timer or resend functionality — "Send OTP" button stays disabled after sending, no countdown
- Internet Identity login works but username is auto-set to random `Player_XXXXXXXX` without giving the user a proper choice of name
- Profile page shows "Not set" for email when no email — no "Add Email" button
- ReferAndEarnCard on profile page only has WhatsApp and Telegram share buttons
- No social share buttons for Facebook, Instagram, Email, or Copy Link
- Share message is generic, not the specified format
- No "How to Use Referral Code" step-by-step guide on home page or profile page
- Registration form referral code field has no info tooltip (ⓘ icon)

## Requested Changes (Diff)

### Add
- OTP timer (60 seconds countdown) in PhoneLoginForm after OTP is sent
- "Resend OTP" button that becomes active after 60 seconds
- Facebook, Instagram, Email, and Copy Link share buttons in ReferAndEarnCard
- Standardized share message: "Join me on Khalnayak Espots! Use my referral code [CODE] and get ₹2 bonus. Register here: [LINK]"
- "How to Use Referral Code" step-by-step guide section in ProfilePage (4 steps)
- Info icon (ⓘ) tooltip on referral code field in RegisterPage: "Enter friend's referral code to earn ₹2 bonus!"
- "Add Email" button on profile when email is blank (for II-only users)
- Phone field in ProfileSetupCard for II users who want to add phone number

### Modify
- PhoneLoginForm: OTP section — after sending, show 60s countdown timer; "Resend" button active only when timer expires; allow re-sending OTP when resend is clicked (reset timer)
- ProfileSetupCard (Internet Identity flow): pre-fill username from local auth if available but let user edit freely; add phone number optional field; use better default placeholder (not random `Player_XXXXXXXX`) — show "Choose your username" placeholder
- LocalProfileView + main ProfilePage: if email is blank/empty, show "Add Email" button instead of blank text; same for phone
- ReferAndEarnCard: replace existing 2 share buttons with full 5 share buttons (WhatsApp, Facebook, Instagram, Email, Copy Link); update share message to specified format

### Remove
- Nothing removed

## Implementation Plan
1. **LoginPage.tsx — PhoneLoginForm**: Add `timer` state (60), `timerActive` state. When OTP sent, start 60s countdown using `setInterval`. Show countdown "Resend in 58s..." while active. When timer hits 0, show "Resend OTP" button (active). On resend click, re-call `handleSendOtp`, reset timer to 60.
2. **ProfilePage.tsx — ProfileSetupCard**: Add phone field (optional). Change default username placeholder to empty or "Your name" — not random. Allow user to freely type username.
3. **ProfilePage.tsx — player info sections**: When email is null/empty, show "Add Email" button (opens inline edit or links to edit form). When phone is null/empty for II users, show "Add Phone" button.
4. **ProfilePage.tsx — ReferAndEarnCard**: Replace 2-button share row with 5 buttons: WhatsApp, Facebook, Instagram, Email, Copy Link. Share message = "Join me on Khalnayak Espots! Use my referral code [CODE] and get ₹2 bonus. Register here: [LINK]". Instagram opens instagram.com (can't deep-link to share from web). Email uses `mailto:` with pre-filled body.
5. **ProfilePage.tsx — ReferAndEarnCard**: Add "How to Use Referral Code" steps section (4 steps) below the existing "How It Works" section.
6. **RegisterPage.tsx**: Add info icon (ⓘ) next to the referral code label with a Tooltip showing "Enter friend's referral code to earn ₹2 bonus!".
7. **HomePage.tsx**: Add a "How to Use Referral Code" prominent section — 4 steps with icons, styled with neon green, mobile-first.
