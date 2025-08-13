import type { Account } from '../stores/account';
import type { Profiles } from '../stores/profile';
import type { BannerTable } from '@/core/db';
import { resetDatabase, saveBanner } from '@/core/db/actions';
import { useAccountStore } from '../stores/account';
import { convertBannerToNewFormat } from './converter';

export async function importV1PullsIntoTable(profiles: Profiles) {
  const accountStore = useAccountStore.getState();
  await resetDatabase();
  accountStore.clearStore();

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

export async function importV2PullsIntoTable(banners: BannerTable[], accounts: Account[], active: string | null) {
  const accountStore = useAccountStore.getState();
  await resetDatabase();
  accountStore.clearStore();

  if (banners.length === 0) {
    console.warn('No banners to import');
    return;
  }

  for (const banner of banners) {
    await saveBanner(banner);
  }

  if (accounts.length > 0) {
    accountStore.setAccounts(accounts);
  }

  if (active) {
    accountStore.setActive(active);
  }
}
