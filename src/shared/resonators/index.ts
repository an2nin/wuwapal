import { FIVE_STAR_RESONATORS } from "./five_starts";
import { FOUR_STAR_RESONATORS } from "./four_stars";

export const STANDARD_RESONATORS: string[] = [
    "Calcharo",
    "Encore",
    "Jianxin",
    "Lingyang",
    "Verina",
];

export const RESONATORS = {
    ...FIVE_STAR_RESONATORS,
    ...FOUR_STAR_RESONATORS,
}