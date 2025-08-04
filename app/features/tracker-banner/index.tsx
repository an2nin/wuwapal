'use client';

import type { ProcessedBanner } from '@/shared/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BANNERS } from '@/shared/constants/game/banners';
import useIndexDB from '@/shared/hooks/use-index-db';
import BannerStatsSection from './components/banner-stats-section';
import { processBannerForDetailed } from './utils/processor';

export default function TrackerBanner() {
  const searchParams = useSearchParams();
  const bannerId = searchParams.get('id');

  const { getBannerById, banners } = useIndexDB('default');
  const [processedBanner, setProcessedBanner] = useState<ProcessedBanner | null>(null);

  useEffect(() => {
    if (!bannerId || !banners)
      return;
    const banner = getBannerById(bannerId);
    if (banner) {
      const processed = processBannerForDetailed(banner);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setProcessedBanner(processed);
    }
  }, [banners]);

  return (
    <div className="flex flex-col gap-5">
      <BannerStatsSection
        processedBanner={processedBanner && processedBanner}
        bannerInfo={BANNERS[bannerId || 'featured_resonator']}
      />
    </div>
  );
}
