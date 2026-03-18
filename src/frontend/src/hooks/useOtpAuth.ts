import { useNavigate } from "@tanstack/react-router";
// Compatibility shim — delegates to Internet Identity + IIProfile
import { useCallback } from "react";
import { useIIProfile } from "./useIIProfile";
import { useInternetIdentity } from "./useInternetIdentity";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface OtpSession {
  phone: string;
  accessToken: string;
  username: string;
  referralCode: string;
  walletBalance: number;
  createdAt: number;
}

export type OtpAuthContextType = {
  currentUser: OtpSession | null;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  openLoginModal: () => void;
  login: () => void;
  logout: () => void;
  clear: () => void;
  identity:
    | {
        getPrincipal: () => {
          isAnonymous: () => boolean;
          toString: () => string;
        };
      }
    | undefined;
  loginStatus:
    | "initializing"
    | "idle"
    | "logging-in"
    | "success"
    | "loginError";
  isInitializing: boolean;
  isLoginIdle: boolean;
  isLoginSuccess: boolean;
  isLoginError: boolean;
  isLoggingIn_status: boolean;
};

// Stub exports kept for rate-limiting helpers that may be imported elsewhere
export function checkRateLimit(_phone: string) {
  return { allowed: true };
}
export function recordOtpRequest(_phone: string) {}
export function checkFailureBlock(_phone: string) {
  return { blocked: false };
}
export function recordOtpFailure(_phone: string) {}
export async function verifyMsg91Token(_token: string) {
  return { success: false };
}

// Provider stub (no-op since we use hooks directly)
export function OtpAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}

export function useOtpAuth(): OtpAuthContextType {
  const {
    identity,
    isInitializing,
    clear: iiClear,
    login: iiLogin,
    isLoggingIn,
  } = useInternetIdentity();
  const { profile } = useIIProfile();
  const navigate = useNavigate();

  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  const logout = useCallback(() => {
    iiClear();
    void navigate({ to: "/login" });
  }, [iiClear, navigate]);

  const currentUser: OtpSession | null =
    isLoggedIn && profile
      ? {
          phone: profile.freefire_uid || "",
          accessToken: identity!.getPrincipal().toText(),
          username: profile.display_name,
          referralCode: profile.referral_code,
          walletBalance: profile.wallet_balance,
          createdAt: profile.created_at,
        }
      : null;

  return {
    currentUser,
    isLoggedIn,
    isLoggingIn,
    openLoginModal: () => void navigate({ to: "/login" }),
    login: iiLogin,
    logout,
    clear: logout,
    identity: isLoggedIn ? identity : undefined,
    loginStatus: isInitializing
      ? "initializing"
      : isLoggedIn
        ? "success"
        : "idle",
    isInitializing,
    isLoginIdle: !isInitializing && !isLoggedIn,
    isLoginSuccess: isLoggedIn,
    isLoginError: false,
    isLoggingIn_status: isLoggingIn,
  };
}
