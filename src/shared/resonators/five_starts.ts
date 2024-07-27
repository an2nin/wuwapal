const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export const RESONATOR_IMAGE_PATH = `${IMAGE_PATH}/portraits-short`;
export const RESONATOR_ICON_PATH = `${IMAGE_PATH}/resonators`;

export const FIVE_STAR_RESONATORS: any = {
    Calcharo: {
        element: "electro",
        weapon: "broadblade",
        image: `${RESONATOR_IMAGE_PATH}/calcharo.webp`,
        icon: `${RESONATOR_ICON_PATH}/calcharo.webp`,
        quality: 5,
    },
    Changli: {
        element: "fusion",
        weapon: "sword",
        image: `${RESONATOR_IMAGE_PATH}/changli.webp`,
        icon: `${RESONATOR_ICON_PATH}/changli.webp`,
        quality: 5,
    },
    Encore: {
        element: "fusion",
        weapon: "rectifier",
        image: `${RESONATOR_IMAGE_PATH}/encore.webp`,
        icon: `${RESONATOR_ICON_PATH}/encore.webp`,
        quality: 5,
    },
    Jianxin: {
        element: "aero",
        weapon: "gauntlets",
        image: `${RESONATOR_IMAGE_PATH}/jianxin.webp`,
        icon: `${RESONATOR_ICON_PATH}/jianxin.webp`,
        quality: 5,
    },
    Jinhsi: {
        element: "spectro",
        weapon: "broadblade",
        image: `${RESONATOR_IMAGE_PATH}/jinhsi.webp`,
        icon: `${RESONATOR_ICON_PATH}/jinhsi.webp`,
        quality: 5,
    },
    Jiyan: {
        element: "aero",
        weapon: "broadblade",
        image: `${RESONATOR_IMAGE_PATH}/jiyan.webp`,
        icon: `${RESONATOR_ICON_PATH}/jiyan.webp`,
        quality: 5,
    },
    Lingyang: {
        element: "glacio",
        weapon: "gauntlets",
        image: `${RESONATOR_IMAGE_PATH}/lingyang.webp`,
        icon: `${RESONATOR_ICON_PATH}/lingyang.webp`,
        quality: 5,
    },
    "Rover (havoc)": {
        element: "havoc",
        weapon: "sword",
        image: `${RESONATOR_IMAGE_PATH}/rover.webp`,
        icon: `${RESONATOR_ICON_PATH}/rover.webp`,
        quality: 5,
    },
    "Rover (spectro)": {
        element: "spectro",
        weapon: "sword",
        image: `${RESONATOR_IMAGE_PATH}/rover.webp`,
        icon: `${RESONATOR_ICON_PATH}/rover.webp`,
        quality: 5,
    },
    Verina: {
        element: "spectro",
        weapon: "rectifier",
        image: `${RESONATOR_IMAGE_PATH}/verina.webp`,
        icon: `${RESONATOR_ICON_PATH}/verina.webp`,
        quality: 5,
    },
    Yinlin: {
        element: "electro",
        weapon: "rectifier",
        image: `${RESONATOR_IMAGE_PATH}/yinlin.webp`,
        icon: `${RESONATOR_ICON_PATH}/yinlin.webp`,
        quality: 5,
    },
};
