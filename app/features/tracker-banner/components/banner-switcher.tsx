'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomDropdown from '@/shared/components/custom/custom-dropdown';
import { BANNERS } from '@/shared/constants/game/banners';

export default function BannerSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('id') || 'featured_resonator';

  return (
    <CustomDropdown
      options={Object.keys(BANNERS).map(key => ({ id: key, name: BANNERS[key].name }))}
      current={current}
      onSelect={id => router.push(`/convene/banner?id=${id}`)}
    />
  );
}
