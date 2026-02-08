export interface Resonator {
  element: string;
  weapon: string;
  icon?: string;
  image: string;
  quality: number;
}

export interface Weapon {
  type: string;
  icon?: string;
  image: string;
  notGacha?: boolean;
  quality: number;
}
