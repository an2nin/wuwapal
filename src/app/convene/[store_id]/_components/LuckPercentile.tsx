import { calculateLuck } from "@/app/_helpers/banner";
import { useEffect, useState } from "react";
import LuckStatCard from "./LuckStatCard";

interface Props {
    bannerData: any;
    globalData: any;
}
export default function LuckPercentile({ bannerData, globalData }: Props) {
    const [star4Luck, setStar4Luck] = useState<any>(null);
    const [star5Luck, setStar5Luck] = useState<any>(null);

    useEffect(() => {
        const luck4 = calculateLuck(
            globalData?.items?.[bannerData?.store_id]?.avg_s4_pity ?? 0,
            bannerData?.star4_avg_pity ?? 0,
            globalData?.total_records ?? 0
        );
        setStar4Luck(luck4);

        const luck5 = calculateLuck(
            globalData?.items?.[bannerData?.store_id]?.avg_s5_pity ?? 0,
            bannerData?.star5_avg_pity ?? 0,
            globalData?.total_records ?? 0
        );
        setStar5Luck(luck5);
    }, [bannerData, globalData]);

    return (
        <div className="grid grid-cols-2 gap-5">
            <LuckStatCard
                percentile={star5Luck?.percentile}
                betterThanAverage={star5Luck?.betterThanAverage}
                quality={5}
            />
            <LuckStatCard
                percentile={star4Luck?.percentile}
                betterThanAverage={star4Luck?.betterThanAverage}
                quality={4}
            />
        </div>
    );
}
4;
