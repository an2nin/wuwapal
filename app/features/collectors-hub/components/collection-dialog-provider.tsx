'use client';

import type { PropsWithChildren } from 'react';
import type { Resonator, Weapon } from '@/data/types';
import { createContext, use, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

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
    setOpen(true);
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
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedItem && details && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between gap-2">
                  <span>{selectedItem.name}</span>
                  <span
                    className={`${details.qualityClass} font-semibold`}
                  >
                    {details.qualityText}
                  </span>
                </DialogTitle>
                <DialogDescription>
                  {details.typeLabel}
                  {' '}
                  details
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-40 rounded-md overflow-hidden border bg-black/40">
                  <img
                    src={selectedItem.resource.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover aspect-square"
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
                    <span className="font-medium">{details.primary}</span>
                  </div>
                  {details.secondary && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Weapon</span>
                      <span className="font-medium">{details.secondary}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </CollectionDialogContext>
  );
}
