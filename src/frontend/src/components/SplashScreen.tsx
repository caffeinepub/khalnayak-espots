import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const DURATION_MS = 8000; // 8 seconds auto-redirect

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("pwa_splash_shown");
    if (alreadyShown) return;

    setVisible(true);
    sessionStorage.setItem("pwa_splash_shown", "true");

    // Progress bar animation
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / DURATION_MS) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(progressInterval);
    }, 50);

    const fadeTimer = setTimeout(() => setFading(true), DURATION_MS - 600);
    const hideTimer = setTimeout(() => setVisible(false), DURATION_MS);

    return () => {
      clearInterval(progressInterval);
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

      {/* Corner accent lines */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 40,
          height: 40,
          borderTop: "2px solid rgba(0,255,136,0.5)",
          borderLeft: "2px solid rgba(0,255,136,0.5)",
          borderRadius: "4px 0 0 0",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 40,
          height: 40,
          borderTop: "2px solid rgba(0,255,136,0.5)",
          borderRight: "2px solid rgba(0,255,136,0.5)",
          borderRadius: "0 4px 0 0",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 20,
          width: 40,
          height: 40,
          borderBottom: "2px solid rgba(0,255,136,0.3)",
          borderLeft: "2px solid rgba(0,255,136,0.3)",
          borderRadius: "0 0 0 4px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 20,
          width: 40,
          height: 40,
          borderBottom: "2px solid rgba(0,255,136,0.3)",
          borderRight: "2px solid rgba(0,255,136,0.3)",
          borderRadius: "0 0 4px 0",
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
          width: "min(600px, 95vw)",
          height: "min(350px, 55vw)",
          background:
            "radial-gradient(ellipse, rgba(0,255,136,0.14) 0%, rgba(0,255,136,0.05) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main content block */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          zIndex: 1,
          animation:
            "splashContentIn 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) both",
          textAlign: "center",
        }}
      >
        {/* Crown + Fire row */}
        <div
          style={{
            fontSize: "clamp(22px, 5.5vw, 32px)",
            lineHeight: 1,
            letterSpacing: "0.3em",
            paddingLeft: "0.3em",
            animation: "splashBounce 1.6s ease-in-out 0s infinite",
          }}
        >
          👑🔥👑
        </div>

        {/* KL TOURNAMENTS headline */}
        <div style={{ position: "relative" }}>
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 9vw, 58px)",
              color: "#00FF88",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              lineHeight: 1,
              margin: 0,
              animation: "khalnayakGlow 1.8s ease-in-out infinite",
            }}
          >
            KL TOURNAMENTS
          </h1>
          {/* Neon underline */}
          <div
            style={{
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #00FF88, transparent)",
              boxShadow: "0 0 10px rgba(0,255,136,0.8)",
              borderRadius: 2,
              marginTop: 6,
              animation: "underlineExpand 0.8s ease-out 0.5s both",
            }}
          />
        </div>

        {/* KHALNAYAK secondary brand */}
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(16px, 4.5vw, 24px)",
            color: "#cccccc",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          KHALNAYAK ESPORTS
        </p>

        {/* KL ESPORTS LIFE */}
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(12px, 3vw, 16px)",
            color: "rgba(0,255,136,0.75)",
            letterSpacing: "0.22em",
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
            fontSize: "clamp(10px, 2.5vw, 13px)",
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#777777",
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
            marginTop: 4,
          }}
        >
          {(["🎮", "🏆", "🔫"] as const).map((icon, i) => (
            <span
              key={icon}
              style={{
                fontSize: "clamp(22px, 5.5vw, 34px)",
                display: "inline-block",
                animation: `splashBounce 1.2s ease-in-out ${i * 0.18}s infinite`,
              }}
            >
              {icon}
            </span>
          ))}
        </div>

        {/* Live clock */}
        <SplashClock />
      </div>

      {/* Loading bar — bottom of screen */}
      <div
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(300px, 82vw)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 11,
              color: "rgba(0,255,136,0.6)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Loading...
          </p>
          <p
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 10,
              color: "rgba(0,255,136,0.5)",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            {Math.round(progress)}%
          </p>
        </div>
        <div
          style={{
            height: "3px",
            background: "rgba(0,255,136,0.12)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #00FF88, #9d4edd)",
              boxShadow:
                "0 0 10px rgba(0,255,136,0.9), 0 0 20px rgba(0,255,136,0.4)",
              borderRadius: "999px",
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');

        @keyframes splashContentIn {
          0% { opacity: 0; transform: scale(0.82) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
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
              0 0 65px rgba(0,255,136,0.95),
              0 0 130px rgba(0,255,136,0.55);
          }
        }
        @keyframes splashBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-10px) scale(1.15); }
          60% { transform: translateY(-5px) scale(1.05); }
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
        @keyframes underlineExpand {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
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
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(0,255,136,0.3)",
        borderRadius: 8,
        marginTop: 6,
        boxShadow: "0 0 12px rgba(0,255,136,0.08)",
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
