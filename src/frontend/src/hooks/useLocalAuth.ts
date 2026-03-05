/**
 * useLocalAuth — localStorage-based custom auth layer for Khalnayak Espots.
 *
 * This is an ADDITIONAL layer on top of Internet Identity.
 * It stores user credentials (email, phone, name) locally so the app can show
 * a friendly registration/login UI, while II handles actual blockchain identity.
 *
 * All keys are prefixed with `kle_` to avoid conflicts.
 */

import { useCallback, useEffect, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface LocalUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: number;
  emailVerified: boolean;
  phoneVerified: boolean;
  referralCode?: string;
}

export interface LocalSession {
  userId: string;
  email: string;
  fullName: string;
  phone: string;
  rememberMe: boolean;
  loginTime: number;
}

// ─── Storage Keys ──────────────────────────────────────────────────────────────

const USERS_KEY = "kle_users";
const SESSION_KEY = "kle_session";
const OTP_PREFIX = "kle_otp_";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function hashPassword(password: string, email: string): string {
  return btoa(password + email);
}

function loadUsers(): LocalUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LocalUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: LocalUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession(): LocalSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalSession;
  } catch {
    return null;
  }
}

function saveSession(session: LocalSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function generateId(): string {
  return `kle_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Auth Functions (non-hook, pure utilities) ─────────────────────────────────

export function isEmailTaken(email: string): boolean {
  const users = loadUsers();
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function isPhoneTaken(phone: string): boolean {
  const users = loadUsers();
  const normalised = phone.replace(/\s+/g, "");
  return users.some((u) => u.phone.replace(/\s+/g, "") === normalised);
}

export function getCurrentUser(): LocalSession | null {
  return loadSession();
}

export interface RegisterResult {
  success: boolean;
  user?: LocalUser;
  error?: string;
}

export function register(
  fullName: string,
  email: string,
  phone: string,
  password: string,
): RegisterResult {
  // Validate inputs
  if (!fullName || fullName.trim().length < 2) {
    return {
      success: false,
      error: "Full name must be at least 2 characters.",
    };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  const normalPhone = phone.replace(/\s+/g, "");
  if (!normalPhone || normalPhone.length < 10) {
    return {
      success: false,
      error: "Phone number must be at least 10 digits.",
    };
  }
  if (!password || password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  const users = loadUsers();

  // Check uniqueness
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "This email is already registered." };
  }
  if (users.some((u) => u.phone.replace(/\s+/g, "") === normalPhone)) {
    return {
      success: false,
      error: "This phone number is already registered.",
    };
  }

  // Generate unique referral code
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let referralCode = "REF";
  for (let i = 0; i < 6; i++) {
    referralCode += chars[Math.floor(Math.random() * chars.length)];
  }

  const newUser: LocalUser = {
    id: generateId(),
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    phone: normalPhone,
    passwordHash: hashPassword(password, email.toLowerCase().trim()),
    createdAt: Date.now(),
    emailVerified: false,
    phoneVerified: false,
    referralCode,
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, user: newUser };
}

export interface LoginResult {
  success: boolean;
  session?: LocalSession;
  error?: string;
}

export function loginWithEmail(
  email: string,
  password: string,
  rememberMe: boolean,
): LoginResult {
  const users = loadUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim(),
  );

  if (!user) {
    return { success: false, error: "No account found with this email." };
  }

  const hash = hashPassword(password, user.email);
  if (hash !== user.passwordHash) {
    return { success: false, error: "Incorrect password." };
  }

  const session: LocalSession = {
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    rememberMe,
    loginTime: Date.now(),
  };

  saveSession(session);
  return { success: true, session };
}

export function loginWithPhone(
  phone: string,
  password: string,
  rememberMe: boolean,
): LoginResult {
  const users = loadUsers();
  const normalPhone = phone.replace(/\s+/g, "");
  const user = users.find((u) => u.phone.replace(/\s+/g, "") === normalPhone);

  if (!user) {
    return {
      success: false,
      error: "No account found with this phone number.",
    };
  }

  const hash = hashPassword(password, user.email);
  if (hash !== user.passwordHash) {
    return { success: false, error: "Incorrect password." };
  }

  const session: LocalSession = {
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    rememberMe,
    loginTime: Date.now(),
  };

  saveSession(session);
  return { success: true, session };
}

export function sendOtp(phone: string): string {
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  localStorage.setItem(`${OTP_PREFIX}${phone.replace(/\s+/g, "")}`, otp);
  // Return the OTP so demo can show it
  return otp;
}

export function verifyOtp(phone: string, otp: string): boolean {
  const key = `${OTP_PREFIX}${phone.replace(/\s+/g, "")}`;
  const stored = localStorage.getItem(key);
  if (!stored) return false;
  const valid = stored === otp.trim();
  if (valid) {
    localStorage.removeItem(key); // One-time use
  }
  return valid;
}

export function loginWithOtp(
  phone: string,
  otp: string,
  rememberMe: boolean,
): LoginResult {
  if (!verifyOtp(phone, otp)) {
    return { success: false, error: "Invalid or expired OTP." };
  }

  const users = loadUsers();
  const normalPhone = phone.replace(/\s+/g, "");
  const user = users.find((u) => u.phone.replace(/\s+/g, "") === normalPhone);

  if (!user) {
    return {
      success: false,
      error: "No account found with this phone number.",
    };
  }

  const session: LocalSession = {
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    rememberMe,
    loginTime: Date.now(),
  };

  saveSession(session);
  return { success: true, session };
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Returns the LocalUser with the given referral code, or undefined if not found.
 */
export function getUserByReferralCode(code: string): LocalUser | undefined {
  if (!code) return undefined;
  const users = loadUsers();
  return users.find(
    (u) =>
      u.referralCode && u.referralCode.toUpperCase() === code.toUpperCase(),
  );
}

/**
 * Returns all locally registered users.
 */
export function getAllLocalUsers(): LocalUser[] {
  return loadUsers();
}

// ─── React Hook ────────────────────────────────────────────────────────────────

/**
 * Reactive hook that returns the current local auth user and re-renders
 * when the session changes.
 */
export function useCurrentUser(): LocalSession | null {
  const [user, setUser] = useState<LocalSession | null>(() => loadSession());

  // Poll for session changes (cross-tab support)
  useEffect(() => {
    const handler = () => setUser(loadSession());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return user;
}

/**
 * Full hook that returns both the current user and auth action functions.
 */
export function useLocalAuth() {
  const currentUser = useCurrentUser();

  const doLogout = useCallback(() => {
    logout();
    // Trigger reactivity by dispatching a storage event in the same tab
    window.dispatchEvent(new StorageEvent("storage", { key: SESSION_KEY }));
  }, []);

  return {
    currentUser,
    isLoggedIn: currentUser !== null,
    register,
    loginWithEmail,
    loginWithPhone,
    loginWithOtp,
    sendOtp,
    verifyOtp,
    isEmailTaken,
    isPhoneTaken,
    getCurrentUser,
    logout: doLogout,
  };
}
