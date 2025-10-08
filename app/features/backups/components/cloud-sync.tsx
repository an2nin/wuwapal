'use client';

import type { ApiError } from '@/core/api/client';
import type { BannerTable } from '@/core/db';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { Download, Upload } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import db from '@/core/db';
import { fetchGDriveFile } from '@/features/backups/apis/fetch-gdrive-file';
import { fetchRefreshedToken } from '@/features/backups/apis/fetch-refreshed-token';
import { updateGDriveFile } from '@/features/backups/apis/update-gdrive-file';
import { importPullsIntoTableFromGDrive } from '@/features/backups/utils/import';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useAccountStore } from '@/shared/stores/account';
import { useAuthStore } from '@/shared/stores/auth';

export default function CloudSync() {
  const authStore = useAuthStore(state => state);
  const accountStore = useAccountStore(state => state);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const banners = useLiveQuery<BannerTable[]>(() => db.banners.toArray());

  const refreshedTokenMutation = useMutation({
    mutationFn: fetchRefreshedToken,
    onSuccess: (res) => {
      authStore.setTokens(res.data.access_token);
      toast.success('Session refreshed successfully!');
      if (pendingAction === 'restore') {
        setPendingAction(null);
        handleRestoreFromCloud();
      }

      if (pendingAction === 'upload') {
        setPendingAction(null);
        handleUploadToCloud();
      }
    },
    onError: (error) => {
      console.error('Error refreshing token:', error);
      toast.error('Failed to refresh session. Please log in again.');
      authStore.clearStore();
    },
  });

  const gDriveFileMutation = useMutation({
    mutationFn: fetchGDriveFile,
    onSuccess: (res: any) => {
      importPullsIntoTableFromGDrive(JSON.parse(res))?.then(() => {
        toast.success('Data imported successfully!');
      });
    },
    onError: (error: ApiError) => {
      if (error.status === 401) {
        toast.error('Session Expired, Refreshing...');
        setPendingAction('restore');
        refreshedTokenMutation.mutate();
      }
    },
  });

  const updateGDriveFileMutation = useMutation({
    mutationFn: updateGDriveFile,
    onSuccess: () => {
      toast.success('File updated successfully!');
    },
    onError: (error: ApiError) => {
      if (error.status === 401) {
        toast.error('Session Expired, Refreshing...');
        setPendingAction('upload');
        refreshedTokenMutation.mutate();
      }
      else {
        toast.error('Failed to update file. Please try again.');
      }
    },
  });

  function handleRestoreFromCloud() {
    gDriveFileMutation.mutate();
  }

  function handleUploadToCloud() {
    const fileContent = JSON.stringify({
      version: '2.0',
      active: accountStore.active,
      date: format(new Date(), 'dd/MM/yyyy hh:mm a'),
      banners,
      accounts: accountStore.accounts,
    });
    updateGDriveFileMutation.mutate(fileContent);
  }

  const profileEmail = useMemo(
    () =>
      authStore.profile?.email
        ? (
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-primary font-bold">Signed in with:</p>
              <div className="bg-black px-4 py-1 rounded-lg font-bold text-black hover:text-white cursor-default">
                {authStore.profile?.email}
              </div>
            </div>
          )
        : null,
    [authStore.profile?.email],
  );

  return (
    <Card className="bg-background border-none">
      <CardHeader>
        <CardTitle>Cloud Backup</CardTitle>
        <CardDescription>
          Easily save and access your data across all your devices with your Google Account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div>
          {profileEmail}
        </div>
        {authStore.cloud_file_id
          ? (
              <div className="flex flex-col md:flex-row gap-3 items-center">
                <Button
                  variant="outline"
                  onClick={handleRestoreFromCloud}
                  isLoading={gDriveFileMutation.isPending}
                  icon={<Download />}
                >
                  Restore from Cloud
                </Button>
                <Button
                  variant="outline"
                  icon={<Upload />}
                  onClick={handleUploadToCloud}
                  isLoading={updateGDriveFileMutation.isPending}
                >
                  Upload to Cloud
                </Button>
              </div>
            )
          : <div className="text-red-500">Please log in to access cloud features!</div>}
      </CardContent>
    </Card>
  );
}
