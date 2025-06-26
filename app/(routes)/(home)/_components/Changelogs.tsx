import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import React from "react";
import ChangelogItem from "@/(routes)/(home)/_components/ChangelogItem";
import { CHANGELOGS } from "@/shared/constants/changelogs";

export default function Changelogs() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Site Updates</CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
                <ScrollArea className="h-44 rounded-md">
                    <div className="flex flex-col gap-2">
                    {CHANGELOGS.map((changelog, idx) => (
                        <ChangelogItem
                            key={idx}
                            date={changelog.date}
                            changes={changelog.changes}
                        />
                    ))}
                    </div>
                    <ScrollBar />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
