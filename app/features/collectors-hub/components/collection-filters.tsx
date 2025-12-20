import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { ELEMENT_NAMES, ELEMENTS } from '@/shared/constants/game/elements';
import { WEAPON_TYPE_NAMES, WEAPON_TYPES } from '@/shared/constants/game/weapon-types';
import { cn } from '@/shared/utils';

type CollectionType = 'resonator' | 'weapon';

export interface FilterState {
  selectedElementFilters: Set<string>;
  selectedWeaponTypeFilters: Set<string>;
  searchQuery: string;
}

interface Props {
  type: CollectionType;
  onFilterChange: (filters: FilterState) => void;
}

export default function CollectionFilters({ type, onFilterChange }: Props) {
  const [selectedElementFilters, setSelectedElementFilters] = useState<Set<string>>(() => new Set());
  const [selectedWeaponTypeFilters, setSelectedWeaponTypeFilters] = useState<Set<string>>(() => new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const updateFilters = (
    elementFilters: Set<string>,
    weaponTypeFilters: Set<string>,
    query: string,
  ) => {
    onFilterChange({
      selectedElementFilters: elementFilters,
      selectedWeaponTypeFilters: weaponTypeFilters,
      searchQuery: query,
    });
  };

  const toggleElementFilter = (filterValue: string) => {
    setSelectedElementFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filterValue)) {
        next.delete(filterValue);
      }
      else {
        next.add(filterValue);
      }
      updateFilters(next, selectedWeaponTypeFilters, searchQuery);
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
      updateFilters(selectedElementFilters, next, searchQuery);
      return next;
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateFilters(selectedElementFilters, selectedWeaponTypeFilters, value);
  };

  const clearFilters = () => {
    const emptySet = new Set<string>();
    setSelectedElementFilters(emptySet);
    setSelectedWeaponTypeFilters(emptySet);
    setSearchQuery('');
    updateFilters(emptySet, emptySet, '');
  };

  const hasActiveFilters = selectedElementFilters.size > 0 || selectedWeaponTypeFilters.size > 0 || searchQuery.trim();

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => handleSearchChange(e.target.value)}
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
      <div className="flex gap-2">
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
                  type="button"
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
                type="button"
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
  );
}
