import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only show once per session
    const alreadyShown = sessionStorage.getItem("pwa_splash_shown");
    if (alreadyShown) return;

    setVisible(true);
    sessionStorage.setItem("pwa_splash_shown", "true");

    // Start fade-out at 2s
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2000);

    // Fully hide at 2.5s (after fade transition)
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      data-ocid="splash.modal"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        transition: "opacity 0.5s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Background grid atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          zIndex: 1,
        }}
      >
        {/* Shield logo with pulsing glow */}
        <div style={{ position: "relative", display: "inline-flex" }}>
          {/* Outer pulsing ring */}
          <div
            style={{
              position: "absolute",
              inset: "-20px",
              borderRadius: "50%",
              border: "1px solid rgba(0,245,255,0.15)",
              animation: "splash-pulse-ring 2s ease-in-out infinite",
            }}
          />
          {/* Inner glow ring */}
          <div
            style={{
              position: "absolute",
              inset: "-8px",
              borderRadius: "50%",
              border: "1.5px solid rgba(0,245,255,0.4)",
              boxShadow: "0 0 32px rgba(0,245,255,0.3)",
              animation: "splash-glow-ring 2s ease-in-out infinite",
            }}
          />
          {/* Logo image */}
          <img
            src="/assets/generated/kl-esports-life-logo-transparent.dim_400x300.png"
            alt="Khalnayak Espots"
            style={{
              width: 160,
              height: 160,
              objectFit: "contain",
              filter:
                "drop-shadow(0 0 20px rgba(0,245,255,0.7)) drop-shadow(0 0 40px rgba(0,245,255,0.3))",
              animation: "splash-glow-ring 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Tagline under logo */}
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(148,163,184,0.8)",
            marginTop: "4px",
            textAlign: "center",
          }}
        >
          India's Premier Gaming Platform
        </p>
      </div>

      {/* Loading bar */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(280px, 80vw)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            height: "2px",
            background: "rgba(0,245,255,0.15)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #00f5ff, #ff006e)",
              boxShadow: "0 0 8px rgba(0,245,255,0.8)",
              borderRadius: "999px",
              animation: "splash-load-bar 2s linear forwards",
            }}
          />
        </div>
      </div>

      {/* Keyframe animations injected inline */}
      <style>{`
        @keyframes splash-pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.12); opacity: 0.1; }
        }
        @keyframes splash-glow-ring {
          0%, 100% { box-shadow: 0 0 24px rgba(0,245,255,0.35); }
          50% { box-shadow: 0 0 40px rgba(0,245,255,0.65); }
        }
        @keyframes splash-load-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
