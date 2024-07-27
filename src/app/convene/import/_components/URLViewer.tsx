import { Card, CardContent } from "@/app/_components/ui/card";

interface Props {
    path: string;
}

export default function URLViewer({ path }: Props) {
    return (
        <>
            <Card>
                <CardContent className="p-5">
                    <div className="w-full whitespace-nowrap overflow-auto text-xs pb-2">
                        {path}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
