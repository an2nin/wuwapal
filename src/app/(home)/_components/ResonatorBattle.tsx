"use client";
import { Globe, Percent } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { calculatePercentage } from "@/app/_helpers/processors";
import { useRouter } from "next-nprogress-bar";
import { useGlobalStatsQuery } from "@/redux/services/banner";
import MovingBorder from "@/app/_components/ui/moving-border";

export default function ResonatorBattle() {
    const router = useRouter();
    const {
        data: globalData,
        isLoading: isGlobalStatsLoading,
        isSuccess: isGlobalStatsSuccess,
    } = useGlobalStatsQuery<any>();
    return (
        <Card className="w-full h-full flex flex-col justify-end">
            {isGlobalStatsLoading ? (
                <div className="h-full w-full flex justify-center items-center">
                    Loading...
                </div>
            ) : (
                <>
                    {isGlobalStatsSuccess ? (
                        <>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    <div className="flex w-full justify-center relative md:gap-16 gap-5">
                                        <img
                                            className="h-56 w-auto"
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/portraits-short/changli.webp`}
                                            alt="Yinlin"
                                        />
                                        <img
                                            className="h-56 w-auto transform scale-x-[-1]"
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/portraits/jinhsi.webp`}
                                            alt="Jinhsi"
                                        />

                                        <div className="absolute bottom-0 left-0 w-full flex justify-between">
                                            <div className="lg:bg-primary/50 bg-primary py-2 px-4 rounded-2xl w-30 text-center">
                                                <div className="lg:text-3xl font-bold">
                                                    {
                                                        globalData.items
                                                            .featured_resonator
                                                            .s5s.Changli.c
                                                    }
                                                </div>
                                                <div>Yinlin</div>
                                            </div>
                                            <div className="lg:bg-primary/50 bg-primary py-2 px-4 rounded-2xl w-30 text-center">
                                                <div className="lg:text-3xl font-bold">
                                                    {
                                                        globalData.items
                                                            .featured_resonator
                                                            .total
                                                    }
                                                </div>
                                                <div>Total</div>
                                            </div>
                                            <div className="lg:bg-primary/50 bg-primary py-2 px-4 rounded-2xl w-30 text-center">
                                                <div className="lg:text-3xl font-bold">
                                                    {
                                                        globalData.items
                                                            .featured_resonator
                                                            .s5s.Jinhsi.c
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
                                                    globalData.items
                                                        .featured_resonator
                                                        .ff_win,
                                                    globalData.items
                                                        .featured_resonator
                                                        .ff_win +
                                                        globalData.items
                                                            .featured_resonator
                                                            .ff_lose
                                                )}
                                                <Percent className="w-4 mr-1" />
                                                (
                                                {
                                                    globalData.items
                                                        .featured_resonator
                                                        .ff_win
                                                }
                                                W<span className="mx-1">-</span>
                                                {
                                                    globalData.items
                                                        .featured_resonator
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
                                <button
                                    onClick={() =>
                                        router.push("/convene/global")
                                    }
                                >
                                    <MovingBorder isHoverable>
                                        <div className="flex items-center gap-2 px-2">
                                            <Globe className="size-6" /> Global Convene
                                            Stats
                                        </div>
                                    </MovingBorder>
                                </button>
                            </CardFooter>
                        </>
                    ) : (
                        <div className="h-full w-full flex justify-center items-center">
                            {" No Data Found :("}
                        </div>
                    )}
                </>
            )}
        </Card>
    );
}
