import { Card, CardContent } from "@/shared/components/ui/card";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

interface Props {
    percentile: number;
    isTop: boolean;
    comparisonPercent: number;
    quality: number;
}
export default function LuckStatCard({
    percentile,
    isTop,
    quality,
    comparisonPercent
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
                        {isTop ? (
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
                        {isTop ? "Luckier" : "Unluckier"} than{" "}
                        {comparisonPercent}% of rovers
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
