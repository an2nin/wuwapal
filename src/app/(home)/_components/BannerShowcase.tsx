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
import { convertToISOWithOffset } from "@/shared/helpers/time";

const items = {
    s5: [
        { name: "Jinhsi", rarity: 5, type: "resonators" },
        { name: "Ages of Harvest", rarity: 5, type: "weapons" },
    ],
    s4: ["Sanhua", "Yangyang", "Danjin"],
    img: "/images/banners/thawborn_renewal.webp",
};

export default function BannerShowcase() {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Ongoing Banner</CardTitle>
            </CardHeader>
            <CardContent className="mt-10 min-h-44">
                <div className="rounded-2xl relative">
                    <img
                        src={items.img}
                        className="min-h-44 rounded-2xl"
                        alt="current banner"
                    />
                    <div className="absolute bottom-0 left-0 h-full w-full">
                        <div className="flex gap-5 h-full items-center ml-4">
                            <div className="flex flex-col gap-3">
                                <ResourceAvatar item={items.s5[0]} />
                                <ResourceAvatar item={items.s5[1]} />
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
            <CardFooter >
                    <div className="flex h-full gap-2 font-bold text-primary">
                        Ending in
                        <CountdownTimer
                            targetDate={convertToISOWithOffset(
                                "2024-07-22 09:59",
                                8
                            )}
                        />
                </div>
            </CardFooter>
        </Card>
    );
}
