"use client";
import TimelineViewer from "./_components/TimelineViewer";
import EVENT_DATA from "@/data/timeline/index";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import PageHeader from "@/shared/components/layout/PageHeader";
import MovingBorder from "@/shared/components/ui/moving-border";
import DailyResetTimer from "@/shared/components/timers/DailyResetTimer";
import WeeklyResetTimer from "@/shared/components/timers/WeeklyResetTimer";
import { Info } from "lucide-react";
export default function Timeline() {
    const startDate = "2024-12-01";

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-wrap justify-between gap-5">
                <PageHeader title="WuWa Timeline" />
                <div className="flex flex-wrap justify-center lg:justify-end gap-5">
                    <MovingBorder>
                        <DailyResetTimer />
                    </MovingBorder>
                    <MovingBorder>
                        <WeeklyResetTimer />
                    </MovingBorder>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-6">
                    <CardTitle className="text-lg flex flex-row items-center gap-2">
                        <Info className="size-6 text-primary" /> Times are shown in your
                        local time
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-pattern-stripped rounded-xl">
                    <TimelineViewer
                        timelineStartDate={startDate}
                        endDateDiff={8}
                        events={EVENT_DATA}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
