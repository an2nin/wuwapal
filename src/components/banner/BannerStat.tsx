import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleArrowUp, Star } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
    total: number;
    star4_pity: number;
    star5_pity: number;
    guaranteed?: boolean;
}

export default function BannerStat({
    total,
    star4_pity,
    star5_pity,
    guaranteed,
}: Props) {
    return (
        <Card>
            <CardContent className="font-bold text-lg  h-full flex items-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center">
                        <div className="font-bold">Total</div>
                        <div>{total}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                            5 <Star className="w-3 h-3 fill-foreground" /> Pity
                        </div>
                        <div className="text-yellow-500 flex gap-1 items-center">
                            {star5_pity}
                            {guaranteed && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <CircleArrowUp />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div className="flex items-center gap-1">
                                                The next 5
                                                <Star className="w-3 h-3 fill-foreground" />
                                                is guaranteed to be the
                                                promotional character
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                            4 <Star className="w-3 h-3 fill-foreground" /> Pity
                        </div>
                        <div className="text-purple-500">{star4_pity}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
