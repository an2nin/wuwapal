import { FetchProfileResponse } from "@/redux/api/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialAuthState {
    access: string | null;
    refresh: string | null;
    profile: FetchProfileResponse | null;
    cloud_file_id: string | null;
}

const initialState: InitialAuthState = {
    access: null,
    refresh: null,
    profile: null,
    cloud_file_id: null,
};

export type AuthStoreState = InitialAuthState & {
    setTokens: (access: string, refresh: string) => void;
    setProfile: (profile: FetchProfileResponse | null) => void;
    setCloudFileId: (cloud_file_id: string) => void;
    clearStore: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
    persist(
        (set) => ({
            ...initialState,
            setTokens: (access: string, refresh: string) =>
                set({ access, refresh }),
            setProfile: (profile: FetchProfileResponse | null) =>
                set({ profile }),
            setCloudFileId: (cloud_file_id: string) => set({ cloud_file_id }),
            clearStore: () => set(initialState),
        }),
        {
            name: "auth-storage",
        }
    )
);
