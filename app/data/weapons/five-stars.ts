import type { Weapon } from '@/data/types';
import { WEAPON_TYPE_NAMES } from '@/shared/constants/game/weapon-types';

export const fiveStarWeaponDefinitions: Record<string, Omit<Weapon, 'image' | 'icon' | 'quality'>> = {
  'Abyss Surges': { type: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Ages of Harvest': { type: WEAPON_TYPE_NAMES.BROADBLADE },
  'Blazing Brilliance': { type: WEAPON_TYPE_NAMES.SWORD },
  'Blazing Justice': { type: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Cosmic Ripples': { type: WEAPON_TYPE_NAMES.RECTIFIER },
  'Defier\'s Thorn': { type: WEAPON_TYPE_NAMES.SWORD },
  'Emerald of Genesis': { type: WEAPON_TYPE_NAMES.SWORD },
  'Moongazer\'s Sigil': { type: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Lustrous Razor': { type: WEAPON_TYPE_NAMES.BROADBLADE },
  'Lux & Umbra': { type: WEAPON_TYPE_NAMES.PISTOLS },
  'Red Spring': { type: WEAPON_TYPE_NAMES.SWORD },
  'Rime-Draped Sprouts': { type: WEAPON_TYPE_NAMES.RECTIFIER },
  'Static Mist': { type: WEAPON_TYPE_NAMES.PISTOLS },
  'Stellar Symphony': { type: WEAPON_TYPE_NAMES.RECTIFIER },
  'Stringmaster': { type: WEAPON_TYPE_NAMES.RECTIFIER },
  'The Last Dance': { type: WEAPON_TYPE_NAMES.PISTOLS },
  'Tragicomedy': { type: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Unflickering Valor': { type: WEAPON_TYPE_NAMES.SWORD },
  'Verdant Summit': { type: WEAPON_TYPE_NAMES.BROADBLADE },
  'Verity\'s Handle': { type: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Luminous Hymn': { type: WEAPON_TYPE_NAMES.RECTIFIER },
  'Whispers of Sirens': { type: WEAPON_TYPE_NAMES.RECTIFIER },
  'Wildfire Mark': { type: WEAPON_TYPE_NAMES.BROADBLADE },
  'Woodland Aria': { type: WEAPON_TYPE_NAMES.PISTOLS },
};
