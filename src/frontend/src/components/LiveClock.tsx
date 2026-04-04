import { useEffect, useRef, useState } from "react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getISTTime(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 5.5 * 3600000);
}

function formatIST(ist: Date): { date: string; time: string } {
  const day = DAYS[ist.getDay()];
  const dd = String(ist.getDate()).padStart(2, "0");
  const month = MONTHS_SHORT[ist.getMonth()];
  const yyyy = ist.getFullYear();
  let hh = ist.getHours();
  const mm = String(ist.getMinutes()).padStart(2, "0");
  const ss = String(ist.getSeconds()).padStart(2, "0");
  const ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12 || 12;
  const hhStr = String(hh).padStart(2, "0");
  return {
    date: `${day}, ${dd} ${month} ${yyyy}`,
    time: `${hhStr}:${mm}:${ss} ${ampm}`,
  };
}

export function LiveClock() {
  const [timeData, setTimeData] = useState(() => formatIST(getISTTime()));
  const [pulse, setPulse] = useState(false);
  const prevSecRef = useRef(-1);

  useEffect(() => {
    const tick = () => {
      const ist = getISTTime();
      const sec = ist.getSeconds();
      if (sec !== prevSecRef.current) {
        prevSecRef.current = sec;
        setTimeData(formatIST(ist));
        setPulse(true);
        setTimeout(() => setPulse(false), 300);
      }
    };
    tick();
    const id = setInterval(tick, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @keyframes liveDotBlink {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #FF4444, 0 0 12px #FF4444; }
          50% { opacity: 0.25; box-shadow: 0 0 2px #FF4444; }
        }
        @keyframes clockGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(0,255,136,0.8), 0 0 16px rgba(0,255,136,0.4); }
          50% { text-shadow: 0 0 14px rgba(0,255,136,1), 0 0 28px rgba(0,255,136,0.7), 0 0 40px rgba(0,255,136,0.3); }
        }
        @keyframes secondScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .clock-time-pulse {
          animation: secondScale 0.3s ease-out;
        }
        .clock-time-base {
          animation: clockGlow 1s ease-in-out infinite;
        }
      `}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 14px",
          background: "rgba(0,0,0,0.03)",
          border: "1px solid rgba(0,255,136,0.18)",
          borderRadius: 12,
          margin: "0 16px 12px 16px",
          flexWrap: "wrap",
          rowGap: 4,
        }}
        data-ocid="home.live_clock.panel"
      >
        {/* LIVE badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#FF4444",
              display: "inline-block",
              animation: "liveDotBlink 1s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 10,
              fontWeight: 800,
              color: "#FF4444",
              letterSpacing: "0.12em",
            }}
          >
            LIVE
          </span>
        </div>

        {/* Divider */}
        <span
          style={{
            width: 1,
            height: 18,
            background: "rgba(0,255,136,0.25)",
            flexShrink: 0,
          }}
        />

        {/* Date */}
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(11px, 2.5vw, 13px)",
            color: "#444444",
            fontWeight: 600,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          {timeData.date}
        </span>

        <span
          style={{
            color: "rgba(0,255,136,0.5)",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          —
        </span>

        {/* Time digits with per-second animation */}
        <span
          className={`clock-time-base${pulse ? " clock-time-pulse" : ""}`}
          style={{
            fontFamily: "'Courier New', 'Roboto Mono', monospace",
            fontSize: "clamp(12px, 3.2vw, 16px)",
            color: "#00FF88",
            fontWeight: 800,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          {timeData.time}
        </span>
      </div>
    </>
  );
}
