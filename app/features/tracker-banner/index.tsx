'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BANNERS } from '@/shared/constants/game/banners';
import useIndexDB from '@/shared/hooks/use-index-db';
import BannerLuckStats from './components/banner-luck-stats';
import BannerPullBreakdown from './components/banner-pull-breakdown';
import BannerStatsSection from './components/banner-stats-section';
import BannerTable from './components/banner-table';
import { processBannerForDetailed } from './utils/processor';

export default function TrackerBanner() {
  const searchParams = useSearchParams();
  const bannerId = searchParams.get('id') || 'featured_resonator';
  const { getBannerById, banners } = useIndexDB('default');

  const processedBanner = useMemo(() => {
    if (!bannerId || !banners)
      return undefined;

    const banner = getBannerById(bannerId);
    if (!banner)
      return undefined;

    return processBannerForDetailed(banner);
  }, [bannerId, banners]);

  return (
    <div className="flex flex-col gap-5">
      <BannerStatsSection
        processedBanner={processedBanner || null}
        bannerInfo={BANNERS[bannerId || 'featured_resonator']}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-3">
        <div className="flex flex-col lg:gap-6 gap-3 h-full">
          {/* <BannerFFStat processedBanner={processedBanner} /> */}
          <BannerLuckStats processedBanner={processedBanner} />
          <BannerPullBreakdown processedBanner={processedBanner} />
        </div>
        <div className="lg:col-span-2">
          <BannerTable processedBanner={processedBanner || null} />
        </div>
      </div>
    </div>
  );
}
