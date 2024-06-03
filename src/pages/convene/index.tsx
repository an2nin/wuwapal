import BannerCard from "@/components/banner/BannerCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";

export default function ConveneTracker() {
    const router = useRouter();

    const banners = useSelector(
        (state: RootState) => state.persistedReducer.bannerReducer
    );

    return (
        <div className="flex flex-col">
            <div className="flex gap-5 items-center mb-5">
                <h1 className="text-xl font-semibold md:text-4xl">
                    Convene Tracker
                </h1>
                <div>
                    <Button
                        onClick={() => router.push("/convene/import")}
                    >
                        Import Convene Record
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                    <BannerCard banner={{ title: "Featured Resonator", items: banners.featured_resonator }} />
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                    <BannerCard banner={{ title: "Featured Resonator" }} />
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                    <BannerCard banner={{ title: "Featured Resonator" }} />
                </div>
            </div>
        </div>
    );
}
