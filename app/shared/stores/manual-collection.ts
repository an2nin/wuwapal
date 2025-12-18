'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CollectionType = 'resonator' | 'weapon';

export interface ManualCollectionCounts {
  resonators: Record<string, number>;
  weapons: Record<string, number>;
}

interface ManualCollectionStore {
  manualCollections: Record<string, ManualCollectionCounts>;
  addManualCount: (
    profileId: string | null,
    type: CollectionType,
    name: string,
    count: number,
  ) => void;
  getCollectionForProfile: (
    profileId: string | null,
  ) => ManualCollectionCounts;
  clearProfile: (profileId: string) => void;
}

const emptyCollection: ManualCollectionCounts = {
  resonators: {},
  weapons: {},
};

export const useManualCollectionStore = create<ManualCollectionStore>()(
  persist(
    (set, get) => ({
      manualCollections: {},
      addManualCount: (profileId, type, name, count) => {
        if (!profileId || !name || count <= 0) {
          return;
        }

        set((state) => {
          const existing = state.manualCollections[profileId]
            ?? emptyCollection;
          const targetKey = type === 'weapon' ? 'weapons' : 'resonators';

          return {
            manualCollections: {
              ...state.manualCollections,
              [profileId]: {
                ...existing,
                [targetKey]: {
                  ...existing[targetKey],
                  [name]: (existing[targetKey][name] ?? 0) + count,
                },
              },
            },
          };
        });
      },
      getCollectionForProfile: (profileId) => {
        if (!profileId) {
          return emptyCollection;
        }

        return get().manualCollections[profileId] ?? emptyCollection;
      },
      clearProfile: profileId =>
        set((state) => {
          if (!state.manualCollections[profileId]) {
            return state;
          }

          const next = { ...state.manualCollections };
          delete next[profileId];
          return { manualCollections: next };
        }),
    }),
    {
      name: 'manual-collection-storage',
    },
  ),
);
