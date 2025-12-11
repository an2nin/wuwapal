import type { Resonator } from '@/data/types';
import { ELEMENT_NAMES } from '@/shared/constants/game/elements';
import { WEAPON_TYPE_NAMES } from '@/shared/constants/game/weapon-types';

export const fourStarResonatorDefinitions: Record<string, Omit<Resonator, 'image' | 'icon' | 'quality'>> = {
  Aalto: { element: ELEMENT_NAMES.AERO, weapon: WEAPON_TYPE_NAMES.PISTOLS },
  Baizhi: { element: ELEMENT_NAMES.GLACIO, weapon: WEAPON_TYPE_NAMES.RECTIFIER },
  Buling: { element: ELEMENT_NAMES.ELECTRO, weapon: WEAPON_TYPE_NAMES.RECTIFIER },
  Chixia: { element: ELEMENT_NAMES.FUSION, weapon: WEAPON_TYPE_NAMES.PISTOLS },
  Danjin: { element: ELEMENT_NAMES.HAVOC, weapon: WEAPON_TYPE_NAMES.SWORD },
  Lumi: { element: ELEMENT_NAMES.ELECTRO, weapon: WEAPON_TYPE_NAMES.BROADBLADE },
  Mortefi: { element: ELEMENT_NAMES.FUSION, weapon: WEAPON_TYPE_NAMES.PISTOLS },
  Sanhua: { element: ELEMENT_NAMES.GLACIO, weapon: WEAPON_TYPE_NAMES.SWORD },
  Taoqi: { element: ELEMENT_NAMES.HAVOC, weapon: WEAPON_TYPE_NAMES.BROADBLADE },
  Yangyang: { element: ELEMENT_NAMES.AERO, weapon: WEAPON_TYPE_NAMES.SWORD },
  Youhu: { element: ELEMENT_NAMES.GLACIO, weapon: WEAPON_TYPE_NAMES.GAUNTLETS },
  Yuanwu: { element: ELEMENT_NAMES.ELECTRO, weapon: WEAPON_TYPE_NAMES.GAUNTLETS },
};
