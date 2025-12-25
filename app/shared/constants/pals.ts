export interface Pal {
  name: string;
  link?: string;
};

export interface PalRole {
  name: string;
  pals: Pal[];
};

export const DEVELOPERS: Pal[] = [
  {
    name: 'an2nin',
    link: 'https://an2nin.github.io/',
  },
];

export const TESTERS: Pal[] = [
  {
    name: 'garral322',
  },
  {
    name: 'cosmicray001',
    link: 'https://cosmicray001.github.io/',
  },
];

export const SPECIAL: Pal[] = [
  {
    name: 'MadeBaruna',
  },
];

export const PALS_BY_ROLE: PalRole[] = [
  {
    name: 'Developers',
    pals: DEVELOPERS,
  },
  {
    name: 'Testers',
    pals: TESTERS,
  },
  {
    name: 'Special Thanks',
    pals: SPECIAL,
  },
];
