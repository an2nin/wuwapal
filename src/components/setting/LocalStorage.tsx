import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BannerState, useBannerStore } from "@/stores/banner";
import { useState } from "react";
import { Trash, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function LocalStorage() {
    const bannerStore = useBannerStore<BannerState>(
        (state: BannerState) => state
    );

    const { toast } = useToast();

    const [recordUrl, setRecordUrl] = useState(
        bannerStore.banner_record_url || ""
    );
    const [gamePath, setGamePath] = useState(bannerStore.game_path || "");

    const handleRecordUrlChange = (e: any) => {
        setRecordUrl(e.target.value);
    };

    const handleGamePathChange = (e: any) => {
        setGamePath(e.target.value);
    };

    const handleLocaleStorageSave = () => {
        bannerStore.updateBannerInfo(recordUrl, gamePath);
        toast({
            title: "Locale Storage Updated",
        });
    };

    const handleStateClear = () => {
        bannerStore.clearStore();
        setRecordUrl("");
        setGamePath("");
        toast({
            title: "Locale Storage Cleared",
            variant: "destructive",
        });
    }

    return (
        <Card className="md:px-10 py-5">
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between">
                        <span>Locale Storage</span>
                        <div>
                            <Button
                                className="hover:bg-red-500 "
                                variant="ghost"
                                size="icon"
                                onClick={handleStateClear}
                            >
                                <Trash2 className="text-red-500 hover:text-white" />
                            </Button>
                        </div>
                    </div>
                </CardTitle>
                <CardDescription className="max-w-2xl mt-2">
                    Locale storage consists of all the data stored on your
                    browser.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="convene-record-url">
                            Convene Record URL
                        </Label>
                        <Input
                            id="convene-record-url"
                            value={recordUrl}
                            onChange={handleRecordUrlChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="game-path">
                            Game Installation Path
                        </Label>
                        <Input
                            id="game-path"
                            value={gamePath}
                            onChange={handleGamePathChange}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleLocaleStorageSave}>Save</Button>
            </CardFooter>
        </Card>
    );
}
