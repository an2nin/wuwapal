import { Menu, CircleUser, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { navs } from "@/helpers/navs";
import { useRouter } from "next/router";
import BrandLogo from "./BrandLogo";
import Announcement from "./Announcement";

export default function Header() {
    const router = useRouter();
    const [currentActiveNav, setCurrentActiveNav] = useState("/");

    useEffect(() => {
        const activeNavItem = navs.findLast((nav) =>
            router.pathname.startsWith(nav.href)
        );
        setCurrentActiveNav(activeNavItem?.href ?? "/");
    }, [router]);

    return (
        <>
            <Announcement />
            <header className="flex flex-col container z-10 px-0 md:px-4">
                <div className="w-full bg-theme-glassy p-3 rounded-2xl">
                    <div className="flex justify-between items-center">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">
                                        Toggle navigation menu
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <nav className="grid gap-2 text-lg font-medium">
                                    <Link href="/">
                                        <span className="text-2xl text-primary font-bold">
                                            {process.env.NEXT_PUBLIC_APP_NAME}
                                        </span>
                                    </Link>

                                    {navs.map((nav, idx) => (
                                        <Link
                                            key={idx}
                                            href={nav.href}
                                            className={`flex justify-start items-center gap-3 rounded-3xl p-3 transition-all ${
                                                currentActiveNav === nav.href
                                                    ? "bg-primary hover:bg-primary/90 text-accent-foreground "
                                                    : "text-primary opacity-50 hover:opacity-100"
                                            }`}
                                        >
                                            {nav.icon}
                                            {nav.title}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <div className="md:hidden">
                            <BrandLogo />
                        </div>
                        <div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="md:hidden"
                                onClick={() => router.push("/settings")}
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="w-full flex items-center justify-between px-5">
                            <BrandLogo />

                            <div className="flex items-center justify-center">
                                {navs.map((nav, idx) => (
                                    <Link
                                        key={idx}
                                        href={nav.href}
                                        className={`flex justify-start items-center gap-2 rounded-3xl p-3 transition-all ${
                                            currentActiveNav === nav.href
                                                ? "bg-primary hover:bg-primary/90 text-accent-foreground "
                                                : "text-primary opacity-50 hover:opacity-100"
                                        }`}
                                    >
                                        {nav.icon}
                                        {nav.title}
                                    </Link>
                                ))}
                            </div>
                            <div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => router.push("/settings")}
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">
                                        Toggle user menu
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
