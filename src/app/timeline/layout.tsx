import { Metadata } from "next";

export const metadata: Metadata = {
    // Basic Meta Tags
    title: "Timeline - Wuwa Pal",
    description:
        "Track Wuthering Wave Events using our Event Timeline. View all the events at a glace",
    applicationName: "Wuwa Pal",
    authors: [{ name: "antonin686", url: "https://github.com/antonin686" }],
    generator: "Next.js",
    keywords: [
        "wuthering wave events",
        "wuthering wave event",
        "wuthering wave timeline",
        "uthering wave event tracker",
        "wuthering events",
        "wuthering event",
        "wuthering timeline",
        "uthering event tracker",
        "wuwa events",
        "wuwa event",
        "wuwa timeline",
        "wuwa event tracker",
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
            "Track Wuthering Wave Events using our Event Timeline. View all the events at a glace",
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
            "Track Wuthering Wave Events using our Event Timeline. View all the events at a glace",
    },
};

export default function TimelineLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
