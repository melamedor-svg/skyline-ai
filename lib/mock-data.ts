import type { DealStage } from '@/components/DealStageBar';

export type SizeClass = 'Small' | 'Medium' | 'Large' | 'Mega';

export type Lead = {
  id: string;
  title: string;
  description: string;
  country: string;
  sector: string;
  sizeClass: SizeClass;
  estValue: number;
  currency: string;
  sourceUrl?: string;
  agentId: string;
  foundAgo: string;
  matchScore: number;
};

export type Deal = {
  id: string;
  leadTitle: string;
  buyerName: string | null;
  sellerName: string | null;
  stage: DealStage;
  feeModel: string;
  feeExpected: number;
  currency: string;
  nextAction: string;
  updatedAgo: string;
  country: string;
  sector: string;
};

export const mockLeads: Lead[] = [
  {
    id: 'lead_01',
    title: 'Mid-size SaaS Platform (Fintech vertical)',
    description:
      'Profitable B2B SaaS serving SMB banks in the Nordics. ARR ~$12M, 35% YoY growth, founder seeking exit within 12 months.',
    country: 'Sweden',
    sector: 'Fintech / SaaS',
    sizeClass: 'Medium',
    estValue: 48_000_000,
    currency: 'USD',
    sourceUrl: 'https://example.com/lead-01',
    agentId: 'EU-Scout-02',
    foundAgo: '2h ago',
    matchScore: 92,
  },
  {
    id: 'lead_02',
    title: 'Port infrastructure concession — West Africa',
    description:
      'Government tender for 25-year concession of container terminal. Estimated CAPEX $180M, IRR 14-18%.',
    country: 'Ghana',
    sector: 'Infrastructure',
    sizeClass: 'Large',
    estValue: 180_000_000,
    currency: 'USD',
    sourceUrl: 'https://example.com/lead-02',
    agentId: 'AFR-Tender-01',
    foundAgo: '5h ago',
    matchScore: 81,
  },
  {
    id: 'lead_03',
    title: 'Distressed hotel portfolio (6 properties)',
    description:
      'Regional hotel operator in restructuring. Six 4-star properties across Southern Europe, combined 820 keys.',
    country: 'Portugal',
    sector: 'Hospitality / Real Estate',
    sizeClass: 'Medium',
    estValue: 65_000_000,
    currency: 'EUR',
    sourceUrl: 'https://example.com/lead-03',
    agentId: 'Distress-Bot-07',
    foundAgo: '1d ago',
    matchScore: 76,
  },
  {
    id: 'lead_04',
    title: 'Renewable energy platform — 420MW pipeline',
    description:
      'Solar and BESS developer with 420MW late-stage pipeline across LATAM. Sponsor seeking strategic partner / full exit.',
    country: 'Chile',
    sector: 'Renewable Energy',
    sizeClass: 'Mega',
    estValue: 540_000_000,
    currency: 'USD',
    sourceUrl: 'https://example.com/lead-04',
    agentId: 'LATAM-Energy-03',
    foundAgo: '3h ago',
    matchScore: 88,
  },
  {
    id: 'lead_05',
    title: 'Specialty chemicals manufacturer',
    description:
      'Family-owned, 45-year-old specialty chemicals business. EBITDA $6.5M, succession-driven sale.',
    country: 'Germany',
    sector: 'Industrial / Chemicals',
    sizeClass: 'Small',
    estValue: 42_000_000,
    currency: 'EUR',
    agentId: 'EU-Scout-02',
    foundAgo: '8h ago',
    matchScore: 69,
  },
  {
    id: 'lead_06',
    title: 'AI-driven logistics startup — Series B',
    description:
      'AI routing and fleet-optimization SaaS. $8M ARR, 110% NRR. Raising $25M Series B; strategic M&A optional.',
    country: 'Singapore',
    sector: 'Logistics / AI',
    sizeClass: 'Medium',
    estValue: 120_000_000,
    currency: 'USD',
    sourceUrl: 'https://example.com/lead-06',
    agentId: 'APAC-Tech-04',
    foundAgo: '12h ago',
    matchScore: 84,
  },
];

export const mockDeals: Deal[] = [
  {
    id: 'deal_01',
    leadTitle: 'Mid-size SaaS Platform (Fintech vertical)',
    buyerName: 'Meridian Capital Partners',
    sellerName: 'NordicBank Solutions AB',
    stage: 'nda',
    feeModel: 'Lehman',
    feeExpected: 1_920_000,
    currency: 'USD',
    nextAction: 'Return counter-signed NDA to buyer counsel.',
    updatedAgo: '35m ago',
    country: 'Sweden',
    sector: 'Fintech / SaaS',
  },
  {
    id: 'deal_02',
    leadTitle: 'Renewable energy platform — 420MW pipeline',
    buyerName: 'Helios Infrastructure Fund III',
    sellerName: 'Andes Green Power',
    stage: 'vdr',
    feeModel: 'Success 1.2%',
    feeExpected: 6_480_000,
    currency: 'USD',
    nextAction: 'Populate VDR with updated interconnection studies.',
    updatedAgo: '2h ago',
    country: 'Chile',
    sector: 'Renewable Energy',
  },
  {
    id: 'deal_03',
    leadTitle: 'Distressed hotel portfolio (6 properties)',
    buyerName: null,
    sellerName: 'Atlantico Hospitality S.A.',
    stage: 'outreach',
    feeModel: 'Retainer + 2%',
    feeExpected: 1_300_000,
    currency: 'EUR',
    nextAction: 'AI-generate blind teasers and send to 12 hospitality funds.',
    updatedAgo: '1d ago',
    country: 'Portugal',
    sector: 'Hospitality / Real Estate',
  },
  {
    id: 'deal_04',
    leadTitle: 'AI-driven logistics startup — Series B',
    buyerName: 'Horizon Growth Equity',
    sellerName: 'RouteIQ Pte. Ltd.',
    stage: 'closing',
    feeModel: 'Success 2%',
    feeExpected: 2_400_000,
    currency: 'USD',
    nextAction: 'Coordinate final SPA redlines; target signing next Tuesday.',
    updatedAgo: '20m ago',
    country: 'Singapore',
    sector: 'Logistics / AI',
  },
  {
    id: 'deal_05',
    leadTitle: 'Specialty chemicals manufacturer',
    buyerName: 'Rheinland Industrial Holdings',
    sellerName: 'Müller Spezialchemie GmbH',
    stage: 'won',
    feeModel: 'Lehman',
    feeExpected: 840_000,
    currency: 'EUR',
    nextAction: 'Issue final invoice; schedule post-closing review.',
    updatedAgo: '4d ago',
    country: 'Germany',
    sector: 'Industrial / Chemicals',
  },
  {
    id: 'deal_06',
    leadTitle: 'Regional telecom tower portfolio',
    buyerName: 'TowerCo Asia',
    sellerName: 'Bharat Connect',
    stage: 'lost',
    feeModel: 'Success 1.5%',
    feeExpected: 0,
    currency: 'USD',
    nextAction: 'Archive deal; capture loss reason for agent retraining.',
    updatedAgo: '2d ago',
    country: 'India',
    sector: 'Telecom / Infrastructure',
  },
];
