"use client";

import { useBannerStore } from "@/stores/banner";
import { Profile, ProfileStoreState, useProfileStore } from "@/stores/profile";
import { useEffect } from "react";

export default function ConveneLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const bannerStore = useBannerStore<any>((state: any) => state);
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );

    useEffect(() => {
        if (
            bannerStore.banners ||
            bannerStore.banner_record_url ||
            bannerStore.game_path
        ) {
            const newProfile: Profile = {
                display_name: "default",
                banner_record_url: bannerStore.banner_record_url,
                game_path: bannerStore.game_path,
                banners: bannerStore.banners,
            };
            profileStore.addProfile("Default", newProfile);
            bannerStore.clearPrevStore();
            location.reload();
        }
    }, [bannerStore]);

    return <>{children}</>;
}
