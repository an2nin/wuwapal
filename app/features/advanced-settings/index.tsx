'use client';

import { format } from 'date-fns';
import { LockKeyhole, ShieldAlert } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ApiError } from '@/core/api/client';
import db from '@/core/db';
import { fetchGDriveFile } from '@/features/backups/apis/fetch-gdrive-file';
import { fetchRefreshedToken } from '@/features/backups/apis/fetch-refreshed-token';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useAuthStore } from '@/shared/stores/auth';
import { useLayoutStore } from '@/shared/stores/layout';
import { useProfileStore } from '@/shared/stores/profile';
import { cn } from '@/shared/utils';

const unlockPhrase = 'unlock advanced';

const advancedActions = [
  {
    key: 'clearGachaDatabase',
    label: 'Clear gacha database',
    description: 'Remove all stored banner pulls from Dexie to reset local gacha data.',
  },
  {
    key: 'restorePreviousPulls',
    label: 'Restore previous pulls flag',
    description: 'Mark pulls as unconverted so the importer can attempt a restore again.',
  },
  {
    key: 'downloadProfileStore',
    label: 'Download profile store',
    description: 'Export the profile store snapshot as a JSON file for debugging or support.',
  },
  {
    key: 'downloadCloudBackup',
    label: 'Download cloud backup',
    description: 'If signed in, fetch the latest cloud backup file and save it locally.',
  },
] as const;

type AdvancedActionKey = (typeof advancedActions)[number]['key'];

const initialActionStatus: Record<AdvancedActionKey, string> = advancedActions
  .reduce(
    (acc, action) => ({ ...acc, [action.key]: '' }),
    {} as Record<AdvancedActionKey, string>,
  );

export default function AdvancedSettings() {
  const layoutStore = useLayoutStore(state => state);
  const [phrase, setPhrase] = useState('');
  const [runningKey, setRunningKey] = useState<AdvancedActionKey | null>(null);
  const [actionStatus, setActionStatus] = useState<Record<AdvancedActionKey, string>>(initialActionStatus);

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

  function downloadJsonFile(content: string | object, filename: string) {
    const dataStr = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async function downloadProfileStore() {
    const { active, profiles, version } = useProfileStore.getState();
    downloadJsonFile(
      { active, profiles, version },
      `profile-store-${format(new Date(), 'yyyy_MM_dd_HH_mm_ss')}.json`,
    );
  }

  async function downloadCloudBackup() {
    const authState = useAuthStore.getState();
    if (!authState.access || !authState.cloud_file_id || !authState.profile) {
      throw new Error('Login required to download cloud backup.');
    }

    try {
      const response = await fetchGDriveFile();
      const fileContent = typeof response === 'string' ? response : JSON.stringify(response, null, 2);
      downloadJsonFile(
        fileContent,
        `cloud-backup-${format(new Date(), 'yyyy_MM_dd_HH_mm_ss')}.json`,
      );
    }
    catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        if (!useAuthStore.getState().refresh) {
          throw new Error('Session expired: log in again to download cloud backup.');
        }
        const refreshResponse = await fetchRefreshedToken();
        useAuthStore.getState().setTokens(refreshResponse.data.access_token);
        const response = await fetchGDriveFile();
        const fileContent = typeof response === 'string' ? response : JSON.stringify(response, null, 2);
        downloadJsonFile(
          fileContent,
          `cloud-backup-${format(new Date(), 'yyyy_MM_dd_HH_mm_ss')}.json`,
        );
        return;
      }
      throw error;
    }
  }

  async function runAction(key: AdvancedActionKey) {
    if (!layoutStore.advancedSettingsUnlocked) {
      return;
    }

    setRunningKey(key);
    setActionStatus(prev => ({ ...prev, [key]: 'Working...' }));
    try {
      if (key === 'clearGachaDatabase') {
        await db.banners.clear();
        setActionStatus(prev => ({ ...prev, [key]: 'Gacha database cleared.' }));
      }
      if (key === 'restorePreviousPulls') {
        layoutStore.setHasPullsConverted(false);
        setActionStatus(prev => ({ ...prev, [key]: 'Previous pulls marked for restore.' }));
      }
      if (key === 'downloadProfileStore') {
        await downloadProfileStore();
        setActionStatus(prev => ({ ...prev, [key]: 'Profile store downloaded.' }));
      }
      if (key === 'downloadCloudBackup') {
        await downloadCloudBackup();
        setActionStatus(prev => ({ ...prev, [key]: 'Cloud backup downloaded.' }));
      }
    }
    catch (error) {
      setActionStatus(prev => ({
        ...prev,
        [key]: error instanceof Error ? error.message : 'Something went wrong.',
      }));
    }
    finally {
      setRunningKey(null);
    }
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
            {advancedActions.map(action => (
              <div
                key={action.key}
                className="flex items-start justify-between gap-3 rounded-lg border border-border/60 bg-background/40 px-4 py-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">
                      {action.label}
                    </p>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                      guarded
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => runAction(action.key)}
                    disabled={!layoutStore.advancedSettingsUnlocked || runningKey === action.key}
                    className="shrink-0"
                    isLoading={runningKey === action.key}
                  >
                    Execute
                  </Button>
                  {actionStatus[action.key] && (
                    <p className="text-[11px] text-muted-foreground">
                      {actionStatus[action.key]}
                    </p>
                  )}
                </div>
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
