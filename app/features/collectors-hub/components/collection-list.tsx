import type { Resonator, Weapon } from '@/data/types';

import CollectionItem from './collection-item';

type CollectionType = 'resonator' | 'weapon';

interface Props {
  type: CollectionType;
  resources: Record<string, Resonator | Weapon>;
  collected: Record<string, number> | undefined;
}

export default function CollectionList({ type, resources, collected }: Props) {
  return (
    <div className="bg-pattern-stripped lg:p-6 p-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 lg:gap-6 gap-3 item-center rounded-xl">
      {resources
        && collected
        && Object.keys(resources).map((resourceName, idx) => (
          <CollectionItem
            key={idx}
            type={type}
            name={resourceName}
            resource={resources[resourceName]}
            count={collected?.[resourceName] ?? 0}
          />
        ))}
    </div>
  );
}
