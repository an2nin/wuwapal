import type { GenericGlobalBannerItem } from '@/shared/types/banner';

export interface BannerItem {
  cardPoolType: string;
  resourceId: number;
  qualityLevel: number;
  resourceType: string;
  name: string;
  count: number;
  time: string;
}

export interface FetchBannerResponse {
  code: number;
  message: string;
  data: BannerItem[];
}

export interface FetchBannerPayload {
  playerId: string;
  cardPoolType: number;
  serverId: string;
  languageCode: string;
  recordId: string;
}

export interface UploadGlobalBannerListPayload {
  [key: string]: {
    items: GenericGlobalBannerItem[];
    total: number;
  };
}

export interface UpdateGlobalStatsPayload {
  player_id: number | string;
  server_id: number | string;
  banners: UploadGlobalBannerListPayload;
  note?: string;
}

export interface UpdateGlobalStatsResponse {
  message: string;
}
