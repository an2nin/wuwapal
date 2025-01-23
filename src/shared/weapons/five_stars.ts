import { Weapon } from ".";
import { WEAPON_IMAGE_PATH } from "../helpers/paths";
import { WEAPON_TYPE_NAMES } from "./types";

const QUALITY = 5;

export const FIVE_STAR_WEAPON_NAMES = {
    ABYSS_SURGES: "Abyss Surges",
    AGES_OF_HARVEST: "Ages of Harvest",
    BLAZING_BRILLIANCE: "Blazing Brilliance",
    COSMIC_RIPPLES: "Cosmic Ripples",
    EMERALD_OF_GENESIS: "Emerald of Genesis",
    LUSTROUS_RAZOR: "Lustrous Razor",
    RED_SPRING: "Red Spring",
    RIME_DRAPED_SPROUTS: "Rime-Draped Sprouts",
    STATIC_MIST: "Static Mist",
    STELLAR_SYMPHONY: "Stellar Symphony",
    STRINGMASTER: "Stringmaster",
    THE_LAST_DANCE: "The Last Dance",
    TRAGICOMEDY: "Tragicomedy",
    VERDANT_SUMMIT: "Verdant Summit",
    VERITYS_HANDLE: "Verity's Handle",
} as const;

export const FIVE_STAR_WEAPONS = {
    [FIVE_STAR_WEAPON_NAMES.ABYSS_SURGES]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/abyss_surges.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.AGES_OF_HARVEST]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/ages_of_harvest.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.BLAZING_BRILLIANCE]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/blazing_brilliance.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.COSMIC_RIPPLES]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/cosmic_ripples.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.EMERALD_OF_GENESIS]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/emerald_of_genesis.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.LUSTROUS_RAZOR]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/lustrous_razor.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.RED_SPRING]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/red_spring.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.RIME_DRAPED_SPROUTS]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/rime-draped_sprouts.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.STATIC_MIST]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/static_mist.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.STELLAR_SYMPHONY]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/stellar_symphony.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.STRINGMASTER]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/stringmaster.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.THE_LAST_DANCE]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/the_last_dance.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.TRAGICOMEDY]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/tragicomedy.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.VERDANT_SUMMIT]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/verdant_summit.webp`,
        quality: QUALITY,
    },
    [FIVE_STAR_WEAPON_NAMES.VERITYS_HANDLE]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/veritys_handle.webp`,
        quality: QUALITY,
    },
} as Record<string, Weapon>;

