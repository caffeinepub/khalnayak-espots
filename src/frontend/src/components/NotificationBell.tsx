import { useNotifications } from "@/hooks/useNotifications";
import type { KLNotification } from "@/lib/firestore";
import { useNavigate } from "@tanstack/react-router";
import { Bell, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function getNotifIcon(type: KLNotification["type"]): string {
  switch (type) {
    case "roomDetails":
      return "\uD83D\uDD10";
    case "matchLive":
      return "\uD83D\uDD25";
    case "resultDeclared":
      return "\uD83D\uDCCA";
    case "timeUpdated":
      return "\u23F0";
    case "matchCancelled":
      return "\u274C";
    default:
      return "\uD83D\uDD14";
  }
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function NotificationBell() {
  const { notifications, unreadCount, markRead, markAllRead } =
    useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        aria-label="Notifications"
        onClick={() => setOpen((o) => !o)}
        data-ocid="home.topbar.notifications.button"
        style={{
          background: "rgba(0,0,0,0.04)",
          border: "1px solid #E0E0E0",
          borderRadius: 10,
          padding: 8,
          color: "#666666",
          cursor: "pointer",
          lineHeight: 0,
          position: "relative",
        }}
      >
        <Bell strokeWidth={1.5} style={{ width: 20, height: 20 }} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              background: "#FF4444",
              color: "#fff",
              borderRadius: "50%",
              width: 18,
              height: 18,
              fontSize: 10,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Orbitron', sans-serif",
              border: "2px solid #fff",
            }}
            data-ocid="home.topbar.notifications.badge"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          data-ocid="home.notifications.panel"
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            width: "min(340px, 90vw)",
            background: "#FFFFFF",
            border: "1px solid #E0E0E0",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid #F0F0F0",
            }}
          >
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 800,
                fontSize: 13,
                color: "#111827",
              }}
            >
              \uD83D\uDD14 NOTIFICATIONS
            </span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  data-ocid="home.notifications.mark_all_read.button"
                  style={{
                    fontSize: 11,
                    color: "#00FF88",
                    fontWeight: 700,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                >
                  Mark All Read
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                data-ocid="home.notifications.close.button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                  lineHeight: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Notification list */}
          <div style={{ maxHeight: 360, overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <div
                style={{
                  padding: 32,
                  textAlign: "center",
                  color: "#999",
                  fontFamily: "'Rajdhani', sans-serif",
                }}
                data-ocid="home.notifications.empty_state"
              >
                <p style={{ fontSize: 28, marginBottom: 8 }}>\uD83D\uDD15</p>
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.slice(0, 20).map((notif, idx) => (
                <button
                  type="button"
                  key={notif.id}
                  data-ocid={`home.notifications.item.${idx + 1}`}
                  onClick={() => {
                    if (notif.id) markRead(notif.id);
                    setOpen(false);
                    void navigate({ to: "/tournaments" });
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    borderBottom: "1px solid #F5F5F5",
                    borderTop: "none",
                    borderRight: "none",
                    cursor: "pointer",
                    background: notif.read ? "#FFFFFF" : "rgba(0,255,136,0.04)",
                    borderLeft: notif.read ? "none" : "3px solid #00FF88",
                    transition: "background 0.15s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {getNotifIcon(notif.type)}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#111827",
                          margin: "0 0 2px 0",
                        }}
                      >
                        {notif.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: 12,
                          color: "#555",
                          margin: "0 0 4px 0",
                          lineHeight: 1.4,
                        }}
                      >
                        {notif.message}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: 11,
                          color: "#999",
                          margin: 0,
                        }}
                      >
                        {timeAgo(notif.createdAt)}
                      </p>
                    </div>
                    {!notif.read && (
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#00FF88",
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
