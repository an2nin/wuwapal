import { Button } from "@/app/_components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/_components/ui/dialog";
import {
    ProfileStoreState,
    useProfileStore,
} from "@/stores/profile";
import { Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
    open: boolean;
    setOpen: (param: boolean) => void;
    setSelectedProfile: (param: string | null) => void;
    selectedProfile: string | null;
}

export default function ProfileEditDialog({
    open,
    setOpen,
    selectedProfile,
    setSelectedProfile,
}: Props) {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );

    function setAsActiveHandler() {
        if (selectedProfile) {
            profileStore.setProfileAsActive(selectedProfile);
            toast.success(
                `Profile: ${profileStore.profiles[selectedProfile].display_name} has been set as active`
            );
        } else {
            toast.error("Oops no profile selected!!!");
        }

        setOpen(false);
    }

    function deleteProfile() {
        if (selectedProfile) {
            const profileDisplayName =
                profileStore.profiles[selectedProfile].display_name;
            profileStore.deleteProfile(selectedProfile);
            setSelectedProfile(null);
            toast.success(`Profile: ${profileDisplayName} has been deleted`);
        } else {
            toast.error("Oops no profile selected!!!");
        }

        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Profile Actions</DialogTitle>
                    <DialogDescription>
                        For{" "}
                        <span className="text-primary font-bold">
                            {selectedProfile &&
                                profileStore.profiles[selectedProfile]
                                    .display_name}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={setAsActiveHandler}>
                        Set as Active{" "}
                        <Star className="size-4 fill-primary-foreground" />
                    </Button>
                    {selectedProfile != "default" && (
                        <Button
                            size="icon"
                            className="h-12"
                            variant="destructive"
                            onClick={deleteProfile}
                        >
                            <Trash2 />
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
