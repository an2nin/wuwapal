import type { Weapon } from '@/data/types';
import { WEAPON_TYPE_NAMES } from '@/shared/constants/game/weapon-types';

export const threeStarWeaponDefinitions: Record<string, Omit<Weapon, 'image' | 'icon' | 'quality'>> = {
  'Broadblade of Night': { type: WEAPON_TYPE_NAMES.BROADBLADE },
  'Broadblade of Voyager': { type: WEAPON_TYPE_NAMES.BROADBLADE },
  'Gauntlets of Night': { type: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Gauntlets of Voyager': { type: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Guardian Broadblade': { type: WEAPON_TYPE_NAMES.BROADBLADE },
  'Guardian Gauntlets': { type: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Guardian Pistols': { type: WEAPON_TYPE_NAMES.PISTOLS },
  'Guardian Rectifier': { type: WEAPON_TYPE_NAMES.RECTIFIER },
  'Guardian Sword': { type: WEAPON_TYPE_NAMES.SWORD },
  'Originite: Type I': { type: WEAPON_TYPE_NAMES.BROADBLADE },
  'Originite: Type II': { type: WEAPON_TYPE_NAMES.SWORD },
  'Originite: Type III': { type: WEAPON_TYPE_NAMES.PISTOLS },
  'Originite: Type IV': { type: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Originite: Type V': { type: WEAPON_TYPE_NAMES.RECTIFIER },
  'Pistols of Night': { type: WEAPON_TYPE_NAMES.PISTOLS },
  'Pistols of Voyager': { type: WEAPON_TYPE_NAMES.PISTOLS },
  'Rectifier of Night': { type: WEAPON_TYPE_NAMES.RECTIFIER },
  'Rectifier of Voyager': { type: WEAPON_TYPE_NAMES.RECTIFIER },
  'Sword of Night': { type: WEAPON_TYPE_NAMES.SWORD },
  'Sword of Voyager': { type: WEAPON_TYPE_NAMES.SWORD },
};
