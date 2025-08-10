import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { deleteAllBannersForProfile } from '@/core/db/actions';

export interface Account {
  displayName: string;
  playerId?: string | null; // Profile ID connected to Profile in DB
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
  getActiveAccount: () => Account | undefined;
  addAccount: (account: Account) => void;
  setAccounts: (accounts: Account[]) => void;
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
        get().accounts.find(account => account.playerId === playerId),
      getActiveAccount: () => {
        const state = get();
        if (!state.active)
          return undefined;
        return state.accounts.find(account => account.playerId === state.active);
      },
      addAccount: (account: Account) => set((state) => {
        if (state.active === null) {
          set({ active: account.playerId });
        }
        // Ensure playerId is unique
        if (state.accounts.some(a => a.playerId === account.playerId)) {
          return {}; // No change if playerId already exists
        }

        return {
          accounts: [...state.accounts, account],
        };
      }),
      setAccounts: (accounts: Account[]) => set({ accounts }),
      updateAccount: (playerId: string, updatedAccount: Partial<Account>) => set(state => ({
        accounts: state.accounts.map(account =>
          account.playerId === playerId ? { ...account, ...updatedAccount } : account,
        ),
      })),
      removeAccount: (playerId: string) => set((state) => {
        const updatedAccounts = state.accounts.filter(account => account.playerId !== playerId);
        deleteAllBannersForProfile(playerId);
        return {
          accounts: updatedAccounts,
          active: updatedAccounts.length === 0 ? null : state.active,
        };
      }),
      clearStore: () => set(initialState),
    }),
    {
      name: 'account-storage',
    },
  ),
);
