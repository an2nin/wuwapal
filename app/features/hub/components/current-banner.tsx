'use client';

import ResourceAvatar from '@/shared/components/resource-avatar';
import CountdownTimer from '@/shared/components/timers/countdown-timer';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { IMAGE_PATH } from '@/shared/constants/game/paths';
import { convertToISOWithOffset } from '@/shared/utils';

const items = {
  s5: [
    { name: 'mornye', rarity: 5, type: 'resonators' },
    { name: 'augusta', rarity: 5, type: 'resonators' },
    { name: 'iuno', rarity: 5, type: 'resonators' },
    { name: 'starfield-calibrator', rarity: 5, type: 'weapons' },
    { name: 'thunderflare-dominion', rarity: 5, type: 'weapons' },
    { name: 'moongazers-sigil', rarity: 5, type: 'weapons' },
  ],
  s4: ['chixia', 'sanhua', 'danjin'],
  img: `${IMAGE_PATH}/banners/showcase.webp`,
  end_time: '2026-02-04 11:59',
};

export default function CurrentBanner() {
  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle>Ongoing Banner</CardTitle>
      </CardHeader>
      <CardContent className="min-h-44">
        <div className="rounded-2xl relative">
          <img
            src={items.img}
            className="min-h-44 rounded-2xl"
            alt="current banner"
          />
          <div className="absolute bottom-0 left-0 h-full w-full">
            <div className="flex gap-5 h-full items-center ml-4">
              <div className="grid grid-cols-3 justify-center gap-3">
                {items.s5.map((item, idx) => (
                  <ResourceAvatar
                    key={idx}
                    item={{
                      name: item.name,
                      quality: 5,
                      type: item.type as 'resonators' | 'weapons',
                    }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 justify-center items-center gap-3">
                {items.s4.map((item, idx) => (
                  <ResourceAvatar
                    key={idx}
                    className=""
                    item={{
                      name: item,
                      quality: 4,
                      type: 'resonators',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex h-full gap-2 font-bold text-primary">
          <CountdownTimer
            startingText="Ends in "
            targetDate={convertToISOWithOffset(items.end_time, 8)}
            textIfEnded="Above Banner Ended :("
          />
        </div>
      </CardFooter>
    </Card>
  );
}
