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

interface Roll {
  r: number;
  c: number;
  p: string;
}

export interface LuckResult {
  percentile: string;
  isTop: boolean;
  comparisonPercent: string;
}

export function calculateLuck(rolls: Roll[], yourRoll: number): LuckResult {
  const totalPeople = rolls.reduce((sum, roll) => sum + roll.c, 0);

  let peopleBeforeYou = 0;
  let peopleAtYourRoll = 0;

  rolls.forEach((roll) => {
    if (roll.r < yourRoll) {
      peopleBeforeYou += roll.c;
    }
    else if (roll.r === yourRoll) {
      peopleAtYourRoll += roll.c;
    }
  });

  const percentile
    = ((peopleBeforeYou + peopleAtYourRoll / 2) / totalPeople) * 100;
  const isTop = percentile <= 50;
  const comparisonPercent = isTop ? 100 - percentile : percentile;
  const percentileN = isTop ? percentile : 100 - percentile;

  return {
    percentile: percentileN.toFixed(2),
    isTop,
    comparisonPercent: comparisonPercent.toFixed(2),
  };
}
