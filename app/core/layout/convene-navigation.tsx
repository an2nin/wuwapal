"use client";

import { Button } from "@/shared/components/ui/button";
import { Import } from "lucide-react";
import { useRouter } from "next-nprogress-bar";

export default function ConveneNavigation() {
    const router = useRouter();

    return (
        <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-wrap gap-5 lg:justify-end justify-center">
               {/*  <button onClick={() => router.push("/convene/global")}>
                    <MovingBorder isHoverable>
                        <div className="flex items-center gap-2 px-2">
                            <Globe className="size-6" /> Global Stats
                        </div>
                    </MovingBorder>
                </button> */}
                <Button
                    onClick={() => router.push("/convene/import")}
                    variant="outline"
                >
                    <Import className="size-6" /> Import History
                </Button>
            </div>
        </div>
    );
}
