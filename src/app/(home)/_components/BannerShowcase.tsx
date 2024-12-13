"use client";
import ResourceAvatar from "@/app/_components/banner/ResourceAvatar";
import CountdownTimer from "@/app/_components/timers/CountdownTimer";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { BANNERS } from "@/shared/banners";
import { convertToISOWithOffset } from "@/shared/helpers/time";

const items = {
    s5: [
        { name: "Yinlin", rarity: 5, type: "resonators" },
        { name: "Stringmaster", rarity: 5, type: "weapons" },
        { name: "Xiangli Yao", rarity: 5, type: "resonators" },
        { name: "Verity's Handle", rarity: 5, type: "weapons" },
    ],
    s4: ["Lumi", "Baizhi", "Yuanwu"],
    img: BANNERS.featured_resonator.image,
    end_time: "2025-01-01 11:59",
};

export default function BannerShowcase() {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Ongoing Banner</CardTitle>
            </CardHeader>
            <CardContent className="min-h-44">
                <div className="rounded-2xl relative">
                    <img
                        src={items.img}
                        className="min-h-44 rounded-2xl"
                        alt="current banner"
                    />
                    <div className="absolute bottom-0 left-0 h-full w-full">
                        <div className="flex gap-5 h-full items-center ml-4">
                            <div className="flex flex-col flex-wrap h-[13rem] justify-center gap-3">
                                {items.s5.map((item, idx) => (
                                    <ResourceAvatar key={idx} item={{
                                        name: item.name,
                                        rarity: 5,
                                        type: item.type,
                                    }} />
                                ))}
                            </div>
                            <div className="flex flex-col flex-wrap h-[13rem] justify-center gap-3">
                                {items.s4.map((item, idx) => (
                                    <ResourceAvatar
                                        key={idx}
                                        className=""
                                        item={{
                                            name: item,
                                            rarity: 4,
                                            type: "resonators",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex h-full gap-2 font-bold text-primary">
                    Ending in
                    <CountdownTimer
                        targetDate={convertToISOWithOffset(
                            items.end_time,
                            8
                        )}
                    />
                </div>
            </CardFooter>
        </Card>
    );
}
