import type { FetchProfileResponse } from '@/features/auth/apis/types';
import { api } from '@/lib/api/client';
import { GOOGLE_OAUTH_ENDPOINT } from '@/lib/api/endpoints';
import { useAuthStore } from '@/shared/stores/auth';

export function fetchProfile() {
  const authStore = useAuthStore.getState();

  return api.get<FetchProfileResponse>(`${GOOGLE_OAUTH_ENDPOINT}/userinfo`, {
    headers: {
      Authorization: `Bearer ${authStore.access}`,
    },
  });
}
