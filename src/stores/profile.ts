import Profile from "@/app/settings/_components/Profile";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Profile {
    display_name: string;
    banners?: any;
    banner_record_url?: string | null;
    game_path?: string | null;
}

interface Profiles {
    [profile: string]: Profile;
}

const initialProfilesState: Profiles = {
    default: {
        display_name: "Default",
        banners: null,
        banner_record_url: null,
        game_path: null,
    },
};

export function convertToProfileKey(name: string) {
    return name.toLowerCase().replace(" ", "_");
}

export type ProfileStoreState = {
    active: string;
    profiles: Profiles;
    version: string;
    addNewProfile: (name: string) => void;
    setProfileAsActive: (name: string) => void;
    addGamePath: (path: string) => void;
    addBannerRecordUrl: (url: string) => void;
    addBanner: (name: string, banner: any) => void;
    getGamePath: () => string | null;
    getBannerRecordUrl: () => string | null;
    deleteProfile: (name: string) => void;
    clearStore: () => void;
};

export const useProfileStore = create(
    persist(
        (set: any, get: any) => ({
            active: "default",
            profiles: initialProfilesState,
            version: "1.0",
            addNewProfile: (name: string) =>
                set((state: any) => {
                    const copy = { ...state };
                    const newProfile: Profile = {
                        display_name: name,
                        banners: null,
                        banner_record_url: null,
                        game_path: null,
                    };
                    const profileKey = convertToProfileKey(name);
                    copy.profiles[profileKey] = newProfile;

                    return copy;
                }),
            setProfileAsActive: (name: string) =>
                set((state: any) => {
                    const copy = { ...state };
                    copy.active = name;
                    return copy;
                }),
            addGamePath: (path: string) =>
                set((state: any) => {
                    const copy = { ...state };
                    const currentProfile = copy.profiles[state.active];
                    currentProfile.game_path = path;
                    return copy;
                }),
            addBannerRecordUrl: (url: string) =>
                set((state: any) => {
                    const copy = { ...state };
                    const currentProfile = copy.profiles[state.active];
                    currentProfile.banner_record_url = url;

                    return copy;
                }),
            addBanner: (name: string, banner: any) =>
                set((state: any) => {
                    const copy = { ...state };
                    const currentProfile = copy.profiles[state.active];
                    currentProfile.banners[name] = banner;

                    return copy;
                }),
            getGamePath: () => {
                const state = get();
                const currentProfile = state.profiles[state.active];

                return currentProfile.game_path || null;
            },
            getBannerRecordUrl: () => {
                const state = get();
                const currentProfile = state.profiles[state.active];

                return currentProfile.banner_record_url || null;
            },
            deleteProfile: (name: string) =>
                set((state: any) => {
                    const copy = { ...state };
                    delete copy.profiles[name];
                    return copy;
                }),
            clearStore: () =>
                set({
                    banners: null,
                    banner_record_url: null,
                    game_path: null,
                }),
        }),
        {
            name: "profile-storage",
        }
    )
);
