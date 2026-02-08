import type { Resonator, Weapon } from '@/features/collectors-hub/types';

export type CollectionType = 'resonator' | 'weapon';

export interface CollectionEntry {
  date: string;
  note: string;
}

export type SelectedItem
  = | {
    type: 'resonator';
    name: string;
    resource: Resonator;
    count: number;
    entries: CollectionEntry[];
  }
  | {
    type: 'weapon';
    name: string;
    resource: Weapon;
    count: number;
    entries: CollectionEntry[];
  };

export interface CollectionDetails {
  typeLabel: 'Resonator' | 'Weapon';
  qualityText: string;
  qualityClass: string;
  primary: string;
  secondary: string | null;
}
