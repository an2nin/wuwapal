import type { BannerTable } from './index';
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

export async function clearAllBanners() {
  await db.banners.clear();
}
