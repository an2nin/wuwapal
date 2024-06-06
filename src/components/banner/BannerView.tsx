import { useState, useEffect } from "react";
import BannerStat from "./BannerStat";
import { standard_resonators } from "@/helpers/constants";
import BannerPieChart from "@/components/banner/BannerPieChart";
import BannerOverview from "@/components/banner/BannerOverview";
import BannerEmptyCard from "./BannerEmptyCard";
import BannerPullList from "./BannerTable";
import AddManuallyBtn from "./add-manual/AddManuallyBtn";

interface Props {
    banner: any;
    banner_store_id: string;
}

export default function BannerView({ banner, banner_store_id }: Props) {
    // console.log(banner);
    return (
        <div>
            {banner && banner.items?.length > 0 ? (
                <div className="flex flex-col gap-5">
                    <div className="flex justify-center items-center">
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
                    <div className="flex flex-wrap gap-5 justify-center">
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
                <div className="flex md: flex-col justify-center gap-5">
                    <div>
                        <AddManuallyBtn banner_store_id={banner_store_id} />
                    </div>
                    <BannerEmptyCard />
                </div>
            )}
        </div>
    );
}
