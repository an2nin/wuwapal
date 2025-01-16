import { FIVE_STAR_RESONATOR_NAMES, FIVE_STAR_RESONATORS } from "./five_stars";
import { FOUR_STAR_RESONATORS } from "./four_stars";

export type Resonator = {
    element: string;
    weapon: string;
    image: string;
    icon: string;
    quality: number;
};

export const FIVE_STAR_QUALITY = 5;
export const FOUR_STAR_QUALITY = 4;

export const STANDARD_RESONATORS: string[] = [
    FIVE_STAR_RESONATOR_NAMES.CALCHARO,
    FIVE_STAR_RESONATOR_NAMES.ENCORE,
    FIVE_STAR_RESONATOR_NAMES.JIANXIN,
    FIVE_STAR_RESONATOR_NAMES.LINGYANG,
    FIVE_STAR_RESONATOR_NAMES.VERINA,
];

export const RESONATORS = {
    ...FIVE_STAR_RESONATORS,
    ...FOUR_STAR_RESONATORS,
};

export const RESONATOR_NAMES = {
    ...FIVE_STAR_RESONATOR_NAMES,
    ...FOUR_STAR_RESONATORS,
};
    
