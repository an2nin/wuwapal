import { api } from "@/redux/api/base";
import { GM_SERVER_ENDPOINT, GLOBAL_STAT_GIST } from "@/redux/api/endpoints";
import { FetchBannerPayload, FetchBannerResponse } from "@/redux/api/types";

export const conveneApis = api.injectEndpoints({
    endpoints: (build) => ({
        fetchBanner: build.mutation<FetchBannerResponse, FetchBannerPayload>({
            query(form) {
                return {
                    url: GM_SERVER_ENDPOINT,
                    method: "POST",
                    body: form,
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
        uploadToGlobalStats: build.mutation<any, any>({
            query: (form) => {
                return {
                    url: `${process.env.NEXT_PUBLIC_API_SERVER}/global-stats/upload`,
                    method: "POST",
                    body: form,
                };
            },
        }),
    }),
});

export const {
    useFetchBannerMutation,
    useGlobalStatsQuery,
    useUploadToGlobalStatsMutation,
} = conveneApis;
