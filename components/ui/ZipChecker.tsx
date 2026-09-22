'use client';

import { useState, type FormEvent } from 'react';
import { lookupZip, site, type CoverageArea } from '@/lib/content';
import { ArrowRight, MapPin, Phone } from './Icons';

type Result =
  | { kind: 'idle' }
  | { kind: 'invalid' }
  | { kind: 'hit'; area: CoverageArea }
  | { kind: 'miss'; zip: string };

/**
 * ZIP availability checker.
 *
 * Strictly frontend: matches against the static coverage table in
 * lib/content.ts. There is no network request and no backend.
 */
export function ZipChecker({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<Result>({ kind: 'idle' });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const clean = zip.replace(/\D/g, '').slice(0, 5);
    if (clean.length !== 5) {
      setResult({ kind: 'invalid' });
      return;
    }
    const area = lookupZip(clean);
    setResult(area ? { kind: 'hit', area } : { kind: 'miss', zip: clean });
  };

  const dark = tone === 'dark';

  const shellCls = dark
    ? 'border-white/15 bg-white/[0.07] backdrop-blur-xl'
    : 'border-azure-200 bg-white shadow-lift';
  const inputCls = dark
    ? 'text-white placeholder:text-slatey-400/70'
    : 'text-navy-700 placeholder:text-slatey-400';
  const iconCls = dark ? 'text-slatey-400' : 'text-navy-400';

  return (
    <div className="w-full max-w-lg">
      <form
        onSubmit={onSubmit}
        className={`flex items-center gap-2 rounded-full border p-1.5 pl-5 transition-colors duration-300 focus-within:border-sunset-400/70 ${shellCls}`}
      >
        <MapPin className={`h-5 w-5 shrink-0 ${iconCls}`} aria-hidden="true" />

        <label htmlFor="zip-check" className="sr-only">
          Enter your ZIP code to check availability
        </label>
        <input
          id="zip-check"
          name="zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="Enter your ZIP code"
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, '').slice(0, 5));
            if (result.kind !== 'idle') setResult({ kind: 'idle' });
          }}
          className={`min-h-[44px] min-w-0 flex-1 bg-transparent py-3 text-base font-medium tracking-wide outline-none ${inputCls}`}
        />

        <button
          type="submit"
          className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-glowC transition-transform duration-300 ease-silk hover:scale-[1.03] active:scale-95"
        >
          <span className="hidden sm:inline">Check availability</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </form>

      <div aria-live="polite" className="min-h-[2.75rem]">
        {result.kind === 'invalid' ? (
          <p className={`mt-3 pl-5 text-sm ${dark ? 'text-slatey-400' : 'text-navy-700/70'}`}>
            Please enter a five-digit ZIP code.
          </p>
        ) : null}

        {result.kind === 'hit' ? (
          <div
            className={`mt-3 rounded-2xl border px-5 py-4 ${
              dark ? 'border-sunset-400/35 bg-sunset-400/10' : 'border-sunset-400/35 bg-sunset-400/25'
            }`}
          >
            <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-navy-700'}`}>
              Good news — {result.area.zip} sits inside the {result.area.district} service
              footprint.
            </p>
            <p className={`mt-1 text-sm ${dark ? 'text-slatey-400' : 'text-navy-700/75'}`}>
              Covering {result.area.communities.join(', ')}. A quick call confirms line of sight
              to the nearest tower at your exact address.
            </p>
            <a
              href={site.phoneHref}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-sunset-400 underline-offset-4 hover:underline"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call to order
            </a>
          </div>
        ) : null}

        {result.kind === 'miss' ? (
          <div
            className={`mt-3 rounded-2xl border px-5 py-4 ${
              dark ? 'border-white/15 bg-white/[0.06]' : 'border-azure-200 bg-azure-50'
            }`}
          >
            <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-navy-700'}`}>
              {result.zip} is not in the published footprint yet.
            </p>
            <p className={`mt-1 text-sm ${dark ? 'text-slatey-400' : 'text-navy-700/75'}`}>
              Coverage follows tower line of sight rather than ZIP boundaries, so edge addresses
              are worth checking directly.
            </p>
            <a
              href={site.phoneHref}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-sunset-400 underline-offset-4 hover:underline"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call to check your address
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ZipChecker;
