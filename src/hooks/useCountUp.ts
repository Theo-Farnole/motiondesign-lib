import React from "react";

/**
 * Animates from 0 to target over durationMs using requestAnimationFrame.
 * Uses ease-out so the count slows as it approaches the target.
 */
export function useCountUp(
  target: number,
  durationMs: number = 1200,
  enabled: boolean = true
): number {
  const [count, setCount] = React.useState(0);
  const startTimeRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!enabled || target <= 0) {
      setCount(target);
      return;
    }

    const easeOutQuart = (t: number): number => 1 - (1 - t) ** 4;

    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutQuart(progress);
      const value = Math.round(eased * target);
      setCount(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    setCount(0);
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, durationMs, enabled]);

  return count;
}
