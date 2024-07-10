"use client";
import TimelineViewer from "./_components/TimelineViewer";
import EVENT_DATA from "@/shared/timeline/index";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
export default function Timeline() {
    const startDate = "2024-05-1";

    return (
        <Card className="bg-pattern-stripped">
            <CardHeader>
                <CardTitle>WuWa Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <TimelineViewer
                    timelineStartDate={startDate}
                    endDateDiff={4}
                    events={EVENT_DATA}
                />
            </CardContent>
        </Card>
    );
}
