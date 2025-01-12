import { Button } from "@/app/_components/ui/button";
import {
    useLazyFetchFileListFromDriveQuery,
    useCreateFileInDriveMutation,
    useLazyFetchFileFromDriveQuery,
} from "@/redux/services/gdrive";
import { CloudDownload } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Restorer() {
    const [
        fetchFileList,
        {
            data: fileList,
            isFetching: isFetchingFileListFromDrive,
            isSuccess: isFetchingFileListFromDriveSuccess,
        },
    ] = useLazyFetchFileListFromDriveQuery();

    const [
        createFileInDrive,
        {
            data: createdFileData,
            isLoading: isCreatingFile,
            isSuccess: isCreatingFileSuccess,
        },
    ] = useCreateFileInDriveMutation();

    const [
        fetchFileFromDrive,
        {
            data: fileData,
            isFetching: isFetchingFile,
            isSuccess: isFetchingFileSuccess,
        },
    ] = useLazyFetchFileFromDriveQuery();

    function handleRestore() {
        fetchFileList({
            q: "name = 'wuwapal_backup.json'",
            spaces: "appDataFolder",
            key: process.env.NEXT_PUBLIC_GOOGLE_KEY || "",
        });
    }

    useEffect(() => {
        if (!isFetchingFileListFromDrive && isFetchingFileListFromDriveSuccess) {
            if (fileList.files.length == 0) {
                createFileInDrive({
                    params: {
                        fields: "id",
                        alt: "json",
                        key: process.env.NEXT_PUBLIC_GOOGLE_KEY || "",
                    },
                    body: {
                        name: "wuwapal_backup.json",
                        parents: ["appDataFolder"],
                    },
                });
            } else {
                fetchFileFromDrive({
                    id: fileList.files[0].id,
                    params: {
                        alt: "media",
                        key: process.env.NEXT_PUBLIC_GOOGLE_KEY || "",
                    },
                });
            }
        }
    }, [isFetchingFileListFromDriveSuccess, isFetchingFileListFromDrive]);

    useEffect(() => {
        if (!isFetchingFile && isFetchingFileSuccess) {
            if (fileData == null) toast.warning("No data to restore");
        }
    }, [isFetchingFileSuccess, isFetchingFile]);

    return (
        <Button
            variant={"outline"}
            className="h-20 flex items-center justify-center"
            onClick={handleRestore}
        >
            <CloudDownload
                className={`size-8 ${
                    isFetchingFileListFromDrive ||
                    isCreatingFile ||
                    isFetchingFile
                        ? "animate-spin"
                        : ""
                }`}
            />
            <div className="flex flex-col">
                <span className="text-base">Restore Your Data </span>
                <span className="font-normal">From Cloud</span>
            </div>
        </Button>
    );
}
