'use client';

import { Discord } from '@/shared/components/custom-icons';
import MovingBorder from '@/shared/components/moving-border';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { SOCIAL_LINKS_OBJ } from '@/shared/constants/social-links';

export default function SocialLinks() {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Join Our Community on Discord!</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col lg:gap-6 gap-4">
          <div className="text-muted-foreground text-sm">
            Connect with fellow Rovers, share strategies, and stay
            updated on WuWaPal&apos;s latest tools and events.
          </div>

          <a href={SOCIAL_LINKS_OBJ.discord.path} target="_blank">
            <MovingBorder>
              <div className="flex items-center gap-3 px-2 min-w-32 justify-center group animate-pulse duration-3000 group-hover:animate-none">
                <span className="text-foreground transition-all">
                  <Discord />
                </span>
                Join Us
              </div>
            </MovingBorder>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
