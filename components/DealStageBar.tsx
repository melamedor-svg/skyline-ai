import { Check } from 'lucide-react';

export const DEAL_STAGES = [
  'outreach',
  'nda',
  'vdr',
  'closing',
  'won',
] as const;

export type DealStage = (typeof DEAL_STAGES)[number] | 'lost';

const stageLabels: Record<(typeof DEAL_STAGES)[number], string> = {
  outreach: 'Outreach',
  nda: 'NDA',
  vdr: 'VDR',
  closing: 'Closing',
  won: 'Won',
};

export default function DealStageBar({ stage }: { stage: DealStage }) {
  if (stage === 'lost') {
    return (
      <div className="rounded-md bg-nexus-danger/10 px-3 py-2 text-xs font-medium text-nexus-danger">
        Deal lost
      </div>
    );
  }

  const currentIndex = DEAL_STAGES.indexOf(stage);

  return (
    <div className="flex items-center gap-1.5">
      {DEAL_STAGES.map((s, idx) => {
        const isComplete = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        return (
          <div key={s} className="flex flex-1 items-center gap-1.5">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold transition ${
                  isComplete
                    ? 'border-nexus-success bg-nexus-success/20 text-nexus-success'
                    : isCurrent
                      ? 'border-nexus-accent bg-nexus-accent/20 text-nexus-accent2'
                      : 'border-nexus-border bg-nexus-panel text-nexus-muted'
                }`}
              >
                {isComplete ? <Check className="h-3 w-3" /> : idx + 1}
              </div>
              <span
                className={`mt-1 text-[10px] ${
                  isCurrent ? 'text-white' : 'text-nexus-muted'
                }`}
              >
                {stageLabels[s]}
              </span>
            </div>
            {idx < DEAL_STAGES.length - 1 && (
              <div
                className={`mt-[-14px] h-0.5 flex-1 ${
                  isComplete ? 'bg-nexus-success/60' : 'bg-nexus-border'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
