'use client';

import type { Account } from '@/shared/stores/account';
import { Star, User } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useAccountStore } from '@/shared/stores/account';
import AddNewAccountDialog from './components/add-new-account-dialog';
import EditAccountDialog from './components/edit-account-dialog';

export default function AccountManager() {
  const accountStore = useAccountStore(state => state);

  const [isEditAccountOpen, setIsEditAccountOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  function accountClickHandler(account: Account) {
    if (accountStore.active && accountStore.active === account.playerId) {
      return;
    }

    if (account.playerId !== null && account.playerId !== undefined) {
      setSelectedAccount(account.playerId);
      setIsEditAccountOpen(true);
    }
  }

  return (
    <>
      <EditAccountDialog
        open={isEditAccountOpen}
        setOpen={setIsEditAccountOpen}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center text-lg">
            <User className="w-5 h-5 text-primary" />
            <span className="text-xl font-semibold text-white">
              Account Manager
            </span>
          </CardTitle>
          <CardDescription>Manage multiple wuwa accounts using the account manager.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-pattern-stripped rounded-xl p-4">
            <div className="flex gap-5 justify-between items-center">
              <div className="text-lg font-bold text-primary">
                Accounts
              </div>
              <div>
                <AddNewAccountDialog />
              </div>
            </div>
            <ul className="list-disc">
              {accountStore.accounts.map((account, idx) => (
                <li
                  className={`ms-5 w-fit ${accountStore.active && accountStore.active !== account.playerId
                    ? 'hover:underline cursor-pointer'
                    : 'cursor-default'
                  }`}
                  key={idx}
                  onClick={() =>
                    accountClickHandler(account)}
                >
                  <div className="flex items-center gap-2.5">
                    {account.displayName}
                    {accountStore.active && accountStore.active === account.playerId && (
                      <Star className="size-4 text-primary fill-primary" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
