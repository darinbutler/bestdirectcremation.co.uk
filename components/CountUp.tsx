'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Number that counts up from 0 to `value` when it first scrolls into view.
 * Used for prices (£1,499 ticks up from 0) to add a small moment of delight
 * on key conversion blocks. SSR-safe: renders the final value statically;
 * the animation runs on mount once the element enters the viewport.
 * Respects prefers-reduced-motion.
 */
export default function CountUp({
  value,
  prefix = '£',
  duration = 1400,
  className = '',
}: {
  value: number;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            setShown(0);
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // cubic-out
              setShown(Math.round(value * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{shown.toLocaleString()}
    </span>
  );
}
