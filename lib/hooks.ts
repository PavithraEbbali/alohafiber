'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/* ---------------------------------------------------------------------------
 *  Shared reveal sweep.
 *
 *  IntersectionObserver can miss an element entirely during a fast smooth
 *  scroll: if the element moves from below the viewport to above it within a
 *  single frame, `isIntersecting` is false at both samples and no callback
 *  ever reports it as seen, leaving the content invisible for good.
 *
 *  This is the backstop. One passive, rAF-throttled scroll listener for the
 *  whole page sweeps anything still pending and reveals whatever has reached or
 *  passed the viewport. Elements unregister as soon as they are shown.
 * ------------------------------------------------------------------------ */
type PendingEntry = { el: HTMLElement; show: (target: Element) => void };
const pending = new Set<PendingEntry>();
let sweepBound = false;
let sweepFrame = 0;

function sweep() {
  if (sweepFrame) cancelAnimationFrame(sweepFrame);
  sweepFrame = 0;
  if (!pending.size) return;
  // 0.88 mirrors the default `-12%` bottom rootMargin, so the backstop fires at
  // the same point the observer would and the choreography is unchanged.
  const trigger = window.innerHeight * 0.88;
  for (const entry of pending) {
    const r = entry.el.getBoundingClientRect();
    // Top edge has reached the trigger line, or the element is already past it.
    if (r.top < trigger) {
      entry.show(entry.el);
      pending.delete(entry);
    }
  }
}

function scheduleSweep() {
  // requestAnimationFrame callbacks never run while the tab is hidden, so an
  // rAF-only sweep would leave content unrevealed in a background tab (and in
  // headless/offscreen rendering). Run it synchronously in that case.
  if (document.visibilityState !== 'visible') {
    sweep();
    return;
  }
  if (sweepFrame) return;
  sweepFrame = requestAnimationFrame(sweep);
}

function registerPending(entry: PendingEntry) {
  pending.add(entry);
  if (!sweepBound) {
    sweepBound = true;
    window.addEventListener('scroll', scheduleSweep, { passive: true });
    window.addEventListener('resize', scheduleSweep, { passive: true });
  }
  scheduleSweep();
}

/**
 * Adds the `is-in` class once an element scrolls into view.
 * One shared observer contract, used by every reveal/wipe/draw animation so the
 * page never ships a second animation runtime.
 */
export function useInView<T extends HTMLElement>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {},
): RefObject<T | null> {
  // threshold defaults to 0 on purpose. A non-zero ratio can never be reached
  // by an element taller than the viewport, which would leave that whole
  // section permanently hidden. rootMargin does the "reveal slightly late"
  // work instead, and works at any element height.
  const { threshold = 0, rootMargin = '0px 0px -12% 0px', once = true } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Browsers throttle CSS transitions in a hidden/backgrounded tab: the
    // transition reports as "running" but its currentTime never advances, so an
    // element revealed while hidden would sit at opacity 0 indefinitely. When
    // the page is not visible we snap straight to the final state instead.
    const show = (target: Element = el) => {
      if (document.visibilityState !== 'visible') target.classList.add('anim-skip');
      target.classList.add('is-in');
    };

    if (typeof IntersectionObserver === 'undefined') {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-in');
          }
        }
      },
      { threshold, rootMargin },
    );

    io.observe(el);

    // Backstop for anything the observer misses (see the sweep above).
    // Content visibility must never depend on an animation firing.
    const entry: PendingEntry = {
      el,
      show: (target) => {
        show(target);
        io.unobserve(target);
      },
    };
    if (once) registerPending(entry);

    return () => {
      io.disconnect();
      pending.delete(entry);
    };
  }, [threshold, rootMargin, once]);

  return ref;
}

/** True when the visitor has asked for reduced motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

/** Tracks which section id is currently in the viewport, for nav highlighting. */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        let best: string | null = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        setActive(best);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -45% 0px' },
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/** Fires once the window has scrolled past `offset` pixels. */
export function useScrolled(offset = 12): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > offset);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [offset]);

  return scrolled;
}
