import { Button } from "@/shared/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { useProfileStore, ProfileStoreState } from "@/shared/stores/profile";
import { useRef } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { FileDown, FileUp } from "lucide-react";

export default function BackupManager() {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handleFileUpload(e: any) {
        const file = e.target.files?.[0]; // Safely access the uploaded file

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const result = event.target?.result; // Safely access `event.target`
                if (typeof result === "string") {
                    // Ensure the result is a string
                    try {
                        const importedData = JSON.parse(result); // Parse JSON data
                        profileStore.importProfileStore(importedData);
                        toast.success("Data imported successfully");
                    } catch (err) {
                        toast.error("Invalid JSON data");
                    }
                } else {
                    toast.error("File could not be read as text"); // Handle non-string result
                }
            };

            reader.readAsText(file); // Read file as text
        }
    }

    function exportData() {
        const content: any = {
            version: profileStore.version,
            active: profileStore.active,
            date: format(new Date(), "dd/MM/yyyy hh:mm a"),
            profiles: profileStore.profiles,
        };

        const dataStr = JSON.stringify(content, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `backup-wuwapal.com-${format(
            new Date(),
            "dd_MM_yyyy_hh_mm_ss"
        )}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function importData() {
        fileInputRef.current?.click();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manual Backup</CardTitle>
                <CardDescription>
                    Manage your backups manually by exporting and importing.
                </CardDescription>
            </CardHeader>
            <CardFooter className="mt-4">
                <div className="flex flex-wrap lg:justify-end justify-center w-full gap-5">
                    <input
                        type="file"
                        accept="application/json"
                        onChange={handleFileUpload}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    <Button variant="outline" onClick={importData}>
                        <FileUp /> Import Data
                    </Button>
                    <Button variant="outline" onClick={exportData}>
                        <FileDown /> Export Data
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
