"use client";
import { ChevronsRight, Ellipsis } from "lucide-react";
import { NAVS } from "@/app/_constants/navs";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Google } from "@/app/_components/ui/custom-icons";

interface Props {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
    currentActiveNav: any;
}

export default function Sidebar({
    isSidebarOpen,
    setIsSidebarOpen,
    currentActiveNav,
}: Props) {
    return (
        <>
            <aside
                className={`fixed top-0 left-0 lg:flex lg:flex-col justify-center hidden z-0 h-screen `}
            >
                <div
                    className={`h-96 bg-card-light rounded-r-2xl border border-t-accent/70 border-r-accent/70 border-b-accent/70 relative transition-[width] ease-in-out duration-300 ${
                        isSidebarOpen ? "w-60" : "w-[90px]"
                    }`}
                >
                    <div className="invisible lg:visible absolute top-[17px] -right-[16px] z-20">
                        <div className="absolute right-1 top-36">
                            <Button
                                className="z-50 p-1 m-0 bg-background rounded-xl"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                variant="outline"
                                size="lg"
                            >
                                {isSidebarOpen ? (
                                    <ChevronsRight className="w-5 h-5 transform rotate-180" />
                                ) : (
                                    <ChevronsRight className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto overflow-x-clip">
                        <div dir="ltr" className="relative overflow-hidden">
                            <div
                                data-radix-scroll-area-viewport=""
                                className="h-full w-full rounded-[inherit]"
                            >
                                <div>
                                    <nav className="h-full w-full">
                                        <ul className="flex flex-col min-h-[calc(100svh-48px-36px-16px-32px)] lg:min-h-[calc(100svh-32px-40px-32px)] items-start space-y-1 px-2">
                                            <li>
                                                <div
                                                    className={`mb-4 flex items-center gap-2 hover:no-underline ${
                                                        isSidebarOpen
                                                            ? "ml-1"
                                                            : ""
                                                    }`}
                                                >
                                                    <Link
                                                        className="aspect-square relative w-12 hover:scale-110 transition-transform"
                                                        href="/"
                                                    >
                                                        <img
                                                            alt="Bangboo Logo"
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="object-cover absolute h-12 w-12"
                                                            src="/android-chrome-192x192.png"
                                                        />
                                                    </Link>
                                                    <h1
                                                        className={`${
                                                            isSidebarOpen
                                                                ? "w-auto opacity-100"
                                                                : "w-0 opacity-0"
                                                        } font-bold text-xl whitespace-nowrap overflow-hidden transition-[width,opacity] ease-in-out duration-300`}
                                                    >
                                                        {
                                                            process.env
                                                                .NEXT_PUBLIC_APP_NAME
                                                        }
                                                    </h1>
                                                </div>
                                            </li>
                                            {Object.keys(NAVS).map((key) => (
                                                <li
                                                    key={key}
                                                    className="w-full pt-3"
                                                >
                                                    {isSidebarOpen ? (
                                                        <p className="text-sm px-4 pb-2 max-w-[248px] truncate text-gray-400 font-semibold">
                                                            {key}
                                                        </p>
                                                    ) : (
                                                        <div className="flex w-full justify-center">
                                                            <Ellipsis className="h-5 w-5" />
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col gap-1">
                                                        {NAVS[key].map(
                                                            (
                                                                item: any,
                                                                idx: number
                                                            ) => (
                                                                <div
                                                                    key={idx}
                                                                    className={`w-full rounded-lg hover:bg-gray-700/80 ${
                                                                        currentActiveNav?.match ===
                                                                        item.path
                                                                            ? "bg-gray-700/80 hover:bg-gray-700/90 "
                                                                            : "opacity-50 hover:opacity-100"
                                                                    }`}
                                                                >
                                                                    <Link
                                                                        className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full justify-start h-10"
                                                                        data-state="closed"
                                                                        href={
                                                                            item.path
                                                                        }
                                                                    >
                                                                        <span className="mr-4">
                                                                            {
                                                                                item.icon
                                                                            }
                                                                        </span>
                                                                        <p className="max-w-[200px] truncate translate-x-0 opacity-100">
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </p>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                            <li className="w-full grow flex flex-col gap-4 justify-end">
                                                <span>
                                                    <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full justify-center gap-2 h-10 border border-input bg-white hover:bg-accent text-black hover:text-accent-foreground">
                                                        <Google />
                                                        <span
                                                            className={`${
                                                                isSidebarOpen
                                                                    ? "translate-x-0 opacity-100"
                                                                    : "-translate-x-96 opacity-0 hidden"
                                                            } whitespace-nowrap`}
                                                        >
                                                            Sign In to Google
                                                        </span>
                                                    </button>
                                                </span>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
