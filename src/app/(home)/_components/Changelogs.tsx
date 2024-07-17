import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea, ScrollBar } from "@/app/_components/ui/scroll-area";
import React from "react";
import ChangelogItem from "@/app/(home)/_components/ChangelogItem";
import { CHANGELOGS } from "@/app/_constants/changelogs";

export default function Changelogs() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Site Updates</CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
                <ScrollArea className="max-h-36 rounded-md">
                    <div className="flex flex-col gap-2">
                    {CHANGELOGS.map((changelog, idx) => (
                        <ChangelogItem
                            key={idx}
                            date={changelog.date}
                            description={changelog.description}
                        />
                    ))}
                    </div>
                    <ScrollBar />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
