import { api } from "@/redux/api/base";
import { GM_SERVER_ENDPOINT } from "@/redux/api/endpoints";
import { FetchBannerPayload, FetchBannerResponse } from "@/redux/api/types";

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
            invalidatesTags: ["banners"],
        }),
    }),
});

export const { useFetchBannerMutation } = conveneApis;
