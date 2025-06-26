interface Props{
    leftValue: number;
    date: any;
}
export default function DayItem({ leftValue, date }: Props) {
    return (
        <div
            className="absolute top-16 h-full w-0.5 bg-white/30"
            style={{left: leftValue + "px"}}
        >
            <span className="-top-8 -left-2 absolute w-4 pb-1 text-center text-neutral-200">
                {date.day}
            </span>
            <span className="-top-16 -left-2 absolute w-4 pb-1 text-center text-neutral-600">
            {date.dayOfWeek}
            </span>
        </div>
    );
}
