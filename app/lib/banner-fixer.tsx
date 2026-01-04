import { useEffect, useRef } from 'react';
import db from '@/lib/db';
import { deleteBanner, saveBanner } from '@/lib/db/actions';
import { useLayoutStore } from '@/shared/stores/layout';

const LEGACY_BANNER_NAME = 'beginner_choice_convene';
const TARGET_BANNER_NAME = 'giveback_event';

export default function BannerFixer() {
  const hasHydrated = useLayoutStore(state => state.hasHydrated);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated || hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;

    const fixLegacyBanner = async () => {
      const legacyBanners = await db.banners
        .filter(banner => banner.name === LEGACY_BANNER_NAME)
        .toArray();

      if (legacyBanners.length === 0) {
        return;
      }

      await Promise.all(
        legacyBanners.map(async (banner) => {
          if (!banner.items || banner.items.length === 0) {
            await deleteBanner(banner.profile, LEGACY_BANNER_NAME);
            return;
          }

          await saveBanner({
            profile: banner.profile,
            name: TARGET_BANNER_NAME,
            items: banner.items,
          });
          await deleteBanner(banner.profile, LEGACY_BANNER_NAME);
        }),
      );
    };

    void fixLegacyBanner();
  }, [hasHydrated]);

  return null;
}
