// Traducciones en inglés — misma estructura que content.ts

import { site as siteEs } from './content';

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
  { value: 'EMBA', label: 'Executive MBA \u00b7 IESA' },
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
  introShort:
    "I'm a financial strategist and, first and foremost, someone who learned by managing their own wealth — with the wins and the lessons that come with it. Since 2015 I've dedicated my career to deeply understanding global markets: fixed income, equities, and investment strategies, always with the same analytical rigor I developed in management roles at multinational corporations.",
  intro:
    "I'm a financial strategist and, first and foremost, someone who learned by managing their own wealth — with the wins and the lessons that come with it. Since 2015 I've dedicated my career to deeply understanding global markets: fixed income, equities, and investment strategies, always with the same analytical rigor I developed in management roles at multinational corporations.",
  corporate:
    "Before dedicating myself fully to markets, I spent over a decade in management positions at Bayer and Schering, leading business analysis, marketing, and financial control in Venezuela, and regional projects in Mexico. That corporate perspective — of budgets, projections, and data-driven decisions — is the same one I apply today when working with people on their finances.",
  philosophy:
    "I don't sell financial products or manage anyone else's money beyond my own. What I offer is guidance: I help you understand your options, build a clear-headed retirement plan, and develop the judgment to make better financial decisions — using the coaching and behavioral finance tools that are also part of my training.",
  credentials: [
    { title: 'MiFID II Financial Advisory', org: 'Centro de Estudios Financieros (CEF), Spain \u2014 2026 (150h)' },
    { title: 'Executive MBA', org: 'IESA, Caracas \u2014 2013\u20132014' },
    { title: 'BS in Administrative Sciences (Management)', org: 'Universidad Metropolitana (UNIMET) \u2014 1984\u20131989' },
    { title: 'Trading Certifications', org: 'Advanced, Basic and Crypto \u2014 2023\u20132024' },
    { title: 'Coaching Certification & NLP Diploma', org: 'Financial behavior specialist' },
  ],
  timeline: [
    {
      role: 'Independent Financial Consultant',
      place: 'Spain / Global',
      period: '2015 \u2014 Present',
      detail:
        'Personal investment portfolio management, risk-profile-based strategy design, and financial guidance.',
    },
    {
      role: 'New Business Manager',
      place: 'Bayer S.A. \u2013 Schering',
      period: '2009 \u2014 2013',
      detail: 'Financial analysis and viability assessments for product and business unit acquisitions.',
    },
    {
      role: 'Regional Manager, Salesforce Effectiveness',
      place: 'Schering AG (CECLA, Mexico)',
      period: '2006 \u2014 2007',
      detail:
        'Regional sales force effectiveness project across Argentina, Brazil, Canada, Mexico and Colombia.',
    },
    {
      role: 'Marketing Controlling Manager',
      place: 'Schering de Venezuela',
      period: '1999 \u2014 2004',
      detail: 'Three-year budgets, sales projections, and capital investment planning.',
    },
  ],
  languages: ['Spanish (native)', 'English (advanced)', 'Italian (intermediate)'],
};

export const complianceNote =
  'Gabriel Lattanzi provides financial guidance, mentoring and education services. This does not constitute regulated investment advice or third-party wealth management.';

export const disclaimers = [
  'Investing in financial markets carries significant risks, including the possible partial or total loss of invested capital. Financial instruments can fluctuate both upward and downward.',
  'Past performance or returns do not constitute a guarantee or indication of future results. No investment strategy assures profits.',
  'The content of this website is for informational and educational purposes only. It does not constitute regulated investment advice, portfolio management, or a recommendation to buy or sell any financial instrument.',
];
