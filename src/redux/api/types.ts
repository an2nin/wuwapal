export interface BannerItem {
    uid: string;
    gacha_id: number;
    gacha_type: number;
    item_id: string;
    count: string;
    time: number;
    name: string;
    lang: string;
    item_type: string;
    rank_type: string;
    id: string;
}

export type FetchBannerResponse = {
    retcode: number;
    message: string;
    data: {
        list: BannerItem[];
        page: string;
        size: string;
    };
};

export type FetchBannerPayload = {
    authkey_ver: string;
    sign_type: string;
    authkey: string;
    lang: string;
    game_biz: string;
    end_id?: number;
    gacha_type?: string;
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
    ff_won: number;
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

