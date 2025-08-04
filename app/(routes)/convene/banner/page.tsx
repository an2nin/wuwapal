import { Suspense } from 'react';
import TrackerBanner from '@/features/tracker-banner';
import BannerSwitcher from '@/features/tracker-banner/components/banner-switcher';
import CustomLoader from '@/shared/components/layout/custom-loader';
import PageHeader from '@/shared/components/page-header';

export default function ConveneBannerPage() {
  return (
    <Suspense fallback={<CustomLoader />}>
      <div>
        <PageHeader title={<BannerSwitcher />} backRoute="/convene" />
        <TrackerBanner />
      </div>
    </Suspense>
  );
}
