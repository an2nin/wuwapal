import { Weapon } from ".";
import { WEAPON_IMAGE_PATH } from "../helpers/paths";
import { WEAPON_TYPE_NAMES, WEAPON_TYPES } from "./types";

const QUALITY = 3;

export const THREE_STAR_WEAPON_NAMES = {
    BROADBLADE_OF_NIGHT: "Broadblade of Night",
    BROADBLADE_OF_VOYAGER: "Broadblade of Voyager",
    GAUNTLETS_OF_NIGHT: "Gauntlets of Night",
    GAUNTLETS_OF_VOYAGER: "Gauntlets of Voyager",
    GUARDIAN_BROADBLADE: "Guardian Broadblade",
    GUARDIAN_GAUNTLETS: "Guardian Gauntlets",
    GUARDIAN_PISTOLS: "Guardian Pistols",
    GUARDIAN_RECTIFIER: "Guardian Rectifier",
    GUARDIAN_SWORD: "Guardian Sword",
    ORIGINITE_TYPE_I: "Originite: Type I",
    ORIGINITE_TYPE_II: "Originite: Type II",
    ORIGINITE_TYPE_III: "Originite: Type III",
    ORIGINITE_TYPE_IV: "Originite: Type IV",
    ORIGINITE_TYPE_V: "Originite: Type V",
    PISTOLS_OF_NIGHT: "Pistols of Night",
    PISTOLS_OF_VOYAGER: "Pistols of Voyager",
    RECTIFIER_OF_NIGHT: "Rectifier of Night",
    RECTIFIER_OF_VOYAGER: "Rectifier of Voyager",
    SWORD_OF_NIGHT: "Sword of Night",
    SWORD_OF_VOYAGER: "Sword of Voyager",
} as const;

export const THREE_STAR_WEAPONS = {
    [THREE_STAR_WEAPON_NAMES.BROADBLADE_OF_NIGHT]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/broadblade_of_night.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.BROADBLADE_OF_VOYAGER]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/broadblade_of_voyager.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.GAUNTLETS_OF_NIGHT]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/gauntlets_of_night.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.GAUNTLETS_OF_VOYAGER]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/gauntlets_of_voyager.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.GUARDIAN_BROADBLADE]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/guardian_broadblade.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.GUARDIAN_GAUNTLETS]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/guardian_gauntlets.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.GUARDIAN_PISTOLS]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/guardian_pistols.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.GUARDIAN_RECTIFIER]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/guardian_rectifier.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.GUARDIAN_SWORD]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/guardian_sword.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.ORIGINITE_TYPE_I]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/originite_type_i.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.ORIGINITE_TYPE_II]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/originite_type_ii.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.ORIGINITE_TYPE_III]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/originite_type_iii.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.ORIGINITE_TYPE_IV]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/originite_type_iv.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.ORIGINITE_TYPE_V]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/originite_type_v.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.PISTOLS_OF_NIGHT]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/pistols_of_night.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.PISTOLS_OF_VOYAGER]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/pistols_of_voyager.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.RECTIFIER_OF_NIGHT]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/rectifier_of_night.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.RECTIFIER_OF_VOYAGER]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/rectifier_of_voyager.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.SWORD_OF_NIGHT]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/sword_of_night.webp`,
        quality: QUALITY,
    },
    [THREE_STAR_WEAPON_NAMES.SWORD_OF_VOYAGER]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/sword_of_voyager.webp`,
        quality: QUALITY,
    },
} as Record<string, Weapon>;
