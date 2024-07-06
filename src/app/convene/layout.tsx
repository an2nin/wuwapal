import { Import, RefreshCcw } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    // Basic Meta Tags
    title: "Wuwa Pal - Convene Tracker",
    description:
        "A pity counter for Wuthering Waves, using the up-to-date data with global statistics and more. Synchronize your data across devices and share your pulls with your friends and track your account easily!",
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
};

export default function ConveneLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="grid grid-cols-1 gap-5 lg:mt-10">
                <div className="flex gap-5 lg:justify-end justify-center">
                    <Link href={"/import"}>
                        <div className="flex gap-2 items-center text-primary border-2 border-primary bg-background rounded-full px-3 py-2 hover:bg-primary hover:text-primary-foreground">
                            <Import /> Import History
                        </div>
                    </Link>
                    <Link href={"/import"}>
                        <div className="flex gap-2 items-center text-primary border-2 border-primary bg-background rounded-full px-3 py-2 hover:bg-primary hover:text-primary-foreground">
                            <RefreshCcw />
                            Refresh
                        </div>
                    </Link>
                </div>
                {children}
            </div>
        </>
    );
}
