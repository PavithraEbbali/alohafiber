/* =============================================================================
 *  lib/content.ts — SINGLE SOURCE OF TRUTH
 * -----------------------------------------------------------------------------
 *  Every price, plan, fee, feature and service section on this site is driven
 *  from this file. To change pricing later, edit ONLY this file.
 *
 *  FACT-CHECK PROVENANCE — all plan/fee/feature data below was taken from the
 *  official Aloha Broadband website:
 *    - https://alohabroadband.com/pricing        (plan names, prices, fees)
 *    - https://alohabroadband.com/learn-more     (how fixed wireless works)
 *    - https://alohabroadband.com/fixed-wireless (latency, range, tower control)
 *    - https://alohabroadband.com/coverage       (serviceable communities)
 *    - https://alohabroadband.com/support        (FAQ source material)
 *    - https://alohabroadband.com/               (uptime, repair SLA, features)
 *
 *  SERVICE AUDIT — Aloha Broadband sells exactly ONE service line: fixed
 *  terrestrial wireless internet. /fiber, /cable, /tv, /phone, /mobile and
 *  /bundles all return HTTP 404 on the official site, and the official copy
 *  states the network uses "Fixed Terrestrial Wireless radio systems". Per the
 *  no-empty-placeholder rule, sections for service lines with zero plans are
 *  omitted entirely at render time — they are not stubbed out.
 * ========================================================================== */

export type ServiceLine =
  | 'fiber'
  | 'cable'
  | 'bundle'
  | 'tv'
  | 'mobile'
  | 'phone'
  | 'wireless';

/** Tier glyph shown on each plan card. */
export type PlanIcon = 'signal-1' | 'signal-2' | 'signal-3';

export interface PlanItem {
  id: string;
  name: string;
  serviceLine: ServiceLine;
  speedDown?: number;
  speedUp?: number;
  price?: number;
  cents?: string;
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
  /** Short line under the plan name. */
  tagline?: string;
  /** Rendered instead of a speed figure when the carrier publishes no Mbps. */
  capability?: string;
  icon?: PlanIcon;
}

/* -----------------------------------------------------------------------------
 *  PHOTOGRAPHY
 *  ---------------------------------------------------------------------------
 *  Every photo on the site is declared here and consumed as a CSS background
 *  layered UNDERNEATH the existing gradients. That means a missing file
 *  degrades to the gradient treatment rather than a broken image box, so the
 *  site is safe to ship before the assets land.
 *
 *  Drop the files into /public/images/ using exactly these names — no code
 *  change is needed. See /design/IMAGE-ASSETS.md for the full brief.
 * -------------------------------------------------------------------------- */
export const media = {
  hero: {
    src: '/images/hero-kau-coastline.jpg',
    srcSm: '/images/hero-kau-coastline-sm.jpg',
    alt: 'The Kaʻū coastline on Hawaiʻi Island at dusk.',
  },
  whyAloha: {
    src: '/images/tower-ridge-dusk.jpg',
    srcSm: '/images/tower-ridge-dusk-sm.jpg',
    alt: 'A wireless communications tower on a ridge above the Hawaiʻi Island coast.',
  },
  coverage: {
    src: '/images/antenna-install.jpg',
    srcSm: '/images/antenna-install-sm.jpg',
    alt: 'A technician mounting a fixed wireless antenna on the roof of a home.',
  },
  faq: {
    src: '/images/home-connected.jpg',
    srcSm: '/images/home-connected-sm.jpg',
    alt: 'A household using a laptop and streaming over a home internet connection.',
  },
  ogShare: {
    src: '/images/og-share.jpg',
    alt: 'Aloha Fiber — authorized retailer of Aloha Broadband.',
  },
} as const;

/* -----------------------------------------------------------------------------
 *  RETAILER IDENTITY
 *  ---------------------------------------------------------------------------
 *  REPLACE `phone` BEFORE LAUNCH.
 *  This is the independent retailer's own tracked sales line — it must NOT be
 *  the carrier's published customer-service number. The value below uses the
 *  555-01xx range, which NANPA reserves for fictional use, so it is safe to
 *  ship in staging and impossible to mistake for a live line.
 * -------------------------------------------------------------------------- */
export const site = {
  retailerName: 'Aloha Fiber',
  carrierName: 'Aloha Broadband',
  disclosure: 'Independent Authorized Retailer of Aloha Broadband.',
  phone: '(808) 555-0142',
  get phoneHref() {
    return `tel:+1${this.phone.replace(/\D/g, '')}`;
  },
  hours: 'Mon-Fri, 8:00am - 5:00pm HST',
  region: 'Kaʻū & Puna, Hawaiʻi Island',
} as const;

/* -----------------------------------------------------------------------------
 *  STANDING ASSURANCES
 *  ---------------------------------------------------------------------------
 *  NOT PROMOTIONS. Aloha Broadband runs no promotional offers: a keyword sweep
 *  of /, /pricing, /learn-more and /contact-us for promo / offer / special /
 *  deal / discount / limited time / free month / % off returned nothing but
 *  the heading "What We Offer:" and the phrase "special antenna's".
 *
 *  These are therefore presented as standing terms of the service, never
 *  framed as a limited-time offer. Do not add a countdown, a "now on" badge or
 *  any urgency treatment to them — it would misrepresent the carrier.
 *
 *  If Aloha ever does publish a real promotion, add it as a separate `promos`
 *  export rather than reusing these.
 * -------------------------------------------------------------------------- */
export interface Assurance {
  label: string;
  detail: string;
}

export const assurances: Assurance[] = [
  { label: '30-day money-back guarantee', detail: 'Published on every Aloha Broadband plan.' },
  { label: 'Unlimited data, no usage caps', detail: 'No throttling based on how much you use.' },
  { label: 'No annual contract', detail: 'Month-to-month, plus vacation plans.' },
];

/* -----------------------------------------------------------------------------
 *  PLANS
 *  ---------------------------------------------------------------------------
 *  NOTE ON SPEEDS: Aloha Broadband does not publish Mbps figures for
 *  residential plans. Their Plans page tiers by streaming capability instead,
 *  and states plans are "Best Effort, shared bandwidth... not guaranteed".
 *  `speedDown`/`speedUp` are therefore intentionally left undefined rather than
 *  invented; `capability` carries the carrier's own tiering language. If Aloha
 *  publishes Mbps later, set the fields here and the UI picks them up.
 * -------------------------------------------------------------------------- */
export const plans: PlanItem[] = [
  {
    id: 'ab-basic',
    name: 'Basic',
    serviceLine: 'wireless',
    icon: 'signal-1',
    price: 55,
    cents: '00',
    tagline: 'Everyday browsing and one stream at a time.',
    capability: '1 standard-definition video stream',
    promoQualifier: '30-day money-back guarantee',
    equipmentFee: 'Wi-Fi router lease $5/mo (optional)',
    dataPolicy: 'Unlimited data, no usage caps',
    contractTerm: 'No contract, month-to-month',
    features: [
      'Websites, email and online gaming',
      'Voice over IP ready',
      '1 standard-definition video stream',
      'Locally based technical support',
      'No contracts — month-to-month',
      'Unlimited data, no usage caps',
      '30-day money-back guarantee',
    ],
  },
  {
    id: 'ab-standard',
    name: 'Standard',
    serviceLine: 'wireless',
    icon: 'signal-2',
    price: 70,
    cents: '00',
    isPopular: true,
    tagline: 'The full-household tier — multiple streams, HD capable.',
    capability: 'Multiple SD streams plus HD video',
    promoQualifier: '30-day money-back guarantee',
    equipmentFee: 'Wi-Fi router lease $5/mo (optional)',
    dataPolicy: 'Unlimited data, no usage caps',
    contractTerm: 'No contract, month-to-month',
    features: [
      'Websites, email and online gaming',
      'Voice over IP ready',
      '2 standard-definition video streams',
      'Multiple SD streams at once',
      'High-definition video streaming',
      'Locally based technical support',
      'No contracts — month-to-month',
      'Unlimited data, no usage caps',
      '30-day money-back guarantee',
    ],
  },
  {
    id: 'ab-plus',
    name: 'Plus',
    serviceLine: 'wireless',
    icon: 'signal-3',
    // No published price — the carrier lists Plus as area-dependent.
    // The UI renders "Call for pricing" automatically when `price` is undefined.
    tagline: 'Top tier where the tower footprint supports it.',
    capability: 'Highest available throughput in your area',
    equipmentFee: 'Wi-Fi router lease $5/mo (optional)',
    dataPolicy: 'Unlimited data, no usage caps',
    contractTerm: 'No contract, month-to-month',
    features: [
      'Highest tier offered where available',
      'Full high-definition streaming support',
      'Headroom for demanding households',
      'Static/dedicated IP available',
      'Locally based technical support',
      'Unlimited data, no usage caps',
    ],
  },
];

/* -----------------------------------------------------------------------------
 *  SERVICE SECTIONS — rendered in this exact order.
 *  A section only renders if at least one plan carries its serviceLine, so a
 *  line the carrier does not sell disappears completely (no empty placeholder).
 * -------------------------------------------------------------------------- */
export interface ServiceSectionDef {
  line: ServiceLine;
  anchor: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  navLabel: string;
}

export const serviceSections: ServiceSectionDef[] = [
  { line: 'fiber', anchor: 'fiber', navLabel: 'Fiber', eyebrow: 'Fiber', heading: 'Fiber internet plans', subheading: '' },
  { line: 'cable', anchor: 'cable', navLabel: 'Cable', eyebrow: 'Cable', heading: 'Cable internet tiers', subheading: '' },
  { line: 'bundle', anchor: 'bundles', navLabel: 'Bundles', eyebrow: 'Bundles', heading: 'Internet bundles', subheading: '' },
  { line: 'tv', anchor: 'tv', navLabel: 'TV', eyebrow: 'TV', heading: 'TV packages', subheading: '' },
  { line: 'mobile', anchor: 'mobile', navLabel: 'Mobile', eyebrow: 'Mobile', heading: 'Mobile plans', subheading: '' },
  { line: 'phone', anchor: 'phone', navLabel: 'Phone', eyebrow: 'Phone', heading: 'Home phone', subheading: '' },
  {
    line: 'wireless',
    anchor: 'plans',
    navLabel: 'Plans',
    eyebrow: 'Fixed wireless internet',
    heading: 'Compare residential plans and pricing',
    subheading:
      'Every plan runs on Aloha Broadband’s own tower network and includes unlimited data, month-to-month terms and locally based technical support.',
  },
];

/* -----------------------------------------------------------------------------
 *  FINE PRINT — inclusions and one-time / optional fees.
 *  Straight from the carrier's published Plans page.
 * -------------------------------------------------------------------------- */
export interface FinePrintRow {
  label: string;
  value: string;
  note?: string;
  kind: 'included' | 'optional' | 'onetime';
}

export const finePrint: FinePrintRow[] = [
  { kind: 'included', label: 'Data allowance', value: 'Unlimited', note: 'No usage caps and no throttling based on volume.' },
  { kind: 'included', label: 'Contract term', value: 'None', note: 'Month-to-month. Vacation plans available.' },
  { kind: 'included', label: 'Money-back guarantee', value: '30 days', note: 'Published on every residential plan.' },
  { kind: 'included', label: 'Local support', value: 'Included', note: 'Island-based support during published business hours.' },
  { kind: 'included', label: 'Equipment repair', value: 'Within 48h', note: 'Technicians dispatched to get you back online.' },
  { kind: 'onetime', label: 'Setup & installation', value: '$200', note: 'Due at the time of installation.' },
  { kind: 'onetime', label: 'Move antenna / rewire', value: '$75', note: 'Only if you relocate the antenna or re-run cabling.' },
  { kind: 'onetime', label: 'Transfer of service', value: '$35', note: 'Moving service to a new account holder or address.' },
  { kind: 'optional', label: 'Wi-Fi router lease', value: '$5/mo', note: 'Optional — bring your own router if you prefer.' },
  { kind: 'optional', label: 'Dedicated IP address', value: '$20/mo', note: 'Needed for camera systems and some remote access.' },
];

export const finePrintDisclaimers: string[] = [
  'Residential plans are based on best-effort, shared bandwidth and are not guaranteed speeds.',
  'Quoted performance reflects a direct Ethernet connection; results over a wireless router may vary.',
  'Service availability depends on line of sight to a tower and on terrain, trees and other obstructions.',
];

/* -----------------------------------------------------------------------------
 *  WHY ALOHA — every stat below is published by the carrier.
 * -------------------------------------------------------------------------- */
export type FeatureIcon = 'shield' | 'gauge' | 'infinity' | 'tower' | 'wrench' | 'heart';

export interface FeatureItem {
  title: string;
  body: string;
  stat?: string;
  statLabel?: string;
  icon: FeatureIcon;
}

export const features: FeatureItem[] = [
  {
    icon: 'shield',
    stat: '99.99%',
    statLabel: 'uptime',
    title: 'Reliable through the weather',
    body: 'Ground-based, so clouds, rain and overcast skies do not take it down.',
  },
  {
    icon: 'gauge',
    stat: '5-25 ms',
    statLabel: 'typical latency',
    title: 'Low latency for real work and real games',
    body: 'A short hop to a nearby tower, not a round trip to orbit. Calls and gaming stay responsive.',
  },
  {
    icon: 'infinity',
    stat: 'Unlimited',
    statLabel: 'no usage caps',
    title: 'Truly unlimited data',
    body: 'No meter, no overage, no throttling. The average customer moves well over 100GB a month.',
  },
  {
    icon: 'tower',
    stat: '15 mi',
    statLabel: 'signal reach',
    title: 'Towers they own outright',
    body: 'Aloha Broadband owns every tower outright, so capacity at each site stays under its control.',
  },
  {
    icon: 'wrench',
    stat: '48 hrs',
    statLabel: 'equipment repair',
    title: 'Technicians on the island',
    body: 'Repairs handled within 48 hours by technicians who live in the communities they serve.',
  },
  {
    icon: 'heart',
    stat: '20+ yrs',
    statLabel: 'serving Kaʻū',
    title: 'Two decades of local roots',
    body: 'Serving Kaʻū since before streaming existed. Long enough to know every ridge line.',
  },
];

/* -----------------------------------------------------------------------------
 *  TRUST MARQUEE
 * -------------------------------------------------------------------------- */
export const marqueeItems: string[] = [
  'Unlimited data',
  'No usage caps',
  'No contracts',
  '99.99% uptime',
  '5-25 ms latency',
  'Locally owned towers',
  '30-day money-back guarantee',
  '48-hour equipment repair',
  'Island-based support',
  'HD streaming ready',
  'Vacation plans available',
  '20+ years in Kaʻū',
];

/* -----------------------------------------------------------------------------
 *  COVERAGE — communities named on the carrier's Coverage page.
 *  ZIPs correspond to those named communities and power the on-page checker.
 *  This is a static frontend lookup — there is no backend call.
 * -------------------------------------------------------------------------- */
export interface CoverageArea {
  zip: string;
  district: string;
  communities: string[];
}

export const coverage: CoverageArea[] = [
  { zip: '96737', district: 'Kaʻū', communities: ['Ocean View', 'Hawaiian Ocean View Ranchos', 'Green Sands'] },
  { zip: '96772', district: 'Kaʻū', communities: ['Nāʻālehu', 'Waiʻōhinu', 'Discovery Harbour', 'South Point', 'Mark Twain'] },
  { zip: '96778', district: 'Puna', communities: ['Kalapana', 'Kalapana Gardens', 'Kaimū'] },
  { zip: '96710', district: 'Hāmākua', communities: ['Hakalau'] },
];

export const coverageBlurb =
  'Aloha Broadband currently serves Kaʻū — Ocean View, Ranchos, South Point, Discovery Harbour, Mark Twain, Green Sands, Nāʻālehu and Waiʻōhinu — plus Kalapana in Puna.';

/* -----------------------------------------------------------------------------
 *  FAQ — answers drawn from the carrier's own support material.
 *  No questions about retailer legal structure, and no "is this official" items.
 * -------------------------------------------------------------------------- */
export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: 'How does the connection actually reach my house?',
    a: 'It is a point-to-point radio link. The signal is broadcast from one of the towers around Hawaiʻi Island, and a small antenna mounted on your home is aimed directly at that tower. No phone line and no cellular service is required, and the connection is always on.',
  },
  {
    q: 'What speeds should I expect?',
    a: 'Residential plans run on best-effort, shared bandwidth, so speeds are not guaranteed. What you get depends on terrain, trees and line of sight to the tower. The Basic tier comfortably handles one standard-definition stream; Standard handles multiple streams at once and supports high definition.',
  },
  {
    q: 'Do I need my own router?',
    a: 'The install hands off a single Cat5 Ethernet connection. You can plug in your own router, or lease a Wi-Fi router for $5 a month. Keep in mind that speeds measured over Wi-Fi will read lower than a direct Ethernet connection.',
  },
  {
    q: 'What happens on installation day?',
    a: 'A technician mounts an antenna with clear line of sight to the nearest tower, runs the cabling, and hands off an Ethernet connection. Setup and installation is a one-time $200 charge due at the time of installation.',
  },
  {
    q: 'Is there a data cap or a contract?',
    a: 'Neither. Data is genuinely unlimited with no usage caps, and you are never slowed down based on how much you have used. Service is month-to-month with no contract, and vacation plans are available if you leave the island seasonally.',
  },
  {
    q: 'Will streaming work — Netflix, Hulu, YouTube?',
    a: 'Yes. Even on the entry tier, streaming works as long as your hardware is current and quality settings are sensible. High-definition streaming is supported on the Standard tier and above.',
  },
  {
    q: 'Does the service hold up in bad weather?',
    a: 'Yes. Because the network is ground-based rather than satellite, it is not affected by clouds, rain or overcast conditions. The published uptime figure is 99.99%.',
  },
  {
    q: 'Can I run security cameras on it?',
    a: 'Camera systems generally need a static, dedicated public IP address and specific ports opened on the antenna, which is configured on the network side. A dedicated IP is available for $20 a month. Continuous 24-hour uploads of a live camera feed to an offsite server are not permitted under the acceptable-use terms.',
  },
  {
    q: 'What if I move, or need the antenna repositioned?',
    a: 'Relocating the antenna or re-running cabling is a $75 charge, and transferring service is $35. Both are one-time fees.',
  },
  {
    q: 'How fast is a repair if something breaks?',
    a: 'Equipment is repaired within 48 hours. Technicians are based on-island, so a fix does not wait on a flight or a mainland dispatch queue.',
  },
];

/* -----------------------------------------------------------------------------
 *  LEGAL PAGES — the eight required footer documents.
 * -------------------------------------------------------------------------- */
export interface LegalLink {
  slug: string;
  title: string;
  summary: string;
}

export const legalPages: LegalLink[] = [
  { slug: 'privacy', title: 'Privacy & Data Protection', summary: 'What we collect when you request service, why we collect it, and the choices you have.' },
  { slug: 'disclaimer', title: 'Disclaimer', summary: 'The limits of the information published on this site, including pricing and availability.' },
  { slug: 'cookies', title: 'Cookies Policy', summary: 'The cookies and similar technologies this site uses, and how to control them.' },
  { slug: 'tcpa', title: 'TCPA Policy', summary: 'How we handle consent for calls and text messages, and how to revoke it.' },
  { slug: 'trademarks', title: 'Trademarks', summary: 'Ownership of the marks and names referenced across this site.' },
  { slug: 'marketing-policy', title: 'Marketing Policy', summary: 'The standards we hold our advertising and outbound communications to.' },
  { slug: 'service-fulfillment', title: 'Service Fulfillment', summary: 'What happens between placing an order and having a working connection.' },
  { slug: 'pci-dss', title: 'PCI DSS', summary: 'How payment card data is handled and kept out of scope on this site.' },
];

/* -----------------------------------------------------------------------------
 *  DERIVED HELPERS — used by the UI so it never hardcodes plan knowledge.
 * -------------------------------------------------------------------------- */
export const plansForLine = (line: ServiceLine): PlanItem[] =>
  plans.filter((p) => p.serviceLine === line);

/** Only sections that actually have plans behind them. */
export const activeServiceSections = (): ServiceSectionDef[] =>
  serviceSections.filter((s) => plansForLine(s.line).length > 0);

/** CTA label rule: priced plans order, unpriced plans ask. */
export const ctaLabelFor = (plan: PlanItem): string =>
  typeof plan.price === 'number' ? 'Call to order' : 'Call for pricing';

export const serviceableZips: string[] = coverage.map((c) => c.zip);

export const lookupZip = (raw: string): CoverageArea | null => {
  const zip = raw.trim().slice(0, 5);
  return coverage.find((c) => c.zip === zip) ?? null;
};
