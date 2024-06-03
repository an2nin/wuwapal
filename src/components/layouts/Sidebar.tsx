import Link from "next/link";
import { navs } from "@/helpers/navs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Sidebar() {
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
            <div className="hidden border-r bg-card md:block w">
                <div className="flex h-full max-h-screen flex-col">
                    <div className="flex justify-center h-14 items-center px-4 lg:h-[60px] lg:px-6 mt-4 mb-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold"
                        >
                            <span className="text-2xl">
                                {process.env.NEXT_PUBLIC_APP_NAME}
                            </span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 font-medium lg:px-4 gap-3">
                            {navs.map((nav, idx) => (
                                <Link
                                    key={idx}
                                    href={nav.href}
                                    className={`flex justify-start items-center gap-3 rounded-lg p-3 transition-all hover:text-primary ${
                                        currentActiveNav === nav.href
                                            ? "bg-accent text-accent-foreground text-white"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    {nav.icon}
                                    {nav.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
