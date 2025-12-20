'use client';

import type { PropsWithChildren } from 'react';
import type {
  CollectionDetails,
  CollectionEntry,
  SelectedItem,
} from '@/features/collectors-hub/components/collection-dialog-types';
import { createContext, use, useMemo, useState } from 'react';
import CollectionDialog from '@/features/collectors-hub/components/collection-dialog';
import { useAccountStore } from '@/shared/stores/account';
import { useExternalCollectionStore } from '@/shared/stores/external-collection';

interface DialogContextValue {
  openWith: (item: SelectedItem) => void;
}

const CollectionDialogContext = createContext<DialogContextValue | null>(null);

const getToday = () => new Date().toISOString().split('T')[0];

export function useCollectionDialog() {
  const context = use(CollectionDialogContext);
  if (!context) {
    throw new Error('useCollectionDialog must be used within CollectionDialogProvider');
  }
  return context;
}

export default function CollectionDialogProvider({ children }: PropsWithChildren) {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [open, setOpen] = useState(false);
  const [noteInput, setNoteInput] = useState('coral shop');
  const [dateInput, setDateInput] = useState(getToday());

  const activeProfileId = useAccountStore(state => state.active);
  const addExternalCount = useExternalCollectionStore(state => state.addExternalCount);
  const deleteExternalEntry = useExternalCollectionStore(state => state.deleteExternalEntry);

  const details = useMemo<CollectionDetails | null>(() => {
    if (!selectedItem)
      return null;
    const qualityText = `${selectedItem.resource.quality}★`;
    const qualityClass = selectedItem.resource.quality >= 5
      ? 'text-quality-5'
      : selectedItem.resource.quality === 4
        ? 'text-quality-4'
        : 'text-quality-3';
    if (selectedItem.type === 'resonator') {
      const resonator = selectedItem.resource;
      return {
        typeLabel: 'Resonator',
        qualityText,
        qualityClass,
        primary: resonator.element,
        secondary: resonator.weapon,
      };
    }
    const weapon = selectedItem.resource;
    return {
      typeLabel: 'Weapon',
      qualityText,
      qualityClass,
      primary: weapon.type,
      secondary: null,
    };
  }, [selectedItem]);

  const openWith = (item: SelectedItem) => {
    setSelectedItem(item);
    setNoteInput('coral shop');
    setDateInput(getToday());
    setOpen(true);
  };

  const timelineEntries = useMemo<CollectionEntry[]>(() => {
    if (!selectedItem) {
      return [];
    }

    return [...selectedItem.entries].sort((a, b) => {
      const aTime = Number(new Date(a.date || 0));
      const bTime = Number(new Date(b.date || 0));
      return bTime - aTime;
    });
  }, [selectedItem]);

  const resetDialogState = () => {
    setSelectedItem(null);
    setNoteInput('coral shop');
    setDateInput(getToday());
  };

  const handleAddExternal = () => {
    if (!selectedItem || !activeProfileId) {
      return;
    }

    const sanitizedNote = noteInput.trim();
    const sanitizedDate = dateInput.trim();

    if (!sanitizedNote || !sanitizedDate) {
      return;
    }

    addExternalCount(
      activeProfileId,
      selectedItem.type,
      selectedItem.name,
      1,
      sanitizedNote,
      sanitizedDate,
    );

    const newEntries: CollectionEntry[] = [{ date: sanitizedDate, note: sanitizedNote }];

    setSelectedItem(prev =>
      prev
        ? {
            ...prev,
            count: prev.count + 1,
            entries: [...prev.entries, ...newEntries],
          }
        : prev);

    setNoteInput('coral shop');
    setDateInput(getToday());
  };

  const handleDeleteEntry = (entry: CollectionEntry) => {
    if (!selectedItem || !activeProfileId) {
      return;
    }

    const sanitizedNote = entry.note.trim();
    const sanitizedDate = entry.date.trim();

    if (!sanitizedNote || !sanitizedDate) {
      return;
    }

    deleteExternalEntry(
      activeProfileId,
      selectedItem.type,
      selectedItem.name,
      sanitizedNote,
      sanitizedDate,
    );

    setSelectedItem((prev) => {
      if (!prev)
        return prev;

      const entryIndex = prev.entries.findIndex(
        e => e.note.trim() === sanitizedNote && e.date.trim() === sanitizedDate,
      );

      if (entryIndex === -1)
        return prev;

      const newEntries = [...prev.entries];
      newEntries.splice(entryIndex, 1);

      return {
        ...prev,
        count: Math.max(0, prev.count - 1),
        entries: newEntries,
      };
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetDialogState();
    }
  };

  const isAddDisabled = !activeProfileId
    || !selectedItem
    || !noteInput.trim()
    || !dateInput.trim();

  return (
    <CollectionDialogContext value={{ openWith }}>
      {children}
      <CollectionDialog
        open={open}
        selectedItem={selectedItem}
        details={details}
        timelineEntries={timelineEntries}
        noteInput={noteInput}
        dateInput={dateInput}
        isAddDisabled={isAddDisabled}
        onOpenChange={handleOpenChange}
        onNoteChange={setNoteInput}
        onDateChange={setDateInput}
        onAddEntry={handleAddExternal}
        onDeleteEntry={handleDeleteEntry}
      />
    </CollectionDialogContext>
  );
}
