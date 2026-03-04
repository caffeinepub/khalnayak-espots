import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { BanNotification } from "./components/BanNotification";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NotificationPoller } from "./components/NotificationPoller";
import { Toaster } from "./components/ui/sonner";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import { AdminPage } from "./pages/AdminPage";
import { EarnPage } from "./pages/EarnPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { RulesPage } from "./pages/RulesPage";
import { SupportPage } from "./pages/SupportPage";
import { TournamentDetailPage } from "./pages/TournamentDetailPage";
import { TournamentsPage } from "./pages/TournamentsPage";
import { WalletPage } from "./pages/WalletPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
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
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
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
        <BanNotification />
        <NotificationPoller />
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}

export default App;
