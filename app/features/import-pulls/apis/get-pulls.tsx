import type { FetchBannerPayload, FetchBannerResponse } from '@/features/import-pulls/apis/types';
import type {
  GlobalBanner,
} from '@/features/import-pulls/utils/processors';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '@/core/api/client';
import { WUWA_GACHA_ENDPOINT } from '@/core/api/endpoints';
import { getBanner, saveBanner } from '@/core/db/actions';
import { BANNER_IDS } from '@/features/import-pulls/utils/config';
import {
  getStoreIdById,
  mapBannersForGlobalStats,
  processBannerForGlobal,
  processBannerForTable,
} from '@/features/import-pulls/utils/processors';
import { useUploadToGlobalStats } from '@/shared/hooks/use-upload-to-global-stats';

function fetchBannerData(payload: FetchBannerPayload) {
  return api.post<FetchBannerResponse>(WUWA_GACHA_ENDPOINT, payload);
}

export function useGetPulls() {
  const [progress, setProgress] = useState(0);
  const [isAllBannerFetched, setIsAllBannerFetched] = useState(false);
  const [bannersForGlobalStat, setBannersForGlobalStat] = useState<GlobalBanner[]>([]);
  const { uploadToGlobalStats } = useUploadToGlobalStats('wuthering-waves');
  const [playerInfo, setPlayerInfo] = useState({ playerId: '', svrId: '' });

  const mutation = useMutation({
    mutationFn: fetchBannerData,
    onSuccess: async (response) => {
      if (response.code < 0) {
        throw new Error(response.message);
      }

      const storeId = getStoreIdById(BANNER_IDS[progress]);

      if (storeId) {
        const profileId = playerInfo.playerId;
        const existingBanner = await getBanner(profileId, storeId);
        const forTable = processBannerForTable(
          response,
          existingBanner || null,
          storeId,
          profileId,
        );

        const forGlobal = processBannerForGlobal(forTable);

        setBannersForGlobalStat((prev: GlobalBanner[]) => [...prev, forGlobal]);
        await saveBanner(forTable);
      }

      setProgress(prev => prev + 1);
    },
    onError: () => {
      setIsAllBannerFetched(false);
      setProgress(100);
    },
    onSettled: () => {
      if (progress + 1 === BANNER_IDS.length) {
        setIsAllBannerFetched(true);
        const mappedBannerData = mapBannersForGlobalStats(bannersForGlobalStat);
        uploadToGlobalStats.mutate({
          player_id: playerInfo.playerId,
          server_id: playerInfo.svrId,
          banners: mappedBannerData,
        });
      }
    },
  });

  const importBanners = async (parsedBody: any) => {
    setProgress(0);
    setPlayerInfo({
      playerId: parsedBody.player_id,
      svrId: parsedBody.svr_id,
    });

    for (const bannerId of BANNER_IDS) {
      await mutation.mutateAsync({
        cardPoolType: bannerId,
        playerId: parsedBody.player_id,
        serverId: parsedBody.svr_id,
        languageCode: 'en',
        recordId: parsedBody.record_id,
      });
    }
  };

  return {
    progress,
    isAllBannerFetched,
    importBanners,
    setProgress,
    totalBanners: BANNER_IDS.length,
  };
}
