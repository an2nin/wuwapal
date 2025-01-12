import { Button } from "@/app/_components/ui/button";
import useSupabase from "@/app/_hooks/useSupabase";
import {
    useCreateFileInDriveMutation,
    useLazyFetchFileListFromDriveQuery,
    useUploadToDriveMutation,
} from "@/redux/services/gdrive";
import { useAuthStore } from "@/stores/auth";
import { ProfileStoreState, useProfileStore } from "@/stores/profile";
import { format } from "date-fns";
import { CloudUpload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Uploader() {
    const authStore = useAuthStore((state) => state);

    const [isUploaderActive, setIsUploaderActive] = useState(false);
    const { upsertData: upsertUserData } = useSupabase("user_data");
    const [
        uploadToDrive,
        { isLoading: isUploading, isSuccess: isUploadSuccess },
    ] = useUploadToDriveMutation();

    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );

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

    function handleUpload() {
        setIsUploaderActive(true);
        fetchFileList({
            q: "name = 'wuwapal_backup.json'",
            spaces: "appDataFolder",
            key: process.env.NEXT_PUBLIC_GOOGLE_KEY || "",
        });
    }

    function uploadData() {
        const content: any = {
            version: profileStore.version,
            active: profileStore.active,
            date: format(new Date(), "dd/MM/yyyy hh:mm a"),
            profiles: profileStore.profiles,
        };

        const fileContent = JSON.stringify(content);

        if (fileList) {
            uploadToDrive({
                id: fileList?.files[0].id,
                params: {
                    uploadType: "media",
                    alt: "json",
                    key: process.env.NEXT_PUBLIC_GOOGLE_KEY || "",
                },
                body: fileContent,
            });

            upsertUserData(
                {
                    email: authStore.profile?.email,
                },
                ["email"]
            );
        }
    }

    useEffect(() => {
        if (
            !isFetchingFileListFromDrive &&
            isFetchingFileListFromDriveSuccess
        ) {
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
                if (isUploaderActive) {
                    uploadData();
                }
            }
        }
    }, [isFetchingFileListFromDriveSuccess, isFetchingFileListFromDrive]);

    useEffect(() => {
        if (!isCreatingFile && isCreatingFileSuccess && isUploaderActive) {
            uploadData();
        }
    }, [isCreatingFileSuccess, isCreatingFile, isUploaderActive]);

    useEffect(() => {
        if (!isUploading && isUploadSuccess) {
            setIsUploaderActive(false);
            toast.success("Data uploaded successfully");
        }
    }, [isUploading, isUploadSuccess]);

    return (
        <Button
            variant={"outline"}
            className="h-20 flex items-center justify-center"
            onClick={handleUpload}
        >
            <CloudUpload
                className={`size-8 ${
                    isFetchingFileListFromDrive || isCreatingFile || isUploading
                        ? "animate-spin"
                        : ""
                }`}
            />
            <div className="flex flex-col">
                <span className="text-base">Upload Your Data </span>
                <span className="font-normal">to Cloud</span>
            </div>
        </Button>
    );
}
