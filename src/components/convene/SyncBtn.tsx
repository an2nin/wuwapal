import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { parseUrlParams, processBannerForStore } from "@/helpers/processors";
import { useFetchBannerMutation } from "@/redux/services/banner";
import { toast } from "@/components/ui/use-toast";
import { useBannerStore } from "@/stores/banner";
import {
    Dialog,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogContentWithoutClose,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import useSupabase from "@/hooks/useSupabase";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
    historyUrl: string;
}

const total_banners = 6;

export default function SyncBtn({ historyUrl }: Props) {
    const bannerStore = useBannerStore<any>((state: any) => state);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(0);
    const [processedURLBody, setProcessedURLBody] = useState<any>(null);
    const [bannersForGlobalStat, setBannersForGlobalStat] = useState<any>([]);
    const [sentForGlobalStat, setSentForGlobalStat] = useState<boolean>(true);
    const hasRunEffect = useRef(false);
    const { loading: isGlobalPullLoading, upsertData: upsertGlobalData } =
        useSupabase("global_pulls");

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
            toast({
                title: "Please paste the URL!!!",
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
        if (currentBanner > 0 && processedURLBody != null) {
            fetchBanner({
                cardPoolId: processedURLBody.resources_id,
                cardPoolType: currentBanner,
                playerId: processedURLBody.player_id,
                serverId: processedURLBody.svr_id,
                languageCode: processedURLBody.lang,
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
                bannerStore.addBannerRecordUrl(historyUrl);
            }

            const { bannerForStore, bannerForGlobalStat } =
                processBannerForStore(bannerData, banner_name);

            setBannersForGlobalStat([
                ...bannersForGlobalStat,
                bannerForGlobalStat,
            ]);

            bannerStore.addBanner(banner_name, bannerForStore);

            if (currentBanner < total_banners) {
                setCurrentBanner(currentBanner + 1);
            }
        }
    }, [isBannerSuccess, isBannerError]);

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
            currentBanner == 6 &&
            !isBannerLoading &&
            isBannerSuccess &&
            !isBannerError &&
            !hasRunEffect.current &&
            sentForGlobalStat
        ) {
            upsertGlobalData(
                {
                    resources_id: processedURLBody.resources_id,
                    player_id: processedURLBody.player_id,
                    svr_id: processedURLBody.svr_id,
                    lang: processedURLBody.lang,
                    record_id: processedURLBody.record_id,
                    pulls: bannersForGlobalStat,
                },
                ["svr_id", "player_id"]
            );
            hasRunEffect.current = true;
        }
    }, [currentBanner, isBannerLoading, isBannerSuccess, isBannerError]);

    return (
        <>
            <Dialog
                open={isConfirmDialogOpen}
                onOpenChange={setIsConfirmDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Before you refresh</DialogTitle>
                        <DialogDescription className="text-base text-card-foreground">
                            <span className="mr-1">
                                This action will fetch all your data and replace
                                it with the latest data.
                            </span>
                            <span className="text-red-500">
                                However, this process will
                                <span className="font-bold mx-1">
                                    overwrite
                                </span>
                                any manual changes you have made.
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <div className="flex gap-2 mb-4 items-center">
                            <Checkbox
                                checked={sentForGlobalStat}
                                onCheckedChange={(e: boolean) =>
                                    setSentForGlobalStat(e)
                                }
                            />
                            <div className="text-xs">
                                Submit pity for global pull stats
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex md:justify-end justify-center gap-5">
                            <Button
                                onClick={() => setIsConfirmDialogOpen(false)}
                                variant="outline"
                            >
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsConfirmDialogOpen(false);
                                    handleImport();
                                }}
                            >
                                Proceed
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={isDialogOpen}>
                <DialogContentWithoutClose>
                    <DialogHeader>
                        <DialogTitle>Importing Banners</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 justify-center my-2">
                        <Progress
                            value={(currentBanner / total_banners) * 100}
                        />
                        {currentBanner == 6 &&
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
                                        currentBanner == 6 &&
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
            {/* <Progress  value={75}/> */}
            <Button onClick={() => setIsConfirmDialogOpen(true)}>
                Refresh
            </Button>
        </>
    );
}
