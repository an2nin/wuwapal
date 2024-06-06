import { useState, useEffect } from "react";
import BannerStat from "./BannerStat";
import BannerPieChart from "@/components/banner/BannerPieChart";
import BannerOverview from "@/components/banner/BannerOverview";
import BannerEmptyCard from "./BannerEmptyCard";
import BannerPullList from "./BannerTable";
import AddManuallyBtn from "./add-manual/AddManuallyBtn";
import { processBanner } from "@/helpers/processors";

interface Props {
    banner: any;
    banner_store_id: string;
}

export default function BannerView({ banner, banner_store_id }: Props) {
    const [processedBanner, setProcessedBanner] = useState<any>(null);
    useEffect(() => {
        if (banner) {
            const processed = processBanner(banner);
            setProcessedBanner(processed);
        }
    }, [banner]);

    return (
        <>
            <div>
                {processedBanner && processedBanner.items?.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-center items-center">
                            <BannerStat
                                total={processedBanner.items.length}
                                star4_pity={processedBanner?.star4_pity}
                                star5_pity={processedBanner?.star5_pity}
                                guaranteed={
                                    processedBanner.store_id == "featured_resonator"
                                        ? processedBanner?.guaranteed
                                        : false
                                }
                            />
                        </div>
                        <div className="flex flex-wrap gap-5 justify-center">
                            <BannerPieChart
                                total={processedBanner.items.length}
                                star4={
                                    processedBanner?.star4_resonators.length +
                                    processedBanner?.star4_weapons.length
                                }
                                star5={processedBanner?.star5s.length}
                            />
                            <div className="flex-1">
                                <BannerOverview bannerData={processedBanner} />
                            </div>
                        </div>

                        <div>
                            <BannerPullList banner={processedBanner} />
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
        </>
    );
}
