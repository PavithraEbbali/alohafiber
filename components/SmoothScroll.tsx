'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scrolling.
 *
 * Mounted once at the root. Anchor clicks are routed through Lenis so in-page
 * navigation inherits the same easing, offset by the sticky header height.
 * Bails out entirely under prefers-reduced-motion so native scrolling is kept.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    start();

    // Don't burn a rAF loop on a hidden tab.
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    const headerOffset = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h');
      const px = parseFloat(raw) || 4.5;
      // --header-h is authored in rem.
      return -(px * 16 + 18);
    };

    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: headerOffset(), duration: 1.3 });
      history.replaceState(null, '', href);
    };

    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
