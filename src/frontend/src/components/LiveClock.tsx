import { useEffect, useState } from "react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getISTTime(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 5.5 * 3600000);
}

function formatIST(ist: Date): string {
  const day = DAYS[ist.getDay()];
  const dd = String(ist.getDate()).padStart(2, "0");
  const month = MONTHS[ist.getMonth()];
  const yyyy = ist.getFullYear();
  let hh = ist.getHours();
  const mm = String(ist.getMinutes()).padStart(2, "0");
  const ss = String(ist.getSeconds()).padStart(2, "0");
  const ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12 || 12;
  const hhStr = String(hh).padStart(2, "0");
  return `${day}, ${dd} ${month} ${yyyy} \u2014 ${hhStr}:${mm}:${ss} ${ampm}`;
}

export function LiveClock() {
  const [formatted, setFormatted] = useState(() => formatIST(getISTTime()));

  useEffect(() => {
    const tick = () => setFormatted(formatIST(getISTTime()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 16px",
        background: "rgba(0,255,136,0.04)",
        border: "1px solid rgba(0,255,136,0.2)",
        borderRadius: 12,
        margin: "0 16px 12px 16px",
      }}
      data-ocid="home.live_clock.panel"
    >
      {/* LIVE badge */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#00FF88",
            display: "inline-block",
            animation: "livePulse 1.5s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 10,
            fontWeight: 800,
            color: "#00FF88",
            letterSpacing: "0.1em",
          }}
        >
          LIVE
        </span>
      </div>

      {/* Divider */}
      <span
        style={{
          width: 1,
          height: 20,
          background: "rgba(0,255,136,0.3)",
          flexShrink: 0,
        }}
      />

      {/* Time */}
      <span
        style={{
          fontFamily: "'Courier New', 'Roboto Mono', monospace",
          fontSize: "clamp(11px, 3vw, 14px)",
          color: "#00FF88",
          fontWeight: 700,
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {formatted}
      </span>
    </div>
  );
}
