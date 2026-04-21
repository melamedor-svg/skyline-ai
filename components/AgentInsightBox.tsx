import { Bot, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';

type InsightType = 'tip' | 'warning' | 'success' | 'neutral';

type AgentInsightBoxProps = {
  type?: InsightType;
  title: string;
  message: string;
  agent?: string;
};

const iconMap: Record<InsightType, typeof Bot> = {
  tip: Lightbulb,
  warning: AlertTriangle,
  success: Sparkles,
  neutral: Bot,
};

const colorMap: Record<InsightType, string> = {
  tip: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
  warning: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
  success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
  neutral: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-200',
};

export default function AgentInsightBox({
  type = 'neutral',
  title,
  message,
  agent = 'Nexus Agent',
}: AgentInsightBoxProps) {
  const Icon = iconMap[type];
  return (
    <div className={`rounded-xl border p-4 ${colorMap[type]}`}>
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-nexus-bg/40 p-2">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">{title}</h4>
            <span className="text-[10px] uppercase tracking-wider opacity-80">
              {agent}
            </span>
          </div>
          <p className="mt-1 text-sm opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
}
