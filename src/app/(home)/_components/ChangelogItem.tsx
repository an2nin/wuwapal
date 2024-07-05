import { format } from "date-fns";

interface Props {
    date: string;
    description: string;
}
export default function ChangelogItem({ date, description }: Props) {
    return (
        <div className="w-full flex items-center gap-2 text-xs">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-accent text-accent-foreground flex-none self-start">
                {format(new Date(date), "MM.dd")}
            </div>{" "}
            {description}
        </div>
    );
}
