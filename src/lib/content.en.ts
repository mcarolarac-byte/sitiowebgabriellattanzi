// Traducciones en inglés — misma estructura que content.ts
// Solo se exportan los campos que difieren del español.

import { site as siteEs, bio as bioEs } from './content';

export const site = {
  ...siteEs,
  tagline: 'Financial guidance and education',
  location: 'Barcelona, Spain — online worldwide',
};

export const hero = {
  eyebrow: 'Clarity to decide. Method to move forward',
  headline: 'Your financial future deserves more than improvisation',
  subhead:
    'I help you understand your finances, prioritize what matters, and build your own retirement and investment strategy',
  ctaPrimary: { label: 'Schedule a conversation', href: '/contacto#agenda' },
  ctaSecondary: { label: 'See how I work', href: '/que-hago' },
  modalidad:
    'In-person sessions in Barcelona, Spain. Online for the rest of the world.',
  quote:
    "Financial peace of mind doesn't come from predicting the market, but from having a plan",
};

export const trustPoints = [
  { value: '+11', label: 'years of experience' },
  { value: 'LATAM', label: 'international background' },
  { value: 'EMBA', label: 'Executive MBA · IESA' },
  { value: 'MiFID II', label: 'financial training' },
];

export const services = [
  {
    eyebrow: 'Retirement',
    title: 'Retirement Planning',
    description:
      "We build a concrete plan together to reach your retirement with peace of mind: goals, time horizon, and the decisions that make a difference today.",
  },
  {
    eyebrow: 'Education',
    title: 'Investment & Markets Education',
    description:
      "Understand how fixed income, equities, and investment strategies really work — to make decisions with your own judgment, not out of trend or fear.",
  },
  {
    eyebrow: 'Mentoring',
    title: '1:1 Financial Mentoring',
    description:
      "Personalized sessions with a behavioral focus: solid financial habits, with the coaching tools that are also part of my background.",
  },
];

export const bio = {
  ...bioEs,
  introShort:
    "I'm a financial strategist and, first and foremost, someone who learned by managing their own wealth — with the wins and the lessons that come with it. Since 2015 I've dedicated my career to deeply understanding global markets: fixed income, equities, and investment strategies, always with the same analytical rigor I developed in management roles at multinational corporations.",
  credentials: [
    { title: 'MiFID II Financial Advisory', org: 'Centro de Estudios Financieros (CEF), Spain — 2026 (150h)' },
    { title: 'Executive MBA', org: 'IESA, Caracas — 2013\u20132014' },
    { title: 'BS in Administrative Sciences (Management)', org: 'Universidad Metropolitana (UNIMET) — 1984\u20131989' },
    { title: 'Trading Certifications', org: 'Advanced, Basic and Crypto — 2023\u20132024' },
    { title: 'Coaching Certification & NLP Diploma', org: 'Financial behavior specialist' },
  ],
};

export const complianceNote =
  'Gabriel Lattanzi provides financial guidance, mentoring and education services. This does not constitute regulated investment advice or third-party wealth management.';

export const disclaimers = [
  'Investing in financial markets carries significant risks, including the possible partial or total loss of invested capital. Financial instruments can fluctuate both upward and downward.',
  'Past performance or returns do not constitute a guarantee or indication of future results. No investment strategy assures profits.',
  'The content of this website is for informational and educational purposes only. It does not constitute regulated investment advice, portfolio management, or a recommendation to buy or sell any financial instrument.',
];
