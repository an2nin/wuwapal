import type { BannerTable } from './index';
import { Dexie } from 'dexie';
import db from './index';

export async function saveBanner(banner: BannerTable) {
  await db.banners.put(banner);
}

export async function getBanner(profile: string, name: string): Promise<BannerTable | undefined> {
  return db.banners.get([profile, name]);
}

export async function getAllBannersForProfile(profile: string): Promise<BannerTable[]> {
  return db.banners.where('profile').equals(profile).toArray();
}

export async function updateBannerItems(profile: string, name: string, items: BannerTable['items']) {
  await db.banners.update([profile, name], { items });
}

export async function deleteBanner(profile: string, name: string) {
  await db.banners.delete([profile, name]);
}

export async function deleteAllBannersForProfile(profile: string) {
  await db.banners.where('profile').equals(profile).delete();
}

export async function clearAllBanners() {
  await db.banners.clear();
}

export async function resetDatabase() {
  try {
    db.close();
    await Dexie.delete('GachaDatabase'); // Deletes the entire DB including all tables
    await db.open(); // Re-initializes schema, creates empty tables
  }
  catch (err) {
    console.error('Failed to delete/reopen DB:', err);
    // Optionally: Show error to user, or rethrow
  }
}
