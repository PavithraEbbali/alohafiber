'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

/**
 * Spotlight — a soft light that follows the pointer across a group of cards.
 *
 * One listener per group rather than one per card: the handler writes --mx/--my
 * onto each child, and each card paints its own radial highlight from those
 * variables. That keeps the effect to a single rAF-throttled pointermove no
 * matter how many cards are in the grid.
 *
 * Cards opt in by rendering a layer that reads var(--mx)/var(--my) — see the
 * `.spotlight-layer` class in globals.css.
 */
export function Spotlight({
  children,
  className = '',
  /** Radius of the highlight in px. */
  size = 380,
}: {
  children: ReactNode;
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        for (const card of root.querySelectorAll<HTMLElement>('[data-spotlight]')) {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${e.clientX - r.left}px`);
          card.style.setProperty('--my', `${e.clientY - r.top}px`);
        }
      });
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (const card of root.querySelectorAll<HTMLElement>('[data-spotlight]')) {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      }
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ '--spot-size': `${size}px` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export default Spotlight;
