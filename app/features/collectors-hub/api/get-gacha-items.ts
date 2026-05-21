import type { CollectionData } from '@/shared/types';
import { api } from '@/lib/api/client';

export async function getCollectionData(): Promise<CollectionData> {
  const response = await api.get<string | CollectionData>(`https://raw.githubusercontent.com/an2nin/trackmypulls-assets/master/assets/data/gacha-items/wuwa.json`);

  return typeof response === 'string' ? JSON.parse(response) as CollectionData : response;
}
