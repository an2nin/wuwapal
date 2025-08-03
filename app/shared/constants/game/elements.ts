import { ELEMENT_IMAGE_PATH } from './paths';

export const ELEMENT_NAMES = {
  AERO: 'aero',
  ELECTRO: 'electro',
  FUSION: 'fusion',
  GLACIO: 'glacio',
  HAVOC: 'havoc',
  SPECTRO: 'spectro',
} as const;

export const ELEMENTS: any = {
  [ELEMENT_NAMES.AERO]: {
    image: `${ELEMENT_IMAGE_PATH}/aero.webp`,
  },
  [ELEMENT_NAMES.ELECTRO]: {
    image: `${ELEMENT_IMAGE_PATH}/electro.webp`,
  },
  [ELEMENT_NAMES.FUSION]: {
    image: `${ELEMENT_IMAGE_PATH}/fusion.webp`,
  },
  [ELEMENT_NAMES.GLACIO]: {
    image: `${ELEMENT_IMAGE_PATH}/glacio.webp`,
  },
  [ELEMENT_NAMES.HAVOC]: {
    image: `${ELEMENT_IMAGE_PATH}/havoc.webp`,
  },
  [ELEMENT_NAMES.SPECTRO]: {
    image: `${ELEMENT_IMAGE_PATH}/spectro.webp`,
  },
};
