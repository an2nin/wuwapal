import type { BannerTable } from '@/core/db';
import type { GenericBannerItem } from '@/shared/types';

export function processBannersForCollection(banners: BannerTable[] | null) {
  const weapons: Record<string, number> = {};
  const resonators: Record<string, number> = {};

  if (!banners) {
    return { weapons, resonators };
  }

  banners.forEach((banner) => {
    banner.items.forEach((item: GenericBannerItem) => {
      if (
        item.c === 'w'
        && item.q > 3
      ) {
        weapons[item.n]
          = (weapons[item.n] || 0) + 1;
      }
      else if (item.c === 'r') {
        resonators[item.n]
          = (resonators[item.n] || 0) + 1;
      }
    });
  });

  return {
    weapons,
    resonators,
  };
}
