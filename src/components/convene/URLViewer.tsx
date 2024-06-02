import { Card, CardContent } from "@/components/ui/card";

interface Props {
    path: string;
}

export default function URLViewer({ path }: Props) {
    return (
        <>
            <Card className="md:max-w-xl sm:max-w-72 max-w-72 lg:max-w-2xl xl:max-w-full">
                <CardContent className="p-5">
                    <div className="w-full whitespace-nowrap overflow-auto text-xs pb-2">
                        {path}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
