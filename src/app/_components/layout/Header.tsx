import { Settings } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import SheetBar from "@/app/_components/layout/SheetBar";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import React from "react";
import { NAVS } from "@/app/_constants/navs";
interface Props {
    currentActiveNav: any;
}

export default function Header({ currentActiveNav }: Props) {
    const router = useRouter();
    return (
        <header className="flex flex-col sticky top-0 z-50 lg:container w-full">
            <div className="w-full py-2 flex bg-card-light border rounded-b-xl justify-between items-center px-4">
                <div className="lg:hidden block">
                    <SheetBar currentActiveNav={currentActiveNav} />
                </div>
                <div>
                    <Link
                        className="flex gap-1 items-center hover:scale-110 transition-transform"
                        href="/"
                    >
                        <img
                            alt="Brand Logo"
                            loading="lazy"
                            decoding="async"
                            className="h-10 w-10"
                            src="/android-chrome-192x192.png"
                        />
                        <h1 className="font-bold">
                            {process.env.NEXT_PUBLIC_APP_NAME}
                            <span className="text-primary text-xs">.com</span>
                        </h1>
                    </Link>
                </div>
                <div className="hidden lg:flex gap-2">
                    {Object.keys(NAVS).map((key) => (
                        <React.Fragment key={key}>
                            <div className="flex gap-2">
                                {NAVS[key].map((item: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className={`w-full border-b-2 hover:text-white hover:border-primary  ${
                                            currentActiveNav?.match ===
                                            item.path
                                                ? "text-white border-primary"
                                                : "text-muted-foreground border-card-light"
                                        }`}
                                    >
                                        <Link
                                            className="flex gap-2 p-1.5"
                                            href={item.path}
                                        >
                                            <span>{item.icon}</span>
                                            <p className="max-w-[200px] truncate translate-x-0 opacity-100">
                                                {item.title}
                                            </p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div>
                    <Button
                        onClick={() => router.push("/settings")}
                        size="icon"
                        variant="outline"
                        className="bg-background"
                        aria-label="Settings"
                    >
                        <Settings />
                    </Button>
                </div>
            </div>
        </header>
    );
}
