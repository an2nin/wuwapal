import { FIVE_STAR_RESONATORS } from "./five_stars";
import { FOUR_STAR_RESONATORS } from "./four_stars";

const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_URL || "";
export const ELEMENT_IMAGE_PATH = `${IMAGE_PATH}/elements`;

export const STANDARD_RESONATORS: string[] = [
    "Calcharo",
    "Encore",
    "Jianxin",
    "Lingyang",
    "Verina",
];

export const ELEMENTS: any = {
    aero: {
        image: `${ELEMENT_IMAGE_PATH}/aero.webp`,
    },
    electro: {
        image: `${ELEMENT_IMAGE_PATH}/electro.webp`,
    },
    fusion: {
        image: `${ELEMENT_IMAGE_PATH}/fusion.webp`,
    },
    glacio: {
        image: `${ELEMENT_IMAGE_PATH}/glacio.webp`,
    },
    havoc: {
        image: `${ELEMENT_IMAGE_PATH}/havoc.webp`,
    },
    spectro: {
        image: `${ELEMENT_IMAGE_PATH}/spectro.webp`,
    },
};

export const RESONATORS = {
    ...FIVE_STAR_RESONATORS,
    ...FOUR_STAR_RESONATORS,
}