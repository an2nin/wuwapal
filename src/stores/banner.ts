import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IInitialState {
    featured_resonator: any | null;
    featured_weapon: any | null;
    standard_resonator: any | null;
    standard_weapon: any | null;
    beginner: any | null;
    beginner_choice: any | null;
}

const initialState: IInitialState = {
    featured_resonator: null,
    featured_weapon: null,
    standard_resonator: null,
    standard_weapon: null,
    beginner: null,
    beginner_choice: null,
};

export const useBannerStore = create(
    persist(
        (set: any, get: any) => ({
            banners: initialState,
            banner_record_url: null,
            game_path: null,
            addBannerRecordUrl: (url: string) => set({banner_record_url: url}),
            addGamePath: (path: string) => set({game_path: path}),
            addBanner: (name: string, items: any) =>
                set((state: any) => ({
                    banners: {
                        ...state.banners,
                        [name]: items,
                    }
                })),
        }),
        {
            name: "banner-storage", // name of the item in the storage (must be unique)
        }
    )
);
