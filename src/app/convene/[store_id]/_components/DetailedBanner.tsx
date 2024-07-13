"use client";
import { processBanner } from "@/app/_helpers/processors";
import { useBannerStore } from "@/stores/banner";
import { useState, useEffect } from "react";
import BannerStrippedOverview from "./BannerStrippedOverview";
import { BANNERS } from "@/shared/banners";
import PullBreakdown from "./PullBreakdown";
import BannerTable from "./BannerTable";
import { useGlobalStatsQuery } from "@/redux/services/banner";
import LuckPercentile from "./LuckPercentile";
import { BannerPieChart } from "@/app/_components/banner/BannerPieChart";
interface Props {
    params: { store_id: string };
}
export default function DetailedBanner({ params }: Props) {
    const bannerStore = useBannerStore<any>((state: any) => state);
    const [processedBanner, setProcessedBanner] = useState<any>(null);
    const [bannerData, setBannerData] = useState<any>(null);
    const { data: globalData, isLoading: isGlobalStatsLoading } =
        useGlobalStatsQuery<any>();

    useEffect(() => {
        setBannerData(bannerStore.banners[params.store_id]);
    }, [bannerStore]);

    useEffect(() => {
        if (bannerData) {
            const processed = processBanner(bannerData);
            setProcessedBanner(processed);
        }
    }, [bannerData]);
    return (
        <div className="flex flex-col gap-5">
            <BannerStrippedOverview
                bannerData={processedBanner}
                bannerInfo={BANNERS[params.store_id]}
            />
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-5">
                <div className="lg:col-span-6 ">
                    <div className="grid grid-cols-1 gap-5">
                        {isGlobalStatsLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <LuckPercentile
                                bannerData={processedBanner}
                                globalData={globalData}
                            />
                        )}
                        <PullBreakdown
                            bannerData={processedBanner}
                            bannerInfo={BANNERS[params.store_id]}
                        />
                        <BannerPieChart
                            total={processedBanner?.total}
                            star4={processedBanner?.star4_resonators.length}
                            star5={processedBanner?.star5s.length}
                        />
                    </div>
                </div>
                <div className="lg:col-span-6">
                    <BannerTable bannerData={processedBanner} />
                </div>
            </div>
        </div>
    );
}
