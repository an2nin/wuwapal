import type { CollectionCounts } from '../utils/processors';
import type { Resonator, Weapon } from '@/data/types';
import { useMemo } from 'react';
import { ELEMENTS } from '@/shared/constants/game/elements';
import { WEAPON_TYPES } from '@/shared/constants/game/weapon-types';
import { cn } from '@/shared/utils';
import { useCollectionDialog } from './collection-dialog-provider';

type CollectionType = 'resonator' | 'weapon';

interface Props {
  type: CollectionType;
  name: string;
  resource: Resonator | Weapon;
  entries: CollectionCounts['resonators'][string];
}

export default function CollectionItem({
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

  const handleClick = () => {
    if (type === 'resonator') {
      openWith({ type: 'resonator', resource: resource as Resonator, name, count, entries });
    }
    else {
      openWith({ type: 'weapon', resource: resource as Weapon, name, count, entries });
    }
  };

  return (
    <div
      className={
        cn('rounded-xl flex flex-col overflow-hidden border-x border-t cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] group', !count && 'grayscale', resource.quality === 4
          ? 'bg-gradient-to-t to-purple-900 from-purple-400'
          : 'bg-gradient-to-t to-yellow-900 from-yellow-400')
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
      <div className={cn('relative', count)}>
        <img
          src={resource.image}
          alt={name}
          className="w-full object-cover aspect-square"
        />
        <div className="absolute top-0 left-0 flex gap-1 p-1">
          {type === 'resonator' && 'element' in resource && 'weapon' in resource && (
            <>
              {resource.element && ELEMENTS[resource.element] && (
                <img
                  src={ELEMENTS[resource.element].image}
                  alt={resource.element}
                  className="w-5 h-5 rounded border border-gray-800 bg-gray-900/80"
                />
              )}
              {resource.weapon && WEAPON_TYPES[resource.weapon] && (
                <img
                  src={WEAPON_TYPES[resource.weapon].image}
                  alt={resource.weapon}
                  className="w-5 h-5 rounded border border-gray-800 bg-gray-900/80"
                />
              )}
            </>
          )}
          {type === 'weapon' && 'type' in resource && (
            <>
              {resource.type && WEAPON_TYPES[resource.type] && (
                <img
                  src={WEAPON_TYPES[resource.type].image}
                  alt={resource.type}
                  className="w-5 h-5 rounded border border-gray-800 bg-gray-900/80"
                />
              )}
            </>
          )}
        </div>
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
