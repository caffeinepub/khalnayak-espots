import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";
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
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";

// ── Lazy-loaded pages (System 3: Performance Optimization) ───────────────────
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
const RegisterPage = React.lazy(() =>
  import("./pages/RegisterPage").then((m) => ({ default: m.RegisterPage })),
);

// ── Page loading spinner ─────────────────────────────────────────────────────
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

// ── QueryClient with optimized caching (System 3) ────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes default
      gcTime: 1000 * 60 * 10, // garbage collect after 10 min
      retry: (failureCount, error) => {
        // Don't retry on authorization or trap errors from the canister
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

// Define the root route
const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-16 md:pb-0 overflow-x-hidden">
        <Suspense fallback={<PageLoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BottomNavBar />
    </div>
  ),
});

// Define individual routes
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

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

// Create the route tree
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
  registerRoute,
]);

// Create the router
const router = createRouter({ routeTree });

// Register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
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
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}

export default App;
