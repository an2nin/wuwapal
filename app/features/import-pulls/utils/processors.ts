import type { BannerTable, BannerTable as TableBanner } from '@/core/db';
import type { BannerItem, FetchBannerResponse, UploadGlobalBannerListPayload } from '@/features/import-pulls/apis/types';
import type { GenericBannerItem, GenericGlobalBannerItem } from '@/shared/types';
import { BANNERS } from '@/shared/constants/game/banners';
import { CategoryType, SourceType } from '@/shared/types';

export interface GlobalBanner {
  name: string;
  total: number;
  items: GenericBannerItem[];
}

export function getStoreIdById(id: number): string | undefined {
  const banner = Object.values(BANNERS).find(banner => banner.id === id);
  return banner ? banner.store_id : undefined;
}

export function getBannerIdByStoreId(storeId: string): number | undefined {
  const banner = Object.values(BANNERS).find(banner => banner.store_id === storeId);
  return banner ? banner.id : undefined;
}

function processBannerItems(
  banner: BannerItem[],
): GenericBannerItem[] {
  const copyData = [...banner].slice().reverse();
  const processedData: GenericBannerItem[] = [];

  copyData.forEach((data: BannerItem) => {
    processedData.push({
      q: data.qualityLevel,
      s: SourceType.AUTO,
      n: data.name,
      t: data.time,
      c: data.resourceType.toLowerCase() === 'weapon' ? CategoryType.WEAPON : CategoryType.RESONATOR,
    });
  });

  return processedData;
}

export function mergeGachaDataOptimized(existingData: GenericBannerItem[] | null, newData: GenericBannerItem[]): GenericBannerItem[] {
  if (!existingData || existingData.length === 0) {
    // If no existing data, return new data directly
    return newData;
  }

  // Assuming both arrays are sorted by `t` (timestamp) in ascending order
  const lastExistingTimestamp = existingData[existingData.length - 1]?.t;

  // Find the starting point in newData where `t` exceeds `lastExistingTimestamp`
  const newItemsToAdd = newData.filter((item: any) => item.t > lastExistingTimestamp);

  // Concatenate the new items to the existing data
  const mergedItems = [...existingData, ...newItemsToAdd];

  // Update the total and return the merged data
  return mergedItems;
}

export function processBannerForTable(
  newPulls: FetchBannerResponse,
  oldPulls: BannerTable | null,
  bannerName: string,
  profile: string,
): TableBanner {
  const newProcessedPulls = processBannerItems(newPulls.data);
  const mergedPulls = mergeGachaDataOptimized(oldPulls ? oldPulls.items : null, newProcessedPulls);

  return {
    name: bannerName,
    items: mergedPulls,
    profile,
  };
}

export function calculatePityForGlobal(items: GenericGlobalBannerItem[]): number {
  let total_pity = 0;
  let total_from_last_5_star = 0;
  items.forEach((it) => {
    if (it.q === 5) {
      total_pity += (it.p || 0) - total_from_last_5_star;
      total_from_last_5_star = 0;
    }
    else {
      total_pity += it.p || 0;
      total_from_last_5_star += it.p || 0;
    }
  });

  return total_pity;
}

export function processBannerForGlobal(table: TableBanner): GlobalBanner {
  let pity4_last_index = 0;
  let pity5_last_index = 0;
  const globalItems: GenericGlobalBannerItem[] = [];

  table.items.forEach((item: GenericBannerItem, idx: number) => {
    const newItem: GenericGlobalBannerItem = {
      n: item.n,
      q: item.q,
      c: item.c,
      t: item.t,
    };

    if (item.q === 4) {
      const pity = pity4_last_index === 0 ? idx - pity4_last_index + 1 : idx - pity4_last_index;

      globalItems.push({ ...newItem, p: pity });
      pity4_last_index = idx;
    }

    if (item.q === 5) {
      const pity = pity5_last_index === 0 ? idx - pity5_last_index + 1 : idx - pity5_last_index;

      globalItems.push({ ...newItem, p: pity });

      pity4_last_index = idx;
      pity5_last_index = idx;
    }
  });

  return {
    name: table.name,
    total: calculatePityForGlobal(globalItems),
    items: globalItems,
  };
}

export function mapBannersForGlobalStats(banners: GlobalBanner[]) {
  const bannerMap = banners.reduce((acc, banner) => {
    const bannerId = getBannerIdByStoreId(banner.name);
    if (bannerId === undefined) {
      return acc;
    }

    acc[`banner_${bannerId}`] = { total: banner.total, items: banner.items ?? [] };
    return acc;
  }, {} as UploadGlobalBannerListPayload);

  return bannerMap;
}
