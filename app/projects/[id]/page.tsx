import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  CalendarDays,
  Lock,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import {
  getProjectById,
  getSnapshotsByProject,
  getAllCalculationsForProject,
} from '@/lib/projects-db';
import { PROJECT_TYPE_LABELS } from '@/lib/projects-data';
import type { ProjectCalculations, QuarterlySnapshot } from '@/lib/projects-data';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  return { title: project ? `${project.name} — Nexus` : 'Project not found' };
}

function formatILS(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `₪${(n / 1_000_000).toFixed(2)}M`;
  return `₪${n.toLocaleString('he-IL')}`;
}

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('he-IL', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function DeltaCell({ delta }: { delta: number }) {
  if (delta === 0)
    return <span className="flex items-center justify-end gap-1 text-nexus-muted"><Minus className="h-3 w-3" /></span>;
  const up = delta > 0;
  return (
    <span className={`flex items-center justify-end gap-1 font-medium ${up ? 'text-nexus-success' : 'text-nexus-danger'}`}>
      {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {up ? '+' : ''}{formatILS(delta)}
    </span>
  );
}

function ProgressBar({ pct, color = 'bg-nexus-accent' }: { pct: number; color?: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-nexus-border">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  if (!project) notFound();

  const [snapshots, calculations] = await Promise.all([
    getSnapshotsByProject(params.id),
    getAllCalculationsForProject(params.id),
  ]);

  const calcBySnap = new Map<string, ProjectCalculations>(
    calculations.map((c) => [c.snapshotId, c]),
  );

  const latest = snapshots.at(-1);
  const latestCalc = latest ? calcBySnap.get(latest.id) : undefined;

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-nexus-muted hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        כל הפרויקטים
      </Link>

      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-nexus-accent2">
            Module · ניהול פרויקטים
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-white" dir="rtl">{project.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-nexus-muted">
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {project.holdingCompany}
            </span>
            <ChevronRight className="h-3 w-3" />
            <span className="rounded-md bg-nexus-accent/10 px-2 py-0.5 text-xs text-nexus-accent2" dir="rtl">
              {PROJECT_TYPE_LABELS[project.projectType]}
            </span>
            <ChevronRight className="h-3 w-3" />
            <span>חלק אפקטיבי: <strong className="text-white">{project.effectiveSharePct}%</strong></span>
          </div>
        </div>
      </header>

      {/* Master data cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'סה"כ יח"ד', value: project.totalUnits.toString() },
          { label: 'יח"ד לשיווק', value: project.marketingUnits.toString() },
          { label: 'סה"כ מבנים', value: project.architectureConstraints.totalBuildings.toString() },
          { label: 'חלק אפקטיבי', value: `${project.effectiveSharePct}%` },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-nexus-border bg-nexus-panel/80 p-5">
            <p className="text-sm text-nexus-muted" dir="rtl">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>

      {/* Architecture & dates */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-nexus-border bg-nexus-panel/60 p-5 space-y-3">
          <h2 className="text-sm font-medium text-gray-300" dir="rtl">תמהיל מבנים</h2>
          <p className="text-sm text-white" dir="rtl">{project.architectureConstraints.buildingMix}</p>
        </div>

        <div className="rounded-2xl border border-nexus-border bg-nexus-panel/60 p-5 space-y-3">
          <h2 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-nexus-accent2" />
            תאריכי מפתח
          </h2>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm" dir="rtl">
            {[
              ['התקשרות בעסקה', project.keyDates.transactionDate],
              ['רכישת קרקע', project.keyDates.landPurchaseDate],
              ['התחלת ביצוע', project.keyDates.constructionStartDate],
              ['סיום משוער', project.keyDates.estimatedCompletionDate],
            ].map(([label, date]) => (
              <>
                <dt key={`dt-${label}`} className="text-nexus-muted">{label}</dt>
                <dd key={`dd-${label}`} className="text-white font-medium">{formatDate(date)}</dd>
              </>
            ))}
          </dl>
        </div>
      </section>

      {/* Latest snapshot KPIs */}
      {latestCalc && latest && (
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-white" dir="rtl">
            תמונת מצב עדכנית — {latest.quarterReported}
            {latest.isLocked && (
              <span className="ml-2 inline-flex items-center gap-1 text-xs text-nexus-warning">
                <Lock className="h-3 w-3" /> נעול
              </span>
            )}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: 'רווח גולמי שהוכר',
                value: formatILS(latestCalc.calculatedRecognizedProfit),
                sub: `מתוך ${formatILS(latestCalc.expectedTotalGrossProfit)}`,
                color: 'text-nexus-accent2',
              },
              {
                label: 'רווח גולמי שנותר להכיר',
                value: formatILS(latestCalc.unrecognizedGrossProfit),
                sub: `ביצוע פיזי: ${latest.engineeringStatus.physicalExecutionPct}%`,
                color: 'text-white',
              },
              {
                label: 'עודפים צפויים (חלק חברה)',
                value: formatILS(latestCalc.expectedSurplus),
                sub: `${project.effectiveSharePct}% × רווח כולל`,
                color: 'text-nexus-success',
              },
              {
                label: 'יח"ד מכורות',
                value: `${latest.salesStatus.unitsSold} / ${project.marketingUnits}`,
                sub: `${latest.salesStatus.salesRatePct.toFixed(1)}% מכירות`,
                color: 'text-white',
              },
            ].map(({ label, value, sub, color }) => (
              <div key={label} className="rounded-2xl border border-nexus-border bg-nexus-panel/80 p-5">
                <p className="text-sm text-nexus-muted" dir="rtl">{label}</p>
                <p className={`mt-2 text-2xl font-semibold ${color}`}>{value}</p>
                <p className="mt-1 text-xs text-nexus-muted">{sub}</p>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-nexus-border bg-nexus-panel/60 p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-nexus-muted" dir="rtl">ביצוע פיזי</span>
                <span className="text-white font-medium">{latest.engineeringStatus.physicalExecutionPct}%</span>
              </div>
              <ProgressBar pct={latest.engineeringStatus.physicalExecutionPct} color="bg-nexus-accent" />
              <div className="flex justify-between text-sm">
                <span className="text-nexus-muted" dir="rtl">שיעור השלמה הנדסי</span>
                <span className="text-white font-medium">{latest.engineeringStatus.completionPct}%</span>
              </div>
              <ProgressBar pct={latest.engineeringStatus.completionPct} color="bg-nexus-accent2" />
            </div>
            <div className="rounded-2xl border border-nexus-border bg-nexus-panel/60 p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-nexus-muted" dir="rtl">שיעור מכירות</span>
                <span className="text-white font-medium">{latest.salesStatus.salesRatePct.toFixed(1)}%</span>
              </div>
              <ProgressBar pct={latest.salesStatus.salesRatePct} color="bg-nexus-success" />
            </div>
          </div>
        </section>
      )}

      {/* Quarterly history table */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-white" dir="rtl">היסטוריה רבעונית</h2>
        <div className="overflow-x-auto rounded-2xl border border-nexus-border bg-nexus-panel/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nexus-border text-xs uppercase tracking-wider text-nexus-muted">
                <th className="px-4 py-3 text-right font-medium">רבעון</th>
                <th className="px-4 py-3 text-center font-medium">ביצוע פיזי</th>
                <th className="px-4 py-3 text-center font-medium">מכירות</th>
                <th className="px-4 py-3 text-right font-medium">הכנסות צפויות</th>
                <th className="px-4 py-3 text-right font-medium">עלויות גולמיות</th>
                <th className="px-4 py-3 text-right font-medium">רווח שהוכר</th>
                <th className="px-4 py-3 text-right font-medium">סטיית הכנסות</th>
                <th className="px-4 py-3 text-right font-medium">סטיית עלויות</th>
                <th className="px-4 py-3 text-center font-medium">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {snapshots.map((snap: QuarterlySnapshot) => {
                const calc = calcBySnap.get(snap.id);
                return (
                  <tr
                    key={snap.id}
                    className="border-b border-nexus-border/50 transition hover:bg-nexus-border/20"
                  >
                    <td className="px-4 py-3 text-right font-medium text-white">
                      {snap.quarterReported}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-white">{snap.engineeringStatus.physicalExecutionPct}%</span>
                        <div className="h-1 w-12 rounded-full bg-nexus-border">
                          <div
                            className="h-full rounded-full bg-nexus-accent"
                            style={{ width: `${snap.engineeringStatus.physicalExecutionPct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-white">
                      {snap.salesStatus.unitsSold}
                      <span className="ml-1 text-xs text-nexus-muted">
                        ({snap.salesStatus.salesRatePct.toFixed(0)}%)
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-white">
                      {formatILS(snap.financialInputs.expectedRevenue)}
                    </td>
                    <td className="px-4 py-3 text-right text-white">
                      {formatILS(snap.financialInputs.totalGrossCosts)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-nexus-accent2">
                      {calc ? formatILS(calc.calculatedRecognizedProfit) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {calc?.budgetDeviation ? (
                        <DeltaCell delta={calc.budgetDeviation.revenueDelta} />
                      ) : (
                        <span className="flex justify-end text-xs text-nexus-muted">ראשון</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {calc?.budgetDeviation ? (
                        <DeltaCell delta={calc.budgetDeviation.costDelta} />
                      ) : (
                        <span className="flex justify-end text-xs text-nexus-muted">ראשון</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {snap.isLocked ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-nexus-warning/10 px-2 py-0.5 text-xs text-nexus-warning">
                          <Lock className="h-3 w-3" /> נעול
                        </span>
                      ) : (
                        <span className="rounded-md bg-nexus-success/10 px-2 py-0.5 text-xs text-nexus-success">
                          פתוח
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-nexus-muted" dir="rtl">
          * רבעון נעול — לא ניתן לשינוי רטרואקטיבי. תיקונים מדווחים ברבעון הבא בלבד.
        </p>
      </section>
    </div>
  );
}
