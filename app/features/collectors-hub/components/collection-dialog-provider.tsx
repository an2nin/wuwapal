'use client';

import type { PropsWithChildren } from 'react';
import type { Resonator, Weapon } from '@/data/types';
import { createContext, use, useMemo, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useAccountStore } from '@/shared/stores/account';
import { useExternalCollectionStore } from '@/shared/stores/external-collection';

type CollectionType = 'resonator' | 'weapon';

interface SelectedItem {
  type: CollectionType;
  name: string;
  resource: Resonator | Weapon;
  count: number;
  entries: { date: string; note: string }[];
}

interface DialogContextValue {
  openWith: (item: SelectedItem) => void;
}

const CollectionDialogContext = createContext<DialogContextValue | null>(null);

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
  const today = () => new Date().toISOString().split('T')[0];
  const [noteInput, setNoteInput] = useState('coral shop');
  const [dateInput, setDateInput] = useState(today());

  const activeProfileId = useAccountStore(state => state.active);
  const addExternalCount = useExternalCollectionStore(state => state.addExternalCount);

  const details = useMemo(() => {
    if (!selectedItem)
      return null;
    const qualityText = `${selectedItem.resource.quality}★`;
    const qualityClass = selectedItem.resource.quality >= 5
      ? 'text-quality-5'
      : selectedItem.resource.quality === 4
        ? 'text-quality-4'
        : 'text-quality-3';
    if (selectedItem.type === 'resonator') {
      const resonator = selectedItem.resource as Resonator;
      return {
        typeLabel: 'Resonator',
        qualityText,
        qualityClass,
        primary: resonator.element,
        secondary: resonator.weapon,
      };
    }
    const weapon = selectedItem.resource as Weapon;
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
    setDateInput(today());
    setOpen(true);
  };

  const timelineEntries = useMemo(() => {
    if (!selectedItem) {
      return [];
    }

    return [...selectedItem.entries].sort((a, b) => {
      const aTime = Number(new Date(a.date || 0));
      const bTime = Number(new Date(b.date || 0));
      return bTime - aTime;
    });
  }, [selectedItem]);

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

    const newEntries = [{ date: sanitizedDate, note: sanitizedNote }];

    setSelectedItem(prev =>
      prev
        ? {
            ...prev,
            count: prev.count + 1,
            entries: [...prev.entries, ...newEntries],
          }
        : prev);

    setNoteInput('coral shop');
    setDateInput(today());
  };

  return (
    <CollectionDialogContext value={{ openWith }}>
      {children}
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) {
            setSelectedItem(null);
            setNoteInput('coral shop');
            setDateInput(today());
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedItem && details && (
            <>
              <DialogHeader>
                <DialogTitle className="inline-flex items-center gap-2 pr-10">
                  <span>{selectedItem.name}</span>
                  <span
                    className={`${details.qualityClass} inline-flex items-center gap-1 rounded-full bg-muted/30 px-2 py-1 text-xs font-semibold`}
                  >
                    <span>{details.qualityText}</span>
                  </span>
                </DialogTitle>
                <DialogDescription>
                  {details.typeLabel}
                  {' '}
                  details
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-40 rounded-md overflow-hidden border bg-black/40 sm:self-start">
                  <img
                    src={selectedItem.resource.image}
                    alt={selectedItem.name}
                    className="w-full object-cover aspect-square"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground">Owned</span>
                    <span className="font-semibold">{selectedItem.count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {details.typeLabel === 'Resonator' ? 'Element' : 'Type'}
                    </span>
                    <span className="font-medium capitalize">{details.primary}</span>
                  </div>
                  {details.secondary && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Weapon</span>
                      <span className="font-medium capitalize">{details.secondary}</span>
                    </div>
                  )}
                  <div className="mt-4 border-t pt-3">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Collection timeline
                    </div>
                    {selectedItem.entries.length === 0 && (
                      <div className="text-muted-foreground text-sm">
                        No notes recorded yet.
                      </div>
                    )}
                    {selectedItem.entries.length > 0 && (
                      <div className="relative max-h-64 overflow-y-auto pr-2">
                        <div className="absolute left-[6px] top-0 h-full w-[2px] bg-border" aria-hidden />
                        <div className="flex flex-col gap-3">
                          {timelineEntries.map((entry, idx) => (
                            <div key={`${entry.date}-${entry.note}-${idx}`} className="relative pl-6">
                              <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-primary shadow-[0_0_0_4px_rgba(59,130,246,0.15)]" />
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{entry.date || 'No date'}</span>
                                <span className="font-semibold text-foreground">
                                  #
                                  {selectedItem.entries.length - idx}
                                </span>
                              </div>
                              <div className="text-sm text-foreground">
                                {entry.note || 'No note provided'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 border-t pt-3">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Add external entry
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-1">
                        <Label className="text-xs text-muted-foreground">Date</Label>
                        <Input
                          type="date"
                          value={dateInput}
                          onChange={event => setDateInput(event.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-xs text-muted-foreground">Note</Label>
                        <select
                          value={noteInput}
                          onChange={event => setNoteInput(event.target.value)}
                          className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
                        >
                          <option value="coral shop">Coral shop</option>
                          <option value="reward">Reward</option>
                          <option value="lost entry">Lost entry</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2 flex items-end">
                        <Button
                          type="button"
                          disabled={
                            !activeProfileId
                            || !selectedItem
                            || !noteInput.trim()
                            || !dateInput.trim()
                          }
                          onClick={handleAddExternal}
                          className="w-full sm:w-auto"
                        >
                          Add entry
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </CollectionDialogContext>
  );
}
