'use client';

import type {
  UpdateGlobalStatsPayload,
  UpdateGlobalStatsResponse,
} from '@/features/import-pulls/apis/types';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/core/api/client';
import { env } from '@/core/env';

function postGlobalStats(game: string, payload: UpdateGlobalStatsPayload) {
  return api.post<UpdateGlobalStatsResponse>(
    `${env.NEXT_PUBLIC_NEW_API_URL}/global-stats/${game}`,
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
