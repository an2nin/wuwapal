import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils';

interface Props {
  activeFilters: number[];
  setActiveFilters: (
    filters: number[] | ((prev: number[]) => number[]),
  ) => void;
}

const filterButtonClasses: any = {
  5: {
    active: 'bg-quality-5 text-secondary',
    inactive: 'border-2 border-quality-5 text-quality-5 hover:bg-quality-5/10',
  },
  4: {
    active: 'bg-quality-4 text-secondary',
    inactive: 'border-2 border-quality-4 text-quality-4 hover:bg-quality-4/10',
  },
  3: {
    active: 'bg-quality-3 text-secondary',
    inactive: 'border-2 border-quality-3 text-quality-3 hover:bg-quality-3/10',
  },
};

export default function BannerTableFilters({
  activeFilters,
  setActiveFilters,
}: Props) {
  const toggleFilter = (quality: number) => {
    setActiveFilters((prev: number[]) => {
      return prev.includes(quality)
        ? prev.filter((q: number) => q !== quality)
        : [...prev, quality];
    });
  };

  return (
    <div className="flex gap-3 items-center">
      {[5, 4, 3].map(star => (
        <Button
          key={star}
          onClick={() => toggleFilter(star)}
          variant="nil"
          className={cn(
            'p-3 cursor-pointer transform transition-transform',
            activeFilters.includes(star)
              ? filterButtonClasses[star].active
              : filterButtonClasses[star].inactive,
          )}
        >
          <div className="flex items-center text-lg">
            {star}
            {' '}
            ✦
          </div>
        </Button>
      ))}
    </div>
  );
}
