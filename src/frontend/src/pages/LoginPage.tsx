import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Loader2, Shield } from "lucide-react";

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
          background: "rgba(10,10,10,0.88)",
          border: "1.5px solid rgba(0,255,136,0.25)",
          borderRadius: 18,
          boxShadow:
            "0 0 40px rgba(0,255,136,0.08), 0 8px 40px rgba(0,0,0,0.7)",
          padding: "2.5rem 2rem",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/assets/generated/kl-esports-life-logo-transparent.dim_400x300.png"
            alt="KL Esports Life"
            className="w-20 h-20 object-contain mb-3"
            style={{ filter: "drop-shadow(0 0 12px rgba(0,255,136,0.7))" }}
          />
          <h1
            className="text-2xl font-bold tracking-widest uppercase"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: "linear-gradient(90deg, #00FF88, #9d4edd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            KL Esports Life
          </h1>
          <p
            className="text-xs tracking-widest mt-1"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'Rajdhani', sans-serif",
            }}
          >
            DOMINATE THE BATTLEGROUND
          </p>
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

          <Button
            data-ocid="login.primary_button"
            className="w-full h-12 text-base font-bold tracking-widest uppercase"
            disabled={isLoggingIn}
            onClick={() => login()}
            style={{
              background: isLoggingIn
                ? "rgba(0,255,136,0.3)"
                : "linear-gradient(90deg, #00FF88, #9d4edd)",
              color: "#0a0a0a",
              border: "none",
              borderRadius: 10,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.8rem",
              boxShadow: isLoggingIn ? "none" : "0 0 20px rgba(0,255,136,0.4)",
              transition: "all 0.3s ease",
            }}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "🔐 Login with Internet Identity"
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
