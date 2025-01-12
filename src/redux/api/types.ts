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
};

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

export type FetchAuthTokensPayload = {
    code: string;
};

export type FetchAuthTokensResponse = {
    status: string;
    data: {
        access_token: string;
        expires_in: number;
        refresh_token: string;
        token_type: string;
        scope: string;
        id_token: string;
    };
};

export type RefreshAccessTokenPayload = {
    refresh_token: string;
};

export type RefreshAccessTokenResponse = {
    status: string;
    data: {
        access_token: string;
        expires_in: number;
        token_type: string;
        scope: string;
        id_token: string;
    };
};

export type RevokeAuthTokensResponse = {
    status: string;
    message: string;
}

export type FetchProfileResponse = {
    sub: string;
    name: string;
    given_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
};

export type UploadToDrivePayload = {
    id: string;
    params: {
        uploadType: string;
        alt: string;
        key: string;
    },
    body: string;
};

export type UploadToDriveResponse = {
    
};

export type FetchFileListFromDrivePayload = {
    q: string;
    spaces: string;
    key: string;
};

export type FetchFileListFromDriveResponse = {
    kind: string;
    incompleteSearch: boolean;
    files: { kind: string; id: string; name: string; mimeType: string }[];
};

export type CreateFileInDrivePayload = {
    params: {
        fields: string;
        alt: string;
        key: string;
    };
    body: {
        name: string;
        parents: string[];
    };
};

export type CreateFileInDriveResponse = {
    id: string;
};

export type FetchFileFromDrivePayload = {
    id: string;
    params: {
        alt: string;
        key: string;
    };
};

export type FetchFileFromDriveResponse = string;
