import type { Metadata, Viewport } from 'next';
import { Sora, Inter } from 'next/font/google';
import { media, site } from '@/lib/content';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Grain } from '@/components/ui/Grain';
import './globals.css';

const display = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  /**
   * Set the real domain at build time:
   *   NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run build
   *
   * This is baked into every exported HTML file as the og:image / canonical
   * base, so it cannot be changed after the export without rebuilding.
   */
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'),
  title: {
    default: `${site.retailerName} | Unlimited Fixed Wireless Internet for ${site.region}`,
    template: `%s | ${site.retailerName}`,
  },
  description:
    'Independent authorized retailer of Aloha Broadband. Unlimited data, no contracts, and ground-based tower internet across Kaʻū and Puna on Hawaiʻi Island. Check your ZIP or call to order.',
  keywords: [
    'Aloha Broadband',
    'fixed wireless internet Hawaii',
    'Kaʻū internet',
    'Ocean View Hawaii internet',
    'unlimited internet Big Island',
    'no contract internet Hawaii',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: `${site.retailerName} | Unlimited internet for ${site.region}`,
    description:
      'Unlimited data, no contracts, ground-based tower internet across Kaʻū and Puna. Check availability by ZIP or call to order.',
    siteName: site.retailerName,
    images: [{ url: media.ogShare.src, width: 1200, height: 630, alt: media.ogShare.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.retailerName} | Unlimited internet for ${site.region}`,
    description:
      'Unlimited data, no contracts, ground-based tower internet across Kaʻū and Puna.',
    images: [media.ogShare.src],
  },
};

export const viewport: Viewport = {
  themeColor: '#012145',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} js`}>
      <head>
        {/*
          The `js` class above gates every scroll-animation hidden state in
          globals.css. It is rendered server-side (not toggled by a script) so
          there is no hydration mismatch and no flash.

          The noscript block below cancels those hidden states when scripting is
          unavailable, so the page renders fully visible instead of blank. It is
          the only thing standing between a no-JS visitor and an empty page —
          keep it in sync with the hidden states in globals.css.
        */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>
              .reveal,.wipe,.wipe-root{opacity:1!important;transform:none!important;clip-path:none!important}
              .word-reveal>span{transform:none!important}
            </style>`,
          }}
        />
      </head>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-700 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        <Grain />
      </body>
    </html>
  );
}
