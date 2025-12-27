import type { FetchAuthTokensPayload, FetchAuthTokensResponse } from '@/features/auth/apis/types';
import { api } from '@/lib/api/client';
import { API_SERVER_ENDPOINT } from '@/lib/api/endpoints';

export function fetchAuthTokens(payload: FetchAuthTokensPayload) {
  return api.post<FetchAuthTokensResponse>(`${API_SERVER_ENDPOINT}/auth/token`, payload);
}
