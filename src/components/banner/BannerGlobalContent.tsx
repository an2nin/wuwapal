import BannerPieChart from "./BannerPieChart";
import AvgPity from "./global/AvgPity";
import BasicStats from "./global/BasicStats";
import StatTable from "./global/StatTable";

interface Props {
    bannerInfo: any;
    activeTab: string;
}

export default function BannerGlobalContent({ bannerInfo, activeTab }: Props) {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="text-2xl font-bold capitalize border-b">
                {activeTab.replace(/_/g, ' ')}
            </div>
            <div className="grid grid-cols-12 gap-5">
                <div className="md:col-span-5 col-span-12 grid grid-cols-1 gap-5">
                    <BasicStats
                        total={bannerInfo.total}
                        star4_total={bannerInfo.total_s4}
                        star5_total={bannerInfo.total_s5}
                        ff_lose={bannerInfo.ff_lose}
                        ff_won={bannerInfo.ff_won}
                    />
                    <div className="grid grid-cols-2 gap-5">
                        <AvgPity star={5} total={bannerInfo.total} total_s={bannerInfo.total_s5}/>
                        <AvgPity star={4} total={bannerInfo.total} total_s={bannerInfo.total_s4} />
                    </div>
                </div>
                <div className="md:col-span-7 col-span-12">
                    <BannerPieChart
                        total={bannerInfo.total}
                        star4={bannerInfo.total_s4}
                        star5={bannerInfo.total_s5}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-5 w-full">
                <div className="md:col-span-6 col-span-12">
                    <StatTable
                        star={5}
                        total={bannerInfo.total_s5}
                        items={bannerInfo.s5s}
                    />
                </div>
                <div className="md:col-span-6 col-span-12">
                    <StatTable
                        star={4}
                        total={bannerInfo.total_s4}
                        items={bannerInfo.s4s}
                    />
                </div>
            </div>
        </div>
    );
}
