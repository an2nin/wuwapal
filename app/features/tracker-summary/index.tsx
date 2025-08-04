'use client';
import { useMemo } from 'react';
import { REGULAR_BANNERS, SPECIAL_BANNERS } from '@/shared/constants/game/banners';
import useIndexDB from '@/shared/hooks/use-index-db';
import { useLayoutStore } from '@/shared/stores/layout';
import NoPullFound from './components/no-pull-found';
import SummaryCard from './components/summary-card';

export default function TrackerSummary() {
  const { banners, isLoading } = useIndexDB('default');
  const layoutStore = useLayoutStore(state => state);

  const isNoPullFound = useMemo(() => {
  // Don't say "no pulls" until data is actually loaded
    if (isLoading)
      return false;
    return banners.length === 0;
  }, [banners, isLoading]);

  return (
    <>
      {isNoPullFound && <NoPullFound />}
      <div className="grid gap-6 lg:grid-cols-2">
        {Object.entries(REGULAR_BANNERS).map(([bannerId, bannerInfo]) => (
          <SummaryCard key={bannerId} bannerId={bannerId} bannerInfo={bannerInfo} />
        ))}
        {layoutStore.showAllBanners && Object.entries(SPECIAL_BANNERS).map(([bannerId, bannerInfo]) => (
          <SummaryCard key={bannerId} bannerId={bannerId} bannerInfo={bannerInfo} />
        ))}
      </div>
    </>
  );
}
