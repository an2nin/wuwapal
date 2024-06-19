import EventTracker from "@/components/events/EventTracker";
import FrontPageCard from "@/components/global_stat/FrontPageCard";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useGlobalStatsQuery } from "@/redux/services/banner";
import { Sparkles } from "lucide-react";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const { data: globalStats, isSuccess: isGlobalStatsSuccess } =
        useGlobalStatsQuery<any>();

    return (
        <>
            <Head>
                <title>WuWaPal - Your Ultimate Guide to Wuthering Waves</title>
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
            <div className={`grid grid-cols-12 gap-5 justify-center w-full`}>
                <div className="md:col-span-7 col-span-12 flex flex-col gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-center">
                                Welcome to WuWaPal
                            </CardTitle>
                            <CardDescription className="flex justify-center text-white">
                                Your WuWa Adventure Buddy
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="max-w-4xl md:px-5 text-center">
                                Hello fellow Rovers, this website is dedicated
                                to enhancing your experience in Wuthering Waves.
                                Currently, we offer a Convene (Pull) Tracker and
                                global pull statistics to assist you in your
                                adventures. We have many more tools in the
                                pipeline that will be available soon. We highly
                                value your feedback, which you can provide via
                                <a
                                    href="mailto:wuwapal@gmail.com?subject=Feedback for WuWaPal&body=Hello, My feedback: "
                                    className="text-primary font-bold  hover:text-primary/40 mx-1 underline"
                                >
                                    email
                                </a>
                                .
                            </p>
                        </CardContent>
                    </Card>
                    <EventTracker />
                </div>
                <div className="md:col-span-5 col-span-12 flex flex-col gap-5">
                    <Card>
                        <CardContent className="p-5">
                            <div>
                                View and Analyze you convene record using
                                Convene Tracker.
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => router.push("/convene")}>
                                <div className="flex gap-1 items-center">
                                    <Sparkles />
                                    Convene Tracker
                                </div>
                            </Button>
                        </CardFooter>
                    </Card>
                    {isGlobalStatsSuccess && (
                        <FrontPageCard globalData={globalStats} />
                    )}
                </div>
            </div>
        </>
    );
}
