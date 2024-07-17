"use client";

import { useBannerStore } from "@/stores/banner";
import { useEffect } from "react";

export default function ConveneLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const bannerStore = useBannerStore<any>((state: any) => state);

    useEffect(() => {
        if (
            bannerStore.banners &&
            (bannerStore.profiles == null || bannerStore.profiles?.length == 0)
        ) {
            bannerStore.addProfile(
                "default",
                bannerStore.banners,
                bannerStore.banner_record_url,
                bannerStore.game_path
            );

            console.log(">>>>>>>>>>>>>>>>>>>> first")
        }

        if (bannerStore.profiles != null && bannerStore.banners != null) {
            bannerStore.clearPrevStore();
            console.log(">>>>>>>>>>>>>>>>>>>> second")

        }
        console.log(">>>>>>>>>>>>>>>>>>>> third")
    }, [bannerStore]);

    return <>{children}</>;
}
