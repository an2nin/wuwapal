import { FIVE_STAR_WEAPON_NAMES, FIVE_STAR_WEAPONS } from "./five_stars";
import { FOUR_STAR_WEAPON_NAMES, FOUR_STAR_WEAPONS } from "./four_stars";
import { THREE_STAR_WEAPONS, THREE_STAR_WEAPON_NAMES } from "./three_stars";

export type Weapon = {
    type: string;
    icon?: string;
    image: string;
    crafted?: boolean;
    quality: number;
};

export const WEAPONS_FOUR_AND_FIVE_STARS = {
    ...FIVE_STAR_WEAPONS,
    ...FOUR_STAR_WEAPONS,
};

export const WEAPON_NAMES = {
    ...FIVE_STAR_WEAPON_NAMES,
    ...FOUR_STAR_WEAPON_NAMES,
    ...THREE_STAR_WEAPON_NAMES,
};

export const WEAPONS = {
    ...FIVE_STAR_WEAPONS,
    ...FOUR_STAR_WEAPONS,
    ...THREE_STAR_WEAPONS,
};
