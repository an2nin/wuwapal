'use client';

import type { BannerInfo, SummarizedBanner } from '@/shared/types/banner';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RecentPulls from '@/shared/components/banner/recent-pulls';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { CURRENCIES } from '@/shared/constants/game/currencies';
import useIndexDB from '@/shared/hooks/use-index-db';
import { useAccountStore } from '@/shared/stores/account';
import { processBannerForSummary } from '../utils/processor';

interface Props {
  bannerId: string | null | undefined;
  bannerInfo: BannerInfo;
}

export default function SummaryCard({ bannerId, bannerInfo }: Props) {
  const accountStore = useAccountStore(state => state);
  const { getBannerById, banners, isLoading } = useIndexDB(accountStore.active);
  const [processedBanner, setProcessedBanner] = useState<SummarizedBanner | null>(null);

  useEffect(() => {
    if (!bannerId || !banners)
      return;
    const banner = getBannerById(bannerId);
    if (banner) {
      const processed = processBannerForSummary(banner);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setProcessedBanner(processed);
    }
  }, [banners]);

  const renderStat = (value: number | undefined) =>
    isLoading ? <Skeleton className="inline-block h-5 w-8 align-middle" /> : (value || 0);

  return (
    <Link
      href={`/convene/banner?id=${bannerInfo.store_id}`}
      aria-label={`View ${bannerInfo.name} details`}
      className="group rounded-xl"
    >
      <Card
        className="p-0 h-full border group-hover:border-primary transition-colors overflow-hidden flex flex-col justify-between"
      >
        <CardHeader className="hidden">
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={bannerInfo.image}
              alt=""
              aria-hidden="true"
              className="w-full h-28 object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-background/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl mb-3 ml-3 sm:mb-4 sm:ml-4 mr-3 font-bold text-base sm:text-lg">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <div className="flex gap-1 items-center">
                  <img
                    src={CURRENCIES[bannerInfo.currency].image}
                    alt={bannerInfo.currency}
                    className="size-6 sm:size-8"
                  />
                  <p className="text-foreground">{renderStat(processedBanner?.total)}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="bg-quality-5 text-background px-2 rounded-full" aria-hidden="true">
                    ✦
                  </div>
                  <p className="text-quality-5">
                    {renderStat(processedBanner?.star5Pity)}
                    {' '}
                    / 80
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="bg-quality-4 text-background px-2 rounded-full" aria-hidden="true">
                    ✦
                  </div>
                  <p className="text-quality-4">
                    {renderStat(processedBanner?.star4Pity)}
                    {' '}
                    / 10
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 my-4 px-4">
            <h2 className="text-xl sm:text-2xl text-center font-bold">{bannerInfo.name}</h2>
            <RecentPulls limit={10} items={processedBanner?.items || []} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-0 pb-3">
          <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
            View details
            <ChevronRight className="size-4" aria-hidden="true" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
