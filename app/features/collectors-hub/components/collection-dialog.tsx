'use client';

import type {
  CollectionDetails,
  CollectionEntry,
  SelectedItem,
} from './collection-dialog-types';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
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

interface CollectionDialogProps {
  open: boolean;
  selectedItem: SelectedItem | null;
  details: CollectionDetails | null;
  timelineEntries: CollectionEntry[];
  timelineExpanded: boolean;
  noteInput: string;
  dateInput: string;
  isAddDisabled: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleTimeline: () => void;
  onNoteChange: (note: string) => void;
  onDateChange: (date: string) => void;
  onAddEntry: () => void;
  onDeleteEntry: (entry: CollectionEntry) => void;
}

export default function CollectionDialog({
  open,
  selectedItem,
  details,
  timelineEntries,
  timelineExpanded,
  noteInput,
  dateInput,
  isAddDisabled,
  onOpenChange,
  onToggleTimeline,
  onNoteChange,
  onDateChange,
  onAddEntry,
  onDeleteEntry,
}: CollectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden">
        {selectedItem && details && (
          <>
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
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative w-full sm:w-48 h-48 sm:h-48 rounded-xl overflow-hidden border-2 border-muted/50 bg-gradient-to-br from-muted/20 to-muted/10 shadow-lg group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={selectedItem.resource.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

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
                                            onClick={() => onDeleteEntry(entry)}
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
                            onClick={onToggleTimeline}
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
                        onChange={event => onDateChange(event.target.value)}
                        className="bg-background/50 border-muted/50 focus:border-primary/50"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">Note</Label>
                      <select
                        value={noteInput}
                        onChange={event => onNoteChange(event.target.value)}
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
                    disabled={isAddDisabled}
                    onClick={onAddEntry}
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
  );
}
