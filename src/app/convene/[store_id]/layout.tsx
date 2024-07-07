"use client";
import { Button } from "@/app/_components/ui/button";
import { ChevronsLeft, Import } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import SyncBtn from "../_components/SyncBtn";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BANNERS } from "@/shared/banners";

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
                <div className="flex flex-wrap-reverse gap-5 justify-between items-center lg:mt-10">
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => router.push("/convene")}
                            variant="ghost"
                        >
                            <ChevronsLeft className="text-accent size-12 font-bold" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className="capitalize lg:text-3xl text-2xl font-bold border-b border-accent hover:opacity-70"
                                style={{
                                    background:
                                        "linear-gradient(to right, hsl(var(--accent)), #fff)",
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
                                    <DropdownMenuItem key={idx} onClick={() => router.push(`/convene/${banner}`)}>
                                        {BANNERS[banner].name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                        <div className="flex gap-5 lg:justify-end justify-center">
                            <Button
                                onClick={() => router.push("/import")}
                                className="flex gap-2 items-center text-primary border-2 border-primary bg-background rounded-full px-3 py-2 hover:bg-primary hover:text-primary-foreground"
                            >
                                <Import className="size-6" /> Import History
                            </Button>
                            <div>
                                <SyncBtn />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </>
    );
}
