'use client';
import { useLayoutStore } from '@/shared/stores/layout';
import { cn } from '@/shared/utils/style';

export default function BannerSwitch() {
  const layoutStore = useLayoutStore(state => state);
  function handleToggle() {
    layoutStore.setShowAllBanners(!layoutStore.showAllBanners);
  }

  return (
    <div className="grid grid-cols-2 items-center border rounded-xl cursor-pointer">
      <div
        className={cn('p-2 text-center rounded-xl', layoutStore.showAllBanners ? 'bg-primary' : 'bg-card hover:bg-primary/20')}
        onClick={handleToggle}
      >
        All
      </div>
      <div
        className={cn('p-2 text-center rounded-xl', !layoutStore.showAllBanners ? 'bg-primary' : 'bg-card hover:bg-primary/20')}
        onClick={handleToggle}
      >
        Regular
      </div>
    </div>
  );
}
