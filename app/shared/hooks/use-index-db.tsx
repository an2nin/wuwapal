'use client';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '@/core/db';

function useIndexDB(profileId: string) {
  const banners = useLiveQuery(() => db.banners.toArray(), []);

  const isLoading = banners === undefined; // Dexie not loaded yet

  const getBannerById = (id: string) => {
    if (!banners)
      return null; // Still loading

    const profileBanners = banners.filter(b => b.profile === profileId);
    return profileBanners.find(b => b.name === id) ?? null;
  };

  return {
    banners: banners ?? [], // so caller always gets an array
    isLoading,
    getBannerById,
  };
}

export default useIndexDB;
