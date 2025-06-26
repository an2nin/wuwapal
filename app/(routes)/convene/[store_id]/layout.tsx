"use client";
import { Button } from "@/shared/components/ui/button";
import { ChevronsLeft, Globe, Import } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import SyncBtn from "../_components/SyncBtn";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BANNERS } from "@/data/banners";
import ConveneNavigation from "../_components/ConveneNavigation";

export default function BannerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [current, setCurrent] = useState("");

    useEffect(() => {
        setCurrent(pathname.replace("/convene/", "").replace("_", " "));
    }, [pathname]);
    return (
        <>
            <div className="mb-10">
                <div className="flex flex-wrap-reverse gap-5 justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => router.push("/convene")}
                            variant="ghost"
                        >
                            <ChevronsLeft className="text-primary size-12 font-bold" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className="capitalize animate-pulse hover:animate-none lg:text-3xl text-2xl font-bold hover:border-b border-primary"
                                style={{
                                    background:
                                        "linear-gradient(to right, hsl(var(--primary)), #fff)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    color: "transparent",
                                }}
                            >
                                {current}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {Object.keys(BANNERS).map((banner, idx) => (
                                    <DropdownMenuItem
                                        key={idx}
                                        onClick={() =>
                                            router.push(`/convene/${banner}`)
                                        }
                                    >
                                        {BANNERS[banner].name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <ConveneNavigation />
                </div>
            </div>
            {children}
        </>
    );
}
