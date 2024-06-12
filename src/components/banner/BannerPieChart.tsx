import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent } from "@/components/ui/card";

Chart.register(ArcElement);
Chart.register(Tooltip);
Chart.register(Legend);

interface Props {
    total: number;
    star4: number;
    star5: number;
}

export default function BannerPieChart({ total, star4, star5 }: Props) {
    const star3 = total - star4 - star5;

    return (
        <Card>
            <CardContent className="h-full flex items-center justify-center py-5">
                <Pie
                    height={250}
                    width={250}
                    options={{
                        maintainAspectRatio: false,
                        elements: { arc: { borderWidth: 1, borderColor: "#f1f1f1" } },
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    color: "white",
                                },
                            },
                        },
                    }}
                    data={{
                        labels: ["Total 3*", "Total 4*", "Total 5*"],
                        datasets: [
                            {
                                data: [star3, star4, star5],
                                backgroundColor: [
                                    "rgba(6, 182, 212, .8)",
                                    "rgba(168, 85, 247, .8)",
                                    "rgba(234, 179, 8, .8)",
                                ],
                            },
                        ],
                    }}
                />
            </CardContent>
        </Card>
    );
}
