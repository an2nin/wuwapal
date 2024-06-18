import { Globe, Info, Percent } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { calculatePercentage } from "@/helpers/processors";

interface Props {
    globalData: any;
}
export default function FrontPageCard({ globalData }: Props) {
    const router = useRouter();

    return (
        <Card className="w-full h-full flex flex-col justify-center">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex w-full justify-center relative md:gap-16 gap-5">
                        <img
                            className="h-48 w-auto"
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/portraits/yinlin.webp`}
                            alt=""
                        />
                        <img
                            className="h-48 w-auto transform scale-x-[-1]"
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/portraits/jiyan.webp`}
                            alt=""
                        />

                        <div className="absolute bottom-0 left-0 w-full flex justify-between">
                            <div className=" bg-theme-number py-2 px-4 rounded-2xl w-30 text-center">
                                <div className="text-3xl font-bold">
                                    {
                                        globalData.items.featured_resonator.s5s
                                            .yinlin.c
                                    }
                                </div>
                                <div>Yinlin</div>
                            </div>
                            <div className="bg-theme-number py-2 px-4 rounded-2xl w-30 text-center">
                                <div className="text-3xl font-bold">
                                    {globalData.items.featured_resonator.total}
                                </div>
                                <div>Total</div>
                            </div>
                            <div className="bg-theme-number py-2 px-4 rounded-2xl w-30 text-center">
                                <div className="text-3xl font-bold">
                                    {
                                        globalData.items.featured_resonator.s5s
                                            .jiyan.c
                                    }
                                </div>
                                <div>Jiyan</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-s mt-2">
                        <div className="flex items-center">
                            Total 50/50 Wins:
                            <span className="text-primary mx-1 flex items-center font-bold">
                                {calculatePercentage(
                                    globalData.items.featured_resonator.ff_won,
                                    globalData.items.featured_resonator.ff_won +
                                        globalData.items.featured_resonator
                                            .ff_lose
                                )}
                                <Percent className="w-4 mx-1" /> (
                                {globalData.items.featured_resonator.ff_won}W<span className="mx-1">-</span>
                                {globalData.items.featured_resonator.ff_lose}L)
                            </span>
                        </div>
                    </div>
                    <div className="text-base">
                        Calculated from data submitted by
                        <span className="font-bold text-primary mx-1 text-lg">
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
        </Card>
    );
}
