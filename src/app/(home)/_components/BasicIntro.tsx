import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { FlipWords } from "@/app/_components/ui/flip-words";
import { SOCIAL_LINKS_OBJ } from "@/app/_constants/social-links";
import React from "react";

export default function BasicIntro() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-1">
                        <div className="text-2xl font-bold">
                            WuWaPal helps you track{" "}
                            <FlipWords
                                words={["pulls", "stats", "pity", "luck"]}
                                className="text-primary"
                            />{" "}
                            with style.
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="leading-7 text-sm text-muted-foreground">
                    This website is dedicated to enhancing
                    your experience in Wuthering Waves. Currently, we offer a
                    Convene (Pull) Tracker, global pull statistics and recently
                    added Collector&apos;s Hub. We have many more tools in the
                    pipeline that will be available soon. We highly value your
                    feedback, which you can provide via{" "}
                    <a
                        className="underline text-primary hover:text-primary/70"
                        href={SOCIAL_LINKS_OBJ["discord"].path}
                    >
                        Discord
                    </a>{" "}
                    &{" "}
                    <a
                        className="underline text-primary hover:text-primary/70"
                        href={SOCIAL_LINKS_OBJ["discord"].path}
                    >
                        Github Issue
                    </a>
                    .
                </p>
            </CardContent>
        </Card>
    );
}
