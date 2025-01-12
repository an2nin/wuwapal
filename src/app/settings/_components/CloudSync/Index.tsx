import { Button } from "@/app/_components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { Google } from "@/app/_components/ui/custom-icons";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import {
    useFetchAuthTokensMutation,
    useLazyFetchProfileQuery,
    useRevokeAuthTokensMutation,
} from "@/redux/services/auth";
import Uploader from "./Uploader";
import Restorer from "./Restorer";
import useSupabase from "@/app/_hooks/useSupabase";

export default function CloudSync() {
    const authStore = useAuthStore((state) => state);

    const { upsertData: upsertUserData } = useSupabase("user_data");
    const [
        fetchAuthTokens,
        {
            data: authTokens,
            isLoading: isFetchAuthTokensLoading,
            isSuccess: isFetchAuthTokensSuccess,
        },
    ] = useFetchAuthTokensMutation();

    const [
        revokeAuthTokens,
        {
            isLoading: isRevokeAuthTokensLoading,
            isSuccess: isRevokeAuthTokensSuccess,
            isError: isRevokeAuthTokensError,
        },
    ] = useRevokeAuthTokensMutation();

    const [
        fetchProfile,
        {
            data: profile,
            isLoading: isFetchProfileLoading,
            isSuccess: isFetchProfileSuccess,
        },
    ] = useLazyFetchProfileQuery();

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            fetchAuthTokens({
                code: tokenResponse.code,
            });
        },
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/drive.appdata",
        ].join(" "),
        flow: "auth-code",
    });

    const logout = () => {
        revokeAuthTokens();
    };

    useEffect(() => {
        if (isFetchAuthTokensSuccess) {
            authStore.setTokens(
                authTokens.data.access_token,
                authTokens.data.refresh_token
            );
            fetchProfile();
        }
    }, [isFetchAuthTokensSuccess]);

    useEffect(() => {
        if (isFetchProfileSuccess) {
            authStore.setProfile(profile);
            upsertUserData(
                {
                    email: profile.email,
                    profile: JSON.stringify(profile),
                },
                ["email"]
            );
        }
    }, [isFetchProfileSuccess]);

    useEffect(() => {
        if (isRevokeAuthTokensSuccess || isRevokeAuthTokensError) {
            authStore.clearStore();
        }
    }, [isRevokeAuthTokensSuccess, isRevokeAuthTokensError]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-start">
                        <span>Cloud Sync</span>
                        <span className="text-yellow-500 border-yellow-500 border rounded-lg p-2">Beta</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="max-w-2xl">
                    Easily save and access your data across all your devices
                    with your Google Account.
                    {authStore.profile?.email && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <p className="text-primary font-bold">
                                Signed in with:
                            </p>
                            <div className="bg-black px-4 py-1 rounded-lg font-bold text-black hover:text-white cursor-default">
                                {authStore.profile?.email}
                            </div>
                        </div>
                    )}
                </CardDescription>
            </CardContent>
            <CardFooter>
                {authStore.access ? (
                    <div className="w-full flex flex-wrap gap-5 lg:justify-between justify-center items-center">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start  gap-5">
                            <Uploader />
                            <Restorer />
                        </div>
                        <Button
                            variant={"outline"}
                            className="hover:scale-105 hover:bg-transparent"
                            onClick={() => logout()}
                        >
                            <div className="flex gap-2 items-center">
                                <LogOut className="size-6 text-red-500" />
                                {isRevokeAuthTokensLoading
                                    ? "Signing Out..."
                                    : "Sign Out From Google"}
                            </div>
                        </Button>
                    </div>
                ) : (
                    <div className="w-full flex justify-end items-center">
                        <Button
                            variant={"outline"}
                            className="hover:scale-105 hover:bg-transparent"
                            onClick={() => login()}
                        >
                            <div className="flex gap-2 items-center">
                                <Google
                                    className={`${
                                        isFetchAuthTokensLoading ||
                                        isFetchProfileLoading
                                            ? "animate-spin"
                                            : ""
                                    }`}
                                />
                                {isFetchAuthTokensLoading
                                    ? isFetchProfileLoading
                                        ? "Signing In..."
                                        : "Fetching Profile..."
                                    : "Sign In With Google"}
                            </div>
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
