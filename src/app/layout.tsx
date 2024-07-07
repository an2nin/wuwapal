"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/_components/layout/Sidebar";
import Header from "@/app/_components/layout/Header";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAVS } from "@/app/_constants/navs";
import Footer from "@/app/_components/layout/Footer";
import { Toaster } from "@/app/_components/ui/sonner";
import { AppProgressBar as TopProgressBar } from "next-nprogress-bar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

function HOC({ children }: any) {
    return (
        <>
            <Provider store={store}>
                <GoogleOAuthProvider
                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
                >
                    {children}
                </GoogleOAuthProvider>
            </Provider>
        </>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [currentActiveNav, setCurrentActiveNav] = useState<any>(null);

    useEffect(() => {
        const getActiveNavItem = () => {
            let bestMatch = null;
            let bestMatchLength = 0;

            for (const key of Object.keys(NAVS)) {
                const items = NAVS[key];
                for (const navItem of items) {
                    if (
                        pathname.startsWith(navItem.path) &&
                        navItem.path.length > bestMatchLength
                    ) {
                        bestMatch = navItem;
                        bestMatchLength = navItem.path.length;
                    }
                }
            }

            return bestMatch;
        };

        const activeNavItem = getActiveNavItem();
        setCurrentActiveNav(activeNavItem);
    }, [pathname]);

    return (
        <html lang="en">
            <head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
            </head>
            <body className={"bg-grid-small-white/[0.2]  " + inter.className}>
                <TopProgressBar
                    color="hsl(var(--primary))"
                    options={{ showSpinner: false }}
                />
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    currentActiveNav={currentActiveNav}
                />
                <div
                    className={`min-h-screen flex flex-col  justify-start transition-[margin-left] ease-in-out duration-300 ${
                        isSidebarOpen ? "lg:ml-60" : "lg:ml-[90px]"
                    }`}
                >
                    <Header currentActiveNav={currentActiveNav} />
                    <div className="flex-1 container my-10 lg:mt-0 ">
                        <HOC>{children}</HOC>
                    </div>
                    <div className="container">
                        <Footer />
                    </div>
                    <Toaster richColors />
                </div>
            </body>
        </html>
    );
}
