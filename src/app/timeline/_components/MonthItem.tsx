interface Props {
    width: number;
    left: number;
    name: string;
}
export default function MonthItem({ width, left, name }: Props) {
    return (
        <div
            className="absolute pr-4"
            style={{ width: width + "px", left: left + "px" }}
        >
            <span className="text-primary sticky left-0 bg-gradient-to-r from-transparent via-black px-4 font-bold text-neutral-100">
                {name}
            </span>
        </div>
    );
}
