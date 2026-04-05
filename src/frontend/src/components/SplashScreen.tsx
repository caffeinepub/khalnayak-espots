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
        background:
          "linear-gradient(160deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        transition: "opacity 0.6s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
        overflow: "hidden",
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

      {/* Radial glow behind hero text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -58%)",
          width: "min(500px, 90vw)",
          height: "min(300px, 50vw)",
          background:
            "radial-gradient(ellipse, rgba(0,255,136,0.12) 0%, rgba(0,255,136,0.04) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main content block — slide in + scale */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 1,
          animation:
            "splashContentIn 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) both",
          textAlign: "center",
        }}
      >
        {/* Fire emojis row */}
        <div
          style={{
            fontSize: "clamp(20px, 5vw, 28px)",
            lineHeight: 1,
            letterSpacing: "0.5em",
            paddingLeft: "0.5em",
          }}
        >
          🔥🔥🔥
        </div>

        {/* KHALNAYAK hero text */}
        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(36px, 12vw, 72px)",
            color: "#00FF88",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: 1,
            margin: 0,
            animation: "khalnayakGlow 1.8s ease-in-out infinite",
          }}
        >
          KHALNAYAK
        </h1>

        {/* KL ESPORTS LIFE sub text */}
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(14px, 4vw, 20px)",
            color: "#e8e8e8",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          KL ESPORTS LIFE
        </p>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#888888",
            margin: 0,
          }}
        >
          India&apos;s Premier Gaming Platform
        </p>

        {/* Gaming icons with staggered bounce */}
        <div
          style={{
            display: "flex",
            gap: "clamp(16px, 4vw, 28px)",
            marginTop: 8,
          }}
        >
          {(["🎮", "🏆", "🔫"] as const).map((icon, i) => (
            <span
              key={icon}
              style={{
                fontSize: "clamp(24px, 6vw, 36px)",
                display: "inline-block",
                animation: `splashBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
              }}
            >
              {icon}
            </span>
          ))}
        </div>

        {/* Live clock */}
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
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 11,
            color: "rgba(0,255,136,0.6)",
            textAlign: "center",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Loading...
        </p>
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
        @keyframes splashContentIn {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes khalnayakGlow {
          0%, 100% {
            text-shadow:
              0 0 20px rgba(0,255,136,1),
              0 0 40px rgba(0,255,136,0.6),
              0 0 80px rgba(0,255,136,0.3);
          }
          50% {
            text-shadow:
              0 0 30px rgba(0,255,136,1),
              0 0 60px rgba(0,255,136,0.9),
              0 0 120px rgba(0,255,136,0.5);
          }
        }
        @keyframes splashBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-10px) scale(1.15); }
          60% { transform: translateY(-5px) scale(1.05); }
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
