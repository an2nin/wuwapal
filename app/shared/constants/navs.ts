import {
  GlobeIcon,
  ImportIcon,
  LayoutDashboardIcon,
  SparklesIcon,
  SwordsIcon,
} from 'lucide-react';

export interface NavItem {
  title: string;
  path: string;
  match: string[];
  icon: any;
  visible?: boolean;
}

export interface Navs {
  [key: string]: NavItem[];
}

export const NAVS: Navs = {
  basic: [
    {
      title: 'Hub',
      path: '/',
      match: ['/'],
      icon: LayoutDashboardIcon,
      visible: true,
    },
    {
      title: 'Pulls',
      path: '/convene',
      match: ['/convene', '/convene/banner'],
      icon: SparklesIcon,
      visible: true,
    },
    {
      title: 'Global Stats',
      path: '/global-stats',
      match: ['/global-stats'],
      icon: GlobeIcon,
      visible: false,
    },
    {
      title: 'Collector\'s Hub',
      path: '/collectors-hub',
      match: ['/collectors-hub'],
      icon: SwordsIcon,
      visible: true,
    },
  ],
  extra: [
    {
      title: 'Import Pulls',
      path: '/convene/import',
      match: ['/convene/import'],
      icon: ImportIcon,
      visible: true,
    },
  ],
};
