import { Card, CardContent } from "@/app/_components/ui/card";

interface Props {}
export default function FilePathCard({}) {
    return (
        <>
            <Card className="">
                <CardContent className="p-5">
                    <div className="w-full whitespace-nowrap overflow-auto text-xs pb-2">
                        <span className="font-bold text-red-500">
                            Install Folder
                        </span>
                        \Wuthering Waves
                        Game\Client\Saved\Logs\Client.log
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
