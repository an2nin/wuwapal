import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useProfileStore, ProfileStoreState } from "@/stores/profile";
import { Button } from "@/app/_components/ui/button";

export default function LocalStorage() {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );

    const [recordUrl, setRecordUrl] = useState("");
    const [gamePath, setGamePath] = useState("");

    const handleRecordUrlChange = (e: any) => {
        setRecordUrl(e.target.value);
    };

    const handleGamePathChange = (e: any) => {
        setGamePath(e.target.value);
    };

    const handleLocaleStorageSave = () => {
        profileStore.addGamePath(gamePath);
        profileStore.addBannerRecordUrl(recordUrl);

        toast.success("Locale Storage Updated");
    };

    const handleStateClear = () => {
        // bannerStore.clearStore();
        setRecordUrl("");
        setGamePath("");
        toast.warning("Locale Storage Cleared");
    };

    useEffect(() => {
        setRecordUrl(profileStore.getBannerRecordUrl() || "");
        setGamePath(profileStore.getGamePath() || "");
    }, [profileStore]);

    return (
        <div className="flex flex-col gap-5">
            {/* <div className="flex flex-col gap-3">
                <Label htmlFor="convene-record-url">Convene Record URL</Label>
                <Input
                    id="convene-record-url"
                    value={recordUrl}
                    onChange={handleRecordUrlChange}
                />
            </div> */}
            <div className="flex flex-col gap-3">
                <Label htmlFor="game-path">Game Installation Path</Label>
                <Input
                    id="game-path"
                    value={gamePath}
                    onChange={handleGamePathChange}
                />
            </div>
            <div className="flex justify-end">
                <Button variant="outline" onClick={handleLocaleStorageSave}>Update Url & Path</Button>
            </div>
        </div>
    );
}
