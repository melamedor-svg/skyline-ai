import PortalHeader from '@/components/PortalHeader';

export const metadata = {
  title: 'Club Portal — Total Scout AI',
};

export default function ClubPage() {
  return (
    <PortalHeader
      title="Club Portal"
      subtitle="פרסמו דרישות רכש, קבלו התאמות שחקנים ודוחות דיון של סוכני AI."
      badge="מועדון"
    />
  );
}
