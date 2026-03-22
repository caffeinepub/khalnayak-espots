import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Loader2, Shield } from "lucide-react";

function KLLoginLogo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      {/* Circle emblem */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(0,255,136,0.08)",
          border: "2px solid rgba(0,255,136,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 0 30px rgba(0,255,136,0.25), inset 0 0 20px rgba(0,255,136,0.05)",
          animation: "kl-logo-pulse 3s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: 28,
            color: "#00FF88",
            textShadow:
              "0 0 15px rgba(0,255,136,1), 0 0 30px rgba(0,255,136,0.6)",
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          KL
        </span>
      </div>
      {/* Brand name */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(16px, 5vw, 22px)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              color: "#00FF88",
              textShadow: "0 0 12px rgba(0,255,136,0.9)",
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
        </div>
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 11,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginTop: 4,
          }}
        >
          DOMINATE THE BATTLEGROUND
        </p>
      </div>
      <style>{`
        @keyframes kl-logo-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(0,255,136,0.25), inset 0 0 20px rgba(0,255,136,0.05); }
          50% { box-shadow: 0 0 50px rgba(0,255,136,0.45), inset 0 0 30px rgba(0,255,136,0.1); }
        }
      `}</style>
    </div>
  );
}

export function LoginPage() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div
      className="battleground-bg min-h-screen flex items-center justify-center px-4"
      style={{ position: "relative" }}
    >
      {/* Fire overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,100,0,0.18) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm"
        style={{
          background: "rgba(10,10,10,0.90)",
          border: "1.5px solid rgba(0,255,136,0.25)",
          borderRadius: 20,
          boxShadow: "0 0 60px rgba(0,255,136,0.1), 0 8px 40px rgba(0,0,0,0.8)",
          padding: "2.5rem 2rem",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <KLLoginLogo />
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(0,255,136,0.12)",
            marginBottom: "2rem",
          }}
        />

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4" style={{ color: "#00FF88" }} />
            <span
              className="text-sm tracking-wider"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'Rajdhani', sans-serif",
              }}
            >
              SECURE LOGIN
            </span>
          </div>

          {/* Primary Login Button */}
          <Button
            data-ocid="login.primary_button"
            className="w-full h-14 text-base font-bold tracking-widest uppercase"
            disabled={isLoggingIn}
            onClick={() => login()}
            style={{
              background: isLoggingIn
                ? "rgba(0,255,136,0.3)"
                : "linear-gradient(135deg, #00FF88 0%, #00cc66 60%, #9d4edd 100%)",
              color: "#0a0a0a",
              border: "none",
              borderRadius: 12,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.82rem",
              boxShadow: isLoggingIn
                ? "none"
                : "0 0 30px rgba(0,255,136,0.5), 0 4px 20px rgba(0,0,0,0.4)",
              transition: "all 0.3s ease",
              letterSpacing: "0.05em",
            }}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "🚀 Login with Internet Identity"
            )}
          </Button>

          <p
            className="text-center text-xs leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'Rajdhani', sans-serif",
              maxWidth: 260,
            }}
          >
            Face ID / Fingerprint / Passkey — No password needed
          </p>

          <div
            className="flex items-center gap-3 mt-2"
            style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}
          >
            <span>🔒 Blockchain-secured</span>
            <span>•</span>
            <span>🌐 Decentralized</span>
          </div>
        </div>
      </div>
    </div>
  );
}
