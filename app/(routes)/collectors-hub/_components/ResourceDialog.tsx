import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";

interface Props {
    isOpen: boolean;
    onDialogChange: (e: any) => void;
    resource: any;
}

export default function ResourceDialog({ isOpen, onDialogChange, resource }: Props) {
    return (
        <>
            <Dialog open={isOpen} onOpenChange={onDialogChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
