import type {
  RealEstateProject,
  QuarterlySnapshot,
  ProjectCalculations,
} from '@/lib/projects-data';

/**
 * Pure, stateless calculation engine for Table 3.
 * Takes immutable inputs; never writes to any store.
 *
 * Accounting method: percentage-of-completion (PoC) per IFRS 15 / Israeli GAAP.
 *
 * Recognised profit = physicalExecutionPct × expected gross profit (full project).
 * Company surplus   = expected gross profit × effectiveSharePct.
 * Budget deviation  = delta of revenue/cost inputs vs. the previous snapshot.
 */
export function calculateProjectFinancials(
  project: RealEstateProject,
  snapshot: QuarterlySnapshot,
  previousSnapshot: QuarterlySnapshot | null,
): ProjectCalculations {
  const { expectedRevenue, totalGrossCosts } = snapshot.financialInputs;
  const physicalPct = snapshot.engineeringStatus.physicalExecutionPct / 100;
  const sharePct = project.effectiveSharePct / 100;

  const expectedTotalGrossProfit = expectedRevenue - totalGrossCosts;
  const calculatedRecognizedProfit = physicalPct * expectedTotalGrossProfit;
  const unrecognizedGrossProfit = expectedTotalGrossProfit - calculatedRecognizedProfit;
  const expectedSurplus = expectedTotalGrossProfit * sharePct;

  const budgetDeviation = previousSnapshot
    ? {
        revenueDelta:
          expectedRevenue - previousSnapshot.financialInputs.expectedRevenue,
        costDelta:
          totalGrossCosts - previousSnapshot.financialInputs.totalGrossCosts,
      }
    : null;

  return {
    projectId: project.id,
    snapshotId: snapshot.id,
    quarterReported: snapshot.quarterReported,
    expectedTotalGrossProfit,
    calculatedRecognizedProfit,
    unrecognizedGrossProfit,
    expectedSurplus,
    budgetDeviation,
  };
}
