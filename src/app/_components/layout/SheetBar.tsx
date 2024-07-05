import {
    Sheet,
    SheetContent,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { NAVS } from "@/app/_constants/navs";

interface Props {
    currentActiveNav: any;
}

export default function SheetBar({ currentActiveNav }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button
                size="icon"
                variant="outline"
                className="bg-background"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu />
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent side={"left"}>
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
                                                    className={`mb-4 flex items-center gap-2 hover:no-underline`}
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
                                                            src="/bangboo.png"
                                                        />
                                                    </Link>
                                                    <h1
                                                        className={` font-bold text-lg whitespace-nowrap overflow-hidden transition-[width,opacity] ease-in-out duration-300`}
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
                                                    <p className="text-sm px-4 pb-2 max-w-[248px] truncate text-gray-400 font-semibold">
                                                        {key}
                                                    </p>
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
                                                {/* <a
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2 w-full justify-center h-10 pr-6 border border-input whitespace-nowrap opacity-100"
                                                href="/"
                                            >
                                                <span className="mr-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="1.5rem"
                                                        height="1.5rem"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fill="#FF5E5B"
                                                            d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734c4.352.24 7.422-2.831 6.649-6.916m-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09c-.443-.441-3.368-3.049-4.034-3.954c-.709-.965-1.041-2.7-.091-3.71c.951-1.01 3.005-1.086 4.363.407c0 0 1.565-1.782 3.468-.963s1.832 3.011.723 4.311m6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015"
                                                        ></path>
                                                    </svg>
                                                </span>
                                                <p className="whitespace-nowrap opacity-100">
                                                    Support Us
                                                </p>
                                            </a> */}
                                                <span>
                                                    <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full justify-center gap-2 h-10 border border-input bg-white hover:bg-accent text-black hover:text-accent-foreground">
                                                        <svg
                                                            className="h-6 w-6"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            width="24"
                                                        >
                                                            <path
                                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                                fill="#4285F4"
                                                            ></path>
                                                            <path
                                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                                fill="#34A853"
                                                            ></path>
                                                            <path
                                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                                fill="#FBBC05"
                                                            ></path>
                                                            <path
                                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                                fill="#EA4335"
                                                            ></path>
                                                            <path
                                                                d="M1 1h22v22H1z"
                                                                fill="none"
                                                            ></path>
                                                        </svg>
                                                        <span
                                                            className={` whitespace-nowrap`}
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
                </SheetContent>
            </Sheet>
        </>
    );
}
