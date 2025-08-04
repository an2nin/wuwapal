import type { ProcessedBanner } from '@/shared/types/banner';
import { CornerDownRight } from 'lucide-react';
import { useMemo } from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';

interface Props {
  processedBanner: ProcessedBanner | null | undefined;
}

export default function BannerPullBreakdown({ processedBanner }: Props) {
  const { star4ResAvgPity, star4WeapAvgPity, star5AvgPity } = useMemo(() => {
    if (!processedBanner) {
      return {
        star4ResAvgPity: 0,
        star4WeapAvgPity: 0,
        star5AvgPity: 0,
      };
    }

    const totalPityStar4Res
      = processedBanner.star4Resonators?.reduce(
        (sum, obj) => sum + (obj?.pity ?? 0),
        0,
      ) ?? 0;
    const star4ResAvgPity
      = (processedBanner.star4Resonators?.length ?? 0) === 0
        ? 0
        : totalPityStar4Res / (processedBanner.star4Resonators?.length ?? 1);

    const totalPityStar4Weap
      = processedBanner.star4Weapons?.reduce(
        (sum, obj) => sum + (obj?.pity ?? 0),
        0,
      ) ?? 0;
    const star4WeapAvgPity
      = (processedBanner.star4Weapons?.length ?? 0) === 0
        ? 0
        : totalPityStar4Weap / (processedBanner.star4Weapons?.length ?? 1);

    const totalPityStar5
      = processedBanner.star5Items?.reduce(
        (sum, obj) => sum + (obj?.pity ?? 0),
        0,
      ) ?? 0;
    const star5AvgPity
      = (processedBanner.star5Items?.length ?? 0) === 0
        ? 0
        : totalPityStar5 / (processedBanner.star5Items?.length ?? 1);

    return { star4ResAvgPity, star4WeapAvgPity, star5AvgPity };
  }, [processedBanner]);

  const getPercentage = (
    part: number | null | undefined,
    total: number | null | undefined,
  ): string => {
    if (part == null || total == null || total === 0)
      return '0.0';
    return ((part / total) * 100).toFixed(1);
  };

  const getComplexAverage = (
    a: number | null | undefined,
    b: number | null | undefined,
  ): string => {
    if (a == null && b == null)
      return '0.0';
    const validA = a ?? 0;
    const validB = b ?? 0;
    const divider = validA !== 0 && validB !== 0 ? 2 : 1;
    return ((validA + validB) / divider).toFixed(1);
  };
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between items-center border-b border-white pb-1">
            <div className="font-bold text-sm md:text-lg">Pull Breakdown</div>
            <div className="grid grid-cols-3 w-48 text-xs md:text-sm">
              <div className="flex justify-end">Total</div>
              <div className="flex justify-end">Percent</div>
              <div className="flex justify-end">Pity AVG</div>
            </div>
          </div>

          <div className="flex justify-between border-b pb-1">
            <div className="text-sm md:text-base flex items-center gap-1 text-quality-5">
              5 ✦
            </div>
            <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
              <div className="flex justify-end">
                {processedBanner ? processedBanner.star5Items?.length : 0}
              </div>
              <div className="flex justify-end">
                {getPercentage(
                  processedBanner ? processedBanner.star5Items?.length : 0,
                  processedBanner ? processedBanner.total : 0,
                )}
                %
              </div>
              <div className="flex justify-end">{star5AvgPity.toFixed(1)}</div>
            </div>
          </div>

          <div className="flex justify-between border-b  pb-1">
            <div className="text-sm md:text-base flex items-center gap-1 text-quality-4">
              4 ✦
            </div>
            <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
              <div className="flex justify-end">
                {processedBanner
                  ? processedBanner.star4Resonators.length
                  + processedBanner.star4Weapons.length
                  : 0}
              </div>
              <div className="flex justify-end">
                {getPercentage(
                  processedBanner
                    ? processedBanner.star4Resonators.length
                    + processedBanner.star4Weapons.length
                    : 0,
                  processedBanner ? processedBanner.total : 0,
                )}
                %
              </div>
              <div className="flex justify-end">
                {getComplexAverage(star4ResAvgPity, star4WeapAvgPity)}
              </div>
            </div>
          </div>

          <div className="flex justify-between border-b pb-1">
            <div className="text-sm md:text-base flex items-center gap-1 text-quality-4 pl-1">
              <CornerDownRight className="h-4 w-4" />
              Resonator
            </div>
            <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
              <div className="flex justify-end">
                {processedBanner?.star4Resonators?.length ?? 0}
              </div>
              <div className="flex justify-end">
                {getPercentage(
                  processedBanner?.star4Resonators?.length,
                  processedBanner?.total,
                )}
                %
              </div>
              <div className="flex justify-end">
                {(star4ResAvgPity ?? 0).toFixed(1)}
              </div>
            </div>
          </div>

          <div className="flex justify-between border-b  pb-1">
            <div className="text-sm md:text-base flex items-center gap-1 text-quality-4 pl-1">
              <CornerDownRight className="h-4 w-4" />
              Weapon
            </div>
            <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
              <div className="flex justify-end">
                {processedBanner?.star4Weapons?.length ?? 0}
              </div>
              <div className="flex justify-end">
                {getPercentage(
                  processedBanner?.star4Weapons?.length,
                  processedBanner?.total,
                )}
                %
              </div>
              <div className="flex justify-end">
                {(star4WeapAvgPity ?? 0).toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
