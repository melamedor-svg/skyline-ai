type PortalHeaderProps = {
  title: string;
  subtitle: string;
  badge: string;
};

export default function PortalHeader({ title, subtitle, badge }: PortalHeaderProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-gradient-to-bl from-indigo-500/10 via-slate-900 to-cyan-500/5 p-8">
      <span className="inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-400">
        {badge}
      </span>
      <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{title}</h1>
      <p className="mt-2 text-slate-400">{subtitle}</p>
    </section>
  );
}
