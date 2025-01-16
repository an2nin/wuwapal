import { Resonator } from ".";
import { RESONATOR_ICON_PATH, RESONATOR_IMAGE_PATH } from "../helpers/paths";
import { WEAPON_TYPE_NAMES } from "../weapons/types";
import { ELEMENT_NAMES } from "./elements";

const QUALITY = 4;

export const FOUR_STAR_RESONATOR_NAMES = {
    AALTO: "Aalto",
    BAIZHI: "Baizhi",
    CHIXIA: "Chixia",
    DANJIN: "Danjin",
    LUMI: "Lumi",
    MORTEFI: "Mortefi",
    SANHUA: "Sanhua",
    TAOQI: "Taoqi",
    YANGYANG: "Yangyang",
    YOUHU: "Youhu",
    YUANWU: "Yuanwu",
} as const;

export const FOUR_STAR_RESONATORS = {
    [FOUR_STAR_RESONATOR_NAMES.AALTO]: {
        element: ELEMENT_NAMES.AERO,
        weapon: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${RESONATOR_IMAGE_PATH}/aalto.webp`,
        icon: `${RESONATOR_ICON_PATH}/aalto.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_RESONATOR_NAMES.BAIZHI]: {
        element: ELEMENT_NAMES.GLACIO,
        weapon: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${RESONATOR_IMAGE_PATH}/baizhi.webp`,
        icon: `${RESONATOR_ICON_PATH}/baizhi.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_RESONATOR_NAMES.CHIXIA]: {
        element: ELEMENT_NAMES.FUSION,
        weapon: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${RESONATOR_IMAGE_PATH}/chixia.webp`,
        icon: `${RESONATOR_ICON_PATH}/chixia.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_RESONATOR_NAMES.DANJIN]: {
        element: ELEMENT_NAMES.HAVOC,
        weapon: WEAPON_TYPE_NAMES.SWORD,
        image: `${RESONATOR_IMAGE_PATH}/danjin.webp`,
        icon: `${RESONATOR_ICON_PATH}/danjin.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_RESONATOR_NAMES.LUMI]: {
        element: ELEMENT_NAMES.ELECTRO,
        weapon: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${RESONATOR_IMAGE_PATH}/lumi.webp`,
        icon: `${RESONATOR_ICON_PATH}/lumi.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_RESONATOR_NAMES.MORTEFI]: {
        element: ELEMENT_NAMES.FUSION,
        weapon: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${RESONATOR_IMAGE_PATH}/mortefi.webp`,
        icon: `${RESONATOR_ICON_PATH}/mortefi.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_RESONATOR_NAMES.SANHUA]: {
        element: ELEMENT_NAMES.GLACIO,
        weapon: WEAPON_TYPE_NAMES.SWORD,
        image: `${RESONATOR_IMAGE_PATH}/sanhua.webp`,
        icon: `${RESONATOR_ICON_PATH}/sanhua.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_RESONATOR_NAMES.TAOQI]: {
        element: ELEMENT_NAMES.HAVOC,
        weapon: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${RESONATOR_IMAGE_PATH}/taoqi.webp`,
        icon: `${RESONATOR_ICON_PATH}/taoqi.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_RESONATOR_NAMES.YANGYANG]: {
        element: ELEMENT_NAMES.AERO,
        weapon: WEAPON_TYPE_NAMES.SWORD,
        image: `${RESONATOR_IMAGE_PATH}/yangyang.webp`,
        icon: `${RESONATOR_ICON_PATH}/yangyang.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_RESONATOR_NAMES.YOUHU]: {
        element: ELEMENT_NAMES.GLACIO,
        weapon: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${RESONATOR_IMAGE_PATH}/youhu.webp`,
        icon: `${RESONATOR_ICON_PATH}/youhu.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_RESONATOR_NAMES.YUANWU]: {
        element: ELEMENT_NAMES.ELECTRO,
        weapon: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${RESONATOR_IMAGE_PATH}/yuanwu.webp`,
        icon: `${RESONATOR_ICON_PATH}/yuanwu.webp`,
        quality: QUALITY,
    },
} as Record<string, Resonator>;
