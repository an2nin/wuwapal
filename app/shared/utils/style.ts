import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getElementColor(element: string): string {
  const colors: Record<string, string> = {
    Pyro: '#f74e42',
    Hydro: '#21a6ef',
    Anemo: '#60d394',
    Electro: '#9d67ff',
    Dendro: '#a5c83b',
    Cryo: '#9cd7df',
    Geo: '#f7b731',
  };

  return colors[element] || '#ffffff';
}

export function getQualityBackground(quality: number): string {
  if (quality === 5) {
    return 'bg-yellow-500';
  }
  else if (quality === 4) {
    return 'bg-purple-500';
  }

  return 'bg-blue-500';
}

export function getColorClassWithSeverity(pity: number, max: number) {
  const greenThreshold = max * 0.375; // First 37.5% of the range
  const yellowThreshold = max * 0.75; // Next 37.5% of the range

  if (max === 0) {
    return 'text-muted-foreground'; // Default color if max is 0
  }

  if (pity >= 1 && pity <= greenThreshold) {
    return 'text-green-500';
  }
  else if (pity > greenThreshold && pity <= yellowThreshold) {
    return 'text-yellow-500';
  }
  else {
    return 'text-red-500';
  }
}

export function getRarityTextColor(rarity: number) {
  switch (rarity) {
    case 5:
      return 'text-yellow-400';
    case 4:
      return 'text-purple-400';
    case 3:
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
}
