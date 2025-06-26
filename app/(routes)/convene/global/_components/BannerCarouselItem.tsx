import { CarouselItem } from "@/shared/components/ui/carousel";
import BannerGlobalStats from "./BannerGlobalStats";

interface Props {
    bannerData: any;
    bannerInfo: any;
}

export default function BannerCarouselItem({ bannerData, bannerInfo }: Props) {
    return (
        <CarouselItem>
            <div className="bg-pattern-stripped lg:p-5 rounded-xl shadow-sm ">
                <BannerGlobalStats
                    bannerData={bannerData}
                    bannerInfo={bannerInfo}
                />
            </div>
        </CarouselItem>
    );
}
