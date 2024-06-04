import { Badge } from "@/components/ui/badge";

interface Props {
    children?: React.ReactNode;
    title: string;
    index: number;
    last?: boolean;
}
export default function CustomListItem({
    children,
    title,
    index,
    last = false,
}: Props) {
    return (
        <li className={`ms-8  ${last ? "" : "mb-10"}`}>
            <span className="absolute -start-4 bg-accent rounded-full w-8 h-8 p-3 flex justify-center items-center">
                <p className="font-bold text-accent-foreground">{index}</p>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-foreground">
                {title}
            </h3>

            <div className={`${last ? "" : "mb-4 mt-2"}`}>{children}</div>
        </li>
    );
}
