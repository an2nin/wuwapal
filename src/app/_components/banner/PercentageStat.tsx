import { calculatePercentage } from "@/app/_helpers/processors";
import { Percent } from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";

interface Props {
    ff_won?: number;
    ff_lose?: number;
}

export default function PercentageStat({ ff_won, ff_lose }: Props) {
    return (
        <Card className="h-full flex flex-col justify-center items-center">
            <CardContent className="pt-6">
                {ff_won && ff_lose ? (
                    <div className="flex flex-col gap-1 items-center">
                        <div className="font-bold text-xl">FF Winrate</div>
                        <div className="flex">
                            {calculatePercentage(ff_won, ff_won + ff_lose)}
                            <Percent className="w-4 mx-1" />( {ff_won}W
                            {ff_lose ? ` / ${ff_lose}` : 0}L )
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="font-bold">
                            Can not lose Fifty-Fifty Here
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
