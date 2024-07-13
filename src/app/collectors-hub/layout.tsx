import { Metadata } from "next";


export const metadata: Metadata = {
    // Basic Meta Tags
    title: "Collectors Hub - Convene Tracker - Wuwa Pal",
    description:
        "View your updated Wuthering Waves pull statistics and recent convenes. Use screenshot-ready dashboards to brag to your friends! Wuwa Tracker pity counter for Wuthering Waves with up-to-date data and global statistics. Share your pulls and track your account!",
    applicationName: "Wuwa Pal",
    authors: [{ name: "antonin686", url: "https://github.com/antonin686" }],
    generator: "Next.js",
    keywords: [
        "wuthering wave collection",
        "wuthering wave collection tracker",
        "wuthering wave character",
        "wuthering wave character collection",
        "wuthering wave resonator collection",
        "wuthering wave weapon collection",

        "wuthering collection",
        "wuthering collection tracker",
        "wuthering character",
        "wuthering character collection",
        "wuthering resonator collection",
        "wuthering weapon collection",

        "wuwa collection",
        "wuwa collection tracker",
        "wuwa character",
        "wuwa character collection",
        "wuwa resonator collection",
        "wuwa weapon collection",
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
                url: "https://wuwapal.com/og.png",
                width: 1200,
                height: 630,
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
                url: "https://wuwapal.com/og.png",
                width: 1200,
                height: 630,
                alt: "Wuwa Pal: Track Your Convene History & View Global Statistics",
            },
        ],
        description:
            "View your updated Wuthering Waves pull statistics and recent convenes. Use screenshot-ready dashboards to brag to your friends! Wuwa Tracker pity counter for Wuthering Waves with up-to-date data and global statistics. Share your pulls and track your account!",
    },
};

export default function CollectorsHubLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
