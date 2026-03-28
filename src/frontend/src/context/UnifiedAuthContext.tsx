import {
  GoogleAuthProvider,
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { getFirebaseAuth } from "../lib/firebase";

type AuthMethod = "firebase" | "internet-identity" | null;

interface UnifiedAuthContextType {
  userId: string | null;
  authMethod: AuthMethod;
  isInitializing: boolean;
  firebaseEmail: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithII: () => void;
  logoutAll: () => void;
}

const UnifiedAuthContext = createContext<UnifiedAuthContextType | undefined>(
  undefined,
);

export function UnifiedAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firebaseUser, setFirebaseUser] = useState<User | null | undefined>(
    undefined,
  );

  // Internet Identity
  const {
    identity,
    login: iiLogin,
    clear: iiClear,
    isInitializing: iiInitializing,
  } = useInternetIdentity();
  const iiUserId =
    identity && !identity.getPrincipal().isAnonymous()
      ? `ii_${identity.getPrincipal().toText()}`
      : null;

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (user) =>
      setFirebaseUser(user ?? null),
    );
    return unsub;
  }, []);

  const isInitializing = firebaseUser === undefined || iiInitializing;

  // Priority: Firebase > Internet Identity
  let userId: string | null = null;
  let authMethod: AuthMethod = null;
  if (firebaseUser) {
    userId = `fb_${firebaseUser.uid}`;
    authMethod = "firebase";
  } else if (iiUserId) {
    userId = iiUserId;
    authMethod = "internet-identity";
  }

  const loginWithGoogle = useCallback(async () => {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const loginWithII = useCallback(() => {
    iiLogin();
  }, [iiLogin]);

  const logoutAll = useCallback(() => {
    const auth = getFirebaseAuth();
    void signOut(auth);
    iiClear();
  }, [iiClear]);

  const value = useMemo(
    () => ({
      userId,
      authMethod,
      isInitializing,
      firebaseEmail: firebaseUser?.email ?? null,
      loginWithGoogle,
      loginWithII,
      logoutAll,
    }),
    [
      userId,
      authMethod,
      isInitializing,
      firebaseUser,
      loginWithGoogle,
      loginWithII,
      logoutAll,
    ],
  );

  return (
    <UnifiedAuthContext.Provider value={value}>
      {children}
    </UnifiedAuthContext.Provider>
  );
}

export function useUnifiedAuth(): UnifiedAuthContextType {
  const ctx = useContext(UnifiedAuthContext);
  if (!ctx) throw new Error("UnifiedAuthProvider missing");
  return ctx;
}
