'use client';

import type { BannerTable } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '@/lib/db';

function useIndexDB(profileId: string | null) {
  // only run a real query once we have a profileId
  const banners = useLiveQuery<BannerTable[]>(
    () =>
      profileId
        ? db.banners
            .where('profile')
            .equals(profileId)
            .toArray()
        : Promise.resolve([]),
    [profileId],
  );

  const isLoading = banners === undefined; // Dexie not loaded yet

  const getBannerById = (id: string) => {
    if (!banners || !profileId) {
      // still loading or no profile
      return null;
    }
    return banners.find(b => b.name === id) ?? null;
  };

  return {
    banners: banners ?? [], // always an array
    isLoading,
    getBannerById,
  };
}

export default useIndexDB;
