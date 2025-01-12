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
} from "@/redux/services/auth";
import Uploader from "./Uploader";
import Restorer from "./Restorer";

export default function CloudSync() {
    const authStore = useAuthStore((state) => state);
    const [
        fetchAuthTokens,
        {
            data: authTokens,
            isLoading: isFetchAuthTokensLoading,
            isSuccess: isFetchAuthTokensSuccess,
        },
    ] = useFetchAuthTokensMutation();

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
        authStore.clearStore();
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
        }
    }, [isFetchProfileSuccess]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cloud Sync</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="max-w-2xl">
                    Easily save and access your data across all your devices
                    with your Google Account.
                </CardDescription>
            </CardContent>
            <CardFooter>
                {authStore.access ? (
                    <div className="w-full flex justify-between items-center">
                        <div className="flex gap-5">
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
                                Sign Out From Google
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
