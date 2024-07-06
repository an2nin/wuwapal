export function calculateLuck(averageValue: any, yourValue: any, totalPeople: any) {
    const betterThanAverage = averageValue > yourValue;
    const percentile =
        ((betterThanAverage ? totalPeople - yourValue : yourValue) /
            totalPeople) *
        100;
    return {
        betterThanAverage,
        percentile: percentile.toFixed(2),
    };
}
