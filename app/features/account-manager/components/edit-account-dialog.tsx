import { Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useAccountStore } from '@/shared/stores/account';

interface Props {
  open: boolean;
  setOpen: (param: boolean) => void;
  setSelectedAccount: (param: string | null) => void;
  selectedAccount: string | null;
}

export default function AccountEditDialog({
  open,
  setOpen,
  selectedAccount,
  setSelectedAccount,
}: Props) {
  const accountStore = useAccountStore(state => state);

  function setAsActiveHandler() {
    if (selectedAccount) {
      accountStore.setActive(selectedAccount);
      toast.success(
        `Account: ${accountStore.getActiveAccount()?.displayName} has been set as active`,
      );
    }
    else {
      toast.error('Oops no account selected!!!');
    }

    setOpen(false);
  }

  function deleteAccount() {
    if (selectedAccount) {
      const accountDisplayName
                = accountStore.getActiveAccount()?.displayName;
      accountStore.removeAccount(selectedAccount);
      setSelectedAccount(null);
      toast.success(`Account: ${accountDisplayName} has been deleted`);
    }
    else {
      toast.error('Oops no account selected!!!');
    }

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account Actions</DialogTitle>
          <DialogDescription>
            For
            {' '}
            <span className="text-primary font-bold">
              {selectedAccount
                && accountStore.getAccountById(selectedAccount)?.displayName}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={setAsActiveHandler}>
            Set as Active
            {' '}
            <Star className="size-4 fill-primary-foreground" />
          </Button>
          {accountStore.accounts.length > 1 && (
            <Button
              size="icon"
              variant="destructive"
              onClick={deleteAccount}
            >
              <Trash2 />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
