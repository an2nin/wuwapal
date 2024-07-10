import { useEffect, useState } from "react";
import DayItem from "./DayItem";
import { addMonths, subDays } from "date-fns";

interface Props {
    timelineStartDate: string;
    endDateDiff: number;
}

export default function DayRow({ timelineStartDate, endDateDiff }: Props) {
    const [dates, setDates] = useState<any>([]);

    useEffect(() => {
        const generateDates = () => {
            const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
            const dateList = [];
            let startDate = new Date(timelineStartDate);
            let endDate = subDays(
                addMonths(new Date(startDate), endDateDiff),
                1
            );

            while (startDate <= endDate) {
                let day = startDate.getDate();
                let dayOfWeek = dayNames[startDate.getDay()];
                dateList.push({ day, dayOfWeek });
                startDate.setDate(startDate.getDate() + 1);
            }

            return dateList;
        };

        setDates(generateDates());
    }, []);

    return (
        <>
            {dates.map((date: any, idx: number) => (
                <DayItem
                    key={`${idx}-${idx}`}
                    leftValue={idx * 40}
                    date={date}
                />
            ))}
        </>
    );
}
