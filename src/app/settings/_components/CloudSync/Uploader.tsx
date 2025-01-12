import { Button } from "@/app/_components/ui/button";
import { useUploadToDriveMutation } from "@/redux/services/gdrive";
import { ProfileStoreState, useProfileStore } from "@/stores/profile";
import { format } from "date-fns";
import { CloudUpload } from "lucide-react";

export default function Uploader() {
    const [
        uploadToDrive,
        { isLoading: isUploading, isSuccess: isUploadSuccess },
    ] = useUploadToDriveMutation();

    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );

    function handleUpload() {
        const content: any = {
            version: profileStore.version,
            active: profileStore.active,
            date: format(new Date(), "dd/MM/yyyy hh:mm a"),
            profiles: profileStore.profiles,
        };

        const fileContent = JSON.stringify(content);

        const file = new Blob([fileContent], { type: "application/json" });

        const metadata = {
            name: "wuwapal_backup.json",
            parents: ["appDataFolder"], // Upload to appdata folder
        };

        uploadToDrive({
            metadata,
            file
        });
    }
    return (
        <Button
            variant={"outline"}
            className="h-20 flex items-center justify-center"
            onClick={handleUpload}
        >
            <CloudUpload className="size-8" />
            <div className="flex flex-col">
                <span className="text-base">Upload Your Data </span>
                <span className="font-normal">to Cloud</span>
            </div>
        </Button>
    );
}
