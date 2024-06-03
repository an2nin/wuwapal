import { useState, useEffect } from "react";
import BannerStat from "./BannerStat";
import { standard_resonators } from "@/helpers/constants";
import BannerPieChart from "@/components/banner/BannerPieChart";
import BannerOverview from "@/components/banner/BannerOverview";
import BannerEmptyCard from "./BannerEmptyCard";

interface Props {
    banner: any;
}

export default function BannerView({ banner }: Props) {
    const [processedBannerData, setProcessedBannerData] = useState<any>(null);
    useEffect(() => {
        if (banner.items && banner.items.length > 0) {
            let reversedItems = banner.items.slice().reverse();
            let star4_resonators: any = [];
            let star4_weapons: any = [];
            let star4_pity = 0;
            let star5s: any = [];
            let star5_pity = 0;
            let guaranteed = false;
            let pity4_last_index = 0;
            let pity5_last_index = 0;

            reversedItems.forEach((item: any, idx: number) => {
                if (item.qualityLevel === 4) {
                    if (item.resourceType == "Resonators") {
                        star4_resonators.push({
                            name: item.name,
                            pity:
                                pity4_last_index == 0
                                    ? idx - pity4_last_index + 1
                                    : idx - pity4_last_index,
                        });
                    } else {
                        star4_weapons.push({
                            name: item.name,
                            pity:
                                pity4_last_index == 0
                                    ? idx - pity4_last_index + 1
                                    : idx - pity4_last_index,
                        });
                    }

                    pity4_last_index = idx;
                } else if (item.qualityLevel === 5) {
                    star5s.push({
                        name: item.name,
                        pity:
                            pity5_last_index == 0
                                ? idx - pity5_last_index + 1
                                : idx - pity5_last_index,
                    });

                    pity5_last_index = idx;
                }
            });

            guaranteed = standard_resonators.includes(
                reversedItems[pity5_last_index].name
            );

            star4_pity = reversedItems.length - 1 - pity4_last_index;
            star5_pity = reversedItems.length - 1 - pity5_last_index;

            setProcessedBannerData({
                ...processedBannerData,
                star4_resonators,
                star4_weapons,
                star5s,
                star4_pity,
                star5_pity,
                guaranteed,
                total: banner.items.length,
            });
        }
    }, [banner]);

    return (
        <div>
            {processedBannerData ? (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap gap-5">
                        <BannerStat
                            total={banner.items.length}
                            star4_pity={processedBannerData?.star4_pity}
                            star5_pity={processedBannerData?.star5_pity}
                            guaranteed={banner.title == "featured_resonator" ?  processedBannerData?.guaranteed : false}
                        />
                        <BannerPieChart
                            total={banner.items.length}
                            star4={
                                processedBannerData?.star4_resonators.length +
                                processedBannerData?.star4_weapons.length
                            }
                            star5={processedBannerData?.star5s.length}
                        />
                        <div className="flex-1">
                            <BannerOverview bannerData={processedBannerData} />
                        </div>
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
