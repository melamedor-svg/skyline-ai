import Link from 'next/link';
import { Crown, Shield, Briefcase, User, ArrowLeft, Sparkles } from 'lucide-react';

const portals = [
  {
    href: '/admin',
    title: 'God Mode - Admin',
    description: 'שליטה מלאה בפלטפורמה, במשתמשים, במסלולים ובסוכני ה-AI.',
    icon: Crown,
    accent: 'from-amber-500/20 to-rose-500/10',
  },
  {
    href: '/club',
    title: 'Club Portal',
    description: 'פרסום דרישות רכש וקבלת התאמות שחקנים מבוססות AI.',
    icon: Shield,
    accent: 'from-indigo-500/20 to-cyan-500/10',
  },
  {
    href: '/agent',
    title: 'Agent Portal',
    description: 'ניהול תיק שחקנים והתאמה לדרישות מועדונים פעילות.',
    icon: Briefcase,
    accent: 'from-emerald-500/20 to-indigo-500/10',
  },
  {
    href: '/player',
    title: 'Player Portal',
    description: 'פרופיל אישי, ציון TSP, שווי שוק ותובנות לקריירה.',
    icon: User,
    accent: 'from-cyan-500/20 to-emerald-500/10',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-bl from-indigo-500/10 via-slate-900 to-cyan-500/5 p-10">
        <div className="flex items-center gap-2 text-sm text-cyan-400">
          <Sparkles className="h-4 w-4" />
          <span className="tracking-widest">Total Scout AI</span>
        </div>
        <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
          סקאוטינג חכם. עסקאות חכמות יותר.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          פלטפורמה אחת לאדמינים, מועדונים, סוכנים ושחקנים — בחרו פורטל כדי להתחיל.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium text-slate-300">פורטלים</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portals.map(({ href, title, description, icon: Icon, accent }) => (
            <Link
              key={href}
              href={href}
              className={`group rounded-2xl border border-slate-800 bg-gradient-to-br ${accent} p-6 transition hover:border-indigo-500`}
            >
              <div className="mb-4 inline-flex rounded-lg bg-slate-900 p-2">
                <Icon className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-400 opacity-0 transition group-hover:opacity-100">
                כניסה
                <ArrowLeft className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
