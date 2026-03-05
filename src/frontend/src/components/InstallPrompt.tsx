import { Button } from "@/components/ui/button";
import { Download, Smartphone, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Extend window for PWA install prompt
declare global {
  interface Window {
    __pwaInstallPrompt?: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const pageVisitCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Check if already dismissed or installed
    const dismissed = localStorage.getItem("pwa_install_dismissed");
    if (dismissed) return;

    // Check if running as standalone (already installed)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      promptRef.current = promptEvent;
      window.__pwaInstallPrompt = promptEvent;

      // Track page visits via a counter incremented on each navigation
      pageVisitCountRef.current += 1;

      // Show after 30s or 2+ page visits
      if (pageVisitCountRef.current >= 2) {
        scheduleShow();
      } else {
        timerRef.current = setTimeout(() => {
          scheduleShow();
        }, 30_000);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowBanner(false);
      localStorage.setItem("pwa_install_dismissed", "installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function scheduleShow() {
    const dismissed = localStorage.getItem("pwa_install_dismissed");
    if (dismissed) return;
    setShowBanner(true);
    // Trigger slide-in animation after mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSlideIn(true));
    });
  }

  async function handleInstall() {
    const prompt = promptRef.current;
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem("pwa_install_dismissed", "installed");
    } else {
      localStorage.setItem("pwa_install_dismissed", "dismissed");
    }
    setShowBanner(false);
    promptRef.current = null;
    window.__pwaInstallPrompt = undefined;
  }

  function handleDismiss() {
    localStorage.setItem("pwa_install_dismissed", "dismissed");
    setSlideIn(false);
    setTimeout(() => setShowBanner(false), 350);
    promptRef.current = null;
    window.__pwaInstallPrompt = undefined;
  }

  if (!showBanner || isInstalled) return null;

  return (
    <>
      {/* Backdrop (subtle) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          pointerEvents: "none",
        }}
      />

      {/* Bottom Sheet Banner */}
      <div
        data-ocid="install.dialog"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
          padding: "0 16px 24px",
          transform: slideIn ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            background: "#0a0a0a",
            border: "1px solid rgba(0,245,255,0.35)",
            borderRadius: "16px",
            boxShadow:
              "0 -4px 40px rgba(0,245,255,0.15), 0 0 0 1px rgba(0,245,255,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Top cyan accent line */}
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #00f5ff, #ff006e, transparent)",
            }}
          />

          <div style={{ padding: "20px" }}>
            {/* Dismiss button */}
            <button
              type="button"
              data-ocid="install.close_button"
              onClick={handleDismiss}
              style={{
                position: "absolute",
                top: "16px",
                right: "24px",
                background: "transparent",
                border: "none",
                color: "rgba(148,163,184,0.7)",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Dismiss install prompt"
            >
              <X size={18} />
            </button>

            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
              {/* App icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "12px",
                  background: "rgba(0,245,255,0.1)",
                  border: "1px solid rgba(0,245,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/assets/generated/pwa-icon-512-transparent.dim_512x512.png"
                  alt="Khalnayak Espots"
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 6px rgba(0,245,255,0.5))",
                  }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#00f5ff",
                    textShadow: "0 0 10px rgba(0,245,255,0.5)",
                    margin: "0 0 4px",
                    letterSpacing: "1px",
                  }}
                >
                  Add to Home Screen
                </h3>
                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "13px",
                    color: "rgba(148,163,184,0.85)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Get the full app experience — faster loading, offline support,
                  push notifications
                </p>
              </div>
            </div>

            {/* Feature pills */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "16px",
                flexWrap: "wrap",
              }}
            >
              {[
                { icon: "⚡", label: "Faster Loading" },
                { icon: "📵", label: "Offline Support" },
                { icon: "🔔", label: "Notifications" },
              ].map((f) => (
                <div
                  key={f.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "rgba(0,245,255,0.07)",
                    border: "1px solid rgba(0,245,255,0.2)",
                    borderRadius: "999px",
                    padding: "3px 10px",
                    fontSize: "11px",
                    color: "rgba(226,232,240,0.8)",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "18px",
              }}
            >
              <Button
                data-ocid="install.primary_button"
                onClick={handleInstall}
                style={{
                  flex: 1,
                  background: "rgba(0,245,255,0.15)",
                  border: "1px solid #00f5ff",
                  color: "#00f5ff",
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textShadow: "0 0 8px rgba(0,245,255,0.6)",
                  boxShadow: "0 0 16px rgba(0,245,255,0.2)",
                  cursor: "pointer",
                }}
                className="hover:bg-[rgba(0,245,255,0.25)] transition-all"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                INSTALL APP
              </Button>
              <Button
                data-ocid="install.cancel_button"
                variant="ghost"
                onClick={handleDismiss}
                style={{
                  flex: 1,
                  border: "1px solid rgba(148,163,184,0.2)",
                  color: "rgba(148,163,184,0.7)",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
                className="hover:text-white hover:border-white/30 transition-all"
              >
                Not Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Small install button for the Header
export function HeaderInstallButton() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("pwa_install_dismissed");
    if (dismissed) return;

    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const handler = (e: Event) => {
      e.preventDefault();
      window.__pwaInstallPrompt = e as BeforeInstallPromptEvent;
      setAvailable(true);
    };

    // Already stored?
    if (window.__pwaInstallPrompt) {
      setAvailable(true);
    }

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    const prompt = window.__pwaInstallPrompt;
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    localStorage.setItem(
      "pwa_install_dismissed",
      outcome === "accepted" ? "installed" : "dismissed",
    );
    window.__pwaInstallPrompt = undefined;
    setAvailable(false);
  }

  if (!available) return null;

  return (
    <Button
      data-ocid="header.install_button"
      variant="ghost"
      size="icon"
      onClick={handleInstall}
      title="Install App"
      style={{
        color: "#00f5ff",
        border: "1px solid rgba(0,245,255,0.3)",
        background: "rgba(0,245,255,0.08)",
      }}
      className="hover:bg-[rgba(0,245,255,0.18)] transition-all"
    >
      <Download className="h-4 w-4" />
    </Button>
  );
}
