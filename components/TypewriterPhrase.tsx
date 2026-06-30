'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Subtle typewriter rotator for short value-prop phrases.
 *
 * Designed for use under or beside the headline price (£1,499) — NOT on
 * the main page H1 (which would cause wrapping issues on long phrases).
 *
 * Calm pacing for a sensitive context. Respects prefers-reduced-motion.
 */
export default function TypewriterPhrase({
  phrases,
  className = '',
  typeSpeed = 110,
  deleteSpeed = 70,
  pauseMs = 4000,
}: {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}) {
  const initialPhrase = phrases[0] || '';
  const [text, setText] = useState(initialPhrase);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<'static' | 'deleting' | 'typing'>('static');
  const reducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion.current) return;

    // Longer initial hold so the static first phrase reads naturally
    const t = setTimeout(() => setPhase('deleting'), pauseMs + 1500);
    return () => clearTimeout(t);
  }, [pauseMs]);

  useEffect(() => {
    if (phase === 'static' || reducedMotion.current) return;

    if (phase === 'deleting') {
      if (text.length === 0) {
        const nextIdx = (phraseIdx + 1) % phrases.length;
        setPhraseIdx(nextIdx);
        setPhase('typing');
        return;
      }
      const t = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      return () => clearTimeout(t);
    }

    if (phase === 'typing') {
      const target = phrases[phraseIdx];
      if (text === target) {
        const t = setTimeout(() => setPhase('deleting'), pauseMs);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setText(target.slice(0, text.length + 1)), typeSpeed);
      return () => clearTimeout(t);
    }
  }, [text, phase, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseMs]);

  return (
    <span className={`inline ${className}`} aria-live="polite" aria-atomic="true">
      {text}
      <span className="inline-block w-[2px] h-[0.85em] bg-current ml-0.5 align-middle animate-blink-caret motion-reduce:hidden" aria-hidden="true" />
    </span>
  );
}
