import { Weapon } from ".";
import { WEAPON_IMAGE_PATH } from "../helpers/paths";
import { WEAPON_TYPE_NAMES } from "./types";

const QUALITY = 5;

export const FOUR_STAR_WEAPON_NAMES = {
    AMITY_ACCORD: "Amity Accord",
    AUGMENT: "Augment",
    AUTUMNTRACE: "Autumntrace",
    BROADBLADE_41: "Broadblade#41",
    CADENZA: "Cadenza",
    CELESTIAL_SPIRAL: "Celestial Spiral",
    COMMANDO_OF_CONVICTION: "Commando of Conviction",
    COMET_FLARE: "Comet Flare",
    DAUNTLESS_EVERNIGHT: "Dauntless Evernight",
    DISCORD: "Discord",
    ENDLESS_COLLAPSE: "Endless Collapse",
    FUSION_ACCRETION: "Fusion Accretion",
    GAUNTLETS_21D: "Gauntlets#21D",
    HELIOS_CLEAVER: "Helios Cleaver",
    HOLLOW_MIRAGE: "Hollow Mirage",
    JINZHOU_KEEPER: "Jinzhou Keeper",
    LUMINGLOSS: "Lumingloss",
    LUNAR_CUTTER: "Lunar Cutter",
    MARCATO: "Marcato",
    NOVABURST: "Novaburst",
    OVERTURE: "Overture",
    PISTOLS_26: "Pistols#26",
    RECTIFIER_25: "Rectifier#25",
    RELATIVISTIC_JET: "Relativistic Jet",
    SCALE_SLASHER: "Scale Slasher",
    STONARD: "Stonard",
    SWORD_18: "Sword#18",
    THUNDERBOLT: "Thunderbolt",
    UNDYING_FLAME: "Undying Flame",
    VARIATION: "Variation",
    WANING_REDSHIFT: "Waning Redshift",
} as const;

export const FOUR_STAR_WEAPONS = {
    [FOUR_STAR_WEAPON_NAMES.AMITY_ACCORD]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/amity_accord.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.AUGMENT]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/augment.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.AUTUMNTRACE]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/autumntrace.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.BROADBLADE_41]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/broadblade41.webp`,
        quality: QUALITY,
        crafted: true,
    },
    [FOUR_STAR_WEAPON_NAMES.CADENZA]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/cadenza.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.CELESTIAL_SPIRAL]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/celestial_spiral.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.COMMANDO_OF_CONVICTION]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/commando_of_conviction.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.COMET_FLARE]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/comet_flare.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.DAUNTLESS_EVERNIGHT]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/dauntless_evernight.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.DISCORD]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/discord.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.ENDLESS_COLLAPSE]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/endless_collapse.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.FUSION_ACCRETION]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/fusion_accretion.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.GAUNTLETS_21D]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/gauntlets21d.webp`,
        quality: QUALITY,
        crafted: true,
    },
    [FOUR_STAR_WEAPON_NAMES.HELIOS_CLEAVER]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/helios_cleaver.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.HOLLOW_MIRAGE]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/hollow_mirage.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.JINZHOU_KEEPER]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/jinzhou_keeper.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.LUMINGLOSS]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/lumingloss.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.LUNAR_CUTTER]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/lunar_cutter.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.MARCATO]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/marcato.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.NOVABURST]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/novaburst.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.OVERTURE]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/overture.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.PISTOLS_26]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/pistols26.webp`,
        quality: QUALITY,
        crafted: true,
    },
    [FOUR_STAR_WEAPON_NAMES.RECTIFIER_25]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/rectifier25.webp`,
        quality: QUALITY,
        crafted: true,
    },
    [FOUR_STAR_WEAPON_NAMES.RELATIVISTIC_JET]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/relativistic_jet.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.SCALE_SLASHER]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/scale_slasher.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.STONARD]: {
        type: WEAPON_TYPE_NAMES.GAUNTLETS,
        image: `${WEAPON_IMAGE_PATH}/stonard.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.SWORD_18]: {
        type: WEAPON_TYPE_NAMES.SWORD,
        image: `${WEAPON_IMAGE_PATH}/sword18.webp`,
        quality: QUALITY,
        crafted: true,
    },
    [FOUR_STAR_WEAPON_NAMES.THUNDERBOLT]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/thunderbolt.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.UNDYING_FLAME]: {
        type: WEAPON_TYPE_NAMES.PISTOLS,
        image: `${WEAPON_IMAGE_PATH}/undying_flame.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.VARIATION]: {
        type: WEAPON_TYPE_NAMES.RECTIFIER,
        image: `${WEAPON_IMAGE_PATH}/variation.webp`,
        quality: QUALITY,
    },
    [FOUR_STAR_WEAPON_NAMES.WANING_REDSHIFT]: {
        type: WEAPON_TYPE_NAMES.BROADBLADE,
        image: `${WEAPON_IMAGE_PATH}/waning_redshift.webp`,
        quality: QUALITY,
    },
} as Record<string, Weapon>;
