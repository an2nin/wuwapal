import type { LucideIcon } from 'lucide-react';

export const SourceType = {
  AUTO: 'a',
  MANUAL: 'm',
  OTHER: 'o', // Other sources, e.g., from a different game or platform
} as const;

export const CategoryType = {
  RESONATOR: 'r',
  WEAPON: 'w',
} as const;

export interface GenericGlobalBannerItem {
  n: string; // Name of the item
  q: number; // Quality level
  c: (typeof CategoryType)[keyof typeof CategoryType];
  t: string; // Timestamp in ISO 8601 format
  p?: number; // Pity count
}

export type GenericBannerItem = GenericGlobalBannerItem & {
  i?: number | string; // Item ID
  b?: number | string; // Banner ID
  r?: number; // Roll number
  s?: (typeof SourceType)[keyof typeof SourceType]; // Source; 'a' = auto, 'm' = manual
  [k: string]: any; // Additional properties
};

export const BannerDurationType = {
  LIMITED: 'limited',
  PERMANENT: 'permanent',
} as const;

export interface BannerInfo {
  id: number;
  name: string;
  store_id: string;
  image: string;
  currency: string;
  duration: (typeof BannerDurationType)[keyof typeof BannerDurationType];
  icon: LucideIcon;
  rate: number;
  currency_image?: string;
}

export interface BannerInfoList {
  [store_id: string]: BannerInfo;
}

export interface BannerData {
  total: number; // Total quantity or count
  store_id: string; // Identifier for the store
  items: GenericBannerItem[]; // Array of items
}

export interface ProcessedBannerItem {
  icon: string;
  name: string;
  category: string;
  roll: number;
  pity: number;
  time: string;
  quality: number;
  source: string;
}

export interface StarItem {
  name: string;
  pity: number;
  type: string;
  icon: string;
}

export interface ProcessedBanner {
  total: number; // Total quantity or count
  name: string; // Identifier for the store
  items: ProcessedBannerItem[]; // Array of items
  star4_resonators: StarItem[];
  star4_weapons: StarItem[];
  star5s: StarItem[];
  star4_pity: number;
  star5_pity: number;
  guaranteed: boolean;
  star4_avg_pity: number;
  star5_avg_pity: number;
  ff_win_percent?: number;
}

export interface ProcessedBanners {
  [store_id: string]: ProcessedBanner;
}

export interface SummarizedBanner {
  name: string;
  total: number;
  star4Pity: number;
  star5Pity: number;
  items: StarItem[];
}
