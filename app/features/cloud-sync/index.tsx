'use client';

import type { ApiError } from '@/core/api/client';
import { useMutation } from '@tanstack/react-query';
import { Download, Upload } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { importPullsIntoTableFromGDrive } from '@/features/cloud-sync/utils/import';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useAuthStore } from '@/shared/stores/auth';
import { fetchGDriveFile } from './apis/fetch-gdrive-file';
import { fetchRefreshedToken } from './apis/fetch-refreshed-token';

export default function CloudSync() {
  const authStore = useAuthStore(state => state);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const refreshedTokenMutation = useMutation({
    mutationFn: fetchRefreshedToken,
    onSuccess: (res) => {
      authStore.setTokens(res.data.access_token);
      toast.success('Session refreshed successfully!');
      if (pendingAction === 'restore') {
        setPendingAction(null);
        handleRestoreFromCloud();
      }
    },
    onError: (error) => {
      console.error('Error refreshing token:', error);
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

  function handleRestoreFromCloud() {
    gDriveFileMutation.mutate();
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
      <CardContent className="flex justify-between items-center">
        <div>
          {profileEmail}
        </div>
        {authStore.cloud_file_id
          ? (
              <div className="flex gap-3 items-center">
                <Button
                  variant="outline"
                  onClick={handleRestoreFromCloud}
                  isLoading={gDriveFileMutation.isPending}
                  icon={<Download />}
                >
                  Restore from Cloud
                </Button>
                <Button variant="outline" icon={<Upload />}>
                  Upload to Cloud
                </Button>
              </div>
            )
          : <div className="text-red-500">Please log in to access cloud features!</div>}
      </CardContent>
    </Card>
  );
}
