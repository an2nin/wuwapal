import type { FetchProfileResponse } from '@/features/auth/apis/types';
import { api } from '@/core/api/client';
import { GOOGLE_OAUTH_ENDPOINT } from '@/core/api/endpoints';
import { useAuthStore } from '@/shared/stores/auth';

export function fetchProfile() {
  const authStore = useAuthStore.getState();

  return api.get<FetchProfileResponse>(`${GOOGLE_OAUTH_ENDPOINT}/userinfo`, {
    headers: {
      Authorization: `Bearer ${authStore.access}`,
    },
  });
}
