'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { useInView, usePrefersReducedMotion } from '@/lib/hooks';

/* -------------------------------------------------------------------------
 *  Reveal — fade + rise on scroll.
 * ---------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------
 *  RevealHeading — per-word mask-and-rise for headlines.
 * ---------------------------------------------------------------------- */
export function RevealHeading({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 55,
  accentFrom,
  accentClassName = 'text-sunset-400',
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Index of the first word that should take the accent colour. */
  accentFrom?: number;
  accentClassName?: string;
}) {
  const ref = useInView<HTMLHeadingElement>({ threshold: 0.2 });
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="word-reveal">
          <span
            style={{ '--word-delay': `${delay + i * stagger}ms` } as React.CSSProperties}
            className={accentFrom !== undefined && i >= accentFrom ? accentClassName : undefined}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}

/* -------------------------------------------------------------------------
 *  Wipe — clip-path transition used between major service sections.
 *
 *  The observer MUST sit on an outer, unclipped element. A clip-path of
 *  inset(0 0 100%) reduces the element's visible area to zero, and
 *  IntersectionObserver accounts for clipping — so an observer attached to the
 *  clipped node itself never reports an intersection and the section stays
 *  hidden forever. Anything nested inside it (including Reveal children) is
 *  clipped too, which blanks the whole section. Keep the ref on `.wipe-root`.
 * ---------------------------------------------------------------------- */
export function Wipe({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useInView<HTMLDivElement>({ rootMargin: '0px 0px -8% 0px' });
  return (
    <div ref={ref} className="wipe-root">
      <div className={`wipe ${className}`} style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  Stagger — grid entrance. Children animate in sequence.
 * ---------------------------------------------------------------------- */
export function Stagger({
  children,
  className = '',
  step = 90,
  baseDelay = 0,
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
  baseDelay?: number;
}) {
  const ref = useInView<HTMLDivElement>({ threshold: 0.1 });
  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          className="reveal h-full"
          style={{ '--reveal-delay': `${baseDelay + i * step}ms` } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  Parallax — depth drift on background layers. rAF-throttled, transform-only.
 * ---------------------------------------------------------------------- */
export function Parallax({
  children,
  speed = 0.18,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let visible = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) tick();
      },
      { rootMargin: '120px 0px' },
    );
    io.observe(el);

    const tick = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!visible) return;
        const rect = el.getBoundingClientRect();
        const centre = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-centre * speed).toFixed(2)}px, 0)`;
      });
    };

    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick, { passive: true });
    tick();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, reduced]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  Marquee — infinite ticker. Duplicated track, CSS-only, pauses on hover.
 * ---------------------------------------------------------------------- */
export function Marquee({
  items,
  duration = 42,
  className = '',
  itemClassName = '',
  reverse = false,
  marker = 'dot',
}: {
  items: string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
  reverse?: boolean;
  /** Leading glyph before each item. */
  marker?: 'dot' | 'check';
}) {
  const track = [...items, ...items];
  return (
    <div className={`marquee-mask group relative overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={
          {
            '--marquee-duration': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap px-6 ${itemClassName}`}
            aria-hidden={i >= items.length}
          >
            {marker === 'check' ? (
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 shrink-0 text-sunset-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m4.5 12.5 4.6 4.5L19.5 7" />
              </svg>
            ) : (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sunset-400" />
            )}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
