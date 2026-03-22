import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useIIProfile } from "@/hooks/useIIProfile";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useAutoSetupProfile,
  useGetCallerWallet,
  useIsCallerAdmin,
} from "@/hooks/useQueries";
import { useTokens } from "@/hooks/useTokens";
import { formatCurrency } from "@/utils/format";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Coins,
  LogOut,
  Menu,
  Shield,
  Swords,
  User,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { HeaderInstallButton } from "./InstallPrompt";

// ─── KL Esports Life Text Logo ─────────────────────────────────────────────────
export function KLEsportsLogo({ className }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
        fontWeight: 900,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        lineHeight: 1,
      }}
    >
      <span
        style={{
          color: "#00FF88",
          textShadow:
            "0 0 10px rgba(0,255,136,0.9), 0 0 20px rgba(0,255,136,0.5)",
        }}
      >
        KL
      </span>
      <span
        style={{
          background: "linear-gradient(90deg, #9d4edd, #c77dff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 6px rgba(157,78,221,0.7))",
        }}
      >
        Esports Life
      </span>
    </span>
  );
}

export function Header() {
  const { identity, clear } = useInternetIdentity();
  const { profile } = useIIProfile();
  const { data: wallet } = useGetCallerWallet();
  const { data: isAdmin } = useIsCallerAdmin();
  const { balance: tokenBalance } = useTokens();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useAutoSetupProfile();

  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const displayName = profile?.display_name || (isLoggedIn ? "Player" : null);
  const displayInitial = displayName
    ? displayName.charAt(0).toUpperCase()
    : null;

  const handleLogout = () => {
    clear();
    setMobileMenuOpen(false);
    void router.navigate({ to: "/login" });
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/tournaments", label: "Tournaments" },
    { to: "/earn", label: "🪙 Earn" },
    { to: "/rules", label: "Rules" },
    { to: "/support", label: "Support" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          {/* Text logo — always visible */}
          <KLEsportsLogo className="text-base sm:text-lg" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <HeaderInstallButton />

          {isLoggedIn ? (
            <>
              <Link to="/earn">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center gap-2 border-yellow-500/40 bg-yellow-950/20 hover:bg-yellow-900/30 text-yellow-400"
                >
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <span className="font-mono font-bold">{tokenBalance}</span>
                </Button>
              </Link>

              <Link to="/wallet">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center gap-2 border-primary/30"
                >
                  <Wallet className="h-4 w-4" />
                  <span className="font-mono">
                    {wallet ? formatCurrency(wallet.balance) : "₹0.00"}
                  </span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border border-primary/30 font-bold text-primary"
                    data-ocid="header.open_modal_button"
                  >
                    {displayInitial ? (
                      <span className="text-sm font-bold">
                        {displayInitial}
                      </span>
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56"
                  data-ocid="header.dropdown_menu"
                >
                  {profile && (
                    <>
                      <DropdownMenuLabel className="text-xs">
                        <p className="font-semibold text-sm text-foreground">
                          {profile.display_name}
                        </p>
                        <p className="text-muted-foreground font-normal truncate">
                          FF UID: {profile.freefire_uid}
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="cursor-pointer"
                      data-ocid="header.link"
                    >
                      <User className="mr-2 h-4 w-4" /> My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/wallet"
                      className="cursor-pointer"
                      data-ocid="header.link"
                    >
                      <Wallet className="mr-2 h-4 w-4" /> Wallet
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/my-matches"
                      className="cursor-pointer text-primary"
                      data-ocid="header.my_matches.link"
                    >
                      <Swords className="mr-2 h-4 w-4" /> My Matches
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/earn"
                      className="cursor-pointer text-yellow-400"
                      data-ocid="header.link"
                    >
                      <Coins className="mr-2 h-4 w-4" /> Earn Tokens (
                      {tokenBalance} 🪙)
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin"
                          className="cursor-pointer text-primary"
                          data-ocid="header.link"
                        >
                          <Shield className="mr-2 h-4 w-4" /> Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive"
                    data-ocid="header.delete_button"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="header.primary_button"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    activeProps={{ className: "text-primary" }}
                  >
                    {link.label}
                  </Link>
                ))}
                {isLoggedIn && (
                  <>
                    <hr className="border-border" />
                    {profile && (
                      <div className="px-1 py-1.5">
                        <p className="font-semibold text-foreground">
                          {profile.display_name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          FF: {profile.freefire_nickname}
                        </p>
                      </div>
                    )}
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/wallet"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      Wallet
                    </Link>
                    <Link
                      to="/my-matches"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      data-ocid="header.my_matches.link"
                    >
                      ⚔️ My Matches
                    </Link>
                    <Link
                      to="/earn"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium transition-colors text-yellow-400 hover:text-yellow-300"
                    >
                      🪙 Earn Tokens ({tokenBalance})
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-lg font-medium text-destructive hover:text-destructive/80 transition-colors text-left"
                    >
                      Logout
                    </button>
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <hr className="border-border" />
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
