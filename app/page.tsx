import Link from 'next/link';
import { Radar, GitBranch, Settings, ArrowRight, Sparkles } from 'lucide-react';

const featureCards = [
  {
    href: '/dashboard',
    title: 'Opportunity Radar',
    description:
      'AI agents continuously scan global sources for M&A, tenders, and distressed asset leads.',
    icon: Radar,
    accent: 'from-indigo-500/20 to-cyan-500/10',
  },
  {
    href: '/pipeline',
    title: 'Deal Pipeline',
    description:
      'Track active deals from outreach to closing with automated stage-based workflows.',
    icon: GitBranch,
    accent: 'from-emerald-500/20 to-indigo-500/10',
  },
  {
    href: '/settings',
    title: 'Platform Settings',
    description:
      'Configure AI models, fee structures (Lehman, retainer, success), and agent behavior.',
    icon: Settings,
    accent: 'from-amber-500/20 to-rose-500/10',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-nexus-border bg-gradient-to-br from-indigo-500/10 via-nexus-panel to-cyan-500/5 p-10">
        <div className="flex items-center gap-2 text-sm text-nexus-accent2">
          <Sparkles className="h-4 w-4" />
          <span className="uppercase tracking-widest">Nexus Platform</span>
        </div>
        <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
          AI Global Brokerage, Reimagined.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-nexus-muted">
          Nexus uses autonomous AI agents to detect, qualify, and broker
          cross-border business opportunities — from sourcing to closing.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-nexus-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Open Radar
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/pipeline"
            className="inline-flex items-center gap-2 rounded-lg border border-nexus-border bg-nexus-panel px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-nexus-accent"
          >
            View Pipeline
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium text-gray-300">Modules</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map(({ href, title, description, icon: Icon, accent }) => (
            <Link
              key={href}
              href={href}
              className={`group rounded-2xl border border-nexus-border bg-gradient-to-br ${accent} p-6 transition hover:border-nexus-accent`}
            >
              <div className="mb-4 inline-flex rounded-lg bg-nexus-panel p-2">
                <Icon className="h-5 w-5 text-nexus-accent2" />
              </div>
              <h3 className="text-lg font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm text-nexus-muted">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-nexus-accent2 opacity-0 transition group-hover:opacity-100">
                Open
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
