"use client";
import BannerOverview from "./_components/BannerOverview";
import { BANNERS } from "@/shared/banners";
import { useBannerStore } from "@/stores/banner";
import PageHeader from "../_components/layout/PageHeader";
import { Import } from "lucide-react";
import SyncBtn from "./_components/SyncBtn";
import { Button } from "../_components/ui/button";
import { useRouter } from "next-nprogress-bar";

export default function ConvenePage() {
    const bannerStore = useBannerStore<any>((state: any) => state);
    const router = useRouter();
    return (
        <>
            <div className="flex flex-wrap-reverse gap-5 justify-between items-center lg:mt-10">
                <PageHeader title="Your Pull Journey" />
                <div className="grid grid-cols-1 gap-5">
                    <div className="flex gap-5 lg:justify-end justify-center">
                        <Button onClick={() => router.push("/import")} className="flex gap-2 items-center text-primary border-2 border-primary bg-background rounded-full px-3 py-2 hover:bg-primary hover:text-primary-foreground">
                            <Import className="size-6" /> Import History
                        </Button>
                        <div>
                            <SyncBtn />
                        </div>
                    </div>
                </div>
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
