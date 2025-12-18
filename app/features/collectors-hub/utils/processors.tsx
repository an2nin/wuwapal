import type { BannerTable } from '@/core/db';
import type {
  ExternalCollectionCounts,
  ExternalCollectionEntry,
} from '@/shared/stores/external-collection';
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
  externalCounts?: ExternalCollectionCounts,
): CollectionCounts {
  const mergedWeapons = { ...bannerCounts.weapons };
  const mergedResonators = { ...bannerCounts.resonators };

  const getCount = (entry: number | ExternalCollectionEntry | Record<string, any> | undefined) => {
    if (typeof entry === 'number') {
      return entry;
    }

    if (Array.isArray(entry)) {
      return entry.length;
    }

    return entry?.count ?? 0;
  };

  if (externalCounts) {
    Object.entries(externalCounts.weapons).forEach(([name, entry]) => {
      const count = getCount(entry);
      mergedWeapons[name] = (mergedWeapons[name] ?? 0) + count;
    });

    Object.entries(externalCounts.resonators).forEach(([name, entry]) => {
      const count = getCount(entry);
      mergedResonators[name] = (mergedResonators[name] ?? 0) + count;
    });
  }

  return {
    weapons: mergedWeapons,
    resonators: mergedResonators,
  };
}
