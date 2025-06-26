import { calculateLuck } from "@/shared/helpers/banner";
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
            globalData?.items?.[bannerData?.store_id]?.s4_pity_distribution ??
                [],
            bannerData?.star4_avg_pity ?? 0
        );
        setStar4Luck(luck4);

        const luck5 = calculateLuck(
            globalData?.items?.[bannerData?.store_id]?.s5_pity_distribution ?? [],
            bannerData?.star5_avg_pity ?? 0,
        );
        setStar5Luck(luck5);
    }, [bannerData, globalData]);

    return (
        <div className="grid grid-cols-2 gap-5">
            <LuckStatCard
                percentile={star5Luck?.percentile}
                isTop={star5Luck?.isTop}
                comparisonPercent={star5Luck?.comparisonPercent}
                quality={5}
            />
            <LuckStatCard
                percentile={star4Luck?.percentile}
                isTop={star4Luck?.isTop}
                comparisonPercent={star4Luck?.comparisonPercent}
                quality={4}
            />
        </div>
    );
}
4;
