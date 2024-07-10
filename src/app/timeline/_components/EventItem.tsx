import { differenceInDays, format, parseISO } from "date-fns";

interface Props {
    event: any;
}

export default function EventItem({ event }: Props) {
    const totalHoursDifference = differenceInDays(
        parseISO(event.info.endDate),
        parseISO(event.info.startDate)
    );
    const days = Math.floor(totalHoursDifference / 24);
    const hours = totalHoursDifference % 24;

    return (
        <div
            className="absolute z-10 flex cursor-pointer shadow items-center rounded-l-xl rounded-r-xl"
            style={{
                left: event.left + "px",
                top: event.top + "px",
                width: event.width + "px",
            }}
        >
            <div className="h-16 w-full bg-background border rounded-2xl flex items-center justify-between px-2 relative overflow-clip">
                <div className="sticky -left-3 px-2 truncate flex flex-col gap-1 text-sm font-medium drop-shadow-lg text-white">
                    <div>{event.info?.name}</div>
                    <div className="flex gap-1 text-xs text-accent">
                        {format(
                            parseISO(event.info?.startDate),
                            "MMMM dd, h:mm a"
                        )}
                        <div>-</div>
                        {format(
                            parseISO(event.info?.endDate),
                            "MMMM dd, h:mm a"
                        )}
                        <div>
                            {days}d {hours}h
                        </div>
                    </div>
                </div>
                <img
                    alt="When Thunder Pours - Yinlin Banner"
                    loading="lazy"
                    width="1440"
                    height="520"
                    decoding="async"
                    className="absolute opacity-100 right-0 max-w-[150px]"
                    src={event.info?.img}
                    style={{
                        color: "transparent",
                        maskImage:
                            "linear-gradient(to left, rgb(0, 0, 0) 10%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 50%)",
                    }}
                />
            </div>
        </div>
    );
}
