import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Account {
  displayName: string;
  playerId: string; // Profile ID connected to Profile in DB
}

interface InitialAccountState {
  accounts: Account[];
  active: null | string; // Active account ID
}

const initialState: InitialAccountState = {
  accounts: [],
  active: null, // Active account ID
};

export type AccountStoreState = InitialAccountState & {
  setActive: (playerId: string | null) => void;
  getAccountById: (playerId: string) => Account | undefined;
  addAccount: (account: Account) => void;
  updateAccount: (playerId: string, updatedAccount: Partial<Account>) => void;
  removeAccount: (playerId: string) => void;
  clearStore: () => void;
};

export const useAccountStore = create<AccountStoreState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setActive: (playerId: string | null) => set({ active: playerId }),
      getAccountById: (playerId: string) =>
        (get().accounts.find(account => account.playerId === playerId)),
      addAccount: (account: Account) => set(state => ({
        accounts: [...state.accounts, account],
      })),
      updateAccount: (playerId: string, updatedAccount: Partial<Account>) => set(state => ({
        accounts: state.accounts.map(account =>
          account.playerId === playerId ? { ...account, ...updatedAccount } : account,
        ),
      })),
      removeAccount: (playerId: string) => set(state => ({
        accounts: state.accounts.filter(account => account.playerId !== playerId),
      })),
      clearStore: () => set(initialState),
    }),
    {
      name: 'account-storage',
    },
  ),
);
