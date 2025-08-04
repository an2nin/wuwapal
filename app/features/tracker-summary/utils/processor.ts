import type { BannerTable } from '@/core/db';
import type { GenericBannerItem, StarItem, SummarizedBanner } from '@/shared/types';
import { RESONATOR_IMAGE_PATH, WEAPON_IMAGE_PATH } from '@/shared/constants/game/paths';
import { CategoryType } from '@/shared/types';
import { toFileName } from '@/shared/utils';

export function processBannerForSummary(banner: BannerTable | null): SummarizedBanner | null {
  if (banner && banner.items.length > 0) {
    const summarizedBannerItems: StarItem[] = [];

    let star4_pity = 0;
    let star5_pity = 0;
    let pity4_last_index = 0;
    let pity5_last_index = 0;

    banner.items.forEach((item: GenericBannerItem, idx: number) => {
      if (item.q === 4) {
        pity4_last_index = idx;
      }

      else if (item.q === 5) {
        const pity = pity5_last_index === 0 ? idx - pity5_last_index + 1 : idx - pity5_last_index;
        const icon_path = item.c === CategoryType.RESONATOR ? RESONATOR_IMAGE_PATH : WEAPON_IMAGE_PATH;
        const icon = `${icon_path}/${item.q}/${toFileName(item.n)}.webp`;
        summarizedBannerItems.push({
          name: item.n,
          pity,
          type: item.c,
          icon,
        });

        pity4_last_index = idx;
        pity5_last_index = idx;
      }
    });

    star4_pity = banner.items.length - (pity4_last_index + 1);
    star5_pity = banner.items.length - (pity5_last_index === 0 ? 0 : pity5_last_index + 1);

    return {
      name: banner.name,
      total: banner.items.length,
      star4Pity: star4_pity,
      star5Pity: star5_pity,
      items: summarizedBannerItems,
    };
  }
  else {
    return null;
  }
}
