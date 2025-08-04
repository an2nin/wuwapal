import React from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';

interface Props {
  title: string | React.ReactNode;
  description: string;
  value: number | string | React.ReactNode;
}
export default function BannerStatCard({ title, description, value }: Props) {
  return (
    <Card className={`rounded-xl bg-card ${title === '' && 'border-none'}`}>
      <CardContent className="py-2 px-3 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="font-bold">{title}</div>
          <div className="text-muted-foreground text-xs">{description}</div>
        </div>
        <div className="font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
