import type { RevokeAuthTokensResponse } from '@/features/auth/apis/types';
import { api } from '@/lib/api/client';
import { API_SERVER_ENDPOINT } from '@/lib/api/endpoints';
import { useAuthStore } from '@/shared/stores/auth';

export function fetchRevokeTokens() {
  const authStore = useAuthStore.getState();
  return api.post<RevokeAuthTokensResponse>(`${API_SERVER_ENDPOINT}/auth/revoke`, {
    refresh_token: authStore.refresh,
  });
}
