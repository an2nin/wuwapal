import { api } from "@/redux/api/base";
import { GM_SERVER_ENDPOINT, GLOBAL_STAT_GIST } from "@/redux/api/endpoints";
import { FetchBannerPayload, FetchBannerResponse, GlobalStatResponse } from "@/redux/api/types";

export const conveneApis = api.injectEndpoints({
    endpoints: (build) => ({
        // fetchTransactions: build.query<TransactionsResponse, BaseQueryParams>({
        //   query: (queryParams) => {
        //     return {
        //       url: TRANSACTION_ENDPOINTS.BASE,
        //       method: "GET",
        //       params: queryParams,
        //     };
        //   },
        //   providesTags: ["transactions"],
        // }),
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
    }),
});

export const { useFetchBannerMutation, useGlobalStatsQuery } = conveneApis;
