'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CollectionType = 'resonator' | 'weapon';

export interface ExternalCollectionItem {
  note: string;
  date: string;
}

export type ExternalCollectionEntry = ExternalCollectionItem[];

export interface ExternalCollectionCounts {
  resonators: Record<string, ExternalCollectionEntry>;
  weapons: Record<string, ExternalCollectionEntry>;
}

interface ExternalCollectionStore {
  externalCollections: Record<string, ExternalCollectionCounts>;
  setExternalCollections: (
    externalCollections: Record<string, ExternalCollectionCounts>,
  ) => void;
  addExternalCount: (
    profileId: string | null,
    type: CollectionType,
    name: string,
    count: number,
    note: string,
    date: string,
  ) => void;
  subtractExternalCount: (
    profileId: string | null,
    type: CollectionType,
    name: string,
    count: number,
  ) => void;
  deleteExternalEntry: (
    profileId: string | null,
    type: CollectionType,
    name: string,
    note: string,
    date: string,
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

function normalizeEntry(value:
  | number
  | ExternalCollectionEntry
  | {
    count?: number;
    notes?: (string | undefined)[];
    dates?: (string | undefined)[];
    note?: string;
    date?: string;
  }
  | undefined): ExternalCollectionEntry {
  if (typeof value === 'number') {
    return Array.from({ length: value }, () => ({ note: '', date: '' }));
  }

  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map(entry => ({
      note: entry.note?.trim() ?? '',
      date: entry.date?.trim() ?? '',
    }));
  }

  // Migrate legacy single note/date shape.
  const baseCount = value.count
    ?? value.notes?.length
    ?? value.dates?.length
    ?? (value.note || value.date ? 1 : 0);
  const notes = value.notes ?? (value.note ? Array.from({ length: baseCount }, () => value.note) : []);
  const dates = value.dates ?? (value.date ? Array.from({ length: baseCount }, () => value.date) : []);

  return Array.from({ length: baseCount }, (_, idx) => ({
    note: notes[idx]?.trim() ?? '',
    date: dates[idx]?.trim() ?? '',
  }));
}

function sanitizeMeta(value?: string) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function normalizeCollectionCounts(
  counts?: ExternalCollectionCounts,
): ExternalCollectionCounts {
  if (!counts) {
    return { resonators: {}, weapons: {} };
  }

  const resonators: Record<string, ExternalCollectionEntry> = {};
  const weapons: Record<string, ExternalCollectionEntry> = {};

  if (counts.resonators) {
    for (const [name, entry] of Object.entries(counts.resonators)) {
      resonators[name] = normalizeEntry(entry);
    }
  }

  if (counts.weapons) {
    for (const [name, entry] of Object.entries(counts.weapons)) {
      weapons[name] = normalizeEntry(entry);
    }
  }

  return { resonators, weapons };
}

export const useExternalCollectionStore = create<ExternalCollectionStore>()(
  persist(
    (set, get) => ({
      externalCollections: {},
      setExternalCollections: (externalCollections) => {
        const normalized: Record<string, ExternalCollectionCounts> = {};

        for (const [profileId, counts] of Object.entries(externalCollections)) {
          normalized[profileId] = normalizeCollectionCounts(counts);
        }

        set({ externalCollections: normalized });
      },
      addExternalCount: (profileId, type, name, count, note, date) => {
        const sanitizedNote = sanitizeMeta(note);
        const sanitizedDate = sanitizeMeta(date);

        if (!profileId || !name || count <= 0 || !sanitizedNote || !sanitizedDate) {
          return;
        }

        set((state) => {
          const existing = state.externalCollections[profileId]
            ?? emptyCollection;
          const targetKey = type === 'weapon' ? 'weapons' : 'resonators';
          const currentEntry = normalizeEntry(existing[targetKey][name]);

          const newEntries: ExternalCollectionEntry = Array.from(
            { length: count },
            () => ({ note: sanitizedNote, date: sanitizedDate }),
          );

          return {
            externalCollections: {
              ...state.externalCollections,
              [profileId]: {
                ...existing,
                [targetKey]: {
                  ...existing[targetKey],
                  [name]: [...currentEntry, ...newEntries],
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
          const currentEntry = normalizeEntry(existing[targetKey][name]);
          const trimmedEntries = currentEntry.slice(
            0,
            Math.max(0, currentEntry.length - count),
          );

          return {
            externalCollections: {
              ...state.externalCollections,
              [profileId]: {
                ...existing,
                [targetKey]: {
                  ...existing[targetKey],
                  [name]: trimmedEntries,
                },
              },
            },
          };
        });
      },
      deleteExternalEntry: (profileId, type, name, note, date) => {
        const sanitizedNote = sanitizeMeta(note);
        const sanitizedDate = sanitizeMeta(date);

        if (!profileId || !name || !sanitizedNote || !sanitizedDate) {
          return;
        }

        set((state) => {
          const existing = state.externalCollections[profileId]
            ?? emptyCollection;
          const targetKey = type === 'weapon' ? 'weapons' : 'resonators';
          const currentEntry = normalizeEntry(existing[targetKey][name]);

          // Find and remove the first entry that matches both note and date
          const filteredEntries = currentEntry.filter(
            entry => !(entry.note === sanitizedNote && entry.date === sanitizedDate),
          );

          // Only update if an entry was actually removed
          if (filteredEntries.length === currentEntry.length) {
            return state;
          }

          return {
            externalCollections: {
              ...state.externalCollections,
              [profileId]: {
                ...existing,
                [targetKey]: {
                  ...existing[targetKey],
                  [name]: filteredEntries,
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
