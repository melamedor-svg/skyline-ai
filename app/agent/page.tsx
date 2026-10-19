import PortalHeader from '@/components/PortalHeader';

export const metadata = {
  title: 'Agent Portal — Total Scout AI',
};

export default function AgentPage() {
  return (
    <PortalHeader
      title="Agent Portal"
      subtitle="נהלו את תיק השחקנים שלכם והתאימו אותם לדרישות פעילות של מועדונים."
      badge="סוכן"
    />
  );
}
