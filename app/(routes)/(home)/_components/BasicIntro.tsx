import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { FlipWords } from "@/shared/components/ui/flip-words";
import { SOCIAL_LINKS_OBJ } from "@/shared/constants/social-links";
import React from "react";

export default function BasicIntro() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    Hey fellow <span className="text-primary">Rover!</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="leading-7 text-sm text-muted-foreground">
                    Welcome to Wuwapal—your go-to site for all things Wuthering
                    Waves. Right now, you can track your pulls with our Convene
                    Tracker, check out global pull stats, and dive into the new
                    Collector&apos;s Hub. And guess what? We&apos;re just
                    getting started—more awesome tools are on the way!
                    {/* &{" "}
                    <a
                        className="underline text-primary hover:text-primary/70"
                        href={SOCIAL_LINKS_OBJ["github"].path}
                        target="_blank"
                    >
                        Github Issue
                    </a> */}
                </p>
                <p className="mt-1">
                    Got ideas or feedback? Hit us up on{" "}
                    <a
                        className="underline text-primary hover:text-primary font-bold"
                        href={SOCIAL_LINKS_OBJ["discord"].path}
                        target="_blank"
                    >
                        Discord
                    </a>{" "}
                    —we&apos;d love to hear from you!
                </p>
            </CardContent>
        </Card>
    );
}
