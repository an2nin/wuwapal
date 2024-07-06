"use client";
import BannerCarousel from "@/app/_components/banner/BannerCarousel";
import { Button } from "@/app/_components/ui/button";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next-nprogress-bar";

export default function BannerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    return (
        <div>
            <div className="mb-10">
                <Button onClick={() => router.push("/convene")}>
                    <ChevronsLeft className="size-5" />
                    Back To Overview
                </Button>
            </div>
            {children}
        </div>
    );
}
