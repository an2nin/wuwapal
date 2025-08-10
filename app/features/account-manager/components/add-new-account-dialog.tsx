'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { accountExists, playerIdExists } from '@/features/account-manager/utils/helpers';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useAccountStore } from '@/shared/stores/account';

export default function AddNewAccountDialog() {
  const accountStore = useAccountStore(state => state);

  const [open, setOpen] = useState(false);
  const [displayNameInput, setDisplayNameInput] = useState('');
  const [playerIdInput, setPlayerIdInput] = useState('');
  const [displayNameErr, setDisplayNameErr] = useState<any>(null);
  const [playerIdErr, setPlayerIdErr] = useState<any>(null);

  function displayNameChangeHandler(e: any) {
    const value = e.target.value;
    setDisplayNameInput(value);

    if (
      accountExists(accountStore.accounts, value)
    ) {
      setDisplayNameErr('* This profile already exists!!!');
    }
    else {
      setDisplayNameErr(null);
    }
  }

  function playerIdChangeHandler(e: any) {
    const value = e.target.value;
    setPlayerIdInput(value);

    if (!value.trim()) {
      setPlayerIdErr('* Player ID is required');
    }
    else if (playerIdExists(accountStore.accounts, value)) {
      setPlayerIdErr('* This player ID already exists!!!');
    }
    else {
      setPlayerIdErr(null);
    }
  }

  function addNewProfile() {
    accountStore.addAccount({
      displayName: displayNameInput,
      playerId: playerIdInput,
    });
    toast.success('New profile has been added');
    setOpen(false);
    setDisplayNameInput('');
    setPlayerIdInput('');
    setDisplayNameErr(null);
    setPlayerIdErr(null);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex font-bold items-center gap-1 h-8 rounded-xl pr-3 pl-1.5 text-xs border-2 border-primary hover:bg-primary text-primary-foreground bg-transparent hover:text-primary-foreground">
          <Plus />
          {' '}
          Add New Account
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Account Name</Label>
            <Input
              name="display_name"
              id="display_name"
              value={displayNameInput}
              onChange={displayNameChangeHandler}
              placeholder="Enter profile name"
            />
            {displayNameErr && (
              <div className="text-red-500 text-xs">{displayNameErr}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Player ID</Label>
            <Input
              name="player_id"
              id="player_id"
              value={playerIdInput}
              onChange={playerIdChangeHandler}
              placeholder="Enter player ID"
            />
            {playerIdErr && (
              <div className="text-red-500 text-xs">{playerIdErr}</div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={!!displayNameErr || !!playerIdErr || !displayNameInput.trim() || !playerIdInput.trim()}
            onClick={addNewProfile}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
