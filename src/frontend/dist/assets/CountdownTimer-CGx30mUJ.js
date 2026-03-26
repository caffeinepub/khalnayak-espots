import { r as reactExports, j as jsxRuntimeExports, X, aI as getTimeRemaining } from "./index-ClVgYzE0.js";
import { g as getAdUnitId, A as ADMOB_CONFIG } from "./AdModal-LTaQi2It.js";
function InterstitialOverlay({
  isOpen,
  onDismiss
}) {
  const [skipCountdown, setSkipCountdown] = reactExports.useState(5);
  const [canSkip, setCanSkip] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isOpen) {
      setSkipCountdown(5);
      setCanSkip(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    setSkipCountdown(5);
    setCanSkip(false);
    timerRef.current = setInterval(() => {
      setSkipCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen]);
  if (!isOpen) return null;
  const adUnitId = getAdUnitId("interstitial");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: { backgroundColor: "rgba(0,0,0,0.95)" },
      "data-ocid": "admob.interstitial.modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden border border-zinc-700/50 bg-zinc-950", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-zinc-900 border-b border-zinc-800/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-500 uppercase tracking-widest", children: "Advertisement" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            canSkip ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onDismiss,
                className: "text-sm font-semibold text-primary hover:text-primary/80 px-3 py-1 rounded-lg border border-primary/40 transition-colors",
                "data-ocid": "admob.interstitial.close_button",
                children: "Skip Ad →"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full font-mono", children: [
              "Skip in ",
              skipCountdown,
              "s"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onDismiss,
                className: "text-zinc-600 hover:text-zinc-300 transition-colors p-1 rounded",
                "aria-label": "Close ad",
                "data-ocid": "admob.interstitial.cancel_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-[300px] flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black", children: window.adsbygoogle ? (
          /* Real ad slot */
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ins",
            {
              className: "adsbygoogle",
              style: { display: "block", width: "100%", minHeight: "300px" },
              "data-ad-client": ADMOB_CONFIG.PUBLISHER_ID,
              "data-ad-slot": adUnitId,
              "data-ad-format": "auto",
              "data-full-width-responsive": "true",
              ...{ "data-adtest": "on" }
            }
          )
        ) : (
          /* Styled mock ad for test/fallback */
          /* @__PURE__ */ jsxRuntimeExports.jsx(MockInterstitialContent, {})
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 bg-zinc-900 border-t border-zinc-800/50 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-600", children: "Sponsored content — close any time" }),
          canSkip && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onDismiss,
              className: "text-xs text-zinc-400 hover:text-zinc-200 underline transition-colors",
              "data-ocid": "admob.interstitial.confirm_button",
              children: "Continue to App →"
            }
          )
        ] })
      ] })
    }
  );
}
function MockInterstitialContent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4 px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-4xl",
        style: {
          background: "linear-gradient(135deg, #0ff2 0%, #0ff4 50%, #f0f2 100%)",
          border: "1px solid rgba(0,245,255,0.3)",
          boxShadow: "0 0 32px rgba(0,245,255,0.15)"
        },
        children: "🎮"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xl font-bold font-display text-white",
          style: { textShadow: "0 0 12px rgba(0,245,255,0.5)" },
          children: "Level Up Your Game!"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-400", children: "Discover more gaming apps and tournaments" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "inline-block px-6 py-2 rounded-full text-sm font-semibold text-black",
        style: {
          background: "linear-gradient(90deg, #00f5ff, #a855f7)",
          boxShadow: "0 0 16px rgba(0,245,255,0.3)"
        },
        children: "Play Now"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-[10px] text-zinc-600 tracking-widest uppercase",
        "aria-hidden": "true",
        children: "Test Ad — Google AdMob (Test Mode)"
      }
    )
  ] });
}
function CountdownTimer({
  targetTime,
  onExpire,
  className = "",
  compact = false
}) {
  const [timeLeft, setTimeLeft] = reactExports.useState(getTimeRemaining(targetTime));
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(targetTime);
      setTimeLeft(remaining);
      if (remaining.expired && onExpire) {
        onExpire();
        clearInterval(timer);
      }
    }, 1e3);
    return () => clearInterval(timer);
  }, [targetTime, onExpire]);
  if (timeLeft.expired) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, children: "Expired" });
  }
  if (compact) {
    if (timeLeft.days > 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className, children: [
        timeLeft.days,
        "d ",
        timeLeft.hours,
        "h"
      ] });
    }
    if (timeLeft.hours > 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className, children: [
        timeLeft.hours,
        "h ",
        timeLeft.minutes,
        "m"
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className, children: [
      timeLeft.minutes,
      "m ",
      timeLeft.seconds,
      "s"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-2 ${className}`, children: [
    timeLeft.days > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-card border border-primary/20 rounded-md px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary font-display", children: timeLeft.days }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase", children: "Days" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-card border border-primary/20 rounded-md px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary font-display", children: String(timeLeft.hours).padStart(2, "0") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase", children: "Hours" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-card border border-primary/20 rounded-md px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary font-display", children: String(timeLeft.minutes).padStart(2, "0") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase", children: "Mins" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-card border border-primary/20 rounded-md px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary font-display", children: String(timeLeft.seconds).padStart(2, "0") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase", children: "Secs" })
    ] })
  ] });
}
export {
  CountdownTimer as C,
  InterstitialOverlay as I
};
