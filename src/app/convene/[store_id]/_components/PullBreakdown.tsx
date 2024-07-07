import { Card, CardContent } from "@/app/_components/ui/card";
import { Star, CornerDownRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    bannerData: any;
    bannerInfo: any;
}
export default function PullBreakdown({ bannerData, bannerInfo }: Props) {
    const [star4ResAvgPity, setStar4ResAvgPity] = useState(0);
    const [star4WeapAvgPity, setStar4WeapAvgPity] = useState(0);
    const [star5AvgPity, setStar5AvgPity] = useState(0);
    useEffect(() => {
        const totalPityStar4Res =
            bannerData?.star4_resonators?.reduce(
                (sum: number, obj: any) => sum + (obj?.pity ?? 0),
                0
            ) ?? 0;
        const averagePityStar4Res =
            (bannerData?.star4_resonators?.length ?? 0) === 0
                ? 0
                : totalPityStar4Res /
                  (bannerData?.star4_resonators?.length ?? 1);
        setStar4ResAvgPity(averagePityStar4Res);

        const totalPityStar4Weap =
            bannerData?.star4_weapons?.reduce(
                (sum: number, obj: any) => sum + (obj?.pity ?? 0),
                0
            ) ?? 0;
        const averagePityStar4Weap =
            (bannerData?.star4_weapons?.length ?? 0) === 0
                ? 0
                : totalPityStar4Weap / (bannerData?.star4_weapons?.length ?? 1);
        setStar4WeapAvgPity(averagePityStar4Weap);

        const totalPityStar5 =
            bannerData?.star5s?.reduce(
                (sum: number, obj: any) => sum + (obj?.pity ?? 0),
                0
            ) ?? 0;
        const averagePityStar5 =
            (bannerData?.star5s?.length ?? 0) === 0
                ? 0
                : totalPityStar5 / (bannerData?.star5s?.length ?? 1);
        setStar5AvgPity(averagePityStar5);
    }, [bannerData]);

    const getPercentage = (
        part: number | null | undefined,
        total: number | null | undefined
    ): string => {
        if (part == null || total == null || total === 0) return "0.0";
        return ((part / total) * 100).toFixed(1);
    };

    const getComplexAverage = (
        a: number | null | undefined,
        b: number | null | undefined
    ): string => {
        if (a == null && b == null) return "0.0";
        const validA = a ?? 0;
        const validB = b ?? 0;
        const divider = validA !== 0 && validB !== 0 ? 2 : 1;
        return ((validA + validB) / divider).toFixed(1);
    };
    return (
        <Card>
            <CardContent className="pt-5">
                <div className="flex flex-col gap-2 ">
                    <div className="flex justify-between items-center border-b border-white pb-1">
                        <div className="font-bold text-sm md:text-lg">
                            Pull Breakdown
                        </div>
                        <div className="grid grid-cols-3 w-48 text-xs md:text-sm">
                            <div className="flex justify-end">Total</div>
                            <div className="flex justify-end">Percent</div>
                            <div className="flex justify-end">Pity AVG</div>
                        </div>
                    </div>

                    <div className="flex justify-between border-b pb-1">
                        <div className="text-sm md:text-base flex items-center gap-1 text-yellow-500">
                            5 <Star className="w-4 h-4 fill-yellow-500" />
                        </div>
                        <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
                            <div className="flex justify-end">
                                {bannerData ? bannerData.star5s?.length : 0}
                            </div>
                            <div className="flex justify-end">
                                {getPercentage(
                                    bannerData ? bannerData.star5s?.length : 0,
                                    bannerData ? bannerData.total : 0
                                )}
                                %
                            </div>
                            <div className="flex justify-end">
                                {star5AvgPity.toFixed(1)}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between border-b  pb-1">
                        <div className="text-sm md:text-base flex items-center gap-1 text-purple-500">
                            4 <Star className="w-4 h-4 fill-purple-500" />
                        </div>
                        <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
                            <div className="flex justify-end">
                                {bannerData
                                    ? bannerData.star4_resonators.length +
                                      bannerData.star4_weapons.length
                                    : 0}
                            </div>
                            <div className="flex justify-end">
                                {getPercentage(
                                    bannerData
                                        ? bannerData.star4_resonators.length +
                                              bannerData.star4_weapons.length
                                        : 0,
                                    bannerData ? bannerData.total : 0
                                )}
                                %
                            </div>
                            <div className="flex justify-end">
                                {getComplexAverage(
                                    star4ResAvgPity,
                                    star4WeapAvgPity
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between border-b pb-1">
                        <div className="text-sm md:text-base flex items-center gap-1 text-purple-500 pl-1">
                            <CornerDownRight className="h-4 w-4" />
                            Resonator
                        </div>
                        <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
                            <div className="flex justify-end">
                                {bannerData?.star4_resonators?.length ?? 0}
                            </div>
                            <div className="flex justify-end">
                                {getPercentage(
                                    bannerData?.star4_resonators?.length,
                                    bannerData?.total
                                )}
                                %
                            </div>
                            <div className="flex justify-end">
                                {(star4ResAvgPity ?? 0).toFixed(1)}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between border-b  pb-1">
                        <div className="text-sm md:text-base flex items-center gap-1 text-purple-500 pl-1">
                            <CornerDownRight className="h-4 w-4" />
                            Weapon
                        </div>
                        <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
                            <div className="flex justify-end">
                                {bannerData?.star4_weapons?.length ?? 0}
                            </div>
                            <div className="flex justify-end">
                                {getPercentage(
                                    bannerData?.star4_weapons?.length,
                                    bannerData?.total
                                )}
                                %
                            </div>
                            <div className="flex justify-end">
                                {(star4WeapAvgPity ?? 0).toFixed(1)}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
