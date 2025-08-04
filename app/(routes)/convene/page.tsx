import TrackerSummary from '@/features/tracker-summary';
import BannerSwitch from '@/features/tracker-summary/components/banner-switch';
import PageHeader from '@/shared/components/page-header';

export default function ConvenePage() {
  return (
    <div>
      <PageHeader title="Your Pull Journey">
        <BannerSwitch />
      </PageHeader>
      <TrackerSummary />
    </div>
  );
}
