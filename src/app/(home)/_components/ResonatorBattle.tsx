"use client";
import { Globe, Percent } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { calculatePercentage } from "@/app/_helpers/processors";
import { useRouter } from "next-nprogress-bar";
import { useGlobalStatsQuery } from "@/redux/services/banner";

export default function ResonatorBattle() {
    const router = useRouter();
    const {
        data: globalData,
        isSuccess: isGlobalStatsSuccess,
        isLoading: isGlobalStatsLoading,
    } = useGlobalStatsQuery<any>();
    return (
        <Card className="w-full h-full flex flex-col justify-end">
            {isGlobalStatsLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <div className="flex w-full justify-center relative md:gap-16 gap-5">
                                <img
                                    className="h-56 w-auto"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/portraits/yinlin.webp`}
                                    alt="Yinlin"
                                />
                                <img
                                    className="h-56 w-auto transform scale-x-[-1]"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/portraits/jinhsi.webp`}
                                    alt="Jinhsi"
                                />

                                <div className="absolute bottom-0 left-0 w-full flex justify-between">
                                    <div className="bg-primary/30 py-2 px-4 rounded-2xl w-30 text-center">
                                        <div className="text-3xl font-bold">
                                            {
                                                globalData.items
                                                    .featured_resonator.s5s
                                                    .yinlin.c
                                            }
                                        </div>
                                        <div>Yinlin</div>
                                    </div>
                                    <div className="bg-primary/30 py-2 px-4 rounded-2xl w-30 text-center">
                                        <div className="text-3xl font-bold">
                                            {
                                                globalData.items
                                                    .featured_resonator.total
                                            }
                                        </div>
                                        <div>Total</div>
                                    </div>
                                    <div className="bg-primary/30 py-2 px-4 rounded-2xl w-30 text-center">
                                        <div className="text-3xl font-bold">
                                            {
                                                globalData.items
                                                    .featured_resonator.s5s
                                                    .jinhsi.c
                                            }
                                        </div>
                                        <div>Jinhsi</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-s mt-2 type-p">
                                <div className="flex items-center">
                                    Total 50/50 Wins:
                                    <span className="text-primary mx-1 flex items-center font-bold">
                                        {calculatePercentage(
                                            globalData.items.featured_resonator
                                                .ff_won,
                                            globalData.items.featured_resonator
                                                .ff_won +
                                                globalData.items
                                                    .featured_resonator.ff_lose
                                        )}
                                        <Percent className="w-4 mx-1" /> (
                                        {
                                            globalData.items.featured_resonator
                                                .ff_won
                                        }
                                        W<span className="mx-1">-</span>
                                        {
                                            globalData.items.featured_resonator
                                                .ff_lose
                                        }
                                        L)
                                    </span>
                                </div>
                            </div>
                            <div className="type-p">
                                Calculated from data submitted by
                                <span className="font-bold text-primary mx-1 type-p">
                                    {globalData.total_records}
                                </span>
                                wuwapal.com users.
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="flex gap-1"
                            onClick={() => router.push("/convene/global")}
                        >
                            <Globe />
                            Global Convene Stats
                        </Button>
                    </CardFooter>
                </>
            )}
        </Card>
    );
}
