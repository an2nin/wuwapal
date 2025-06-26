import { useState, useEffect } from "react";
import MonthItem from "./MonthItem";
import { addMonths, subDays } from "date-fns";

interface Props {
    timelineStartDate: string;
    endDateDiff: number;
}

export default function MonthRow({ timelineStartDate, endDateDiff }: Props) {
    const [months, setMonths] = useState([]);

    useEffect(() => {
        const generateMonths = () => {
            let startDate = new Date(timelineStartDate);
            let endDate = subDays(addMonths(new Date(startDate), endDateDiff), 1);

            const months: any = [];
            const currentDate = new Date(startDate);
            const lastDate = new Date(endDate);
            let lastLeft = 0;

            while (currentDate <= lastDate) {
                const monthName = currentDate.toLocaleString("default", {
                    month: "long",
                });
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();

                // Calculate the number of days in the month
                const daysInMonth = new Date(year, month + 1, 0).getDate();

                // Check if the month is already in the array
                const existingMonth = months.find((m: any) => m.name === monthName);
                if (!existingMonth) {
                    months.push({
                        name: monthName,
                        width: daysInMonth * 60,
                        left: lastLeft,
                    });
                    lastLeft += daysInMonth * 60;
                }

                currentDate.setMonth(month + 1);
            }

            return months;
        };

        setMonths(generateMonths());
    }, []);

    return (
        <>
            {months.map((month: any, idx: number) => (
                <MonthItem
                    key={idx}
                    left={month.left}
                    width={month.width}
                    name={month.name}
                />
            ))}
        </>
    );
}
