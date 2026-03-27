import { Link, useRouter } from "@tanstack/react-router";
import { Coins, House, Trophy, User } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "HOME", icon: House, ocid: "bottom_nav.home.tab" },
  {
    to: "/tournaments",
    label: "TOURN",
    icon: Trophy,
    ocid: "bottom_nav.tournaments.tab",
  },
  { to: "/earn", label: "EARN", icon: Coins, ocid: "bottom_nav.earn.tab" },
  {
    to: "/profile",
    label: "PROFILE",
    icon: User,
    ocid: "bottom_nav.profile.tab",
  },
] as const;

export function BottomNavBar() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const [tapped, setTapped] = useState<string | null>(null);

  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e0e0e0",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
      }}
      data-ocid="bottom_nav.panel"
      aria-label="Bottom navigation"
    >
      <div className="flex items-stretch justify-around" style={{ height: 60 }}>
        {navItems.map(({ to, label, icon: Icon, ocid }) => {
          const active = isActive(to);
          const isTapped = tapped === to;
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center justify-center flex-1 relative"
              style={{
                color: active ? "#00FF88" : "#666666",
                WebkitTapHighlightColor: "transparent",
                outline: "none",
                minHeight: 44,
                minWidth: 44,
                transform: isTapped ? "scale(0.9)" : "scale(1.0)",
                transition: "transform 0.1s ease",
                filter:
                  isTapped && active
                    ? "drop-shadow(0 0 12px rgba(0,255,136,1))"
                    : "none",
              }}
              data-ocid={ocid}
              aria-current={active ? "page" : undefined}
              onMouseDown={() => setTapped(to)}
              onMouseUp={() => setTapped(null)}
              onMouseLeave={() => setTapped(null)}
              onTouchStart={() => setTapped(to)}
              onTouchEnd={() => setTapped(null)}
            >
              {/* Active top indicator */}
              {active && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 28,
                    height: 2,
                    borderRadius: 2,
                    background: "#00FF88",
                    boxShadow:
                      "0 0 10px rgba(0,255,136,0.9), 0 0 20px rgba(0,255,136,0.5)",
                  }}
                />
              )}

              {/* Active background glow */}
              {active && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "2px 6px",
                    borderRadius: 10,
                    background: "rgba(0,255,136,0.08)",
                    pointerEvents: "none",
                  }}
                />
              )}

              <Icon
                strokeWidth={active ? 2 : 1.5}
                style={{
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  filter: active
                    ? "drop-shadow(0 0 8px rgba(0,255,136,0.9)) drop-shadow(0 0 16px rgba(0,255,136,0.5))"
                    : "none",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                  fontSize: "clamp(9px, 2.5vw, 10px)",
                  fontWeight: active ? 800 : 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: 3,
                  lineHeight: 1,
                  textShadow: active ? "0 0 8px rgba(0,255,136,0.7)" : "none",
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area spacer for notched devices */}
      <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
    </nav>
  );
}
