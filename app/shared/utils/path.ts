import type { CollectionItem } from '../types';
import { IMAGE_PATH } from '../constants/game/paths';

export function toFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/_/g, '-') // underscore to dash
    .replace(/ /g, '-') // space to dash
    .replace(/#/g, '') // remove #
    .replace(/'/g, '') // remove apostrophes
    .replace(/:/g, '') // remove colons
    .replace(/&/g, 'n') // remove ampersands
    .replace(/\(|\)/g, ''); // remove parentheses
}

export function generateAttributeIconPath(attributeType: string, attribute: string) {
  const icon = toFileName(attribute);
  return `${IMAGE_PATH}/${attributeType}/${icon}.webp`;
}

export function generateIconPath(type: string, item: CollectionItem) {
  const icon = toFileName(item.name);
  return `${IMAGE_PATH}/${type}/${item.quality}/${icon}.webp`;
}
