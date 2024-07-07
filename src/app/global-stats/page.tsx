// import BannerGlobalContent from "@/components/banner/BannerGlobalContent";
// import BannerTab from "@/components/banner/BannerTab";
"use client";
import { useGlobalStatsQuery } from "@/redux/services/banner";
import { BANNERS } from "@/shared/banners";
import { useEffect, useState } from "react";
import BannerCarouselItem from "./_components/BannerCarouselItem";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/app/_components/ui/carousel";
import PageHeader from "../_components/layout/PageHeader";
import BannerGlobalContent from "./_components/BannerGlobalContent";

const BANNERS_ARRAY = [
    "featured_resonator",
    "featured_weapon",
    "standard_resonator",
    "standard_weapon",
    "beginner",
    "beginner_choice",
];

export default function Global() {
    const { data: globalData, isSuccess: isGlobalStatsSuccess } =
        useGlobalStatsQuery<any>();

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);
    return (
        <>
            <div className="flex flex-col gap-5">
                <PageHeader title="Global Statistics" />
                {isGlobalStatsSuccess && (
                    <div className="flex flex-col gap-5 items-center">
                        <div className="container flex justify-center">
                            <Carousel
                                className="w-full max-w-3xl"
                                setApi={setApi}
                            >
                                <CarouselContent>
                                    {Object.keys(BANNERS).map(
                                        (tab: any, idx: number) => (
                                            <BannerCarouselItem
                                                key={idx}
                                                bannerData={
                                                    globalData.items[tab]
                                                }
                                                bannerInfo={BANNERS[tab]}
                                            />
                                        )
                                    )}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                        <div className="md:col-span-8 col-span-12">
                            {current > 0 && (
                                <BannerGlobalContent
                                    bannerInfo={
                                        globalData.items[
                                            BANNERS_ARRAY[current - 1]
                                        ]
                                    }
                                    activeTab={BANNERS_ARRAY[current - 1]}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
