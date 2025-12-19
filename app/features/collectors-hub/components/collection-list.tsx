import type { CollectionCounts } from '../utils/processors';
import type { FilterState } from './collection-filters';
import type { Resonator, Weapon } from '@/data/types';
import { useMemo, useState } from 'react';
import CollectionFilters from './collection-filters';
import CollectionItem from './collection-item';

type CollectionType = 'resonator' | 'weapon';

interface Props {
  type: CollectionType;
  resources: Record<string, Resonator | Weapon>;
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

    return Object.entries(resources).filter(([name, resource]) => {
      // Search filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        if (!name.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Element filter (for resonators)
      if (type === 'resonator' && filters.selectedElementFilters.size > 0 && 'element' in resource) {
        if (!filters.selectedElementFilters.has(resource.element)) {
          return false;
        }
      }

      // Weapon type filter
      if (filters.selectedWeaponTypeFilters.size > 0) {
        if (type === 'resonator' && 'weapon' in resource) {
          if (!filters.selectedWeaponTypeFilters.has(resource.weapon)) {
            return false;
          }
        }
        else if (type === 'weapon' && 'type' in resource) {
          if (!filters.selectedWeaponTypeFilters.has(resource.type)) {
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
