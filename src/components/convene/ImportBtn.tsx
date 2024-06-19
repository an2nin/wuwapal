import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightToLine } from "lucide-react";

import {
    Dialog,
    DialogContentWithoutClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useFetchBannerMutation } from "@/redux/services/banner";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { DialogContent } from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useBannerStore } from "@/stores/banner";
import {
    isConveneHistoryUrlValid,
    parseUrlParams,
    processBannerForStore,
} from "@/helpers/processors";
import useSupabase from "@/hooks/useSupabase";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
    historyUrl: string;
    gamePath?: string;
}

const total_banners = 7;

export default function ImportBtn({ historyUrl, gamePath }: Props) {
    const { toast } = useToast();
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
            toast({
                title: "Please paste a valid Convene Record URL!!!",
                variant: "destructive",
            });
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

            if (currentBanner <= total_banners) {
                const { bannerForStore, bannerForGlobalStat } =
                    processBannerForStore(bannerData, banner_name);

                setBannersForGlobalStat((prev: any) => [
                    ...prev,
                    bannerForGlobalStat,
                ]);

                bannerStore.addBanner(banner_name, bannerForStore);
            }

            if (currentBanner <= total_banners + 1) {
                setCurrentBanner(currentBanner + 1);
            }
        }
    }, [isBannerSuccess]);

    useEffect(() => {
        if (isBannerError) {
            setIsDialogOpen(false);
            setCurrentBanner(0);
            toast({
                title: "Something went wrong",
                variant: "destructive",
            });
        }
    }, [isBannerError]);

    useEffect(() => {
        if (
            currentBanner === total_banners + 1 &&
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
                    <DialogContent>
                        <div className="flex flex-col gap-3 justify-center my-2">
                            <Progress
                                value={(currentBanner / total_banners) * 100}
                            />
                            {currentBanner === total_banners + 1 &&
                                !isBannerLoading &&
                                isBannerSuccess && (
                                    <div className="text-green-500 text-center">
                                        All Banners imported successfully
                                    </div>
                                )}
                        </div>
                    </DialogContent>
                    <DialogFooter>
                        <Button
                            onClick={() => router.push("/convene")}
                            variant="outline"
                            disabled={
                                !(
                                    currentBanner == total_banners + 1 &&
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
                <span className="mr-2">
                    <ArrowRightToLine />
                </span>
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
