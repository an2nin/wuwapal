import type { Resonator, Weapon } from '@/data/types';
import { fiveStarResonatorDefinitions } from '@/data/resonators/five-stars';
import { fourStarResonatorDefinitions } from '@/data/resonators/four-stars';
import { toResonatorBase, toWeaponBase } from '@/data/utils';
import { fiveStarWeaponDefinitions } from '@/data/weapons/five-stars';
import { fourStarWeaponDefinitions } from '@/data/weapons/four-stars';
import { threeStarWeaponDefinitions } from '@/data/weapons/three-stars';

export const FIVE_STAR_RESONATORS: Record<string, Resonator> = Object.fromEntries(
  Object.entries(fiveStarResonatorDefinitions).map(([name, data]) => [
    name,
    { ...data, ...toResonatorBase(name, 5) },
  ]),
);

export const FOUR_STAR_RESONATORS: Record<string, Resonator> = Object.fromEntries(
  Object.entries(fourStarResonatorDefinitions).map(([name, data]) => [
    name,
    { ...data, ...toResonatorBase(name, 4) },
  ]),
);

export const RESONATORS: Record<string, Resonator> = {
  ...FIVE_STAR_RESONATORS,
  ...FOUR_STAR_RESONATORS,
};

export const FIVE_STAR_WEAPONS: Record<string, Weapon> = Object.fromEntries(
  Object.entries(fiveStarWeaponDefinitions).map(([name, data]) => [
    name,
    { ...data, ...toWeaponBase(name, 5) },
  ]),
);

export const FOUR_STAR_WEAPONS: Record<string, Weapon> = Object.fromEntries(
  Object.entries(fourStarWeaponDefinitions).map(([name, data]) => [
    name,
    { ...data, ...toWeaponBase(name, 4) },
  ]),
);

export const THREE_STAR_WEAPONS: Record<string, Weapon> = Object.fromEntries(
  Object.entries(threeStarWeaponDefinitions).map(([name, data]) => [
    name,
    { ...data, ...toWeaponBase(name, 3) },
  ]),
);

export const WEAPONS: Record<string, Weapon> = {
  ...FIVE_STAR_WEAPONS,
  ...FOUR_STAR_WEAPONS,
};

export const COMBINED: Record<string, Weapon | Resonator> = {
  ...WEAPONS,
  ...RESONATORS,
};
