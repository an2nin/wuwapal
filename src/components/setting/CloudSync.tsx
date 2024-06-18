import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useCookies } from "react-cookie";
import { LogOut, RefreshCcw } from "lucide-react";
import { useBannerStore } from "@/stores/banner";
import {
    useLazyFetchCloudDataQuery,
    useSyncDataMutation,
} from "@/redux/services/user";
import { useToast } from "@/components/ui/use-toast";

const url = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL}&scope=openid+profile+email&response_type=code`;

export default function CloudSync() {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const { toast } = useToast();

    const [
        syncData,
        { isLoading: isSyncDataLoading, isSuccess: isSyncDataSuccess },
    ] = useSyncDataMutation();
    const [
        fetchCloudData,
        {
            isLoading: isFetchCloudDataLoading,
            isSuccess: isFetchCloudDataSuccess,
            data: cloudData,
        },
    ] = useLazyFetchCloudDataQuery<any>();

    const [ccuserInfo, setCCUserInfo] = useState<any>(null);
    const bannerStore = useBannerStore<any>((state: any) => state);

    const handleRedirect = () => {
        window.location.href = url;
    };
    const handleLogout = () => {
        removeCookie("token");
    };

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
        setCCUserInfo(cookies.token);
    }, [cookies]);

    useEffect(() => {
        if (isSyncDataSuccess) {
            toast({
                title: "Data Synced Successfully with Cloud",
                variant: "success",
            });
        }
    }, [isSyncDataSuccess]);

    useEffect(() => {
        if (isFetchCloudDataSuccess) {
            bannerStore.addBannerStore(
                cloudData.data.banners,
                cloudData.data.banner_record_url,
                cloudData.data.game_path
            );

            toast({
                title: "Data Synced Successfully with Cloud",
                variant: "success",
            });
        }
    }, [isFetchCloudDataSuccess]);

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
                    <Button onClick={handleRedirect}>
                        <div className="flex gap-2 items-center">
                            <FcGoogle />
                            Sign in with Google
                        </div>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
