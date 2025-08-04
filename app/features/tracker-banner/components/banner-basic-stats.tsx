import type { BannerInfo, ProcessedBanner } from '@/shared/types/banner';
import { CircleArrowUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

interface Props {
  processedBanner: ProcessedBanner | null;
  bannerInfo: BannerInfo;
}

export default function BannerBasicStats({ processedBanner, bannerInfo }: Props) {
  return (
    <div className="absolute top-0 h-full w-full left-0 flex lg:justify-start justify-center lg:ml-6 lg:mt-5">
      <div className="flex items-center ">
        <div className="flex flex-wrap border bg-card/85 rounded-xl w-fit">
          <div className="flex flex-col-reverse gap-1 p-3">
            <div className="grid grid-cols-2 gap-2 lg:gap-5 text-xs sm:grid-cols-2 p-3 lg:inline-flex lg:flex-row lg:flex-wrap">
              <div className="flex flex-col gap-1  text-center">
                <span className="text-3xl font-extrabold sm:text-4xl">
                  {processedBanner?.total || 0}
                </span>
                {' '}
                Total Pulls
              </div>
              {' '}
              <div className="flex flex-col gap-1 text-center text-quality-5">
                <span className="flex items-center justify-center gap-1 text-3xl font-extrabold sm:text-4xl">
                  {processedBanner?.star5Pity || 0}
                  {' '}
                  {bannerInfo.store_id === 'featured_resonator'
                    && processedBanner?.isGuaranteed && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <CircleArrowUp />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex items-center gap-1">
                            The next 5 ✦ is guaranteed.
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </span>
                {' '}
                5 ✦ Pity
              </div>
              {' '}
              <div className="flex flex-col gap-1  text-center text-quality-4">
                <span className="text-3xl font-extrabold sm:text-4xl">
                  {processedBanner?.star4Pity || 0}
                </span>
                4 ✦ Pity
              </div>
              <div className="flex flex-col gap-1  text-center">
                <span className="text-3xl font-extrabold sm:text-4xl">
                  {((processedBanner?.total || 0) * 160).toLocaleString()}
                </span>
                Astrite Spent
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
