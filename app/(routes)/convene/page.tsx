import type { Metadata } from 'next';
import TrackerSummary from '@/features/tracker-summary';
import BannerSwitch from '@/features/tracker-summary/components/banner-switch';
import PageHeader from '@/shared/components/page-header';

export async function generateMetadata(
): Promise<Metadata> {
  return {
    title: `Convene Tracker - Wuwa Pal`,
    description: `View your updated Wuthering Waves pull statistics and recent convenes. Use screenshot-ready dashboards to brag to your friends! Wuwa Tracker pity counter for Wuthering Waves with up-to-date data and global statistics. Share your pulls and track your account!`,
    keywords: [
      'wuthering wave convene tracker',
      'wuthering wave pull tracker',
      'wuwa tracker',
      'wuthering wave pity tracker',
      'wuthering wave',
      'wuwa pull tracker',
      'wuwa convene tracker',
      'wuwa pity tracker',
      'wuwa wish tracker',
    ],
  };
}

export default function ConvenePage() {
  return (
    <div>
      <PageHeader title="Your Pull Journey">
        <BannerSwitch />
      </PageHeader>
      <TrackerSummary />
    </div>
  );
}
