import type { FetchFileListFromDriveResponse } from '@/features/auth/apis/types';
import { api } from '@/core/api/client';
import { GOOGLE_DRIVE_ENDPOINT } from '@/core/api/endpoints';
import { useAuthStore } from '@/shared/stores/auth';

export function fetchGDriveFileList() {
  const authStore = useAuthStore.getState();

  return api.get<FetchFileListFromDriveResponse>(`${GOOGLE_DRIVE_ENDPOINT}`, {
    headers: {
      Authorization: `Bearer ${authStore.access}`,
    },
    params: {
      q: 'name = \'wuwapal_backup.json\'',
      spaces: 'appDataFolder',
    },
  });
}
