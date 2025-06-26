import { api } from "@/redux/api/base";
import {
    GOOGLE_DRIVE_ENDPOINT,
    GOOGLE_DRIVE_UPLOAD_ENDPOINT,
} from "@/redux/api/endpoints";
import {
    CreateFileInDrivePayload,
    CreateFileInDriveResponse,
    FetchFileFromDrivePayload,
    FetchFileFromDriveResponse,
    FetchFileListFromDrivePayload,
    FetchFileListFromDriveResponse,
    UploadToDrivePayload,
    UploadToDriveResponse,
} from "@/redux/api/types";
import { useAuthStore } from "@/shared/stores/auth";

export const gDriveApis = api.injectEndpoints({
    endpoints: (build) => ({
        uploadToDrive: build.mutation<
            UploadToDriveResponse,
            UploadToDrivePayload
        >({
            query({ id, params, body }) {
                const authStore = useAuthStore.getState();

                return {
                    url: GOOGLE_DRIVE_UPLOAD_ENDPOINT + `/${id}`,
                    headers: {
                        Authorization: `Bearer ${authStore.access}`,
                    },
                    method: "PATCH",
                    params,
                    body,
                };
            },
        }),
        createFileInDrive: build.mutation<
            CreateFileInDriveResponse,
            CreateFileInDrivePayload
        >({
            query({ params, body }) {
                const authStore = useAuthStore.getState();

                return {
                    url: GOOGLE_DRIVE_ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${authStore.access}`,
                    },
                    method: "POST",
                    params,
                    body,
                };
            },
        }),
        fetchFileListFromDrive: build.query<
            FetchFileListFromDriveResponse,
            FetchFileListFromDrivePayload
        >({
            query(params) {
                const authStore = useAuthStore.getState();

                return {
                    url: GOOGLE_DRIVE_ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${authStore.access}`,
                    },
                    method: "GET",
                    params,
                };
            },
        }),
        fetchFileFromDrive: build.query<
            FetchFileFromDriveResponse,
            FetchFileFromDrivePayload
        >({
            query({ id, params }) {
                const authStore = useAuthStore.getState();

                return {
                    url: GOOGLE_DRIVE_ENDPOINT + `/${id}`,
                    headers: {
                        Authorization: `Bearer ${authStore.access}`,
                    },
                    method: "GET",
                    params,
                };
            },
        }),
    }),
});

export const {
    useUploadToDriveMutation,
    useLazyFetchFileListFromDriveQuery,
    useCreateFileInDriveMutation,
    useLazyFetchFileFromDriveQuery,
} = gDriveApis;
