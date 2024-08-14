import { convertDatesToServerTime } from "@/shared/helpers/time";

const TOWER_OF_ADVERSITY = [
  {
    name: "Tower of Adversity: Hazard Zone",
    img: "https://raw.githubusercontent.com/antisocial93/WuWa-base/main/hazardzoneicon.jpg",
    color: "#1F275E",
    description: ``,
    startDate: "2024-06-23 04:00",
    endDate: "2024-07-07 03:59",
  },
  {
    name: "Tower of Adversity: Hazard Zone",
    img: "https://raw.githubusercontent.com/antisocial93/WuWa-base/main/hazardzoneicon.jpg",
    color: "#1F275E",
    description: ``,
    startDate: "2024-07-07 04:00",
    endDate: "2024-07-21 03:59",
  },
  {
    name: "Tower of Adversity: Hazard Zone",
    img: "https://raw.githubusercontent.com/antisocial93/WuWa-base/main/hazardzoneicon.jpg",
    color: "#1F275E",
    description: ``,
    startDate: "2024-07-21 04:00",
    endDate: "2024-08-05 03:59",
  },
  {
    name: "Tower of Adversity",
    img: "https://raw.githubusercontent.com/antisocial93/WuWa-base/main/hazardzoneicon.jpg",
    color: "#1F275E",
    description: ``,
    startDate: "2024-08-05 04:00",
    endDate: "2024-08-19 03:59",
  },
];

const DEPTHS_OF_ILLUSIVE_REALM = [
  {
    name: "Depths of Illusive Realm",
    img: "https://snipboard.io/ZU4bEz.jpg",
    color: "#7E88B0",
    description: ``,
    startDate: "2024-05-22 12:00",
    endDate: "2024-06-27 03:59",
    url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
  },
  {
    name: "Depths of Illusive Realm: Dreams Ablaze in Darkness",
    img: "https://snipboard.io/ZU4bEz.jpg",
    color: "#9a4431",
    description: `The New Season "Dreams Ablaze in Darkness" opens! New mechanics such as Tokens, Symphony Rank, and different Memetic Tuning are available for you to create your own powerful build. Main rewards are; 1000x Astrite, 1x Malleable Elite Class Echo I, 1x Malleable Elite Class Echo II, Premium Tuners, Crystal Solvents.`,
    startDate: "2024-07-04 10:00",
    endDate: "2024-08-05 03:59",
    url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
  },
  {
    name: "Depths of Illusive Realm: Carnival in Slumberland",
    img: "https://snipboard.io/LG7Hsb.jpg",
    description: `New Content "Carnival in Slumberland" Open! Phantom Echo: Dreamless and new Metaphors will be available for you to select. Rewards; 1000*Astrite, Phantom: Dreamless, Malleable Elite Class Echo I, Malleable Elite Class Echo II, Premium Sealed Tubes.`,
    startDate: "2024-08-22 10:00",
    endDate: "2024-09-23 03:59",
    url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
    reliability: "Official",
    color: "#b66188",
  },
];

const PIONEER_PODCAST = [
  {
    name: "Pioneer Podcast",
    img: "https://snipboard.io/dBPpt2.jpg",
    color: "#e4c190",
    description: `You can complete tasks in Pioneer Podcast and accumulate Podcast EXP. Level up your Podcast to get rich rewards. Unlock "Insider Channel" or "Connoisseur Channel" and level up your Podcast to win extra rewards including Astrite*600, a 4-star Golden Eternal Series Weapon of Choice, and Radiant Tide!`,
    startDate: "2024-05-22 12:00",
    endDate: "2024-06-27 03:59",
    url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
  },
  {
    name: "Pioneer Podcast",
    img: "https://snipboard.io/dBPpt2.jpg",
    color: "#e4c190",
    description: `You can complete tasks in Pioneer Podcast and accumulate Podcast EXP. Level up your Podcast to get rich rewards. Unlock "Insider Channel" or "Connoisseur Channel" and level up your Podcast to win extra rewards including Astrite*600, a 4-star Golden Eternal Series Weapon of Choice, and Radiant Tide!`,
    startDate: "2024-06-28 12:00",
    endDate: "2024-08-13 03:59",
    url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
  },
  {
    name: "Pioneer Podcast",
    img: "https://snipboard.io/1EkOtV.jpg",
    description: `You can complete tasks in Pioneer Podcast and accumulate Podcast EXP. Level up your Podcast to get rich rewards. Unlock "Insider Channel" or "Connoisseur Channel" and level up your Podcast to win extra rewards including Astrite*680, a 4-star Golden Eternal Series Weapon of Choice, Radiant Tide, and more! Unlocking "Connoisseur Channel" grants an instant advance of Podcast level by 10, with the period-limited Sigil "Moonlit Haven", Lustrous Tide*3, and Gilded Ginkgo (can be used to improve the Syntonization Rank of a 4-star Golden Eternal Series Weapon).`,
    startDate: "2024-08-15 13:00",
    isGlobal: true,
    endDate: "2024-09-28 03:59",
    url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
    reliability: "Official",
    color: "#594842",
  },
];

export const COMMONS = [
  convertDatesToServerTime(TOWER_OF_ADVERSITY),
  convertDatesToServerTime(DEPTHS_OF_ILLUSIVE_REALM),
  convertDatesToServerTime(PIONEER_PODCAST),
];
