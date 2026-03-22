import { useIIProfile } from "@/hooks/useIIProfile";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetPlatformStats, useGetTournaments } from "@/hooks/useQueries";
import { decodeTournament, formatCurrency } from "@/utils/format";
import { Link } from "@tanstack/react-router";
import { Bell, User, Users, Zap } from "lucide-react";
import { toast } from "sonner";

// ─── KL Esports Life Logo Component ──────────────────────────────────────────

function KLLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const fontSize =
    size === "sm"
      ? "clamp(11px,3vw,13px)"
      : size === "lg"
        ? "clamp(20px,6vw,28px)"
        : "clamp(14px,4vw,17px)";
  return (
    <span
      style={{
        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
        fontWeight: 900,
        fontSize,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <span
        style={{
          background: "linear-gradient(90deg, #00FF88, #00cc66)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 8px rgba(0,255,136,0.8))",
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
          filter: "drop-shadow(0 0 8px rgba(157,78,221,0.7))",
        }}
      >
        Esports Life
      </span>
    </span>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { profile } = useIIProfile();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-4"
      style={{
        height: 60,
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,255,136,0.18)",
      }}
      data-ocid="home.topbar.panel"
    >
      {/* Left: Logo */}
      <Link
        to="/"
        className="flex items-center gap-2"
        data-ocid="home.topbar.logo.link"
        style={{ textDecoration: "none" }}
      >
        <KLLogo size="md" />
      </Link>

      {/* Right: Notification + Profile/Login */}
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => toast.info("No new notifications")}
              data-ocid="home.topbar.notifications.button"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: 8,
                color: "#888",
                cursor: "pointer",
                transition: "all 0.2s",
                lineHeight: 0,
              }}
            >
              <Bell strokeWidth={1.5} style={{ width: 20, height: 20 }} />
            </button>

            <Link
              to="/profile"
              aria-label="Profile"
              data-ocid="home.topbar.profile.link"
              style={{
                background: "rgba(0,255,136,0.08)",
                border: "1px solid rgba(0,255,136,0.35)",
                borderRadius: 10,
                padding: 8,
                color: "#00FF88",
                cursor: "pointer",
                transition: "all 0.2s",
                lineHeight: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <User strokeWidth={1.5} style={{ width: 18, height: 18 }} />
              {profile?.display_name && (
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    maxWidth: 80,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {profile.display_name}
                </span>
              )}
            </Link>
          </>
        ) : (
          <button
            type="button"
            onClick={() => login()}
            disabled={isLoggingIn}
            data-ocid="home.topbar.login.button"
            style={{
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(10px, 2.5vw, 12px)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "8px 14px",
              borderRadius: 10,
              border: "none",
              cursor: isLoggingIn ? "wait" : "pointer",
              background: isLoggingIn
                ? "rgba(0,255,136,0.3)"
                : "linear-gradient(135deg, #00FF88 0%, #00cc66 100%)",
              color: "#0A0A0A",
              boxShadow: isLoggingIn ? "none" : "0 0 16px rgba(0,255,136,0.5)",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
              opacity: isLoggingIn ? 0.7 : 1,
            }}
          >
            {isLoggingIn ? "Connecting..." : "🔐 Login"}
          </button>
        )}
      </div>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <section
      className="relative px-4 py-10 flex flex-col items-center text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,255,136,0.04) 0%, rgba(10,10,10,0) 60%)",
        minHeight: 280,
      }}
    >
      {/* Background glow blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -40,
          left: "50%",
          transform: "translateX(-50%)",
          width: 280,
          height: 180,
          background:
            "radial-gradient(ellipse, rgba(0,255,136,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main heading */}
      <h1
        style={{
          fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.5rem, 7vw, 2.8rem)",
          lineHeight: 1.1,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#FFFFFF",
          textShadow: "0 0 30px rgba(0,255,136,0.4), 0 2px 8px rgba(0,0,0,0.8)",
          marginBottom: 12,
          position: "relative",
          zIndex: 1,
        }}
        data-ocid="home.hero.heading"
      >
        🔥 DOMINATE THE
        <br />
        <span
          style={{
            background:
              "linear-gradient(90deg, #00FF88 0%, #00cc66 50%, #9d4edd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(0,255,136,0.6))",
          }}
        >
          BATTLEGROUND
        </span>
      </h1>

      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "clamp(13px, 3.5vw, 16px)",
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 28,
          position: "relative",
          zIndex: 1,
        }}
        data-ocid="home.hero.subtext"
      >
        India's Premier Free Fire Platform
      </p>

      {/* CTA Buttons */}
      <div
        className="flex flex-col items-center gap-3 w-full"
        style={{ maxWidth: 360, position: "relative", zIndex: 1 }}
      >
        {!isLoggedIn ? (
          /* Prominent Internet Identity login button */
          <button
            type="button"
            onClick={() => login()}
            disabled={isLoggingIn}
            data-ocid="home.hero.get_started.primary_button"
            style={{
              width: "100%",
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(12px, 3vw, 15px)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "15px 24px",
              borderRadius: 14,
              border: "none",
              cursor: isLoggingIn ? "wait" : "pointer",
              background: isLoggingIn
                ? "rgba(0,255,136,0.3)"
                : "linear-gradient(135deg, #00FF88 0%, #00cc66 60%, #9d4edd 100%)",
              color: "#0A0A0A",
              boxShadow: isLoggingIn
                ? "none"
                : "0 0 30px rgba(0,255,136,0.6), 0 4px 20px rgba(0,0,0,0.5)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: isLoggingIn ? 0.7 : 1,
            }}
          >
            <span style={{ fontSize: "1.1em" }}>🚀</span>
            {isLoggingIn
              ? "Connecting to Internet Identity..."
              : "Login with Internet Identity"}
          </button>
        ) : (
          /* Logged-in CTAs */
          <div className="flex items-center gap-3 w-full">
            <Link to="/tournaments" style={{ flex: 1 }}>
              <button
                type="button"
                style={{
                  width: "100%",
                  fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(11px, 2.8vw, 13px)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg, #00FF88 0%, #00cc66 100%)",
                  color: "#0A0A0A",
                  boxShadow:
                    "0 0 20px rgba(0,255,136,0.5), 0 4px 16px rgba(0,0,0,0.4)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Zap style={{ width: 14, height: 14 }} />
                PLAY NOW
              </button>
            </Link>
            <Link to="/rules" style={{ flex: 1 }}>
              <button
                type="button"
                style={{
                  width: "100%",
                  fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(11px, 2.8vw, 13px)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "12px 16px",
                  borderRadius: 12,
                  cursor: "pointer",
                  background: "transparent",
                  color: "#00FF88",
                  border: "2px solid rgba(0,255,136,0.5)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                📖 RULES
              </button>
            </Link>
          </div>
        )}

        {/* Small hint for unauthenticated users */}
        {!isLoggedIn && (
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.04em",
              textAlign: "center",
            }}
          >
            🔒 Face ID / Fingerprint / Passkey — No password needed
          </p>
        )}
      </div>
    </section>
  );
}

// ─── Stats Section ─────────────────────────────────────────────────────────────

function StatsSection() {
  const { data: platformStats } = useGetPlatformStats();
  const stats = [
    {
      label: "TOTAL PLAYERS",
      value: platformStats
        ? Number(platformStats.totalPlayers).toLocaleString()
        : "0",
      icon: "👥",
    },
    {
      label: "TOURNAMENTS",
      value: platformStats
        ? Number(platformStats.totalTournaments).toString()
        : "0",
      icon: "🏆",
    },
    {
      label: "PRIZE DISTRIBUTED",
      value: platformStats
        ? `₹${Number(platformStats.totalPrizeDistributed)}`
        : "₹0",
      icon: "💰",
    },
  ];
  return (
    <section className="px-4 pb-6" data-ocid="home.stats.section">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="gaming-card text-center"
            style={{ padding: "12px 8px" }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(11px, 3vw, 16px)",
                color: "#00FF88",
                textShadow: "0 0 10px rgba(0,255,136,0.5)",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 10,
                color: "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginTop: 2,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Upcoming Tournaments ──────────────────────────────────────────────────────

function UpcomingTournamentsSection() {
  const { data: tournaments } = useGetTournaments();

  const upcoming = tournaments
    ?.filter((t) => t.status === "upcoming")
    .map((t) => ({ ...t, ...decodeTournament(t) }))
    .slice(0, 2);

  const hasReal = upcoming && upcoming.length > 0;

  return (
    <section className="px-4 pb-6" data-ocid="home.upcoming.section">
      <div className="flex items-center justify-between mb-4">
        <h2
          style={{
            fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(13px, 3.5vw, 16px)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#FFFFFF",
          }}
          data-ocid="home.upcoming.heading"
        >
          📅 UPCOMING TOURNAMENTS
        </h2>
        <Link
          to="/tournaments"
          data-ocid="home.upcoming.view_all.link"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#00FF88",
            textDecoration: "none",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          View All →
        </Link>
      </div>

      <div className="space-y-3">
        {hasReal ? (
          upcoming!.map((t, idx) => {
            const idxNum = idx + 1;
            const entryFee = formatCurrency(t.entryFee);
            const maxTeams = Number(t.maxTeams);
            return (
              <TournamentCard
                key={t.id.toString()}
                name={t.name}
                schedule={`${entryFee} Entry`}
                entry={entryFee}
                teams={`0/${maxTeams} Teams`}
                to={`/tournament/${t.id.toString()}`}
                idx={idxNum}
              />
            );
          })
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "24px",
              color: "#666",
              fontFamily: "'Rajdhani', sans-serif",
            }}
          >
            <p style={{ fontSize: 32, marginBottom: 8 }}>🏆</p>
            <p style={{ fontSize: 16 }}>No upcoming tournaments yet</p>
          </div>
        )}
      </div>
    </section>
  );
}

function TournamentCard({
  name,
  schedule,
  entry,
  teams,
  to,
  idx,
}: {
  name: string;
  schedule: string;
  entry: string;
  teams: string;
  to: string;
  idx: number;
}) {
  return (
    <div
      className="rounded-[12px] p-4 transition-all duration-200"
      style={{
        background: "rgba(22,33,62,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(0,255,136,0.2)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
      data-ocid={`home.upcoming.item.${idx}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p
            style={{
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(13px, 3.5vw, 15px)",
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              marginBottom: 6,
              lineHeight: 1.3,
            }}
          >
            {name}
          </p>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.04em",
              marginBottom: 8,
            }}
          >
            {schedule} • {entry}
          </p>
          <div className="flex items-center gap-1">
            <Users style={{ width: 12, height: 12, color: "#9d4edd" }} />
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 12,
                color: "#9d4edd",
                fontWeight: 700,
              }}
            >
              {teams}
            </span>
          </div>
        </div>

        <Link
          to={to}
          data-ocid={`home.upcoming.register.${idx}.primary_button`}
          style={{ flexShrink: 0, alignSelf: "center" }}
        >
          <button
            type="button"
            style={{
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
              fontWeight: 800,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "9px 14px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #00FF88 0%, #00cc66 100%)",
              color: "#0A0A0A",
              boxShadow: "0 0 16px rgba(0,255,136,0.45)",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: 4,
              whiteSpace: "nowrap",
            }}
          >
            <Zap style={{ width: 12, height: 12 }} />
            REGISTER
          </button>
        </Link>
      </div>
    </div>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#0A0A0A", paddingBottom: 80 }}
    >
      <TopBar />
      <HeroSection />
      <StatsSection />
      <UpcomingTournamentsSection />
    </div>
  );
}
