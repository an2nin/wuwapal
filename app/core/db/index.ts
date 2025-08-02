import type { Table } from 'dexie';
import type { GenericBannerItem } from '@/shared/types';
import Dexie from 'dexie';

export interface BannerTable {
  profile: string; // e.g., 'default', 'alt1', etc.
  name: string; // e.g., 'featured', 'standard', etc.
  items: GenericBannerItem[];
}

class GachaDatabase extends Dexie {
  banners!: Table<BannerTable, [string, string]>;

  constructor() {
    super('GachaDatabase');

    this.version(1).stores({
      banners: '&[profile+name]',
    });
  }
}

const db = new GachaDatabase();
export default db;
