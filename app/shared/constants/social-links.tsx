import type { JSX } from 'react';
import { Discord, Github, Reddit, Twitter } from '@/shared/components/custom-icons';

interface SocialLink {
  icon: JSX.Element;
  icon_big: JSX.Element;
  title: string;
  path: string;
  srOnly: string;
}

interface SocialLinksObj {
  [key: string]: SocialLink;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    title: 'Discord',
    path: 'https://discord.gg/DFKG4nqUD4',
    icon: <Discord className="w-5 h-5" />,
    icon_big: <Discord className="w-10 h-10" />,
    srOnly: 'Discord community',
  },
  {
    title: 'Github',
    path: 'https://github.com/antonin686/wuwapal',
    icon: <Github className="w-5 h-5" />,
    icon_big: <Github className="w-10 h-10" />,
    srOnly: 'GitHub',
  },
  {
    title: 'Twitter',
    path: 'https://x.com/wuwapal',
    icon: <Twitter className="w-5 h-5" />,
    icon_big: <Twitter className="w-10 h-10" />,
    srOnly: 'Twitter page',
  },
  {
    title: 'Reddit',
    path: 'https://www.reddit.com/r/wuwapal/',
    icon: <Reddit className="w-5 h-5" />,
    icon_big: <Reddit className="w-10 h-10" />,
    srOnly: 'Reddit page',
  },
];

export const SOCIAL_LINKS_OBJ: SocialLinksObj = {
  discord: {
    title: 'Discord',
    path: 'https://discord.gg/DFKG4nqUD4',
    icon: <Discord className="w-5 h-5" />,
    icon_big: <Discord className="w-10 h-10" />,
    srOnly: 'Discord community',
  },
  twitter: {
    title: 'Twitter',
    path: 'https://x.com/wuwapal',
    icon: <Twitter className="w-5 h-5" />,
    icon_big: <Twitter className="w-10 h-10" />,
    srOnly: 'Twitter page',
  },
  reddit: {
    title: 'Reddit',
    path: 'https://www.reddit.com/r/wuwapal/',
    icon: <Reddit className="w-5 h-5" />,
    icon_big: <Reddit className="w-10 h-10" />,
    srOnly: 'Reddit page',
  },
  github: {
    title: 'Github',
    path: 'https://github.com/antonin686/wuwapal',
    icon: <Github className="w-5 h-5" />,
    icon_big: <Github className="w-10 h-10" />,
    srOnly: 'GitHub',
  },
};
