import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { legalDocs, legalSlugs } from '@/lib/legal';
import { legalPages, site } from '@/lib/content';
import { homeHref, pageHref } from '@/lib/links';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, Phone } from '@/components/ui/Icons';

/** Only the eight legal slugs build; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocs[slug];
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.intro.slice(0, 180),
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = legalDocs[slug];
  if (!doc) notFound();

  const others = legalPages.filter((p) => p.slug !== slug);

  return (
    <>
      <Header />

      <main>
        {/* Masthead */}
        <section className="relative isolate overflow-hidden bg-tide py-16 text-white sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(0,102,204,.22),transparent_66%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(to right,#dceefd 1px,transparent 1px),linear-gradient(to bottom,#dceefd 1px,transparent 1px)',
              backgroundSize: '72px 72px',
              maskImage: 'radial-gradient(ellipse 70% 80% at 30% 40%,#000,transparent)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 30% 40%,#000,transparent)',
            }}
          />

          <div className="shell relative">
            <nav aria-label="Breadcrumb" className="mb-6">
              <a
                href={homeHref()}
                className="inline-flex items-center gap-2 text-[0.8rem] font-medium text-slatey-400 transition-colors hover:text-sunset-400"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />
                Back to {site.retailerName}
              </a>
            </nav>

            <span className="eyebrow text-sunset-400">
              <span className="h-px w-8 bg-sunset-400" />
              Legal
            </span>

            <h1 className="mt-4 max-w-3xl font-display text-[2.1rem] font-bold leading-[1.08] tracking-[-0.028em] sm:text-[3rem]">
              {doc.title}
            </h1>

            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-slatey-400">
              {doc.intro}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="bg-white py-16 sm:py-20">
          <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <article className="max-w-[68ch]">
              {doc.blocks.map((block, i) => (
                <div key={block.heading} className={i === 0 ? '' : 'mt-11'}>
                  <h2 className="font-display text-[1.3rem] font-bold tracking-tight text-navy-700 sm:text-[1.45rem]">
                    {block.heading}
                  </h2>

                  {block.paragraphs.map((p) => (
                    <p key={p} className="mt-4 text-[0.97rem] leading-[1.75] text-navy-700/78">
                      {p}
                    </p>
                  ))}

                  {block.bullets ? (
                    <ul className="mt-5 space-y-3">
                      {block.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sunset-400"
                          />
                          <span className="text-[0.95rem] leading-[1.7] text-navy-700/78">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}

              <div className="mt-14 rounded-[1.5rem] bg-azure-50 p-7 ring-1 ring-azure-150">
                <h2 className="font-display text-[1.1rem] font-bold tracking-tight text-navy-700">
                  Questions about this page?
                </h2>
                <p className="mt-2 max-w-[52ch] text-[0.92rem] leading-relaxed text-navy-700/70">
                  Our team can walk you through anything here, and take your order on the same
                  call.
                </p>
                <div className="mt-5 -ml-1.5">
                  <MagneticButton href={site.phoneHref} variant="ember" ariaLabel="Call to order">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call to order
                  </MagneticButton>
                </div>
              </div>
            </article>

            {/* Sibling documents */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="text-[0.75rem] lg:text-[0.7rem] font-bold uppercase tracking-[0.17em] text-slatey-500">
                Other policies
              </h2>
              <ul className="mt-5 space-y-1">
                {others.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={pageHref(p.slug)}
                      className="group block rounded-xl px-3.5 py-3 transition-colors duration-300 hover:bg-azure-50"
                    >
                      <span className="block text-[0.88rem] font-semibold text-navy-700 transition-colors group-hover:text-azure-500">
                        {p.title}
                      </span>
                      <span className="mt-0.5 block text-[0.78rem] leading-snug text-navy-700/52">
                        {p.summary}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
