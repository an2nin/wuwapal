const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export const WEAPON_IMAGE_PATH = `${IMAGE_PATH}/weapons`;

export const FOUR_STAR_RESONATORS: any = {
    "Amity Accord": {
        type: "gauntlets",
        baseATK: 27,
        stat_name: "DEF",
        stat_amount: "13.60%",
        skill_name: "Camaraderie",
        quality: 4,
        skill_desc:
            "When Intro Skill is released, increases Resonance Liberation DMG Bonus by 20%, lasting for 15s.",
        image: `${WEAPON_IMAGE_PATH}/amity_accord.webp`,
    },
    Augment: {
        type: "rectifier",
        baseATK: 33,
        stat_name: "Crit Rate",
        stat_amount: "4.50%",
        quality: 4,
        skill_name: "Forgiving Resilience",
        skill_desc:
            "When Resonance Liberation is released, increases the caster's ATK by 15%, lasting for 15s.",
        image: `${WEAPON_IMAGE_PATH}/augment.webp`,
    },
    Autumntrace: {
        type: "broadblade",
        baseATK: 33,
        stat_name: "Crit Rate",
        stat_amount: "4.50%",
        quality: 4,
        skill_name: "Edge Direction",
        skill_desc:
            "Increases ATK by 4% upon dealing Basic Attack DMG or Heavy Attack DMG, stacking up to 5 time(s). This effect lasts for 7s and can be triggered 1 time(s) every 1s.",
        image: `${WEAPON_IMAGE_PATH}/autumntrace.webp`,
    },
    "Broadblade#41": {
        type: "broadblade",
        baseATK: 33,
        stat_name: "Energy Regen",
        stat_amount: "7.20%",
        quality: 4,
        skill_name: "Veteran",
        skill_desc:
            "When the Resonator's HP is above 80%, increases ATK by 12%. When the Resonator's HP is below 40%, restores theri HP by 5% for dealing Basic Attack DMG or Heavy Attack DMG. This effect can be triggered 1 time(s) every 8s.",
        image: `${WEAPON_IMAGE_PATH}/broadblade41.webp`,
    },
    Cadenza: {
        type: "pistols",
        baseATK: 27,
        stat_name: "Energy Regen",
        stat_amount: "11.50%",
        quality: 4,
        skill_name: "Ceaseless Aria",
        skill_desc:
            "When Resonance Skill is released, restores Resonance Energy by 8. This effect can be triggered 1 time(s) every 20s.",
        image: `${WEAPON_IMAGE_PATH}/cadenza.webp`,
    },
    "Celestial Spiral": {
        type: "gauntlets",
        baseATK: 27,
        stat_name: "Energy Regen",
        stat_amount: "11.50%",
        quality: 4,
        skill_name: "Ceaseless Aria",
        skill_desc:
            "When Resonance Skill is released, restores Resonance Energy by 8. This effect can be triggered 1 time(s) every 20s.",
        image: `${WEAPON_IMAGE_PATH}/celestial_spiral.webp`,
    },
    "Commando of Conviction": {
        type: "sword",
        baseATK: 33,
        stat_name: "ATK",
        stat_amount: "6.70%",
        quality: 4,
        skill_name: "Unyielding",
        skill_desc:
            "When Intro Skill is released, increases ATK by 15%, lasting for 15s.",
        image: `${WEAPON_IMAGE_PATH}/commando_of_conviction.webp`,
    },
    "Comet Flare": {
        type: "rectifier",
        baseATK: 33,
        stat_name: "HP",
        stat_amount: "6.70%",
        quality: 4,
        skill_name: "Luminous Protection",
        skill_desc:
            "When hitting a target with Basic Attacks or Heavy Attacks, increases Healing Bonus by 3%, stacking up to 3 time(s). This effect lasts for 8s and can be triggered 1 time(s) every 0.6s.",
        image: `${WEAPON_IMAGE_PATH}/comet_flare.webp`,
    },
    "Dauntless Evernight": {
        type: "broadblade",
        baseATK: 27,
        stat_name: "DEF",
        stat_amount: "13.60%",
        quality: 4,
        skill_name: "Battlebound",
        skill_desc:
            "When Intro Skill is released, increases ATK by 8% and DEF by 15%, lasting for 15s.",
        image: `${WEAPON_IMAGE_PATH}/dauntless_evernight.webp`,
    },
    Discord: {
        type: "broadblade",
        baseATK: 27,
        stat_name: "Energy Regen",
        stat_amount: "11.50%",
        quality: 4,
        skill_name: "Ceaseless Aria",
        skill_desc:
            "When Resonance Skill is released, restore Concerto Energy by 8. This effect can be triggered 1 time every 20s.",
        image: `${WEAPON_IMAGE_PATH}/discord.webp`,
    },
    "Endless Collapse": {
        type: "sword",
        baseATK: 27,
        stat_name: "Energy Regen",
        stat_amount: "11.50%",
        quality: 4,
        skill_name: "Ceaseless Aria",
        skill_desc:
            "When Resonance Skill is released, restores Resonance Energy by 8. This effect can be triggered 1 time(s) every 20s.",
        image: `${WEAPON_IMAGE_PATH}/endless_collapse.webp`,
    },
    "Fusion Accretion": {
        type: "rectifier",
        baseATK: 33,
        stat_name: "Energy Regen",
        stat_amount: "6.75%",
        quality: 4,
        skill_name: "Ever-Changing",
        skill_desc:
            "When the Resonator dashes or dodges, increases ATK by 4%, stacking up to 3 time(s). This effect lasts for 8s.",
        image: `${WEAPON_IMAGE_PATH}/fusion_accretion.webp`,
    },
    "Gauntlets#21D": {
        type: "gauntlets",
        baseATK: 31,
        stat_name: "Energy Regen",
        stat_amount: "8.60%",
        quality: 4,
        skill_name: "Mastermind",
        skill_desc:
            "When the Resonator dashes or dodges, increases ATK by 8%. Increases Counter Attack DMG by 50%, lasting for 8s. When Counter Attack is performed, restores the Resonator's HP by 5%. This effect can be triggered 1 time(s) every 6s.",
        image: `${WEAPON_IMAGE_PATH}/gauntlets21d.webp`,
    },
    "Helios Cleaver": {
        type: "broadblade",
        baseATK: 33,
        stat_name: "ATK",
        stat_amount: "6.70%",
        quality: 4,
        skill_name: "Plasma Recoiler",
        skill_desc:
            "Within 12s after Resonance Skill is released, increases ATK by 3% every 2s stacking up to 4 time(s). When the number of stacks reaches 12, all stacks will be reset within 1s.",
        image: `${WEAPON_IMAGE_PATH}/helios_cleaver.webp`,
    },
    "Hollow Mirage": {
        type: "gauntlets",
        baseATK: 33,
        stat_name: "ATK",
        stat_amount: "6.70%",
        quality: 4,
        skill_name: "Celestial Being",
        skill_desc:
            "When Resonance Liberation is released, grants 3 stack(s) of Iron Armor. Each stack increases ATK and DEF by 3%, stacking up to 3 time(s). When the Resonator takes damage, reduces the number of stacks by 1.",
        image: `${WEAPON_IMAGE_PATH}/hollow_mirage.webp`,
    },
    "Jinzhou Keeper": {
        type: "rectifier",
        baseATK: 31,
        stat_name: "ATK",
        stat_amount: "8.10%",
        quality: 4,
        skill_name: "Guardian",
        skill_desc:
            "When Intro Skill is released, increases the caster's ATK by 8% and HP by 10%, lasting 15s.",
        image: `${WEAPON_IMAGE_PATH}/jinzhou_keeper.webp`,
    },
    Lumingloss: {
        type: "sword",
        baseATK: 31,
        stat_name: "ATK",
        stat_amount: "8.10%",
        quality: 4,
        skill_name: "Pale Gale",
        skill_desc:
            "When Resonance Skill is released, increases Basic Attack DMG and Heavy Attack DMG by 20%, stacking up to 1 time(s). This effect lasts for 10s and can be triggered 1 time(s) every 1s.",
        image: `${WEAPON_IMAGE_PATH}/lumingloss.webp`,
    },
    "Lunar Cutter": {
        type: "sword",
        baseATK: 33,
        stat_name: "ATK",
        stat_amount: "6.70%",
        quality: 4,
        skill_name: "Preordained",
        skill_desc:
            "Equipped Resonator gains 6 stack(s) of Oath upon entering the battlefield. Each stack icnreases ATK by 2%, up to 6 stacks. This effect can be triggered 1 time(s) every 12s. Oath reduces by 1 stack(s) every 2s. Equipped Resonator gains another 6 stack(s) of Oath upon defeating an enemy.",
        image: `${WEAPON_IMAGE_PATH}/lunar_cutter.webp`,
    },
    Marcato: {
        type: "gauntlets",
        baseATK: 27,
        stat_name: "Energy Regen",
        stat_amount: "11.50%",
        quality: 4,
        skill_name: "Ceaseless Aria",
        skill_desc:
            "When Resonance Skill is released, restores Resonance Energy by 8. This effect can be triggered 1 time(s) every 20s.",
        image: `${WEAPON_IMAGE_PATH}/marcato.webp`,
    },
    Novaburst: {
        type: "pistols",
        baseATK: 33,
        stat_name: "ATK",
        stat_amount: "6.75%",
        quality: 4,
        skill_name: "Ever-Changing",
        skill_desc:
            "When the Resonator dashes or dodges, increases ATK by 4%, stacking up to 3 time(s). This effect lasts for 8s.",
        image: `${WEAPON_IMAGE_PATH}/novaburst.webp`,
    },
    Overture: {
        type: "sword",
        baseATK: 33,
        stat_name: "ATK",
        stat_amount: "6.75%",
        quality: 4,
        skill_name: "Ever-Changing",
        skill_desc:
            "When the Resonator dashes or dodges, increases ATK by 4%, stacking up to 3 time(s). This effect lasts for 8s.",
        image: `${WEAPON_IMAGE_PATH}/overture.webp`,
    },
    "Pistols#26": {
        type: "pistols",
        baseATK: 31,
        stat_name: "ATK",
        stat_amount: "8.10%",
        quality: 4,
        skill_name: "Omniscient",
        skill_desc:
            "When the Resonator takes no damage, increases ATK by 6% every 5s, stacking up to 2 time(s). This effect lasts for 8s. When the Resonator takes damage, reduces the number of stacks by 1 and restores their HP by 5%.",
        image: `${WEAPON_IMAGE_PATH}/pistols26.webp`,
    },
    "Rectifier#25": {
        type: "rectifier",
        baseATK: 27,
        stat_name: "Energy Regen",
        stat_amount: "11.50%",
        quality: 4,
        skill_name: "Dawnbringer",
        skill_desc:
            "When Resonance Skill is released, if the Resonator's HP is below 60%, restores their HP by 5%. This effect can be triggered 1 time(s) every 8s; if the Resonator's HP is above 60%.",
        image: `${WEAPON_IMAGE_PATH}/rectifier25.webp`,
    },
    "Relativistic Jet": {
        type: "pistols",
        baseATK: 33,
        stat_name: "ATK",
        stat_amount: "6.75%",
        quality: 4,
        skill_name: "Ever-Changing",
        skill_desc:
            "When the Resonator dashes or dodges, increases ATK by 4%, stacking up to 3 time(s). This effect lasts for 8s.",
        image: `${WEAPON_IMAGE_PATH}/relativistic_jet.webp`,
    },
    "Scale: Slasher": {
        type: "sword",
        baseATK: 27,
        stat_name: "Energy Regen",
        stat_amount: "11.50%",
        quality: 4,
        skill_name: "Ceaseless Aria",
        skill_desc:
            "When Resonance Skill is released, restores Resonance Energy by 8. This effect can be triggered 1 time(s) every 20s.",
        image: `${WEAPON_IMAGE_PATH}/scale_slasher.webp`,
    },
    Stonard: {
        type: "gauntlets",
        baseATK: 33,
        stat_name: "Crit Rate",
        stat_amount: "4.50%",
        quality: 4,
        skill_name: "Wallbreaker",
        skill_desc:
            "When Resonance Skill is released, increases the caster's Resonance Liberation DMG Bonus by 18%, lasting for 15s.",
        image: `${WEAPON_IMAGE_PATH}/stonard.webp`,
    },
    "Sword#18": {
        type: "sword",
        baseATK: 31,
        stat_name: "ATK",
        stat_amount: "8.10%",
        quality: 4,
        skill_name: "Daybreak",
        skill_desc:
            "When Equipped Resonator's HP drops below 40%, increases Heavy Attack DMG by 18% and restores HP by 5% upon dealing Heavy Attack DMG. This effect can be triggered 1 time(s) every 8s.",
        image: `${WEAPON_IMAGE_PATH}/sword18.webp`,
    },
    Thunderbolt: {
        type: "pistols",
        baseATK: 31,
        stat_name: "ATK",
        stat_amount: "8.10%",
        quality: 4,
        skill_name: "Unstoppable",
        skill_desc:
            "When hitting a target with Basic Attacks or Heavy Attacks, increases Resonance Skill DMG Bonus by 7%, stacking up to 3 time(s). This effect lasts for 10s and can be triggered 1 time(s) every 1s.",
        image: `${WEAPON_IMAGE_PATH}/thunderbolt.webp`,
    },
    "Undying Flame": {
        type: "pistols",
        baseATK: 33,
        stat_name: "ATK",
        stat_amount: "6.70%",
        quality: 4,
        skill_name: "Loyalty",
        skill_desc:
            "When Intro Skill is released, increases Resonance Skill DMG Bonus by 20% for 15s.",
        image: `${WEAPON_IMAGE_PATH}/undying_flame.webp`,
    },
    Variation: {
        type: "rectifier",
        baseATK: 27,
        stat_name: "Energy Regen",
        stat_amount: "11.50%",
        quality: 4,
        skill_name: "Ceaseless Aria",
        skill_desc:
            "When Resonance Skill is released, restores Resonance Energy by 8. This effect can be triggered 1 time(s) every 20s.",
        image: `${WEAPON_IMAGE_PATH}/variation.webp`,
    },
    "Waning Redshift": {
        type: "broadblade",
        baseATK: 27,
        stat_name: "Energy Regen",
        stat_amount: "11.50%",
        quality: 4,
        skill_name: "Ceaseless Aria",
        skill_desc:
            "When Resonance Skill is released, restores Resonance Energy by 8. This effect can be triggered 1 time(s) every 20s.",
        image: `${WEAPON_IMAGE_PATH}/waning_redshift.webp`,
    }
};
