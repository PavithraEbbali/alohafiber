'use client';

import { useMemo, useState } from 'react';
import { activeServiceSections, site } from '@/lib/content';
import { useActiveSection, useScrolled } from '@/lib/hooks';
import { Phone } from '@/components/ui/Icons';

const STATIC_LINKS = [
  { anchor: 'coverage', label: 'Coverage' },
  { anchor: 'included', label: "What's included" },
  { anchor: 'why-aloha', label: 'Why Aloha' },
  { anchor: 'faq', label: 'FAQ' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);

  const links = useMemo(() => {
    const dynamic = activeServiceSections().map((s) => ({
      anchor: s.anchor,
      label: s.navLabel,
    }));
    return [...dynamic, ...STATIC_LINKS];
  }, []);

  const anchors = useMemo(() => links.map((l) => l.anchor), [links]);
  const active = useActiveSection(anchors);

  return (
    <>
      {/* ---- Top disclosure bar ------------------------------------- */}
      <div className="relative z-50 bg-navy-800 text-white">
        <div className="shell flex items-center justify-center gap-2 py-2 text-center">
          <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-sunset-400 sm:block" />
          <p className="text-[0.75rem] lg:text-[0.72rem] font-medium tracking-[0.06em] text-azure-200 sm:text-[0.78rem]">
            {site.disclosure}
          </p>
        </div>
      </div>

      {/* ---- Sticky header ------------------------------------------ */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ease-silk ${
          scrolled
            ? 'border-b border-azure-150/70 bg-white/85 shadow-[0_1px_24px_-8px_rgba(1,33,69,.22)] backdrop-blur-xl'
            : 'border-b border-transparent bg-white/0'
        }`}
        style={{ height: 'var(--header-h)' }}
      >
        <div className="shell flex h-full items-center justify-between gap-4">
          {/* Wordmark */}
          <a href="#top" className="group flex shrink-0 items-center gap-2.5 py-1.5" aria-label={`${site.retailerName} — home`}>
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-tide shadow-glowB">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,75,51,.55),transparent_62%)]" />
              <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" aria-hidden="true">
                <path
                  d="M12 19.5v-6m0 0a6.2 6.2 0 0 0-4.4 1.8M12 13.5a6.2 6.2 0 0 1 4.4 1.8"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M4.6 11.2a10.5 10.5 0 0 1 14.8 0"
                  stroke="#ff4b33"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="19.6" r="1.5" fill="#ff4b33" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] font-bold tracking-tight text-navy-700">
                {site.retailerName}
              </span>
              <span className="mt-0.5 text-[0.75rem] lg:text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slatey-500">
                Authorized Retailer
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Section navigation" className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.anchor}
                href={`#${l.anchor}`}
                className={`relative rounded-full px-3.5 py-2.5 text-[0.86rem] font-medium transition-colors duration-300 ${
                  active === l.anchor
                    ? 'text-navy-700'
                    : 'text-navy-700/62 hover:text-navy-700'
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-ember transition-transform duration-[400ms] ease-silk ${
                    active === l.anchor ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Call CTA — a raw number is allowed here (header/footer only). */}
          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="group hidden min-h-[44px] items-center gap-2 rounded-full bg-tide px-5 py-2.5 text-sm font-semibold text-white shadow-lift transition-all duration-300 ease-silk hover:shadow-glowB sm:inline-flex"
            >
              <Phone className="h-4 w-4 text-sunset-400 transition-transform duration-500 group-hover:rotate-[14deg]" />
              Call {site.phone}
            </a>

            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="grid h-11 w-11 place-items-center rounded-full bg-tide text-white shadow-lift sm:hidden"
            >
              <Phone className="h-4 w-4 text-sunset-400" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-inset ring-navy-700/15 transition-colors hover:bg-azure-50 lg:hidden"
            >
              <span className="relative block h-3.5 w-[1.125rem]">
                <span
                  className={`absolute left-0 h-0.5 w-full rounded-full bg-navy-700 transition-all duration-300 ease-silk ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-navy-700 transition-opacity duration-200 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-full rounded-full bg-navy-700 transition-all duration-300 ease-silk ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          id="mobile-nav"
          className={`overflow-hidden border-b border-azure-150 bg-white/97 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-silk lg:hidden ${
            open ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav aria-label="Section navigation" className="shell flex flex-col py-3">
            {links.map((l) => (
              <a
                key={l.anchor}
                href={`#${l.anchor}`}
                onClick={() => setOpen(false)}
                className="border-b border-azure-150/70 py-3.5 text-[0.95rem] font-medium text-navy-700 last:border-0"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
