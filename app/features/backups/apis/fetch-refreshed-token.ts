import type { RefreshAccessTokenResponse } from '@/features/backups/apis/types';
import { api } from '@/core/api/client';
import { API_SERVER_ENDPOINT } from '@/core/api/endpoints';
import { useAuthStore } from '@/shared/stores/auth';

export function fetchRefreshedToken() {
  const authStore = useAuthStore.getState();

  return api.post<RefreshAccessTokenResponse>(`${API_SERVER_ENDPOINT}/auth/refresh`, {
    refresh_token: authStore.refresh,
  });
}
