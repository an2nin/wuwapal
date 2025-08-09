import type { FetchAuthTokensPayload, FetchAuthTokensResponse } from '@/features/auth/apis/types';
import { api } from '@/core/api/client';
import { API_SERVER_ENDPOINT } from '@/core/api/endpoints';

export function fetchAuthTokens(payload: FetchAuthTokensPayload) {
  return api.post<FetchAuthTokensResponse>(`${API_SERVER_ENDPOINT}/auth/token`, payload);
}
