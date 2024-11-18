const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export const RESONATOR_IMAGE_PATH = `${IMAGE_PATH}/resonators/portraits-short`;
export const RESONATOR_ICON_PATH = `${IMAGE_PATH}/resonators/icons`;

export const FOUR_STAR_RESONATORS: any = {
    Aalto: {
        element: "aero",
        weapon: "pistols",
        image: `${RESONATOR_IMAGE_PATH}/aalto.webp`,
        icon: `${RESONATOR_ICON_PATH}/aalto.webp`,
        quality: 4,
    },
    Baizhi: {
        element: "glacio",
        weapon: "rectifier",
        image: `${RESONATOR_IMAGE_PATH}/baizhi.webp`,
        icon: `${RESONATOR_ICON_PATH}/baizhi.webp`,
        quality: 4,
    },
    Chixia: {
        element: "fusion",
        weapon: "pistols",
        image: `${RESONATOR_IMAGE_PATH}/chixia.webp`,
        icon: `${RESONATOR_ICON_PATH}/chixia.webp`,
        quality: 4,
    },
    Danjin: {
        element: "havoc",
        weapon: "sword",
        image: `${RESONATOR_IMAGE_PATH}/danjin.webp`,
        icon: `${RESONATOR_ICON_PATH}/danjin.webp`,
        quality: 4,
    },
    Lumi: {
        element: "electro",
        weapon: "broadblade",
        image: `${RESONATOR_IMAGE_PATH}/lumi.webp`,
        icon: `${RESONATOR_ICON_PATH}/lumi.webp`,
        quality: 4,
    },
    Mortefi: {
        element: "fusion",
        weapon: "pistols",
        image: `${RESONATOR_IMAGE_PATH}/mortefi.webp`,
        icon: `${RESONATOR_ICON_PATH}/mortefi.webp`,
        quality: 4,
    },
    Sanhua: {
        element: "glacio",
        weapon: "sword",
        image: `${RESONATOR_IMAGE_PATH}/sanhua.webp`,
        icon: `${RESONATOR_ICON_PATH}/sanhua.webp`,
        quality: 4,
    },
    Taoqi: {
        element: "havoc",
        weapon: "broadblade",
        image: `${RESONATOR_IMAGE_PATH}/taoqi.webp`,
        icon: `${RESONATOR_ICON_PATH}/taoqi.webp`,
        quality: 4,
    },
    Yangyang: {
        element: "aero",
        weapon: "sword",
        image: `${RESONATOR_IMAGE_PATH}/yangyang.webp`,
        icon: `${RESONATOR_ICON_PATH}/yangyang.webp`,
        quality: 4,
    },
    Youhu: {
        element: "glacio",
        weapon: "gauntlets",
        image: `${RESONATOR_IMAGE_PATH}/youhu.webp`,
        icon: `${RESONATOR_ICON_PATH}/youhu.webp`,
        quality: 4,
    },
    Yuanwu: {
        element: "electro",
        weapon: "gauntlets",
        image: `${RESONATOR_IMAGE_PATH}/yuanwu.webp`,
        icon: `${RESONATOR_ICON_PATH}/yuanwu.webp`,
        quality: 4,
    },
}