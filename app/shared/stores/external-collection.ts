'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CollectionType = 'resonator' | 'weapon';

export interface ExternalCollectionCounts {
  resonators: Record<string, number>;
  weapons: Record<string, number>;
}

interface ExternalCollectionStore {
  externalCollections: Record<string, ExternalCollectionCounts>;
  addExternalCount: (
    profileId: string | null,
    type: CollectionType,
    name: string,
    count: number,
  ) => void;
  subtractExternalCount: (
    profileId: string | null,
    type: CollectionType,
    name: string,
    count: number,
  ) => void;
  getCollectionForProfile: (
    profileId: string | null,
  ) => ExternalCollectionCounts;
  clearProfile: (profileId: string) => void;
}

const emptyCollection: ExternalCollectionCounts = {
  resonators: {},
  weapons: {},
};

export const useExternalCollectionStore = create<ExternalCollectionStore>()(
  persist(
    (set, get) => ({
      externalCollections: {},
      addExternalCount: (profileId, type, name, count) => {
        if (!profileId || !name || count <= 0) {
          return;
        }

        set((state) => {
          const existing = state.externalCollections[profileId]
            ?? emptyCollection;
          const targetKey = type === 'weapon' ? 'weapons' : 'resonators';

          return {
            externalCollections: {
              ...state.externalCollections,
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
      subtractExternalCount: (profileId, type, name, count) => {
        if (!profileId || !name || count <= 0) {
          return;
        }

        set((state) => {
          const existing = state.externalCollections[profileId]
            ?? emptyCollection;
          const targetKey = type === 'weapon' ? 'weapons' : 'resonators';
          const currentCount = existing[targetKey][name] ?? 0;
          const nextCount = Math.max(0, currentCount - count);

          return {
            externalCollections: {
              ...state.externalCollections,
              [profileId]: {
                ...existing,
                [targetKey]: {
                  ...existing[targetKey],
                  [name]: nextCount,
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

        return get().externalCollections[profileId] ?? emptyCollection;
      },
      clearProfile: profileId =>
        set((state) => {
          if (!state.externalCollections[profileId]) {
            return state;
          }

          const next = { ...state.externalCollections };
          delete next[profileId];
          return { externalCollections: next };
        }),
    }),
    {
      name: 'external-collection-storage',
    },
  ),
);
