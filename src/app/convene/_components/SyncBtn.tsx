import { useEffect, useRef, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
    parseUrlParams,
    processBannerForStore,
} from "@/app/_helpers/processors";
import { useFetchBannerMutation } from "@/redux/services/banner";
import useSupabase from "@/app/_hooks/useSupabase";
import { toast } from "sonner";
import {
    Dialog,
    DialogContentWithoutClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/_components/ui/dialog";
import { Progress } from "@/app/_components/ui/progress";
import { RefreshCcw } from "lucide-react";
import { useProfileStore, ProfileStoreState } from "@/stores/profile";

interface Props {
    historyUrl: string;
}

const total_banners = 7;

export default function SyncBtn() {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );
    const [historyUrl, setHistoryUrl] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(0);
    const [processedURLBody, setProcessedURLBody] = useState<any>(null);
    const [bannersForGlobalStat, setBannersForGlobalStat] = useState<any>([]);
    const hasRunEffect = useRef(false);
    const { upsertData: upsertGlobalData } = useSupabase("global_pulls");

    const [
        fetchBanner,
        {
            data: bannerData,
            isLoading: isBannerLoading,
            isSuccess: isBannerSuccess,
            isError: isBannerError,
        },
    ] = useFetchBannerMutation();

    const handleImport = () => {
        if (historyUrl == null || historyUrl == "") {
            toast.error("Please paste a valid Convene Record URL!!");
            return;
        }
        const parsedBody = parseUrlParams(historyUrl);
        setProcessedURLBody(parsedBody);
        setIsDialogOpen(true);
        setCurrentBanner(1);
    };

    useEffect(() => {
        if (
            currentBanner > 0 &&
            processedURLBody != null &&
            currentBanner <= total_banners
        ) {
            const timer = setTimeout(() => {
                fetchBanner({
                    cardPoolId: processedURLBody.resources_id,
                    cardPoolType: currentBanner,
                    playerId: processedURLBody.player_id,
                    serverId: processedURLBody.svr_id,
                    languageCode: "en",
                    recordId: processedURLBody.record_id,
                });
            }, 500);

            // Clean up the timer if the effect re-runs or component unmounts
            return () => clearTimeout(timer);
        }
    }, [currentBanner, processedURLBody]);

    useEffect(() => {
        if (isBannerSuccess) {
            let banner_name = "";

            if (currentBanner == 1) {
                banner_name = "featured_resonator";
            } else if (currentBanner == 2) {
                banner_name = "featured_weapon";
            } else if (currentBanner == 3) {
                banner_name = "standard_resonator";
            } else if (currentBanner == 4) {
                banner_name = "standard_weapon";
            } else if (currentBanner == 5) {
                banner_name = "beginner";
            } else if (currentBanner == 6) {
                banner_name = "beginner_choice";
            } else if (currentBanner == 7) {
                banner_name = "beginner_choice_convene";
                profileStore.addBannerRecordUrl(historyUrl);
            }

            if (currentBanner <= total_banners) {
                const { bannerForStore, bannerForGlobalStat } =
                    processBannerForStore(bannerData, banner_name);

                setBannersForGlobalStat((prev: any) => [
                    ...prev,
                    bannerForGlobalStat,
                ]);

                profileStore.addBanner(banner_name, bannerForStore);
            }

            if (currentBanner <= total_banners + 1) {
                setCurrentBanner(currentBanner + 1);
            }
        }
    }, [isBannerSuccess, isBannerError]);

    useEffect(() => {
        if (isBannerError) {
            setIsDialogOpen(false);
            setCurrentBanner(0);
            toast.error("Something went wrong!!");
        }
    }, [isBannerError]);

    useEffect(() => {
        if (
            currentBanner === total_banners + 1 &&
            !hasRunEffect.current &&
            isBannerSuccess
        ) {
            upsertGlobalData(
                {
                    resources_id: processedURLBody.resources_id,
                    player_id: processedURLBody.player_id,
                    svr_id: processedURLBody.svr_id,
                    lang: "en",
                    record_id: processedURLBody.record_id,
                    pulls: bannersForGlobalStat,
                },
                ["svr_id", "player_id"]
            );
            hasRunEffect.current = true;
        }
    }, [currentBanner, isBannerSuccess]);

    useEffect(() => {
        if (profileStore) {
            setHistoryUrl(profileStore.getBannerRecordUrl());
        }
    }, [profileStore]);

    return (
        <>
            <Dialog open={isDialogOpen}>
                <DialogContentWithoutClose>
                    <DialogHeader>
                        <DialogTitle>Importing Banners</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 justify-center my-2">
                        <Progress
                            value={
                                (currentBanner / total_banners) * 100 > 100
                                    ? 100
                                    : (currentBanner / total_banners) * 100
                            }
                        />
                        {currentBanner == total_banners + 1 &&
                            !isBannerLoading &&
                            isBannerSuccess && (
                                <div className="text-green-500 text-center">
                                    All Banners synced successfully
                                </div>
                            )}
                    </div>
                    <DialogFooter>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => setIsDialogOpen(false)}
                                variant="outline"
                                disabled={
                                    !(
                                        currentBanner == total_banners + 1 &&
                                        !isBannerLoading &&
                                        isBannerSuccess &&
                                        !isBannerError
                                    )
                                }
                            >
                                Close
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContentWithoutClose>
            </Dialog>
            <Button
                variant={"outline"}
                onClick={() => handleImport()}
            >
                <RefreshCcw className="size-6" /> Refresh Pulls
            </Button>
        </>
    );
}
