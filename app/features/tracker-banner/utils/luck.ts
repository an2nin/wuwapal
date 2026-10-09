export function getWinRateMessage(winRate: number): string {
  if (winRate === 0)
    return 'You have not tried your luck yet!';

  const messages: Record<number, string[]> = {
    100: [
      'RNG bows before you! 🔥',
      'Perfection! 👑',
      'Did you bend reality?! 🤯',
    ],
    75: [
      'You lucky dog! 😆',
      'RNGesus blessed you. ✨',
      'Winning like a champ! 🙇',
    ],
    51: [
      'Not bad, not bad! 🌊',
      'Keep the momentum! ⚡',
      'You\'re on a roll! 💃',
    ],
    26: ['Could be worse. 😅', 'A coin flip away… 🪙', 'RNG ain\'t kind. 😢'],
    0: [
      'You poor soul… 😭',
      'Pain. Just pain. 💔',
      'Even NPCs pity you. 🫠',
      'Impossible bad luck! 🎖️',
    ],
  };

  let category = 0;
  if (winRate === 100)
    category = 100;
  else if (winRate >= 75)
    category = 75;
  else if (winRate >= 51)
    category = 51;
  else if (winRate >= 26)
    category = 26;

  const chosenMessages = messages[category];
  return chosenMessages[Math.floor(Math.random() * chosenMessages.length)];
}

// Above this many pulls the sum of pities is close enough to normal, so skip the exact convolution
const EXACT_MAX_PULLS = 30;

// Standard normal CDF (Abramowitz & Stegun 7.1.26, error < 1.5e-7)
function normalCdf(z: number): number {
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const erf = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return z >= 0 ? (1 + erf) / 2 : (1 - erf) / 2;
}

/**
 * How lucky a player's pity is on a banner, from 0 to 100: the share of players with the same number of
 * pulls of that rarity whose average pity is higher, counting ties as half. 50 is average.
 *
 * Compares averages over the same number of pulls, not one average against single pulls: an average over
 * many pulls varies far less than a single pull does. The other players' pulls are drawn from the global
 * pity distribution (`distribution[i]` = pulls that landed at pity i + 1). Returns null without data.
 */
export function calculatePityLuck(pities: number[], distribution: number[]): number | null {
  const total = distribution.reduce((sum, count) => sum + count, 0);
  const pulls = pities.length;
  if (pulls === 0 || total === 0)
    return null;

  const cap = distribution.length;
  const yours = pities.reduce((sum, pity) => sum + Math.min(Math.max(pity, 1), cap), 0);
  const chance = distribution.map(count => count / total);

  if (pulls <= EXACT_MAX_PULLS) {
    // sums[j] = chance that `pulls` random pulls add up to a total pity of j + pulls
    let sums = [1];
    for (let k = 0; k < pulls; k++) {
      const next = Array.from<number>({ length: sums.length + cap - 1 }).fill(0);
      sums.forEach((p, j) => {
        if (p > 0)
          chance.forEach((c, i) => (next[j + i] += p * c));
      });
      sums = next;
    }
    const at = yours - pulls;
    const higher = sums.slice(at + 1).reduce((sum, p) => sum + p, 0);
    return Math.min(100, Math.max(0, (higher + (sums[at] ?? 0) / 2) * 100));
  }

  const mean = chance.reduce((sum, c, i) => sum + c * (i + 1), 0);
  const variance = chance.reduce((sum, c, i) => sum + c * (i + 1 - mean) ** 2, 0);
  if (variance === 0)
    return 50;
  const z = (yours - pulls * mean) / Math.sqrt(pulls * variance);
  return (1 - normalCdf(z)) * 100;
}
