import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("pwa_splash_shown");
    if (alreadyShown) return;

    setVisible(true);
    sessionStorage.setItem("pwa_splash_shown", "true");

    const fadeTimer = setTimeout(() => setFading(true), 2200);
    const hideTimer = setTimeout(() => setVisible(false), 2800);

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
        transition: "opacity 0.6s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Atmospheric grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Center logo — slide down + fade in */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          zIndex: 1,
          animation:
            "splashSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        }}
      >
        {/* Pulsing glow ring */}
        <div style={{ position: "relative", display: "inline-flex" }}>
          <div
            style={{
              position: "absolute",
              inset: "-24px",
              borderRadius: "50%",
              border: "1px solid rgba(0,255,136,0.15)",
              animation: "splash-pulse-ring 2s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "-10px",
              borderRadius: "50%",
              border: "1.5px solid rgba(0,255,136,0.4)",
              boxShadow: "0 0 32px rgba(0,255,136,0.3)",
              animation: "splash-glow-ring 2s ease-in-out infinite",
            }}
          />
          {/* Logo circle container */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(0,255,136,0.06)",
              border: "2px solid rgba(0,255,136,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(0,255,136,0.2)",
            }}
          >
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 900,
                fontSize: 36,
                color: "#00FF88",
                textShadow:
                  "0 0 20px rgba(0,255,136,1), 0 0 40px rgba(0,255,136,0.6)",
                letterSpacing: "-2px",
                lineHeight: 1,
              }}
            >
              KL
            </span>
          </div>
        </div>

        {/* Brand name */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(18px, 5vw, 26px)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                color: "#00FF88",
                textShadow:
                  "0 0 15px rgba(0,255,136,0.9), 0 0 30px rgba(0,255,136,0.5)",
              }}
            >
              KL
            </span>{" "}
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
          </div>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(148,163,184,0.7)",
              marginTop: 8,
            }}
          >
            India's Premier Gaming Platform
          </p>
        </div>

        {/* Live clock on splash screen */}
        <SplashClock />
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
            background: "rgba(0,255,136,0.15)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #00FF88, #9d4edd)",
              boxShadow: "0 0 8px rgba(0,255,136,0.8)",
              borderRadius: "999px",
              animation: "splash-load-bar 2.2s linear forwards",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes splashSlideIn {
          0% { opacity: 0; transform: translateY(-32px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes splash-pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.12); opacity: 0.1; }
        }
        @keyframes splash-glow-ring {
          0%, 100% { box-shadow: 0 0 24px rgba(0,255,136,0.35); }
          50% { box-shadow: 0 0 40px rgba(0,255,136,0.65); }
        }
        @keyframes splash-load-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes splashLiveDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #FF4444; }
          50% { opacity: 0.2; box-shadow: 0 0 2px #FF4444; }
        }
        @keyframes splashClockGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(0,255,136,0.8), 0 0 16px rgba(0,255,136,0.4); }
          50% { text-shadow: 0 0 14px rgba(0,255,136,1), 0 0 28px rgba(0,255,136,0.7); }
        }
        @keyframes splashClockScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// Embedded clock for splash screen
function SplashClock() {
  const [time, setTime] = useState("");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let prevSec = -1;
    const tick = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utc + 5.5 * 3600000);
      let hh = ist.getHours();
      const mm = String(ist.getMinutes()).padStart(2, "0");
      const ss = String(ist.getSeconds()).padStart(2, "0");
      const ampm = hh >= 12 ? "PM" : "AM";
      hh = hh % 12 || 12;
      const timeStr = `${String(hh).padStart(2, "0")}:${mm}:${ss} ${ampm}`;
      setTime(timeStr);
      if (ist.getSeconds() !== prevSec) {
        prevSec = ist.getSeconds();
        setPulse(true);
        setTimeout(() => setPulse(false), 300);
      }
    };
    tick();
    const id = setInterval(tick, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 14px",
        background: "rgba(0,0,0,0.4)",
        border: "1px solid rgba(0,255,136,0.25)",
        borderRadius: 8,
        marginTop: 8,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#FF4444",
          display: "inline-block",
          animation: "splashLiveDot 1s ease-in-out infinite",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 9,
          fontWeight: 800,
          color: "#FF4444",
          letterSpacing: "0.1em",
          flexShrink: 0,
        }}
      >
        LIVE
      </span>
      <span
        style={{
          width: 1,
          height: 14,
          background: "rgba(0,255,136,0.25)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 15,
          color: "#00FF88",
          fontWeight: 800,
          letterSpacing: "0.06em",
          display: "inline-block",
          animation: pulse
            ? "splashClockScale 0.3s ease-out, splashClockGlow 1s ease-in-out infinite"
            : "splashClockGlow 1s ease-in-out infinite",
        }}
      >
        {time}
      </span>
    </div>
  );
}
