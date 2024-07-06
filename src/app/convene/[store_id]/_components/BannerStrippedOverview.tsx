import BannerStats from "./BannerStats";
import RecentPulls from "./RecentPulls";

interface Props {
    bannerData: any;
    bannerInfo: any;
}

export default function BannerStrippedOverview({
    bannerData,
    bannerInfo,
}: Props) {
    return (
        <div className="bg-pattern-stripped lg:p-5 rounded-xl shadow-sm">
            <BannerStats bannerData={bannerData} bannerInfo={bannerInfo} />
            <div className="flex flex-col gap-5 lg:py-0 py-5 lg:px-0 px-3">
                <RecentPulls bannerData={bannerData} bannerInfo={bannerInfo} />
            </div>
        </div>
    );
}
