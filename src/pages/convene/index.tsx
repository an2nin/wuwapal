import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import BannerView from "@/components/banner/BannerView";
import { bannerTabs, bannerTypes } from "@/helpers/constants";
import { useBannerStore } from "@/stores/banner";
import SyncBtn from "@/components/convene/SyncBtn";
import Head from "next/head";
import BannerTab from "@/components/banner/BannerTab";
import { useState } from "react";
export default function ConveneTracker() {
    const router = useRouter();
    const bannerStore = useBannerStore<any>((state: any) => state);
    const [activeBannerTab, setActiveBannerTab] =
        useState("featured_resonator");
    const handleBannerClick = (tab: string) => {
        setActiveBannerTab(tab);
    };
    return (
        <>
            <Head>
                <title>WuWaPal - Convene Tracker</title>
                <meta
                    name="description"
                    content="Discover everything about Wuthering Waves on WuWaPal! Get the latest news, guides, Pity tracker, and tools to make your life easy in this exciting gacha game."
                />
                <meta name="application-name" content="Wuwa Pal" />
                <meta name="author" content="antoninislam" />
                <meta name="generator" content="Next.js" />
                <meta
                    name="keywords"
                    content="wuthering waves convene tracker, wuthering waves pull tracker, wuwa tracker, wuthering waves pity tracker, wuthering waves, convene tracker, wuwa pull tracker, wuwa convene tracker, wuwa pity tracker, wuwa wish tracker, wuthering waves, wuwapal, gacha game guide, wuthering waves news, wuthering waves tips, wuthering waves characters"
                />
                <meta name="referrer" content="origin-when-cross-origin" />
                <meta name="creator" content="antoninislam" />
                <meta name="publisher" content="antoninislam" />
                <meta name="robots" content="index, follow" />
                <meta
                    name="googlebot"
                    content="index, follow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
                />
                <meta name="category" content="Gaming" />
                <meta name="classification" content="Wuthering Waves Tool" />
                <meta
                    name="format-detection"
                    content="telephone=no, address=no, email=no"
                />

                <meta property="og:title" content="WuWa Pal" />
                <meta
                    property="og:description"
                    content="A pity counter for Wuthering Waves, using the up-to-date data with global statistics and more."
                />
                <meta property="og:url" content="https://wuwapal.com" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:type" content="website" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta
                    property="og:image:alt"
                    content="Wuwa Pal: Track Your Convene History &amp; View Global Statistics"
                />
                <meta
                    property="og:image"
                    content="https://wuwapal.com/wuwapal-org3.jpeg"
                />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@antoninislam" />
                <meta name="twitter:title" content="Wuwa Pal" />
                <meta
                    name="twitter:description"
                    content="Discover everything about Wuthering Waves on WuWaPal! Get the latest news, guides, Pity tracker, and tools to make your life easy in this exciting gacha game!"
                />
                <meta name="twitter:image:type" content="image/png" />
                <meta name="twitter:image:width" content="1200" />
                <meta name="twitter:image:height" content="630" />
                <meta
                    name="twitter:image:alt"
                    content="Wuwa Pal: Track Your Convene History &amp; View Global Statistics"
                />
                <meta
                    name="twitter:image"
                    content="https://wuwapal.com/wuwapal-org3.jpeg"
                />
            </Head>
            <div className="flex flex-col gap-5">
                <div className="flex flex-wrap justify-between">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-xl font-semibold md:text-4xl ">
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
                </div>
                <div className="w-full grid grid-cols-12 gap-5">
                    <div className="md:col-span-4 col-span-12 flex flex-col gap-5">
                        {bannerStore.banners && bannerTabs.map((tab, idx) => (
                            <BannerTab
                                key={idx}
                                tabInfo={tab}
                                bannerInfo={bannerStore.banners[tab.store_id]}
                                active={tab.store_id === activeBannerTab}
                                onClick={handleBannerClick}
                            />
                        ))}
                        <div>
                            <button
                                onClick={() => router.push("/convene/global")}
                                className="relative md:my-1 transition-transform transform hover:scale-105 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-3 py-1 text-sm font-medium  text-white backdrop-blur-3xl">
                                    Go to Global Statistics
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-8 col-span-12">
                        <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                            {bannerStore.banners && (
                                <BannerView
                                    banner_store_id={activeBannerTab}
                                    banner={
                                        bannerStore.banners[activeBannerTab]
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
