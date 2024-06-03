import { Card, CardContent } from "@/components/ui/card";
import { CornerDownRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

interface Props {
    bannerData?: any;
}

export default function BannerOverview({ bannerData }: Props) {
    const [star4ResAvgPity, setStar4ResAvgPity] = useState(0);
    const [star4WeapAvgPity, setStar4WeapAvgPity] = useState(0);
    const [star5AvgPity, setStar5AvgPity] = useState(0);

    useEffect(() => {
        const totalPityStar4Res = bannerData.star4_resonators.reduce(
            (sum: number, obj: any) => sum + obj.pity,
            0
        );
        const averagePityStar4Res =
            bannerData.star4_resonators.length == 0
                ? 0
                : totalPityStar4Res / bannerData.star4_resonators.length;
        setStar4ResAvgPity(averagePityStar4Res);

        const totalPityStar4Weap = bannerData.star4_weapons.reduce(
            (sum: number, obj: any) => sum + obj.pity,
            0
        );
        const averagePityStar4Weap =
            bannerData.star4_weapons.length == 0
                ? 0
                : totalPityStar4Weap / bannerData.star4_weapons.length;
        setStar4WeapAvgPity(averagePityStar4Weap);

        const totalPityStar5 = bannerData.star5s.reduce(
            (sum: number, obj: any) => sum + obj.pity,
            0
        );
        const averagePityStar5 =
            bannerData.star5s.length == 0
                ? 0
                : totalPityStar5 / bannerData.star5s.length;
        setStar5AvgPity(averagePityStar5);
    }, [bannerData]);

    const getPercentage = (part: number, total: number) => {
        return ((part / total) * 100).toFixed(1);
    };

    const getComplexAverage = (a: number, b: number) => {
        const divider = a != 0 && b != 0 ? 2 : 1;
        return ((a + b) / divider).toFixed(1);
    };
    return (
        <Card className="h-full">
            <CardContent className="pt-5 h-full">
                <div className="flex flex-col gap-2 ">
                    <div className="flex justify-between border-b border-accent pb-1">
                        <div className="font-bold text-sm md:text-lg">
                            Character Event
                        </div>
                        <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
                            <div className="flex justify-end">Total</div>
                            <div className="flex justify-end">Percent</div>
                            <div className="flex justify-end">Pity AVG</div>
                        </div>
                    </div>

                    <div className="flex justify-between border-b border-accent pb-1">
                        <div className="text-sm md:text-base flex items-center gap-1 text-yellow-500">
                            5 <Star className="w-4 h-4 fill-yellow-500" />
                        </div>
                        <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
                            <div className="flex justify-end">
                                {bannerData.star5s.length}
                            </div>
                            <div className="flex justify-end">
                                {getPercentage(
                                    bannerData.star5s.length,
                                    bannerData.total
                                )}
                                %
                            </div>
                            <div className="flex justify-end">
                                {star5AvgPity.toFixed(1)}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between border-b border-accent pb-1">
                        <div className="text-sm md:text-base flex items-center gap-1 text-purple-500">
                            4 <Star className="w-4 h-4 fill-purple-500" />
                        </div>
                        <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
                            <div className="flex justify-end">
                                {bannerData.star4_resonators.length +
                                    bannerData.star4_weapons.length}
                            </div>
                            <div className="flex justify-end">
                                {getPercentage(
                                    bannerData.star4_resonators.length +
                                        bannerData.star4_weapons.length,
                                    bannerData.total
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

                    <div className="flex justify-between border-b border-accent pb-1">
                        <div className="text-sm md:text-base flex items-center gap-1 text-purple-500 pl-1">
                            <CornerDownRight className="h-4 w-4" />
                            Resonator
                        </div>
                        <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
                            <div className="flex justify-end">
                                {bannerData.star4_resonators.length}
                            </div>
                            <div className="flex justify-end">
                                {getPercentage(
                                    bannerData.star4_resonators.length,
                                    bannerData.total
                                )}
                                %
                            </div>
                            <div className="flex justify-end">
                                {star4ResAvgPity.toFixed(1)}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between border-b border-accent pb-1">
                        <div className="text-sm md:text-base flex items-center gap-1 text-purple-500 pl-1">
                            <CornerDownRight className="h-4 w-4" />
                            Weapon
                        </div>
                        <div className="grid grid-cols-3 w-44 text-xs md:text-sm ">
                            <div className="flex justify-end">
                                {bannerData.star4_weapons.length}
                            </div>
                            <div className="flex justify-end">
                                {getPercentage(
                                    bannerData.star4_weapons.length,
                                    bannerData.total
                                )}
                                %
                            </div>
                            <div className="flex justify-end">
                                {star4WeapAvgPity.toFixed(1)}
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        {bannerData.star5s.map((item: any, idx: number) => (
                            <Badge
                                key={idx}
                                variant="outline"
                                className="px-2 py-1"
                            >
                                <div className="flex gap-3 w-full items-center font-bold text-base">
                                    <span>{item.name}</span>
                                    <span className=" text-accent">
                                        {item.pity}
                                    </span>
                                </div>
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
