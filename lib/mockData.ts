// Total Scout AI — mock data for the multi-portal platform (Admin / Club / Agent / Player).
// All monetary values are in EUR unless stated otherwise. Dates are ISO-8601 strings.

export type Persona = 'admin' | 'club' | 'agent' | 'player';

export type Position =
  | 'GK'
  | 'CB'
  | 'LB'
  | 'RB'
  | 'CDM'
  | 'CM'
  | 'CAM'
  | 'LW'
  | 'RW'
  | 'ST';

export type PreferredFoot = 'Left' | 'Right' | 'Both';

export type AIAgentRole =
  | 'Scout'
  | 'Analyst'
  | 'Financial'
  | 'Medical'
  | 'PR'
  | 'Moderator';

export type DebateStance = 'for' | 'against' | 'neutral';

export type AIAgentDebateEntry = {
  id: string;
  agent: AIAgentRole;
  agentName: string;
  stance: DebateStance;
  message: string;
  confidence: number; // 0-1
  timestamp: string;
};

export type AIAgentsDebateLog = {
  id: string;
  topic: string;
  createdAt: string;
  entries: AIAgentDebateEntry[];
  verdict: {
    recommendation: 'Sign' | 'Monitor' | 'Pass';
    consensusScore: number; // 0-100
    summary: string;
  };
};

export type PRRiskFactor = {
  label: string;
  severity: 'low' | 'medium' | 'high';
  note: string;
};

export type PlayerStats = {
  season: string;
  appearances: number;
  minutes: number;
  goals: number;
  assists: number;
  xG: number;
  xA: number;
  passAccuracy: number; // %
  duelsWonPct: number; // %
};

export type TSPBreakdown = {
  technical: number;
  physical: number;
  tactical: number;
  mental: number;
  potential: number;
};

export type Player = {
  id: string;
  name: string;
  nameHe: string;
  age: number;
  dateOfBirth: string;
  nationality: string;
  position: Position;
  secondaryPositions: Position[];
  preferredFoot: PreferredFoot;
  heightCm: number;
  currentClub: string;
  league: string;
  marketValue: number;
  marketValueTrend: 'up' | 'down' | 'stable';
  weeklyWage: number;
  contractEndDate: string;
  releaseClause: number | null;
  /** Total Scout Projection — overall 0-100 score. */
  TSP: number;
  tspBreakdown: TSPBreakdown;
  stats: PlayerStats;
  injuryHistory: { injury: string; from: string; to: string }[];
  agentId: string | null;
  tags: string[];
  AI_Agents_Debate_Logs: AIAgentsDebateLog[];
  /** Public-relations / off-field reputational risk, 0 (clean) - 100 (toxic). */
  PR_Risk_Score: number;
  prRiskFactors: PRRiskFactor[];
};

export type DemandStatus = 'open' | 'shortlisting' | 'negotiating' | 'filled';

export type ActiveDemand = {
  id: string;
  clubId: string;
  clubName: string;
  league: string;
  country: string;
  title: string;
  position: Position;
  ageRange: { min: number; max: number };
  maxTransferFee: number;
  maxWeeklyWage: number;
  preferredFoot?: PreferredFoot;
  minTSP: number;
  maxPRRisk: number;
  dealTypes: ('Permanent' | 'Loan' | 'Loan-to-Buy' | 'Free Agent')[];
  window: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: DemandStatus;
  postedAt: string;
  matchedPlayerIds: string[];
  notes: string;
};

export type AgentPortfolioEntry = {
  playerId: string;
  representationSince: string;
  representationEndDate: string;
  commissionPct: number;
  status: 'active' | 'exploring-market' | 'in-negotiation' | 'renewal-pending';
  interestedClubs: string[];
  nextAction: string;
};

export type Agent = {
  id: string;
  name: string;
  nameHe: string;
  agency: string;
  licenseNumber: string;
  country: string;
  plan: PlanTier;
  credits: number;
  portfolio: AgentPortfolioEntry[];
};

export type PlanTier = 'Free' | 'Pro' | 'Enterprise';

export type Wallet = {
  plan: PlanTier;
  credits: number;
  renewsAt: string;
};

// ---------------------------------------------------------------------------
// Players
// ---------------------------------------------------------------------------

export const mockPlayers: Player[] = [
  {
    id: 'plr_001',
    name: 'Daniel Avraham',
    nameHe: 'דניאל אברהם',
    age: 22,
    dateOfBirth: '2004-03-11',
    nationality: 'Israel',
    position: 'CDM',
    secondaryPositions: ['CM', 'CB'],
    preferredFoot: 'Right',
    heightCm: 184,
    currentClub: 'Maccabi Haifa',
    league: "Ligat Ha'Al",
    marketValue: 1_800_000,
    marketValueTrend: 'up',
    weeklyWage: 9_500,
    contractEndDate: '2027-06-30',
    releaseClause: 3_500_000,
    TSP: 84,
    tspBreakdown: {
      technical: 79,
      physical: 86,
      tactical: 88,
      mental: 82,
      potential: 90,
    },
    stats: {
      season: '2025/26',
      appearances: 31,
      minutes: 2_640,
      goals: 2,
      assists: 5,
      xG: 1.8,
      xA: 4.1,
      passAccuracy: 89.4,
      duelsWonPct: 63.2,
    },
    injuryHistory: [
      { injury: 'Hamstring strain', from: '2025-02-02', to: '2025-02-24' },
    ],
    agentId: 'agt_001',
    tags: ['Ball-winner', 'Press-resistant', 'Leader'],
    AI_Agents_Debate_Logs: [
      {
        id: 'dbt_001',
        topic: 'Should a Belgian Pro League club sign Avraham this summer?',
        createdAt: '2026-10-12T09:14:00Z',
        entries: [
          {
            id: 'dbt_001_1',
            agent: 'Scout',
            agentName: 'Scout-IL-01',
            stance: 'for',
            message:
              'Top 5% in the league for progressive passes from deep and interceptions per 90. Reads transitions extremely well.',
            confidence: 0.86,
            timestamp: '2026-10-12T09:14:10Z',
          },
          {
            id: 'dbt_001_2',
            agent: 'Analyst',
            agentName: 'Tactica-03',
            stance: 'for',
            message:
              'Fits a double-pivot 4-2-3-1. Pressing intensity (PPDA contribution) translates well to higher-tempo leagues.',
            confidence: 0.79,
            timestamp: '2026-10-12T09:14:42Z',
          },
          {
            id: 'dbt_001_3',
            agent: 'Financial',
            agentName: 'LedgerBot',
            stance: 'neutral',
            message:
              'Fee of ~€2M is fair, but the €3.5M release clause rises 20% in January. Act in the summer window to avoid the step-up.',
            confidence: 0.74,
            timestamp: '2026-10-12T09:15:05Z',
          },
          {
            id: 'dbt_001_4',
            agent: 'Medical',
            agentName: 'MediScan',
            stance: 'neutral',
            message:
              'One soft-tissue injury in 24 months — within normal range. Recommend load-management monitoring.',
            confidence: 0.81,
            timestamp: '2026-10-12T09:15:30Z',
          },
          {
            id: 'dbt_001_5',
            agent: 'Moderator',
            agentName: 'Arbiter',
            stance: 'for',
            message:
              'Consensus: strong sporting case, manageable risk. Recommend opening talks with the agent before January.',
            confidence: 0.83,
            timestamp: '2026-10-12T09:16:00Z',
          },
        ],
        verdict: {
          recommendation: 'Sign',
          consensusScore: 82,
          summary:
            'High-ceiling defensive midfielder at a below-market price; window of opportunity closes in January.',
        },
      },
    ],
    PR_Risk_Score: 12,
    prRiskFactors: [
      {
        label: 'Social media',
        severity: 'low',
        note: 'Low-volume, positive engagement. No controversies on record.',
      },
    ],
  },
  {
    id: 'plr_002',
    name: 'Lucas Ferreira',
    nameHe: 'לוקאס פריירה',
    age: 19,
    dateOfBirth: '2007-07-22',
    nationality: 'Brazil',
    position: 'LW',
    secondaryPositions: ['ST', 'CAM'],
    preferredFoot: 'Left',
    heightCm: 172,
    currentClub: 'Athletico Paranaense',
    league: 'Brasileirão Série A',
    marketValue: 6_500_000,
    marketValueTrend: 'up',
    weeklyWage: 7_000,
    contractEndDate: '2028-12-31',
    releaseClause: 40_000_000,
    TSP: 91,
    tspBreakdown: {
      technical: 93,
      physical: 78,
      tactical: 80,
      mental: 85,
      potential: 97,
    },
    stats: {
      season: '2026',
      appearances: 28,
      minutes: 1_910,
      goals: 9,
      assists: 7,
      xG: 7.2,
      xA: 6.5,
      passAccuracy: 81.0,
      duelsWonPct: 48.7,
    },
    injuryHistory: [],
    agentId: 'agt_001',
    tags: ['1v1 dribbler', 'Wonderkid', 'Inverted winger'],
    AI_Agents_Debate_Logs: [
      {
        id: 'dbt_002',
        topic: 'Is Ferreira ready for a top-5 European league move?',
        createdAt: '2026-10-15T17:40:00Z',
        entries: [
          {
            id: 'dbt_002_1',
            agent: 'Scout',
            agentName: 'Scout-LATAM-04',
            stance: 'for',
            message:
              'Elite take-on success rate (62%) and carries into the box. Rare acceleration over 5–10m.',
            confidence: 0.91,
            timestamp: '2026-10-15T17:40:12Z',
          },
          {
            id: 'dbt_002_2',
            agent: 'Analyst',
            agentName: 'Tactica-03',
            stance: 'against',
            message:
              'Defensive work-rate drops sharply after 60 minutes. Needs a system that shelters him off the ball.',
            confidence: 0.72,
            timestamp: '2026-10-15T17:40:50Z',
          },
          {
            id: 'dbt_002_3',
            agent: 'Financial',
            agentName: 'LedgerBot',
            stance: 'against',
            message:
              'Selling club valuation (€15M+) is 2.3x current market value. Sell-on clause demands of 20% reduce resale upside.',
            confidence: 0.77,
            timestamp: '2026-10-15T17:41:20Z',
          },
          {
            id: 'dbt_002_4',
            agent: 'PR',
            agentName: 'Sentinel',
            stance: 'neutral',
            message:
              'Rapidly growing following (1.2M). Strong commercial value; family-run entourage could complicate negotiations.',
            confidence: 0.68,
            timestamp: '2026-10-15T17:41:44Z',
          },
          {
            id: 'dbt_002_5',
            agent: 'Moderator',
            agentName: 'Arbiter',
            stance: 'neutral',
            message:
              'Split decision. Suggest a loan-to-buy structure via a partner club to de-risk adaptation.',
            confidence: 0.75,
            timestamp: '2026-10-15T17:42:10Z',
          },
        ],
        verdict: {
          recommendation: 'Monitor',
          consensusScore: 61,
          summary:
            'Generational talent, but price and tactical maturity argue for a staged pathway.',
        },
      },
    ],
    PR_Risk_Score: 38,
    prRiskFactors: [
      {
        label: 'Entourage',
        severity: 'medium',
        note: 'Father acts as intermediary alongside the licensed agent.',
      },
      {
        label: 'Social media',
        severity: 'low',
        note: 'High visibility; occasional provocative celebration posts.',
      },
    ],
  },
  {
    id: 'plr_003',
    name: 'Marko Petrović',
    nameHe: 'מרקו פטרוביץ׳',
    age: 27,
    dateOfBirth: '1999-01-05',
    nationality: 'Serbia',
    position: 'ST',
    secondaryPositions: ['CAM'],
    preferredFoot: 'Right',
    heightCm: 190,
    currentClub: 'Red Star Belgrade',
    league: 'Serbian SuperLiga',
    marketValue: 4_200_000,
    marketValueTrend: 'stable',
    weeklyWage: 18_000,
    contractEndDate: '2026-06-30',
    releaseClause: null,
    TSP: 76,
    tspBreakdown: {
      technical: 77,
      physical: 84,
      tactical: 72,
      mental: 64,
      potential: 70,
    },
    stats: {
      season: '2025/26',
      appearances: 34,
      minutes: 2_870,
      goals: 21,
      assists: 4,
      xG: 17.9,
      xA: 3.2,
      passAccuracy: 72.5,
      duelsWonPct: 55.1,
    },
    injuryHistory: [
      { injury: 'ACL tear (left knee)', from: '2023-09-10', to: '2024-05-01' },
      { injury: 'Ankle sprain', from: '2025-11-03', to: '2025-11-20' },
    ],
    agentId: 'agt_002',
    tags: ['Target man', 'Aerial threat', 'Free agent soon'],
    AI_Agents_Debate_Logs: [
      {
        id: 'dbt_003',
        topic: 'Pre-contract opportunity: sign Petrović on a free?',
        createdAt: '2026-10-17T11:05:00Z',
        entries: [
          {
            id: 'dbt_003_1',
            agent: 'Scout',
            agentName: 'Scout-BAL-02',
            stance: 'for',
            message:
              'Consistent 0.65 npxG/90 over two seasons. Dominant in the air (71% aerials won).',
            confidence: 0.82,
            timestamp: '2026-10-17T11:05:15Z',
          },
          {
            id: 'dbt_003_2',
            agent: 'Medical',
            agentName: 'MediScan',
            stance: 'against',
            message:
              'Prior ACL reconstruction. Sprint metrics are 6% below pre-injury baseline — re-injury risk is elevated.',
            confidence: 0.78,
            timestamp: '2026-10-17T11:05:40Z',
          },
          {
            id: 'dbt_003_3',
            agent: 'PR',
            agentName: 'Sentinel',
            stance: 'against',
            message:
              'Two disciplinary incidents in 2025 (red card for dissent, public dispute with coach). Media sentiment trending negative.',
            confidence: 0.84,
            timestamp: '2026-10-17T11:06:02Z',
          },
          {
            id: 'dbt_003_4',
            agent: 'Financial',
            agentName: 'LedgerBot',
            stance: 'for',
            message:
              'Zero transfer fee. Even with a signing bonus, total cost is ~45% below an equivalent paid transfer.',
            confidence: 0.88,
            timestamp: '2026-10-17T11:06:30Z',
          },
          {
            id: 'dbt_003_5',
            agent: 'Moderator',
            agentName: 'Arbiter',
            stance: 'neutral',
            message:
              'Value proposition is strong but character and medical flags are real. Recommend a 2-year deal with appearance-based incentives.',
            confidence: 0.76,
            timestamp: '2026-10-17T11:07:00Z',
          },
        ],
        verdict: {
          recommendation: 'Monitor',
          consensusScore: 58,
          summary:
            'Productive striker on a free; structure the contract to hedge medical and behavioral risk.',
        },
      },
    ],
    PR_Risk_Score: 67,
    prRiskFactors: [
      {
        label: 'Disciplinary record',
        severity: 'high',
        note: '2 suspensions in the last 18 months.',
      },
      {
        label: 'Media sentiment',
        severity: 'medium',
        note: 'Negative coverage after public dispute with head coach.',
      },
    ],
  },
  {
    id: 'plr_004',
    name: 'Noam Cohen',
    nameHe: 'נועם כהן',
    age: 24,
    dateOfBirth: '2002-05-18',
    nationality: 'Israel',
    position: 'RB',
    secondaryPositions: ['RW'],
    preferredFoot: 'Right',
    heightCm: 178,
    currentClub: 'Hapoel Be\'er Sheva',
    league: "Ligat Ha'Al",
    marketValue: 1_100_000,
    marketValueTrend: 'up',
    weeklyWage: 6_000,
    contractEndDate: '2027-06-30',
    releaseClause: 2_000_000,
    TSP: 79,
    tspBreakdown: {
      technical: 76,
      physical: 85,
      tactical: 78,
      mental: 80,
      potential: 81,
    },
    stats: {
      season: '2025/26',
      appearances: 33,
      minutes: 2_800,
      goals: 1,
      assists: 8,
      xG: 1.1,
      xA: 6.9,
      passAccuracy: 82.3,
      duelsWonPct: 58.6,
    },
    injuryHistory: [],
    agentId: 'agt_002',
    tags: ['Overlapping full-back', 'Crosser', 'High stamina'],
    AI_Agents_Debate_Logs: [],
    PR_Risk_Score: 8,
    prRiskFactors: [],
  },
];

// ---------------------------------------------------------------------------
// Active club demands
// ---------------------------------------------------------------------------

export const mockActiveDemands: ActiveDemand[] = [
  {
    id: 'dmd_001',
    clubId: 'club_001',
    clubName: 'KAA Gent',
    league: 'Belgian Pro League',
    country: 'Belgium',
    title: 'Wanted: Defensive Midfielder, under €2M',
    position: 'CDM',
    ageRange: { min: 19, max: 24 },
    maxTransferFee: 2_000_000,
    maxWeeklyWage: 12_000,
    minTSP: 80,
    maxPRRisk: 30,
    dealTypes: ['Permanent', 'Loan-to-Buy'],
    window: 'Winter 2027',
    priority: 'high',
    status: 'shortlisting',
    postedAt: '2026-10-08T08:00:00Z',
    matchedPlayerIds: ['plr_001'],
    notes: 'Replacement for captain departing in January. Must be comfortable in a double pivot.',
  },
  {
    id: 'dmd_002',
    clubId: 'club_002',
    clubName: 'Maccabi Tel Aviv',
    league: "Ligat Ha'Al",
    country: 'Israel',
    title: 'Wanted: Target Striker, free agent or under €1.5M',
    position: 'ST',
    ageRange: { min: 23, max: 30 },
    maxTransferFee: 1_500_000,
    maxWeeklyWage: 20_000,
    preferredFoot: 'Right',
    minTSP: 72,
    maxPRRisk: 70,
    dealTypes: ['Free Agent', 'Permanent'],
    window: 'Summer 2027',
    priority: 'urgent',
    status: 'open',
    postedAt: '2026-10-14T12:30:00Z',
    matchedPlayerIds: ['plr_003'],
    notes: 'European qualifiers campaign — need aerial presence. Open to pre-contract signings.',
  },
  {
    id: 'dmd_003',
    clubId: 'club_003',
    clubName: 'FC Twente',
    league: 'Eredivisie',
    country: 'Netherlands',
    title: 'Wanted: U21 Left Winger with resale potential',
    position: 'LW',
    ageRange: { min: 17, max: 21 },
    maxTransferFee: 8_000_000,
    maxWeeklyWage: 10_000,
    preferredFoot: 'Left',
    minTSP: 85,
    maxPRRisk: 45,
    dealTypes: ['Permanent', 'Loan-to-Buy'],
    window: 'Summer 2027',
    priority: 'medium',
    status: 'negotiating',
    postedAt: '2026-09-28T15:45:00Z',
    matchedPlayerIds: ['plr_002'],
    notes: 'Development model: buy, grow, sell within 3 seasons.',
  },
  {
    id: 'dmd_004',
    clubId: 'club_004',
    clubName: 'Austria Wien',
    league: 'Austrian Bundesliga',
    country: 'Austria',
    title: 'Wanted: Attacking Right-Back on loan',
    position: 'RB',
    ageRange: { min: 20, max: 26 },
    maxTransferFee: 0,
    maxWeeklyWage: 8_000,
    minTSP: 75,
    maxPRRisk: 25,
    dealTypes: ['Loan', 'Loan-to-Buy'],
    window: 'Winter 2027',
    priority: 'low',
    status: 'open',
    postedAt: '2026-10-18T10:10:00Z',
    matchedPlayerIds: ['plr_004'],
    notes: 'Season-long loan with option to buy; must contribute in final third.',
  },
];

// ---------------------------------------------------------------------------
// Agents & portfolio
// ---------------------------------------------------------------------------

export const mockAgents: Agent[] = [
  {
    id: 'agt_001',
    name: 'Yossi Ben-David',
    nameHe: 'יוסי בן-דוד',
    agency: 'BD Global Sports',
    licenseNumber: 'FIFA-AG-2023-04817',
    country: 'Israel',
    plan: 'Enterprise',
    credits: 12,
    portfolio: [
      {
        playerId: 'plr_001',
        representationSince: '2022-08-01',
        representationEndDate: '2027-07-31',
        commissionPct: 10,
        status: 'exploring-market',
        interestedClubs: ['KAA Gent', 'Standard Liège', 'Sparta Prague'],
        nextAction: 'Send highlight reel + AI debate report to KAA Gent sporting director.',
      },
      {
        playerId: 'plr_002',
        representationSince: '2024-01-15',
        representationEndDate: '2028-01-14',
        commissionPct: 8,
        status: 'in-negotiation',
        interestedClubs: ['FC Twente', 'Benfica', 'RB Salzburg'],
        nextAction: 'Counter-offer to Twente: reduce sell-on clause from 20% to 12%.',
      },
    ],
  },
  {
    id: 'agt_002',
    name: 'Elena Kovač',
    nameHe: 'אלנה קובאץ׳',
    agency: 'Balkan Elite Management',
    licenseNumber: 'FIFA-AG-2023-01922',
    country: 'Croatia',
    plan: 'Pro',
    credits: 4,
    portfolio: [
      {
        playerId: 'plr_003',
        representationSince: '2020-06-01',
        representationEndDate: '2026-12-31',
        commissionPct: 10,
        status: 'renewal-pending',
        interestedClubs: ['Maccabi Tel Aviv', 'Hajduk Split'],
        nextAction: 'Prepare pre-contract pitch emphasising free-transfer value.',
      },
      {
        playerId: 'plr_004',
        representationSince: '2023-03-10',
        representationEndDate: '2027-03-09',
        commissionPct: 7,
        status: 'active',
        interestedClubs: ['Austria Wien'],
        nextAction: 'Confirm loan terms and buy-option price with Hapoel Be\'er Sheva.',
      },
    ],
  },
];

/** Portfolio of the agent currently signed in to the Agent portal. */
export const mockAgentPortfolio = {
  agent: mockAgents[0],
  players: mockAgents[0].portfolio.map((entry) => ({
    ...entry,
    player: mockPlayers.find((p) => p.id === entry.playerId)!,
  })),
};

// ---------------------------------------------------------------------------
// Wallet / plan of the signed-in account
// ---------------------------------------------------------------------------

export const mockWallet: Wallet = {
  plan: 'Enterprise',
  credits: 12,
  renewsAt: '2026-11-01',
};
