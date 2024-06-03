import { useState, useEffect } from "react";
import BannerStat from "./BannerStat";
import { standard_resonators } from "@/helpers/constants";
import BannerPieChart from "@/components/banner/BannerPieChart";
import BannerOverview from "@/components/banner/BannerOverview";
import BannerEmptyCard from "./BannerEmptyCard";
import BannerPullList from "./BannerPullList";

interface Props {
    banner: any;
}

export default function BannerView({ banner }: Props) {
    console.log(banner);
    return (
        <div>
            {banner ? (
                <div className="flex flex-col gap-5">
                    <div className="flex justify-center">
                        <BannerStat
                            total={banner.items.length}
                            star4_pity={banner?.star4_pity}
                            star5_pity={banner?.star5_pity}
                            guaranteed={
                                banner.title == "featured_resonator"
                                    ? banner?.guaranteed
                                    : false
                            }
                        />
                    </div>
                    <div className="flex flex-wrap gap-5">
                        <BannerPieChart
                            total={banner.items.length}
                            star4={
                                banner?.star4_resonators.length +
                                banner?.star4_weapons.length
                            }
                            star5={banner?.star5s.length}
                        />
                        <div className="flex-1">
                            <BannerOverview bannerData={banner} />
                        </div>
                    </div>

                    <div>
                        <BannerPullList banner={banner} />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <BannerEmptyCard />
                </div>
            )}
        </div>
    );
}
