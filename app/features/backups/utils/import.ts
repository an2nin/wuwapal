import type { BannerTable } from '@/core/db';
import type { Account } from '@/shared/stores/account';
import type { Profiles } from '@/shared/stores/profile';
import { importV1PullsIntoTable, importV2PullsIntoTable } from '@/shared/utils';

interface gdriveFileContent {
  version: string;
  active?: string;
  date: string;
  profiles?: Profiles;
  banners?: BannerTable[];
  accounts?: Account[];
}

export function importPullsIntoTableFromGDrive(content: gdriveFileContent) {
  if (content.version === '1.0' && content.profiles) {
    return importV1PullsIntoTable(content.profiles);
  }
  else if (content.version === '2.0' && content.banners) {
    return importV2PullsIntoTable(content.banners || [], content.accounts || [], content.active || null);
  }
}
