import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

export default function BannerTab() {
    return (
        <Card className="hover:border hover:border-accent cursor-pointer">
            <CardContent className="pt-6 relative">
                <div className="flex gap-5">
                    <div className="text-quality-5 mb-2">
                        <p className="font-extrabold text-xl truncate drop-shadow-2xl">
                            19/80
                        </p>
                        <p className="font-semibold text-xs truncate drop-shadow-2xl">
                            5✦ Pity
                        </p>
                    </div>
                    <div className="text-quality-4 mb-2">
                        <p className="font-extrabold text-xl truncate drop-shadow-2xl">
                            9/10
                        </p>
                        <p className="font-semibold text-xs truncate drop-shadow-2xl">
                            4✦ Pity
                        </p>
                    </div>
                </div>
                <p
                    className="font-bold text-xl md:text-xs xl:text-xl truncate z-20"
                    style={{
                        background: "linear-gradient(to right, gray, #fff)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "transparent",
                    }}
                >
                    Thawborn Renewal
                </p>
                <div className="transition-all absolute bottom-0 right-0  z-0">
                    <img
                        alt="Jinhsi"
                        className="object-cover h-36 w-auto"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/portraits/jinhsi.webp`}
                        style={{ color: "transparent" }}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
