import { Metadata } from "next";

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
            {children}
        </>
    );
}
