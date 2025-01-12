import { FetchProfileResponse } from "@/redux/api/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialAuthState {
    access: string | null;
    refresh: string | null;
    profile: FetchProfileResponse | null;
}

const initialState: InitialAuthState = {
    access: null,
    refresh: null,
    profile: null,
};

export type AuthStoreState = InitialAuthState & {
    setTokens: (access: string, refresh: string) => void;
    setProfile: (profile: FetchProfileResponse | null) => void;
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
            clearStore: () => set(initialState),
        }),
        {
            name: "auth-storage",
        }
    )
);
