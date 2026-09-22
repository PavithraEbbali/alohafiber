'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

/**
 * 3D tilt on mouse-move, reserved for the plan/pricing cards.
 * Also drives a --mx/--my pointer position that the card uses for its
 * specular highlight. Disabled on touch devices and under reduced motion.
 */
export function TiltCard({
  children,
  className = '',
  max = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * max * 2;
        const ry = (px - 0.5) * max * 2;

        el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
        el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
        el.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.015,1.015,1.015)`;
      });
    };

    const onEnter = () => el.classList.add('is-tilting');
    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      el.classList.remove('is-tilting');
      el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '0%');
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max, reduced]);

  return (
    <div
      ref={ref}
      className={`tilt-root group/tilt relative h-full ${className}`}
      style={{ '--mx': '50%', '--my': '0%' } as React.CSSProperties}
    >
      {children}
      {glare ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx) var(--my), rgba(255,255,255,.16), transparent 62%)',
          }}
        />
      ) : null}
    </div>
  );
}

export default TiltCard;
