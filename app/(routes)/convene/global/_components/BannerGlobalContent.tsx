import { BannerPieChart } from "@/shared/components/banner/BannerPieChart";
import AvgPity from "./AvgPity";
import StatTable from "./StatTable";
import PercentageStat from "@/shared/components/banner/PercentageStat";
import PageHeader from "@/shared/components/layout/PageHeader";
import { BannerPityBarChart } from "@/shared/components/banner/BannerPityBarChart";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { BannerBarChart } from "@/shared/components/banner/BannerBarChart";
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
                                ff_win={bannerInfo.ff_win}
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
            <div>
                <BannerBarChart
                    title="5 ✦ Pulls By Roll"
                    data={bannerInfo.s5_pity_distribution}
                    config={{
                        c: {
                            label: " ",
                            color: "hsl(var(--quality-5))",
                        },
                    }}
                />
            </div>
            <div className="grid grid-cols-12 gap-5 w-full">
                <div className="md:col-span-6 col-span-12">
                    <StatTable star={5} items={bannerInfo.s5s} />
                </div>
                <div className="md:col-span-6 col-span-12">
                    <StatTable star={4} items={bannerInfo.s4s} />
                </div>
            </div>
            <div>
                <BannerBarChart
                    title="4 ✦ Pulls By Roll"
                    data={bannerInfo.s4_pity_distribution}
                    config={{
                        c: {
                            label: " ",
                            color: "hsl(var(--quality-4))",
                        },
                    }}
                />
            </div>
        </div>
    );
}
