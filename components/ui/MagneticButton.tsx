'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

type Variant = 'ember' | 'ghost' | 'light' | 'outline';

const VARIANTS: Record<Variant, string> = {
  ember:
    'bg-ember text-white shadow-glowC hover:shadow-[0_16px_50px_-10px_rgba(255,75,51,.7)]',
  light:
    'bg-white text-navy-700 shadow-lift hover:shadow-[0_16px_44px_-14px_rgba(1,33,69,.45)]',
  ghost:
    'bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md hover:bg-white/[0.18]',
  outline:
    'bg-transparent text-navy-700 ring-1 ring-inset ring-navy-700/20 hover:ring-navy-700/45 hover:bg-azure-50',
};

/**
 * Magnetic CTA. The wrapper tracks the pointer and pulls the button toward it,
 * with the label trailing at a lower factor for a parallax feel.
 * Pointer handling is skipped entirely on touch and under reduced-motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'ember',
  className = '',
  strength = 0.32,
  ariaLabel,
  type = 'button',
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  strength?: number;
  ariaLabel?: string;
  type?: 'button' | 'submit';
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const moverRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const mover = moverRef.current;
    const label = labelRef.current;
    if (!wrap || !mover || !label) return;

    if (window.matchMedia('(hover: none)').matches) return;

    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mover.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
        label.style.transform = `translate3d(${dx * strength * 0.4}px, ${dy * strength * 0.4}px, 0)`;
      });
    };

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      mover.style.transform = 'translate3d(0,0,0)';
      label.style.transform = 'translate3d(0,0,0)';
    };

    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', reset);
    return () => {
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength, reduced]);

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-[box-shadow,background-color,color] duration-300 ease-silk';

  const inner = (
    <span
      ref={moverRef}
      className="inline-flex transition-transform duration-500 ease-silk will-change-transform"
    >
      <span className={`${base} ${VARIANTS[variant]} ${className}`}>
        <span
          ref={labelRef}
          className="inline-flex items-center gap-2 transition-transform duration-500 ease-silk will-change-transform"
        >
          {children}
        </span>
      </span>
    </span>
  );

  return (
    <span ref={wrapRef} className="inline-flex p-1.5">
      {href ? (
        <a href={href} aria-label={ariaLabel} className="inline-flex rounded-full">
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} aria-label={ariaLabel} className="inline-flex rounded-full">
          {inner}
        </button>
      )}
    </span>
  );
}

export default MagneticButton;
