import { site } from './content';

/**
 * Body copy for the eight required legal pages.
 *
 * NOTE FOR THE OPERATOR: these are complete, professionally drafted starting
 * documents, but they are not legal advice. Have counsel review them against
 * your actual data flows, retention schedule and retailer agreement before
 * launch, and fill in the entity name, postal address and privacy contact.
 */

export interface LegalBlock {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  intro: string;
  blocks: LegalBlock[];
}

const R = site.retailerName;
const C = site.carrierName;

export const legalDocs: Record<string, LegalDoc> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy & Data Protection',
    intro: `This notice explains what ${R} collects when you use this website or contact us about service, why we collect it, how long we keep it, and the choices available to you.`,
    blocks: [
      {
        heading: 'Information we collect',
        paragraphs: [
          'We collect only what is needed to answer your question and, if you choose to order, to arrange installation of service at your address.',
        ],
        bullets: [
          'Information you give us directly: name, service address, email address, telephone number, and any notes you share when you call.',
          'Availability checks: the ZIP code you enter on this site is matched against a static coverage table in the page itself. It is not transmitted to us, stored, or logged.',
          'Technical information: standard web server and analytics data such as IP address, browser type, referring page and pages viewed.',
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'We use your information to confirm whether service can reach your address, to place and track an order, to keep you informed about that order, and to meet our record-keeping obligations.',
          'We do not sell your personal information. We do not share it with unrelated third parties for their own marketing.',
        ],
      },
      {
        heading: 'Who we share it with',
        paragraphs: [
          `To place an order we pass the details necessary to provision service to ${C}, which delivers the underlying network service. We also use service providers for hosting, telephony and analytics, each bound to handle the data only on our instructions.`,
          'We may disclose information where required by law, to enforce our terms, or to protect the rights and safety of any person.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'Enquiry records are retained for up to twenty-four months. Order records are retained for as long as required for tax, accounting and commission-reconciliation purposes, then deleted or anonymised.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'You may request a copy of the personal information we hold about you, ask us to correct it, ask us to delete it, or ask us to stop contacting you. We will respond within the period required by applicable law.',
          'To make a request, use the contact details published on this site. We may need to verify your identity before acting.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'We apply administrative, technical and physical safeguards appropriate to the sensitivity of the information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'This site is intended for adults arranging residential service. We do not knowingly collect personal information from children under 13.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'We may update this notice as our practices change. The current version always governs, and material changes will be reflected on this page.',
        ],
      },
    ],
  },

  disclaimer: {
    slug: 'disclaimer',
    title: 'Disclaimer',
    intro: `${R} is an independent authorized retailer of ${C}. This website is operated by the retailer. It is not the carrier's own website.`,
    blocks: [
      {
        heading: 'Nature of the information',
        paragraphs: [
          'The content on this site is provided for general information about residential service that may be available at your address. It is offered in good faith and reflects published residential offerings at the time of writing.',
          'Nothing on this site is an offer capable of acceptance, a guarantee of availability, or a binding quotation. The terms that govern your service are the ones presented to you at the point of order.',
        ],
      },
      {
        heading: 'Pricing and plans',
        paragraphs: [
          'Prices, plan structures, promotional terms, equipment charges and one-time fees are subject to change and may vary by address, by tower footprint and by the tier that can physically be delivered to you.',
          'Taxes, regulatory surcharges and any applicable government fees are additional unless expressly stated otherwise.',
        ],
      },
      {
        heading: 'Performance and availability',
        paragraphs: [
          'Residential service is delivered on a best-effort, shared-bandwidth basis. Speeds are not guaranteed.',
          'Real-world performance depends on line of sight between your antenna and the nearest tower, on terrain, trees and other obstructions, on the equipment you connect, and on whether you measure over a direct Ethernet connection or over Wi-Fi.',
          'Availability at a specific address is confirmed only at the time of order, after a line-of-sight assessment.',
        ],
      },
      {
        heading: 'Third-party services',
        paragraphs: [
          'References to streaming platforms, routers, consoles or other third-party products are descriptive only. They do not imply any endorsement, affiliation or sponsorship, and we make no representation about how those products will perform.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the maximum extent permitted by law, this site is provided on an "as is" and "as available" basis without warranties of any kind. We are not liable for any loss arising from reliance on information published here.',
        ],
      },
    ],
  },

  cookies: {
    slug: 'cookies',
    title: 'Cookies Policy',
    intro:
      'This policy explains the cookies and similar technologies used on this website, what each category does, and how you can control them.',
    blocks: [
      {
        heading: 'What cookies are',
        paragraphs: [
          'A cookie is a small text file placed on your device by a website. Similar technologies include local storage, pixels and software development kits. They let a site remember your actions and preferences, and let operators understand how a site is used.',
        ],
      },
      {
        heading: 'Categories we use',
        paragraphs: ['We group the technologies on this site into three categories.'],
        bullets: [
          'Strictly necessary: required for the site to function, to balance load, and to keep the site secure. These cannot be switched off through our interface.',
          'Analytics and performance: help us understand which pages are viewed, how visitors move through the page, and where the experience fails. Data is aggregated.',
          'Advertising and attribution: used to measure the effectiveness of marketing and to avoid showing the same message repeatedly. These are only set where permitted.',
        ],
      },
      {
        heading: 'What we do not do',
        paragraphs: [
          'The ZIP availability checker on this site runs entirely in your browser against a static list. Entering a ZIP code does not set a cookie and does not send your entry anywhere.',
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          'Most browsers let you see which cookies are set, delete them individually or entirely, and block them from being set. These controls are usually found under settings, privacy or security.',
          'Blocking strictly necessary cookies may cause parts of this site to stop working correctly.',
          'You can also send a Global Privacy Control signal from a supporting browser or extension, which we honour where applicable law requires it.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'As we add or remove tools, the technologies listed here will change. The current version of this page always reflects our practice.',
        ],
      },
    ],
  },

  tcpa: {
    slug: 'tcpa',
    title: 'TCPA Policy',
    intro: `${R} is committed to complying with the Telephone Consumer Protection Act, its implementing regulations, and applicable state telemarketing law.`,
    blocks: [
      {
        heading: 'Consent',
        paragraphs: [
          'We contact consumers by telephone or text message only where we have a lawful basis to do so. Where prior express written consent is required, we obtain it through a clear, conspicuous disclosure that is separate from any other terms and that is not a condition of purchase.',
          'Consent records, including the language shown, the time, and the point of capture, are retained for the period required by law.',
        ],
      },
      {
        heading: 'Calling practices',
        paragraphs: [
          'Outbound calls are placed only between 8:00am and 9:00pm in the recipient’s local time zone. Every call identifies the caller and the purpose of the call at the outset, and provides a telephone number that reaches us.',
          'We scrub against the National Do Not Call Registry and applicable state registries, and we maintain an internal do-not-call list.',
        ],
      },
      {
        heading: 'Text messages',
        paragraphs: [
          'Message frequency varies. Message and data rates may apply. Reply STOP to any message to opt out, and HELP for assistance. Opt-out requests are honoured promptly and across all campaigns.',
        ],
      },
      {
        heading: 'Revoking consent',
        paragraphs: [
          'You may revoke consent at any time and by any reasonable means, including verbally during a call, by replying STOP to a text, or by written request using the contact details on this site.',
          'We process revocations promptly and record them on our internal do-not-call list. Revoking marketing consent does not prevent us from contacting you about an order already in progress.',
        ],
      },
      {
        heading: 'Recording',
        paragraphs: [
          'Calls may be monitored or recorded for quality and training purposes. Where notice or consent is required, it is given at the start of the call.',
        ],
      },
      {
        heading: 'Vendors',
        paragraphs: [
          'Any third party placing calls or sending messages on our behalf is contractually required to follow this policy, to maintain its own compliance program, and to pass through opt-outs to us without delay.',
        ],
      },
    ],
  },

  trademarks: {
    slug: 'trademarks',
    title: 'Trademarks',
    intro:
      'This page identifies the ownership of the names, marks and logos that appear on this website.',
    blocks: [
      {
        heading: 'Carrier marks',
        paragraphs: [
          `${C} and any associated names, logos, product names and slogans are trademarks or registered trademarks of their respective owner. ${R} is an independent authorized retailer and does not own these marks.`,
          'Those marks appear on this site solely to identify the network service being offered. Their use does not imply that the owner has reviewed, endorsed or sponsored this website.',
        ],
      },
      {
        heading: 'Third-party marks',
        paragraphs: [
          'Names of streaming platforms, device manufacturers, browsers, payment networks and other third-party products referenced on this site are the property of their respective owners. They are used descriptively and nominatively only.',
        ],
      },
      {
        heading: 'Retailer marks',
        paragraphs: [
          `The ${R} name, wordmark and site design are the property of the retailer operating this website and may not be reproduced without written permission.`,
        ],
      },
      {
        heading: 'Reporting a concern',
        paragraphs: [
          'If you own a mark that you believe is used incorrectly on this site, contact us using the details published here and identify the mark, the page, and the correction sought. We review such requests promptly.',
        ],
      },
    ],
  },

  'marketing-policy': {
    slug: 'marketing-policy',
    title: 'Marketing Policy',
    intro: `This policy sets the standards ${R} holds its own advertising to, and the standards it requires of anyone marketing on its behalf.`,
    blocks: [
      {
        heading: 'Truthful advertising',
        paragraphs: [
          'Every material claim we publish must be accurate at the time of publication and substantiated by the carrier’s own published information. Prices are shown as the recurring amount for the service described, with equipment charges, one-time charges and optional add-ons disclosed separately rather than buried.',
          'Where performance is best-effort rather than guaranteed, we say so in the same place we describe the service.',
        ],
      },
      {
        heading: 'Clear identification',
        paragraphs: [
          `Our status as an independent authorized retailer of ${C} is disclosed persistently on this site and in our advertising. We do not present ourselves as the carrier, and we do not imply an official relationship beyond the retailer relationship that exists.`,
        ],
      },
      {
        heading: 'Fair comparison',
        paragraphs: [
          'Where we describe how one technology differs from another, the description must be factual, current and relevant to the decision a consumer is making. We do not disparage other providers, and we do not use comparison as a substitute for describing our own service.',
        ],
      },
      {
        heading: 'Channels and partners',
        paragraphs: [
          'Affiliates, lead vendors and agencies acting for us must follow this policy, applicable advertising law, and our TCPA Policy. They may not use our marks or the carrier’s marks without written approval, may not bid on the carrier’s brand terms in a way that implies they are the carrier, and may not generate leads through incentivised or misleading offers.',
          'We audit partner activity and terminate partners who breach these standards.',
        ],
      },
      {
        heading: 'Corrections',
        paragraphs: [
          'When we find an inaccuracy in published material, we correct it promptly and, where a consumer relied on it to their detriment, we make it right.',
        ],
      },
    ],
  },

  'service-fulfillment': {
    slug: 'service-fulfillment',
    title: 'Service Fulfillment',
    intro:
      'This page sets out what happens between the moment you place an order and the moment you have a working connection.',
    blocks: [
      {
        heading: 'Placing an order',
        paragraphs: [
          'Orders are taken by telephone. We confirm the service address, the plan you have selected, the recurring charge, the one-time installation charge, and any optional add-ons before anything is submitted.',
        ],
      },
      {
        heading: 'Availability and line of sight',
        paragraphs: [
          'Because service is delivered by a ground-based radio link, availability depends on a clear line of sight between an antenna at your property and the nearest tower. A ZIP code inside the coverage footprint indicates the area is served; it does not by itself confirm your specific address.',
          'If line of sight cannot be established, the order does not proceed and you are not charged.',
        ],
      },
      {
        heading: 'Installation',
        paragraphs: [
          'A technician mounts an antenna aimed at the nearest tower, runs the cabling, and hands off a single Ethernet connection at the property.',
          'The one-time setup and installation charge is due at the time of installation. An adult must be present for the appointment, and the technician needs safe access to the mounting location and the cable route.',
        ],
      },
      {
        heading: 'Equipment',
        paragraphs: [
          'The outdoor antenna and associated network equipment remain the property of the network operator. You may connect your own router to the Ethernet hand-off, or lease a Wi-Fi router for the published monthly charge.',
          'Leased equipment must be returned in working order, fair wear and tear excepted, when service ends.',
        ],
      },
      {
        heading: 'Billing and changes',
        paragraphs: [
          'Service is billed monthly in advance and is month-to-month with no contract. Plan changes, seasonal vacation arrangements, antenna relocation and transfers of service are subject to the published charges shown on this site.',
        ],
      },
      {
        heading: 'Cancellation',
        paragraphs: [
          'A thirty-day money-back guarantee applies to residential service as published by the carrier. After that period, service may be cancelled at any time without an early termination charge, subject to return of leased equipment.',
        ],
      },
    ],
  },

  'pci-dss': {
    slug: 'pci-dss',
    title: 'PCI DSS',
    intro:
      'This page explains how payment card data is handled in connection with this website and our ordering process.',
    blocks: [
      {
        heading: 'This website does not take payments',
        paragraphs: [
          'No page on this website collects, transmits or stores payment card data. There is no checkout, no card field and no payment form anywhere on this site.',
        ],
      },
      {
        heading: 'How payment is handled',
        paragraphs: [
          'Payment arrangements are made as part of establishing your account with the network operator, through the operator’s own payment channels. Card data entered there is handled under that operator’s payment security program, not ours.',
          'Where any payment detail is taken by our staff during a call, it is entered directly into a PCI DSS compliant payment environment and is never written down, stored in our systems, or recorded in call audio.',
        ],
      },
      {
        heading: 'Our controls',
        paragraphs: [
          'We maintain controls proportionate to our limited role in the payment flow.',
        ],
        bullets: [
          'Pause-and-resume on call recording so card data never enters a recording.',
          'No storage of primary account numbers, card verification values or magnetic stripe data in any system we operate.',
          'Role-based access control and unique credentials for every member of staff.',
          'Annual completion of the applicable Self-Assessment Questionnaire for our processing channel.',
          'Staff training on card-data handling at onboarding and annually thereafter.',
        ],
      },
      {
        heading: 'Site security',
        paragraphs: [
          'This website is served over HTTPS with modern transport security. We keep our platform and dependencies patched, and we monitor for known vulnerabilities in the components we ship.',
        ],
      },
      {
        heading: 'Reporting a concern',
        paragraphs: [
          'If you believe payment card data has been requested or handled improperly in connection with this site, contact us immediately using the details published here so we can investigate.',
        ],
      },
    ],
  },
};

export const legalSlugs = Object.keys(legalDocs);
