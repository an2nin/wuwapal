function getColorClass(pity: number, max: number) {
  const greenThreshold = max * 0.375; // First 37.5% of the range
  const yellowThreshold = max * 0.75; // Next 37.5% of the range

  if (pity >= 1 && pity <= greenThreshold) {
    return 'text-success';
  }
  else if (pity > greenThreshold && pity <= yellowThreshold) {
    return 'text-warning';
  }
  else {
    return 'text-destructive';
  }
}

interface Props {
  pity: number;
  maxPulls: number;
}

export default function PitySeverityIndicator({ pity, maxPulls }: Props) {
  const colorClass = getColorClass(pity, maxPulls);
  return <div className={`${colorClass} font-bold`}>{pity}</div>;
}
