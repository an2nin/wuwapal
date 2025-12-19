import type { CollectionCounts } from '../utils/processors';
import type { Resonator, Weapon } from '@/data/types';
import { useMemo, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { ELEMENT_NAMES, ELEMENTS } from '@/shared/constants/game/elements';
import { WEAPON_TYPE_NAMES, WEAPON_TYPES } from '@/shared/constants/game/weapon-types';
import { cn } from '@/shared/utils';
import CollectionItem from './collection-item';

type CollectionType = 'resonator' | 'weapon';

interface Props {
  type: CollectionType;
  resources: Record<string, Resonator | Weapon>;
  collected: CollectionCounts['resonators'] | CollectionCounts['weapons'] | undefined;
}

export default function CollectionList({ type, resources, collected }: Props) {
  const [selectedElementFilters, setSelectedElementFilters] = useState<Set<string>>(new Set());
  const [selectedWeaponTypeFilters, setSelectedWeaponTypeFilters] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!resources || !collected) {
      return [];
    }

    return Object.entries(resources).filter(([name, resource]) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        if (!name.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Element filter (for resonators)
      if (type === 'resonator' && selectedElementFilters.size > 0 && 'element' in resource) {
        if (!selectedElementFilters.has(resource.element)) {
          return false;
        }
      }

      // Weapon type filter
      if (selectedWeaponTypeFilters.size > 0) {
        if (type === 'resonator' && 'weapon' in resource) {
          if (!selectedWeaponTypeFilters.has(resource.weapon)) {
            return false;
          }
        }
        else if (type === 'weapon' && 'type' in resource) {
          if (!selectedWeaponTypeFilters.has(resource.type)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [resources, collected, selectedElementFilters, selectedWeaponTypeFilters, searchQuery, type]);

  const toggleElementFilter = (filterValue: string) => {
    setSelectedElementFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filterValue)) {
        next.delete(filterValue);
      }
      else {
        next.add(filterValue);
      }
      return next;
    });
  };

  const toggleWeaponTypeFilter = (filterValue: string) => {
    setSelectedWeaponTypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filterValue)) {
        next.delete(filterValue);
      }
      else {
        next.add(filterValue);
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedElementFilters(new Set());
    setSelectedWeaponTypeFilters(new Set());
    setSearchQuery('');
  };

  const hasActiveFilters = selectedElementFilters.size > 0 || selectedWeaponTypeFilters.size > 0 || searchQuery.trim();

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 h-9 max-w-xs"
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="shrink-0 h-9"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="space-y-3">
          {/* Element Filters (for resonators) */}
          {type === 'resonator' && (
            <div className="flex flex-wrap gap-2">
              {Object.values(ELEMENT_NAMES).map((element) => {
                const imageSrc = ELEMENTS[element]?.image;
                const isSelected = selectedElementFilters.has(element);

                if (!imageSrc)
                  return null;

                return (
                  <button
                    key={`element-${element}`}
                    onClick={() => toggleElementFilter(element)}
                    className={cn(
                      'relative flex items-center justify-center h-12 w-12 rounded-lg transition-all duration-200',
                      'border-2 shadow-sm',
                      isSelected
                        ? 'border-primary bg-primary/20 scale-105 shadow-md'
                        : 'border-border bg-card/50 hover:bg-card hover:border-primary/50 hover:scale-105',
                    )}
                    title={element}
                  >
                    <img
                      src={imageSrc}
                      alt={element}
                      className={cn(
                        'w-7 h-7 transition-opacity',
                        isSelected ? 'opacity-100' : 'opacity-70',
                      )}
                    />
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Weapon Type Filters */}
          <div className="flex flex-wrap gap-2">
            {Object.values(WEAPON_TYPE_NAMES).map((weaponType) => {
              const imageSrc = WEAPON_TYPES[weaponType]?.image;
              const isSelected = selectedWeaponTypeFilters.has(weaponType);

              if (!imageSrc)
                return null;

              return (
                <button
                  key={`weapon-type-${weaponType}`}
                  onClick={() => toggleWeaponTypeFilter(weaponType)}
                  className={cn(
                    'relative flex items-center justify-center h-12 w-12 rounded-lg transition-all duration-200',
                    'border-2 shadow-sm',
                    isSelected
                      ? 'border-primary bg-primary/20 scale-105 shadow-md'
                      : 'border-border bg-card/50 hover:bg-card hover:border-primary/50 hover:scale-105',
                  )}
                  title={weaponType}
                >
                  <img
                    src={imageSrc}
                    alt={weaponType}
                    className={cn(
                      'w-7 h-7 transition-opacity',
                      isSelected ? 'opacity-100' : 'opacity-70',
                    )}
                  />
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Collection Grid */}
      <div className="bg-pattern-stripped lg:p-6 p-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 lg:gap-6 gap-3 item-center rounded-xl">
        {filteredItems.map(([resourceName]) => (
          <CollectionItem
            key={resourceName}
            type={type}
            name={resourceName}
            resource={resources[resourceName]}
            entries={collected?.[resourceName] ?? []}
          />
        ))}
      </div>
    </div>
  );
}
