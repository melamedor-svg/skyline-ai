import { Radar, Globe2, Zap, Filter } from 'lucide-react';
import LeadCard from '@/components/LeadCard';
import AgentInsightBox from '@/components/AgentInsightBox';
import { getLeads } from '@/lib/db';

export const metadata = {
  title: 'Opportunity Radar — Nexus',
};

export default async function DashboardPage() {
  const leads = await getLeads();

  const totalValue = leads.reduce((sum, l) => {
    const rate = l.currency === 'EUR' ? 1.08 : 1;
    return sum + l.estValue * rate;
  }, 0);

  const topMatch = leads.reduce((top, l) =>
    l.matchScore > top.matchScore ? l : top,
  );

  const stats = [
    {
      label: 'Active Leads',
      value: leads.length.toString(),
      icon: Radar,
    },
    {
      label: 'Pipeline TAM',
      value: `$${(totalValue / 1_000_000).toFixed(0)}M`,
      icon: Globe2,
    },
    {
      label: 'Avg. Match',
      value: `${Math.round(leads.reduce((s, l) => s + l.matchScore, 0) / leads.length)}%`,
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-nexus-accent2">
            Module · Radar
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-white">
            Opportunity Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm text-nexus-muted">
            AI-sourced leads from 42 global sources. Ranked by match score
            against your active mandates and preferences.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-nexus-border bg-nexus-panel px-4 py-2 text-sm text-gray-200 hover:border-nexus-accent"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
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

      <AgentInsightBox
        type="tip"
        agent="Matchmaker-01"
        title={`High-confidence match: ${topMatch.title}`}
        message={`Match score ${topMatch.matchScore}% against mandate "Global SaaS — growth equity". Recommended next action: generate blind teaser and outreach to 4 aligned funds.`}
      />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Live Leads</h2>
          <span className="text-xs text-nexus-muted">
            Updated {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      </section>
    </div>
  );
}
