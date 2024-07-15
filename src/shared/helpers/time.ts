export function convertToISOWithOffset(dateStr: string, offsetHours: number) {
    // Split the input string into date and time parts
    const [datePart, timePart] = dateStr.split(" ");

    // Combine the date and time parts and add the offset
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
    const SERVER_TIME_UTC_OFFSET = 8; // UTC+8
    return items.map((item) => ({
        ...item,
        startDate: convertToISOWithOffset(
            item.startDate,
            SERVER_TIME_UTC_OFFSET
        ),
        endDate: convertToISOWithOffset(item.endDate, SERVER_TIME_UTC_OFFSET),
    })) as T;
};
