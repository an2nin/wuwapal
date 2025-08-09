import type { CreateGDriveFileResponse } from '@/features/auth/apis/types';
import { api } from '@/core/api/client';
import { GOOGLE_DRIVE_ENDPOINT } from '@/core/api/endpoints';
import { useAuthStore } from '@/shared/stores/auth';

export function createGDriveFile() {
  const authStore = useAuthStore.getState();

  return api.post<CreateGDriveFileResponse>(`${GOOGLE_DRIVE_ENDPOINT}`, {
    name: 'wuwapal_backup.json',
    parents: ['appDataFolder'],
  }, {
    headers: {
      Authorization: `Bearer ${authStore.access}`,
    },
    params: {
      fields: 'id',
      alt: 'json',
    },
  });
}
