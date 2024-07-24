"use client";
import BannerOverview from "./BannerOverview";
import { BANNERS } from "@/shared/banners";
import ConveneNavigation from "./ConveneNavigation";
import PageHeader from "@/app/_components/layout/PageHeader";
import { useProfileStore, ProfileStoreState } from "@/stores/profile";
import { useEffect, useState } from "react";

export default function ConvenePage() {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );
    const [banners, setBanners] = useState<any>(null);

    useEffect(() => {
        const currentProfilesBanner =
            profileStore.profiles[profileStore.active].banners;
        setBanners(currentProfilesBanner);
    }, [profileStore]);

    return (
        <>
            <div className="flex flex-wrap-reverse gap-5 justify-between items-center">
                <PageHeader title="Your Pull Journey" />
                <ConveneNavigation />
            </div>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                {banners && Object.keys(BANNERS).map((banner, idx) => (
                    <BannerOverview
                        key={idx}
                        bannerData={banners[banner]}
                        bannerInfo={BANNERS[banner]}
                    />
                ))}
            </div>
        </>
    );
}
