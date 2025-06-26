import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { useProfileStore, ProfileStoreState } from "@/shared/stores/profile";
import { Star } from "lucide-react";
import AddNewProfileDialog from "./AddNewProfileDialog";
import { useState } from "react";
import ProfileEditDialog from "./ProfileEditDialog";
import LocalStorage from "./LocalStorage";
import BackupManager from "./BackupManager";

export default function Profile() {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

    function profileClickHandler(profile: string) {
        if(profileStore.active == profile) {
            return;
        }

        setSelectedProfile(profile);
        setIsEditProfileOpen(true);
    }

    return (
        <>
            <ProfileEditDialog
                open={isEditProfileOpen}
                setOpen={setIsEditProfileOpen}
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Profile Manager</CardTitle>
                    <CardDescription>
                        Manage multiple accounts using the profile manager
                    </CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                    <div className="flex flex-col gap-5">
                        <div className="bg-pattern-stripped p-6 rounded-2xl">
                            <div className="flex gap-5 justify-between items-center">
                                <div className="text-lg font-bold text-primary">
                                    Profiles
                                </div>
                                <div>
                                    <AddNewProfileDialog />
                                </div>
                            </div>
                            <ul className="list-disc">
                                {Object.keys(profileStore.profiles).map(
                                    (profile: string, idx: number) => (
                                        <li
                                            className={`ms-5 w-fit ${
                                                profileStore.active != profile
                                                    ? "hover:underline cursor-pointer"
                                                    : "cursor-default"
                                            }`}
                                            key={idx}
                                            onClick={() =>
                                                profileClickHandler(profile)
                                            }
                                        >
                                            <div className="flex items-center gap-2.5">
                                                {
                                                    profileStore.profiles[
                                                        profile
                                                    ].display_name
                                                }
                                                {profileStore.active ==
                                                    profile && (
                                                    <Star className="size-4 text-primary fill-primary" />
                                                )}
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <LocalStorage />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
