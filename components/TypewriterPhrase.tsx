'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Typewriter rotator — types out a sequence of short value-prop phrases,
 * pauses, deletes, and types the next one.
 *
 * Tasteful pacing for a sensitive context:
 *   - 70ms per character typing
 *   - 40ms per character deleting
 *   - 2.5s pause when phrase is fully shown
 *
 * SSR-friendly: first phrase renders statically on the server, animation
 * starts after mount. Respects prefers-reduced-motion (stays static).
 */
export default function TypewriterPhrase({
  phrases,
  className = '',
}: {
  phrases: string[];
  className?: string;
}) {
  const initialPhrase = phrases[0] || '';
  const [text, setText] = useState(initialPhrase);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<'static' | 'deleting' | 'typing'>('static');
  const reducedMotion = useRef(false);

  // Detect reduced-motion preference once on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion.current) return;

    // After 3s on the initial static phrase, start deleting
    const t = setTimeout(() => setPhase('deleting'), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 'static' || reducedMotion.current) return;

    if (phase === 'deleting') {
      if (text.length === 0) {
        const nextIdx = (phraseIdx + 1) % phrases.length;
        setPhraseIdx(nextIdx);
        setPhase('typing');
        return;
      }
      const t = setTimeout(() => setText(text.slice(0, -1)), 40);
      return () => clearTimeout(t);
    }

    if (phase === 'typing') {
      const target = phrases[phraseIdx];
      if (text === target) {
        const t = setTimeout(() => setPhase('deleting'), 2500);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setText(target.slice(0, text.length + 1)), 70);
      return () => clearTimeout(t);
    }
  }, [text, phase, phraseIdx, phrases]);

  return (
    <span className={`inline ${className}`} aria-live="polite" aria-atomic="true">
      {text}
      <span className="inline-block w-[3px] h-[0.85em] bg-current ml-1 align-middle animate-blink-caret motion-reduce:hidden" aria-hidden="true" />
    </span>
  );
}
