import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { useCookies } from "react-cookie";
import { LogOut, RefreshCcw } from "lucide-react";
import { useBannerStore } from "@/stores/banner";
import {
    useFetchTokenMutation,
    useLazyFetchCloudDataQuery,
    useSyncDataMutation,
} from "@/redux/services/user";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { Google } from "@/app/_components/ui/custom-icons";

export default function CloudSync() {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [
        syncData,
        {
            isLoading: isSyncDataLoading,
            isSuccess: isSyncDataSuccess,
            isError: isSyncDataError,
        },
    ] = useSyncDataMutation();
    const [
        fetchCloudData,
        {
            isFetching: isFetchCloudDataLoading,
            isSuccess: isFetchCloudDataSuccess,
            data: cloudData,
        },
    ] = useLazyFetchCloudDataQuery<any>();

    const [
        fetchToken,
        {
            data: tokenRes,
            isLoading: isTokenLoading,
            isSuccess: isTokenSuccess,
            isError: isTokenError,
        },
    ] = useFetchTokenMutation();

    const [ccuserInfo, setCCUserInfo] = useState<any>(null);
    const bannerStore = useBannerStore<any>((state: any) => state);

    const handleLogout = () => {
        removeCookie("token");
    };

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) =>
            fetchToken({ code: tokenResponse.access_token }),
    });

    const handleSyncData = () => {
        if (bannerStore.banner_record_url === null) {
            fetchCloudData();
        } else {
            syncData({
                data: {
                    banners: bannerStore.banners,
                    banner_record_url: bannerStore.banner_record_url,
                    game_path: bannerStore.game_path,
                },
            });
        }
    };

    useEffect(() => {
        if (isTokenSuccess) {
            setCookie("token", tokenRes.token);
            handleSyncData();
        }
    }, [isTokenSuccess]);

    useEffect(() => {
        setCCUserInfo(cookies.token);
    }, [cookies]);

    useEffect(() => {
        if (isSyncDataSuccess) {
            toast.success("Data Synced Successfully with Cloud");
        }
    }, [isSyncDataSuccess]);

    useEffect(() => {
        if (isFetchCloudDataSuccess) {
            bannerStore.addBannerStore(
                cloudData.data.banners,
                cloudData.data.banner_record_url,
                cloudData.data.game_path
            );

            toast.success("Data Synced Successfully with Cloud");
        }
    }, [isFetchCloudDataSuccess]);

    useEffect(() => {
        if (isSyncDataError) {
            toast.error("Error Syncing Data with Cloud");

            removeCookie("token");
        }
        if (isTokenError) {
            toast.error("Error Signing you in, Please try again later");

            removeCookie("token");
        }
    }, [isSyncDataError, isTokenError]);

    return (
        <Card className="md:px-10 py-5">
            <CardHeader>
                <CardTitle>Cloud Sync</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="max-w-2xl">
                    Easily save and access your data across all your devices
                    with your Google Account. Just log in, and click the
                    <span className="font-bold mx-1 text-accent">
                        Sync Data
                    </span>
                    button to import or export your information.
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end">
                {ccuserInfo ? (
                    <div className="flex gap-2">
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-5 h-5" />
                        </Button>

                        <Button
                            className="flex gap-2 items-center"
                            onClick={handleSyncData}
                        >
                            <RefreshCcw
                                className={`w-5 h-5 ${
                                    isSyncDataLoading || isFetchCloudDataLoading
                                        ? "animate-spin"
                                        : ""
                                }`}
                            />
                            Sync Data
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant={"outline"}
                        className="hover:bg-transparent hover:scale-105"
                        onClick={() => login()}
                    >
                        <div className="flex gap-2 items-center">
                            <Google
                                className={`w-5 h-5 ${
                                    isTokenLoading ? "animate-spin" : ""
                                }`}
                            />
                            Sign in with Google
                        </div>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
