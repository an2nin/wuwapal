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

interface ItemDetails {
    c: number;
    p: number;
}

interface S4s {
    [key: string]: ItemDetails;
}

interface S5s {
    [key: string]: ItemDetails;
}

interface FeaturedResonator {
    total: number;
    total_s4: number;
    total_s5: number;
    s4s: S4s;
    s5s: S5s;
    ff_win: number;
    ff_lose: number;
}

interface FeaturedWeapon {
    total: number;
    total_s4: number;
    total_s5: number;
    s4s: S4s;
    s5s: S5s;
}

interface StandardResonator {
    total: number;
    total_s4: number;
    total_s5: number;
    s4s: S4s;
    s5s: S5s;
}

interface StandardWeapon {
    total: number;
    total_s4: number;
    total_s5: number;
    s4s: S4s;
    s5s: S5s;
}

interface Beginner {
    total: number;
    total_s4: number;
    total_s5: number;
    s4s: S4s;
    s5s: S5s;
}

interface BeginnerChoice {
    total: number;
    total_s4: number;
    total_s5: number;
    s4s: S4s;
    s5s: S5s;
}

interface BeginnerChoiceConvene {
    total: number;
    total_s4: number;
    total_s5: number;
    s4s: S4s;
    s5s: S5s;
}

interface Items {
    featured_resonator: FeaturedResonator;
    featured_weapon: FeaturedWeapon;
    standard_resonator: StandardResonator;
    standard_weapon: StandardWeapon;
    beginner: Beginner;
    beginner_choice: BeginnerChoice;
    beginner_choice_convene: BeginnerChoiceConvene;
}

export interface GlobalStatResponse {
    total_records: number;
    time: number;
    items: Items;
}

