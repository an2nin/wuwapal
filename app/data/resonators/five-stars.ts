import type { Resonator } from '@/data/types';
import { ELEMENT_NAMES } from '@/shared/constants/game/elements';
import { WEAPON_TYPE_NAMES } from '@/shared/constants/game/weapon-types';

export const fiveStarResonatorDefinitions: Record<string, Omit<Resonator, 'image' | 'icon' | 'quality'>> = {
  'Augusta': { element: ELEMENT_NAMES.ELECTRO, weapon: WEAPON_TYPE_NAMES.BROADBLADE },
  'Brant': { element: ELEMENT_NAMES.FUSION, weapon: WEAPON_TYPE_NAMES.SWORD },
  'Calcharo': { element: ELEMENT_NAMES.ELECTRO, weapon: WEAPON_TYPE_NAMES.BROADBLADE },
  'Camellya': { element: ELEMENT_NAMES.HAVOC, weapon: WEAPON_TYPE_NAMES.SWORD },
  'Cantarella': { element: ELEMENT_NAMES.HAVOC, weapon: WEAPON_TYPE_NAMES.RECTIFIER },
  'Carlotta': { element: ELEMENT_NAMES.GLACIO, weapon: WEAPON_TYPE_NAMES.PISTOLS },
  'Cartethyia': { element: ELEMENT_NAMES.AERO, weapon: WEAPON_TYPE_NAMES.SWORD },
  'Changli': { element: ELEMENT_NAMES.FUSION, weapon: WEAPON_TYPE_NAMES.SWORD },
  'Ciaccona': { element: ELEMENT_NAMES.GLACIO, weapon: WEAPON_TYPE_NAMES.PISTOLS },
  'Encore': { element: ELEMENT_NAMES.FUSION, weapon: WEAPON_TYPE_NAMES.RECTIFIER },
  'Galbrena': { element: ELEMENT_NAMES.HAVOC, weapon: WEAPON_TYPE_NAMES.PISTOLS },
  'Iuno': { element: ELEMENT_NAMES.AERO, weapon: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Jianxin': { element: ELEMENT_NAMES.AERO, weapon: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Jinhsi': { element: ELEMENT_NAMES.SPECTRO, weapon: WEAPON_TYPE_NAMES.BROADBLADE },
  'Jiyan': { element: ELEMENT_NAMES.AERO, weapon: WEAPON_TYPE_NAMES.BROADBLADE },
  'Lingyang': { element: ELEMENT_NAMES.GLACIO, weapon: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Lupa': { element: ELEMENT_NAMES.FUSION, weapon: WEAPON_TYPE_NAMES.BROADBLADE },
  'Phrolova': { element: ELEMENT_NAMES.HAVOC, weapon: WEAPON_TYPE_NAMES.RECTIFIER },
  'Phoebe': { element: ELEMENT_NAMES.SPECTRO, weapon: WEAPON_TYPE_NAMES.RECTIFIER },
  'qiuyuan': { element: ELEMENT_NAMES.AERO, weapon: WEAPON_TYPE_NAMES.SWORD },
  'Roccia': { element: ELEMENT_NAMES.HAVOC, weapon: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Shorekeeper': { element: ELEMENT_NAMES.SPECTRO, weapon: WEAPON_TYPE_NAMES.RECTIFIER },
  'Verina': { element: ELEMENT_NAMES.SPECTRO, weapon: WEAPON_TYPE_NAMES.RECTIFIER },
  'Xiangli Yao': { element: ELEMENT_NAMES.ELECTRO, weapon: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Yinlin': { element: ELEMENT_NAMES.ELECTRO, weapon: WEAPON_TYPE_NAMES.RECTIFIER },
  'Zani': { element: ELEMENT_NAMES.SPECTRO, weapon: WEAPON_TYPE_NAMES.GAUNTLETS },
  'Zhezhi': { element: ELEMENT_NAMES.GLACIO, weapon: WEAPON_TYPE_NAMES.RECTIFIER },
};
