import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
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
            <div
                className={`flex flex-col gap-5 items-center justify-center w-full my-[12vh] `}
            >
                <Card className="w-96">
                    <CardHeader>
                        <CardTitle>Welcome to WuWaPal </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            The only pal you need for your adventures in
                            Wuthering Waves. WuWaPal will help you with
                            everything you need to plan your next adventure{" "}
                            <span className="text-xs">in future</span>. and now
                            head on to the Convene Tracker which the only thing
                            currently works.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => router.push("/convene")}>
                            Convene Tracker
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="w-96">
                    <CardHeader>
                        <CardTitle>Currently Working on</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside">
                            <li>Global Statistic</li>
                            <li>Cloud Syncing of Convene Record</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
