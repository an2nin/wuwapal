import type { BannerInfo, ProcessedBanner } from '@/shared/types/banner';
import RecentPulls from '@/shared/components/banner/recent-pulls';
import SiteSymbol from '@/shared/components/site-symbol';
import BannerBasicStats from './banner-basic-stats';

interface Props {
  processedBanner: ProcessedBanner | null;
  bannerInfo: BannerInfo;
}

export default function BannerStatsSection({
  processedBanner,
  bannerInfo,
}: Props) {
  return (
    <div className="bg-pattern-stripped rounded-xl lg:p-5 border shadow-md relative">
      <div className="relative lg:h-44 h-72">
        <img
          src={bannerInfo.image}
          alt="banner"
          className="w-full h-full object-cover rounded-xl"
        />
        <BannerBasicStats
          processedBanner={processedBanner}
          bannerInfo={bannerInfo}
        />
      </div>
      <div className="flex flex-col gap-3 mb-13 mt-5 px-5">
        <div className="text-2xl font-bold text-primary">Recent 5 ✦ Pulls</div>
        <RecentPulls
          className="justify-start"
          items={processedBanner?.star5Items || null}
        />
      </div>
      <div className="absolute bottom-2 right-2">
        <SiteSymbol />
      </div>
    </div>
  );
}
