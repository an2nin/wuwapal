"use client";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { SOCIAL_LINKS } from "@/app/_constants/social-links";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function SocialLinks() {
    return (
        <Card className="h-full flex flex-col items-center justify-center">
            <VisuallyHidden.Root>
                <CardHeader>
                    <CardTitle>Connect With Us</CardTitle>
                </CardHeader>
            </VisuallyHidden.Root>

            <CardContent className="px-6 py-2">
                <div className="flex lg:flex-col gap-3">
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
        </Card>
    );
}
