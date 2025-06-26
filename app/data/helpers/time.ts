export function convertToISOWithOffset(dateStr: string, offsetHours: number) {
    const [datePart, timePart] = dateStr.split(" ");

    const isoDateStr = `${datePart}T${timePart}:00+${String(
        offsetHours
    ).padStart(2, "0")}:00`;

    return isoDateStr;
}

export const convertDatesToServerTime = <
    T extends { startDate: string; endDate: string }[]
>(
    items: T
): T => {
    const SERVER_TIME_UTC_OFFSET = 8; 
    return items.map((item) => ({
        ...item,
        startDate: convertToISOWithOffset(
            item.startDate,
            SERVER_TIME_UTC_OFFSET
        ),
        endDate: convertToISOWithOffset(item.endDate, SERVER_TIME_UTC_OFFSET),
    })) as T;
};
