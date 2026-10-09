import type { ProcessedBanner } from '@/shared/types/banner';
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';
import { useMemo } from 'react';
import { toPityCounts, usePityDistribution } from '../api/get-pity-distributions';
import { calculatePityLuck } from '../utils/luck';
import BannerStatCard from './banner-stat-card';
import BannerStatCardSkeleton from './banner-stat-card-skeleton';

interface Props {
  processedBanner?: ProcessedBanner | null;
}

const RARITIES = [
  { key: 'star5', distribution: 's5_pity_distribution', label: '5', text: 'text-quality-5' },
  { key: 'star4', distribution: 's4_pity_distribution', label: '4', text: 'text-quality-4' },
] as const;

export default function BannerLuckStats({ processedBanner }: Props) {
  const { data: globalData, isLoading, isError } = usePityDistribution();

  const luckData = useMemo(() => {
    const bannerStats = processedBanner ? globalData?.items[processedBanner.name] : undefined;
    if (!processedBanner || !bannerStats)
      return null;

    // Free pulls (pity 0) aren't in the global distribution either
    const pities = {
      star5: processedBanner.star5Items.map(item => item.pity).filter(pity => pity > 0),
      star4: [...processedBanner.star4Resonators, ...processedBanner.star4Weapons]
        .map(item => item.pity)
        .filter(pity => pity > 0),
    };

    return {
      star5: calculatePityLuck(pities.star5, toPityCounts(bannerStats.s5_pity_distribution)),
      star4: calculatePityLuck(pities.star4, toPityCounts(bannerStats.s4_pity_distribution)),
    };
  }, [processedBanner, globalData]);

  return (
    <div className="flex flex-col gap-5">
      {/* Show skeleton while fetching */}
      {isLoading && (
        <>
          <BannerStatCardSkeleton />
          <BannerStatCardSkeleton />
        </>
      )}

      {/* Show error message if there is an error */}
      {isError && RARITIES.map(rarity => (
        <BannerStatCard
          key={rarity.key}
          title={`${rarity.label} ✦ Luck`}
          description="Oops! Error fetching data"
          value="N/A"
        />
      ))}

      {/* Show luck data once loaded */}
      {!isLoading
        && !isError
        && RARITIES.map((rarity) => {
          // luck = share of players (with as many pulls) whose average pity is worse than yours
          const luck = luckData?.[rarity.key] ?? null;
          const isTop = luck !== null && luck >= 50;
          const rank = luck === null ? null : Math.max(1, Math.round(isTop ? 100 - luck : luck));
          const comparison = luck === null ? null : Math.round(isTop ? luck : 100 - luck);

          return (
            <BannerStatCard
              key={rarity.key}
              title={`${rarity.label} ✦  Luck`}
              description={luck === null
                ? `No ${rarity.label} ✦ pulls to compare yet`
                : `${isTop ? 'Luckier' : 'Unluckier'} than ${comparison}% of players`}
              value={(
                <div className={`${rarity.text} flex gap-1 items-center`}>
                  {rank === null ? 'N/A' : `${rank}%`}
                  {luck !== null && (isTop
                    ? <ArrowUpNarrowWide className="size-5" aria-label="Top" />
                    : <ArrowDownNarrowWide className="size-5" aria-label="Bottom" />)}
                </div>
              )}
            />
          );
        })}
    </div>
  );
}
