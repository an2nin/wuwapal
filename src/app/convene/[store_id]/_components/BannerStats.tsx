import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/app/_components/ui/tooltip";
import { CircleArrowUp, Star } from "lucide-react";

interface Props {
    bannerData: any;
    bannerInfo: any;
}

export default function BannerStats({ bannerData, bannerInfo }: Props) {
    return (
        <div className="relative lg:h-44 h-72">
            <img
                src={bannerInfo.image}
                alt="banner"
                className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute top-0 h-full w-full left-0 flex lg:justify-start justify-center lg:ml-6 lg:mt-5">
                <div className="flex items-center ">
                    <div className="flex flex-wrap border bg-card rounded-xl w-fit">
                        <div className="flex flex-col-reverse gap-1 p-3">
                            <div className="grid grid-cols-2 gap-2 lg:gap-5 text-xs sm:grid-cols-2 p-3 lg:inline-flex lg:flex-row lg:flex-wrap">
                                <div className="flex flex-col gap-1  text-center">
                                    <span className="text-3xl font-extrabold sm:text-4xl">
                                        {bannerData?.total || 0}
                                    </span>{" "}
                                    Total Pulls
                                </div>{" "}
                                <div className="flex flex-col gap-1 text-center text-quality-5">
                                    <span className="flex items-center justify-center gap-1 text-3xl font-extrabold sm:text-4xl">
                                        {bannerData?.star5_pity || 0}{" "}
                                        {bannerInfo.store_id ==
                                            "featured_resonator" &&
                                            bannerData?.guaranteed && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <CircleArrowUp />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <div className="flex items-center gap-1">
                                                                The next 5
                                                                <Star className="w-3 h-3 fill-foreground" />
                                                                is guaranteed to
                                                                be the
                                                                promotional
                                                                character
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                    </span>{" "}
                                    5 ✦ Pity
                                </div>{" "}
                                <div className="flex flex-col gap-1  text-center text-quality-4">
                                    <span className="text-3xl font-extrabold sm:text-4xl">
                                        {bannerData?.star4_pity || 0}
                                    </span>
                                    4 ✦ Pity
                                </div>
                                <div className="flex flex-col gap-1  text-center">
                                    <span className="text-3xl font-extrabold sm:text-4xl">
                                        {(
                                            bannerData?.total * 160 || 0
                                        ).toLocaleString()}
                                    </span>
                                    Astrite Spent
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
