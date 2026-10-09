import Link from 'next/link';
import MovingBorder from '@/shared/components/moving-border';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { EMOTE_IMAGE_PATH } from '@/shared/constants/game/paths';

export default function NoPullFound() {
  return (
    <Card className="border-dashed">
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center text-center sm:text-left">
          <img
            src={`${EMOTE_IMAGE_PATH}/no-pull-data.webp`}
            alt=""
            aria-hidden="true"
            className="size-24 sm:size-32"
          />
          <div className="flex flex-col items-center sm:items-start gap-3">
            <div>
              <h2 className="font-bold text-xl">No pulls imported yet</h2>
              <p className="text-sm text-muted-foreground">
                Import your convene history to see pity, luck stats and recent pulls.
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/convene/import">
                <MovingBorder hoverable>
                  <div className="flex items-center gap-2 px-2">
                    Import Pull History
                  </div>
                </MovingBorder>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
