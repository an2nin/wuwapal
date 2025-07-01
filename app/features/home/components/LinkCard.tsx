"use client";

import { Button } from "@/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/shared/components/ui/card";
import { useRouter } from "next/navigation";
interface Props {
    title: string;
    children: any;
    href: string;
    icon: any;
    isDisabled?: boolean;
}

export default function LinkCard({ title, children, href, icon, isDisabled = false }: Props) {
    const router = useRouter();

    return (
        <Card className="pt-6 h-full flex flex-col justify-between">
            <CardContent>
                <div className="flex justify-content items-center">
                    <div className="flex flex-col gap-3">
                        <div className="text-2xl font-bold">{title}</div>
                        <div className="text-muted-foreground">{children}</div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => router.push(href)} disabled={isDisabled}>
                    {icon}
                    {title}
                </Button>
                {isDisabled && <div className="ml-4 text-muted-foreground/60">Coming Soon</div>}
            </CardFooter>
        </Card>
    );
}
