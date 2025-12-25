'use client';

import { Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { PALS_BY_ROLE } from '@/shared/constants/pals';

export default function HallOfFame() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group cursor-pointer relative inline-flex items-center gap-2 text-sm font-semibold text-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="pointer-events-none absolute -inset-x-4 -inset-y-2 rounded-full bg-primary/20 blur-2xl opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative flex items-center gap-2 group-hover:underline underline-offset-4">
            <Sparkles className="size-4" />
            Hall of Pals
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl border-primary/30 bg-gradient-to-br from-card via-card to-background p-0">
        <div className="relative overflow-hidden px-6 py-6 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_0%_0%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(800px_circle_at_100%_0%,rgba(255,255,255,0.06),transparent_45%)]" />
          <DialogHeader className="relative">
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="size-5 text-primary" />
              Hall of Pals
            </DialogTitle>
            <DialogDescription className="text-sm">
              A living roll call of the folks who keep the project moving.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="relative mt-6 max-h-[60vh] pr-4">
            <div className="flex flex-col gap-4">
              {PALS_BY_ROLE.map((role, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/60 bg-background/50 p-4 backdrop-blur-sm"
                >
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                    {role.name}
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {role.pals.map((pal, palIdx) => (
                      <div key={palIdx} className="flex items-center">
                        {pal.link
                          ? (
                              <a
                                href={pal.link}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary/90 transition hover:border-primary/60 hover:bg-primary/15 hover:text-primary"
                              >
                                {pal.name}
                              </a>
                            )
                          : (
                              <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                                {pal.name}
                              </span>
                            )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-xs text-muted-foreground italic">
                and all the pals we made along the way.
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
