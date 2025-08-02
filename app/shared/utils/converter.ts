import type { GenericBannerItem } from '../types';
import { CategoryType, SourceType } from '../types';

interface Pull {
  i: string;
  q: number;
  y: string;
  n: string;
  t: string;
}

interface Banner {
  store_id: string;
  total: number;
  items: Pull[];
}

export function convertBannerToNewFormat(banner: Banner): GenericBannerItem[] {
  return banner.items.map(pull => ({
    q: pull.q,
    c: pull.y === 'r' ? CategoryType.RESONATOR : CategoryType.WEAPON,
    n: pull.n,
    t: pull.t,
    s: SourceType.AUTO,
  }));
}
