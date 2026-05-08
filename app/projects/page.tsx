import Link from 'next/link';
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { getProjects, getLatestCalculations, getLatestSnapshot } from '@/lib/projects-db';
import { PROJECT_TYPE_LABELS } from '@/lib/projects-data';

export const metadata = { title: 'פרויקטים — Nexus' };

function formatILS(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) {
    return `₪${(n / 1_000_000).toFixed(1)}M`;
  }
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(n);
}

function DeviationBadge({ delta }: { delta: number }) {
  if (delta === 0) return <span className="flex items-center gap-1 text-nexus-muted text-xs"><Minus className="h-3 w-3" /> ללא שינוי</span>;
  const positive = delta > 0;
  return (
    <span className={`flex items-center gap-1 text-xs font-medium ${positive ? 'text-nexus-success' : 'text-nexus-danger'}`}>
      {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {positive ? '+' : ''}{formatILS(delta)}
    </span>
  );
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  const rows = await Promise.all(
    projects.map(async (p) => {
      const [calc, snap] = await Promise.all([
        getLatestCalculations(p.id),
        getLatestSnapshot(p.id),
      ]);
      return { project: p, calc, snap };
    }),
  );

  const totalSurplus = rows.reduce((s, r) => s + (r.calc?.expectedSurplus ?? 0), 0);
  const totalRecognized = rows.reduce((s, r) => s + (r.calc?.calculatedRecognizedProfit ?? 0), 0);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm uppercase tracking-widest text-nexus-accent2">
          Module · ניהול פרויקטים
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">פרויקטים פעילים</h1>
        <p className="mt-2 max-w-xl text-sm text-nexus-muted">
          תמונת מצב פיננסית רבעונית לכלל הפרויקטים. נתונים מחושבים לפי שיטת אחוז השלמה.
        </p>
      </header>

      {/* KPI strip */}
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'פרויקטים פעילים', value: projects.length.toString() },
          { label: 'עודפים צפויים (חלק חברה)', value: formatILS(totalSurplus) },
          { label: 'רווח גולמי שהוכר (סה"כ)', value: formatILS(totalRecognized) },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-nexus-border bg-nexus-panel/80 p-5">
            <p className="text-sm text-nexus-muted">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>

      {/* Projects table */}
      <section className="overflow-x-auto rounded-2xl border border-nexus-border bg-nexus-panel/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-nexus-border text-xs uppercase tracking-wider text-nexus-muted">
              <th className="px-5 py-3 text-right font-medium">פרויקט</th>
              <th className="px-5 py-3 text-center font-medium">סוג</th>
              <th className="px-5 py-3 text-center font-medium">חלק %</th>
              <th className="px-5 py-3 text-right font-medium">רבעון אחרון</th>
              <th className="px-5 py-3 text-center font-medium">ביצוע פיזי</th>
              <th className="px-5 py-3 text-center font-medium">מכירות</th>
              <th className="px-5 py-3 text-right font-medium">רווח שהוכר</th>
              <th className="px-5 py-3 text-right font-medium">עודפים צפויים</th>
              <th className="px-5 py-3 text-right font-medium">סטיית הכנסות</th>
              <th className="px-5 py-3 text-center font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ project: p, calc, snap }) => (
              <tr
                key={p.id}
                className="border-b border-nexus-border/50 transition hover:bg-nexus-border/20"
              >
                <td className="px-5 py-4">
                  <div className="flex items-start gap-2">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-nexus-accent2" />
                    <div>
                      <p className="font-medium text-white" dir="rtl">{p.name}</p>
                      <p className="text-xs text-nexus-muted">{p.holdingCompany}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="rounded-md bg-nexus-accent/10 px-2 py-0.5 text-xs text-nexus-accent2" dir="rtl">
                    {PROJECT_TYPE_LABELS[p.projectType]}
                  </span>
                </td>
                <td className="px-5 py-4 text-center text-white font-medium">
                  {p.effectiveSharePct}%
                </td>
                <td className="px-5 py-4 text-right">
                  {snap ? (
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-white">{snap.quarterReported}</span>
                      {snap.isLocked && (
                        <Lock className="h-3 w-3 text-nexus-warning" title="רבעון נעול" />
                      )}
                    </div>
                  ) : (
                    <span className="text-nexus-muted">—</span>
                  )}
                </td>
                <td className="px-5 py-4 text-center">
                  {snap ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-white font-medium">
                        {snap.engineeringStatus.physicalExecutionPct}%
                      </span>
                      <div className="h-1.5 w-16 rounded-full bg-nexus-border">
                        <div
                          className="h-full rounded-full bg-nexus-accent"
                          style={{ width: `${snap.engineeringStatus.physicalExecutionPct}%` }}
                        />
                      </div>
                    </div>
                  ) : '—'}
                </td>
                <td className="px-5 py-4 text-center">
                  {snap ? (
                    <span className="text-white">
                      {snap.salesStatus.unitsSold}/{p.marketingUnits}
                      <span className="ml-1 text-xs text-nexus-muted">
                        ({snap.salesStatus.salesRatePct.toFixed(0)}%)
                      </span>
                    </span>
                  ) : '—'}
                </td>
                <td className="px-5 py-4 text-right font-medium text-white">
                  {calc ? formatILS(calc.calculatedRecognizedProfit) : '—'}
                </td>
                <td className="px-5 py-4 text-right font-medium text-nexus-success">
                  {calc ? formatILS(calc.expectedSurplus) : '—'}
                </td>
                <td className="px-5 py-4 text-right">
                  {calc?.budgetDeviation ? (
                    <DeviationBadge delta={calc.budgetDeviation.revenueDelta} />
                  ) : (
                    <span className="text-nexus-muted text-xs">רבעון ראשון</span>
                  )}
                </td>
                <td className="px-5 py-4 text-center">
                  <Link
                    href={`/projects/${p.id}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-nexus-accent/10 px-3 py-1.5 text-xs text-nexus-accent2 hover:bg-nexus-accent/20 transition"
                  >
                    פרטים <ArrowRight className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
