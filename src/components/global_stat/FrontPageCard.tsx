import { Globe, Info } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

interface Props {
    globalData: any;
}
export default function FrontPageCard({ globalData }: Props) {
    console.log(globalData.items.featured_resonator.s5s.yinlin.c);
    return (
        <Card className="w-full">
            <CardContent>
                <div className="flex flex-col gap-3">
                    <div className="flex w-full justify-center relative">
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
                            <div className=" bg-black/60 py-2 px-4 rounded-2xl w-30 text-center">
                                <div className="text-3xl font-bold">
                                    {
                                        globalData.items.featured_resonator.s5s
                                            .yinlin.c
                                    }
                                </div>
                                <div>Yinlin</div>
                            </div>
                            <div className="bg-black/60 py-2 px-4 rounded-2xl w-30 text-center">
                                <div className="text-3xl font-bold">
                                    {
                                        globalData.items.featured_resonator.total
                                    }
                                </div>
                                <div>Total</div>
                            </div>
                            <div className="bg-black/60 py-2 px-4 rounded-2xl w-30 text-center">
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
                    <div className="flex justify-between">
                        <div>
                            Total 50/50 Wins:
                            <span className="text-primary mx-1">
                                {globalData.items.featured_resonator.ff_won}
                            </span>
                        </div>
                        <div>
                            Total 50/50 Loses:
                            <span className="text-primary mx-1">
                                {globalData.items.featured_resonator.ff_lose}
                            </span>
                        </div>
                    </div>
                    <div className="text-base">
                        Calculated from data submitted by
                        <span className="text-bold text-primary mx-1">
                            {globalData.total_records}
                        </span>
                        wuwapal.com users.
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="flex gap-1"><Globe />Global Convene Stats</Button>
            </CardFooter>
        </Card>
    );
}
{
    /* <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/portraits/yinlin.webp` } alt="" /> */
}
