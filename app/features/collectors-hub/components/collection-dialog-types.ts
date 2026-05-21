import type { CollectionItem } from '@/shared/types';

export type CollectionType = 'resonator' | 'weapon';

export interface CollectionEntry {
  date: string;
  note: string;
}

export interface SelectedItem {
  type: 'resonator' | 'weapon';
  name: string;
  resource: CollectionItem;
  image: string;
  count: number;
  entries: CollectionEntry[];
}
;

export interface CollectionDetails {
  typeLabel: 'Resonator' | 'Weapon';
  qualityText: string;
  qualityClass: string;
  primary: string;
  secondary: string | null;
}
