import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BannerView from "@/components/banner/BannerView";
import { bannerTypes } from "@/helpers/constants";
import { useBannerStore } from "@/stores/banner";
import SyncBtn from "@/components/convene/SyncBtn";
import BackupCSV from "@/components/banner/BackupCSV";
import Head from "next/head";
export default function ConveneTracker() {
    const router = useRouter();
    const bannerStore = useBannerStore<any>((state: any) => state);

    return (
        <>
            <Head>
                <title>WuWaPal - Convene Tracker</title>
                <meta
                    name="description"
                    content="Track your pulls and wishes in Wuthering Waves with the Convene Tracker on WuWaPal. See detailed graphs, tables, and statistics to optimize your game strategy."
                />
                <meta
                    name="keywords"
                    content="Wuthering Waves Convene Tracker, Wuthering Waves Pull Tracker, Wuthering Waves Wish Tracker, gacha game tracker, Wuthering Waves statistics, Wuthering Waves pulls, WuWaPal tracker, wuwa tacker, wuwatracker, WuWaTracker"
                />
                <meta property="og:title" content="Convene Tracker" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://wuwapal.com/wuwapal-og.png"
                />
            </Head>
            <div className="flex flex-col">
                <div className="flex flex-wrap justify-between">
                    <div className="flex gap-5 items-center mb-5">
                        <h1 className="text-xl font-semibold md:text-4xl">
                            Convene Tracker
                        </h1>
                        <div>
                            <Button
                                onClick={() => router.push("/convene/import")}
                            >
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

                <div>
                    <button onClick={() => router.push("/convene/global")} className="relative my-5 md:my-1 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-3 py-1 text-sm font-medium hover:bg-white hover:text-black text-white backdrop-blur-3xl">
                            Go to Global Statistics
                        </span>
                    </button>
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
        </>
    );
}
