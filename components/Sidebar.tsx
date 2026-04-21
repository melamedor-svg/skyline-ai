'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Radar,
  GitBranch,
  Settings,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/dashboard', label: 'Radar', icon: Radar },
  { href: '/pipeline', label: 'Pipeline', icon: GitBranch },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-nexus-border bg-nexus-panel/60 px-4 py-6 md:block">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="rounded-lg bg-nexus-accent/20 p-2">
          <Sparkles className="h-5 w-5 text-nexus-accent2" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Nexus</p>
          <p className="text-xs text-nexus-muted">AI Brokerage</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === '/' ? pathname === '/' : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? 'bg-nexus-accent/15 text-white'
                  : 'text-nexus-muted hover:bg-nexus-border/50 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-xl border border-nexus-border bg-nexus-bg/60 p-4">
        <p className="text-xs font-medium text-nexus-accent2">Agents Online</p>
        <p className="mt-1 text-2xl font-semibold text-white">7 / 8</p>
        <p className="mt-1 text-xs text-nexus-muted">
          Scanning 42 global sources.
        </p>
      </div>
    </aside>
  );
}
