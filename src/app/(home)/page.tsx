import BasicIntro from "@/app/(home)/_components/BasicIntro";
import { Metadata } from "next";
import LinkCard from "./_components/LinkCard";
import { Combine, Globe, Sparkles } from "lucide-react";
import PageHeader from "@/app/_components/layout/PageHeader";
import SocialLinks from "./_components/SocialLinks";
import Changelogs from "./_components/Changelogs";
import ResonatorBattle from "./_components/ResonatorBattle";
import BannerShowcase from "./_components/BannerShowcase";

export const metadata: Metadata = {
    // Basic Meta Tags
    title: "Wuwa Pal",
    description:
        "Track your Wuthering Waves pity counter with up-to-date global statistics. Synchronize data across devices, share pulls with friends, and easily manage your account. Enhance your gaming experience now!",
    applicationName: "Wuwa Pal",
    authors: [{ name: "antonin686", url: "https://github.com/antonin686" }],
    generator: "Next.js",
    keywords: [
        "wuthering wave convene tracker",
        "wuthering wave pull tracker",
        "wuwa tracker",
        "wuthering wave pity tracker",
        "wuthering wave",
        "wuwa pull tracker",
        "wuwa convene tracker",
        "wuwa pity tracker",
        "wuwa wish tracker",
    ],
    referrer: "origin-when-cross-origin",
    creator: "antonin686",
    publisher: "antonin686",
    robots: "index, follow",
    formatDetection: {
        telephone: true,
        address: true,
        email: true,
    },
    openGraph: {
        title: "Wuwa Pal",
        description:
            "Track your Wuthering Waves pity counter with up-to-date global statistics. Synchronize data across devices, share pulls with friends, and easily manage your account. Enhance your gaming experience now!",
        url: "https://wuwapal.com",
        siteName: "Wuwa Pal",
        images: [
            {
                url: "https://wuwapal.com/wuwapal.png",
                width: 1200,
                height: 675,
                alt: "Wuwa Pal: Track Your Convene History & View Global Statistics",
            },
        ],
        locale: "en-US",
        type: "website",
    },
    twitter: {
        title: "Wuwa Pal",
        card: "summary_large_image",
        site: "@antonin686",
        creator: "@antonin686",
        images: [
            {
                url: "https://wuwapal.com/wuwapal.png",
                width: 1200,
                height: 675,
                alt: "Wuwa Pal: Track Your Convene History & View Global Statistics",
            },
        ],
        description:
            "Track your Wuthering Waves pity counter with up-to-date global statistics. Synchronize data across devices, share pulls with friends, and easily manage your account. Enhance your gaming experience now!",
    },
};

export default function Home() {
    return (
        <div className="flex flex-col gap-5">
            <PageHeader>
                <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
                    Welcome to WuWaPal
                    <span className="text-primary text-lg">.com</span>
                </h1>
            </PageHeader>


            <div className="grid lg:grid-cols-12 grid-cols-1 gap-5">
                <div className="lg:col-span-7">
                    <BasicIntro />
                </div>
                <div className="lg:col-span-5">
                    <SocialLinks />
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-col-1 gap-5">
                {/* <div className="grid grid-cols-1 gap-5">
                    <LinkCard
                        title="Convene Tracker"
                        href="/convene"
                        icon={<Sparkles className="size-5" />}
                    >
                        Wanna See how your are doing in your pulling journey?
                    </LinkCard>
                    <LinkCard
                        title="Collector's Hub"
                        href="/collectors-hub"
                        icon={<Combine className="size-5" />}
                    >
                        Are you a collector extraordinaire? Curious to see your
                        fabulous collection in one exciting glance?
                    </LinkCard>
                </div> */}
                <BannerShowcase />
                <ResonatorBattle />
            </div>
            <div className="grid grid-cols-1 gap-5">
                <Changelogs />
            </div>
        </div>
    );
}
