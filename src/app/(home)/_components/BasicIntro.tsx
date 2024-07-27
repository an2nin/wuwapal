import {
    Card,
    CardContent,
    CardDescription,
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
                    Hey fellow <span className="text-primary">Rover</span>, 
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
                        className="underline text-primary hover:text-primary font-bold"
                        href={SOCIAL_LINKS_OBJ["discord"].path}
                        target="_blank"
                    >
                        Discord
                    </a>{" "}
                    {/* &{" "}
                    <a
                        className="underline text-primary hover:text-primary/70"
                        href={SOCIAL_LINKS_OBJ["github"].path}
                        target="_blank"
                    >
                        Github Issue
                    </a> */}
                    .
                </p>
            </CardContent>
        </Card>
    );
}
