import { Menu, CircleUser, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { navs } from "@/helpers/navs";
import { useRouter } from "next/router";
import BrandLogo from "./BrandLogo";

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
        <header className="flex flex-col bg-card sticky top-0 z-10 ">
            <div className="w-full text-center bg-black p-1 text-sm">
                This website is still under development. Send me a
                <a
                    href="mailto:wuwapal@gmail.com?subject=Bug Report&body=Hello, I have found a bug in WuWaPal. Please describe the bug and any relevant information."
                    className="text-primary font-bold  hover:text-primary/40 mx-1 underline"
                >
                    mail
                </a>
                to share your feedback!
            </div>
            <div className="container mx-auto p-3">
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
                                        className={`flex justify-start items-center gap-3 rounded-lg p-3 transition-all ${
                                            currentActiveNav === nav.href
                                                ? "bg-accent text-accent-foreground "
                                                : "text-muted-foreground hover:text-primary"
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
                    <div></div>
                </div>

                <div className="hidden md:block">
                    <div className="w-full flex items-center justify-between px-5">
                        {/* <Link href="/">
                            <span className="text-2xl text-primary font-bold">
                                {process.env.NEXT_PUBLIC_APP_NAME}
                            </span>
                        </Link> */}

                        <BrandLogo />

                        <div className="flex items-center gap-5 justify-center">
                            {navs.map((nav, idx) => (
                                <Link
                                    key={idx}
                                    href={nav.href}
                                    className={`flex justify-start items-center gap-3 rounded-lg p-3 transition-all ${
                                        currentActiveNav === nav.href
                                            ? "bg-accent text-accent-foreground "
                                            : "text-muted-foreground hover:text-primary"
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
                                disabled={true}
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
    );
}
