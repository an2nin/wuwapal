'use client';

import type {
  CollectionDetails,
  CollectionEntry,
  SelectedItem,
} from './collection-dialog-types';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
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
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden">
        {selectedItem && details && (
          <>
            {/* Header Section */}
            <div className="relative border-b border-border/50 bg-gradient-to-br from-background via-background to-muted/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--primary)/5%,transparent_50%)] pointer-events-none" />
              <DialogHeader className="relative px-6 pt-6 pb-4">
                <div className="flex items-start justify-between gap-6 pr-10">
                  <div className="flex-1 min-w-0 space-y-1">
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                      {selectedItem.name}
                    </DialogTitle>
                    <DialogDescription className="text-sm font-medium text-muted-foreground/80">
                      {details.typeLabel}
                    </DialogDescription>
                  </div>
                  <div
                    className={`${details.qualityClass} inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-muted/60 to-muted/40 backdrop-blur-md px-4 py-2 text-sm font-bold shadow-md border border-muted/60 shrink-0 ring-1 ring-inset ring-white/5`}
                  >
                    <span>{details.qualityText}</span>
                  </div>
                </div>
              </DialogHeader>
            </div>

            {/* Content Section */}
            <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-14rem)] overflow-y-auto">
              {/* Image and Stats Grid */}
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Image Card */}
                <div className="relative w-full sm:w-44 h-44 sm:h-44 rounded-xl overflow-hidden border border-border/50 bg-card/50 shadow-xl ring-1 ring-inset ring-white/5 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={selectedItem.resource.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none" />
                  {/* Count Badge */}
                  {selectedItem.count > 0 && (
                    <div className="absolute top-0 right-0 bg-primary/60 backdrop-blur-sm rounded-tl-none rounded-bl-xl px-2 py-1 text-xs text-white font-bold border border-primary/30">
                      {selectedItem.count}
                    </div>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="flex-1 flex flex-col gap-2.5">
                  <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-2 shadow-sm ring-1 ring-inset ring-white/5 hover:bg-card/70 transition-colors">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[70px]">
                      {details.typeLabel === 'Resonator' ? 'Element' : 'Type'}
                    </span>
                    <span className="text-base font-semibold capitalize tracking-tight text-foreground">{details.primary}</span>
                  </div>
                  {details.secondary && (
                    <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-2 shadow-sm ring-1 ring-inset ring-white/5 hover:bg-card/70 transition-colors">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[70px]">
                        Weapon
                      </span>
                      <span className="text-base font-semibold capitalize tracking-tight text-foreground">{details.secondary}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline Section */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/90 px-3">
                    Collection Timeline
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
                </div>

                {selectedItem.entries.length === 0
                  ? (
                      <div className="rounded-xl border border-dashed border-border/50 bg-muted/5 p-12 text-center ring-1 ring-inset ring-white/5">
                        <div className="text-muted-foreground/70 text-sm font-medium">
                          No entries recorded yet
                        </div>
                      </div>
                    )
                  : (
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" aria-hidden />
                        <div className="space-y-4 pl-12">
                          {(timelineExpanded ? timelineEntries : timelineEntries.slice(0, 3)).map((entry, idx) => {
                            const actualIndex = idx;
                            const entryNumber = selectedItem.entries.length - actualIndex;
                            const isExternalEntry = entry.note && entry.note.trim() !== '';
                            return (
                              <div
                                key={`${entry.date}-${entry.note}-${actualIndex}`}
                                className="relative group"
                              >
                                {/* Timeline dot */}
                                <div className="absolute -left-[32px] top-3 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background shadow-sm transition-all duration-200 group-hover:scale-125 group-hover:ring-primary/20 z-10" />
                                {/* Entry card */}
                                <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4 hover:bg-card/70 hover:border-border/60 transition-all duration-200 shadow-sm ring-1 ring-inset ring-white/5 group-hover:shadow-md">
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs font-semibold text-muted-foreground/90 mb-1">
                                        {entry.date
                                          ? format(new Date(entry.date), 'MMM d, yyyy')
                                          : 'No date'}
                                      </div>
                                      <div className="text-sm font-semibold text-foreground capitalize">
                                        {entry.note || 'Gacha'}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md ring-1 ring-inset ring-primary/20">
                                        #
                                        {entryNumber}
                                      </span>
                                      {isExternalEntry && (
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => onDeleteEntry(entry)}
                                          className="h-6 w-6 p-0 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                                          title="Delete entry"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {timelineEntries.length > 3 && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={onToggleTimeline}
                            className="w-full mt-5 text-sm text-muted-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
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
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/90 px-3">
                    Add External Entry
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
                </div>

                <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 space-y-5 shadow-sm ring-1 ring-inset ring-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
                    <div className="space-y-2.5">
                      <Label className="text-xs font-semibold text-muted-foreground/90 uppercase tracking-wider">
                        Date
                      </Label>
                      <input
                        type="date"
                        value={dateInput}
                        onChange={e => onDateChange(e.target.value)}
                        className="w-full h-10 rounded-md border border-border/50 bg-background/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-xs font-semibold text-muted-foreground/90 uppercase tracking-wider">
                        Note
                      </Label>
                      <select
                        value={noteInput}
                        onChange={event => onNoteChange(event.target.value)}
                        className="w-full h-10 rounded-md border border-border/50 bg-background/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="coral shop">Coral Shop</option>
                        <option value="reward">Reward</option>
                        <option value="lost entry">Lost Entry</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      disabled={isAddDisabled}
                      onClick={onAddEntry}
                      className="min-w-[120px] shadow-sm hover:shadow-md transition-shadow"
                    >
                      Add Entry
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
