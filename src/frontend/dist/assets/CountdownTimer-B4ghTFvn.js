import { r as reactExports, as as getTimeRemaining, j as jsxRuntimeExports } from "./index-CDAki4Zg.js";
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
  CountdownTimer as C
};
