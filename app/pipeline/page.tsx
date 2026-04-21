import {
  Briefcase,
  DollarSign,
  Target,
  Building2,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import DealStageBar, { DEAL_STAGES } from '@/components/DealStageBar';
import AgentInsightBox from '@/components/AgentInsightBox';
import { getDeals } from '@/lib/db';

export const metadata = {
  title: 'Deal Pipeline — Nexus',
};

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    notation: value >= 1_000_000 ? 'compact' : 'standard',
  }).format(value);
}

export default async function PipelinePage() {
  const deals = await getDeals();

  const activeDeals = deals.filter(
    (d) => d.stage !== 'won' && d.stage !== 'lost',
  );
  const totalExpectedFees = deals
    .filter((d) => d.stage !== 'lost')
    .reduce((sum, d) => {
      const rate = d.currency === 'EUR' ? 1.08 : 1;
      return sum + d.feeExpected * rate;
    }, 0);
  const wonCount = deals.filter((d) => d.stage === 'won').length;

  const stageCounts = DEAL_STAGES.map((stage) => ({
    stage,
    count: deals.filter((d) => d.stage === stage).length,
  }));

  const stats = [
    {
      label: 'Active Deals',
      value: activeDeals.length.toString(),
      icon: Briefcase,
    },
    {
      label: 'Expected Fees',
      value: `$${(totalExpectedFees / 1_000_000).toFixed(2)}M`,
      icon: DollarSign,
    },
    {
      label: 'Closed Won',
      value: wonCount.toString(),
      icon: Target,
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm uppercase tracking-widest text-nexus-accent2">
          Module · Deal Flow
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">
          Active Pipeline
        </h1>
        <p className="mt-2 max-w-xl text-sm text-nexus-muted">
          Every deal from first outreach to signing. Agents advance stages,
          generate documents, and flag blockers automatically.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-nexus-border bg-nexus-panel/80 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-nexus-muted">{label}</p>
              <Icon className="h-4 w-4 text-nexus-accent2" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-nexus-border bg-nexus-panel/60 p-5">
        <h2 className="mb-3 text-sm font-medium text-gray-300">
          Stage distribution
        </h2>
        <div className="flex flex-wrap gap-3">
          {stageCounts.map(({ stage, count }) => (
            <div
              key={stage}
              className="flex items-center gap-2 rounded-lg border border-nexus-border bg-nexus-bg/60 px-3 py-2"
            >
              <span className="text-xs uppercase tracking-wider text-nexus-muted">
                {stage}
              </span>
              <span className="text-sm font-semibold text-white">{count}</span>
            </div>
          ))}
        </div>
      </section>

      <AgentInsightBox
        type="warning"
        agent="Closer-Bot"
        title="Deal deal_04 entering closing — action required"
        message="SPA redlines pending counsel review. Target signing in 4 business days. AI-recommended: schedule closing call and lock VDR."
      />

      <section>
        <h2 className="mb-4 text-lg font-medium text-white">Deals</h2>
        <div className="space-y-4">
          {deals.map((deal) => (
            <article
              key={deal.id}
              className="rounded-2xl border border-nexus-border bg-nexus-panel/80 p-6 transition hover:border-nexus-accent"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-[240px]">
                  <h3 className="text-base font-semibold text-white">
                    {deal.leadTitle}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-nexus-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {deal.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {deal.sector}
                    </span>
                    <span>Updated {deal.updatedAgo}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-nexus-muted">Expected fee</p>
                  <p className="text-lg font-semibold text-white">
                    {formatMoney(deal.feeExpected, deal.currency)}
                  </p>
                  <p className="text-xs text-nexus-accent2">{deal.feeModel}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <div className="text-xs text-nexus-muted">
                  <p>
                    Buyer:{' '}
                    <span className="text-gray-200">
                      {deal.buyerName ?? 'Not yet matched'}
                    </span>
                  </p>
                  <p className="mt-1">
                    Seller:{' '}
                    <span className="text-gray-200">
                      {deal.sellerName ?? '—'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <DealStageBar stage={deal.stage} />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-nexus-border pt-4">
                <div className="flex items-start gap-2 text-sm">
                  <ArrowRight className="mt-0.5 h-4 w-4 text-nexus-accent2" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-nexus-muted">
                      Next action
                    </p>
                    <p className="text-gray-200">{deal.nextAction}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg bg-nexus-accent px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                  Open deal
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
