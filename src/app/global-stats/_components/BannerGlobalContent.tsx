import { BannerPieChart } from "@/app/_components/banner/BannerPieChart";
import AvgPity from "./AvgPity";
import StatTable from "./StatTable";
import PercentageStat from "@/app/_components/banner/PercentageStat";
import PageHeader from "@/app/_components/layout/PageHeader";
import { BannerPityBarChart } from "@/app/_components/banner/BannerPityBarChart";

interface Props {
    bannerInfo: any;
    activeTab: string;
}

export default function BannerGlobalContent({ bannerInfo, activeTab }: Props) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-center capitalize">
                <PageHeader title={activeTab.replace("_", " ")} />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                <div className="grid grid-cols-1">
                    <div className="grid grid-cols-2 gap-5">
                        <AvgPity star={5} avg_pity={bannerInfo.avg_s5_pity} />
                        <AvgPity star={4} avg_pity={bannerInfo.avg_s4_pity} />
                        <div className="col-span-2">
                            <PercentageStat
                                ff_won={bannerInfo.ff_won}
                                ff_lose={bannerInfo.ff_lose}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <BannerPieChart
                        total={bannerInfo.total}
                        star4={bannerInfo.total_s4}
                        star5={bannerInfo.total_s5}
                    />
                </div>
            </div>
            {/* <div className="grid grid-cols-12 gap-5 w-full">
                <div className="md:col-span-6 col-span-12">
                    <BannerPityBarChart />
                </div>
                <div className="md:col-span-6 col-span-12">
                    <StatTable
                        star={4}
                        total={bannerInfo.total_s4}
                        items={bannerInfo.s4s}
                    />
                </div>
            </div> */}
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
