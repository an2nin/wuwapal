import TrackerSummary from '@/features/pull-journey';
import BannerSwitch from '@/features/pull-journey/components/banner-switch';
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
