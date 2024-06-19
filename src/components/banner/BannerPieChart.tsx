// import { Pie } from "react-chartjs-2";
// import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

// Chart.register(ArcElement);
// Chart.register(Tooltip);
// Chart.register(Legend);

import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

const RADIAN = Math.PI / 180;
const renderActiveShape = (props: any) => {
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * -30}
                y={ey}
                dy={0}
                textAnchor={textAnchor}
                fill={fill}
                className="text-xs font-bold "
            >
                {`${value} pulls`}
            </text>
        </g>
    );
};

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            className="font-bold"
            fontSize={9}
        >
            {value != 0 && `${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const COLORS = [
    "rgba(6, 182, 212, .8)",
    "rgba(168, 85, 247, .8)",
    "rgba(234, 179, 8, .8)",
];

interface Props {
    total: number;
    star4: number;
    star5: number;
}

export default function BannerPieChart({ total, star4, star5 }: Props) {
    const star3 = total - star4 - star5;
    const [activeIndex, setActiveIndex] = useState(0);

    const data = [
        { name: "Star 3", value: star3 },
        { name: "Star 4", value: star4 },
        { name: "Star 5", value: star5 },
    ];

    const onPieEnter = (_: any, index: any) => {
        setActiveIndex(index);
    };
    return (
        <Card>
            <CardContent className="h-full flex items-center justify-center p-0">
                    <PieChart width={350} height={270} >
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={renderCustomizedLabel}
                            labelLine={false}
                            onMouseEnter={onPieEnter}
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
            </CardContent>
        </Card>
    );
}
