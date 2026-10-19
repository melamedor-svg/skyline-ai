'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Crown,
  Shield,
  Briefcase,
  User,
  Radar,
  GitBranch,
  Settings,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { mockWallet, type Persona } from '@/lib/mockData';

const personas: {
  id: Persona;
  href: string;
  label: string;
  description: string;
  icon: typeof Crown;
}[] = [
  { id: 'admin', href: '/admin', label: 'אדמין', description: 'God Mode', icon: Crown },
  { id: 'club', href: '/club', label: 'מועדון', description: 'Club Portal', icon: Shield },
  { id: 'agent', href: '/agent', label: 'סוכן', description: 'Agent Portal', icon: Briefcase },
  { id: 'player', href: '/player', label: 'שחקן', description: 'Player Portal', icon: User },
];

const toolItems = [
  { href: '/dashboard', label: 'רדאר', icon: Radar },
  { href: '/pipeline', label: 'פייפליין', icon: GitBranch },
  { href: '/settings', label: 'הגדרות', icon: Settings },
];

function WalletWidget() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
        <Wallet className="h-4 w-4" />
        <span>ארנק / מסלול</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-white">
        מסלול {mockWallet.plan} | {mockWallet.credits} קרדיטים
      </p>
      <p className="mt-1 text-xs text-slate-400">
        מתחדש ב-{new Date(mockWallet.renewsAt).toLocaleDateString('he-IL')}
      </p>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname?.startsWith(href) ?? false;

  return (
    <>
      {/* Desktop sidebar (sits on the right in RTL) */}
      <aside className="hidden w-64 shrink-0 flex-col gap-8 border-e border-slate-800 bg-slate-900/60 px-4 py-6 md:flex">
        <Link href="/" className="flex items-center gap-2 px-2">
          <div className="rounded-lg bg-indigo-500/20 p-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Total Scout AI</p>
            <p className="text-xs text-slate-400">פלטפורמת סקאוטינג חכמה</p>
          </div>
        </Link>

        <nav aria-label="החלפת פרסונה">
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            החלפת פרסונה
          </p>
          <div className="space-y-1">
            {personas.map(({ id, href, label, description, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={id}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? 'bg-indigo-500/15 text-white ring-1 ring-indigo-500/40'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{label}</span>
                  <span className="text-[10px] text-slate-500" dir="ltr">
                    {description}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        <nav aria-label="כלים">
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            כלים
          </p>
          <div className="space-y-1">
            {toolItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive(href)
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-auto">
          <WalletWidget />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="text-sm font-semibold text-white">
            Total Scout AI
          </Link>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-200">
            מסלול {mockWallet.plan} | {mockWallet.credits} קרדיטים
          </span>
        </div>
        <nav aria-label="החלפת פרסונה" className="mt-3 grid grid-cols-4 gap-1">
          {personas.map(({ id, href, label, icon: Icon }) => (
            <Link
              key={id}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-lg py-2 text-xs transition ${
                isActive(href)
                  ? 'bg-indigo-500/15 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
