import type { BannerTable } from '@/lib/db';
import type { ProcessedBanner, ProcessedBannerItem, StarItem } from '@/shared/types';
import { IMAGE_PATH } from '@/shared/constants/game/paths';
import { STANDARD_RESONATORS } from '@/shared/constants/game/resonators';
import { toFileName } from '@/shared/utils';

function parseResourceType(type: string | undefined) {
  if (type === 'Weapons' || type === 'w' || type === 'weapons')
    return 'weapons';
  else return 'resonators';
}

function getFFWinPercent(ffWin: number, ffLost: number) {
  return (ffWin / (ffWin + ffLost)) * 100;
}

export function processBannerForDetailed(banner: BannerTable | null): ProcessedBanner | null {
  if (banner && banner.items.length > 0) {
    const processedItems: ProcessedBannerItem[] = [];
    const star4Resonators: StarItem[] = [];
    const star4Weapons: StarItem[] = [];
    const star5Items: StarItem[] = [];
    const lastStar5Resonator = null;
    let star4Pity = 0;
    let star5Pity = 0;
    let isGuaranteed = false;
    let lastPity4Index = 0;
    let lastPity5Index = 0;
    let ffWin = 0;
    let ffLost = 0;

    banner.items.forEach((item: any, idx: number) => {
      const newItem: ProcessedBannerItem = {
        icon: '',
        name: item.n || 'Unknown',
        category: parseResourceType(item.c),
        roll: idx + 1,
        pity: 1,
        time: item.t || new Date().toISOString(),
        quality: item.q || 4,
        source: item.s || 'm',
      };

      const icon_path = `${IMAGE_PATH}/${newItem.category}/${newItem.quality}/${toFileName(newItem.name)}.webp`;

      if (newItem.quality === 4) {
        const pity = lastPity4Index === 0 ? idx - lastPity4Index + 1 : idx - lastPity4Index;

        if (newItem.category === 'resonators') {
          star4Resonators.push({
            name: newItem.name,
            pity,
            type: newItem.category,
            icon: icon_path,
          });
        }
        else {
          star4Weapons.push({
            name: newItem.name,
            pity,
            type: newItem.category,
            icon: icon_path,
          });
        }

        newItem.pity = pity;
        lastPity4Index = idx;
      }
      else if (newItem.quality === 5) {
        const pity = lastPity5Index === 0 ? idx - lastPity5Index + 1 : idx - lastPity5Index;

        star5Items.push({
          name: newItem.name,
          pity,
          type: newItem.category,
          icon: icon_path,
        });

        newItem.pity = pity;

        lastPity4Index = idx;
        lastPity5Index = idx;
      }

      // Replace the original item with the new one
      newItem.icon = icon_path;
      processedItems[idx] = newItem;

      if (banner.name === 'featured_resonator') {
        if (lastStar5Resonator === null) {
          !STANDARD_RESONATORS.includes(newItem.name) ? ffWin++ : ffLost++;
        }
        else if (
          lastStar5Resonator != null
          && !STANDARD_RESONATORS.includes(lastStar5Resonator)
        ) {
          !STANDARD_RESONATORS.includes(newItem.name) ? ffWin++ : ffLost++;
        }
      }
    });

    if (star5Items.length > 0) {
      isGuaranteed = STANDARD_RESONATORS.includes(star5Items[star5Items.length - 1].name);
    }

    star4Pity = banner.items.length - (lastPity4Index + 1);
    star5Pity = banner.items.length - (lastPity5Index === 0 ? 0 : lastPity5Index + 1);

    const star5AvgPity
      = star5Items.reduce((sum: number, obj: any) => sum + obj.pity, 0) / star5Items.length;
    const star4AvgPity
      = [...star4Resonators, ...star4Weapons].reduce((sum: number, obj: any) => sum + obj.pity, 0)
        / (star4Resonators.length + star4Weapons.length);

    return {
      name: banner.name,
      total: banner.items.length,
      items: processedItems.slice().reverse(),
      star4Resonators,
      star4Weapons,
      star5Items,
      star4Pity,
      star5Pity,
      isGuaranteed,
      star4AvgPity: Math.round(star4AvgPity),
      star5AvgPity: Math.round(star5AvgPity),
      ffWinPercent:
        banner.name === 'featured_resonator' ? getFFWinPercent(ffWin, ffLost) : undefined,
    };
  }

  return null;
}
