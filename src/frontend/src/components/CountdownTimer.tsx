import { getTimeRemaining } from "@/utils/format";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetTime: bigint;
  onExpire?: () => void;
  className?: string;
  compact?: boolean;
}

export function CountdownTimer({
  targetTime,
  onExpire,
  className = "",
  compact = false,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(targetTime);
      setTimeLeft(remaining);

      if (remaining.expired && onExpire) {
        onExpire();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, onExpire]);

  if (timeLeft.expired) {
    return <span className={className}>Expired</span>;
  }

  if (compact) {
    if (timeLeft.days > 0) {
      return (
        <span className={className}>
          {timeLeft.days}d {timeLeft.hours}h
        </span>
      );
    }
    if (timeLeft.hours > 0) {
      return (
        <span className={className}>
          {timeLeft.hours}h {timeLeft.minutes}m
        </span>
      );
    }
    return (
      <span className={className}>
        {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    );
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      {timeLeft.days > 0 && (
        <div className="flex flex-col items-center bg-card border border-primary/20 rounded-md px-3 py-2">
          <span className="text-2xl font-bold text-primary font-display">
            {timeLeft.days}
          </span>
          <span className="text-xs text-muted-foreground uppercase">Days</span>
        </div>
      )}
      <div className="flex flex-col items-center bg-card border border-primary/20 rounded-md px-3 py-2">
        <span className="text-2xl font-bold text-primary font-display">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-xs text-muted-foreground uppercase">Hours</span>
      </div>
      <div className="flex flex-col items-center bg-card border border-primary/20 rounded-md px-3 py-2">
        <span className="text-2xl font-bold text-primary font-display">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-xs text-muted-foreground uppercase">Mins</span>
      </div>
      <div className="flex flex-col items-center bg-card border border-primary/20 rounded-md px-3 py-2">
        <span className="text-2xl font-bold text-primary font-display">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="text-xs text-muted-foreground uppercase">Secs</span>
      </div>
    </div>
  );
}
