import { useMemo } from 'react';
import { cn } from '@/shared/utils';

interface Props {
  type: string;
  name: string;
  resource: any;
  count: number;
}

export default function CollectionItem({
  type,
  resource,
  name,
  count,
}: Props) {
  const showCount = useMemo(() => {
    const actualCount = count - 1;
    if (actualCount > 6) {
      return `6 + ${actualCount - 6}`;
    }
    else {
      return `${actualCount}`;
    }
  }, [count]);

  return (
    <div
      className={
        cn('rounded-xl flex flex-col overflow-hidden border-x border-t cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] group', !count && 'grayscale', resource.quality === 4
          ? 'bg-gradient-to-t to-purple-900 from-purple-400'
          : 'bg-gradient-to-t to-yellow-900 from-yellow-400')
      }
    >
      <div className={cn('relative', count)}>
        <img
          src={resource.image}
          alt={name}
          className="w-full object-cover aspect-square"
        />
        {count > 0 && (
          <div className="absolute border top-0 right-0 bg-gray-950 rounded-tl-none rounded-bl-xl px-2 py-1 text-xs text-white font-bold">
            {type === 'resonator' ? 'S' : 'R'}
            {showCount}
          </div>
        )}
      </div>
      <div className="bg-black py-2 px-1 h-full w-full text-center">
        <div className="text-white text-xs font-bold truncate">{name}</div>
      </div>
    </div>
  );
}
