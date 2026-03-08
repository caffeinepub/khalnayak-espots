import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to target over `duration` ms.
 * Returns the current display value (formatted as string).
 */
export function useCountUp(
  target: number,
  duration = 1500,
  formatter?: (n: number) => string,
): string {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }
    startRef.current = null;

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - (1 - progress) ** 4;
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  if (formatter) return formatter(value);
  return value.toLocaleString("en-IN");
}
