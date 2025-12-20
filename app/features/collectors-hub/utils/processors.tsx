import type { BannerTable } from '@/core/db';
import type {
  ExternalCollectionCounts,
  ExternalCollectionEntry,
} from '@/shared/stores/external-collection';
import type { GenericBannerItem } from '@/shared/types';

interface CollectionMeta {
  date: string;
  note: string;
}

export interface CollectionCounts {
  weapons: Record<string, CollectionMeta[]>;
  resonators: Record<string, CollectionMeta[]>;
}

export function processBannersForCollection(
  banners: BannerTable[] | null,
): CollectionCounts {
  const weapons: Record<string, CollectionMeta[]> = {};
  const resonators: Record<string, CollectionMeta[]> = {};

  if (!banners || banners.length === 0) {
    return { weapons, resonators };
  }

  banners.forEach((banner) => {
    banner.items.forEach((item: GenericBannerItem) => {
      if (
        item.c === 'w'
        && item.q > 3
      ) {
        const existing = weapons[item.n] ?? [];
        weapons[item.n] = [
          ...existing,
          {
            date: item.t ?? '',
            note: '',
          },
        ];
      }
      else if (item.c === 'r') {
        const existing = resonators[item.n] ?? [];
        resonators[item.n] = [
          ...existing,
          {
            date: item.t ?? '',
            note: '',
          },
        ];
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
  const mergedWeapons = Object.fromEntries(
    Object.entries(bannerCounts.weapons).map(([name, meta]) => [name, [...meta]]),
  ) as Record<string, CollectionMeta[]>;
  const mergedResonators = Object.fromEntries(
    Object.entries(bannerCounts.resonators).map(([name, meta]) => [name, [...meta]]),
  ) as Record<string, CollectionMeta[]>;

  const normalizeEntry = (
    entry: number | ExternalCollectionEntry | Record<string, any> | undefined,
  ): ExternalCollectionEntry => {
    if (typeof entry === 'number') {
      return Array.from({ length: entry }, () => ({ date: '', note: '' }));
    }

    if (!entry) {
      return [];
    }

    if (Array.isArray(entry)) {
      return entry.map(item => ({
        date: item.date?.trim() ?? '',
        note: item.note?.trim() ?? '',
      }));
    }

    const count = entry.count
      ?? entry.notes?.length
      ?? entry.dates?.length
      ?? (entry.note || entry.date ? 1 : 0);
    const notes = entry.notes ?? (entry.note ? Array.from({ length: count }, () => entry.note) : []);
    const dates = entry.dates ?? (entry.date ? Array.from({ length: count }, () => entry.date) : []);

    return Array.from({ length: count }, (_, idx) => ({
      note: notes[idx]?.trim() ?? '',
      date: dates[idx]?.trim() ?? '',
    }));
  };

  if (externalCounts) {
    Object.entries(externalCounts.weapons).forEach(([name, entry]) => {
      const normalized = normalizeEntry(entry);

      mergedWeapons[name] = [
        ...(mergedWeapons[name] ?? []),
        ...normalized,
      ];
    });

    Object.entries(externalCounts.resonators).forEach(([name, entry]) => {
      const normalized = normalizeEntry(entry);

      mergedResonators[name] = [
        ...(mergedResonators[name] ?? []),
        ...normalized,
      ];
    });
  }

  return {
    weapons: mergedWeapons,
    resonators: mergedResonators,
  };
}
