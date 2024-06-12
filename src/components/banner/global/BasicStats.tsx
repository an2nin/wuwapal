import { Card, CardContent } from "@/components/ui/card";
import { calculatePercentage } from "@/helpers/processors";
import { Percent, Star } from "lucide-react";

interface Props {
    total: number;
    star4_total: number;
    star5_total: number;
    ff_won?: number;
    ff_lose?: number;
}

export default function BasicStats({
    total,
    star4_total,
    star5_total,
    ff_won,
    ff_lose,
}: Props) {
    
    return (
        <Card>
            <CardContent className="p-5 font-bold h-full flex flex-col justify-center">
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <div className="flex flex-col items-center">
                        <div className="font-bold">Total pulls</div>
                        <div>{total.toLocaleString()}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                            Total 5 <Star className="w-3 h-3 fill-foreground" />
                        </div>
                        <div className="text-yellow-400">{star5_total.toLocaleString()}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                            Total 4 <Star className="w-3 h-3 fill-foreground" />
                        </div>
                        <div className="text-purple-400">{star4_total.toLocaleString()}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-bold">Astrites Spent</div>
                        <div>{(total * 160).toLocaleString()}</div>
                    </div>
                    {ff_won && ff_lose && (
                        <div className="flex flex-col items-center">
                            <div className="font-bold">FF Winrate</div>
                            <div className="flex">
                                {calculatePercentage(ff_won, ff_won + ff_lose)}
                                <Percent className="w-4 mx-1" />
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
