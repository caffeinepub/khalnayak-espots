import {
  GoogleAuthProvider,
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  type ReactNode,
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../lib/firebase";

export type FirebaseAuthStatus =
  | "initializing"
  | "idle"
  | "logging-in"
  | "success"
  | "loginError";

export type FirebaseAuthContext = {
  user: User | null;
  /** Backward-compat: identity object with getPrincipal().toText() returning user.uid */
  identity: { getPrincipal: () => { toText: () => string } } | undefined;
  login: () => void;
  clear: () => void;
  loginStatus: FirebaseAuthStatus;
  isInitializing: boolean;
  isLoginIdle: boolean;
  isLoggingIn: boolean;
  isLoginSuccess: boolean;
  isLoginError: boolean;
  loginError?: Error;
};

const FirebaseAuthReactContext = createContext<FirebaseAuthContext | undefined>(
  undefined,
);

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loginStatus, setLoginStatus] =
    useState<FirebaseAuthStatus>("initializing");
  const [loginError, setLoginError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoginStatus(firebaseUser ? "success" : "idle");
    });
    return unsubscribe;
  }, []);

  const login = useCallback(() => {
    setLoginStatus("logging-in");
    setLoginError(undefined);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setLoginStatus("success");
      })
      .catch((err: unknown) => {
        setLoginStatus("loginError");
        setLoginError(err instanceof Error ? err : new Error("Login failed"));
      });
  }, []);

  const clear = useCallback(() => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setLoginStatus("idle");
        setLoginError(undefined);
      })
      .catch((err: unknown) => {
        setLoginStatus("loginError");
        setLoginError(err instanceof Error ? err : new Error("Logout failed"));
      });
  }, []);

  const identity = useMemo(() => {
    if (!user) return undefined;
    return {
      getPrincipal: () => ({
        toText: () => user.uid,
      }),
    };
  }, [user]);

  const value = useMemo<FirebaseAuthContext>(
    () => ({
      user,
      identity,
      login,
      clear,
      loginStatus,
      isInitializing: loginStatus === "initializing",
      isLoginIdle: loginStatus === "idle",
      isLoggingIn: loginStatus === "logging-in",
      isLoginSuccess: loginStatus === "success",
      isLoginError: loginStatus === "loginError",
      loginError,
    }),
    [user, identity, login, clear, loginStatus, loginError],
  );

  return createElement(FirebaseAuthReactContext.Provider, { value, children });
}

export function useFirebaseAuth(): FirebaseAuthContext {
  const context = useContext(FirebaseAuthReactContext);
  if (!context) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider",
    );
  }
  return context;
}
