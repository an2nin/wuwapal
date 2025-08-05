import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LayoutState {
  activeProfile: string;
  hasPullsConverted: boolean;
  hasHydrated: boolean;
  showAllBanners: boolean;
  gamePath: string;
  // Actions
  setGamePath: (path: string) => void;
  setActiveProfile: (profile: string) => void;
  setHasPullsConverted: (converted: boolean) => void;
  setHasHydrated: (hydrated: boolean) => void;
  setShowAllBanners: (show: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    set => ({
      activeProfile: 'default',
      hasPullsConverted: false,
      hasHydrated: false,
      showAllBanners: false,
      gamePath: '',
      setActiveProfile: profile => set({ activeProfile: profile }),
      setHasPullsConverted: converted => set({ hasPullsConverted: converted }),
      setHasHydrated: hydrated => set({ hasHydrated: hydrated }),
      setShowAllBanners: show => set({ showAllBanners: show }),
      setGamePath: path => set({ gamePath: path }),
    }),
    {
      name: 'layout-storage',
      partialize: state => ({
        activeProfile: state.activeProfile,
        hasPullsConverted: state.hasPullsConverted,
        showAllBanners: state.showAllBanners,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
