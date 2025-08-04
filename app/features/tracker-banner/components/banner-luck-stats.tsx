import type { ProcessedBanner } from '@/shared/types/banner';
import { useQuery } from '@tanstack/react-query';
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';
import { useMemo } from 'react';
import { getPityDistribution } from '../api/get-pity-distributions';
import { calculateLuck } from '../utils/luck';
import BannerStatCard from './banner-stat-card';
import BannerStatCardSkeleton from './banner-stat-card-skeleton';

interface Props {
  processedBanner?: ProcessedBanner | null;
}

export default function BannerLuckStats({ processedBanner }: Props) {
  const { data: globalData, isFetching, isError } = useQuery({
    queryKey: ['pity-distribution', processedBanner?.name],
    queryFn: () => getPityDistribution(),
  });

  const luckData = useMemo(() => {
    if (!processedBanner || !globalData)
      return null;

    return {
      star4: calculateLuck(
        globalData.items?.[processedBanner.name]?.s4_pity_distribution ?? [],
        processedBanner.star4AvgPity ?? 0,
      ),
      star5: calculateLuck(
        globalData.items?.[processedBanner.name]?.s5_pity_distribution ?? [],
        processedBanner.star5AvgPity ?? 0,
      ),
    };
  }, [processedBanner, globalData]);

  return (
    <div className="flex flex-col gap-5">
      {/* Show skeleton if fetching */}
      {isFetching && (
        <>
          <BannerStatCardSkeleton />
          <BannerStatCardSkeleton />
        </>
      )}

      {/* Show error message if there is an error */}
      {isError && (
        <>
          <BannerStatCard
            title="5 ✦ Luck"
            description="Oops! Error fetching data"
            value="N/A"
          />
          <BannerStatCard
            title="4 ✦ Luck"
            description="Oops! Error fetching data"
            value="N/A"
          />
        </>
      )}
      {/* Show luck data if there is no error and not fetching */}
      {!isFetching
        && !isError
        && (['star5', 'star4'] as const).map((key) => {
          const luck = luckData?.[key];
          const isTop = luck?.isTop;
          return (
            <BannerStatCard
              key={key}
              title={`${key === 'star5' ? '5' : '4'} ✦  Luck`}
              description={`${isTop ? 'Luckier' : 'Unluckier'} than ${luck?.comparisonPercent ?? 'N/A'}%`}
              value={(
                <div
                  className={`text-quality-${key === 'star5' ? '5' : '4'} flex gap-1 items-center`}
                >
                  {luck?.percentile ?? 'N/A'}
                  %
                  {isTop
                    ? (
                        <ArrowUpNarrowWide className="size-5" />
                      )
                    : (
                        <ArrowDownNarrowWide className="size-5" />
                      )}
                </div>
              )}
            />
          );
        })}
    </div>
  );
}
