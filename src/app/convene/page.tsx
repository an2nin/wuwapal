"use client";
import BannerOverview from "./_components/BannerOverview";
import { BANNERS } from "@/shared/banners";
import { useBannerStore } from "@/stores/banner";
import PageHeader from "../_components/layout/PageHeader";
import ConveneNavigation from "./_components/ConveneNavigation";

export default function ConvenePage() {
    const bannerStore = useBannerStore<any>((state: any) => state);
    return (
        <>
            <div className="flex flex-wrap-reverse gap-5 justify-between items-center">
                <PageHeader title="Your Pull Journey" />
                <ConveneNavigation />
            </div>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                {Object.keys(BANNERS).map((banner, idx) => (
                    <BannerOverview
                        key={idx}
                        bannerData={bannerStore.banners[banner]}
                        bannerInfo={BANNERS[banner]}
                    />
                ))}
            </div>
        </>
    );
}
