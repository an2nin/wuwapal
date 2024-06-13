import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    star: number;
    avg_pity: number;
}
export default function AvgPity({ avg_pity, star }: Props) {
    return (
        <Card>
            <CardContent className="p-4 flex flex-col items-center gap-2 font-bold text-lg">
                {star == 5 ? (
                    <div className="flex items-center gap-1 text-yellow-400 ">
                        Avg 5 <Star className="w-4 h-4 fill-yellow-400" /> Pity
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-purple-400">
                        Avg 4 <Star className="w-4 h-4 fill-purple-400" /> Pity
                    </div>
                )}
                <div>{avg_pity}</div>
            </CardContent>
        </Card>
    );
}
