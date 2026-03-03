import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useAutoSetupProfile,
  useGetCallerWallet,
  useIsCallerAdmin,
} from "@/hooks/useQueries";
import { formatCurrency } from "@/utils/format";
import { Link } from "@tanstack/react-router";
import { LogOut, Menu, Shield, Trophy, User, Wallet } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { identity, login, clear } = useInternetIdentity();
  const { data: wallet } = useGetCallerWallet();
  const { data: isAdmin } = useIsCallerAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Automatically create profile + wallet for new users on first login
  useAutoSetupProfile();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/tournaments", label: "Tournaments" },
    { to: "/rules", label: "Rules" },
    { to: "/support", label: "Support" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Trophy className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-display glow-cyan">
            KHALNAYAK
          </span>
          <span className="text-2xl font-bold font-display text-secondary">
            ESPOTS
          </span>
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
          {identity ? (
            <>
              {/* Wallet Balance */}
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

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border border-primary/30"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wallet" className="cursor-pointer">
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallet
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin"
                          className="cursor-pointer text-primary"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={clear}
                    className="cursor-pointer text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={login}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Login
            </Button>
          )}

          {/* Mobile Menu */}
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
                {identity && (
                  <>
                    <hr className="border-border" />
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
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        Admin Panel
                      </Link>
                    )}
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
