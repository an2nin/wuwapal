import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialBannersState {
    featured_resonator: any | null;
    featured_weapon: any | null;
    standard_resonator: any | null;
    standard_weapon: any | null;
    beginner: any | null;
    beginner_choice: any | null;
}

const initialState: InitialBannersState = {
    featured_resonator: null,
    featured_weapon: null,
    standard_resonator: null,
    standard_weapon: null,
    beginner: null,
    beginner_choice: null,
};

export type BannerState = {
    banners: InitialBannersState;
    banner_record_url: string | null;
    game_path: string | null;
    addBannerRecordUrl: (url: string) => void;
    addGamePath: (path: string) => void;
    addBanner: (name: string, items: any) => void;
    updateBannerInfo: (banner_record_url: string, game_path: string) => void;
    clearStore: () => void;
};

export const useBannerStore = create(
    persist(
        (set: any, get: any) => ({
            banners: initialState,
            banner_record_url: null,
            game_path: null,
            addBannerRecordUrl: (url: string) =>
                set({ banner_record_url: url }),
            addGamePath: (path: string) => set({ game_path: path }),
            addBanner: (name: string, items: any) =>
                set((state: any) => ({
                    banners: {
                        ...state.banners,
                        [name]: items,
                    },
                })),
            updateBannerInfo: (banner_record_url: string, game_path: string) =>
                set({
                    banner_record_url: banner_record_url,
                    game_path: game_path,
                }),
            clearStore: () => set({
                banners: initialState,
                banner_record_url: null,
                game_path: null,
            }),
        }),
        {
            name: "banner-storage", // name of the item in the storage (must be unique)
        }
    )
);
