import { getAuthHeader } from "@/helpers/auth";
import { api } from "@/redux/api/base";
import { API_SERVER_ENDPOINT } from "@/redux/api/endpoints";
import {  } from "@/redux/api/types";

export const userDataApis = api.injectEndpoints({
    endpoints: (build) => ({
        syncData: build.mutation<any, any>({
            query(form) {
                return {
                    url: `${API_SERVER_ENDPOINT}/user-data/sync`,
                    method: "POST",
                    body: form,
                    headers: getAuthHeader(),
                };
            },
        }),
        fetchCloudData: build.query<any, void>({
            query() {
                return {
                    url: `${API_SERVER_ENDPOINT}/user-data/fetch`,
                    method: "GET",
                    headers: getAuthHeader(),
                };
            },
        }),
    }),
});

export const { useSyncDataMutation, useLazyFetchCloudDataQuery } = userDataApis;
