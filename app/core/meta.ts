import type { Metadata } from 'next';

interface MetaOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  keywords?: string[];
};

export function createMeta(options: MetaOptions = {}): Metadata {
  const {
    title = 'WuwaPal – Track WuWa Gacha Pity, Pull Logs & Stats Instantly',
    description =
    'Track your Wuthering Waves pity counter with up-to-date global statistics. Synchronize data across devices, share pulls with friends, and easily manage your account. Enhance your gaming experience now!',
    url = 'https://wuwapal.com',
    image = {
      url: 'https://wuwapal.com/wuwapal.png',
      width: 1200,
      height: 675,
      alt: 'TrackMyPulls: Track Gacha Pity, Pull Logs & Stats Instantly',
    },
    keywords = [
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
  } = options;

  return {
    title,
    description,
    applicationName: 'WuwaPal',
    authors: [{ name: 'an2nin', url: 'https://github.com/an2nin' }],
    generator: 'Next.js',
    keywords,
    referrer: 'origin-when-cross-origin',
    creator: 'an2nin',
    publisher: 'an2nin',
    robots: 'index, follow',
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'wuwapal.com',
      images: [image],
      locale: 'en-US',
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: '@an2nin',
      creator: '@an2nin',
      images: [image],
    },
  };
}
