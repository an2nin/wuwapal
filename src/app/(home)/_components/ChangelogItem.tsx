import { format } from "date-fns";
import { Dot } from "lucide-react";

interface Props {
    date: string;
    changes: string[];
}
export default function ChangelogItem({ date, changes }: Props) {
    return (
        <div className="w-full flex flex-col  gap-2 text-xs">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground flex-none self-start">
                {format(new Date(date), "MM.dd")}
            </div>
            <ul>
                {changes.map((change, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-1.5 text-sm "
                    >
                       <Dot/> {change}
                    </li>
                ))}
            </ul>
        </div>
    );
}
