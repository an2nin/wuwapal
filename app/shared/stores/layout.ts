import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LayoutState {
  activeProfile: string;
  hasPullsConverted: boolean;
  hasHydrated: boolean;
  showAllBanners: boolean;
  gamePath: string;
  advancedSettingsUnlocked: boolean;
  // Actions
  setGamePath: (path: string) => void;
  setActiveProfile: (profile: string) => void;
  setHasPullsConverted: (converted: boolean) => void;
  setHasHydrated: (hydrated: boolean) => void;
  setShowAllBanners: (show: boolean) => void;
  setAdvancedSettingsUnlocked: (unlocked: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    set => ({
      activeProfile: 'default',
      hasPullsConverted: false,
      hasHydrated: false,
      showAllBanners: false,
      gamePath: '',
      advancedSettingsUnlocked: false,
      setActiveProfile: profile => set({ activeProfile: profile }),
      setHasPullsConverted: converted => set({ hasPullsConverted: converted }),
      setHasHydrated: hydrated => set({ hasHydrated: hydrated }),
      setShowAllBanners: show => set({ showAllBanners: show }),
      setGamePath: path => set({ gamePath: path }),
      setAdvancedSettingsUnlocked: unlocked => set({ advancedSettingsUnlocked: unlocked }),
    }),
    {
      name: 'layout-storage',
      partialize: state => ({
        activeProfile: state.activeProfile,
        hasPullsConverted: state.hasPullsConverted,
        showAllBanners: state.showAllBanners,
        advancedSettingsUnlocked: state.advancedSettingsUnlocked,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
