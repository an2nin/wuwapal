import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area';
import { CHANGELOGS } from '@/shared/constants/changelogs';
import ChangelogItem from './changelogs-item';

export default function Changelogs() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Changelogs</CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <ScrollArea className="h-44 rounded-md">
          <div className="flex flex-col gap-2">
            {CHANGELOGS.map((changelog, idx) => (
              <ChangelogItem
                key={idx}
                date={changelog.date}
                changes={changelog.changes}
              />
            ))}
          </div>
          <ScrollBar />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
