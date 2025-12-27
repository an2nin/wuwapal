import type { FetchProfileResponse } from '@/lib/api/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InitialAuthState {
  access: string | null;
  refresh: string | null;
  profile: FetchProfileResponse | null;
  cloud_file_id: string | null;
  hasHydrated: boolean;
}

const initialState: InitialAuthState = {
  access: null,
  refresh: null,
  profile: null,
  cloud_file_id: null,
  hasHydrated: false,
};

export type AuthStoreState = InitialAuthState & {
  setTokens: (access: string, refresh?: string) => void;
  setProfile: (profile: FetchProfileResponse | null) => void;
  setCloudFileId: (cloud_file_id: string) => void;
  setHasHydrated: (hydrated: boolean) => void;
  clearStore: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    set => ({
      ...initialState,
      setTokens: (access: string, refresh?: string) =>
        set(state => ({
          access,
          refresh: refresh !== undefined ? refresh : state.refresh,
        })),
      setProfile: (profile: FetchProfileResponse | null) =>
        set({ profile }),
      setCloudFileId: (cloud_file_id: string) => set({ cloud_file_id }),
      setHasHydrated: (hydrated: boolean) => set({ hasHydrated: hydrated }),
      clearStore: () => set(initialState),
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        access: state.access,
        refresh: state.refresh,
        profile: state.profile,
        cloud_file_id: state.cloud_file_id,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
