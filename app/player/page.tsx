import PortalHeader from '@/components/PortalHeader';

export const metadata = {
  title: 'Player Portal — Total Scout AI',
};

export default function PlayerPage() {
  return (
    <PortalHeader
      title="Player Portal"
      subtitle="הפרופיל שלכם, ציון TSP, שווי שוק ותובנות לשיפור."
      badge="שחקן"
    />
  );
}
