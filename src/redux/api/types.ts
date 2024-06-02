export interface BannerItem {
    cardPoolType: string;
    resourceId: number;
    qualityLevel: number;
    resourceType: string;
    name: string;
    count: number;
    time: string;
}

export type FetchBannerResponse = {
    code: number;
    message: string;
    data: BannerItem[];
};

export type FetchBannerPayload = {
    playerId: string;
    cardPoolId: string;
    cardPoolType: number;
    serverId: string;
    languageCode: string;
    recordId: string;
}
