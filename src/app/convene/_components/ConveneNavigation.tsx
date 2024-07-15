import { Button } from "@/app/_components/ui/button";
import { Globe, Import } from "lucide-react";
import SyncBtn from "./SyncBtn";
import { useRouter } from "next-nprogress-bar";
import MovingBorder from "@/app/_components/ui/moving-border";

export default function ConveneNavigation() {
    const router = useRouter();
    return (
        <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-wrap gap-5 lg:justify-end justify-center">
                <button onClick={() => router.push("/global-stats")}>
                    <MovingBorder isHoverable>
                        <div className="flex items-center gap-2 px-2">
                            <Globe className="size-6" /> Global Stats
                        </div>
                    </MovingBorder>
                </button>

                <Button
                    onClick={() => router.push("/import")}
                    variant="outline"
                >
                    <Import className="size-6" /> Import History
                </Button>
                <div>
                    <SyncBtn />
                </div>
            </div>
        </div>
    );
}
