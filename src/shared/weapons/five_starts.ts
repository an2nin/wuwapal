const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export const WEAPON_IMAGE_PATH = `${IMAGE_PATH}/weapons`;

export const FIVE_STAR_WEAPONS: any = {
    "Abyss Surges": {
        type: "gauntlets",
        base_atk: 47,
        stat_name: "ATK",
        stat_amount: "8.10%",
        quality: 5,
        skill_desc:
            "Stormy Resolution: Increases Energy Regen by 12.8%. When hitting a target with Resonance Skill, increases Basic Attack DMG Bonus by 10%, lasting for 8s. When hitting a target with Basic Attacks, increases Resonance Skill DMG Bonus by 10%, lasting for 8s.",
        image: `${WEAPON_IMAGE_PATH}/abyss_surges.webp`,
    },
    "Ages of Harvest": {
        type: "broadblade",
        base_atk: 47,
        stat_name: "ATK",
        stat_amount: "8.10%",
        quality: 5,
        skill_desc:
            "Stormy Resolution: Increases Energy Regen by 12.8%. When hitting a target with Resonance Skill, increases Basic Attack DMG Bonus by 10%, lasting for 8s. When hitting a target with Basic Attacks, increases Resonance Skill DMG Bonus by 10%, lasting for 8s.",
        image: `${WEAPON_IMAGE_PATH}/ages_of_harvest.webp`,
    },
    "Cosmic Ripples": {
        type: "rectifier",
        base_atk: 40,
        stat_name: "ATK",
        stat_amount: "11.90%",
        quality: 5,
        skill_desc:
            "Stormy Resolution: Increases Energy Regen by 12.8%. When hitting a target with Basic Attack, increases Basic Attack DMG Bonus by 3.2%, stacking up to 5 time(s). This effect lasts for 8s and can be triggered 1 time(s) every 0.5s.",
        image: `${WEAPON_IMAGE_PATH}/cosmic_ripples.webp`,
    },
    "Emerald of Genesis": {
        type: "sword",
        base_atk: 47,
        stat_name: "Crit Rate",
        stat_amount: "5.40%",
        quality: 5,
        skill_desc:
            "Stormy Resolution: Increases Energy Regen by 12.8%. When Resonance Skill is released, increases ATK by 6%, stacking up to 2 time(s). This effect lasts for 10s.",
        image: `${WEAPON_IMAGE_PATH}/emerald_of_genesis.webp`,
    },
    "Lustrous Razor": {
        type: "broadblade",
        base_atk: 47,
        stat_name: "ATK",
        stat_amount: "8.10%",
        quality: 5,
        skill_desc:
            "Incision: Increases Energy Regen by 12.8%. When Resonance Skill is released, increases Resonance Liberation DMG by 7%, stacking up to 2 times. This effect lasts for 12s.",
        image: `${WEAPON_IMAGE_PATH}/lustrous_razor.webp`,
    },
    "Static Mist": {
        type: "pistols",
        base_atk: 47,
        stat_name: "Crit Rate",
        stat_amount: "5.40%",
        quality: 5,
        skill_desc:
            "Stormy Resolution: Increases Energy Regen by 12.8%. When Outro Skill is released, increases the switched-in Resonator's ATK by 10%, stacking up to 1 time(s). This effect lasts for 14s.",
        image: `${WEAPON_IMAGE_PATH}/static_mist.webp`,
    },
    Stringmaster: {
        type: "rectifier",
        base_atk: 40,
        stat_name: "Crit Rate",
        stat_amount: "8.00%",
        quality: 5,
        skill_desc:
            "Electric Amplification: Increases the DMG Bonus by 12%. When dealing Resonance Skill DMG, increases ATK by 12%, stacking up to 2. This effect lasts for 5s. When the equipped Resonator is not on the field, increases their ATK by an additional 12%.",
        image: `${WEAPON_IMAGE_PATH}/stringmaster.webp`,
    },
    "Verdant Summit": {
        type: "broadblade",
        base_atk: 47,
        stat_name: "Crit DMG",
        stat_amount: "10.80%",
        quality: 5,
        skill_desc:
            "Swordsworn: Increases the DMG Bonus of all Resonance Attributes by 12%. Every time Intro Skill or Resonance Liberation is cast, increases Heavy Attack DMG Bonus by 24%, stacking up to 2 time(s). This effect lasts for 14s.",
        image: `${WEAPON_IMAGE_PATH}/verdant_summit.webp`,
    },

};
