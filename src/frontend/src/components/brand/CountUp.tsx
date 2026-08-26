import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Final numeric value to count to. */
  value: number;
  /** Number of decimal places. */
  decimals?: number;
  /** Text rendered before the number (e.g. "₹"). */
  prefix?: string;
  /** Text rendered after the number (e.g. "%", "M"). */
  suffix?: string;
  /** Animation duration in ms. */
  duration?: number;
  /** Delay before starting, in ms. */
  delay?: number;
  /** Group thousands with commas. */
  separator?: boolean;
  className?: string;
}

/**
 * Counts from 0 up to `value` once, when scrolled into view. Uses
 * requestAnimationFrame (transform-free, cheap) and honours
 * prefers-reduced-motion by rendering the final value immediately.
 */
export default function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1200,
  delay = 0,
  separator = false,
  className = "",
}: CountUpProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let timeout = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutCubic
        const eased = 1 - (1 - t) ** 3;
        setDisplay(value * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          timeout = window.setTimeout(run, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [value, duration, delay, reduce]);

  const formatted = (() => {
    const fixed = display.toFixed(decimals);
    if (!separator) return fixed;
    const [intPart, decPart] = fixed.split(".");
    const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decPart ? `${grouped}.${decPart}` : grouped;
  })();

  return (
    <span ref={ref} className={`rk-tnum ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
