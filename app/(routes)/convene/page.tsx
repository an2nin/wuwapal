import Tracker from "@/features/tracker";
import { Metadata } from "next";

export const metadata: Metadata = {
    // Basic Meta Tags
    title: "Convene Tracker - Wuwa Pal",
    description:
        "View your updated Wuthering Waves pull statistics and recent convenes. Use screenshot-ready dashboards to brag to your friends! Wuwa Tracker pity counter for Wuthering Waves with up-to-date data and global statistics. Share your pulls and track your account!",
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
            "View your updated Wuthering Waves pull statistics and recent convenes. Use screenshot-ready dashboards to brag to your friends! Wuwa Tracker pity counter for Wuthering Waves with up-to-date data and global statistics. Share your pulls and track your account!",
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
            "View your updated Wuthering Waves pull statistics and recent convenes. Use screenshot-ready dashboards to brag to your friends! Wuwa Tracker pity counter for Wuthering Waves with up-to-date data and global statistics. Share your pulls and track your account!",
    },
};

export default function page() {
  return (
    <Tracker />
  )
}
