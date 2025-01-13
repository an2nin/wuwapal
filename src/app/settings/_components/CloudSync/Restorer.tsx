import { Button } from "@/app/_components/ui/button";
import { useLazyFetchFileFromDriveQuery } from "@/redux/services/gdrive";
import { useAuthStore } from "@/stores/auth";
import { ProfileStoreState, useProfileStore } from "@/stores/profile";
import { CloudDownload, LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Restorer() {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );
    const authStore = useAuthStore((state) => state);
    const [
        fetchFileFromDrive,
        {
            data: fileData,
            isFetching: isFetchingFile,
            isSuccess: isFetchingFileSuccess,
        },
    ] = useLazyFetchFileFromDriveQuery();

    function handleRestore() {
        if (authStore.cloud_file_id) {
            fetchFileFromDrive({
                id: authStore.cloud_file_id,
                params: {
                    alt: "media",
                    key: process.env.NEXT_PUBLIC_GOOGLE_KEY || "",
                },
            });
        } else {
            toast.error("No File Found, Please re-login to your account");
        }
    }

    useEffect(() => {
        if (!isFetchingFile && isFetchingFileSuccess) {
            if (fileData == null) {
                toast.warning("No data to restore");
            } else {
                profileStore.importProfileStore(fileData);
                toast.success("Data restored successfully");
            }
        }
    }, [isFetchingFileSuccess, isFetchingFile]);

    return (
        <Button
            variant={"outline"}
            className="h-20 flex items-center justify-center"
            onClick={handleRestore}
        >
            {isFetchingFile ? (
                <LoaderCircle className="animate-spin size-8" />
            ) : (
                <CloudDownload className="size-8" />
            )}
            <div className="flex flex-col">
                <span className="text-base">Restore Your Data </span>
                <span className="font-normal">From Cloud</span>
            </div>
        </Button>
    );
}
