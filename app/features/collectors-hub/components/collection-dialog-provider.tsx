'use client';

import type { PropsWithChildren } from 'react';
import type { Resonator, Weapon } from '@/data/types';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
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
  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const today = () => new Date().toISOString().split('T')[0];
  const [noteInput, setNoteInput] = useState('coral shop');
  const [dateInput, setDateInput] = useState(today());

  const activeProfileId = useAccountStore(state => state.active);
  const addExternalCount = useExternalCollectionStore(state => state.addExternalCount);
  const deleteExternalEntry = useExternalCollectionStore(state => state.deleteExternalEntry);

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
    setTimelineExpanded(false);
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

  const handleDeleteEntry = (entry: { date: string; note: string }) => {
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

    // Remove the first matching entry from local state
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
            setTimelineExpanded(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden">
          {selectedItem && details && (
            <>
              {/* Header with gradient background */}
              <div className="relative bg-gradient-to-br from-background via-background to-muted/20 border-b">
                <DialogHeader className="relative px-6 pt-6 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <DialogTitle className="text-2xl font-bold mb-2 pr-8">
                        {selectedItem.name}
                      </DialogTitle>
                      <DialogDescription className="text-sm font-medium">
                        {details.typeLabel}
                      </DialogDescription>
                    </div>
                    <div
                      className={`${details.qualityClass} inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm px-3 py-1.5 text-sm font-bold shadow-lg border border-muted/50 shrink-0`}
                    >
                      <span>{details.qualityText}</span>
                    </div>
                  </div>
                </DialogHeader>
              </div>

              <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
                {/* Image and Stats Section */}
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Image Card */}
                  <div className="relative w-full sm:w-48 h-48 sm:h-48 rounded-xl overflow-hidden border-2 border-muted/50 bg-gradient-to-br from-muted/20 to-muted/10 shadow-lg group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={selectedItem.resource.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Stats Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-muted/50 bg-muted/20 p-4 backdrop-blur-sm">
                      <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Owned
                      </div>
                      <div className="text-2xl font-bold">{selectedItem.count}</div>
                    </div>
                    <div className="rounded-lg border border-muted/50 bg-muted/20 p-4 backdrop-blur-sm">
                      <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                        {details.typeLabel === 'Resonator' ? 'Element' : 'Type'}
                      </div>
                      <div className="text-lg font-semibold capitalize">{details.primary}</div>
                    </div>
                    {details.secondary && (
                      <div className="rounded-lg border border-muted/50 bg-muted/20 p-4 backdrop-blur-sm col-span-2 sm:col-span-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Weapon
                        </div>
                        <div className="text-lg font-semibold capitalize">{details.secondary}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-2">
                      Collection Timeline
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>

                  {selectedItem.entries.length === 0
                    ? (
                        <div className="rounded-lg border border-dashed border-muted/50 bg-muted/10 p-8 text-center">
                          <div className="text-muted-foreground text-sm">
                            No entries recorded yet
                          </div>
                        </div>
                      )
                    : (
                        <div className="space-y-4">
                          <div className="relative">
                            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" aria-hidden />
                            <div className="space-y-4 pl-8">
                              {(timelineExpanded ? timelineEntries : timelineEntries.slice(0, 3)).map((entry, idx) => {
                                // Calculate the actual index in the full timelineEntries array
                                const actualIndex = idx;
                                const entryNumber = selectedItem.entries.length - actualIndex;
                                const isExternalEntry = entry.note && entry.note.trim() !== '';
                                return (
                                  <div
                                    key={`${entry.date}-${entry.note}-${actualIndex}`}
                                    className="relative group"
                                  >
                                    <div className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background shadow-lg transition-all group-hover:scale-125 group-hover:ring-primary/20" />
                                    <div className="rounded-lg border border-muted/50 bg-muted/10 p-4 hover:bg-muted/20 transition-colors backdrop-blur-sm">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-muted-foreground">
                                          {entry.date || 'No date'}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                            #
                                            {entryNumber}
                                          </span>
                                          {isExternalEntry && (
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => handleDeleteEntry(entry)}
                                              className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                              title="Delete entry"
                                            >
                                              <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                      <div className="text-sm font-medium text-foreground">
                                        {entry.note || 'Gacha'}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          {timelineEntries.length > 3 && (
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => setTimelineExpanded(!timelineExpanded)}
                              className="w-full text-sm text-muted-foreground hover:text-foreground"
                            >
                              {timelineExpanded
                                ? (
                                    <>
                                      <ChevronUp className="mr-2 h-4 w-4" />
                                      Show less
                                    </>
                                  )
                                : (
                                    <>
                                      <ChevronDown className="mr-2 h-4 w-4" />
                                      Show
                                      {' '}
                                      {timelineEntries.length - 3}
                                      {' '}
                                      more
                                    </>
                                  )}
                            </Button>
                          )}
                        </div>
                      )}
                </div>

                {/* Add Entry Section */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-2">
                      Add Entry
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>

                  <div className="rounded-lg border border-muted/50 bg-muted/10 p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-1 space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Date</Label>
                        <Input
                          type="date"
                          value={dateInput}
                          onChange={event => setDateInput(event.target.value)}
                          className="bg-background/50 border-muted/50 focus:border-primary/50"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Note</Label>
                        <select
                          value={noteInput}
                          onChange={event => setNoteInput(event.target.value)}
                          className="w-full rounded-md border border-muted/50 bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
                        >
                          <option value="coral shop">Coral shop</option>
                          <option value="reward">Reward</option>
                          <option value="lost entry">Lost entry</option>
                        </select>
                      </div>
                    </div>
                    <Button
                      type="button"
                      disabled={
                        !activeProfileId
                        || !selectedItem
                        || !noteInput.trim()
                        || !dateInput.trim()
                      }
                      onClick={handleAddExternal}
                      className="w-full sm:w-auto sm:ml-auto sm:block"
                    >
                      Add Entry
                    </Button>
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
