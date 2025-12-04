'use client';

import { LockKeyhole, ShieldAlert } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useLayoutStore } from '@/shared/stores/layout';
import { cn } from '@/shared/utils';

const unlockPhrase = 'unlock';

const advancedToggles = [
  {
    key: 'developerPreview',
    label: 'Developer preview mode',
    description: 'Surfacing unfinished UI and data fetchers for debugging sessions.',
  },
  {
    key: 'bypassRateLimits',
    label: 'Bypass rate limits',
    description: 'Loosens client-side throttles during bulk imports or large backups.',
  },
  {
    key: 'verboseLogs',
    label: 'Verbose logging',
    description: 'Capture detailed traces for support tickets and regression hunts.',
  },
] as const;

type AdvancedToggleKey = (typeof advancedToggles)[number]['key'];

export default function AdvancedSettings() {
  const layoutStore = useLayoutStore(state => state);
  const [phrase, setPhrase] = useState('');
  const [toggles, setToggles] = useState<Record<AdvancedToggleKey, boolean>>(() =>
    advancedToggles.reduce(
      (state, toggle) => ({ ...state, [toggle.key]: false }),
      {} as Record<AdvancedToggleKey, boolean>,
    ),
  );

  const phraseMatches = useMemo(
    () => phrase.trim().toLowerCase() === unlockPhrase,
    [phrase],
  );

  function handleUnlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phraseMatches) {
      layoutStore.setAdvancedSettingsUnlocked(true);
    }
  }

  function handleRelock() {
    layoutStore.setAdvancedSettingsUnlocked(false);
    setPhrase('');
  }

  function toggleFlag(key: AdvancedToggleKey) {
    if (!layoutStore.advancedSettingsUnlocked) {
      return;
    }
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <ShieldAlert className="size-5 text-amber-400" />
          Advanced Settings
          <Badge
            variant={layoutStore.advancedSettingsUnlocked ? 'default' : 'outline'}
            className={cn(
              'border-amber-500/40 text-xs',
              layoutStore.advancedSettingsUnlocked
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'text-amber-400',
            )}
          >
            {layoutStore.advancedSettingsUnlocked ? 'Unlocked' : 'Locked'}
          </Badge>
        </CardTitle>
        <CardDescription>
          Safeguard dangerous settings behind a typed barrier so users don&apos;t activate them by accident.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form
          className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] items-center"
          onSubmit={handleUnlock}
        >
          <div className="space-y-2">
            <Label htmlFor="advanced-unlock">Input barrier</Label>
            <Input
              id="advanced-unlock"
              autoComplete="off"
              placeholder={`Type "${unlockPhrase}" to proceed`}
              value={phrase}
              disabled={layoutStore.advancedSettingsUnlocked}
              onChange={event => setPhrase(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              The barrier must be cleared before any advanced options become interactive. The phrase resets when you relock.
            </p>
          </div>
          <div className="flex gap-2 sm:justify-end">
            <Button
              type="submit"
              disabled={!phraseMatches || layoutStore.advancedSettingsUnlocked}
            >
              Unlock
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleRelock}
              disabled={!layoutStore.advancedSettingsUnlocked}
            >
              <LockKeyhole className="size-4" />
              Relock
            </Button>
          </div>
        </form>

        <div className="relative">
          <fieldset
            disabled={!layoutStore.advancedSettingsUnlocked}
            className={cn(
              'grid gap-3 lg:grid-cols-2',
              !layoutStore.advancedSettingsUnlocked && 'opacity-60',
            )}
          >
            {advancedToggles.map(toggle => (
              <div
                key={toggle.key}
                className="flex items-start justify-between gap-3 rounded-lg border border-border/60 bg-background/40 px-4 py-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">
                      {toggle.label}
                    </p>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                      guarded
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {toggle.description}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={toggles[toggle.key]}
                  aria-label={toggle.label}
                  onClick={() => toggleFlag(toggle.key)}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    toggles[toggle.key]
                      ? 'border-primary bg-primary/80'
                      : 'border-border bg-muted/50',
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-5 w-5 rounded-full bg-background shadow transition-transform',
                      toggles[toggle.key] ? 'translate-x-5' : 'translate-x-1',
                    )}
                  />
                </button>
              </div>
            ))}
          </fieldset>

          {!layoutStore.advancedSettingsUnlocked && (
            <div className="absolute inset-0 grid place-items-center rounded-lg border border-dashed border-muted-foreground/40 bg-background/80 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground">
                Locked: clear the input barrier to adjust advanced settings.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
