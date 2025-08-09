import type { Profiles } from '../stores/profile';
import type { BannerTable } from '@/core/db';
import { saveBanner } from '@/core/db/actions';
import { useAccountStore } from '../stores/account';
import { convertBannerToNewFormat } from './converter';

export async function importV1PullsIntoTable(profiles: Profiles) {
  const accountStore = useAccountStore.getState();

  for (const [profileKey, profile] of Object.entries(profiles)) {
    if (profile.banners) {
      for (const [bannerKey, banner] of Object.entries(profile.banners)) {
        const convertedItems = convertBannerToNewFormat(banner as any);
        const bannerForTable: BannerTable = {
          profile: profile.player_id || profileKey.toLowerCase(),
          name: bannerKey,
          items: convertedItems,
        };

        try {
          await saveBanner(bannerForTable);
        }
        catch (e) {
          console.error(`Failed to save banner ${bannerKey}:`, e);
        }
      }

      accountStore.addAccount({
        displayName: profile.display_name || profileKey,
        playerId: profile.player_id || '',
      });
    }
  }
}
