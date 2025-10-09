'use client';

import type { BannerInfo, SummarizedBanner } from '@/shared/types/banner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RecentPulls from '@/shared/components/banner/recent-pulls';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { CURRENCIES } from '@/shared/constants/game/currencies';
import useIndexDB from '@/shared/hooks/use-index-db';
import { useAccountStore } from '@/shared/stores/account';
import { processBannerForSummary } from '../utils/processor';

interface Props {
  bannerId: string | null | undefined;
  bannerInfo: BannerInfo;
}

export default function SummaryCard({ bannerId, bannerInfo }: Props) {
  const router = useRouter();
  const accountStore = useAccountStore(state => state);
  const { getBannerById, banners } = useIndexDB(accountStore.active);
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

  return (
    <Card
      className="p-0 hover:border hover:border-primary cursor-pointer overflow-hidden flex flex-col justify-between shadow-black"
      onClick={() =>
        router.push(`/convene/banner?id=${bannerInfo.store_id}`)}
    >
      <CardHeader className="hidden">
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={bannerInfo.image}
            alt="banner"
            className="w-full h-28 object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-background/80 p-3 rounded-xl mb-4 ml-4 font-bold text-lg">
            <div className="flex gap-3">
              <div className="flex gap-1 items-center">
                <img
                  src={CURRENCIES[bannerInfo.currency].image}
                  alt={bannerInfo.currency}
                  className="w-8 h-8"
                />
                <p className="text-foreground">{processedBanner?.total || 0}</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="bg-yellow-300 text-black px-2 rounded-full">
                  ✦
                </div>
                <p className="text-quality-5">
                  {processedBanner?.star5Pity || 0}
                  {' '}
                  / 80
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="bg-purple-300 text-black px-2 rounded-full">
                  ✦
                </div>
                <p className="text-quality-4">
                  {processedBanner?.star4Pity || 0}
                  {' '}
                  / 10
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 my-4 px-4">
          <div className="text-2xl text-center font-bold">{bannerInfo.name}</div>
          <RecentPulls limit={10} items={processedBanner?.items || []} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center animate-pulse p-0 pb-2">
        <div className="text-sm text-primary">
          {'<< '}
          click to view details
          {' >>'}
        </div>
      </CardFooter>
    </Card>
  );
}
