import { Link, useRouter } from "@tanstack/react-router";
import { Coins, House, Trophy, User } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: House, ocid: "bottom_nav.home.tab" },
  {
    to: "/tournaments",
    label: "Tournaments",
    icon: Trophy,
    ocid: "bottom_nav.tournaments.tab",
  },
  { to: "/earn", label: "Earn", icon: Coins, ocid: "bottom_nav.earn.tab" },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
    ocid: "bottom_nav.profile.tab",
  },
] as const;

export function BottomNavBar() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden safe-area-bottom"
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid rgba(0, 255, 136, 0.18)",
      }}
      data-ocid="bottom_nav.panel"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map(({ to, label, icon: Icon, ocid }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 min-h-[44px] min-w-[44px] transition-all duration-200 relative"
              style={{
                color: active ? "#00FF88" : "#888888",
                filter: active
                  ? "drop-shadow(0 0 8px rgba(0, 255, 136, 0.8))"
                  : "none",
                WebkitTapHighlightColor: "transparent",
              }}
              data-ocid={ocid}
              aria-current={active ? "page" : undefined}
            >
              {/* Active indicator dot */}
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{
                    background: "#00FF88",
                    boxShadow: "0 0 6px rgba(0, 255, 136, 0.9)",
                  }}
                />
              )}
              <Icon
                strokeWidth={1.5}
                style={{ width: 26, height: 26, flexShrink: 0 }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: active ? 600 : 400,
                  letterSpacing: "0.04em",
                  lineHeight: 1.2,
                  fontFamily: "var(--font-display, 'Rajdhani', sans-serif)",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area spacer for devices with home indicator */}
      <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
    </nav>
  );
}
