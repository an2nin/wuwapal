import { Card, CardContent } from "@/app/_components/ui/card";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

interface Props {
    percentile: number;
    betterThanAverage: boolean;
    quality: number;
}
export default function LuckStatCard({
    percentile,
    betterThanAverage,
    quality,
}: Props) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col gap-1">
                    <div className="text-sm text-muted-foreground">
                        {quality}✦ Luck
                    </div>
                    <div
                        className={`flex gap-1 items-center text-xl font-bold ${
                            quality == 5 ? "text-quality-5" : "text-quality-4"
                        }`}
                    >
                        {betterThanAverage ? (
                            <>
                                <div>Top</div>
                                <ArrowUpNarrowWide className="size-5" />
                            </>
                        ) : (
                            <>
                                <div>Bottom</div>
                                <ArrowDownWideNarrow className="size-5" />
                            </>
                        )}
                    </div>
                    <div
                        className={`text-xl font-bold ${
                            quality == 5 ? "text-quality-5" : "text-quality-4"
                        }`}
                    >
                        {percentile}%
                    </div>
                    <div className="text-xs">
                        {betterThanAverage ? "Luckier" : "Unluckier"} than{" "}
                        {100 - percentile}% of rovers
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
