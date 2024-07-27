import { Button } from "@/app/_components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
    convertToProfileKey,
    ProfileStoreState,
    useProfileStore,
} from "@/stores/profile";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddNewProfileDialog() {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [inputErr, setInputErr] = useState<any>(null);

    function displayNameChangeHandler(e: any) {
        const value = e.target.value;
        setInput(value);

        if (
            Object.keys(profileStore.profiles).findLast(
                (key) => key == convertToProfileKey(value)
            )
        ) {
            setInputErr("* This profile already exists!!!");
        } else {
            setInputErr(null);
        }
    }

    function addNewProfile() {
        profileStore.addNewProfile(input);
        toast.success("New profile has been added");
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className="flex font-bold items-center gap-1 h-8 rounded-xl pr-3 pl-1.5 text-xs border-2 border-primary hover:bg-primary text-primary-foreground bg-transparent hover:text-primary-foreground">
                    <Plus /> Add New Profile
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Profile</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <Label>Profile Name</Label>
                    <Input
                        name="display_name"
                        id="display_name"
                        value={input}
                        onChange={displayNameChangeHandler}
                    />
                    {inputErr && (
                        <div className="text-red-500 text-xs">{inputErr}</div>
                    )}
                </div>
                <DialogFooter>
                    <Button disabled={inputErr} onClick={addNewProfile}>
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
