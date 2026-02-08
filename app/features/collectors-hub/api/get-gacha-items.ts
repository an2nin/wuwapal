import type { Resonator, Weapon } from '@/data/types';
import { api } from '@/lib/api/client';
import { ELEMENT_NAMES } from '@/shared/constants/game/elements';
import { WEAPON_TYPE_NAMES } from '@/shared/constants/game/weapon-types';

const GACHA_ITEMS_URL = 'https://cdn.trackmypulls.com/data/wuwa-gacha-items.json';

interface CollectionResources {
  resonators: Record<string, Resonator>;
  weapons: Record<string, Weapon>;
}

interface GachaResonatorItem {
  icon: string;
  quality: number;
  element: string;
  weaponType: string;
}

interface GachaWeaponItem {
  icon: string;
  quality: number;
  weaponType: string;
}

interface GachaItemsPayload {
  resonators: Record<string, GachaResonatorItem>;
  weapons: Record<string, GachaWeaponItem>;
}

function normalizeElement(value: string | undefined): string | undefined {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) {
    return undefined;
  }

  return Object.values(ELEMENT_NAMES).find(item => item === normalized);
}

function normalizeWeaponType(value: string | undefined): string | undefined {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) {
    return undefined;
  }

  return Object.values(WEAPON_TYPE_NAMES).find(item => item === normalized);
}

export async function getGachaItemsResources(): Promise<CollectionResources> {
  const payload = await api.get<GachaItemsPayload>(GACHA_ITEMS_URL);

  const resonators = Object.fromEntries(
    Object.entries(payload.resonators ?? {})
      .filter(([, item]) => item && item.quality > 3)
      .map(([name, item]) => [
        name,
        {
          element: normalizeElement(item.element) ?? '',
          weapon: normalizeWeaponType(item.weaponType) ?? '',
          image: item.icon,
          quality: item.quality,
        } satisfies Resonator,
      ]),
  );

  const weapons = Object.fromEntries(
    Object.entries(payload.weapons ?? {})
      .filter(([, item]) => item && item.quality > 3)
      .map(([name, item]) => [
        name,
        {
          type: normalizeWeaponType(item.weaponType) ?? '',
          image: item.icon,
          quality: item.quality,
        } satisfies Weapon,
      ]),
  );

  return {
    resonators,
    weapons,
  };
}
