import type { DataPoint } from '@/shared/components/chart/pie-chart';
import PieChart from '@/shared/components/chart/pie-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface Props {
  total: number;
  star4: number;
  star5: number;
}

export function BannerPieChart({ total, star4, star5 }: Props) {
  const data: DataPoint[] = [
    {
      label: '5 Star',
      value: star5,
      color: '#10B981',
      hoverColor: '#059669',
    },
    {
      label: '4 Star',
      value: star4,
      color: '#3B82F6',
      hoverColor: '#2563EB',
    },
    {
      label: '3 Star',
      value: total - star4 - star5,
      color: '#F59E0B',
      hoverColor: '#D97706',
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg ">Pull Pie by Rarity</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 py-0">
        <PieChart data={data} />
      </CardContent>
    </Card>
  );
}
