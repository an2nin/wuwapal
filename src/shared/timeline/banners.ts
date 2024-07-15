import { convertDatesToServerTime } from "@/shared/helpers/time";

const ALL_BANNERS = [
    {
        name: "When Thunder Pours - Yinlin Banner",
        description:
            "During the event, boosted drop rates for 5-star Resonator [Yinlin], 4-star Resonators [Taoqi], [Aalto], and [Yuanwu]!",
        url: "https://wutheringwaves.gg/when-thunder-pours-featured-resonator-convene-boosted-drop-rate-for-yinlin/",
        img: "https://aki-gm-resources-back.aki-game.net/notice/image/XUvRpLaygBSPNnoM.jpg",
        color: "#231C22",
        startDate: "2024-06-06 10:00",
        endDate: "2024-06-26 11:59",
    },
    {
        name: "Absolute Pulsation - Yinlin Weapon Banner",
        img: "https://aki-gm-resources-back.aki-game.net/notice/image/RhasUibVrDXaewvP.jpg",
        color: "#B19CA4",
        startDate: "2024-06-06 10:00",
        endDate: "2024-06-26 11:59",
    },
    {
        name: "Thawborn Renewal - Jinhsi Banner",
        img: "https://raw.githubusercontent.com/antisocial93/WuWa-base/main/jinhsiConvene.jpg",
        color: "#2B3C3E",
        startDate: "2024-06-28 12:00",
        endDate: "2024-07-22 09:59",
        isGlobal: true,
        url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
    },
    {
        name: "Absolute Pulsation - Jinhsi Weapon Banner",
        img: "https://raw.githubusercontent.com/antisocial93/WuWa-base/main/agesofharvestConvene.jpg",
        color: "#B3BBBE",
        startDate: "2024-06-28 12:00",
        endDate: "2024-07-22 09:59",
        isGlobal: true,
        url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
    },
    {
        name: "Stellar Plummage - Changli Banner",
        img: "https://snipboard.io/VlJ2EM.jpg",
        color: "#88302d",
        startDate: "2024-07-22 10:00",
        endDate: "2024-08-14 11:59",
        url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
    },
    {
        name: "Absolute Pulsation - Changli Weapon Banner",
        img: "https://snipboard.io/tsbezS.jpg",
        color: "#ee8548",
        startDate: "2024-07-22 10:00",
        endDate: "2024-08-14 11:59",
        url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
    },
];

export const BANNERS = convertDatesToServerTime(ALL_BANNERS);
