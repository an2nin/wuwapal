'use client';

import type {
  CollectionType,
  ExternalCollectionEntry,
} from '@/shared/stores/external-collection';
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
  const subtractExternalCount = useExternalCollectionStore(state => state.subtractExternalCount);
  const externalCollection = useExternalCollectionStore(state =>
    state.getCollectionForProfile(activeProfileId),
  );

  const [selectedItem, setSelectedItem] = useState<string>('');
  const [countInput, setCountInput] = useState<string>('1');
  const [noteInput, setNoteInput] = useState<string>('');
  const [dateInput, setDateInput] = useState<string>('');

  const typeKey = type === 'weapon' ? 'weapons' : 'resonators';

  const normalizeEntry = (entry: number | ExternalCollectionEntry | undefined): ExternalCollectionEntry => {
    if (typeof entry === 'number') {
      return Array.from({ length: entry }, () => ({ note: '', date: '' }));
    }

    if (!entry) {
      return [];
    }

    return entry.map(item => ({
      note: item.note?.trim() ?? '',
      date: item.date?.trim() ?? '',
    }));
  };

  useEffect(() => {
    const resourceNames = Object.keys(resources);
    if (resourceNames.length > 0) {
      setSelectedItem(resourceNames[0]);
    }
  }, [resources, type]);

  const currentExternalEntry = useMemo(
    () => normalizeEntry(externalCollection?.[typeKey]?.[selectedItem]),
    [externalCollection, selectedItem, typeKey],
  );

  const latestNote = useMemo(
    () => [...currentExternalEntry].reverse().find(entry => !!entry.note)?.note ?? '',
    [currentExternalEntry],
  );

  const latestDate = useMemo(
    () => [...currentExternalEntry].reverse().find(entry => !!entry.date)?.date ?? '',
    [currentExternalEntry],
  );

  useEffect(() => {
    setNoteInput('');
    setDateInput('');
  }, [externalCollection, selectedItem, typeKey]);

  const handleAdjust = (direction: 'add' | 'subtract') => {
    const parsedCount = Number.parseInt(countInput, 10);
    const sanitizedNote = noteInput.trim();
    const sanitizedDate = dateInput.trim();

    if (
      !activeProfileId
      || Number.isNaN(parsedCount)
      || parsedCount <= 0
      || !selectedItem
      || (direction === 'add' && (!sanitizedNote || !sanitizedDate))
    ) {
      return;
    }

    if (direction === 'add') {
      addExternalCount(
        activeProfileId,
        type,
        selectedItem,
        parsedCount,
        sanitizedNote,
        sanitizedDate,
      );
    }
    else {
      subtractExternalCount(activeProfileId, type, selectedItem, parsedCount);
    }

    setCountInput('1');
  };

  return (
    <div className="mb-4 rounded-xl border bg-card/50 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="flex-1">
          <Label className="text-sm text-muted-foreground">
            Adjust
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
            step={1}
            value={countInput}
            onChange={event => setCountInput(event.target.value)}
            className="mt-2"
          />
        </div>

        <div className="w-full sm:w-44">
          <Label className="text-sm text-muted-foreground">Date (required to add)</Label>
          <Input
            type="date"
            value={dateInput}
            onChange={event => setDateInput(event.target.value)}
            className="mt-2"
          />
        </div>

        <div className="w-full sm:flex-1">
          <Label className="text-sm text-muted-foreground">Note (required to add)</Label>
          <Input
            type="text"
            placeholder="e.g. From co-op run"
            value={noteInput}
            onChange={event => setNoteInput(event.target.value)}
            className="mt-2"
          />
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button
            type="button"
            disabled={
              !activeProfileId
              || !selectedItem
              || !noteInput.trim()
              || !dateInput.trim()
              || Number.isNaN(Number.parseInt(countInput, 10))
              || Number.parseInt(countInput, 10) <= 0
            }
            className="w-full sm:w-auto"
            onClick={() => handleAdjust('add')}
          >
            Add
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={!activeProfileId || !selectedItem}
            className="w-full sm:w-auto"
            onClick={() => handleAdjust('subtract')}
          >
            Subtract
          </Button>
        </div>
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        <p className="font-semibold">
          Stored separately from banner data. Current external details:
        </p>
        <p>
          Count:
          {' '}
          {currentExternalEntry.length}
          {latestNote && (
            <>
              {' '}
              • Note:
              {' '}
              {latestNote}
            </>
          )}
          {latestDate && (
            <>
              {' '}
              • Date:
              {' '}
              {latestDate}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
