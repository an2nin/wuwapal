import { api } from "@/redux/api/base";
import {
    API_SERVER_ENDPOINT,
    GOOGLE_OAUTH_ENDPOINT,
} from "@/redux/api/endpoints";
import {
    FetchAuthTokensPayload,
    FetchAuthTokensResponse,
    FetchProfileResponse,
    RefreshAccessTokenPayload,
    RefreshAccessTokenResponse,
} from "@/redux/api/types";
import { useAuthStore } from "@/stores/auth";

export const authApis = api.injectEndpoints({
    endpoints: (build) => ({
        fetchAuthTokens: build.mutation<
            FetchAuthTokensResponse,
            FetchAuthTokensPayload
        >({
            query(form) {
                return {
                    url: API_SERVER_ENDPOINT + "/auth/token",
                    method: "POST",
                    body: form,
                };
            },
        }),
        refreshAccessToken: build.mutation<
            RefreshAccessTokenResponse,
            RefreshAccessTokenPayload
        >({
            query(form) {
                return {
                    url: API_SERVER_ENDPOINT + "/auth/refresh",
                    method: "POST",
                    body: form,
                };
            },
        }),
        fetchProfile: build.query<
            FetchProfileResponse,
            void
        >({
            query() {
                const authStore = useAuthStore.getState();
                
                return {
                    url: GOOGLE_OAUTH_ENDPOINT + "/userinfo",
                    headers: {
                        Authorization: `Bearer ${authStore.access}`,
                    },
                    method: "GET",
                };
            },
        }),
    }),
});

export const {
    useFetchAuthTokensMutation,
    useRefreshAccessTokenMutation,
    useLazyFetchProfileQuery,
} = authApis;
