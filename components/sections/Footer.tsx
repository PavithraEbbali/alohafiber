import Link from 'next/link';
import { activeServiceSections, legalPages, site } from '@/lib/content';
import { Phone } from '@/components/ui/Icons';
import { Aurora } from '@/components/ui/Aurora';

const SITE_LINKS = [
  ...activeServiceSections().map((s) => ({ href: `#${s.anchor}`, label: s.navLabel })),
  { href: '#coverage', label: 'Coverage' },
  { href: '#included', label: "What's included" },
  { href: '#why-aloha', label: 'Why Aloha' },
  { href: '#faq', label: 'FAQ' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-800 text-white">
      <Aurora tone="dark" intensity={0.55} />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sunset-400/45 to-transparent" />

      <div className="shell relative">
        {/* ---- Top: brand + call ---- */}
        <div className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-lagoon">
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,75,51,.6),transparent_62%)]" />
                <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M12 19.5v-6m0 0a6.2 6.2 0 0 0-4.4 1.8M12 13.5a6.2 6.2 0 0 1 4.4 1.8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M4.6 11.2a10.5 10.5 0 0 1 14.8 0" stroke="#ff4b33" strokeWidth="1.7" strokeLinecap="round" />
                  <circle cx="12" cy="19.6" r="1.5" fill="#ff4b33" />
                </svg>
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                {site.retailerName}
              </span>
            </div>

            <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-slatey-400">
              An independent authorized retailer arranging residential fixed wireless internet
              service across {site.region}. Unlimited data, no contracts, and locally based
              technical support.
            </p>

            <a
              href={site.phoneHref}
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white/[0.06] py-3 pl-4 pr-6 ring-1 ring-inset ring-white/12 transition-colors duration-300 hover:bg-white/[0.1]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ember text-white shadow-glowC">
                <Phone className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[14deg]" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.75rem] lg:text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slatey-500">
                  Sales &amp; ordering
                </span>
                <span className="font-display text-[1.05rem] font-bold tracking-tight text-white">
                  {site.phone}
                </span>
              </span>
            </a>

            <p className="mt-3 text-[0.78rem] text-slatey-500">{site.hours}</p>
          </div>

          {/* ---- Link columns ---- */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-[0.75rem] lg:text-[0.7rem] font-bold uppercase tracking-[0.17em] text-white">
                Explore
              </h2>
              <ul className="mt-5 space-y-3">
                {SITE_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="-my-1.5 block py-3 text-[0.88rem] text-slatey-400 transition-colors duration-300 hover:text-sunset-400"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[0.75rem] lg:text-[0.7rem] font-bold uppercase tracking-[0.17em] text-white">
                Legal
              </h2>
              <ul className="mt-5 space-y-3">
                {legalPages.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      className="-my-1.5 block py-3 text-[0.88rem] text-slatey-400 transition-colors duration-300 hover:text-sunset-400"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ---- Reseller disclosure ---- */}
        <div className="border-b border-white/10 py-9">
          <h2 className="text-[0.75rem] lg:text-[0.7rem] font-bold uppercase tracking-[0.17em] text-slatey-500">
            Disclosure
          </h2>
          <div className="mt-4 space-y-3 text-[0.8rem] leading-relaxed text-slatey-500">
            <p>
              {site.retailerName} is an independent authorized retailer of{' '}
              {site.carrierName}. This website is operated by the retailer and is not the
              carrier&rsquo;s own website. {site.carrierName} and its logos are trademarks of
              their respective owner and are used here for identification only. All other
              trademarks are the property of their respective owners.
            </p>
            <p>
              Pricing, plan structure, promotional terms and coverage shown here reflect
              published residential offerings and may change or vary by address. Residential
              service is delivered on a best-effort, shared-bandwidth basis; speeds are not
              guaranteed and depend on line of sight to the nearest tower along with terrain,
              trees and other obstructions. Service availability is confirmed at the time of
              order.
            </p>
          </div>
        </div>

        {/* ---- Base bar ---- */}
        <div className="flex flex-col items-start justify-between gap-4 py-7 sm:flex-row sm:items-center">
          <p className="text-[0.78rem] text-slatey-500">
            &copy; {site.retailerName}. All rights reserved.
          </p>
          <p className="text-[0.78rem] text-slatey-500">{site.disclosure}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
