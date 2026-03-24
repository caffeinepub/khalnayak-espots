import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import React, { Suspense, useEffect } from "react";
import { toast } from "sonner";
import { BanNotification } from "./components/BanNotification";
import { BottomNavBar } from "./components/BottomNavBar";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { InstallPrompt } from "./components/InstallPrompt";
import { NotificationPoller } from "./components/NotificationPoller";
import { PushNotificationManager } from "./components/PushNotificationManager";
import { SplashScreen } from "./components/SplashScreen";
import { VpnBlocker } from "./components/VpnBlocker";
import { Toaster } from "./components/ui/sonner";
import { useIIProfile } from "./hooks/useIIProfile";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

// ── Lazy-loaded pages ──────────────────────────────────────────────────────────
const AdminPage = React.lazy(() =>
  import("./pages/AdminPage").then((m) => ({ default: m.AdminPage })),
);
const EarnPage = React.lazy(() =>
  import("./pages/EarnPage").then((m) => ({ default: m.EarnPage })),
);
const HomePage = React.lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const ProfilePage = React.lazy(() =>
  import("./pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);
const RulesPage = React.lazy(() =>
  import("./pages/RulesPage").then((m) => ({ default: m.RulesPage })),
);
const SupportPage = React.lazy(() =>
  import("./pages/SupportPage").then((m) => ({ default: m.SupportPage })),
);
const TournamentDetailPage = React.lazy(() =>
  import("./pages/TournamentDetailPage").then((m) => ({
    default: m.TournamentDetailPage,
  })),
);
const TournamentsPage = React.lazy(() =>
  import("./pages/TournamentsPage").then((m) => ({
    default: m.TournamentsPage,
  })),
);
const WalletPage = React.lazy(() =>
  import("./pages/WalletPage").then((m) => ({ default: m.WalletPage })),
);
const MyMatchesPage = React.lazy(() =>
  import("./pages/MyMatchesPage").then((m) => ({ default: m.MyMatchesPage })),
);
const LoginPage = React.lazy(() =>
  import("./pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const ProfileSetupPage = React.lazy(() =>
  import("./pages/ProfileSetupPage").then((m) => ({
    default: m.ProfileSetupPage,
  })),
);

// Referral redirect page: /ref/:code -> store code in sessionStorage -> redirect to /login
function ReferralRedirectPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const codeFromPath = pathParts[pathParts.length - 1];
    const params = new URLSearchParams(window.location.search);
    const code =
      codeFromPath !== "ref" ? codeFromPath : params.get("ref") || "";
    if (code && code !== "ref") {
      sessionStorage.setItem("kle_pending_referral", code.toUpperCase());
    }
    void navigate({ to: "/login" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <div className="battleground-bg min-h-screen flex items-center justify-center">
      <div
        className="text-center"
        style={{ color: "#00FF88", fontFamily: "'Orbitron', sans-serif" }}
      >
        <Loader2
          className="h-8 w-8 animate-spin mx-auto mb-3"
          style={{ color: "#00FF88" }}
        />
        <p className="text-sm">Loading referral...</p>
      </div>
    </div>
  );
}

const AUTH_EXEMPT_PATHS = ["/login", "/setup-profile", "/ref"];

function PageLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="relative">
        <Loader2
          className="h-10 w-10 animate-spin"
          style={{ color: "var(--primary)" }}
        />
      </div>
      <p className="text-sm text-muted-foreground tracking-widest uppercase font-display">
        Loading...
      </p>
    </div>
  );
}

function FullScreenSpinner() {
  return (
    <div
      className="battleground-bg fixed inset-0 flex flex-col items-center justify-center gap-4"
      style={{ zIndex: 9999 }}
    >
      <Loader2
        className="h-12 w-12 animate-spin"
        style={{ color: "#00FF88" }}
      />
      <p
        className="text-sm tracking-widest uppercase"
        style={{
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        Loading...
      </p>
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 10,
      retry: (failureCount, error) => {
        const msg = error instanceof Error ? error.message : String(error);
        if (
          msg.includes("Unauthorized") ||
          msg.includes("trap") ||
          msg.includes("not implemented")
        ) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

function AppContent() {
  const { identity, isInitializing } = useInternetIdentity();
  const { profile, profileLoading } = useIIProfile();
  const navigate = useNavigate();

  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  useEffect(() => {
    if (isInitializing || profileLoading) return;
    if (!identity && path !== "/login") {
      void navigate({ to: "/login" });
    } else if (identity && !profile && path !== "/setup-profile") {
      void navigate({ to: "/setup-profile" });
    } else if (
      identity &&
      profile &&
      (path === "/login" || path === "/setup-profile")
    ) {
      // If there is a pending referral but user already has a profile, show message and clear it
      const pendingReferral = sessionStorage.getItem("kle_pending_referral");
      if (pendingReferral) {
        sessionStorage.removeItem("kle_pending_referral");
        toast.info("Referral link used, but you're already registered.", {
          duration: 4000,
        });
      }
      void navigate({ to: "/" });
    }
  }, [identity, isInitializing, profile, profileLoading, path, navigate]);

  if (isInitializing || profileLoading) return <FullScreenSpinner />;

  return <Outlet />;
}

function RootLayout() {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const isAuthPage = AUTH_EXEMPT_PATHS.includes(path);

  return (
    <div
      className="battleground-bg flex flex-col min-h-screen"
      style={{ position: "relative", zIndex: 0 }}
    >
      {!isAuthPage && <Header />}
      <main
        className={`flex-1 overflow-x-hidden${!isAuthPage ? " pb-16 md:pb-0" : ""}`}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<PageLoadingSpinner />}>
          <AppContent />
        </Suspense>
      </main>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <BottomNavBar />}
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const tournamentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tournaments",
  component: TournamentsPage,
});

const tournamentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tournament/$id",
  component: TournamentDetailPage,
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wallet",
  component: WalletPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const rulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rules",
  component: RulesPage,
});

const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support",
  component: SupportPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const earnRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/earn",
  component: EarnPage,
});

const myMatchesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-matches",
  component: MyMatchesPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const setupProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setup-profile",
  component: ProfileSetupPage,
});

const refRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ref/",
  component: ReferralRedirectPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  tournamentsRoute,
  tournamentDetailRoute,
  walletRoute,
  profileRoute,
  rulesRoute,
  supportRoute,
  adminRoute,
  earnRoute,
  myMatchesRoute,
  loginRoute,
  setupProfileRoute,
  refRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SplashScreen />
      <BanNotification />
      <VpnBlocker />
      <NotificationPoller />
      <Suspense fallback={<PageLoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="top-right" richColors />
      <InstallPrompt />
      <PushNotificationManager />
    </QueryClientProvider>
  );
}

export default App;
