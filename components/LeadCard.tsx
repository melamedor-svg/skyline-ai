import {
  MapPin,
  Building2,
  TrendingUp,
  ExternalLink,
  Bot,
  Clock,
} from 'lucide-react';
import type { Lead } from '@/lib/mock-data';

const sizeColorMap: Record<Lead['sizeClass'], string> = {
  Small: 'bg-gray-500/20 text-gray-300',
  Medium: 'bg-cyan-500/20 text-cyan-300',
  Large: 'bg-indigo-500/20 text-indigo-300',
  Mega: 'bg-amber-500/20 text-amber-300',
};

function formatCurrency(value: number, currency: string) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    notation: value >= 1_000_000 ? 'compact' : 'standard',
  });
  return formatter.format(value);
}

export default function LeadCard({ lead }: { lead: Lead }) {
  return (
    <article className="group rounded-2xl border border-nexus-border bg-nexus-panel/80 p-5 transition hover:border-nexus-accent">
      <header className="flex items-start justify-between gap-3">
        <div>
          <span
            className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${sizeColorMap[lead.sizeClass]}`}
          >
            {lead.sizeClass}
          </span>
          <h3 className="mt-2 text-base font-semibold text-white">
            {lead.title}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-nexus-muted">Match</p>
          <p className="text-lg font-semibold text-nexus-accent2">
            {lead.matchScore}%
          </p>
        </div>
      </header>

      <p className="mt-3 line-clamp-3 text-sm text-nexus-muted">
        {lead.description}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-nexus-muted">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>{lead.country}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5" />
          <span>{lead.sector}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5" />
          <span className="font-medium text-gray-200">
            {formatCurrency(lead.estValue, lead.currency)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          <span>{lead.foundAgo}</span>
        </div>
      </dl>

      <footer className="mt-5 flex items-center justify-between border-t border-nexus-border pt-3 text-xs">
        <div className="flex items-center gap-1.5 text-nexus-muted">
          <Bot className="h-3.5 w-3.5 text-nexus-accent2" />
          <span>Agent: {lead.agentId}</span>
        </div>
        {lead.sourceUrl && (
          <a
            href={lead.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-nexus-accent2 hover:underline"
          >
            Source <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </footer>
    </article>
  );
}
