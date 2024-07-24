import { Button } from "@/app/_components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { useProfileStore, ProfileStoreState } from "@/stores/profile";

export default function BackupManager() {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );
    function importData() {}
    function exportData() {
        const content: any = {
            version: profileStore.version,
            active: profileStore.active,
            profiles: profileStore.profiles
        }
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = `backup-data-wuwapal.com-${new Date().getTime()}.json`;
        link.click();
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
                <div className="flex justify-end w-full gap-3">
                    <Button variant="outline" onClick={importData}>
                        Import Data
                    </Button>
                    <Button variant="outline" onClick={exportData}>
                        Export Data
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
