import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { NotificationPoller } from "./components/NotificationPoller";
import { HomePage } from "./pages/HomePage";
import { TournamentsPage } from "./pages/TournamentsPage";
import { TournamentDetailPage } from "./pages/TournamentDetailPage";
import { WalletPage } from "./pages/WalletPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RulesPage } from "./pages/RulesPage";
import { SupportPage } from "./pages/SupportPage";
import { AdminPage } from "./pages/AdminPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
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
        <NotificationPoller />
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}

export default App;
