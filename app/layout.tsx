import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Total Scout AI',
  description:
    'פלטפורמת סקאוטינג מבוססת AI למועדונים, סוכנים ושחקנים.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-slate-950 text-slate-200">
        <div className="flex min-h-screen flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden">
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
