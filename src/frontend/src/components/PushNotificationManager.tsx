import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Bell, Gift, Trophy, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Hook ──────────────────────────────────────────────────────────────────────

export function usePushNotifications() {
  const isSupported = typeof window !== "undefined" && "Notification" in window;

  const [permission, setPermission] = useState<NotificationPermission>(
    isSupported ? Notification.permission : "denied",
  );

  // Keep permission in sync
  useEffect(() => {
    if (!isSupported) return;
    setPermission(Notification.permission);
  }, [isSupported]);

  // Listen for SW messages (BACK_ONLINE, etc.)
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "BACK_ONLINE") {
        toast.success("You're back online! 🌐", {
          description: "Your connection has been restored.",
        });
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);
    return () =>
      navigator.serviceWorker.removeEventListener("message", handleMessage);
  }, []);

  const sendLocalNotification = useCallback(
    (title: string, body: string, url?: string) => {
      if (!isSupported || Notification.permission !== "granted") return;

      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SHOW_NOTIFICATION",
          title,
          body,
          url: url ?? "/",
        });
      } else {
        new Notification(title, {
          body,
          icon: "/assets/generated/pwa-icon-192.dim_192x192.png",
        });
      }
    },
    [isSupported],
  );

  return { isSupported, permission, sendLocalNotification };
}

// ── Component ─────────────────────────────────────────────────────────────────

export function PushNotificationManager() {
  const { identity } = useInternetIdentity();
  const { isSupported } = usePushNotifications();
  const [showDialog, setShowDialog] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (!identity || !isSupported || hasShownRef.current) return;

    const alreadyAsked = localStorage.getItem("push_permission_asked");
    if (alreadyAsked) return;

    if (Notification.permission !== "default") return;

    hasShownRef.current = true;

    // Delay slightly to not overwhelm user on login
    const timer = setTimeout(() => {
      setShowDialog(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setSlideIn(true)),
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [identity, isSupported]);

  async function handleEnable() {
    localStorage.setItem("push_permission_asked", "true");
    setSlideIn(false);
    setTimeout(() => setShowDialog(false), 300);

    try {
      const result = await Notification.requestPermission();
      if (result === "granted") {
        toast.success("Notifications enabled! 🔔", {
          description: "You'll get tournament alerts and prize updates.",
        });
      } else {
        toast.info("Notifications blocked", {
          description: "You can enable them later in browser settings.",
        });
      }
    } catch {
      toast.error("Could not request notification permission.");
    }
  }

  function handleLater() {
    localStorage.setItem("push_permission_asked", "true");
    setSlideIn(false);
    setTimeout(() => setShowDialog(false), 300);
  }

  if (!showDialog) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Dismiss notification dialog"
        onClick={handleLater}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") handleLater();
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1200,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          transition: "opacity 0.3s ease",
          opacity: slideIn ? 1 : 0,
        }}
      />

      {/* Dialog card */}
      <div
        data-ocid="push.dialog"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: slideIn
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -48%) scale(0.95)",
          zIndex: 1201,
          width: "min(440px, calc(100vw - 32px))",
          background: "#0a0a0a",
          border: "1px solid rgba(0,245,255,0.35)",
          borderRadius: "20px",
          boxShadow:
            "0 0 60px rgba(0,245,255,0.15), 0 0 0 1px rgba(0,245,255,0.05)",
          overflow: "hidden",
          transition:
            "transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.3s ease",
          opacity: slideIn ? 1 : 0,
        }}
      >
        {/* Top gradient bar */}
        <div
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #00f5ff, #ff006e, transparent)",
          }}
        />

        <div style={{ padding: "28px 24px 24px" }}>
          {/* Dismiss */}
          <button
            type="button"
            data-ocid="push.close_button"
            onClick={handleLater}
            style={{
              position: "absolute",
              top: "14px",
              right: "18px",
              background: "transparent",
              border: "none",
              color: "rgba(148,163,184,0.6)",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Dismiss notification prompt"
          >
            <X size={16} />
          </button>

          {/* Bell icon header */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(0,245,255,0.1)",
                border: "1px solid rgba(0,245,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(0,245,255,0.25)",
              }}
            >
              <Bell
                size={28}
                style={{
                  color: "#00f5ff",
                  filter: "drop-shadow(0 0 6px rgba(0,245,255,0.7))",
                }}
              />
            </div>
          </div>

          {/* Text */}
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "16px",
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              margin: "0 0 10px",
              letterSpacing: "1.5px",
              textShadow: "0 0 12px rgba(0,245,255,0.3)",
            }}
          >
            Stay Updated!
          </h2>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "14px",
              color: "rgba(148,163,184,0.85)",
              textAlign: "center",
              lineHeight: 1.6,
              margin: "0 0 24px",
            }}
          >
            Get notified about tournament start times, score updates, and prize
            credits
          </p>

          {/* Feature icons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            {[
              { Icon: Trophy, label: "Tournament Reminders", color: "#00f5ff" },
              { Icon: Bell, label: "Score Updates", color: "#a855f7" },
              { Icon: Gift, label: "Prize Credits", color: "#ff006e" },
            ].map(({ Icon, label, color }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    background: `${color}18`,
                    border: `1px solid ${color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(148,163,184,0.7)",
                    textAlign: "center",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Button
              data-ocid="push.confirm_button"
              onClick={handleEnable}
              style={{
                width: "100%",
                background: "rgba(0,245,255,0.15)",
                border: "1px solid #00f5ff",
                color: "#00f5ff",
                fontFamily: "'Orbitron', monospace",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textShadow: "0 0 8px rgba(0,245,255,0.5)",
                boxShadow: "0 0 16px rgba(0,245,255,0.15)",
                cursor: "pointer",
                height: "44px",
              }}
              className="hover:bg-[rgba(0,245,255,0.25)] transition-all"
            >
              <Bell className="h-4 w-4 mr-2" />
              ENABLE NOTIFICATIONS
            </Button>
            <Button
              data-ocid="push.cancel_button"
              variant="ghost"
              onClick={handleLater}
              style={{
                width: "100%",
                color: "rgba(148,163,184,0.6)",
                fontSize: "13px",
                cursor: "pointer",
                height: "40px",
              }}
              className="hover:text-white/70 transition-all"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
