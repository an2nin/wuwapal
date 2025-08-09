import type { updateGDriveResponse } from './types';
import { api } from '@/core/api/client';
import { GOOGLE_DRIVE_UPLOAD_ENDPOINT } from '@/core/api/endpoints';
import { useAuthStore } from '@/shared/stores/auth';

export function updateGDriveFile(file: string) {
  const authStore = useAuthStore.getState();

  return api.patch<updateGDriveResponse>(`${GOOGLE_DRIVE_UPLOAD_ENDPOINT}/${authStore.cloud_file_id}`, file, {
    headers: {
      Authorization: `Bearer ${authStore.access}`,
    },
    params: {
      uploadType: 'media',
      alt: 'json',
    },
  });
}
