import { api } from "@/redux/api/base";
import { GM_SERVER_ENDPOINT, GLOBAL_STAT_GIST } from "@/redux/api/endpoints";
import { FetchBannerPayload, FetchBannerResponse } from "@/redux/api/types";

export const bannerApis = api.injectEndpoints({
    endpoints: (build) => ({
        fetchBanner: build.mutation<FetchBannerResponse, FetchBannerPayload>({
            query(params) {
                return {
                    url: GM_SERVER_ENDPOINT,
                    method: "GET",
                    params: params,
                };
            },
        }),
        globalStats: build.query<any, void>({
          query: () => {
            return {
              url: GLOBAL_STAT_GIST,
              method: "GET",
            };
          },
        }),
    }),
});

export const { useFetchBannerMutation, useGlobalStatsQuery } = bannerApis;
