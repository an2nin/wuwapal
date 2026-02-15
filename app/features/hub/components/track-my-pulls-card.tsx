import { ArrowUpRight, Gamepad2 } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export default function TrackMyPullsCard() {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 className="size-5" />
          Try TrackMyPulls
        </CardTitle>
        <CardDescription>
          Cross-game pull tracking built for WuWa players.
          {' '}
          Use it to keep your pity history organized and easy to review.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-xl border bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-4">
          <p className="text-sm font-semibold">Track pulls across WuWa and more games in one place.</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge>Wuthering Waves</Badge>
            <Badge variant="secondary">Endfield</Badge>
            <Badge variant="outline">More Soon</Badge>
          </div>
        </div>

        <div className="rounded-xl border bg-muted/20 p-4">
          <p className="text-sm font-semibold">Move your WuWaPal data in 2 steps:</p>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
            <li>
              Export your backup file from
              {' '}
              <a
                className="underline text-primary hover:text-primary/70 font-semibold"
                href="https://wuwapal.com/settings"
                target="_blank"
                rel="noopener"
              >
                WuWaPal Settings
              </a>
              .
            </li>
            <li>
              Import it on
              {' '}
              <a
                className="underline text-primary hover:text-primary/70 font-semibold"
                href="https://trackmypulls.com/en/wuwa/tracker/import?platform=websites"
                target="_blank"
                rel="noopener"
              >
                TrackMyPulls Import
              </a>
              .
            </li>
          </ol>
        </div>
        <p className="text-sm text-muted-foreground">
          Your existing backup file from WuWaPal is the fastest way to continue tracking without starting over.
        </p>
      </CardContent>
      <CardFooter>
        <a
          className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
          href="https://trackmypulls.com"
          target="_blank"
          rel="noopener"
        >
          Open TrackMyPulls.com
          <ArrowUpRight className="size-4" />
        </a>
      </CardFooter>
    </Card>
  );
}
