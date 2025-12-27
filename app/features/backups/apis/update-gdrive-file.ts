import type { updateGDriveResponse } from './types';
import { api } from '@/lib/api/client';
import { GOOGLE_DRIVE_UPLOAD_ENDPOINT } from '@/lib/api/endpoints';
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
