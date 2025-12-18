'use client';

import type { CollectionType } from '@/shared/stores/external-collection';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useExternalCollectionStore } from '@/shared/stores/external-collection';

interface Props {
  activeProfileId: string | null;
  type: CollectionType;
  resources: Record<string, any>;
}

export default function ExternalCollectionForm({
  activeProfileId,
  type,
  resources,
}: Props) {
  const addExternalCount = useExternalCollectionStore(state => state.addExternalCount);
  const externalCollection = useExternalCollectionStore(state =>
    state.getCollectionForProfile(activeProfileId),
  );

  const [selectedItem, setSelectedItem] = useState<string>('');
  const [countInput, setCountInput] = useState<string>('1');

  const typeKey = type === 'weapon' ? 'weapons' : 'resonators';

  useEffect(() => {
    const resourceNames = Object.keys(resources);
    if (resourceNames.length > 0) {
      setSelectedItem(resourceNames[0]);
    }
  }, [resources, type]);

  const currentExternalCount = useMemo(
    () => externalCollection?.[typeKey]?.[selectedItem] ?? 0,
    [externalCollection, selectedItem, typeKey],
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedCount = Number.parseInt(countInput, 10);
    if (!activeProfileId || Number.isNaN(parsedCount) || parsedCount <= 0 || !selectedItem) {
      return;
    }

    addExternalCount(activeProfileId, type, selectedItem, parsedCount);
    setCountInput('1');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 rounded-xl border bg-card/50 p-4 shadow-sm backdrop-blur-sm"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label className="text-sm text-muted-foreground">
            Add
            {' '}
            {type === 'weapon' ? 'weapon' : 'resonator'}
            {' '}
            from external source
          </Label>
          <select
            value={selectedItem}
            onChange={event => setSelectedItem(event.target.value)}
            className="mt-2 w-full rounded-lg border bg-background p-3 text-sm shadow-sm focus:border-primary focus:outline-none"
          >
            {Object.keys(resources).map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-32">
          <Label className="text-sm text-muted-foreground">Count</Label>
          <Input
            type="number"
            min={1}
            value={countInput}
            onChange={event => setCountInput(event.target.value)}
            className="mt-2"
          />
        </div>

        <Button
          type="submit"
          disabled={!activeProfileId || !selectedItem}
          className="w-full sm:w-auto"
        >
          Add
        </Button>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Stored separately from banner data. Current external count for this item:
        {' '}
        {currentExternalCount}
      </p>
    </form>
  );
}
