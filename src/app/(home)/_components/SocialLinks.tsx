"use client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { SOCIAL_LINKS } from "@/app/_constants/social-links";

export default function SocialLinks() {
    return (
        <Card className="h-full flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Social Links</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex gap-3">
                    {SOCIAL_LINKS.map(({ path, icon_big, srOnly }, idx) => (
                        <a
                            key={idx}
                            className="text-foreground/60 dark:text-foreground/30 dark:hover:text-foreground hover:text-foreground transition-all"
                            target="_blank"
                            href={path}
                        >
                            {icon_big}
                            <span className="sr-only">{srOnly}</span>
                        </a>
                    ))}
                </div>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
}
