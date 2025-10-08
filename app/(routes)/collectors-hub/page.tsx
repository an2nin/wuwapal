import type { Metadata } from 'next';
import CollectorsHub from '@/features/collectors-hub';
import PageHeader from '@/shared/components/page-header';

export async function generateMetadata(
): Promise<Metadata> {
  return {
    title: `Collectors Hub - Convene Tracker - Wuwa Pal`,
    description: `View your updated Wuthering Waves pull statistics and recent convenes. Use screenshot-ready dashboards to brag to your friends! Wuwa Tracker pity counter for Wuthering Waves with up-to-date data and global statistics. Share your pulls and track your account!`,
    keywords: [
      'wuthering wave collection',
      'wuthering wave collection tracker',
      'wuthering wave character',
      'wuthering wave character collection',
      'wuthering wave resonator collection',
      'wuthering wave weapon collection',

      'wuthering collection',
      'wuthering collection tracker',
      'wuthering character',
      'wuthering character collection',
      'wuthering resonator collection',
      'wuthering weapon collection',

      'wuwa collection',
      'wuwa collection tracker',
      'wuwa character',
      'wuwa character collection',
      'wuwa resonator collection',
      'wuwa weapon collection',
    ],
  };
}

export default function CollectorsHubPage() {
  return (
    <div>
      <PageHeader title="Collectors Hub" />
      <CollectorsHub />
    </div>
  );
}
