export type ProjectType = 'pinui-binui' | 'tama38-1' | 'tama38-2';

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  'pinui-binui': 'פינוי בינוי',
  'tama38-1': 'תמ"א 38/1',
  'tama38-2': 'תמ"א 38/2',
};

export type KeyDates = {
  transactionDate: string;
  landPurchaseDate: string | null;
  constructionStartDate: string | null;
  estimatedCompletionDate: string;
};

export type ArchitectureConstraints = {
  totalBuildings: number;
  buildingMix: string;
};

export type RealEstateProject = {
  id: string;
  name: string;
  holdingCompany: string;
  effectiveSharePct: number;
  projectType: ProjectType;
  keyDates: KeyDates;
  architectureConstraints: ArchitectureConstraints;
  totalUnits: number;
  marketingUnits: number;
};

export type EngineeringStatus = {
  completionPct: number;
  physicalExecutionPct: number;
};

export type SalesStatus = {
  unitsSold: number;
  salesRatePct: number;
};

export type FinancialInputs = {
  expectedRevenue: number;
  totalGrossCosts: number;
};

export type QuarterlySnapshot = {
  id: string;
  projectId: string;
  quarterReported: string;
  isLocked: boolean;
  engineeringStatus: EngineeringStatus;
  salesStatus: SalesStatus;
  financialInputs: FinancialInputs;
};

export type BudgetDeviation = {
  revenueDelta: number;
  costDelta: number;
};

export type ProjectCalculations = {
  projectId: string;
  snapshotId: string;
  quarterReported: string;
  expectedTotalGrossProfit: number;
  calculatedRecognizedProfit: number;
  unrecognizedGrossProfit: number;
  expectedSurplus: number;
  budgetDeviation: BudgetDeviation | null;
};

// ── Mock data ────────────────────────────────────────────────────────────────

export const mockProjects: RealEstateProject[] = [
  {
    id: 'proj_001',
    name: 'מתחם לכיש, קריית גת',
    holdingCompany: 'Skyline Development Ltd.',
    effectiveSharePct: 50,
    projectType: 'pinui-binui',
    keyDates: {
      transactionDate: '2022-01-15',
      landPurchaseDate: '2023-06-01',
      constructionStartDate: '2024-01-10',
      estimatedCompletionDate: '2027-12-31',
    },
    architectureConstraints: {
      totalBuildings: 7,
      buildingMix: '4 מגדלי 25 קומות, 3 בניינים של 10 קומות',
    },
    totalUnits: 450,
    marketingUnits: 380,
  },
  {
    id: 'proj_002',
    name: 'מגדלי הרצליה פיתוח',
    holdingCompany: 'Skyline Development Ltd.',
    effectiveSharePct: 100,
    projectType: 'tama38-2',
    keyDates: {
      transactionDate: '2020-09-01',
      landPurchaseDate: '2021-03-15',
      constructionStartDate: '2022-06-01',
      estimatedCompletionDate: '2026-06-30',
    },
    architectureConstraints: {
      totalBuildings: 2,
      buildingMix: '2 מגדלים של 30 קומות',
    },
    totalUnits: 120,
    marketingUnits: 110,
  },
  {
    id: 'proj_003',
    name: 'רח׳ ביאליק 14, רמת גן',
    holdingCompany: 'Skyline Development Ltd.',
    effectiveSharePct: 75,
    projectType: 'tama38-1',
    keyDates: {
      transactionDate: '2023-11-01',
      landPurchaseDate: null,
      constructionStartDate: '2025-03-01',
      estimatedCompletionDate: '2027-03-31',
    },
    architectureConstraints: {
      totalBuildings: 1,
      buildingMix: 'בניין 1 של 8 קומות (תוספת 3 קומות)',
    },
    totalUnits: 24,
    marketingUnits: 18,
  },
];

export const mockSnapshots: QuarterlySnapshot[] = [
  // proj_001 — Q4-2025
  {
    id: 'snap_001_q4_2025',
    projectId: 'proj_001',
    quarterReported: 'Q4-2025',
    isLocked: true,
    engineeringStatus: { completionPct: 35, physicalExecutionPct: 32 },
    salesStatus: { unitsSold: 140, salesRatePct: 36.8 },
    financialInputs: { expectedRevenue: 380_000_000, totalGrossCosts: 290_000_000 },
  },
  // proj_001 — Q1-2026
  {
    id: 'snap_001_q1_2026',
    projectId: 'proj_001',
    quarterReported: 'Q1-2026',
    isLocked: true,
    engineeringStatus: { completionPct: 42, physicalExecutionPct: 40 },
    salesStatus: { unitsSold: 165, salesRatePct: 43.4 },
    financialInputs: { expectedRevenue: 395_000_000, totalGrossCosts: 302_000_000 },
  },
  // proj_002 — Q4-2025
  {
    id: 'snap_002_q4_2025',
    projectId: 'proj_002',
    quarterReported: 'Q4-2025',
    isLocked: true,
    engineeringStatus: { completionPct: 60, physicalExecutionPct: 58 },
    salesStatus: { unitsSold: 95, salesRatePct: 86.4 },
    financialInputs: { expectedRevenue: 185_000_000, totalGrossCosts: 120_000_000 },
  },
  // proj_002 — Q1-2026
  {
    id: 'snap_002_q1_2026',
    projectId: 'proj_002',
    quarterReported: 'Q1-2026',
    isLocked: true,
    engineeringStatus: { completionPct: 68, physicalExecutionPct: 65 },
    salesStatus: { unitsSold: 102, salesRatePct: 92.7 },
    financialInputs: { expectedRevenue: 188_000_000, totalGrossCosts: 123_000_000 },
  },
  // proj_003 — Q1-2026
  {
    id: 'snap_003_q1_2026',
    projectId: 'proj_003',
    quarterReported: 'Q1-2026',
    isLocked: false,
    engineeringStatus: { completionPct: 15, physicalExecutionPct: 12 },
    salesStatus: { unitsSold: 8, salesRatePct: 44.4 },
    financialInputs: { expectedRevenue: 25_000_000, totalGrossCosts: 18_000_000 },
  },
];
