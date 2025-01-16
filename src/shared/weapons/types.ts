import { WEAPON_TYPE_IMAGE_PATH } from "../helpers/paths";

export const WEAPON_TYPE_NAMES = {
    BROADBLADE: "broadblade",
    SWORD: "sword",
    RECTIFIER: "rectifier",
    GAUNTLETS: "gauntlets",
    PISTOLS: "pistols",
} as const;

export const WEAPON_TYPES: any = {
    [WEAPON_TYPE_NAMES.BROADBLADE]: {
        image: `${WEAPON_TYPE_IMAGE_PATH}/broadblade.webp`,
    },
    [WEAPON_TYPE_NAMES.SWORD]: {
        image: `${WEAPON_TYPE_IMAGE_PATH}/sword.webp`,
    },
    [WEAPON_TYPE_NAMES.RECTIFIER]: {
        image: `${WEAPON_TYPE_IMAGE_PATH}/rectifier.webp`,
    },
    [WEAPON_TYPE_NAMES.GAUNTLETS]: {
        image: `${WEAPON_TYPE_IMAGE_PATH}/gauntlets.webp`,
    },
    [WEAPON_TYPE_NAMES.PISTOLS]: {
        image: `${WEAPON_TYPE_IMAGE_PATH}/pistols.webp`,
    },
};
