"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Discord } from "@/shared/components/ui/custom-icons";
import MovingBorder from "@/shared/components/ui/moving-border";
import { SOCIAL_LINKS_OBJ } from "@/shared/constants/social-links";

export default function SocialLinks() {
    return (
        <Card className="h-full flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Join Our Community on Discord!</CardTitle>
                <CardDescription>
                    Connect with fellow Rovers, share strategies, and stay
                    updated on WuWaPal&apos;s latest tools and events.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex gap-5 mt-3">
                    <a href={SOCIAL_LINKS_OBJ.discord.path} target="_blank">
                        <MovingBorder isHoverable>
                            <div className="flex items-center gap-3 px-2 min-w-32 justify-center group animate-pulse duration-3000 group-hover:animate-none">
                                <span className="text-foreground transition-all">
                                    <Discord />
                                </span>
                                Join Us
                            </div>
                        </MovingBorder>
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}
