'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import ThemedGradientText from '@/shared/components/themed-gradient-text';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { BANNERS } from '@/shared/constants/game/banners';

export default function BannerSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('id') || 'featured_resonator';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="capitalize animate-pulse hover:animate-none font-bold hover:scale-105 border-primary">
        <ThemedGradientText
          className="lg:text-3xl text-2xl hover:cursor-pointer"
          text={current && BANNERS[current].name}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(BANNERS).map((banner, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={() =>
              router.push(`/convene/banner?id=${banner}`)}
          >
            {current && BANNERS[banner].name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
