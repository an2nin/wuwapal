import type { CollectionCounts } from '../utils/processors';
import type { CollectionItem } from '@/shared/types';
import { useMemo } from 'react';
import { cn, generateAttributeIconPath, generateIconPath } from '@/shared/utils';
import { useCollectionDialog } from './collection-dialog-provider';

type CollectionType = 'resonator' | 'weapon';

interface Props {
  type: CollectionType;
  name: string;
  resource: CollectionItem;
  entries: CollectionCounts['resonators'][string];
}

export default function CollectionItemCard({
  type,
  resource,
  name,
  entries,
}: Props) {
  const { openWith } = useCollectionDialog();
  const count = entries.length;
  const showCount = useMemo(() => {
    const actualCount = count - 1;
    if (actualCount > 6) {
      return `6 + ${actualCount - 6}`;
    }
    else {
      return `${actualCount}`;
    }
  }, [count]);

  const iconPath = useMemo(() => generateIconPath(type === 'resonator' ? 'characters' : 'weapons', resource), [type, resource]);

  const handleClick = () => {
    if (type === 'resonator') {
      openWith({ type: 'resonator', image: iconPath, resource, name, count, entries });
    }
    else {
      openWith({ type: 'weapon', image: iconPath, resource, name, count, entries });
    }
  };

  return (
    <div
      className={
        cn('rounded-xl flex flex-col overflow-hidden border-x border-t cursor-pointer transform transition-all duration-300 hover:scale-105 focus-visible:scale-105 group', !count && 'grayscale', resource.quality === '4'
          ? 'bg-gradient-to-t from-quality-4/80 to-quality-4/15 hover:shadow-[0_0_15px_color-mix(in_oklch,var(--quality-4)_45%,transparent)]'
          : 'bg-gradient-to-t from-quality-5/80 to-quality-5/15 hover:shadow-[0_0_15px_color-mix(in_oklch,var(--quality-5)_45%,transparent)]')
      }
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="relative">
        <img
          src={iconPath}
          alt={name}
          className="w-full object-cover aspect-square"
        />
        <div className="absolute top-0 left-0 flex gap-1 p-1">
          {resource.attributes && Object.entries(resource.attributes).map(([key, value]) => {
            const iconPath = generateAttributeIconPath(key, value);
            return (
              <img
                key={key}
                src={iconPath}
                alt={`${key}: ${value}`}
                className="w-5 h-5 rounded border border-border bg-background/80"
              />
            );
          })}
        </div>
        {count > 0 && (
          <div className="absolute border top-0 right-0 bg-background rounded-tl-none rounded-bl-xl px-2 py-1 text-xs text-foreground font-bold">
            {type === 'resonator' ? 'S' : 'R'}
            {showCount}
          </div>
        )}
      </div>
      <div className="bg-card py-2 px-1 h-full w-full text-center">
        <div className="text-card-foreground text-xs font-bold truncate">{name}</div>
      </div>
    </div>
  );
}
