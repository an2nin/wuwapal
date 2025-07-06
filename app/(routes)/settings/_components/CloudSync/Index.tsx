import { Button } from "@/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Google } from "@/shared/components/ui/custom-icons";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useMemo } from "react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/shared/stores/auth";
import {
    useFetchAuthTokensMutation,
    useLazyFetchProfileQuery,
    useRevokeAuthTokensMutation,
} from "@/shared/redux/services/auth";
import Uploader from "./Uploader";
import Restorer from "./Restorer";
import useSupabase from "@/shared/hooks/useSupabase";
import {
    useCreateFileInDriveMutation,
    useLazyFetchFileListFromDriveQuery,
} from "@/shared/redux/services/gdrive";

const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/drive.appdata",
].join(" ");

export default function CloudSync() {
    const authStore = useAuthStore((state) => state);
    const { upsertData: upsertUserData } = useSupabase("user_data");

    // API Mutations and Queries
    const [
        fetchAuthTokens,
        {
            data: authTokens,
            isSuccess: isAuthTokensFetched,
            isLoading: isAuthTokenFetching,
        },
    ] = useFetchAuthTokensMutation();
    const [
        fetchProfile,
        {
            data: profile,
            isSuccess: isProfileFetched,
            isFetching: isProfileFetching,
        },
    ] = useLazyFetchProfileQuery();
    const [
        revokeAuthTokens,
        { isLoading: isRevoking, isSuccess: isRevoked, isError: isRevokeError },
    ] = useRevokeAuthTokensMutation();
    const [
        fetchFileList,
        {
            data: fileList,
            isFetching: isFetchingFileListFromDrive,
            isSuccess: isFetchingFileListFromDriveSuccess,
        },
    ] = useLazyFetchFileListFromDriveQuery();
    const [
        createFileInDrive,
        {
            data: createdFileData,
            isLoading: isCreatingFile,
            isSuccess: isCreatingFileSuccess,
        },
    ] = useCreateFileInDriveMutation();

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            fetchAuthTokens({
                code: tokenResponse.code,
                redirect_uri: window.location.origin,
            });
        },
        scope: GOOGLE_SCOPES,
        flow: "auth-code",
    });

    const logout = () => revokeAuthTokens();

    // Effects for Authentication Flow
    useEffect(() => {
        if (isAuthTokensFetched) {
            authStore.setTokens(
                authTokens.data.access_token,
                authTokens.data.refresh_token
            );
            fetchProfile();
            fetchFileList({
                q: "name = 'wuwapal_backup.json'",
                spaces: "appDataFolder",
                key: process.env.NEXT_PUBLIC_GOOGLE_KEY || "",
            });
        }
    }, [isAuthTokensFetched]);

    useEffect(() => {
        if (isProfileFetched) {
            authStore.setProfile(profile);
            upsertUserData(
                { email: profile.email, profile: JSON.stringify(profile) },
                ["email"]
            );
        }
    }, [isProfileFetched]);

    useEffect(() => {
        if (isRevoked || isRevokeError) {
            authStore.clearStore();
        }
    }, [isRevoked, isRevokeError]);

    useEffect(() => {
        if (
            !isFetchingFileListFromDrive &&
            isFetchingFileListFromDriveSuccess
        ) {
            if (fileList.files.length == 0) {
                createFileInDrive({
                    params: {
                        fields: "id",
                        alt: "json",
                        key: process.env.NEXT_PUBLIC_GOOGLE_KEY || "",
                    },
                    body: {
                        name: "wuwapal_backup.json",
                        parents: ["appDataFolder"],
                    },
                });
            } else {
                authStore.setCloudFileId(fileList.files[0].id);
            }
        }
    }, [isFetchingFileListFromDriveSuccess, isFetchingFileListFromDrive]);

    useEffect(() => {
        if (isCreatingFileSuccess) {
            authStore.setCloudFileId(createdFileData.id);
        }
    }, [isCreatingFileSuccess]);

    // Memoized Computed Values
    const profileEmail = useMemo(
        () =>
            authStore.profile?.email ? (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <p className="text-primary font-bold">Signed in with:</p>
                    <div className="bg-black px-4 py-1 rounded-lg font-bold text-black hover:text-white cursor-default">
                        {authStore.profile?.email}
                    </div>
                </div>
            ) : null,
        [authStore.profile?.email]
    );

    function getMessage() {
        switch (true) {
            case isAuthTokenFetching:
                return "Signing in...";
            case isProfileFetching || isFetchingFileListFromDrive:
                return "Fetching Profile...";
            case isCreatingFile:
                return "Creating File...";
            default:
                return "Sign In With Google";
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-start">
                        <span>Cloud Sync</span>
                        <span className="text-yellow-500 border-yellow-500 border rounded-lg p-2">
                            Beta
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="max-w-2xl">
                    Easily save and access your data across all your devices
                    with your Google Account.
                    {profileEmail}
                </CardDescription>
            </CardContent>
            <CardFooter>
                {authStore.cloud_file_id ? (
                    <div className="w-full flex flex-wrap gap-5 lg:justify-between justify-center items-center">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
                            <Uploader />
                            <Restorer />
                        </div>
                        <Button
                            variant="outline"
                            className="hover:scale-105 hover:bg-transparent"
                            onClick={logout}
                        >
                            <div className="flex gap-2 items-center">
                                <LogOut className="size-6 text-red-500" />
                                {isRevoking
                                    ? "Signing Out..."
                                    : "Sign Out From Google"}
                            </div>
                        </Button>
                    </div>
                ) : (
                    <div className="w-full flex justify-end items-center">
                        <Button
                            variant="outline"
                            className="hover:scale-105 hover:bg-transparent"
                            onClick={login}
                        >
                            <div className="flex gap-2 items-center">
                                <Google
                                    className={
                                        isAuthTokenFetching ||
                                        isProfileFetching ||
                                        isFetchingFileListFromDrive ||
                                        isCreatingFile
                                            ? "animate-spin"
                                            : ""
                                    }
                                />
                                {getMessage()}
                            </div>
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
