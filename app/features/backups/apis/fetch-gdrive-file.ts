import { api } from '@/core/api/client';
import { GOOGLE_DRIVE_ENDPOINT } from '@/core/api/endpoints';
import { useAuthStore } from '@/shared/stores/auth';

export function fetchGDriveFile() {
  const authStore = useAuthStore.getState();

  return api.get<string>(`${GOOGLE_DRIVE_ENDPOINT}/${authStore.cloud_file_id}`, {
    headers: {
      Authorization: `Bearer ${authStore.access}`,
    },
    params: {
      alt: 'media',
    },
  });
}
