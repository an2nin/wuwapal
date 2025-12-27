'use client';

import type {
  UpdateGlobalStatsPayload,
  UpdateGlobalStatsResponse,
} from '@/features/import-pulls/apis/types';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/core/api/client';
import { API_SERVER_ENDPOINT } from '@/core/api/endpoints';

function postGlobalStats(game: string, payload: UpdateGlobalStatsPayload) {
  return api.post<UpdateGlobalStatsResponse>(
    `${API_SERVER_ENDPOINT}/api/global-stats/${game}`,
    payload,
  );
}

export function useUploadToGlobalStats(game: string) {
  const uploadToGlobalStats = useMutation({
    mutationFn: (payload: UpdateGlobalStatsPayload) => postGlobalStats(game, payload),
  });

  return {
    uploadToGlobalStats,
  };
}
