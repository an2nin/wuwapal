"use client";
import BannerOverview from "./BannerOverview";
import { BANNERS } from "@/data/banners";
import ConveneNavigation from "./ConveneNavigation";
import PageHeader from "@/shared/components/layout/PageHeader";
import { useProfileStore, ProfileStoreState } from "@/shared/stores/profile";
import { useEffect, useState } from "react";
import NoPullFound from "./NoPullFound";

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
            <div>
                {!banners && (
                    <div className="overlay-no-pull-found">
                        <NoPullFound />
                    </div>
                )}
                <div className="grid lg:grid-cols-2 gap-5 mt-5">
                    {Object.keys(BANNERS).map((banner, idx) => (
                        <BannerOverview
                            key={idx}
                            bannerData={banners ? banners[banner] : null}
                            bannerInfo={BANNERS[banner]}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
