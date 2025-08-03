import { RESONATOR_IMAGE_PATH, WEAPON_IMAGE_PATH } from '@/shared/constants/game/paths';
import { toFileName } from '@/shared/utils';

export function toResonatorBase(name: string, quality: number) {
  return {
    image: `${RESONATOR_IMAGE_PATH}/${quality}/${toFileName(name)}.webp`,
    quality,
  };
}

export function toWeaponBase(name: string, quality: number) {
  return {
    image: `${WEAPON_IMAGE_PATH}/${quality}/${toFileName(name)}.webp`,
    quality,
  };
}
