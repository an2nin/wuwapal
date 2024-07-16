import { Card, CardContent } from "@/app/_components/ui/card";
import { Star } from "lucide-react";

interface Props {
    star: number;
    avg_pity: number;
}
export default function AvgPity({ avg_pity, star }: Props) {
    return (
        <Card className="h-full flex flex-col items-center justify-center">
            <CardContent className="pt-6 flex flex-col items-center gap-2 font-bold lg:text-lg text-sm">
                {star == 5 ? (
                    <div className="flex items-center gap-1 text-quality-5">
                        Avg 5 ✦ Pity
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-quality-4">
                        Avg 4 ✦ Pity
                    </div>
                )}
                <div>{avg_pity}</div>
            </CardContent>
        </Card>
    );
}
