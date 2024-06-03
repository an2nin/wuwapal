import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightToLine, Loader2 } from "lucide-react";

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
import { useDispatch } from "react-redux";
import { addBanner } from "@/redux/slices/banner";

interface Props {
    historyUrl: string;
}

const total_banners = 6;

export default function ImportBtn({ historyUrl }: Props) {
    const { toast } = useToast();
    const router = useRouter();
    const dispatch = useDispatch();
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

    function parseUrlParams(url: string) {
        // Find the index of `#`
        const hashIndex = url.indexOf("#");
        let queryString = url.substring(hashIndex + 1);

        // Find the index of `?` after `#` and get the parameters
        const queryIndex = queryString.indexOf("?");
        if (queryIndex !== -1) {
            queryString = queryString.substring(queryIndex + 1);
        } else {
            // If there's no `?`, return an empty object
            return {};
        }

        const urlParams = new URLSearchParams(queryString);
        const params: any = {};
        urlParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }

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
            }

            dispatch(
                addBanner({
                    items: bannerData.data,
                    name: banner_name,
                })
            );

            if (currentBanner < total_banners) {
                setCurrentBanner(currentBanner + 1);
            }
        }
    }, [isBannerSuccess, isBannerError]);

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
                                        All Banners imported successfully
                                    </div>
                                )}
                        </div>
                    </DialogContent>
                    <DialogFooter>
                        <Button
                            onClick={() => router.push("/convene")}
                        >
                            Go Back to Convene
                        </Button>
                    </DialogFooter>
                </DialogContentWithoutClose>
            </Dialog>
            <Button onClick={handleImport}>
                <span className="mr-2">
                    <ArrowRightToLine />
                </span>
                Import
            </Button>
        </>
    );
}
