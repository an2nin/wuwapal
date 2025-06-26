import { Button } from "@/shared/components/ui/button";
import useSupabase from "@/shared/hooks/useSupabase";
import { useUploadToDriveMutation } from "@/redux/services/gdrive";
import { useAuthStore } from "@/shared/stores/auth";
import { ProfileStoreState, useProfileStore } from "@/shared/stores/profile";
import { format } from "date-fns";
import { CloudUpload, LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Uploader() {
    const authStore = useAuthStore((state) => state);
    const { upsertData: upsertUserData } = useSupabase("user_data");
    const [
        uploadToDrive,
        { isLoading: isUploading, isSuccess: isUploadSuccess },
    ] = useUploadToDriveMutation();

    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );

    function handleUpload() {
        if (authStore.cloud_file_id) {
            const content: any = {
                version: profileStore.version,
                active: profileStore.active,
                date: format(new Date(), "dd/MM/yyyy hh:mm a"),
                profiles: profileStore.profiles,
            };

            const fileContent = JSON.stringify(content);

            uploadToDrive({
                id: authStore.cloud_file_id,
                params: {
                    uploadType: "media",
                    alt: "json",
                    key: process.env.NEXT_PUBLIC_GOOGLE_KEY || "",
                },
                body: fileContent,
            });
        }else{
            toast.error("No File Found, Please re-login to your account");
        }
    }

    useEffect(() => {
        if (!isUploading && isUploadSuccess) {
            toast.success("Data uploaded successfully");
            upsertUserData(
                {
                    email: authStore.profile?.email,
                },
                ["email"]
            );
        }
    }, [isUploading, isUploadSuccess]);

    return (
        <Button
            variant={"outline"}
            className="h-20 flex items-center justify-center"
            onClick={handleUpload}
        >
            {isUploading ? (
                <LoaderCircle className="animate-spin size-8" />
            ) : (
                <CloudUpload className="size-8" />
            )}
            <div className="flex flex-col">
                <span className="text-base">Upload Your Data </span>
                <span className="font-normal">to Cloud</span>
            </div>
        </Button>
    );
}
