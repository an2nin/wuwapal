import React, { useEffect, useRef, useState } from "react";
import DayRow from "./DayRow";
import MonthRow from "./MonthRow";
import EventRow from "./EventRow";
import { differenceInDays } from "date-fns";

interface Props {
    timelineStartDate: string;
    endDateDiff: number;
    events: any;
}

export default function TimelineViewer({
    timelineStartDate,
    endDateDiff,
    events,
}: Props) {
    const scrollContainerRef = useRef<any>(null);
    const [currentDateRowPos, setCurrentDateRowPos] = useState<any>(null);

    const scrollToPosition = (position: any) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                left: position,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const pos =
            differenceInDays(new Date(), new Date(timelineStartDate)) * 60;
        setCurrentDateRowPos(pos);
    }, []);

    useEffect(() => {
        if (currentDateRowPos) {
            scrollToPosition(currentDateRowPos - 400);
        }
    }, [currentDateRowPos]);

    return (
       
                <div
                    ref={scrollContainerRef}
                    className="scrollbar scrollbar-thumb-rounded-lg scrollbar-thumb-neutral-800 scrollbar-track-subitem scrollbar-h-2 h-[58rem] w-full overflow-x-auto overflow-y-hidden overscroll-none pl-5 "
                >
                    <div className="timeline h-full content relative flex w-max flex-col">
                        <DayRow
                            timelineStartDate={timelineStartDate}
                            endDateDiff={endDateDiff}
                        />
                        <MonthRow
                            timelineStartDate={timelineStartDate}
                            endDateDiff={endDateDiff}
                        />
                        <EventRow
                            timelineStartDate={timelineStartDate}
                            timelineData={events}
                        />

                        <div
                            className="absolute z-20 mt-16 h-full w-0.5 bg-primary opacity-75"
                            style={{ left: currentDateRowPos + "px" }}
                        ></div>
                    </div>
                </div>
          
    );
}
