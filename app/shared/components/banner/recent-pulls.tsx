import type { StarItem } from '@/shared/types/banner';
import { cn } from '@/shared/utils';
import PullAvatar from './pull-avatar';

interface Props {
  items: StarItem[];
  className?: string;
  limit?: number;
}

export default function RecentPulls({ items, className, limit }: Props) {
  return (
    <div
      className={cn(
        'w-full flex flex-wrap justify-center gap-3',
        className,
      )}
    >
      {items && items.length > 0
        ? (
            items
              .slice()
              .reverse()
              .slice(0, limit) // Apply limit here if provided
              .map((item: StarItem, idx: number) => (
                <PullAvatar key={idx} item={item} maxPity={80} rarity={5} />
              ))
          )
        : (
            <div>No 5 Star found</div>
          )}
    </div>
  );
}
