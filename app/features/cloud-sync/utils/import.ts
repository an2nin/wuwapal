import type { BannerTable } from '@/core/db';
import type { Profiles } from '@/shared/stores/profile';
import { importV1PullsIntoTable } from '@/shared/utils';

interface gdriveFileContent {
  version: string;
  active: string;
  date: string;
  profiles?: Profiles;
  banners?: BannerTable[];
}
export function importPullsIntoTableFromGDrive(content: gdriveFileContent) {
  if (content.version === '1.0' && content.profiles) {
    return importV1PullsIntoTable(content.profiles);
  }
}
