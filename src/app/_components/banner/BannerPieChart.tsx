"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/app/_components/ui/chart";

const chartConfig = {
    total: {
        label: "Total",
    },
    star3: {
        label: "3 Star",
        color: "hsl(var(--quality-3))",
    },
    star4: {
        label: "4 Star",
        color: "hsl(var(--quality-4))",
    },
    star5: {
        label: "5 Star",
        color: "hsl(var(--quality-5))",
    },
} satisfies ChartConfig;

interface Props {
    total: number;
    star4: number;
    star5: number;
}

export function BannerPieChart({ total, star4, star5 }: Props) {
    const chartData = [
        {
            quality: "star3",
            value: total - (star4 + star5),
            fill: "var(--color-star3)",
            percentage: ((total - (star4 + star5)) / total * 100).toFixed(2),
        },
        { quality: "star4", value: star4, fill: "var(--color-star4)", percentage: (star4 / total * 100).toFixed(2)},
        { quality: "star5", value: star5, fill: "var(--color-star5)", percentage: (star5 /total * 100).toFixed(2)},
    ];

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-0">
                <CardTitle className="text-lg ">
                    Pull Pie by Rarity
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 py-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] "
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel percentage="percentage" />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="quality"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-lg font-bold"
                                                >
                                                    {total.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Pulls
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
