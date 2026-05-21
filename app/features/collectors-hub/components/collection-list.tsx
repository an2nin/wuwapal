import type { CollectionCounts } from '../utils/processors';
import type { FilterState } from './collection-filters';
import type { CollectionItem } from '@/shared/types';
import { Info } from 'lucide-react';
import { useMemo, useState } from 'react';
import CollectionFilters from './collection-filters';
import CollectionItemCard from './collection-item-card';

type CollectionType = 'resonator' | 'weapon';

interface Props {
  type: CollectionType;
  resources: CollectionItem[];
  collected: CollectionCounts['resonators'] | CollectionCounts['weapons'] | undefined;
}

export default function CollectionList({ type, resources, collected }: Props) {
  const [filters, setFilters] = useState<FilterState>(() => ({
    selectedElementFilters: new Set(),
    selectedWeaponTypeFilters: new Set(),
    searchQuery: '',
  }));

  const filteredItems = useMemo(() => {
    if (!resources || !collected) {
      return [];
    }

    return resources.filter((resource) => {
      // Search filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        if (!resource.name.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Element filter (for resonators)
      if (type === 'resonator' && filters.selectedElementFilters.size > 0 && 'element' in resource) {
        if (!filters.selectedElementFilters.has(resource.attributes.elements)) {
          return false;
        }
      }

      // Weapon type filter
      if (filters.selectedWeaponTypeFilters.size > 0) {
        if (type === 'resonator' && 'weapon' in resource) {
          if (!filters.selectedWeaponTypeFilters.has(resource.attributes.weaponTypes)) {
            return false;
          }
        }
        else if (type === 'weapon' && 'type' in resource) {
          if (!filters.selectedWeaponTypeFilters.has(resource.attributes.weaponTypes)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [resources, collected, filters, type]);

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <CollectionFilters
        type={type}
        onFilterChange={setFilters}
      />
      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-4 py-2.5 text-sm text-muted-foreground">
        <Info className="size-4 shrink-0 text-muted-foreground/70" />
        <span>
          Click on a
          {' '}
          <span className="font-medium text-foreground">{type}</span>
          {' '}
          card to view full pull timeline or add external entries
        </span>
      </div>
      {/* Collection Grid */}
      <div className="bg-pattern-stripped lg:p-6 p-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 lg:gap-6 gap-3 item-center rounded-xl">
        {filteredItems.map(resource => (
          <CollectionItemCard
            key={resource.name}
            type={type}
            name={resource.name}
            resource={resource}
            entries={collected?.[resource.name] ?? []}
          />
        ))}
      </div>
    </div>
  );
}
