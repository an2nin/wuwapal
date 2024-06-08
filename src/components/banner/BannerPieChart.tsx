import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Card, CardContent } from "@/components/ui/card";

Chart.register(ArcElement);
Chart.register(Tooltip);

interface Props {
    star3: number;
    star4: number;
    star5: number;
}

export default function BannerPieChart({ star3, star4, star5 }: Props) {
    return (
        <Card>
            <CardContent className="h-full flex items-center justify-center py-0">
                <Pie
                    height={250}
                    width={250}
                    options={{ maintainAspectRatio: false, elements: {arc: {borderWidth: 0}}, }}
                    data={{
                        labels: ["Total 3*", "Total 5*", "Total 4*"],
                        datasets: [
                            {
                                data: [star3, star5, star4],
                                backgroundColor: [
                                    "rgba(6, 182, 212, .8)",
                                    "rgba(234, 179, 8, .8)",
                                    "rgba(168, 85, 247, .8)",
                                ],
                            },
                        ],
                    }}
                />
            </CardContent>
        </Card>
    );
}
