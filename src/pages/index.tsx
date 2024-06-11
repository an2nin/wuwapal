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
                    content="Discover everything about Wuthering Waves on WuWaPal! Get the latest news, guides, character reviews, and tips to excel in this exciting gacha game."
                />
                <meta
                    name="keywords"
                    content="Wuthering Waves, WuWaPal, gacha game guide, Wuthering Waves news, Wuthering Waves tips, Wuthering Waves characters"
                />
                <meta property="og:title" content="WuWaPal.com" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://wuwapal.com/wuwapal-og.png"
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
                    <Card className="flex-1">
                        <CardContent className="p-5">
                            <div className="flex flex-col gap-5">
                                <div className="text-2xl">Event Tracker</div>
                                <div>Coming Soon</div>
                            </div>
                        </CardContent>
                    </Card>
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
