import { Badge } from "@/components/ui/badge";

interface Props {
    children?: React.ReactNode;
    title: string;
    index: number;
}
export default function CustomListItem({ children, title, index }: Props) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-3">
                <Badge className="p-3">
                    {index}
                </Badge>
                <h1 className="text-xl font break-all">{title}</h1>
            </div>
            <div className="ml-14 mt-2">{children}</div>
        </div>
    );
}
