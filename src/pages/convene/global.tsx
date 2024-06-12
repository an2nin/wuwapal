import BannerGlobalContent from "@/components/banner/BannerGlobalContent";
import BannerTab from "@/components/banner/BannerTab";
import { bannerTabs } from "@/helpers/constants";
import { useGlobalStatsQuery } from "@/redux/services/banner";
import { useState } from "react";

export default function Global() {
    const { data: globalData, isSuccess: isGlobalStatsSuccess } =
        useGlobalStatsQuery<any>();
    const [activeBannerTab, setActiveBannerTab] = useState("featured_resonator");
    const handleBannerClick = (tab: string) => {
        setActiveBannerTab(tab);
    }
    return (
        <>
            {isGlobalStatsSuccess && (
                <div className="w-full grid grid-cols-12 gap-5">
                    <div className="md:col-span-4 col-span-12 flex flex-col gap-5">
                        <div className="text-center text-2xl font-bold">Global Statistics</div>
                        {bannerTabs.map((tab, idx) => (
                            <BannerTab
                                key={idx}
                                tabInfo={tab}
                                bannerInfo={globalData.items[tab.store_id]}
                                active={tab.store_id === activeBannerTab}
                                onClick={handleBannerClick}
                            />
                        ))}
                    </div>
                    <div className="md:col-span-8 col-span-12">
                        <BannerGlobalContent bannerInfo={globalData.items[activeBannerTab]} activeTab={activeBannerTab} />
                    </div>
                </div>
            )}
        </>
    );
}
