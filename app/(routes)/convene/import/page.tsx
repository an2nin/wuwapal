import ImportPulls from '@/features/import-pulls';
import PageHeader from '@/shared/components/page-header';

export default function ImportPage() {
  return (
    <div>
      <PageHeader title="Import Pulls" />
      <ImportPulls />
    </div>
  );
}
