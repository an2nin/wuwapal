import EventItem from "./EventItem";
import { differenceInCalendarDays } from "date-fns";
import { useEffect, useState } from "react";

interface Props {
    timelineStartDate: string;
    timelineData: any;
}

export default function EventRow({ timelineStartDate, timelineData }: Props) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const generateEvents = () => {
            const eventList: any = [];
            const startDate = new Date(timelineStartDate);
            const topIncrement = 70;
            let currTop = 80;

            timelineData.banners.forEach((item: any, idx: number) => {
                const diffForLeft = differenceInCalendarDays(
                    new Date(item.startDate),
                    startDate
                );

                const diffForWidth = differenceInCalendarDays(
                    new Date(item.endDate),
                    new Date(item.startDate)
                );

                const processedEvent = {
                    info: { ...item },
                    left: diffForLeft * 40,
                    width: diffForWidth * 40,
                };
                if (idx % 2 === 0) {
                    eventList.push({
                        ...processedEvent,
                        top: currTop,
                    });
                } else {
                    eventList.push({
                        ...processedEvent,
                        top: currTop + topIncrement,
                    });
                }
            });

            currTop = currTop + topIncrement * 2;
            let highestTop = currTop;

            timelineData.activities.forEach((patches: any) => {
                const copyCurrTop = currTop;
                patches.forEach((item: any) => {
                    const diffForLeft = differenceInCalendarDays(
                        new Date(item.startDate),
                        startDate
                    );

                    const diffForWidth =
                        differenceInCalendarDays(
                            new Date(item.endDate),
                            new Date(item.startDate)
                        );

                    const processedEvent = {
                        info: { ...item },
                        left: diffForLeft * 40,
                        top: currTop,
                        width: diffForWidth * 40,
                    };

                    eventList.push({
                        ...processedEvent,
                    });
                    currTop = currTop + topIncrement;
                });
                if (currTop > highestTop) highestTop = currTop;
                currTop = copyCurrTop;
            });

            currTop = highestTop;

            timelineData.commons.forEach((patches: any) => {
                patches.forEach((item: any) => {
                    const diffForLeft = differenceInCalendarDays(
                        new Date(item.startDate),
                        startDate
                    );

                    const diffForWidth =
                        differenceInCalendarDays(
                            new Date(item.endDate),
                            new Date(item.startDate)
                        );

                    const processedEvent = {
                        info: { ...item },
                        left: diffForLeft * 40,
                        top: currTop,
                        width: diffForWidth * 40,
                    };

                    eventList.push({
                        ...processedEvent,
                    });
                });
                currTop = currTop + topIncrement;
            });

            return eventList;
        };

        setEvents(generateEvents());
    }, []);

    console.log(events);
    return (
        <>
            {events.map((event, idx) => (
                <EventItem key={idx} event={event} />
            ))}
        </>
    );
}
