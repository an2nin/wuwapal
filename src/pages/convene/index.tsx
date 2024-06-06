import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BannerView from "@/components/banner/BannerView";
import { bannerTypes } from "@/helpers/constants";
import { useBannerStore } from "@/stores/banner";
import SyncBtn from "@/components/convene/SyncBtn";
import BackupCSV from "@/components/banner/BackupCSV";
export default function ConveneTracker() {
    const router = useRouter();
    const bannerStore = useBannerStore<any>((state: any) => state);

    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap justify-between">
                <div className="flex gap-5 items-center mb-5">
                    <h1 className="text-xl font-semibold md:text-4xl">
                        Convene Tracker
                    </h1>
                    <div>
                        <Button onClick={() => router.push("/convene/import")}>
                            <div className="flex gap-3 items-center">
                                Import Records
                            </div>
                        </Button>
                    </div>
                    {bannerStore.banner_record_url && (
                        <div>
                            <SyncBtn
                                historyUrl={bannerStore.banner_record_url}
                            />
                        </div>
                    )}
                </div>
                {bannerStore.banners.beginner && <BackupCSV />}
            </div>

            <Tabs defaultValue="featured_resonator">
                <div className="flex w-full justify-center my-7">
                    <TabsList>
                        <TabsTrigger value="featured_resonator">
                            Featured Resonator
                        </TabsTrigger>
                        <TabsTrigger value="featured_weapon">
                            Featured Weapon
                        </TabsTrigger>
                        <TabsTrigger value="standard_resonator">
                            Standard Resonator
                        </TabsTrigger>
                        <TabsTrigger value="standard_weapon">
                            Standard Weapon
                        </TabsTrigger>
                        <TabsTrigger value="beginner">Beginner</TabsTrigger>
                        <TabsTrigger value="beginner_choice">
                            Beginner&apos;s Choice
                        </TabsTrigger>
                    </TabsList>
                </div>

                {bannerStore.banners &&
                    bannerTypes.map((banner, idx) => (
                        <TabsContent key={idx} value={banner.store_id}>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                                <BannerView
                                    banner_store_id={banner.store_id}
                                    banner={
                                        bannerStore.banners[banner.store_id]
                                    }
                                />
                            </div>
                        </TabsContent>
                    ))}
            </Tabs>
        </div>
    );
}
