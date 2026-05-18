import {
  mockProjects,
  mockSnapshots,
  type RealEstateProject,
  type QuarterlySnapshot,
  type ProjectCalculations,
} from '@/lib/projects-data';
import { calculateProjectFinancials } from '@/lib/project-calculator';

// ── Projects (Table 1 — read-only from the app's perspective) ────────────────

export async function getProjects(): Promise<RealEstateProject[]> {
  return mockProjects;
}

export async function getProjectById(id: string): Promise<RealEstateProject | undefined> {
  return mockProjects.find((p) => p.id === id);
}

// ── Snapshots (Table 2) ──────────────────────────────────────────────────────

export async function getSnapshotsByProject(projectId: string): Promise<QuarterlySnapshot[]> {
  return mockSnapshots
    .filter((s) => s.projectId === projectId)
    .sort((a, b) => a.quarterReported.localeCompare(b.quarterReported));
}

export async function getLatestSnapshot(projectId: string): Promise<QuarterlySnapshot | undefined> {
  const all = await getSnapshotsByProject(projectId);
  return all.at(-1);
}

export async function getSnapshotById(id: string): Promise<QuarterlySnapshot | undefined> {
  return mockSnapshots.find((s) => s.id === id);
}

/**
 * Enforce the iron rules before accepting a new snapshot:
 * 1. A snapshot for an already-locked quarter is rejected.
 * 2. Only one snapshot per (projectId, quarterReported) is allowed.
 * 3. The new snapshot's quarter must not precede the most-recent locked quarter
 *    (history is immutable — corrections go into the next quarter).
 */
export type SnapshotValidationError =
  | 'QUARTER_ALREADY_EXISTS'
  | 'QUARTER_LOCKED_HISTORY';

export async function addSnapshot(
  input: Omit<QuarterlySnapshot, 'id' | 'isLocked'>,
): Promise<{ ok: true; snapshot: QuarterlySnapshot } | { ok: false; error: SnapshotValidationError }> {
  const existing = await getSnapshotsByProject(input.projectId);

  // Rule: no duplicate quarter
  if (existing.some((s) => s.quarterReported === input.quarterReported)) {
    return { ok: false, error: 'QUARTER_ALREADY_EXISTS' };
  }

  // Rule: cannot insert a quarter before the last locked one
  const lastLocked = [...existing].reverse().find((s) => s.isLocked);
  if (lastLocked && input.quarterReported < lastLocked.quarterReported) {
    return { ok: false, error: 'QUARTER_LOCKED_HISTORY' };
  }

  const snapshot: QuarterlySnapshot = {
    ...input,
    id: `snap_${input.projectId}_${input.quarterReported.toLowerCase().replace('-', '_')}`,
    isLocked: false,
  };

  // Mutate the in-memory store (swap for DB write in production)
  mockSnapshots.push(snapshot);
  return { ok: true, snapshot };
}

// ── Calculations (Table 3 — derived, never stored) ───────────────────────────

export async function getCalculationsForSnapshot(
  snapshotId: string,
): Promise<ProjectCalculations | undefined> {
  const snapshot = await getSnapshotById(snapshotId);
  if (!snapshot) return undefined;

  const project = await getProjectById(snapshot.projectId);
  if (!project) return undefined;

  const allSnapshots = await getSnapshotsByProject(snapshot.projectId);
  const idx = allSnapshots.findIndex((s) => s.id === snapshotId);
  const previousSnapshot = idx > 0 ? allSnapshots[idx - 1] : null;

  return calculateProjectFinancials(project, snapshot, previousSnapshot);
}

export async function getLatestCalculations(
  projectId: string,
): Promise<ProjectCalculations | undefined> {
  const latest = await getLatestSnapshot(projectId);
  if (!latest) return undefined;
  return getCalculationsForSnapshot(latest.id);
}

export async function getAllCalculationsForProject(
  projectId: string,
): Promise<ProjectCalculations[]> {
  const snapshots = await getSnapshotsByProject(projectId);
  const project = await getProjectById(projectId);
  if (!project) return [];

  return snapshots.map((snap, idx) => {
    const prev = idx > 0 ? snapshots[idx - 1] : null;
    return calculateProjectFinancials(project, snap, prev);
  });
}
