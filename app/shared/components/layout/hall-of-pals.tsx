'use client';
import { Medal } from 'lucide-react';
import { useState } from 'react';
import MovingBorder from '@/shared/components/moving-border';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { PALS_BY_ROLE } from '@/shared/constants/pals';

export default function HallOfPals() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <MovingBorder hoverable>
        <button
          type="button"
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <Medal />
          Hall of Pals
        </button>
      </MovingBorder>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hall of Pals</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mb-5">
            {PALS_BY_ROLE.map((role, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="font-bold mb-1 border-b border-primary w-fit pb-1">
                  {role.name}
                </h4>
                <div className="flex gap-3 text-xs mt-1">
                  {role.pals.map((pal, idx) => (
                    <div key={idx} className="flex items-center">
                      {pal.link
                        ? (
                            <a
                              href={pal.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline"
                            >
                              {pal.name}
                            </a>
                          )
                        : (
                            <span className="text-muted-foreground">
                              {pal.name}
                            </span>
                          )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-xs text-muted-foreground">
              and all the pals we made along the way.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
