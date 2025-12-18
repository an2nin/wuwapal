import type { BannerTable } from '@/core/db';
import type { ManualCollectionCounts } from '@/shared/stores/manual-collection';
import type { GenericBannerItem } from '@/shared/types';

export interface CollectionCounts {
  weapons: Record<string, number>;
  resonators: Record<string, number>;
}

export function processBannersForCollection(
  banners: BannerTable[] | null,
): CollectionCounts {
  const weapons: Record<string, number> = {};
  const resonators: Record<string, number> = {};

  if (!banners || banners.length === 0) {
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

export function mergeCollectionCounts(
  bannerCounts: CollectionCounts,
  manualCounts?: ManualCollectionCounts,
): CollectionCounts {
  const mergedWeapons = { ...bannerCounts.weapons };
  const mergedResonators = { ...bannerCounts.resonators };

  if (manualCounts) {
    Object.entries(manualCounts.weapons).forEach(([name, count]) => {
      mergedWeapons[name] = (mergedWeapons[name] ?? 0) + count;
    });

    Object.entries(manualCounts.resonators).forEach(([name, count]) => {
      mergedResonators[name] = (mergedResonators[name] ?? 0) + count;
    });
  }

  return {
    weapons: mergedWeapons,
    resonators: mergedResonators,
  };
}
