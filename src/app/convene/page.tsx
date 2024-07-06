"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/_components/ui/carousel";
import BannerTab from "./_components/BannerTab";
import BannerOverview from "./_components/BannerOverview";
import { BANNERS } from "@/shared/banners";
import { useBannerStore } from "@/stores/banner";
import PageHeader from "../_components/layout/PageHeader";

export default function ConvenePage() {
    const bannerStore = useBannerStore<any>((state: any) => state);

    return (
        <>
            <PageHeader title="Convene Tracker Overview" />
            <div className="grid grid-cols-2 gap-5 mt-10">
                {BANNERS.map((banner, idx) => (
                    <BannerOverview
                        key={idx}
                        bannerData={bannerStore.banners[banner.store_id]}
                        bannerInfo={banner}
                    />
                ))}
            </div>
        </>
    );
}

{
    /* <div className="grid grid-cols-12 gap-5 mt-10">
            <div className="lg:col-span-3">
                <Carousel
                    orientation="vertical"
                    className="w-full max-w-xs py-10"
                    opts={{
                        align: "start",
                    }}
                >
                    <CarouselContent className="h-[400px]">
                        <CarouselItem className="md:basis-1/4">
                            <BannerTab />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/4">
                            <BannerTab />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/4">
                            <BannerTab />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/4">
                            <BannerTab />
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/4">
                            <BannerTab />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div> */
}
