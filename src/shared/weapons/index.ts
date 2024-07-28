import { FIVE_STAR_WEAPONS } from "./five_stars";
import { FOUR_STAR_RESONATORS } from "./four_stars";
import { THREE_STAR_WEAPONS } from "./three_stars";


const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_URL || "";
const WEAPON_TYPE_IMAGE_PATH = `${IMAGE_PATH}/weapon-types`;

export const WEAPON_TYPES: any = {
    broadblade: {
        image: `${WEAPON_TYPE_IMAGE_PATH}/broadblade.webp`,
    },
    sword: {
        image: `${WEAPON_TYPE_IMAGE_PATH}/sword.webp`,
    },
    rectifier: {
        image: `${WEAPON_TYPE_IMAGE_PATH}/rectifier.webp`,
    },
    gauntlets: {
        image: `${WEAPON_TYPE_IMAGE_PATH}/gauntlets.webp`,
    },
    pistols: {
        image: `${WEAPON_TYPE_IMAGE_PATH}/pistols.webp`,
    },
};

export const WEAPONS_FOUR_AND_FIVE_STARS = {
    ...FIVE_STAR_WEAPONS,
    ...FOUR_STAR_RESONATORS,
}

export const WEAPONS = {
    ...FIVE_STAR_WEAPONS,
    ...FOUR_STAR_RESONATORS,
    ...THREE_STAR_WEAPONS,
}