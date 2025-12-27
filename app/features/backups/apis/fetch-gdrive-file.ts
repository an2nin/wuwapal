import { api } from '@/lib/api/client';
import { GOOGLE_DRIVE_ENDPOINT } from '@/lib/api/endpoints';
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
