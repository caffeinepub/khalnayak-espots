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
import { getFirebaseAuth } from "../lib/firebase";

type AuthMethod = "firebase" | null;

interface UnifiedAuthContextType {
  userId: string | null;
  authMethod: AuthMethod;
  isInitializing: boolean;
  loginWithGoogle: () => Promise<void>;
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
  // undefined = not yet checked, null = no user, User = logged in
  const [firebaseUser, setFirebaseUser] = useState<User | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (user) =>
      setFirebaseUser(user ?? null),
    );
    return unsub;
  }, []);

  const isInitializing = firebaseUser === undefined;
  const userId = firebaseUser ? `fb_${firebaseUser.uid}` : null;
  const authMethod: AuthMethod = firebaseUser ? "firebase" : null;

  const loginWithGoogle = useCallback(async () => {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const logoutAll = useCallback(() => {
    const auth = getFirebaseAuth();
    void signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      userId,
      authMethod,
      isInitializing,
      loginWithGoogle,
      logoutAll,
    }),
    [userId, authMethod, isInitializing, loginWithGoogle, logoutAll],
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
