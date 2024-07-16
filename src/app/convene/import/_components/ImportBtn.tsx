import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { Button } from "@/app/_components/ui/button";
import { ArrowRightToLine, Divide } from "lucide-react";
import { Progress } from "@/app/_components/ui/progress";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { toast } from "sonner";
import {
    Dialog,
    DialogContentWithoutClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/_components/ui/dialog";
import { useFetchBannerMutation } from "@/redux/services/banner";
import { useBannerStore } from "@/stores/banner";
import useSupabase from "@/app/_hooks/useSupabase";
import {
    isConveneHistoryUrlValid,
    parseUrlParams,
    processBannerForStore,
} from "@/app/_helpers/processors";

const TOTAL_BANNERS = 7;

interface Props {
    historyUrl: string;
    gamePath: string;
}

export default function ImportBtn({ historyUrl, gamePath }: Props) {
    const router = useRouter();
    const bannerStore = useBannerStore<any>((state: any) => state);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(0);
    const [processedURLBody, setProcessedURLBody] = useState<any>(null);
    const [bannersForGlobalStat, setBannersForGlobalStat] = useState<any>([]);
    const [sentForGlobalStat, setSentForGlobalStat] = useState<boolean>(true);
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
        if (!isConveneHistoryUrlValid(historyUrl)) {
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
            currentBanner <= TOTAL_BANNERS
        ) {
            fetchBanner({
                cardPoolId: processedURLBody.resources_id,
                cardPoolType: currentBanner,
                playerId: processedURLBody.player_id,
                serverId: processedURLBody.svr_id,
                languageCode: "en",
                recordId: processedURLBody.record_id,
            });
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
                bannerStore.addBannerRecordUrl(historyUrl);
                bannerStore.addGamePath(gamePath);
            }

            if (currentBanner <= TOTAL_BANNERS) {
                const { bannerForStore, bannerForGlobalStat } =
                    processBannerForStore(bannerData, banner_name);

                setBannersForGlobalStat((prev: any) => [
                    ...prev,
                    bannerForGlobalStat,
                ]);

                bannerStore.addBanner(banner_name, bannerForStore);
            }

            if (currentBanner <= TOTAL_BANNERS + 1) {
                setCurrentBanner(currentBanner + 1);
            }
        }
    }, [isBannerSuccess]);

    useEffect(() => {
        if (isBannerError) {
            setIsDialogOpen(false);
            setCurrentBanner(0);
            toast.error("Error fetching banners");
        }
    }, [isBannerError]);

    useEffect(() => {
        if (
            currentBanner === TOTAL_BANNERS + 1 &&
            !hasRunEffect.current &&
            sentForGlobalStat &&
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
    }, [currentBanner, isBannerSuccess, sentForGlobalStat]);

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
                            value={(currentBanner / TOTAL_BANNERS) * 100}
                        />
                        {currentBanner === TOTAL_BANNERS + 1 &&
                            !isBannerLoading &&
                            isBannerSuccess && (
                                <div className="text-green-500 text-center">
                                    All Banners imported successfully
                                </div>
                            )}
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => router.push("/convene")}
                            variant="outline"
                            disabled={
                                !(
                                    currentBanner == TOTAL_BANNERS + 1 &&
                                    !isBannerLoading &&
                                    isBannerSuccess
                                )
                            }
                        >
                            Go Back to Convene
                        </Button>
                    </DialogFooter>
                </DialogContentWithoutClose>
            </Dialog>
            <Button onClick={handleImport} disabled={!historyUrl}>
                <ArrowRightToLine />
                Import
            </Button>
            <div className="flex gap-2 mt-4 items-center">
                <Checkbox
                    checked={sentForGlobalStat}
                    onCheckedChange={(e: boolean) => setSentForGlobalStat(e)}
                />
                <div className="text-xs">Submit pity for global pull stats</div>
            </div>
        </>
    );
}
