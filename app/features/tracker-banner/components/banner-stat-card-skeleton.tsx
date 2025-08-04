import { Card, CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

export default function BannerStatsItemSkeleton() {
  return (
    <Card className="rounded-xl">
      <CardContent className="py-2 px-3 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-[150px]" />
          <div className="text-muted-foreground text-xs">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="font-bold">
          <Skeleton className="h-6 w-[50px]" />
        </div>
      </CardContent>
    </Card>
  );
}
