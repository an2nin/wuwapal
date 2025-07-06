"use client";

import { processBanner } from "@/shared/helpers/processors";
import { useState, useEffect } from "react";
import BannerStrippedOverview from "./banner-stripped-overview";
import { BANNERS } from "@/data/banners";
import PullBreakdown from "./pull-breakdown";
import BannerTable from "./banner-table";
import { useGlobalStatsQuery } from "@/shared/redux/services/banner";
import LuckPercentile from "./luck-percentile";
import { BannerPieChart } from "@/shared/components/banner/BannerPieChart";
import { useProfileStore, ProfileStoreState } from "@/shared/stores/profile";
interface Props {
    params: { store_id: string };
}
export default function DetailedBanner({ params }: Props) {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );
    const [banners, setBanners] = useState<any>(null);

    useEffect(() => {
        const currentProfilesBanner =
            profileStore.profiles[profileStore.active].banners;
        setBanners(currentProfilesBanner);
    }, [profileStore]);

    const [processedBanner, setProcessedBanner] = useState<any>(null);
    const [bannerData, setBannerData] = useState<any>(null);
    const { data: globalData, isLoading: isGlobalStatsLoading } =
        useGlobalStatsQuery<any>();

    useEffect(() => {
        setBannerData(banners ? banners[params.store_id] : null);
    }, [banners]);

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
