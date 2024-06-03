import {
    Menu,
    Package2,
    Home,
    ShoppingCart,
    Package,
    Users,
    LineChart,
    CircleUser,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { navs } from "@/helpers/navs";
import { useRouter } from "next/router";

export default function HeaderNew() {
    const router = useRouter();
    const [currentActiveNav, setCurrentActiveNav] = useState("/");

    useEffect(() => {
        const activeNavItem = navs.findLast((nav) =>
            router.pathname.startsWith(nav.href)
        );
        setCurrentActiveNav(activeNavItem?.href ?? "/");
    }, [router]);

    return (
        <header className="flex flex-col bg-card">
            <div className="w-full text-center bg-black p-1 text-sm">
                This website is still under development. Join our Discord
                community to share your feedback!
            </div>
            <div className="container mx-auto p-2">
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
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <Home className="h-5 w-5" />
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Orders
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    6
                                </Badge>
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <Package className="h-5 w-5" />
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <Users className="h-5 w-5" />
                                Customers
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <LineChart className="h-5 w-5" />
                                Analytics
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="hidden md:block">
                    <div className="w-full flex items-center justify-between px-5">
                        <div className="text-2xl text-primary font-bold">WuWaPal</div>
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
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                                disabled={true}
                            >
                                <CircleUser className="h-5 w-5" />
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
