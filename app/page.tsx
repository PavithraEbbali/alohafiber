import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { ServiceSections } from '@/components/sections/ServiceSections';
import { FinePrintGrid } from '@/components/sections/FinePrintGrid';
import { WhyAloha } from '@/components/sections/WhyAloha';
import { Faq } from '@/components/sections/Faq';
import { Footer } from '@/components/sections/Footer';
import { faqs, plans, site } from '@/lib/content';

/**
 * Strict section order:
 *   1. Top disclosure bar      -> Header
 *   2. Sticky header           -> Header
 *   3. Hero                    -> Hero
 *   4. Service lines, in order -> ServiceSections (omits lines with no plans)
 *   5. Honest fine-print grid  -> FinePrintGrid
 *   6. Why Aloha / features    -> WhyAloha
 *   7. FAQ                     -> Faq
 *   8. Legal footer            -> Footer
 */
export default function HomePage() {
  const priced = plans.filter((p) => typeof p.price === 'number');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'Service',
        serviceType: 'Fixed wireless internet',
        areaServed: site.region,
        provider: { '@type': 'Organization', name: site.carrierName },
        offers: priced.map((p) => ({
          '@type': 'Offer',
          name: p.name,
          price: p.price,
          priceCurrency: 'USD',
          category: 'Residential internet',
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Content is authored in lib/content.ts, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main>
        <Hero />
        <ServiceSections />
        <FinePrintGrid />
        <WhyAloha />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
