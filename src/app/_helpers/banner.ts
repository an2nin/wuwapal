interface Roll {
    r: number;
    c: number;
    p: string;
}

interface LuckResult {
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
        } else if (roll.r === yourRoll) {
            peopleAtYourRoll += roll.c;
        }
    });

    const percentile =
        ((peopleBeforeYou + peopleAtYourRoll / 2) / totalPeople) * 100;
    const isTop = percentile <= 50;
    const comparisonPercent = isTop ? 100 - percentile : percentile;
    const percentileN = isTop ? percentile : 100 - percentile

    return {
        percentile: percentileN.toFixed(2),
        isTop,
        comparisonPercent: comparisonPercent.toFixed(2),
    };
}
