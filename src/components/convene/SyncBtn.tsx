import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { parseUrlParams, processBanner } from "@/helpers/processors";
import { useFetchBannerMutation } from "@/redux/services/banner";
import { toast } from "@/components/ui/use-toast";
import { useBannerStore } from "@/stores/banner";
import {
    Dialog,
    DialogTitle,
    DialogDescription,
    DialogContent,
} from "@radix-ui/react-dialog";
import { ArrowRightToLine } from "lucide-react";
import {
    DialogContentWithoutClose,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface Props {
    historyUrl: string;
}

const total_banners = 6;

export default function SyncBtn({ historyUrl }: Props) {
    const bannerStore = useBannerStore<any>((state: any) => state);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(0);
    const [processedURLBody, setProcessedURLBody] = useState<any>(null);

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

            const processedBanner = processBanner(bannerData.data, banner_name);
            bannerStore.addBanner(banner_name, processedBanner);

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
                            {currentBanner == 6 &&
                                !isBannerLoading &&
                                isBannerSuccess && (
                                    <div className="text-green-500 text-center">
                                        All Banners synced successfully
                                    </div>
                                )}
                        </div>
                    </DialogContent>
                    <DialogFooter>
                        <Button
                            onClick={() => setIsDialogOpen(false)}
                            variant="outline"
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContentWithoutClose>
            </Dialog>
            <Button onClick={handleImport}>Sync</Button>
        </>
    );
}
