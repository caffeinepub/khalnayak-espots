/**
 * VpnBlocker — Full-screen overlay shown when VPN/proxy is detected.
 * Also exports useVpnStatus() for other components to check VPN state.
 */

import { Button } from "@/components/ui/button";
import { useVpnDetection } from "@/hooks/useVpnDetection";
import { Loader2, RefreshCw, ShieldX } from "lucide-react";
import { createContext, useContext } from "react";

// ── Context ────────────────────────────────────────────────────────────────────

interface VpnStatusContextValue {
  isVpnDetected: boolean;
  isChecking: boolean;
  recheck: () => void;
}

const VpnStatusContext = createContext<VpnStatusContextValue>({
  isVpnDetected: false,
  isChecking: false,
  recheck: () => {},
});

export function useVpnStatus(): VpnStatusContextValue {
  return useContext(VpnStatusContext);
}

// ── VpnBlocker component ───────────────────────────────────────────────────────

interface VpnBlockerProps {
  /** Pass true when the user is in an active match to enable periodic re-checks */
  isMatchActive?: boolean;
}

export function VpnBlocker({ isMatchActive = false }: VpnBlockerProps) {
  const { isVpnDetected, isChecking, recheck } = useVpnDetection({
    isMatchActive,
  });

  return (
    <VpnStatusContext.Provider value={{ isVpnDetected, isChecking, recheck }}>
      {isVpnDetected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.97) 0%, rgba(10,0,0,0.99) 100%)",
          }}
          data-ocid="vpn.modal"
        >
          {/* Animated background pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #ff0000 0, #ff0000 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />

          <div
            className="relative max-w-lg w-full rounded-2xl p-8 text-center space-y-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,0,0,0.95) 0%, rgba(20,5,5,0.95) 100%)",
              border: "1px solid rgba(255,50,50,0.4)",
              boxShadow:
                "0 0 40px rgba(255,0,0,0.2), 0 0 80px rgba(255,0,0,0.1), inset 0 1px 0 rgba(255,100,100,0.1)",
            }}
          >
            {/* Pulsing icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    background: "rgba(255,0,0,0.15)",
                    animationDuration: "2s",
                  }}
                />
                <div
                  className="relative flex items-center justify-center w-24 h-24 rounded-full"
                  style={{
                    background: "rgba(255,0,0,0.1)",
                    border: "2px solid rgba(255,50,50,0.5)",
                    boxShadow: "0 0 20px rgba(255,0,0,0.3)",
                  }}
                >
                  <ShieldX
                    className="h-12 w-12"
                    style={{ color: "rgb(255,80,80)" }}
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2
                className="text-2xl font-bold font-display tracking-wider"
                style={{ color: "rgb(255,80,80)" }}
              >
                VPN/Proxy Detected
              </h2>
              <div
                className="h-px w-32 mx-auto"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,50,50,0.6), transparent)",
                }}
              />
            </div>

            {/* Message */}
            <div className="space-y-3">
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(255,200,200,0.9)" }}
              >
                Khalnayak Espots mein{" "}
                <span
                  style={{ color: "rgb(255,80,80)" }}
                  className="font-semibold"
                >
                  VPN ya Proxy allowed nahi hai.
                </span>
              </p>
              <p className="text-sm" style={{ color: "rgba(200,150,150,0.8)" }}>
                Please apna VPN band karo aur page refresh karo.
              </p>
            </div>

            {/* Warning box */}
            <div
              className="rounded-lg p-4 text-left space-y-2"
              style={{
                background: "rgba(255,0,0,0.08)",
                border: "1px solid rgba(255,50,50,0.2)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "rgba(255,120,120,0.9)" }}
              >
                Kyun block kiya gaya?
              </p>
              <ul
                className="text-xs space-y-1"
                style={{ color: "rgba(200,150,150,0.8)" }}
              >
                <li>• Fair play ensure karne ke liye</li>
                <li>• Cheating aur identity spoofing rokne ke liye</li>
                <li>• Tournament integrity maintain karne ke liye</li>
              </ul>
            </div>

            {/* Check Again button */}
            <Button
              onClick={recheck}
              disabled={isChecking}
              className="w-full h-12 font-semibold text-base"
              style={{
                background: isChecking
                  ? "rgba(100,0,0,0.5)"
                  : "linear-gradient(135deg, rgba(200,0,0,0.8) 0%, rgba(255,50,50,0.9) 100%)",
                border: "1px solid rgba(255,50,50,0.5)",
                color: "white",
              }}
              data-ocid="vpn.primary_button"
            >
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Check Again
                </>
              )}
            </Button>

            <p className="text-xs" style={{ color: "rgba(150,100,100,0.7)" }}>
              VPN band karne ke baad "Check Again" press karo
            </p>
          </div>
        </div>
      )}
    </VpnStatusContext.Provider>
  );
}
