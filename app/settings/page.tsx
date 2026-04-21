import { Cpu, DollarSign, Shield } from 'lucide-react';

export const metadata = {
  title: 'Settings — Nexus',
};

const sections = [
  {
    icon: Cpu,
    title: 'AI Models',
    description:
      'Choose which models power sourcing, matching, and document generation.',
    items: [
      { label: 'Primary LLM', value: 'gpt-4o' },
      { label: 'Matching model', value: 'claude-opus-4-7' },
      { label: 'Doc generation', value: 'gpt-4o' },
    ],
  },
  {
    icon: DollarSign,
    title: 'Fee Models',
    description:
      'Default fee structures available when creating a new deal mandate.',
    items: [
      { label: 'Flat percent', value: '2.0%' },
      { label: 'Lehman', value: '5/4/3/2/1' },
      { label: 'Retainer + success', value: '$10K/mo + 1%' },
    ],
  },
  {
    icon: Shield,
    title: 'Access & Security',
    description:
      'NextAuth providers, session policies, and VDR access controls.',
    items: [
      { label: 'Auth provider', value: 'NextAuth.js' },
      { label: 'Session TTL', value: '12h' },
      { label: 'VDR provider', value: 'Internal' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm uppercase tracking-widest text-nexus-accent2">
          Module · Settings
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">
          Platform Configuration
        </h1>
        <p className="mt-2 max-w-xl text-sm text-nexus-muted">
          Configure the AI engine, fee models, and access controls that power
          the Nexus brokerage platform.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {sections.map(({ icon: Icon, title, description, items }) => (
          <section
            key={title}
            className="rounded-2xl border border-nexus-border bg-nexus-panel/80 p-6"
          >
            <div className="mb-4 inline-flex rounded-lg bg-nexus-bg/60 p-2">
              <Icon className="h-5 w-5 text-nexus-accent2" />
            </div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-1 text-sm text-nexus-muted">{description}</p>
            <dl className="mt-4 space-y-2">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-t border-nexus-border pt-2 text-sm"
                >
                  <dt className="text-nexus-muted">{item.label}</dt>
                  <dd className="font-medium text-gray-100">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
