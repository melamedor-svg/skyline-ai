import PortalHeader from '@/components/PortalHeader';

export const metadata = {
  title: 'God Mode - Admin — Total Scout AI',
};

export default function AdminPage() {
  return (
    <PortalHeader
      title="God Mode - Admin"
      subtitle="ניהול פלטפורמה מלא: משתמשים, מסלולים, קרדיטים וסוכני AI."
      badge="אדמין"
    />
  );
}
