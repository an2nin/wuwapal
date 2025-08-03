import type { BannerInfoList } from '@/shared/types';
import { SwordsIcon, VenetianMaskIcon } from 'lucide-react';
import { IMAGE_PATH } from './paths';

export const BannerStyles = {
  limited: {
    iconColor: 'from-purple-500 to-blue-500',
    bgColor: 'from-purple-500/20 to-blue-500/20',
    borderColor: 'border-purple-500/50',
  },
  permanent: {
    iconColor: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/50',
  },
} as const;

export const REGULAR_BANNERS: BannerInfoList = {
  featured_resonator: {
    id: 1,
    name: 'Featured Resonator',
    store_id: 'featured_resonator',
    image: `${IMAGE_PATH}/banners/featured-resonator.webp`,
    currency: 'radiant_tide',
    duration: 'limited',
    icon: VenetianMaskIcon,
    rate: 0.8,

  },
  featured_weapon: {
    id: 2,
    name: 'Featured Weapon',
    store_id: 'featured_weapon',
    image: `${IMAGE_PATH}/banners/featured-weapon.webp`,
    currency: 'forging_tide',
    duration: 'limited',
    icon: SwordsIcon,
    rate: 0.8,
  },
  standard_resonator: {
    id: 3,
    name: 'Standard Resonator',
    store_id: 'standard_resonator',
    image: `${IMAGE_PATH}/banners/standard-resonator.webp`,
    currency: 'lustrous_tide',
    duration: 'permanent',
    icon: VenetianMaskIcon,
    rate: 0.8,
  },
  standard_weapon: {
    id: 4,
    name: 'Standard Weapon',
    store_id: 'standard_weapon',
    image: `${IMAGE_PATH}/banners/standard-weapon.webp`,
    currency: 'lustrous_tide',
    duration: 'permanent',
    icon: SwordsIcon,
    rate: 0.8,
  },
};

export const SPECIAL_BANNERS: BannerInfoList = {
  beginner: {
    id: 5,
    name: 'Beginner',
    store_id: 'beginner',
    image: `${IMAGE_PATH}/banners/beginner.webp`,
    currency: 'lustrous_tide',
    duration: 'limited',
    icon: VenetianMaskIcon,
    rate: 0.8,
  },
  beginner_choice: {
    id: 6,
    name: 'Beginner Choice',
    store_id: 'beginner_choice',
    image: `${IMAGE_PATH}/banners/beginner-choice.webp`,
    currency: 'lustrous_tide',
    duration: 'limited',
    icon: VenetianMaskIcon,
    rate: 0.8,
  },
  giveback_event: {
    id: 7,
    name: 'Giveback Event',
    store_id: 'giveback_event',
    image: `${IMAGE_PATH}/banners/beginner-choice.webp`,
    currency: 'lustrous_tide',
    duration: 'limited',
    icon: VenetianMaskIcon,
    rate: 0.8,
  },
};

export const BANNERS: BannerInfoList = {
  ...REGULAR_BANNERS,
  ...SPECIAL_BANNERS,
};
