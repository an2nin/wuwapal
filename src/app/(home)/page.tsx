import BasicIntro from "@/app/(home)/_components/BasicIntro";
import { Metadata } from "next";
import LinkCard from "./_components/LinkCard";
import { Combine, Globe } from "lucide-react";
import PageHeader from "@/app/_components/layout/PageHeader";
import SocialLinks from "./_components/SocialLinks";
import Changelogs from "./_components/Changelogs";
import ResonatorBattle from "./_components/ResonatorBattle";
import { useGlobalStatsQuery } from "@/redux/services/banner";

export const metadata: Metadata = {
    // Basic Meta Tags
    title: "ZZZ Tracker",
    description:
        "A pity counter for Zenless Zone Zero (ZZZ), using the up-to-date data with global statistics and more. Synchronize your data across devices and share your pulls with your friends and track your account easily!",
    applicationName: "ZZZ Tracker",
    authors: [{ name: "antonin686", url: "https://github.com/antonin686" }],
    generator: "Next.js",
    keywords: [
        "zenless zone zero convene tracker",
        "zenless zone zero pull tracker",
        "zzz tracker",
        "zenless zone zero pity tracker",
        "zenless zone zero",
        "zzz signal tracker",
        "zzz pull tracker",
        "zzz convene tracker",
        "zzz pity tracker",
        "zzz wish tracker",
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
                <div className="lg:col-span-8">
                    <BasicIntro />
                </div>
                <div className="lg:col-span-4">
                    <SocialLinks />
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-col-1 gap-5">
                <div className="grid grid-cols-1 gap-5">
                    <LinkCard
                        title="Convene Tracker"
                        href="/convene/tracker"
                        icon={<Globe className="w-4 h-4" />}
                    >
                        Wanna See how your fellow Proxies are doing in their
                        pulling journey?
                    </LinkCard>
                    <LinkCard
                        title="Collector's Hub"
                        href="/collectors-hub"
                        icon={<Combine className="w-4 h-4" />}
                    >
                        Are you a collector extraordinaire? Curious to see your
                        fabulous collection in one exciting glance?
                    </LinkCard>
                </div>
                <ResonatorBattle />
            </div>
            <div className="grid grid-cols-1 gap-5">
                <Changelogs />
            </div>
        </div>
    );
}
