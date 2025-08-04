import type { StarItem } from '@/shared/types';
import { useState } from 'react';
import { cn, getColorClassWithSeverity } from '@/shared/utils';

interface Props {
  item: StarItem;
  maxPity: number;
  rarity: number;
}

export default function PullAvatar({ item, maxPity, rarity }: Props) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);

  const rarityGlow
    = rarity === 5
      ? 'shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_20px_rgba(255,215,0,0.7)]'
      : 'shadow-[0_0_10px_rgba(138,43,226,0.4)] hover:shadow-[0_0_15px_rgba(138,43,226,0.6)]';

  return (

    <div
      className={cn(
        'relative group/avatar flex items-center justify-center rounded-full border-[0.20rem] bg-transparent transition-all duration-300 ease-in-out md:border-[0.25rem]',
        rarity === 5 ? 'border-quality-5' : 'border-quality-4',
        rarityGlow,
      )}
    >
      {imageError
        ? (
            <div className="flex size-14 items-center justify-center rounded-full bg-gray-800 text-xs text-gray-400">
              {item.name.substring(0, 2)}
            </div>
          )
        : (
            <img
              className="size-14 rounded-full object-cover transition-opacity duration-300 hover:opacity-90"
              src={item.icon || '/placeholder.svg'}
              alt={`${item.name} - ${rarity}★ item`}
              onError={handleImageError}
              loading="lazy"
            />
          )}
      <div
        className={cn(
          'absolute -right-2 -bottom-2 flex size-6 bg-gray-900 font-bold text-xs items-center justify-center rounded-full transition-transform duration-200',
          getColorClassWithSeverity(item.pity, maxPity),
        )}
      >
        {item.pity}
      </div>
      {/* Tooltip on hover */}
      <div className="absolute font-bold -top-8 left-1/2 transform -translate-x-1/2 bg-card text-white text-xs px-2 py-1 rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 border border-slate-600">
        {item.name}
      </div>
    </div>
  );
}
