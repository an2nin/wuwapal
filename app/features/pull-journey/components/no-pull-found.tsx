'use client';
import { useRouter } from 'next/navigation';
import MovingBorder from '@/shared/components/moving-border';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { EMOTE_IMAGE_PATH } from '@/shared/constants/game/paths';

export default function NoPullFound() {
  const router = useRouter();

  return (
    <div className="overlay-no-pull-found">
      <Card>
        <CardContent>
          <div className="flex gap-5 items-center">
            <div>
              <img
                src={`${EMOTE_IMAGE_PATH}/no-pull-data.webp`}
                alt="no pull found"
                className="size-32"
              />
            </div>
            <div className="flex flex-col items-center gap-5">
              <div className="font-bold text-xl">No pulls imported.</div>
              <div>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/pull-tracker/import')}
                >
                  <MovingBorder hoverable>
                    <div className="flex items-center gap-2 px-2">
                      Import Pull History
                    </div>
                  </MovingBorder>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
